/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import { fetchContentXML, updateField } from '@craftercms/studio-ui/services/content';
import { fetchContentTypes } from '@craftercms/studio-ui/services/contentTypes';
import type ContentType from '@craftercms/studio-ui/models/ContentType';
import type { ContentTypeField } from '@craftercms/studio-ui/models/ContentType';
import type LookupTable from '@craftercms/studio-ui/models/LookupTable';
import { take } from 'rxjs/operators';
import {
  ImageRequirement,
  parseRangeProperty
} from './imageStudioUtils';

export type ContentTypeFormOption = {
  formPath: string;
  contentType: string;
  label: string;
};

function labelFromFormPath(formPath: string): string {
  const relative = formPath
    .replace('/config/studio/content-types/', '')
    .replace('/form-definition.xml', '');
  const parts = relative.split('/').filter(Boolean);
  if (parts.length >= 2) {
    const category = parts[0];
    const name = parts.slice(1).join(' / ');
    const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
    return `${name} (${categoryLabel})`;
  }
  return relative;
}

function contentTypeIdFromFormPath(formPath: string): string {
  const relative = formPath
    .replace('/config/studio/content-types/', '')
    .replace('/form-definition.xml', '');
  const parts = relative.split('/').filter(Boolean);
  if (parts.length >= 2) {
    return `/${parts[0]}/${parts.slice(1).join('/')}`;
  }
  return relative.startsWith('/') ? relative : `/${relative}`;
}

export type ImagePickerFieldOption = {
  fieldId: string;
  fieldTitle: string;
};

