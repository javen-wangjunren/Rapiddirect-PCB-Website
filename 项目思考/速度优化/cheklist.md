# 后端速度优化 Checklist（Pages / Media）

## 目标

- 后台 `Pages` / `Media` 切换与加载从“2–3s 等待”降低到可接受范围
- 消除 dev 环境脚本 504、减少重复请求、让性能随数据量增长保持稳定

## 已完成（本轮已落地）

### A. 开发环境稳定性

- 关闭 Astro Dev Toolbar，避免 dev 注入脚本导致的 `script 504`

### B. 请求层优化

- Supabase Admin Client 单例缓存，避免 `Multiple GoTrueClient instances detected`

### C. Pages 列表性能

- Pages 列表改为后端分页 + 筛选下推（返回 `total` 驱动分页）

### D. Media 列表性能

- Media 列表改为后端分页 + 显式列选择（返回 `total` 驱动分页）
- `folder_id` 方案已做“可开关 + 可降级”，未应用 migration 时仍能工作
  - 默认 `.env.local`：`PUBLIC_MEDIA_FOLDER_ID_ENABLED=0`

### E. 生产侧 TTFB 优化（结构性）

- admin 的 `Pages` / `Media` / 固定 `EMS` 编辑器页改为 `prerender=true`（减少 SSR/冷启动影响）

### F. 已准备但未执行（需要在 Supabase 侧应用）

- 索引补齐 migration：`supabase/migrations/phase8_admin_perf_indexes.sql`
- `media_assets.folder_id` + 回填 + 索引 migration：`supabase/migrations/phase9_media_assets_folder_id.sql`

## 下一阶段（推荐优先级）

### 1) 先上索引（低风险、高收益）

- 应用 `phase8_admin_perf_indexes.sql`
- 验证：Pages/Media 列表请求耗时在数据量增加时更稳定

### 2) 启用 folder_id（结构性收益）

- 应用 `phase9_media_assets_folder_id.sql`
- 将 `PUBLIC_MEDIA_FOLDER_ID_ENABLED=1`
- 验证：
  - Folder / Unfiled 过滤走 `folder_id`（不再依赖 `path like` / `not like`）
  - 上传、移动、删除逻辑保持正确

### 3) 搜索加速（数据量上来再做）

- 若需要 contains 搜索且数据量大：启用 `pg_trgm` + GIN 索引，搜索下推到 DB

### 4) Page Editor 聚合（可选）

- 若编辑器加载仍慢：考虑将 pages/page_content/seo_meta 聚合成单接口（Edge Function），减少往返

## 验收记录模板（每次测一次）

- 环境：dev / preview / 生产
- 路由：`/ems/admin/pages/`、`/ems/admin/media/`、`/ems/admin/pages/edit/?slug=...`
- 文档请求：TTFB
- Supabase 请求：数量、关键接口耗时、返回体大小（rows/KB）

