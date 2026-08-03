import { siteFooterSchema } from '../../content/schemas/site-footer';
import type { JsonValue } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

export interface SiteFooterEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: string, next: JsonValue) => void;
  onContentReplace?: (next: JsonValue) => void;
}

export default function SiteFooterEditorContentModules({
  contentJson,
  onContentReplace
}: SiteFooterEditorContentModulesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <SchemaForm
          schema={siteFooterSchema as any}
          value={contentJson}
          onChange={(next) => onContentReplace?.(next)}
          pathLabel="Footer"
        />
      </CardBody>
    </Card>
  );
}