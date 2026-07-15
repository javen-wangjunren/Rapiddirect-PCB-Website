import { createClient } from '@supabase/supabase-js';

import { serverEnv } from '../env/server';

let cachedClient: ReturnType<typeof createClient> | null | undefined;

export const createServerAdminSupabaseClient = () => {
  if (cachedClient !== undefined) return cachedClient;
  if (!serverEnv.supabaseUrl || !serverEnv.supabaseServiceRoleKey) {
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(serverEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
  return cachedClient;
};
