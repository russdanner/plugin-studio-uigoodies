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
    backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.22)' : '#e8f1ff',
    color: (theme) => (theme.palette.mode === 'dark' ? '#93c5fd' : '#0d4ea6'),
    border: (theme) =>
      theme.palette.mode === 'dark' ? '1px solid rgba(147,197,253,0.45)' : '1px solid #b6d4fe'
  } satisfies SxProps<Theme>,
  outdated: {
    ...pillBase,
    backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(245,158,11,0.2)' : '#fff7e6',
    color: (theme) => (theme.palette.mode === 'dark' ? '#fcd34d' : '#ad6800'),
    border: (theme) =>
      theme.palette.mode === 'dark' ? '1px solid rgba(252,211,77,0.4)' : '1px solid #ffd591'
  } satisfies SxProps<Theme>,
  current: {
    ...pillBase,
    backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(34,197,94,0.2)' : '#f6ffed',
    color: (theme) => (theme.palette.mode === 'dark' ? '#86efac' : '#237804'),
    border: (theme) =>
      theme.palette.mode === 'dark' ? '1px solid rgba(134,239,172,0.4)' : '1px solid #b7eb8f'
  } satisfies SxProps<Theme>
};
