/*
 * Copyright (C) 2007-2025 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { Group, Panel, Separator, usePanelRef } from 'react-resizable-panels';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { fetchContentTypes } from '@craftercms/studio-ui/services/contentTypes';
import { fetchConfigurationXML } from '@craftercms/studio-ui/services/configuration';
import { CRAFTER_OPENSEARCH_FIELD_GROUPS } from '../utils/crafterOpenSearchFieldCatalog';
import { executeOpenSearchOnEngine, prettifyJson } from '../utils/openSearchEngine';
import {
  appendBoolMustClause,
  buildExistsClause,
  buildMatchClause,
  buildPrefixClause,
  buildRangeClause,
  buildTermClause,
  buildWildcardClause,
  readSourceArray,
  setSourceArray
} from '../utils/openSearchQueryBuilder';
import type { InferredField } from '../utils/openSearchInferSchema';
import { OpenSearchSchemaPanel } from './OpenSearchSchemaPanel';
import { OpenSearchJsonEditor } from './OpenSearchJsonEditor';

const DEFAULT_QUERY = `{
  "size": 10,
  "query": {
    "match_all": {}
  },
  "_source": ["localId", "internal-name", "content-type"]
}`;

const RESPONSE_LOADING_JSON = '{\n  "_studioOpenSearch": "Running query…"\n}\n';

const RESPONSE_EMPTY_JSON =
  '{\n  "_studioOpenSearch": "Run from the request panel (Run button or ⌘/Ctrl+Enter in the editor). Fold JSON with gutter chevrons."\n}\n';

const TEMPLATES: { label: string; body: string }[] = [
  { label: 'Match all (10 hits)', body: DEFAULT_QUERY },
  {
    label: 'Prefix on localId',
    body: `{
  "size": 20,
  "query": {
    "prefix": {
      "localId": "/site/website/"
    }
  },
  "_source": ["localId", "title_t", "content-type"]
}`
  },
  {
    label: 'Term on content-type',
    body: `{
  "size": 10,
  "query": {
    "term": {
      "content-type": {
        "value": "/page/article"
      }
    }
  }
}`
  }
];

type ExportTarget = 'curl' | 'groovy';
type SourceMode = 'default' | 'all' | 'custom';
type ExplorerTab = 'explorer' | 'dictionary';
type ContentTypeDictionaryEntry = {
  id: string;
  name: string;
};
type ContentTypeFieldEntry = { id: string; type: string; title: string; required: boolean };
const MODULE = 'studio';

function singleQuoteEscape(text: string): string {
  return text.replace(/'/g, "'\"'\"'");
}

function buildCurlExport(
  siteId: string,
  extraIndexes: string,
  queryBody: string,
  queryParams: Record<string, string | number | boolean>
): string {
  const params = new URLSearchParams();
  params.set('crafterSite', siteId);
  if (extraIndexes.trim()) {
    params.set('index', extraIndexes.trim());
  }
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value === '' || value == null) {
      return;
    }
    params.set(key, String(value));
  });
  const url = `/api/1/site/search/search.json?${params.toString()}`;
  return [
    `curl -X POST "${url}" \\`,
    '  -H "Content-Type: application/json" \\',
    '  -H "Accept: application/json" \\',
    `  --data-binary '${singleQuoteEscape(queryBody)}'`
  ].join('\n');
}

function buildGroovyExport(siteId: string, extraIndexes: string, queryBody: string): string {
  return [
    'import groovy.json.JsonSlurper',
    '',
    `def siteId = "${siteId}"`,
    `def extraIndexes = "${extraIndexes.trim()}"`,
    "def requestBody = new JsonSlurper().parseText('''",
    queryBody,
    "''') as Map",
    '',
    '// In Crafter scripts, use elasticsearch directly',
    'def result = elasticsearch.search(requestBody)',
    'return result'
  ].join('\n');
}

function parseCsv(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function applyMultiMatchFieldBoosts(value: unknown, fields: string[]): void {
  if (!value || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => applyMultiMatchFieldBoosts(entry, fields));
    return;
  }
  const obj = value as Record<string, unknown>;
  if (obj.multi_match && typeof obj.multi_match === 'object' && !Array.isArray(obj.multi_match)) {
    (obj.multi_match as Record<string, unknown>).fields = fields;
  }
  Object.values(obj).forEach((entry) => applyMultiMatchFieldBoosts(entry, fields));
}

function parseFormDefinitionFields(xml: string): ContentTypeFieldEntry[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    return [];
  }
  const nodes = Array.from(doc.querySelectorAll('form section field'));
  const mapped = nodes
    .map((node) => {
      const id = node.querySelector(':scope > id')?.textContent?.trim() ?? '';
      const type = node.querySelector(':scope > type')?.textContent?.trim() ?? '';
      const title = node.querySelector(':scope > title')?.textContent?.trim() ?? '';
      const required = Array.from(node.querySelectorAll(':scope > constraints > constraint')).some((c) => {
        const name = c.querySelector(':scope > name')?.textContent?.trim();
        const value = c.querySelector(':scope > value')?.textContent?.toLowerCase() ?? '';
        return name === 'required' && value.includes('true');
      });
      return { id, type, title, required };
    })
    .filter((entry) => entry.id);
  const deduped = new Map<string, ContentTypeFieldEntry>();
  mapped.forEach((entry) => {
    if (!deduped.has(entry.id)) {
      deduped.set(entry.id, entry);
    }
  });
  return Array.from(deduped.values());
}

function ResizeGrip({ vertical }: { vertical: boolean }) {
  if (vertical) {
    return (
      <Separator style={{ height: 10, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Box sx={{ height: 4, alignSelf: 'stretch', mx: 2, borderRadius: 1, bgcolor: 'divider' }} />
      </Separator>
    );
  }
  return (
    <Separator style={{ width: 10, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <Box sx={{ width: 4, alignSelf: 'stretch', my: 1.5, borderRadius: 1, bgcolor: 'divider' }} />
    </Separator>
  );
}

export function OpenSearchPlayground() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const explorerPanelRef = usePanelRef();
  const dictionaryRequestKeyRef = useRef<string>('');
  const dictionaryFieldsRequestKeyRef = useRef<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [explorerCollapsed, setExplorerCollapsed] = useState(false);
  const [explorerTab, setExplorerTab] = useState<ExplorerTab>('explorer');
  const [dictionaryLoading, setDictionaryLoading] = useState(false);
  const [dictionaryError, setDictionaryError] = useState('');
  const [dictionaryReloadKey, setDictionaryReloadKey] = useState(0);
  const [dictionaryItems, setDictionaryItems] = useState<ContentTypeDictionaryEntry[]>([]);
  const [dictionarySelectedId, setDictionarySelectedId] = useState('');
  const [dictionaryFieldsLoading, setDictionaryFieldsLoading] = useState(false);
  const [dictionaryFieldsError, setDictionaryFieldsError] = useState('');
  const [dictionaryFields, setDictionaryFields] = useState<ContentTypeFieldEntry[]>([]);
  const siteId = useActiveSiteId();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [response, setResponse] = useState('');
  const [extraIndexes, setExtraIndexes] = useState('');
  const [loading, setLoading] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CRAFTER_OPENSEARCH_FIELD_GROUPS.map((g) => [g.title, true]))
  );
  const [templateMenuKey, setTemplateMenuKey] = useState(0);
  const [inferredFields, setInferredFields] = useState<InferredField[]>([]);
  const [builderField, setBuilderField] = useState('');
  const [builderMode, setBuilderMode] = useState<'match' | 'term' | 'prefix' | 'wildcard' | 'range' | 'exists'>(
    'match'
  );
  const [builderValue, setBuilderValue] = useState('');
  const [builderGte, setBuilderGte] = useState('');
  const [builderLte, setBuilderLte] = useState('');
  const [apiMethod, setApiMethod] = useState<'select'>('select');
  const [optionFrom, setOptionFrom] = useState('0');
  const [optionSize, setOptionSize] = useState('10');
  const [optionTrackTotalHits, setOptionTrackTotalHits] = useState<'true' | 'false'>('true');
  const [optionSortField, setOptionSortField] = useState('');
  const [optionSortOrder, setOptionSortOrder] = useState<'asc' | 'desc'>('desc');
  const [optionSourceMode, setOptionSourceMode] = useState<SourceMode>('default');
  const [optionSourceFields, setOptionSourceFields] = useState('localId, internal-name, content-type');
  const [optionTimeout, setOptionTimeout] = useState('5s');
  const [optionTerminateAfter, setOptionTerminateAfter] = useState('');
  const [optionMinScore, setOptionMinScore] = useState('');
  const [optionEnableHighlight, setOptionEnableHighlight] = useState<'true' | 'false'>('false');
  const [optionHighlightFields, setOptionHighlightFields] = useState('title_t, body_html, description_html');
  const [optionHighlightFragmentSize, setOptionHighlightFragmentSize] = useState('150');
  const [optionHighlightNumFragments, setOptionHighlightNumFragments] = useState('2');
  const [optionEnableFacets, setOptionEnableFacets] = useState<'true' | 'false'>('false');
  const [optionFacetField, setOptionFacetField] = useState('content-type');
  const [optionFacetSize, setOptionFacetSize] = useState('20');
  const [optionEnableBoosting, setOptionEnableBoosting] = useState<'true' | 'false'>('false');
  const [optionQueryFieldBoosts, setOptionQueryFieldBoosts] = useState('title_t^3, internal-name^2, body_html');
  const [optionIndicesBoost, setOptionIndicesBoost] = useState('');
  const [optionPreference, setOptionPreference] = useState('');
  const [optionRouting, setOptionRouting] = useState('');
  const [optionSearchType, setOptionSearchType] = useState<'query_then_fetch' | 'dfs_query_then_fetch'>(
    'query_then_fetch'
  );
  const [optionAllowNoIndices, setOptionAllowNoIndices] = useState<'true' | 'false'>('true');
  const [optionAllowPartialResults, setOptionAllowPartialResults] = useState<'true' | 'false'>('true');
  const [optionIgnoreUnavailable, setOptionIgnoreUnavailable] = useState<'true' | 'false'>('false');
  const [optionTrackScores, setOptionTrackScores] = useState<'true' | 'false'>('false');
  const [optionRestTotalHitsAsInt, setOptionRestTotalHitsAsInt] = useState<'true' | 'false'>('false');
  const [optionTypedKeys, setOptionTypedKeys] = useState<'true' | 'false'>('true');
  const [optionVersionParam, setOptionVersionParam] = useState<'true' | 'false'>('false');
  const [optionSeqNoPrimaryTermParam, setOptionSeqNoPrimaryTermParam] = useState<'true' | 'false'>('false');
  const [optionAdvancedQueryParamsJson, setOptionAdvancedQueryParamsJson] = useState('{}');
  const [exportTarget, setExportTarget] = useState<ExportTarget>('curl');

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenRef.current);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setExplorerCollapsed(explorerPanelRef.current?.isCollapsed() ?? false);
    });
    return () => cancelAnimationFrame(id);
  }, [isMdUp]);

  const toggleFullscreen = useCallback(() => {
    const el = fullscreenRef.current;
    if (!el) return;
    if (document.fullscreenElement === el) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void el.requestFullscreen().catch(() => undefined);
    }
  }, []);

  const syncExplorerCollapsed = useCallback(() => {
    queueMicrotask(() => {
      setExplorerCollapsed(explorerPanelRef.current?.isCollapsed() ?? false);
    });
  }, []);

  const collapseExplorerPanel = useCallback(() => {
    explorerPanelRef.current?.collapse();
    syncExplorerCollapsed();
  }, [syncExplorerCollapsed]);

  const expandExplorerPanel = useCallback(() => {
    explorerPanelRef.current?.expand();
    syncExplorerCollapsed();
  }, [syncExplorerCollapsed]);

  const sourceIsWildcard = useMemo(() => {
    try {
      return (JSON.parse(query) as Record<string, unknown>)._source === true;
    } catch {
      return false;
    }
  }, [query]);

  const selectedFields = useMemo(() => {
    try {
      const arr = readSourceArray(JSON.parse(query) as Record<string, unknown>);
      return new Set(arr.filter((p) => p !== '*'));
    } catch {
      return new Set<string>();
    }
  }, [query]);

  const pathOptions = useMemo(() => inferredFields.map((f) => f.path), [inferredFields]);

  const toggleField = useCallback(
    (field: string, checked: boolean) => {
      try {
        const body = JSON.parse(query) as Record<string, unknown>;
        const cur = readSourceArray(body).filter((p) => p !== '*');
        const next = new Set(cur);
        if (checked) {
          next.add(field);
        } else {
          next.delete(field);
        }
        setQuery(JSON.stringify(setSourceArray(body, Array.from(next)), null, 2));
      } catch {
        dispatch(
          showSystemNotification({
            message: 'Fix JSON in the query editor before toggling fields (invalid JSON).'
          })
        );
      }
    },
    [dispatch, query]
  );

  const insertFromBuilderBar = useCallback(() => {
    if (!builderField.trim()) {
      dispatch(showSystemNotification({ message: 'Choose a field path.' }));
      return;
    }
    const field = builderField.trim();
    try {
      const body = JSON.parse(query) as Record<string, unknown>;
      let clause: Record<string, unknown> | null = null;
      if (builderMode === 'exists') {
        clause = buildExistsClause(field);
      } else if (builderMode === 'match' && builderValue.trim()) {
        clause = buildMatchClause(field, builderValue.trim());
      } else if (builderMode === 'term' && builderValue.trim()) {
        clause = buildTermClause(field, builderValue.trim());
      } else if (builderMode === 'prefix' && builderValue.trim()) {
        clause = buildPrefixClause(field, builderValue.trim());
      } else if (builderMode === 'wildcard' && builderValue.trim()) {
        clause = buildWildcardClause(field, builderValue.trim());
      } else if (builderMode === 'range' && (builderGte.trim() || builderLte.trim())) {
        clause = buildRangeClause(field, builderGte, builderLte);
      }
      if (!clause) {
        dispatch(showSystemNotification({ message: 'Enter a value (or gte/lte for range).' }));
        return;
      }
      setQuery(JSON.stringify(appendBoolMustClause(body, clause), null, 2));
      dispatch(showSystemNotification({ message: `Inserted ${builderMode} for "${field}".` }));
    } catch {
      dispatch(showSystemNotification({ message: 'Fix invalid JSON in the query editor first.' }));
    }
  }, [builderField, builderGte, builderLte, builderMode, builderValue, dispatch, query]);

  const searchQueryParams = useMemo(() => {
    let advanced: Record<string, string | number | boolean> = {};
    try {
      const parsed = JSON.parse(optionAdvancedQueryParamsJson) as unknown;
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        advanced = parsed as Record<string, string | number | boolean>;
      }
    } catch {
      advanced = {};
    }

    return {
      allow_no_indices: optionAllowNoIndices === 'true',
      allow_partial_search_results: optionAllowPartialResults === 'true',
      ignore_unavailable: optionIgnoreUnavailable === 'true',
      search_type: optionSearchType,
      preference: optionPreference.trim(),
      routing: optionRouting.trim(),
      track_scores: optionTrackScores === 'true',
      rest_total_hits_as_int: optionRestTotalHitsAsInt === 'true',
      typed_keys: optionTypedKeys === 'true',
      version: optionVersionParam === 'true',
      seq_no_primary_term: optionSeqNoPrimaryTermParam === 'true',
      ...advanced
    };
  }, [
    optionAdvancedQueryParamsJson,
    optionAllowNoIndices,
    optionAllowPartialResults,
    optionIgnoreUnavailable,
    optionPreference,
    optionRestTotalHitsAsInt,
    optionRouting,
    optionSearchType,
    optionSeqNoPrimaryTermParam,
    optionTrackScores,
    optionTypedKeys,
    optionVersionParam
  ]);

  const runQuery = useCallback(async () => {
    if (!siteId) {
      dispatch(showSystemNotification({ message: 'No active site.' }));
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const result = await executeOpenSearchOnEngine(siteId, query, extraIndexes, searchQueryParams);
      const pretty = result.parsedJson != null ? JSON.stringify(result.parsedJson, null, 2) : result.bodyText;
      setResponse(pretty);
      if (!result.ok) {
        dispatch(
          showSystemNotification({
            message: `OpenSearch returned HTTP ${result.status}. See response pane for body.`
          })
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setResponse(msg);
      dispatch(showSystemNotification({ message: `Request failed: ${msg}` }));
    } finally {
      setLoading(false);
    }
  }, [dispatch, extraIndexes, query, searchQueryParams, siteId]);

  useEffect(() => {
    setDictionaryItems([]);
    setDictionarySelectedId('');
    setDictionaryFields([]);
    setDictionaryError('');
    setDictionaryFieldsError('');
    dictionaryRequestKeyRef.current = '';
    dictionaryFieldsRequestKeyRef.current = '';
  }, [siteId]);

  useEffect(() => {
    if (explorerTab !== 'dictionary' || !siteId) {
      return;
    }
    const requestKey = `${siteId}|${dictionaryReloadKey}`;
    if (dictionaryRequestKeyRef.current === requestKey) {
      return;
    }
    dictionaryRequestKeyRef.current = requestKey;
    setDictionaryLoading(true);
    setDictionaryError('');
    const sub = fetchContentTypes(siteId).subscribe({
      next(types: Array<{ id?: string; name?: string }>) {
        const rows = (types ?? [])
          .map((type) => ({ id: (type.id ?? '').trim(), name: (type.name ?? type.id ?? '').trim() }))
          .filter((type) => type.id)
          .sort((a, b) => a.id.localeCompare(b.id));
        setDictionaryItems(rows);
        setDictionarySelectedId((prev) => (prev && rows.some((row) => row.id === prev) ? prev : rows[0]?.id ?? ''));
        setDictionaryLoading(false);
      },
      error(error) {
        const msg = error instanceof Error ? error.message : String(error);
        setDictionaryError(msg || 'Unable to load content types.');
        setDictionaryItems([]);
        setDictionaryLoading(false);
      }
    });
    return () => sub.unsubscribe();
  }, [dictionaryReloadKey, explorerTab, siteId]);

  useEffect(() => {
    dictionaryFieldsRequestKeyRef.current = '';
  }, [dictionaryReloadKey]);

  useEffect(() => {
    if (explorerTab !== 'dictionary' || !siteId || !dictionarySelectedId) {
      return;
    }
    const requestKey = `${siteId}|${dictionarySelectedId}`;
    if (dictionaryFieldsRequestKeyRef.current === requestKey) {
      return;
    }
    dictionaryFieldsRequestKeyRef.current = requestKey;
    const id = dictionarySelectedId.startsWith('/') ? dictionarySelectedId : `/${dictionarySelectedId}`;
    const formPath = `/content-types${id}/form-definition.xml`.replace(/\/{2,}/g, '/');
    setDictionaryFieldsLoading(true);
    setDictionaryFieldsError('');
    const sub = fetchConfigurationXML(siteId, formPath, MODULE).subscribe({
      next(formXml: string) {
        setDictionaryFields(parseFormDefinitionFields(formXml));
        setDictionaryFieldsLoading(false);
      },
      error(error) {
        const msg = error instanceof Error ? error.message : String(error);
        setDictionaryFieldsError(msg || 'Unable to load form-definition.xml.');
        setDictionaryFields([]);
        setDictionaryFieldsLoading(false);
      }
    });
    return () => sub.unsubscribe();
  }, [dictionarySelectedId, explorerTab, siteId]);

  const applyApiOptions = useCallback(() => {
    try {
      const body = JSON.parse(query) as Record<string, unknown>;
      if (apiMethod === 'select') {
        const size = Number(optionSize);
        const from = Number(optionFrom);

        if (!Number.isNaN(size) && size >= 0) {
          body.size = size;
        }
        if (!Number.isNaN(from) && from >= 0) {
          body.from = from;
        }

        body.track_total_hits = optionTrackTotalHits === 'true';
        if (optionTimeout.trim()) {
          body.timeout = optionTimeout.trim();
        } else {
          delete body.timeout;
        }

        const terminateAfter = Number(optionTerminateAfter);
        if (optionTerminateAfter.trim() && !Number.isNaN(terminateAfter) && terminateAfter > 0) {
          body.terminate_after = terminateAfter;
        } else {
          delete body.terminate_after;
        }

        const minScore = Number(optionMinScore);
        if (optionMinScore.trim() && !Number.isNaN(minScore)) {
          body.min_score = minScore;
        } else {
          delete body.min_score;
        }

        if (optionSortField.trim()) {
          body.sort = [{ [optionSortField.trim()]: { order: optionSortOrder } }];
        } else {
          delete body.sort;
        }

        if (optionSourceMode === 'all') {
          body._source = true;
        } else if (optionSourceMode === 'custom') {
          const fields = parseCsv(optionSourceFields);
          body._source = fields.length > 0 ? fields : true;
        } else {
          delete body._source;
        }

        if (optionEnableHighlight === 'true') {
          const fields = parseCsv(optionHighlightFields);
          const fragmentSize = Number(optionHighlightFragmentSize);
          const numFragments = Number(optionHighlightNumFragments);
          body.highlight = {
            fields: fields.reduce<Record<string, Record<string, number>>>((acc, field) => {
              acc[field] = {
                fragment_size: !Number.isNaN(fragmentSize) && fragmentSize > 0 ? fragmentSize : 150,
                number_of_fragments: !Number.isNaN(numFragments) && numFragments > 0 ? numFragments : 2
              };
              return acc;
            }, {})
          };
        } else {
          delete body.highlight;
        }

        if (optionEnableFacets === 'true' && optionFacetField.trim()) {
          const facetSize = Number(optionFacetSize);
          body.aggs = {
            facet_terms: {
              terms: {
                field: optionFacetField.trim(),
                size: !Number.isNaN(facetSize) && facetSize > 0 ? facetSize : 20
              }
            }
          };
        } else {
          delete body.aggs;
        }

        if (optionEnableBoosting === 'true') {
          const boostFields = parseCsv(optionQueryFieldBoosts);
          if (boostFields.length > 0) {
            applyMultiMatchFieldBoosts(body.query, boostFields);
          }
          const indicesBoost = optionIndicesBoost
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((entry) => entry.split('=').map((piece) => piece.trim()))
            .filter((tuple) => tuple.length === 2 && tuple[0] && tuple[1])
            .map(([index, weight]) => {
              const n = Number(weight);
              return Number.isNaN(n) ? null : { [index]: n };
            })
            .filter((entry): entry is Record<string, number> => entry != null);
          if (indicesBoost.length > 0) {
            body.indices_boost = indicesBoost;
          } else {
            delete body.indices_boost;
          }
        } else {
          delete body.indices_boost;
        }
      }

      setQuery(JSON.stringify(body, null, 2));
      dispatch(showSystemNotification({ message: 'Applied API options to query JSON.' }));
    } catch {
      dispatch(showSystemNotification({ message: 'Fix invalid JSON in the query editor first.' }));
    }
  }, [
    apiMethod,
    dispatch,
    optionFrom,
    optionSize,
    optionSortField,
    optionSortOrder,
    optionSourceFields,
    optionSourceMode,
    optionTimeout,
    optionTerminateAfter,
    optionMinScore,
    optionEnableHighlight,
    optionHighlightFields,
    optionHighlightFragmentSize,
    optionHighlightNumFragments,
    optionEnableFacets,
    optionFacetField,
    optionFacetSize,
    optionEnableBoosting,
    optionQueryFieldBoosts,
    optionIndicesBoost,
    optionTrackTotalHits,
    query
  ]);

  const exportAsCode = useCallback(() => {
    if (!siteId) {
      dispatch(showSystemNotification({ message: 'No active site to export.' }));
      return;
    }
    const code =
      exportTarget === 'curl'
        ? buildCurlExport(siteId, extraIndexes, query, searchQueryParams)
        : buildGroovyExport(siteId, extraIndexes, query);
    setResponse(code);
    dispatch(showSystemNotification({ message: `Exported as ${exportTarget}.` }));
  }, [dispatch, exportTarget, extraIndexes, query, searchQueryParams, siteId]);

  const displayedResponse = useMemo(
    () => (loading && !response ? RESPONSE_LOADING_JSON : response || RESPONSE_EMPTY_JSON),
    [loading, response]
  );

  const onPrettify = useCallback(() => {
    try {
      setQuery(prettifyJson(query));
      dispatch(showSystemNotification({ message: 'Query formatted.' }));
    } catch {
      dispatch(showSystemNotification({ message: 'Query is not valid JSON.' }));
    }
  }, [dispatch, query]);

  const onCopyQuery = useCallback(() => {
    void navigator.clipboard.writeText(query);
    dispatch(showSystemNotification({ message: 'Query copied to clipboard.' }));
  }, [dispatch, query]);

  const onCopyResponse = useCallback(() => {
    void navigator.clipboard.writeText(displayedResponse);
    dispatch(showSystemNotification({ message: 'Response copied to clipboard.' }));
  }, [dispatch, displayedResponse]);

  const orientationVertical = !isMdUp;
  const fullscreenSelectProps = useMemo(
    () => ({
      MenuProps: {
        disablePortal: true,
        container: fullscreenRef.current ?? undefined
      }
    }),
    [isFullscreen]
  );

  return (
    <Box
      ref={fullscreenRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 480,
        p: 2,
        gap: 1.5,
        boxSizing: 'border-box',
        bgcolor: 'background.default',
        ...(isFullscreen && {
          minHeight: '100vh'
        })
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap' }}>
        <SearchRoundedIcon color="primary" sx={{ mt: 0.5 }} />
        <Typography variant="h5" component="h1">
          OpenSearch
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flex: '1 1 200px' }}>
          Raw DSL against{' '}
          <Typography component="span" variant="body2" fontFamily="monospace">
            POST /api/1/site/search/search.json?crafterSite=…
          </Typography>
        </Typography>
        <Tooltip title={isFullscreen ? 'Exit full screen' : 'Full screen'}>
          <IconButton
            size="small"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
            sx={{ flexShrink: 0 }}
          >
            {isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField size="small" label="Active site" value={siteId ?? ''} disabled sx={{ minWidth: 160 }} />
        <TextField
          size="small"
          label="Extra indexes (optional)"
          placeholder="e.g. other-alias (see multi-index docs)"
          value={extraIndexes}
          onChange={(e) => setExtraIndexes(e.target.value)}
          sx={{ flex: '1 1 220px', minWidth: 200 }}
        />
        <TextField
          key={templateMenuKey}
          select
          size="small"
          label="Load template"
          defaultValue=""
          sx={{ minWidth: 200 }}
          SelectProps={{ ...fullscreenSelectProps, displayEmpty: true }}
          onChange={(e) => {
            const t = TEMPLATES.find((x) => x.label === e.target.value);
            if (t) {
              setQuery(t.body);
            }
            setTemplateMenuKey((k) => k + 1);
          }}
        >
          <MenuItem value="">
            <em>Choose…</em>
          </MenuItem>
          {TEMPLATES.map((t) => (
            <MenuItem key={t.label} value={t.label}>
              {t.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Group
          key={isMdUp ? 'opensearch-layout-wide' : 'opensearch-layout-stack'}
          id="uigoodies-opensearch-panels"
          orientation={orientationVertical ? 'vertical' : 'horizontal'}
          style={{ flex: 1, minHeight: 0, minWidth: 0, width: '100%', display: 'flex' }}
        >
          <Panel
            id="explorer"
            panelRef={explorerPanelRef}
            collapsible
            collapsedSize={orientationVertical ? 52 : 44}
            minSize={orientationVertical ? '18%' : '14%'}
            maxSize={orientationVertical ? '55%' : '42%'}
            defaultSize={orientationVertical ? '30%' : '24%'}
            onResize={syncExplorerCollapsed}
          >
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                overflow: 'hidden',
                borderRadius: 1
              }}
            >
              {!explorerCollapsed ? (
                <>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderBottom: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexShrink: 0
                    }}
                  >
                    <Tabs
                      value={explorerTab}
                      onChange={(_, value) => setExplorerTab(value as ExplorerTab)}
                      sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5 } }}
                    >
                      <Tab label="Explorer" value="explorer" />
                      <Tab label="Dictionary" value="dictionary" />
                    </Tabs>
                    <Tooltip title="Collapse explorer">
                      <IconButton
                        size="small"
                        onClick={collapseExplorerPanel}
                        aria-label="Collapse explorer"
                        edge="end"
                      >
                        {orientationVertical ? <KeyboardArrowUpRoundedIcon /> : <ChevronLeftRoundedIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {explorerTab === 'explorer' ? (
                    <Box sx={{ overflow: 'auto', flex: 1, minHeight: 0 }}>
                      <OpenSearchSchemaPanel
                        siteId={siteId}
                        extraIndexes={extraIndexes}
                        query={query}
                        setQuery={setQuery}
                        openGroups={openGroups}
                        setOpenGroups={setOpenGroups}
                        selectedFields={selectedFields}
                        toggleField={toggleField}
                        onInferredFieldsChange={setInferredFields}
                        sourceIsWildcard={sourceIsWildcard}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ overflow: 'auto', flex: 1, minHeight: 0, p: 1 }}>
                      {dictionaryLoading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                          <CircularProgress size={16} />
                          <Typography variant="body2" color="text.secondary">
                            Loading content types...
                          </Typography>
                        </Box>
                      ) : dictionaryError ? (
                        <Typography variant="body2" color="error" sx={{ p: 1 }}>
                          {dictionaryError}
                        </Typography>
                      ) : dictionaryItems.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                          No content types found.
                        </Typography>
                      ) : (
                        <>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <TextField
                              select
                              size="small"
                              label="Content type"
                              value={dictionarySelectedId}
                              onChange={(e) => setDictionarySelectedId(e.target.value)}
                              sx={{ flex: 1 }}
                              SelectProps={fullscreenSelectProps}
                            >
                              {dictionaryItems.map((entry) => (
                                <MenuItem key={entry.id} value={entry.id}>
                                  {entry.id}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Button size="small" variant="outlined" onClick={() => setDictionaryReloadKey((k) => k + 1)}>
                              Refresh
                            </Button>
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                            {dictionaryItems.find((entry) => entry.id === dictionarySelectedId)?.name ?? ''}
                          </Typography>
                          {dictionaryFieldsLoading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                              <CircularProgress size={16} />
                              <Typography variant="body2" color="text.secondary">
                                Loading fields...
                              </Typography>
                            </Box>
                          ) : dictionaryFieldsError ? (
                            <Typography variant="body2" color="error" sx={{ p: 1 }}>
                              {dictionaryFieldsError}
                            </Typography>
                          ) : dictionaryFields.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                              No fields found in this content type.
                            </Typography>
                          ) : (
                            dictionaryFields.map((field) => (
                              <Box
                                key={field.id}
                                sx={{
                                  p: 1,
                                  mb: 1,
                                  border: 1,
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  bgcolor: 'background.paper'
                                }}
                              >
                                <Typography variant="body2" fontFamily="monospace">
                                  {field.id}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {field.type}
                                  {field.required ? ' • required' : ''}
                                  {field.title ? ` • ${field.title}` : ''}
                                </Typography>
                              </Box>
                            ))
                          )}
                        </>
                      )}
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: orientationVertical ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    py: orientationVertical ? 0 : 1,
                    px: orientationVertical ? 1 : 0,
                    gap: 1
                  }}
                >
                  <Tooltip title="Explorer">
                    <IconButton
                      size="small"
                      color={explorerTab === 'explorer' ? 'primary' : 'default'}
                      onClick={() => setExplorerTab('explorer')}
                      aria-label="Explorer tab"
                    >
                      <TravelExploreRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Dictionary">
                    <IconButton
                      size="small"
                      color={explorerTab === 'dictionary' ? 'primary' : 'default'}
                      onClick={() => setExplorerTab('dictionary')}
                      aria-label="Dictionary tab"
                    >
                      <MenuBookRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Expand explorer">
                    <IconButton size="small" onClick={expandExplorerPanel} aria-label="Expand explorer">
                      {orientationVertical ? <KeyboardArrowDownRoundedIcon /> : <ChevronRightRoundedIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Paper>
          </Panel>

          <ResizeGrip vertical={orientationVertical} />

          <Panel id="request" defaultSize={orientationVertical ? '35%' : '38%'} minSize="20%">
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap'
                }}
              >
                <Typography variant="subtitle2" sx={{ flex: '1 1 auto' }}>
                  Request body (OpenSearch DSL)
                </Typography>
                <Tooltip title="Run query (⌘/Ctrl+Enter in editor)">
                  <span>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PlayArrowRoundedIcon />}
                      disabled={loading || !siteId}
                      onClick={() => void runQuery()}
                    >
                      Run
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip title="Prettify query JSON">
                  <Button size="small" variant="outlined" startIcon={<AutoFixHighRoundedIcon />} onClick={onPrettify}>
                    Prettify
                  </Button>
                </Tooltip>
                <Tooltip title="Copy query">
                  <IconButton size="small" onClick={onCopyQuery} aria-label="Copy query">
                    <ContentCopyRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <OpenSearchJsonEditor value={query} onChange={setQuery} onModEnter={() => void runQuery()} />
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  API method + options
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <TextField
                    select
                    size="small"
                    label="Method"
                    value={apiMethod}
                    onChange={(e) => setApiMethod(e.target.value as 'select')}
                    sx={{ width: 140 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="select">select</MenuItem>
                  </TextField>
                  <TextField
                    size="small"
                    label="from"
                    value={optionFrom}
                    onChange={(e) => setOptionFrom(e.target.value)}
                    sx={{ width: 110 }}
                  />
                  <TextField
                    size="small"
                    label="size"
                    value={optionSize}
                    onChange={(e) => setOptionSize(e.target.value)}
                    sx={{ width: 110 }}
                  />
                  <TextField
                    select
                    size="small"
                    label="track_total_hits"
                    value={optionTrackTotalHits}
                    onChange={(e) => setOptionTrackTotalHits(e.target.value as 'true' | 'false')}
                    sx={{ width: 170 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    size="small"
                    label="timeout"
                    value={optionTimeout}
                    onChange={(e) => setOptionTimeout(e.target.value)}
                    sx={{ width: 110 }}
                  />
                  <TextField
                    size="small"
                    label="terminate_after"
                    value={optionTerminateAfter}
                    onChange={(e) => setOptionTerminateAfter(e.target.value)}
                    sx={{ width: 140 }}
                  />
                  <TextField
                    size="small"
                    label="min_score"
                    value={optionMinScore}
                    onChange={(e) => setOptionMinScore(e.target.value)}
                    sx={{ width: 110 }}
                  />
                  <TextField
                    size="small"
                    label="preference"
                    value={optionPreference}
                    onChange={(e) => setOptionPreference(e.target.value)}
                    sx={{ width: 170 }}
                  />
                  <TextField
                    size="small"
                    label="routing"
                    value={optionRouting}
                    onChange={(e) => setOptionRouting(e.target.value)}
                    sx={{ width: 140 }}
                  />
                  <TextField
                    select
                    size="small"
                    label="search_type"
                    value={optionSearchType}
                    onChange={(e) => setOptionSearchType(e.target.value as 'query_then_fetch' | 'dfs_query_then_fetch')}
                    sx={{ width: 180 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="query_then_fetch">query_then_fetch</MenuItem>
                    <MenuItem value="dfs_query_then_fetch">dfs_query_then_fetch</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="allow_no_indices"
                    value={optionAllowNoIndices}
                    onChange={(e) => setOptionAllowNoIndices(e.target.value as 'true' | 'false')}
                    sx={{ width: 160 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="allow_partial_results"
                    value={optionAllowPartialResults}
                    onChange={(e) => setOptionAllowPartialResults(e.target.value as 'true' | 'false')}
                    sx={{ width: 190 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="ignore_unavailable"
                    value={optionIgnoreUnavailable}
                    onChange={(e) => setOptionIgnoreUnavailable(e.target.value as 'true' | 'false')}
                    sx={{ width: 170 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="track_scores"
                    value={optionTrackScores}
                    onChange={(e) => setOptionTrackScores(e.target.value as 'true' | 'false')}
                    sx={{ width: 130 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="rest_total_hits_as_int"
                    value={optionRestTotalHitsAsInt}
                    onChange={(e) => setOptionRestTotalHitsAsInt(e.target.value as 'true' | 'false')}
                    sx={{ width: 190 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="typed_keys"
                    value={optionTypedKeys}
                    onChange={(e) => setOptionTypedKeys(e.target.value as 'true' | 'false')}
                    sx={{ width: 120 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="version"
                    value={optionVersionParam}
                    onChange={(e) => setOptionVersionParam(e.target.value as 'true' | 'false')}
                    sx={{ width: 110 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="seq_no_primary_term"
                    value={optionSeqNoPrimaryTermParam}
                    onChange={(e) => setOptionSeqNoPrimaryTermParam(e.target.value as 'true' | 'false')}
                    sx={{ width: 180 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </TextField>
                  <TextField
                    size="small"
                    label="sort field"
                    value={optionSortField}
                    onChange={(e) => setOptionSortField(e.target.value)}
                    sx={{ width: 170 }}
                  />
                  <TextField
                    select
                    size="small"
                    label="sort order"
                    value={optionSortOrder}
                    onChange={(e) => setOptionSortOrder(e.target.value as 'asc' | 'desc')}
                    sx={{ width: 120 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="desc">desc</MenuItem>
                    <MenuItem value="asc">asc</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="_source mode"
                    value={optionSourceMode}
                    onChange={(e) => setOptionSourceMode(e.target.value as SourceMode)}
                    sx={{ width: 150 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="default">default</MenuItem>
                    <MenuItem value="all">all</MenuItem>
                    <MenuItem value="custom">custom</MenuItem>
                  </TextField>
                  {optionSourceMode === 'custom' ? (
                    <TextField
                      size="small"
                      label="_source fields (csv)"
                      value={optionSourceFields}
                      onChange={(e) => setOptionSourceFields(e.target.value)}
                      sx={{ flex: '1 1 260px', minWidth: 220 }}
                    />
                  ) : null}
                  <TextField
                    select
                    size="small"
                    label="highlight"
                    value={optionEnableHighlight}
                    onChange={(e) => setOptionEnableHighlight(e.target.value as 'true' | 'false')}
                    sx={{ width: 120 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="false">off</MenuItem>
                    <MenuItem value="true">on</MenuItem>
                  </TextField>
                  {optionEnableHighlight === 'true' ? (
                    <>
                      <TextField
                        size="small"
                        label="highlight fields (csv)"
                        value={optionHighlightFields}
                        onChange={(e) => setOptionHighlightFields(e.target.value)}
                        sx={{ flex: '2 1 240px', minWidth: 220 }}
                      />
                      <TextField
                        size="small"
                        label="fragment size"
                        value={optionHighlightFragmentSize}
                        onChange={(e) => setOptionHighlightFragmentSize(e.target.value)}
                        sx={{ width: 130 }}
                      />
                      <TextField
                        size="small"
                        label="# fragments"
                        value={optionHighlightNumFragments}
                        onChange={(e) => setOptionHighlightNumFragments(e.target.value)}
                        sx={{ width: 120 }}
                      />
                    </>
                  ) : null}
                  <TextField
                    select
                    size="small"
                    label="faceting"
                    value={optionEnableFacets}
                    onChange={(e) => setOptionEnableFacets(e.target.value as 'true' | 'false')}
                    sx={{ width: 120 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="false">off</MenuItem>
                    <MenuItem value="true">on</MenuItem>
                  </TextField>
                  {optionEnableFacets === 'true' ? (
                    <>
                      <TextField
                        size="small"
                        label="facet field"
                        value={optionFacetField}
                        onChange={(e) => setOptionFacetField(e.target.value)}
                        sx={{ width: 170 }}
                      />
                      <TextField
                        size="small"
                        label="facet size"
                        value={optionFacetSize}
                        onChange={(e) => setOptionFacetSize(e.target.value)}
                        sx={{ width: 120 }}
                      />
                    </>
                  ) : null}
                  <TextField
                    select
                    size="small"
                    label="boosting"
                    value={optionEnableBoosting}
                    onChange={(e) => setOptionEnableBoosting(e.target.value as 'true' | 'false')}
                    sx={{ width: 120 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="false">off</MenuItem>
                    <MenuItem value="true">on</MenuItem>
                  </TextField>
                  {optionEnableBoosting === 'true' ? (
                    <>
                      <TextField
                        size="small"
                        label="query field boosts (csv)"
                        value={optionQueryFieldBoosts}
                        onChange={(e) => setOptionQueryFieldBoosts(e.target.value)}
                        sx={{ flex: '2 1 240px', minWidth: 220 }}
                      />
                      <TextField
                        size="small"
                        label="indices_boost (csv index=weight)"
                        value={optionIndicesBoost}
                        onChange={(e) => setOptionIndicesBoost(e.target.value)}
                        sx={{ flex: '2 1 240px', minWidth: 220 }}
                      />
                    </>
                  ) : null}
                  <TextField
                    size="small"
                    label="advanced query params JSON"
                    value={optionAdvancedQueryParamsJson}
                    onChange={(e) => setOptionAdvancedQueryParamsJson(e.target.value)}
                    sx={{ flex: '2 1 320px', minWidth: 260 }}
                    multiline
                    minRows={2}
                  />
                  <Button size="small" variant="outlined" onClick={applyApiOptions}>
                    Apply options
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Quick insert (appends to{' '}
                  <Typography component="span" fontFamily="monospace">
                    bool.must
                  </Typography>
                  ). Load schema first for field autocomplete.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'flex-start' }}>
                  <TextField
                    size="small"
                    sx={{ flex: '1 1 180px', minWidth: 160 }}
                    label="Field path"
                    placeholder="localId"
                    value={builderField}
                    onChange={(e) => setBuilderField(e.target.value)}
                    inputProps={{ list: 'uigoodies-opensearch-field-paths' }}
                  />
                  <datalist id="uigoodies-opensearch-field-paths">
                    {pathOptions.map((p) => (
                      <option key={p} value={p} />
                    ))}
                  </datalist>
                  <TextField
                    select
                    size="small"
                    label="Clause"
                    value={builderMode}
                    onChange={(e) =>
                      setBuilderMode(e.target.value as 'match' | 'term' | 'prefix' | 'wildcard' | 'range' | 'exists')
                    }
                    sx={{ width: 130 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="match">match</MenuItem>
                    <MenuItem value="term">term</MenuItem>
                    <MenuItem value="prefix">prefix</MenuItem>
                    <MenuItem value="wildcard">wildcard</MenuItem>
                    <MenuItem value="range">range</MenuItem>
                    <MenuItem value="exists">exists</MenuItem>
                  </TextField>
                  {builderMode === 'range' ? (
                    <>
                      <TextField
                        size="small"
                        label="gte"
                        value={builderGte}
                        onChange={(e) => setBuilderGte(e.target.value)}
                        sx={{ width: 140 }}
                      />
                      <TextField
                        size="small"
                        label="lte"
                        value={builderLte}
                        onChange={(e) => setBuilderLte(e.target.value)}
                        sx={{ width: 140 }}
                      />
                    </>
                  ) : builderMode === 'exists' ? null : (
                    <TextField
                      size="small"
                      label={builderMode === 'wildcard' ? 'Pattern' : 'Value'}
                      value={builderValue}
                      onChange={(e) => setBuilderValue(e.target.value)}
                      sx={{ flex: '2 1 200px', minWidth: 160 }}
                      multiline={builderMode === 'match'}
                      minRows={builderMode === 'match' ? 2 : 1}
                    />
                  )}
                  <Button size="small" variant="outlined" onClick={insertFromBuilderBar}>
                    Insert clause
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderTop: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap'
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Export as
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    select
                    size="small"
                    label="Format"
                    value={exportTarget}
                    onChange={(e) => setExportTarget(e.target.value as ExportTarget)}
                    sx={{ width: 120 }}
                    SelectProps={fullscreenSelectProps}
                  >
                    <MenuItem value="curl">Curl</MenuItem>
                    <MenuItem value="groovy">Groovy</MenuItem>
                  </TextField>
                  <Button size="small" variant="outlined" onClick={exportAsCode} disabled={!siteId}>
                    Export
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Panel>

          <ResizeGrip vertical={orientationVertical} />

          <Panel id="response" defaultSize={orientationVertical ? '35%' : '38%'} minSize="20%">
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                bgcolor: (t) => (t.palette.mode === 'dark' ? 'action.hover' : 'grey.50')
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  flexShrink: 0,
                  bgcolor: 'background.paper'
                }}
              >
                <Typography variant="subtitle2" color="text.primary">
                  Response
                </Typography>
                <Tooltip title="Copy response JSON">
                  <IconButton size="small" onClick={onCopyResponse} aria-label="Copy response">
                    <ContentCopyRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <OpenSearchJsonEditor readOnly value={displayedResponse} />
            </Paper>
          </Panel>
        </Group>
      </Box>
    </Box>
  );
}

export default OpenSearchPlayground;
