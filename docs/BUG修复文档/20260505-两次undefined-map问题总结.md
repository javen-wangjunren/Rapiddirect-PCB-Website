---
title: 两次 “Cannot read properties of undefined (reading 'map')” 问题总结
date: 2026-05-05
severity: high
scope: /ems/（services）与 /pcb-assembly/（pcba capability）
---

## 1. 一句话结论（你问的“是不是字段类型定义错了？”）

不完全是“数组 array vs 字符串 string 定义错了”这么简单。更准确地说：
- **前端写法假设某个字段一定是数组**（例如 `items`/`gallery`），直接 `xxx.map(...)`
- **后台保存出来的 content_json 里该字段缺失或形状不对**（变成 `undefined`，或对象被写成数组/字符串）
- 最终前端对 `undefined` 调 `.map`，就报 `Cannot read properties of undefined (reading 'map')`

### 给完全不懂代码的人一个比喻
把前端渲染想象成“按清单上菜”：
- 前端组件就像厨师，拿到一张“菜品清单”（数组）后，会逐条做菜：第 1 道、第 2 道……（这就是 `.map`）
- 但后台保存的数据有时会把“清单”写漏/写错：
  - 清单没给（字段缺失 → `undefined`），相当于厨师只拿到一张空白纸
  - 清单格式变了（本该是“清单”，却变成“一句话/一个盒子”），相当于厨师拿到的是便签或散装原料
- 厨师一上来就按“清单逐条做菜”，发现根本没有清单，就会直接卡住报错（`undefined.map`）

所以这类问题不是“菜名写错”（单纯 string/array 类型错），而是“**清单有没有、清单长什么样**”出了问题（数据结构缺失/形状不一致）。

也就是说，问题本质是 **“数据结构（shape）不一致/缺字段”**，而不是单纯“类型写错”。

## 2. 第一次：EMS / Services（Our Services）为什么会炸

### 现象
- 后台只修改 `services.title/description`，未触碰 `services.items`
- 保存后前台 `/ems/` 报错：`data.items.map`（ServicesSection）

### 根因链路（核心）
1) 后台保存的 `content_json.services` 可能只包含 `{title, description}`，缺少 `items`
2) 前台合并 defaults 的逻辑（旧版）对顶层 section 做了“浅替换”：只要出现 `services` 键，就用它整体覆盖 defaults 的 `services`
3) 于是 `services.items` 变成 `undefined`
4) 前端组件 [ServicesSection.astro](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/ems/ServicesSection.astro) 执行 `data.items.map(...)` → 报错

已修复的关键点（概览）：
- 合并逻辑改为对每个 section 深合并：[`mergeSectionFallback`](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/lib/supabase/mappers.ts)
- ServicesSection 对 `items` 与 `description.items` 增加兜底，避免再崩
- 引入 services 结构归一化（兼容旧错误结构）：[normalize/ems.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/content/normalize/ems.ts)

对应修复报告：
- [20260505-EMS服务模块保存后前台报错undefined-map.md](file:///Users/javen/Desktop/Javen%20Project/PCB/docs/BUG修复文档/20260505-EMS服务模块保存后前台报错undefined-map.md)
- [20260505-后台Services描述字段误判导致前台不显示.md](file:///Users/javen/Desktop/Javen%20Project/PCB/docs/BUG修复文档/20260505-后台Services描述字段误判导致前台不显示.md)

## 3. 第二次：PCB Assembly / PCBA Capabilities 为什么会炸

### 现象
- 后台编辑 `pcb_assembly` 模板的 `capability`（PCBA Capabilities）
- 保存后前台 `/pcb-assembly/` 报错：`card.body.items.map` 或 `gallery.map`（PcbaCapabilitySection）

### 根因链路（核心）
1) `capability.tabs[].cards[].body` 的期望结构是：`{ items: string[] }`
2) 旧版后台表单存在 “string[] 简写 schema（{items:'array'}）” 的误判风险，可能把 `body` 写成：
   - `body: string[]`（数组本身），或
   - `body` 缺失
3) 前台组件 [PcbaCapabilitySection.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/pcb-assembly/PcbaCapabilitySection.tsx) 直接执行 `card.body.items.map(...)` → 报错
4) 另外：数组在 merge defaults 时采用“整体替换”，不会对数组元素内部字段做补齐，一旦保存了残缺的 cards 数组，会覆盖 defaults 并稳定复现问题

已修复的关键点（概览）：
- 去掉 SchemaForm 的 string[] 简写误判入口：[SchemaForm.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/SchemaForm.tsx)
- pcb_assembly 内容归一化（把 `body: string[]` 转回 `{items:[]}`，补齐缺字段）：[normalize/pcb-assembly.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/content/normalize/pcb-assembly.ts)
- 前台与后台 load/save 都接入归一化，组件再加兜底，避免 `undefined.map`

对应修复报告：
- [20260505-PCBAssembly-PCBACapabilities保存后undefined-map.md](file:///Users/javen/Desktop/Javen%20Project/PCB/docs/BUG修复文档/20260505-PCBAssembly-PCBACapabilities保存后undefined-map.md)

## 4. 经验总结（如何避免同类问题再次出现）

1) 前端渲染层：对数组字段使用兜底
- `const items = Array.isArray(xxx) ? xxx : []`
- 避免对 `undefined` 直接 `.map`

2) 数据层：对“用户可编辑模块”做归一化（load/save/前台渲染三处统一）
- 兼容历史错误数据结构
- 确保写入到 DB 的结构稳定

3) 表单层：schema 的表达要避免歧义
- 避免 `{ items: 'array' }` 这种与业务字段同名（items）高度冲突的“简写”
- 明确区分：数组 wrapper（`{type:'array', items:{...}}`） vs 业务对象字段（`{ items: 'array', ... }`）
