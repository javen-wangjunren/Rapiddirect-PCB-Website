export interface MetaInput {
  title: string;
  description: string;
}

export const createMeta = ({ title, description }: MetaInput): MetaInput => ({
  title,
  description
});
