/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 */

import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { foldGutter, foldKeymap } from '@codemirror/language';
import { defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands';
import { keymap, lineNumbers } from '@codemirror/view';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';

export type OpenSearchJsonEditorProps = {
  value: string;
  /** When omitted or read-only, editor is not editable. */
  onChange?: (value: string) => void;
  readOnly?: boolean;
  /** Cmd/Ctrl+Enter runs callback (query editor only). */
  onModEnter?: () => void;
};

export function OpenSearchJsonEditor({
  value,
  onChange,
  readOnly,
  onModEnter
}: OpenSearchJsonEditorProps) {
  const extensions = useMemo(() => {
    const theme = vscodeLight;
    const modEnter =
      onModEnter && !readOnly
        ? [
            {
              key: 'Mod-Enter' as const,
              preventDefault: true,
              run: () => {
                onModEnter();
                return true;
              }
            }
          ]
        : [];
    return [
      json(),
      lineNumbers(),
      foldGutter(),
      keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap, ...foldKeymap, ...modEnter]),
      theme
    ];
  }, [readOnly, onModEnter]);

  const editable = Boolean(onChange) && !readOnly;

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 220,
        minWidth: 0,
        position: 'relative',
        borderTop: 1,
        borderColor: 'divider',
        '& .cm-editor': { height: '100%' },
        '& .cm-scroller': { overflow: 'auto' }
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <ReactCodeMirror
          value={value}
          height="100%"
          theme="none"
          extensions={extensions}
          editable={editable}
          readOnly={readOnly}
          onChange={editable ? onChange : undefined}
          basicSetup={false}
        />
      </Box>
    </Box>
  );
}
