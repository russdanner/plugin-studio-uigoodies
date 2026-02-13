// shim

export const PREVIEW_URL_PATH = '/preview';

export type SystemLinkId =
  | 'preview'
  | 'siteTools'
  | 'siteSearch'
  | 'siteDashboard'
  | 'siteToolsDialog'
  | 'siteSearchDialog'
  | 'siteDashboardDialog';

export function getSystemLink({
  systemLinkId,
  authoringBase,
  site,
  page = '/'
}: {
  systemLinkId: SystemLinkId;
  authoringBase: string;
  site: string;
  page?: string;
}) {
  return {
    preview: `${authoringBase}${PREVIEW_URL_PATH}#/?page=${page}&site=${site}`,
    siteTools: `${authoringBase}/site-config`,
    siteSearch: `${authoringBase}/search`,
    siteDashboard: `${authoringBase}/site-dashboard`
  }[systemLinkId];
}

export function copyToClipboard(textToCopy: string): Promise<void> {
  return navigator.clipboard.writeText(textToCopy);
}
