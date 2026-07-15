import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

export const normalizeSiteInquiryFormContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const obj = input as any;
  return {
    ...obj,
    background_image_url: asString(obj.background_image_url)
  } as any;
};
