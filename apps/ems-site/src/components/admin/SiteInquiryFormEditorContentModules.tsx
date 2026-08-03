import { siteInquiryFormSchema } from '../../content/schemas/site-inquiry-form';
import type { JsonValue } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

export interface SiteInquiryFormEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: string, next: JsonValue) => void;
  onContentReplace?: (next: JsonValue) => void;
}

export default function SiteInquiryFormEditorContentModules({
  contentJson,
  onContentReplace
}: SiteInquiryFormEditorContentModulesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inquiry Form</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <SchemaForm
          schema={siteInquiryFormSchema as any}
          value={contentJson}
          onChange={(next) => onContentReplace?.(next)}
          pathLabel="Inquiry Form"
        />
      </CardBody>
    </Card>
  );
}