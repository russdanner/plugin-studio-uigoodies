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
import LinkRounded from '@mui/icons-material/LinkRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import usePreviewGuest from '@craftercms/studio-ui/hooks/usePreviewGuest';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { guestPageUrl, getPreviewHtml, extractHttpUrlsFromAnchors, extractAnchorUrlRefs, selectorsByUrl } from './previewHtml';
import { validateAllLinks, ValidateResultRow } from './studioApi';
import { usePreviewToolbarAutoRecheck } from './previewToolbarShared';
import JumpToPreviewButton from './JumpToPreviewButton';

const RUNNING_BLUE = '#1976d2';
const OK_GREEN = '#2e7d32';
const FAIL_RED = '#c62828';

export default function LinkCheckToolbar() {
  const guest = usePreviewGuest();
  const siteId = useActiveSiteId() ?? '';
  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [broken, setBroken] = React.useState<ValidateResultRow[]>([]);
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
    setBroken([]);
    setLastOk(null);

    try {
      const html = await getPreviewHtml(pageUrl);
      if (seq !== runSeq.current) {
        return;
      }
      if (!html) {
        setErrorMsg('Could not read preview markup (try again after preview loads).');
        setBroken([]);
        setLastOk(false);
        return;
      }

      const urls = extractHttpUrlsFromAnchors(html, pageUrl);
      const anchorRefs = extractAnchorUrlRefs(html, pageUrl);
      const urlSelectors = selectorsByUrl(anchorRefs);
      if (urls.length === 0) {
        setProgress(100);
        setLastOk(true);
        return;
      }

      setProgress(25);
      const { results = [] } = await validateAllLinks(urls, {
        previewOrigin: guest?.origin ?? null
      });
      if (seq !== runSeq.current) {
        return;
      }

      setProgress(100);
      /** All hrefs were external (different origin) — nothing to validate in-browser; counts as OK. */
      if (urls.length > 0 && results.length === 0) {
        setBroken([]);
        setLastOk(true);
        return;
      }
      const bad = results
        .filter((r) => r && r.ok !== true)
        .map((row) => ({
          ...row,
          selectors: urlSelectors.get(row.url) ?? []
        }));
      setBroken(bad);
      setLastOk(bad.length === 0);
    } catch (e) {
      if (seq !== runSeq.current) {
        return;
      }
      setBroken([]);
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setLastOk(false);
    } finally {
      if (seq === runSeq.current) {
        setRunning(false);
      }
    }
  }, [siteId, pageUrl, guest]);

  const runCheckRef = React.useRef(runCheck);
  runCheckRef.current = runCheck;

  usePreviewToolbarAutoRecheck(runCheckRef, guest);

  const openMenu = Boolean(anchorMenu);
  /** Any failed check: broken links and/or errorMsg (not “no preview” pre-check which sets lastOk null). */
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
              ? 'Checking links…'
              : lastOk === true
                ? 'All links responded successfully'
                : lastOk === false
                  ? errorMsg
                    ? errorMsg + ' — use the chevron for details'
                    : 'Some links failed — use the chevron for details'
                  : 'Check links on the current preview page'
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
            aria-label="Check links on preview page"
            sx={{
              color: iconColor,
              '&:hover': { color: running ? RUNNING_BLUE : iconColor }
            }}
          >
            <LinkRounded fontSize="small" />
          </IconButton>
        </Box>
      </Tooltip>

      {showChevron && (
        <Tooltip title={broken.length > 0 ? 'Show broken links report' : 'Show error details'}>
          <IconButton
            ref={chevronRef}
            size="small"
            onClick={(e) => setAnchorMenu(e.currentTarget)}
            aria-label="Open link check report"
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
          sx: { maxWidth: 480, maxHeight: 360, mt: 0.5 }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2">
            {broken.length > 0 ? `Broken links (${broken.length})` : 'Link check'}
          </Typography>
        </Box>
        <List dense disablePadding sx={{ py: 0 }}>
          {broken.length > 0 ? (
            broken.map((row) => (
              <ListItem
                key={row.url}
                alignItems="flex-start"
                sx={{ py: 1.5, px: 2, display: 'flex', gap: 1 }}
              >
                <ListItemText
                  sx={{ flex: 1, minWidth: 0, m: 0 }}
                  primary={
                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                      {row.url}
                    </Typography>
                  }
                  secondary={
                    row.detail ||
                    (row.status != null
                      ? `HTTP ${row.status}` +
                        (row.checkedBy ? ` (checked ${row.checkedBy})` : '')
                      : row.error || 'Request failed')
                  }
                />
                <Box sx={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                  <JumpToPreviewButton selector={row.selectors?.[0]} onJump={() => setAnchorMenu(null)} />
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ py: 1.5, px: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.secondary">
                    {errorMsg || 'No per-URL results. Try running the check again.'}
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
