/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  CanvasViewTransform,
  clampCanvasZoom,
  zoomViewAtPoint
} from './imageLayout';

type PanDrag = {
  startClientX: number;
  startClientY: number;
  startPanX: number;
  startPanY: number;
  initiatedBy: 'space' | 'middleMouse';
};

export function useImageCanvasView(
  containerRef: RefObject<HTMLDivElement | null>,
  naturalSize: { width: number; height: number },
  canvasView: CanvasViewTransform,
  onCanvasViewChange: (view: CanvasViewTransform) => void
) {
  const [spaceDown, setSpaceDown] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const panDragRef = useRef<PanDrag | null>(null);
  const viewRef = useRef(canvasView);
  viewRef.current = canvasView;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) {
          return;
        }
        e.preventDefault();
        setSpaceDown(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpaceDown(false);
        if (panDragRef.current?.initiatedBy === 'space') {
          panDragRef.current = null;
          setIsPanning(false);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container || !naturalSize.width) {
        return;
      }
      const rect = container.getBoundingClientRect();
      const displayX = e.clientX - rect.left;
      const displayY = e.clientY - rect.top;
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      const view = viewRef.current;
      const newZoom = clampCanvasZoom(view.zoom * factor);
      onCanvasViewChange(
        zoomViewAtPoint(
          rect.width,
          rect.height,
          naturalSize.width,
          naturalSize.height,
          view,
          displayX,
          displayY,
          newZoom
        )
      );
    },
    [containerRef, naturalSize.width, naturalSize.height, onCanvasViewChange]
  );

  const tryStartPan = useCallback(
    (e: React.PointerEvent): boolean => {
      if (!spaceDown && e.button !== 1) {
        return false;
      }
      e.preventDefault();
      const view = viewRef.current;
      panDragRef.current = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startPanX: view.panX,
        startPanY: view.panY,
        initiatedBy: spaceDown ? 'space' : 'middleMouse'
      };
      setIsPanning(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      return true;
    },
    [spaceDown]
  );

  const handlePanMove = useCallback(
    (e: React.PointerEvent): boolean => {
      const drag = panDragRef.current;
      if (!drag) {
        return false;
      }
      const dx = e.clientX - drag.startClientX;
      const dy = e.clientY - drag.startClientY;
      const view = viewRef.current;
      onCanvasViewChange({
        ...view,
        panX: drag.startPanX + dx,
        panY: drag.startPanY + dy
      });
      return true;
    },
    [onCanvasViewChange]
  );

  const endPan = useCallback(() => {
    panDragRef.current = null;
    setIsPanning(false);
  }, []);

  const panCursor = isPanning ? 'grabbing' : spaceDown ? 'grab' : undefined;

  return {
    spaceDown,
    panCursor,
    handleWheel,
    tryStartPan,
    handlePanMove,
    endPan
  };
}
