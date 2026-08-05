-- phase16: 移除 Header content_json 中的 top_banner 键（前后端已不再使用）
-- 策略：仅删除顶层 top_banner 键，不影响其他字段；未含该键的行自动跳过。

update public.page_content as pc
set content_json = pc.content_json - 'top_banner'
where pc.page_id = (select id from public.pages where slug = '/ems/_global/header/')
  and pc.content_json ? 'top_banner';
