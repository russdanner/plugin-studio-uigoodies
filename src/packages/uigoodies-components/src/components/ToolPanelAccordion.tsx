import * as React from 'react';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  accordionClasses,
  accordionSummaryClasses,
  Typography,
  useTheme
} from '@mui/material';
import { SystemIcon, SystemIconDescriptor, WidgetDescriptor, WidgetsGrid } from '@craftercms/studio-ui';

export interface ToolPanelAccordion {
  title: string;
  widgets: WidgetDescriptor[];
  icon?: SystemIconDescriptor & Partial<{ expandedStyle: {}; collapsedStyle: {} }>;
}

export function ToolPanelAccordion(props: ToolPanelAccordion) {
  const { title, icon } = props;
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
        [`&.${expandedClass}`]: {
          margin: 0
        }
      }}
    >
      <AccordionSummary
        sx={{
          alignItems: 'center',
          [`&, &.${expandedClass}`]: { minHeight: '48px' },
          [`.${contentClass}, .${contentClass}.${expandedClass}`]: {
            margin: 0
          }
        }}
      >
        {icon && <SystemIcon icon={icon} style={{ marginRight: 10, color: theme.palette.action.active }} />}
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <WidgetsGrid container spacing={0} direction="column" widgets={props.widgets} />
      </AccordionDetails>
    </Accordion>
  );
}

export default ToolPanelAccordion;
