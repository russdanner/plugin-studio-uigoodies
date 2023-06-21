import * as React from 'react';
import { useState } from 'react';
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  SxProps,
  Theme,
  Typography,
  useTheme
} from '@mui/material';
import { SystemIcon, SystemIconDescriptor, WidgetDescriptor, WidgetsGrid } from '@craftercms/studio-ui';
import ExpandMore from '@mui/icons-material/ExpandMoreOutlined';

export interface ToolPanelAccordion {
  title: string;
  sxs?: Partial<{
    accordion: SxProps<Theme>;
    accordionSummary: SxProps<Theme>;
    accordionDetails: SxProps<Theme>;
    widgetsGrid: SxProps<Theme>;
  }>;
  widgets: WidgetDescriptor[];
  icon?: SystemIconDescriptor & Partial<{ expandedStyle: {}; collapsedStyle: {} }>;
}

export function ToolPanelAccordion(props: ToolPanelAccordion) {
  const { title, icon, sxs } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const expandedClass = accordionClasses.expanded;
  const contentClass = accordionSummaryClasses.content;
  return (
    <Accordion
      expanded={open}
      onChange={(e, isExpanded) => setOpen(isExpanded)}
      sx={{
        boxShadow: 0,
        [`&.${expandedClass}`]: { margin: 0 },
        ...sxs?.accordion
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          alignItems: 'center',
          [`&, &.${expandedClass}`]: { minHeight: '48px' },
          [`.${contentClass}, .${contentClass}.${expandedClass}`]: { margin: 0 },
          ...sxs?.accordionSummary
        }}
      >
        {icon && <SystemIcon icon={icon} style={{ marginRight: '10px', color: theme.palette.action.active }} />}
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, ...sxs?.accordionDetails }}>
        <WidgetsGrid container spacing={0} direction="column" widgets={props.widgets} sx={sxs?.widgetsGrid} />
      </AccordionDetails>
    </Accordion>
  );
}

export default ToolPanelAccordion;
