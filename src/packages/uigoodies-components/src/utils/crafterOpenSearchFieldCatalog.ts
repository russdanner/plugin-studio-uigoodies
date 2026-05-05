/**
 * Common CrafterCMS authoring / delivery index field names for the explorer.
 * Not exhaustive — helps authors build `_source` and remember typical keys.
 */
export type FieldGroup = { title: string; fields: string[] };

export const CRAFTER_OPENSEARCH_FIELD_GROUPS: FieldGroup[] = [
  {
    title: 'Identity & path',
    fields: ['localId', 'objectId', 'internal-name', 'content-type', 'display-template', 'file-name']
  },
  {
    title: 'Navigation & SEO',
    fields: ['navLabel', 'placeInNav', 'disabled', 'title_t', 'seoDescription_t', 'seoKeywords_t']
  },
  {
    title: 'Timestamps',
    fields: ['createdDate_dt', 'lastModifiedDate_dt', 'publishDate_dt']
  },
  {
    title: 'Common text / HTML',
    fields: ['body_html', 'description_html', 'summary_t', 'subject_t']
  },
  {
    title: 'Other',
    fields: ['merge-strategy', 'folder-name', 'disabled_b']
  }
];
