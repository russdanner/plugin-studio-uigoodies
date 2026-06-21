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
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { styled, alpha } from '@mui/material/styles';

const StyledMenu = styled((props: any) => <Popper {...props} />)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

export default function RightClickMenu({
  anchorEl,
  position,
  onMenuClose,
  onCreateFolder,
  onRenameFolder,
  onContextMenu
}: {
  anchorEl: HTMLElement | null;
  position: { pageX?: number; pageY?: number };
  onMenuClose: () => void;
  onCreateFolder: () => void;
  onRenameFolder: () => void;
  onContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const open = Boolean(anchorEl);
  const pageX = position.pageX ?? 0;
  const pageY = position.pageY ?? 0;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault();
      onMenuClose();
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    const target = event.target as Node | null;
    if (anchorEl instanceof HTMLElement && target && anchorEl.contains(target)) {
      return;
    }
    onMenuClose();
  };

  return (
    <div>
      <StyledMenu
        anchorEl={{
          getBoundingClientRect: () =>
            ({
              x: pageX,
              y: pageY,
              width: 0,
              height: 0,
              top: pageY,
              right: pageX,
              bottom: pageY,
              left: pageX
            } as DOMRect)
        }}
        open={open}
        onClose={onMenuClose}
        onContextMenu={(event: React.MouseEvent<HTMLElement>) => onContextMenu(event)}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleKeyDown}
                >
                  <MenuItem onClick={onCreateFolder} disableRipple>
                    <CreateNewFolderOutlinedIcon />
                    Create new folder
                  </MenuItem>
                  <MenuItem onClick={onRenameFolder} disableRipple>
                    <BorderColorOutlinedIcon />
                    Rename
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </StyledMenu>
    </div>
  );
}
