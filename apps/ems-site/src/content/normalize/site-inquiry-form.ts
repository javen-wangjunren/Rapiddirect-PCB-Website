import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');
const asBool = (value: unknown) => (typeof value === 'boolean' ? value : false);

const asField = (value: unknown) => {
  if (!isObject(value)) return { label: '', placeholder: '', required: false };
  const v = value as any;
  return {
    label: asString(v.label),
    placeholder: asString(v.placeholder),
    required: asBool(v.required)
  };
};

const asUpload = (value: unknown) => {
  if (!isObject(value)) return { label: '', optional_text: '', button_text: '', help_text: '' };
  const v = value as any;
  return {
    label: asString(v.label),
    optional_text: asString(v.optional_text),
    button_text: asString(v.button_text),
    help_text: asString(v.help_text)
  };
};

export const normalizeSiteInquiryFormContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const obj = input as any;
  return {
    ...obj,
    title: asString(obj.title),
    description: asString(obj.description),
    background_image_url: asString(obj.background_image_url),
    name_field: asField(obj.name_field),
    company_field: asField(obj.company_field),
    email_field: asField(obj.email_field),
    phone_field: asField(obj.phone_field),
    message_field: asField(obj.message_field),
    upload: asUpload(obj.upload),
    submit_label: asString(obj.submit_label)
  } as any;
};
