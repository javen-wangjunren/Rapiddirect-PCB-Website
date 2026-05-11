---
title: PCB Assembly - Industry 保存后 normalizeAssetPath.startsWith 报错
date: 2026-05-05
severity: high
scope: 前台 IndustrySection（/pcb-assembly/）
---

## 1. 现象

在后台保存 PCB Assembly 页面的 Industry section 内容后，前台渲染报错：

- `TypeError: Cannot read properties of undefined (reading 'startsWith')`
- 堆栈指向：`normalizeAssetPath → getAssetPath → IndustrySection`

## 2. 根因（为什么会出现 undefined.startsWith）

`normalizeAssetPath` 期望接收字符串路径，并直接调用：

- `path.startsWith('/')`

但在 Industry 组件里，会把后台内容里的 `icon_url` / `image_url` 传给 `getAssetPath()`：

- `getAssetPath(item.tab.icon_url)`
- `getAssetPath(active.card.image_url)`

当后台保存的 `content_json` 中某些条目缺失这些字段（例如新增了 Industry item 但没有填写 icon/image），这些字段会变成 `undefined`。
`getAssetPath(undefined)` 会继续调用 `normalizeAssetPath(undefined)`，最终触发 `undefined.startsWith` 报错。

本质仍然是：**内容数据缺字段/形状不完整**，前端工具函数没有对 `undefined` 做兜底。

## 3. 修复方案

### 3.1 根因兜底：assets 工具函数对空值安全
- `getAssetPath(path)`：当 `path` 不是 string 或为空时，直接返回空字符串
- `getHref(href)`：当 `href` 不是 string 或为空时，直接返回空字符串

文件：
- [assets.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/assets.ts)

### 3.2 组件层兜底：没有图就不渲染 img
IndustrySection 对 icon/image 做条件渲染，避免传 `undefined`：
- [IndustrySection.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/common/IndustrySection.tsx)

### 3.3 数据层归一化：保存/加载时补齐缺失字段
在 pcb_assembly 的归一化中补齐 industry 的 `icon_url/image_url` 为 `''`，避免写入缺 key 的对象：
- [normalize/pcb-assembly.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/content/normalize/pcb-assembly.ts)

## 4. 自动化测试

扩展了归一化测试，覆盖 industry 缺少 icon/image 字段时应补为空字符串：
- [normalizePcbAssemblyContentJson.test.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/tests/normalizePcbAssemblyContentJson.test.ts)

## 5. 手动验证步骤

1) 启动：`npm -C apps/ems-site run dev`
2) 后台编辑 `/pcb-assembly/`，在 Industry 中新增/修改条目，但故意不填 icon_url 或 image_url
3) 点击 Save Draft / Publish
4) 打开前台 `/pcb-assembly/` 刷新
5) 观察：
   - 不再出现 `startsWith` 报错
   - 未填写图片的地方显示为空白占位（不影响页面渲染）

