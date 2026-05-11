import { useEffect, useMemo, useState } from 'react';

import { getAssetPath } from '../../lib/assets';
import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import { env } from '../../lib/env';
import { Button, Card, CardBody, CardDescription, CardHeader, CardTitle, Input } from './ui';

type Status = 'idle' | 'loading' | 'error';

export default function AdminLogin() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!supabase) return;
      const res = await supabase.auth.getSession();
      if (cancelled) return;
      if (res.data.session) {
        window.location.assign(getAssetPath('/admin/pages/'));
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const disabled = status === 'loading' || !email.trim() || !password.trim();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError('缺少 PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY 环境变量');
      return;
    }
    setStatus('loading');
    const res = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (res.error) {
      setStatus('error');
      setError(res.error.message);
      return;
    }
    setStatus('idle');
    window.location.assign(getAssetPath('/admin/pages/'));
  };

  return (
    <div className="flex min-h-[calc(100vh-var(--admin-topbar-h)-var(--admin-page-py)*2)] items-center justify-center">
      <Card className="w-full max-w-[420px]">
        <CardHeader className="flex-col items-start">
          <CardTitle className="text-base">后台登录</CardTitle>
          <CardDescription>登录后进入 EMS 页面编辑器</CardDescription>
        </CardHeader>

        <CardBody className="space-y-4 pt-0">
          {!env.supabaseUrl || !env.supabaseAnonKey ? (
            <div className="rounded-[var(--admin-radius-md)] border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              缺少 PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY，后台无法连接 Supabase。
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">邮箱</div>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">密码</div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>

            {error ? (
              <div className="rounded-[var(--admin-radius-md)] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <Button type="submit" variant="primary" className="w-full" loading={status === 'loading'} disabled={disabled}>
              登录
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
