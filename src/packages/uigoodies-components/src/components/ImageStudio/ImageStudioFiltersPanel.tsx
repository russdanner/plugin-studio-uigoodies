/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import React from 'react';
import { Box, IconButton, Paper, Slider, Stack, Typography, alpha, useTheme } from '@mui/material';
import { FILTER_PRESETS } from './imageFilterPresets';
import { ImageAdjustments, buildCssFilter } from './imageStudioUtils';

const TINT_COLORS = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#5856d6', '#af52de', '#ff2d55', '#ffffff', '#000000'];

type Props = {
  imageSrc: string;
  activePresetId: string;
  adjustments: ImageAdjustments;
  onSelectPreset: (presetId: string, adjustments: ImageAdjustments) => void;
  onTintChange: (tintColor: string, tintStrength: number) => void;
};

export function ImageStudioFiltersPanel({
  imageSrc,
  activePresetId,
  adjustments,
  onSelectPreset,
  onTintChange
}: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0 }}>
      <Typography variant="caption" color="text.secondary">
        Tap a look, then optionally add a color wash over the effect.
      </Typography>

      <Paper elevation={0} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
          Color wash
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
          {TINT_COLORS.map((color) => (
            <IconButton
              key={color}
              size="small"
              onClick={() => onTintChange(color, adjustments.tintStrength || 35)}
              sx={{
                width: 26,
                height: 26,
                bgcolor: color,
                border: adjustments.tintColor === color ? `2px solid ${theme.palette.primary.main}` : '1px solid',
                borderColor: adjustments.tintColor === color ? 'primary.main' : 'divider'
              }}
            />
          ))}
          <IconButton
            size="small"
            onClick={() => onTintChange('', 0)}
            sx={{ width: 26, height: 26, fontSize: 11 }}
          >
            Off
          </IconButton>
        </Stack>
        <Typography variant="caption" color="text.secondary">Wash strength</Typography>
        <Slider
          size="small"
          min={0}
          max={100}
          value={adjustments.tintStrength ?? 0}
          onChange={(_, v) => onTintChange(adjustments.tintColor || '#007aff', v as number)}
        />
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
          gap: 1.5,
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          pb: 1
        }}
      >
        {FILTER_PRESETS.map((preset) => {
          const selected = preset.id === activePresetId;
          const previewAdjustments = {
            ...preset.adjustments,
            tintColor: adjustments.tintColor,
            tintStrength: adjustments.tintStrength
          };
          return (
            <Paper
              key={preset.id}
              elevation={0}
              onClick={() =>
                onSelectPreset(preset.id, {
                  ...preset.adjustments,
                  tintColor: adjustments.tintColor,
                  tintStrength: adjustments.tintStrength
                })
              }
              sx={{
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                border: selected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.paper',
                transition: 'transform 0.15s, box-shadow 0.15s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            >
              <Box sx={{ position: 'relative', aspectRatio: '1', bgcolor: '#222' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: buildCssFilter(previewAdjustments)
                  }}
                />
                {previewAdjustments.tintStrength && previewAdjustments.tintColor && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: previewAdjustments.tintColor,
                      opacity: previewAdjustments.tintStrength / 100,
                      mixBlendMode: 'multiply',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  py: 0.75,
                  fontWeight: selected ? 600 : 400,
                  color: selected ? 'primary.main' : 'text.primary'
                }}
              >
                {preset.label}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

export default ImageStudioFiltersPanel;
