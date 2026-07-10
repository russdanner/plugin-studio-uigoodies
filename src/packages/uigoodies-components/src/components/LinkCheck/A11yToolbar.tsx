import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import usePreviewGuest from '@craftercms/studio-ui/hooks/usePreviewGuest';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { guestPageUrl, getPreviewHtml } from './previewHtml';
import { runA11yChecks, type A11yIssue } from './a11y/runChecks';
import { usePreviewToolbarAutoRecheck } from './previewToolbarShared';
import JumpToPreviewButton from './JumpToPreviewButton';

const RUNNING_BLUE = '#1976d2';
const OK_GREEN = '#2e7d32';
const FAIL_RED = '#c62828';

const SEVERITY_COLOR: Record<string, 'error' | 'warning' | 'info' | 'default'> = {
  critical: 'error',
  serious: 'error',
  moderate: 'warning',
  minor: 'info'
};

export default function A11yToolbar() {
  const guest = usePreviewGuest();
  const siteId = useActiveSiteId() ?? '';
  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [issues, setIssues] = React.useState<A11yIssue[]>([]);
  const [lastOk, setLastOk] = React.useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [anchorMenu, setAnchorMenu] = React.useState<HTMLElement | null>(null);
  const runSeq = React.useRef(0);
  const chevronRef = React.useRef<HTMLButtonElement | null>(null);

  const pageUrl = guestPageUrl(guest);

  const runCheck = React.useCallback(async () => {
    if (!siteId || !pageUrl) {
      setErrorMsg('No preview page loaded.');
      setLastOk(null);
      return;
    }

    const seq = ++runSeq.current;
    setRunning(true);
    setProgress(0);
    setErrorMsg(null);
    setIssues([]);
    setLastOk(null);

    try {
      const html = await getPreviewHtml(pageUrl);
      if (seq !== runSeq.current) {
        return;
      }
      if (!html) {
        setErrorMsg('Could not read preview markup (try again after preview loads).');
        setIssues([]);
        setLastOk(false);
        return;
      }

      setProgress(40);
      const found = runA11yChecks(html);
      if (seq !== runSeq.current) {
        return;
      }
      setProgress(100);
      setIssues(found);
      setLastOk(found.length === 0);
    } catch (e) {
      if (seq !== runSeq.current) {
        return;
      }
      setIssues([]);
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setLastOk(false);
    } finally {
      if (seq === runSeq.current) {
        setRunning(false);
      }
    }
  }, [siteId, pageUrl]);

  const runCheckRef = React.useRef(runCheck);
  runCheckRef.current = runCheck;

  usePreviewToolbarAutoRecheck(runCheckRef, guest);

  const openMenu = Boolean(anchorMenu);
  const showChevron = !running && lastOk === false;
  const iconColor = running ? RUNNING_BLUE : lastOk === true ? OK_GREEN : lastOk === false ? FAIL_RED : 'action.active';

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
      sx={{ flexShrink: 0, minWidth: 'fit-content', overflow: 'visible' }}
    >
      <Tooltip
        title={
          errorMsg
            ? errorMsg
            : running
              ? 'Running accessibility checks…'
              : lastOk === true
                ? 'No issues found (bundle rules only)'
                : lastOk === false
                  ? errorMsg
                    ? errorMsg + ' — use the chevron for details'
                    : 'Some checks failed — use the chevron for details'
                  : 'Check preview page for accessibility (bundled rules)'
        }
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            ...(running && {
              color: RUNNING_BLUE,
              '& .MuiSvgIcon-root': { color: RUNNING_BLUE }
            })
          }}
        >
          {running && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <Box
                component="svg"
                viewBox="0 0 40 40"
                sx={{
                  width: 36,
                  height: 36,
                  transform: 'rotate(-90deg)',
                  color: RUNNING_BLUE
                }}
              >
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity={0.2}
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={(2 * Math.PI * 16 * (100 - progress)) / 100}
                  strokeLinecap="round"
                />
              </Box>
            </Box>
          )}
          <IconButton
            size="small"
            onClick={() => void runCheck()}
            disabled={!pageUrl}
            aria-label="Run accessibility checks on preview page"
            sx={{
              color: iconColor,
              '&:hover': { color: running ? RUNNING_BLUE : iconColor }
            }}
          >
            <AccessibilityNewRounded fontSize="small" />
          </IconButton>
        </Box>
      </Tooltip>

      {showChevron && (
        <Tooltip title={issues.length > 0 ? 'Show accessibility report' : 'Show error details'}>
          <IconButton
            ref={chevronRef}
            size="small"
            onClick={(e) => setAnchorMenu(e.currentTarget)}
            aria-label="Open accessibility report"
            sx={{
              ml: 0,
              flexShrink: 0,
              color: FAIL_RED,
              minWidth: 32,
              width: 32,
              height: 32
            }}
          >
            <KeyboardArrowDownRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <Popover
        open={openMenu}
        anchorEl={anchorMenu}
        onClose={() => setAnchorMenu(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 2000 }}
        PaperProps={{
          sx: { maxWidth: 500, maxHeight: 400, mt: 0.5 }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2">
            {issues.length > 0 ? `Issues (${issues.length})` : 'Accessibility check'}
          </Typography>
        </Box>
        <List dense disablePadding sx={{ py: 0 }}>
          {issues.length > 0 ? (
            issues.map((issue, idx) => (
              <ListItem
                key={`${issue.ruleId}-${issue.selector ?? 'none'}-${idx}`}
                alignItems="flex-start"
                sx={{ py: 1.5, px: 2, display: 'flex', gap: 1 }}
              >
                <ListItemText
                  sx={{ flex: 1, minWidth: 0, m: 0 }}
                  primary={
                    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" sx={{ mb: 0.5 }}>
                      <Chip
                        size="small"
                        label={issue.severity}
                        color={SEVERITY_COLOR[issue.severity] ?? 'default'}
                        variant="outlined"
                      />
                      {issue.wcag && (
                        <Typography component="span" variant="caption" color="text.secondary">
                          WCAG {issue.wcag}
                        </Typography>
                      )}
                    </Stack>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span" display="block">
                        {issue.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {issue.ruleId}
                        {issue.context ? ` · ${issue.context}` : ''}
                      </Typography>
                    </>
                  }
                />
                <Box sx={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                  <JumpToPreviewButton selector={issue.selector} onJump={() => setAnchorMenu(null)} />
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ py: 1.5, px: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.secondary">
                    {errorMsg || 'No rule results. Run the check again.'}
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Popover>
    </Stack>
  );
}
