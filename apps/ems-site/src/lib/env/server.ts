const readServerEnv = (key: string): string | undefined => {
  const value = import.meta.env[key];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

export const serverEnv = {
  supabaseUrl: readServerEnv('PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: readServerEnv('PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: readServerEnv('SUPABASE_SERVICE_ROLE_KEY'),
  previewSigningSecret: readServerEnv('PREVIEW_SIGNING_SECRET')
};
