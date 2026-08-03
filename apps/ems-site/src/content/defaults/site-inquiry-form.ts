import { emsHomeDefaults } from './ems';

export const siteInquiryFormDefaults = {
  title: 'Get Free Quote Now',
  description: 'Leave your contact information and project details, we will contact you ASAP!',
  background_image_url: emsHomeDefaults.quote_form.background_image_url,
  name_field: {
    label: 'Name',
    placeholder: 'John Smith',
    required: true
  },
  company_field: {
    label: 'Company',
    placeholder: 'Your Company Inc.',
    required: true
  },
  email_field: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    required: true
  },
  phone_field: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    required: true
  },
  message_field: {
    label: 'Message',
    placeholder: 'Please specify your requirements, quantity, delivery timeline, or any special requests...',
    required: true
  },
  upload: {
    label: 'Attachment',
    optional_text: '(Optional)',
    button_text: 'Click to upload or drag and drop',
    help_text: 'Supported formats: ZIP, RAR, PDF, Gerber (Max 20MB)'
  },
  submit_label: 'SUBMIT REQUEST'
} as const;
