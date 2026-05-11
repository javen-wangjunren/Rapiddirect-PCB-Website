const readEnv = (key: string): string | undefined => {
  return import.meta.env[key];
};

const readBool = (key: string): boolean | undefined => {
  const v = readEnv(key);
  if (v == null) return undefined;
  const s = String(v).trim().toLowerCase();
  if (s === '1' || s === 'true' || s === 'yes' || s === 'on') return true;
  if (s === '0' || s === 'false' || s === 'no' || s === 'off') return false;
  return undefined;
};

export const env = {
  supabaseUrl: readEnv('PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: readEnv('PUBLIC_SUPABASE_ANON_KEY'),
  contactEndpoint: readEnv('PUBLIC_CONTACT_ENDPOINT') ?? '/api/contact',
  turnstileSiteKey: readEnv('PUBLIC_TURNSTILE_SITE_KEY'),
  mediaFolderIdEnabled: readBool('PUBLIC_MEDIA_FOLDER_ID_ENABLED') ?? false
};
