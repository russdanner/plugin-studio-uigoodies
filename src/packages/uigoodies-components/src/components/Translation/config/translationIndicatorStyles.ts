import type { SxProps, Theme } from '@mui/material/styles';

/** Match `translation-versions` form control row pills (Source / Outdated / Current). */
const pillBase: SxProps<Theme> = {
  display: 'inline-block',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  px: 1,
  py: '2px',
  borderRadius: '999px',
  lineHeight: 1.3
};

export const translationIndicatorSx = {
  pillBase,
  source: {
    ...pillBase,
    backgroundColor: '#e8f1ff',
    color: '#0d4ea6',
    border: '1px solid #b6d4fe'
  } satisfies SxProps<Theme>,
  outdated: {
    ...pillBase,
    backgroundColor: '#fff7e6',
    color: '#ad6800',
    border: '1px solid #ffd591'
  } satisfies SxProps<Theme>,
  current: {
    ...pillBase,
    backgroundColor: '#f6ffed',
    color: '#237804',
    border: '1px solid #b7eb8f'
  } satisfies SxProps<Theme>
};
