import { siteHeaderSchema } from '../../content/schemas/site-header';
import type { JsonValue } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

export interface SiteHeaderEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: string, next: JsonValue) => void;
  onContentReplace?: (next: JsonValue) => void;
}

export default function SiteHeaderEditorContentModules({
  contentJson,
  onContentReplace
}: SiteHeaderEditorContentModulesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Header</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <SchemaForm
          schema={siteHeaderSchema as any}
          value={contentJson}
          onChange={(next) => onContentReplace?.(next)}
          pathLabel="Header"
        />
      </CardBody>
    </Card>
  );
}