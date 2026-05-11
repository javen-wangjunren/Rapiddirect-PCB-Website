---
title: 方案2（Supabase Storage + 简版 Media Library）实施计划
mode: plan
project: EMS 子站后台
date: 2026-04-28
---

## Summary

实现一个 WordPress 风格的后台媒体库（Media Library），用于上传图片/图标并管理元信息（Title/Alt），然后在页面编辑器里以“复制链接”的方式将图片 URL 填入现有 `content_json` 字段（不改数据结构、不拆表、不做 Modal/Drawer）。

关键决策（来自确认）：
- Bucket 名：`media`
- 访问方式：Public read（前台直接用 URL）
- 元信息：Title + Alt
- 选图方式：复制链接（不做自动回填）

## Current State Analysis

### 现有后台能力
- Admin Shell：左侧 Sidebar + 顶部导航 + 主内容区（WP 风格）
  - [AdminLayout.astro](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/layouts/AdminLayout.astro)
  - [AdminSidebar.astro](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/AdminSidebar.astro)
- 页面编辑器与数据层：`pages / page_content / seo_meta` 三表读写已打通，后台使用 authenticated session
  - [adminClient.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/supabase/adminClient.ts)
  - [adminQueries.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/supabase/adminQueries.ts)
- 现状痛点：图片字段全靠手填 URL；大量字段为 `*_image_url` / `icon_url` 等，编辑成本高且不可管理 Alt/Title。

### 与媒体库相关的技术约束
- 前台多个模块对图片字段使用 `getAssetPath()` 生成 URL（假设是站内路径），当前不支持绝对 URL：若直接粘贴 Supabase 公共 URL 会被错误加上 `/ems/` 前缀导致 404。
  - [assets.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/assets.ts)
  - 前端多处使用：HeroBanner/Industry/Equipment/Certification 等。

## Proposed Changes

### 1) Supabase：新增媒体元信息表 + Storage bucket + RLS

**目标**
- `storage`：创建 public bucket `media`，authenticated 可 list/upload/update/delete
- `public.media_assets`：存储附件元信息（Title/Alt），按 object path 唯一

**新 migration**
- `supabase/migrations/phase7_media_library.sql`
  - 创建表 `public.media_assets`
    - 字段建议：
      - `id uuid PK default gen_random_uuid()`
      - `bucket text not null default 'media'`
      - `path text not null unique`（例如 `2026/04/foo.png` 或 `foo.png`）
      - `public_url text not null`（用于复制链接）
      - `title text not null default ''`
      - `alt text not null default ''`
      - `mime_type text null`
      - `size bigint null`
      - `created_at/updated_at timestamptz default now()`
  - RLS：
    - `authenticated` 可 `select/insert/update/delete`（与现有后台策略一致）
  - Storage bucket：
    - upsert `storage.buckets`：name/id = `media`，`public = true`
  - Storage policies（storage.objects）：
    - `authenticated` 允许 `select`（用于后台 list）
    - `authenticated` 允许 `insert/update/delete`（仅 bucket_id='media'）

**为什么要 media_assets 表**
- Storage 对象本身不适合做“可编辑元信息 + 列表检索”的 CMS 能力；表更直观、可控、可扩展（未来加 caption/credit 等）。

### 2) 前端：新增 Media Library 页面（WordPress 风格）

**新增路由**
- `apps/ems-site/src/pages/admin/media/index.astro`
  - `export const prerender = false`
  - 使用 `AdminLayout`
  - `client:load` 渲染 React 组件

**新增组件**
- `apps/ems-site/src/components/admin/AdminMediaLibrary.tsx`
  - session guard：未登录跳 `/ems/login/`
  - 页面布局（Desktop-first）：
    - 顶部工具条：Upload（file input）、Search（可选第一阶段不做）、刷新
    - 主体两列：
      - 左：网格/列表（缩略图、文件名、上传时间）
      - 右：Attachment Details（选中后显示）
        - 预览图
        - Public URL（readonly）+ Copy 按钮（复制到剪贴板）
        - Title / Alt 输入框（编辑后保存）
        - Delete（可选第二阶段；第一阶段可先不做）
  - 数据来源：
    - Storage list：`supabase.storage.from('media').list(...)`
    - 元信息：从 `media_assets` 按 `path` 批量查询/或逐个查询（第一阶段可逐个）
  - 上传流程：
    1) 选择文件 → 生成 path（例如 `YYYY/MM/<timestamp>-<name>`）
    2) `storage.upload(path, file, { upsert: false })`
    3) 获取 public url：`getPublicUrl(path)`
    4) upsert `media_assets`（path 唯一）
    5) toast 成功 + 刷新列表

**新增数据访问封装（建议）**
- `apps/ems-site/src/lib/supabase/adminMedia.ts`
  - `listMediaObjects()`
  - `uploadMediaObject(file): { path, publicUrl, ... }`
  - `upsertMediaAssetMeta({ path, publicUrl, title, alt, ... })`
  - `getMediaAssetMetaByPath(path)`

### 3) 后台导航：Sidebar 增加 Media

**修改**
- [AdminSidebar.astro](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/AdminSidebar.astro)
  - 在 Pages 下新增：
    - Media（/admin/media/）

（可选）顶部导航也可加一个 Media 链接，但不是必须。

### 4) 让前台图片字段支持“绝对 URL”

**必要修复**
当前 `getAssetPath()` 会无脑加 base，导致粘贴 Supabase `https://...` URL 时变成 `/ems/https://...`。

**修改**
- [assets.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/assets.ts)
  - `getAssetPath(path)`：如果传入是绝对 URL（scheme），直接返回原值，不加 base
  - 仅影响绝对 URL，站内相对路径行为不变

### 5) SchemaForm：图片字段的“辅助入口”（不自动回填）

不改变字段类型（仍是 string URL），仅提升体验：
- 对字段名匹配以下模式时增强 UI：
  - `*_image_url`、`image_url`、`icon_url`、`og_image`、`background_image_url`
- 增强内容：
  - 预览（若 URL 可用）
  - “Open Media Library”链接（新 tab 打开 `/ems/admin/media/`）
  - “Paste”按钮（从剪贴板粘贴 URL，可选）

修改文件：
- [SchemaForm.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/SchemaForm.tsx)

## Assumptions & Decisions

- 不拆表、不改 `content_json` 结构；图片字段继续存 URL 字符串
- Storage bucket 使用 public read：前台无需签名 URL
- Media Library 第一阶段只做：上传 + 列表 + 详情面板 + Copy URL + Title/Alt 编辑
- 选择图片采用“复制链接”工作流；不实现自动回填（后续可作为增强）

## Verification

### 自动检查
- `apps/ems-site` 下运行：`npm run check` 应为 0 errors

### 手动验收（必须）
1) 进入 `/ems/login/` 登录（Supabase Auth）
2) 打开 `/ems/admin/media/`
3) 上传一张 PNG/JPG/SVG
4) 在右侧详情面板复制 Public URL，修改 Title/Alt 并保存
5) 打开 `/ems/admin/pages/ems/`，将某个 `image_url/icon_url` 粘贴为该 Public URL 并保存
6) 刷新前台 `/ems/`，确认图片正常加载（无 `/ems/https://` 这种错误前缀）
7) 刷新 `/ems/admin/media/`，确认该资源仍在列表中，Title/Alt 可回显

