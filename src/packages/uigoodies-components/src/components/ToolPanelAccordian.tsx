import * as React from 'react';
import { Widget } from '@craftercms/studio-ui/components/Widget';
import { WidgetDescriptor } from '@craftercms/studio-ui/models';
import { useActiveUser } from '@craftercms/studio-ui/hooks/useActiveUser';
import { useActiveSiteId } from '@craftercms/studio-ui/hooks/useActiveSiteId';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export interface WidgetProps extends WidgetDescriptor {
  overrideProps?: object;
  defaultProps?: object;
}

export function renderWidgets(
  widgets: WidgetDescriptor[],
  options?: Pick<WidgetProps, 'overrideProps' | 'defaultProps'> & {
    userRoles?: string[];
  }
): JSX.Element[] {
  if (!Array.isArray(widgets)) {
    return [];
  }
  const { userRoles, overrideProps, defaultProps } = options;
  const mapperFn = (widget, index) => (
    <Widget key={widget.uiKey ?? index} {...widget} overrideProps={overrideProps} defaultProps={defaultProps} />
  );
  return Array.isArray(userRoles)
    ? widgets
        .filter(
          (widget) =>
            (widget.permittedRoles ?? []).length === 0 ||
            (userRoles ?? []).some((role) => widget.permittedRoles.includes(role))
        )
        .map(mapperFn)
    : widgets.map(mapperFn);
}

export function ToolPanelAccordian(props) {
  const label = props.title ? props.title : 'Title';
  const icon = props.icon && props.icon.id ? props.icon.id : '@mui/icons-material/SentimentSatisfiedRounded';
  const { rolesBySite } = useActiveUser();
  const site = useActiveSiteId();
  const [open, setOpen] = React.useState<Boolean>(false);
  let displayWidgetStyle = open == true ? 'block' : 'none';
  let actionIcon = open == true ? <ChevronRightRoundedIcon /> : <KeyboardArrowDownRoundedIcon />;
  let renderedWidgets = renderWidgets(props.widgets, { userRoles: rolesBySite[site] });


  return (
    <>
      <ToolsPanelListItemButton
        icon={{ id: icon }}
        title={label}
        secondaryActionIcon={actionIcon}
        onClick={() => setOpen(!open)}
      />
      <div style={{ display: displayWidgetStyle }}> I removed the curlies renderedWidgets form this so the widgets would print</div>
    </>
  );
}

export default ToolPanelAccordian;
