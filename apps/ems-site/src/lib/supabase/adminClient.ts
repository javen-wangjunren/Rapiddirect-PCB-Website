import { createClient } from '@supabase/supabase-js';

import { env } from '../env';

let cachedClient: ReturnType<typeof createClient> | null | undefined;

export const createAdminSupabaseClient = () => {
  if (cachedClient !== undefined) return cachedClient;
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
  return cachedClient;
};