export function parseImagePickerFieldsFromXml(xml: string): ImagePickerFieldOption[] {
  const results: ImagePickerFieldOption[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  doc.querySelectorAll('field').forEach((field) => {
    const type = field.querySelector('type')?.textContent?.trim();
    if (type !== 'image-picker') {
      return;
    }
    const fieldId = field.querySelector('id')?.textContent?.trim() ?? '';
    const fieldTitle = field.querySelector('title')?.textContent?.trim() ?? fieldId;
    if (fieldId) {
      results.push({ fieldId, fieldTitle });
    }
  });
  return results;
}

function contentTypeToFormPath(contentType: string): string {
  const normalized = contentType.replace(/^\//, '');
  return `/config/studio/content-types/${normalized}/form-definition.xml`;
}

export async function loadImagePickerFieldsForContent(
  siteId: string,
  contentPath: string
): Promise<{ objectId: string; contentType: string; fields: ImagePickerFieldOption[] }> {
  const xml = await fetchContentXML(siteId, contentPath).pipe(take(1)).toPromise();
  if (!xml) {
    return { objectId: '', contentType: '', fields: [] };
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const contentType = doc.querySelector('content-type')?.textContent?.trim() ?? '';
  const objectId = doc.querySelector('objectId')?.textContent?.trim() ?? '';
  const formPath = contentTypeToFormPath(contentType);
  const formXml = await fetchContentXML(siteId, formPath).pipe(take(1)).toPromise();
  const fields = formXml ? parseImagePickerFieldsFromXml(formXml) : [];
  return { objectId, contentType, fields };
}

export async function updateContentImageField(
  siteId: string,
  contentPath: string,
  objectId: string,
  fieldId: string,
  imagePath: string
): Promise<void> {
  await updateField(siteId, objectId, fieldId, null, contentPath, imagePath, false).pipe(take(1)).toPromise();
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
  const pathContentType = contentTypeIdFromFormPath(formPath);
  const xmlContentType = contentTypeNode?.textContent?.trim();
  const contentType =
    xmlContentType?.startsWith('/')
      ? xmlContentType
      : xmlContentType
        ? pathContentType.includes(xmlContentType)
          ? pathContentType
          : `/${xmlContentType}`
        : pathContentType;
  const titleNode = doc.querySelector('title');
  const contentTypeLabel = titleNode?.textContent?.trim() ?? labelFromFormPath(formPath);

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
        contentType,
        contentTypeLabel,
        fieldId,
        fieldTitle
      });
      return;
    }

    results.push({
      contentType,
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

export function contentTypeFormOptionsFromCatalog(types: ContentType[]): ContentTypeFormOption[] {
  return types
    .map((ct) => ({
      formPath: contentTypeToFormPath(ct.id),
      contentType: ct.id,
      label: ct.name?.trim() || labelFromFormPath(contentTypeToFormPath(ct.id))
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function collectContentTypeFields(fields: LookupTable<ContentTypeField> | undefined, acc: ContentTypeField[] = []) {
  if (!fields) {
    return acc;
  }
  Object.values(fields).forEach((field) => {
    acc.push(field);
    if (field.fields) {
      collectContentTypeFields(field.fields, acc);
    }
  });
  return acc;
}

function dimensionFromValidation(
  validations: ContentTypeField['validations'],
  exactKey: 'width' | 'height',
  minKey: 'minWidth' | 'minHeight',
  maxKey: 'maxWidth' | 'maxHeight'
): { exact?: number; min?: number; max?: number } {
  const exactVal = validations[exactKey]?.value;
  if (exactVal != null && exactVal !== '' && Number.isFinite(Number(exactVal))) {
    return { exact: Number(exactVal) };
  }
  const min = validations[minKey]?.value;
  const max = validations[maxKey]?.value;
  return {
    min: min != null && min !== '' && Number.isFinite(Number(min)) ? Number(min) : undefined,
    max: max != null && max !== '' && Number.isFinite(Number(max)) ? Number(max) : undefined
  };
}

/** Build image-picker requirements from an in-memory ContentType (no extra API call). */
export function parseImageRequirementsFromContentType(contentType: ContentType): ImageRequirement[] {
  const fields = collectContentTypeFields(contentType.fields);
  const results: ImageRequirement[] = [];

  fields.forEach((field) => {
    if (field.type !== 'image') {
      return;
    }
    const width = dimensionFromValidation(field.validations, 'width', 'minWidth', 'maxWidth');
    const height = dimensionFromValidation(field.validations, 'height', 'minHeight', 'maxHeight');

    results.push({
      contentType: contentType.id,
      contentTypeLabel: contentType.name,
      fieldId: field.id,
      fieldTitle: field.name || field.id,
      widthMin: width.min,
      widthMax: width.max,
      widthExact: width.exact,
      heightMin: height.min,
      heightMax: height.max,
      heightExact: height.exact
    });
  });

  return results.sort((a, b) => a.fieldTitle.localeCompare(b.fieldTitle));
}

/** Lists content types via Crafter model API (single request). */
export async function listContentTypeFormOptions(siteId: string): Promise<ContentTypeFormOption[]> {
  const types = await fetchContentTypes(siteId).pipe(take(1)).toPromise();
  return contentTypeFormOptionsFromCatalog(types ?? []);
}

/** Fetches image-picker constraints for a single content type. */
export async function fetchImageRequirementsForForm(
  siteId: string,
  formPath: string
): Promise<ImageRequirement[]> {
  const contentTypeId = contentTypeIdFromFormPath(formPath);
  const types = await fetchContentTypes(siteId).pipe(take(1)).toPromise();
  const match = types?.find((ct) => ct.id === contentTypeId);
  if (match) {
    return parseImageRequirementsFromContentType(match);
  }

  const xml = await fetchContentXML(siteId, formPath).pipe(take(1)).toPromise();
  if (!xml) {
    return [];
  }
  return parseImageRequirementsFromXml(xml, formPath).sort((a, b) => a.fieldTitle.localeCompare(b.fieldTitle));
}

/** @deprecated Scans every form definition — use fetchContentTypes instead. */
export async function scanImageSizeRequirements(siteId: string): Promise<ImageRequirement[]> {
  const types = await fetchContentTypes(siteId).pipe(take(1)).toPromise();
  if (!types?.length) {
    return [];
  }
  const all = types.flatMap((ct) => parseImageRequirementsFromContentType(ct));
  return all.sort((a, b) => {
    const labelCmp = a.contentTypeLabel.localeCompare(b.contentTypeLabel);
    return labelCmp !== 0 ? labelCmp : a.fieldTitle.localeCompare(b.fieldTitle);
  });
}
