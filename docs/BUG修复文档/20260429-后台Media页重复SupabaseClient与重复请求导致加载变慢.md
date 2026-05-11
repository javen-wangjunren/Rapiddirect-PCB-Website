---
title: 后台 Media 页面重复创建 SupabaseClient + 重复请求导致加载变慢
date: 2026-04-29
severity: medium
scope: EMS Admin（/ems/admin/media/）
---

## 1. 问题概述

后台 Media 页面存在：

- 控制台出现 `Multiple GoTrueClient instances detected` 警告
- 页面初始化阶段可能触发重复请求（getSession + folders/assets 多次），导致加载变慢

## 2. 影响范围

- `/ems/admin/media/` 初次进入体验变慢（请求数更多、等待更久）
- 潜在的 Supabase Auth 会话读写行为不确定（同 storage key 多实例并存）

## 3. 复现步骤（修复前）

1) 启动站点并进入 `/ems/admin/media/`
2) 打开 DevTools → Console
3) 观察出现警告：`Multiple GoTrueClient instances detected...`
4) 打开 DevTools → Network，观察有机会出现 media_folders / media_assets 重复请求

## 4. 根因分析

### 4.1 多个 Supabase Client 实例

`createAdminSupabaseClient()` 在每个后台页面组件中各自调用并创建新的 client（同一浏览器上下文下共享同一个 auth storage key），从而触发 GoTrueClient 的“多实例”警告。

相关文件：
- [adminClient.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/supabase/adminClient.ts)

### 4.2 Media 页面 refresh 触发方式导致重复/串行

`AdminMediaLibrary` 的初始化 effect 会调用 `refresh()`，而 `folderFilter` 的 effect 也会调用 `refresh()`。
在初始化阶段，如果两者都执行，会造成重复拉取。

相关文件：
- [AdminMediaLibrary.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/AdminMediaLibrary.tsx)

## 5. 修复方案

- 将 `createAdminSupabaseClient()` 改为模块级缓存（同浏览器上下文仅创建一个 client）
- 调整 Media 页面 refresh：
  - folders 与 assets 并行请求（减少串行等待）
  - 初始化完成前，避免 `folderFilter` effect 触发二次 refresh

## 6. 代码变更

- [adminClient.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/supabase/adminClient.ts)
  - 新增 `cachedClient`：首次创建后复用
- [AdminMediaLibrary.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/AdminMediaLibrary.tsx)
  - `didInitialRefreshRef`：防止初始化阶段二次 refresh
  - folders/assets 并行请求：降低等待时间

## 7. 验证（手动）

1) 运行 `pnpm dev`，进入 `/ems/admin/media/`
2) Console 不再出现 `Multiple GoTrueClient instances detected`（或显著减少）
3) Network 观察：
   - media_folders + media_assets 不再在初始化阶段重复触发
   - 进入页面可更快出现列表与 UI
4) 切换 Folder 下拉框，列表可正常刷新

## 8. 自动化测试说明

当前仓库未配置可直接运行 TSX/React 组件的测试框架（如 Vitest/Jest + DOM 环境），因此本次未新增自动化测试用例。
已通过 `astro check` 与 `pnpm build`（构建成功）以及上述手动步骤验证。

