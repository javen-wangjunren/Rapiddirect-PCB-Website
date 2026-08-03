export const siteInquiryFormSchema = {
  title: 'string',
  description: 'string',
  background_image_url: 'string',
  name_field: {
    label: 'string',
    placeholder: 'string',
    required: 'boolean'
  },
  company_field: {
    label: 'string',
    placeholder: 'string',
    required: 'boolean'
  },
  email_field: {
    label: 'string',
    placeholder: 'string',
    required: 'boolean'
  },
  phone_field: {
    label: 'string',
    placeholder: 'string',
    required: 'boolean'
  },
  message_field: {
    label: 'string',
    placeholder: 'string',
    required: 'boolean'
  },
  upload: {
    label: 'string',
    optional_text: 'string',
    button_text: 'string',
    help_text: 'string'
  },
  submit_label: 'string'
} as const;
