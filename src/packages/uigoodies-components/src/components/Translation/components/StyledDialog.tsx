/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import Draggable from 'react-draggable';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 'min(560px, 92vw)',
    borderRadius: Number(theme.shape.borderRadius) * 2,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 24px 48px rgba(0,0,0,0.45)'
        : '0 25px 50px -12px rgba(15, 23, 42, 0.18)'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2.5)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    gap: theme.spacing(1)
  }
}));

function PaperComponent(props: React.ComponentProps<typeof Paper>) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function StyledDialogComponent(props: React.ComponentProps<typeof Dialog>) {
  return <StyledDialog fullWidth maxWidth="sm" PaperComponent={PaperComponent} {...props} />;
}
