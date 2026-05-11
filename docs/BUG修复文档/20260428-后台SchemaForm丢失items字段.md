---
title: 后台 SchemaForm 丢失 items 字段导致模块字段缺失
date: 2026-04-28
severity: high
scope: EMS Admin（/ems/admin/pages/*）
---

## 1. 问题概述

后台编辑器中多个模块存在字段缺失现象，典型例子是 FAQ 模块仅显示 `title`，未显示 `items[]`（question/answer）。

## 2. 影响范围

- `faq.items[]` 无法编辑（question/answer）
- 多个模块的 `*.items[]` 列表字段可能整体无法编辑（例如 services/certification/equipment 等）
- 会导致后台保存出来的 content_json 缺结构化列表数据，进而影响前台模块渲染

## 3. 复现步骤（修复前）

1) 登录后台并进入 `/ems/admin/pages/ems/`
2) Content Modules → FAQ Tab → 展开 FAQ
3) 观察仅出现 `Title` 字段，缺少 `Items` 列表编辑区

## 4. 根因分析

表单渲染器 [SchemaForm.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/SchemaForm.tsx) 在渲染“对象 schema”时错误过滤了 `items` key：

- 代码将 `items` 当作数组 schema 的保留字段统一排除
- 但我们的业务 schema 里大量对象使用 `items` 作为真实字段名（列表字段）
- 结果：对象下任何名为 `items` 的字段都会被跳过渲染

## 5. 修复方案

调整 SchemaForm：
- 对对象 schema 不再通用过滤 `items`（也不做 `type/items` 的硬编码过滤）
- 仅由 `isArraySchema` 分支处理 “数组 schema wrapper（{type:'array', items: ...}）”

## 6. 代码变更

- 修复文件：[SchemaForm.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/admin/SchemaForm.tsx)
- 变更点：对象 schema 的 keys 不再过滤 `items`

## 7. 验证（手动）

1) 进入 `/ems/admin/pages/ems/`
2) 展开 FAQ 模块
3) 确认出现 `Items` 区块：
   - 显示 “暂无条目” 与 “添加条目”
   - 添加条目后出现 `Question` / `Answer` 输入框
4) 修改后点击 Save Draft / Update
5) 刷新页面确认数据仍存在

## 8. 自动化测试说明

当前仓库未配置可直接运行 TSX/React 组件的测试框架（如 Vitest/Jest + tsx runtime），因此本次未新增自动化测试用例。
已通过 `astro check`（类型检查）与上述手动步骤完成验证。

