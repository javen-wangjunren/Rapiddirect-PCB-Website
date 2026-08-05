-- phase17: 移除 Header nav_items 中每个菜单项顶层的 href 键
-- 背景：nav item 的 label 点击仅用于展开 Mega Menu，不再跳转链接（内层步骤/卡片/链接的 href 保留）。
-- 策略：仅对 nav_items 数组中每个元素删除顶层 href 键，不影响其他字段。

update public.page_content as pc
set content_json = jsonb_set(
  pc.content_json,
  '{nav_items}',
  (
    select coalesce(jsonb_agg(ni - 'href'), '[]'::jsonb)
    from jsonb_array_elements(pc.content_json->'nav_items') as ni
  ),
  false
)
where pc.page_id = (select id from public.pages where slug = '/ems/_global/header/')
  and pc.content_json ? 'nav_items';
