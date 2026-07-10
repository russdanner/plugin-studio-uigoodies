import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { jumpToPreviewSelectorFromParsedHtml } from './previewJumpTo';

type Props = {
  selector?: string | null;
  disabled?: boolean;
  onJump?: () => void;
};

export default function JumpToPreviewButton({ selector, disabled, onJump }: Props) {
  const canJump = Boolean(selector?.trim()) && !disabled;
  return (
    <Tooltip title={canJump ? 'Scroll preview to this element' : 'No element to jump to in preview'}>
      <span>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={!canJump}
          onClick={(event) => {
            event.stopPropagation();
            if (jumpToPreviewSelectorFromParsedHtml(selector)) {
              onJump?.();
            }
          }}
          sx={{ minWidth: 72, flexShrink: 0, py: 0.25 }}
        >
          Jump to
        </Button>
      </span>
    </Tooltip>
  );
}
