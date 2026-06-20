/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import { DEFAULT_ADJUSTMENTS, ImageAdjustments } from './imageStudioUtils';

export type FilterPreset = {
  id: string;
  label: string;
  adjustments: ImageAdjustments;
};

/** Instagram-inspired looks approximated with CSS filters (no LUT assets). */
export const FILTER_PRESETS: FilterPreset[] = [
  { id: 'normal', label: 'Normal', adjustments: { ...DEFAULT_ADJUSTMENTS } },
  {
    id: 'clarendon',
    label: 'Clarendon',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, contrast: 118, saturation: 125 }
  },
  {
    id: 'gingham',
    label: 'Gingham',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, contrast: 95, saturation: 90, hueRotate: -8 }
  },
  {
    id: 'moon',
    label: 'Moon',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 112, contrast: 125, saturation: 0, grayscale: 100 }
  },
  {
    id: 'lark',
    label: 'Lark',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 115, contrast: 105, saturation: 130 }
  },
  {
    id: 'reyes',
    label: 'Reyes',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 112, contrast: 88, saturation: 85, sepia: 22, hueRotate: 12 }
  },
  {
    id: 'juno',
    label: 'Juno',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, contrast: 112, saturation: 140, hueRotate: 8 }
  },
  {
    id: 'slumber',
    label: 'Slumber',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 105, contrast: 95, saturation: 80, hueRotate: -18, sepia: 12 }
  },
  {
    id: 'nashville',
    label: 'Nashville',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 110, contrast: 108, saturation: 115, sepia: 18, hueRotate: 15 }
  },
  {
    id: 'walden',
    label: 'Walden',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 118, contrast: 102, saturation: 125, sepia: 28, hueRotate: 5 }
  },
  {
    id: 'willow',
    label: 'Willow',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 105, contrast: 90, saturation: 0, grayscale: 85 }
  },
  {
    id: 'valencia',
    label: 'Valencia',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 112, contrast: 100, saturation: 110, sepia: 15, hueRotate: 6 }
  },
  {
    id: 'hudson',
    label: 'Hudson',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, contrast: 115, saturation: 95, hueRotate: -22, vignette: 35 }
  },
  {
    id: 'lofi',
    label: 'Lo-Fi',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 102, contrast: 135, saturation: 145, vignette: 45 }
  },
  {
    id: 'xpro2',
    label: 'X-Pro II',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 105, contrast: 128, saturation: 120, vignette: 55 }
  },
  {
    id: 'sierra',
    label: 'Sierra',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 110, contrast: 92, saturation: 88, sepia: 10 }
  },
  {
    id: 'rise',
    label: 'Rise',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 118, contrast: 95, saturation: 105, sepia: 20, hueRotate: 10 }
  },
  {
    id: 'inkwell',
    label: 'Inkwell',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, contrast: 120, saturation: 0, grayscale: 100 }
  },
  {
    id: 'dramatic',
    label: 'Dramatic',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 95, contrast: 145, saturation: 110, vignette: 40 }
  },
  {
    id: 'fade',
    label: 'Fade',
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 115, contrast: 85, saturation: 75 }
  }
];

export function findFilterPreset(id: string): FilterPreset | undefined {
  return FILTER_PRESETS.find((preset) => preset.id === id);
}
