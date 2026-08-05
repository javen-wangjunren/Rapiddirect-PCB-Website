-- phase15: Solutions Mega Menu —— Panel Style 重命名 + 移除 step_number（增量更新）
-- 背景：panel_style 从业务化命名（'npi' / 'manufacturing'）改为通用命名（'timeline' / 'card'），
--       且 steps 不再存储 step_number（步号按数组顺序渲染）。
-- 策略：仅对存量 content_json 做 jsonb 局部更新（jsonb_set / 键删除），
--       绝不重跑 phase14（其 on conflict do update 全量覆盖 content_json，会清空后台已保存数据）。

update public.page_content as pc
set content_json = jsonb_set(
  pc.content_json,
  '{nav_items}',
  (
    select coalesce(jsonb_agg(item), '[]'::jsonb)
    from (
      select
        case
          when (ni->>'mega_type') = 'solutions' then
            jsonb_set(
              ni,
              '{tabs}',
              coalesce((
                select jsonb_agg(
                  jsonb_set(
                    jsonb_set(
                      tab,
                      '{panel_style}',
                      to_jsonb(
                        case tab->>'panel_style'
                          when 'npi' then 'timeline'
                          when 'manufacturing' then 'card'
                          else coalesce(tab->>'panel_style', 'timeline')
                        end
                      )
                    ),
                    '{steps}',
                    coalesce((
                      select jsonb_agg(step - 'step_number')
                      from jsonb_array_elements(tab->'steps') as step
                    ), '[]'::jsonb)
                  )
                )
                from jsonb_array_elements(ni->'tabs') as tab
              ), '[]'::jsonb)
            )
          else ni
        end as item
      from jsonb_array_elements(pc.content_json->'nav_items') as ni
    ) as rebuilt
  ),
  true
)
where pc.page_id = (select id from public.pages where slug = '/ems/_global/header/')
  and pc.content_json ? 'nav_items';
