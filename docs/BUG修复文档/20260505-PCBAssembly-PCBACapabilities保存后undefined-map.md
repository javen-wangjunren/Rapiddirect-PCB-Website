---
title: PCB Assembly - PCBA Capabilities 保存后 undefined.map
date: 2026-05-05
severity: high
scope: 前台 /pcb-assembly/ + 后台 pcb_assembly 编辑器
---

## 1. 问题概述

在后台编辑 PCB Assembly 页面（模板 `pcb_assembly`）的 PCBA Capabilities（capability）模块时，保存后前台渲染报错：
- `TypeError: Cannot read properties of undefined (reading 'map')`
- 堆栈指向 `PcbaCapabilitySection`

## 2. 根因分析

### 2.1 数据结构不一致（核心原因）

`capability.tabs[].cards[].body` 的期望结构是：

- `body: { items: string[] }`

但旧版 SchemaForm 支持一种“string[] 简写 schema（{ items: 'array' }）”，会把 `body` 误当成“数组字段本身”来编辑与保存，从而可能把数据写成：

- `body: string[]`（数组）
- 或 `body` 缺失

前台组件 [PcbaCapabilitySection.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/pcb-assembly/PcbaCapabilitySection.tsx) 在渲染时直接调用：
- `props.data.gallery.map(...)`
- `card.body.items.map(...)`

当 `gallery` 或 `body.items` 为 `undefined` 就会触发 `undefined.map`。

### 2.2 数组合并策略不会“按元素补齐”

前台 merge defaults 时，数组采用“整体替换”，不会对数组元素内部缺失字段做深补齐，因此一旦保存了结构不完整的 `cards` 数组，就会直接覆盖默认值并触发崩溃。

## 3. 修复方案

1) 移除 SchemaForm 的 string[] 简写误判：
- 不再把 `{ items: 'array' }` 当作“数组字段本身”
- 让 `body` 按“对象字段”渲染，使用户编辑的是 `body.items`

2) 增加 pcb_assembly 内容归一化（兼容历史脏数据）：
- 将 `body: string[]` 自动转换为 `body: { items: string[] }`
- 将缺失的 `body/items` 补齐为 `[]`
- 在后台加载/保存、前台渲染都做归一化，确保即使历史数据错误也不会再崩溃

3) 前台组件兜底：
- `gallery` 非数组时回退 `[]`
- `body.items` 非数组时回退 `[]`

## 4. 代码变更

- Schema 修复：
  - [SchemaForm.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/SchemaForm.tsx)
- 归一化：
  - [normalize/pcb-assembly.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/content/normalize/pcb-assembly.ts)
  - [AdminPageEditor.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/AdminPageEditor.tsx)
  - [pcb-assembly.astro](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/pages/pcb-assembly.astro)
- 组件兜底：
  - [PcbaCapabilitySection.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/pcb-assembly/PcbaCapabilitySection.tsx)

## 5. 自动化测试

新增 Node 测试覆盖“body 为数组/缺失”的归一化逻辑：
- [normalizePcbAssemblyContentJson.test.ts](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/tests/normalizePcbAssemblyContentJson.test.ts)

运行：

```bash
node --experimental-strip-types --test apps/ems-site/tests/normalizePcbAssemblyContentJson.test.ts
```

## 6. 手动验证步骤

1) 启动：`npm -C apps/ems-site run dev`
2) 进入后台编辑 `/pcb-assembly/` 对应页面
3) 打开 PCBA Capabilities 模块：
   - 展开某个 tab → 展开某个 card
   - 在 `body.items` 中添加/删除条目
4) 点击 Save Draft / Publish
5) 打开前台 `/pcb-assembly/` 刷新
6) 确认：
   - 不再出现 `Cannot read properties of undefined (reading 'map')`
   - cards 的 bullet list 正常显示

