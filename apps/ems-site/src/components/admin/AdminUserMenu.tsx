import { useEffect, useMemo, useState } from 'react';

import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import { getHref } from '../../lib/assets';
import { Button } from './ui';

export default function AdminUserMenu() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!supabase) return;
      const res = await supabase.auth.getUser();
      if (cancelled) return;
      setEmail(res.data.user?.email ?? null);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  return (
    <div className="flex items-center gap-2">
      {email ? <span className="hidden text-sm text-[var(--admin-fg-muted)] md:inline">{email}</span> : null}
      <a href={getHref('/')} className="hidden md:inline" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="sm" type="button">
          View site
        </Button>
      </a>
    </div>
  );
}
