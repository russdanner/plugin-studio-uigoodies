/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import { fetchChildrenByPath, fetchContentXML } from '@craftercms/studio-ui/services/content';
import { take } from 'rxjs/operators';
import {
  ImageRequirement,
  parseRangeProperty
} from './imageStudioUtils';

const CONTENT_TYPES_ROOT = '/config/studio/content-types';
const FETCH_LIMIT = 500;

async function collectFormDefinitionPaths(siteId: string): Promise<string[]> {
  const paths: string[] = [];
  const queue = [CONTENT_TYPES_ROOT];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const response = await fetchChildrenByPath(siteId, current, { limit: FETCH_LIMIT }).pipe(take(1)).toPromise();
    if (!response) {
      continue;
    }
    for (let i = 0; i < response.length; i++) {
      const item = response[i];
      if (!item?.path) {
        continue;
      }
      if (item.path.endsWith('/form-definition.xml')) {
        paths.push(item.path);
      } else if (item.systemType === 'folder' || item.path.split('/').length < 8) {
        queue.push(item.path);
      }
    }
  }
  return paths;
}

function getFieldPropertyValue(field: Element, propertyName: string): string | undefined {
  const properties = field.querySelectorAll('properties > property');
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const name = property.querySelector('name')?.textContent?.trim();
    if (name === propertyName) {
      return property.querySelector('value')?.textContent?.trim();
    }
  }
  return undefined;
}

function parseImageRequirementsFromXml(xml: string, formPath: string): ImageRequirement[] {
  const results: ImageRequirement[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const contentTypeNode = doc.querySelector('content-type');
  const contentType =
    contentTypeNode?.textContent?.trim() ??
    formPath.replace('/config/studio/content-types/', '').replace('/form-definition.xml', '');
  const titleNode = doc.querySelector('title');
  const contentTypeLabel = titleNode?.textContent?.trim() ?? contentType;

  const fields = doc.querySelectorAll('field');
  fields.forEach((field) => {
    const type = field.querySelector('type')?.textContent?.trim();
    if (type !== 'image-picker') {
      return;
    }
    const fieldId = field.querySelector('id')?.textContent?.trim() ?? '';
    const fieldTitle = field.querySelector('title')?.textContent?.trim() ?? fieldId;
    const widthProp = getFieldPropertyValue(field, 'width');
    const heightProp = getFieldPropertyValue(field, 'height');

    const width = parseRangeProperty(widthProp ?? undefined);
    const height = parseRangeProperty(heightProp ?? undefined);

    if (
      width.exact == null &&
      width.min == null &&
      width.max == null &&
      height.exact == null &&
      height.min == null &&
      height.max == null
    ) {
      results.push({
        contentType: contentType.startsWith('/') ? contentType : `/page/${contentType}`,
        contentTypeLabel,
        fieldId,
        fieldTitle
      });
      return;
    }

    results.push({
      contentType: contentType.startsWith('/') ? contentType : contentType.includes('/') ? contentType : `/component/${contentType}`,
      contentTypeLabel,
      fieldId,
      fieldTitle,
      widthMin: width.min,
      widthMax: width.max,
      widthExact: width.exact,
      heightMin: height.min,
      heightMax: height.max,
      heightExact: height.exact
    });
  });

  return results;
}

export async function scanImageSizeRequirements(siteId: string): Promise<ImageRequirement[]> {
  const formPaths = await collectFormDefinitionPaths(siteId);
  const all: ImageRequirement[] = [];

  for (const path of formPaths) {
    try {
      const xml = await fetchContentXML(siteId, path).pipe(take(1)).toPromise();
      if (!xml) {
        continue;
      }
      all.push(...parseImageRequirementsFromXml(xml, path));
    } catch {
      // skip unreadable definitions
    }
  }

  return all.sort((a, b) => {
    const labelCmp = a.contentTypeLabel.localeCompare(b.contentTypeLabel);
    return labelCmp !== 0 ? labelCmp : a.fieldTitle.localeCompare(b.fieldTitle);
  });
}
