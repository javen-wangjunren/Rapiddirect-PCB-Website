# EMS Admin 后台 UI 优化阶段规划 Spec

## Why
当前 EMS Admin 后台已跑通“编辑闭环”，但 UI 组件与交互尚未系统化，导致一致性不足、维护成本偏高、编辑效率与产品感受不稳定。需要在不改变核心架构（Astro 路由 + React + Tailwind + Supabase/RLS）的前提下，按阶段收口 UI 设计系统并逐步覆盖高频页面。

## What Changes
- 建立后台 UI 的 Design Tokens（颜色/排版/间距/圆角/阴影），作为所有组件的统一来源
- 建立后台 UI Primitives（Button/Input/Select/Card/Badge/Tabs/Modal/Toast/Pagination 等）并替换散落样式
- 统一两类页面模板（列表页 List、编辑页 Editor），优先覆盖 Pages 列表与 Page 编辑器
- 统一“状态与反馈”规范（loading/success/error/dirty/confirm/permissions）
- 统一响应式规则（≥1200 双栏；<1200 纵向堆叠；移动端保留核心操作）
- 明确裁剪：不新增参考图中不存在的业务模块入口（如全局 Search、Need Help 卡片、Logs/Settings 等若现网无则不出现）

## Impact
- Affected specs: 后台导航壳（AdminLayout/AdminSidebar）、Pages 列表、Page 编辑器、媒体库（Media Library）与后台通用交互组件
- Affected code:
  - Astro：`apps/ems-site/src/layouts/AdminLayout.astro`、`apps/ems-site/src/pages/admin/**`
  - React：admin 组件：`apps/ems-site/src/components/admin/**`
  - 样式：`apps/ems-site/src/styles/global.css`（或新增 admin 专用样式入口）

## ADDED Requirements
### Requirement: Design Tokens
系统 SHALL 在后台侧提供一套可复用的设计变量（tokens），用于颜色、排版、间距、圆角、阴影等核心视觉规则，并在后台组件中被统一引用。

#### Scenario: Tokens 可用
- **WHEN** 渲染任意后台页面（例如 Pages 列表）
- **THEN** 页面上的按钮、输入、卡片、徽标等基础样式来自统一 tokens，而不是页面内散写 class 组合

### Requirement: UI Primitives
系统 SHALL 提供后台 UI 的基础组件集合（primitives），并覆盖常用交互状态（hover/focus/disabled/loading/danger）。

#### Scenario: 按钮状态一致
- **WHEN** 用户点击保存/更新类操作
- **THEN** 主按钮展示 loading 并禁止重复提交；成功/失败有一致的反馈呈现方式

### Requirement: Page Templates
系统 SHALL 提供并在关键页面落地两类页面模板：
1) List：列表页（Header/Filters/Content/Footer）
2) Editor：编辑页（EditorHeader/Tabs/Content/Publish actions）

#### Scenario: List 模板落地
- **WHEN** 用户访问 `/ems/admin/pages/`
- **THEN** 页面具备统一的标题区、筛选区、列表内容、分页区，且交互一致

#### Scenario: Editor 模板落地
- **WHEN** 用户访问 `/ems/admin/pages/edit/?slug=...`
- **THEN** 页面具备统一的编辑标题、状态、Permalink（复制）、操作按钮组与 Tabs（按现网功能裁剪）

## MODIFIED Requirements
### Requirement: 现有后台功能入口保持稳定
系统 SHALL 保持现有后台路由、session guard 与写入闭环逻辑不被 UI 重构破坏；UI 仅做展示与交互层收口，不引入新的业务依赖以替代现有数据流。

## REMOVED Requirements
### Requirement: 全局 Search / Need Help（参考图元素）
**Reason**: 现网后台无该业务模块；为避免虚假入口与范围膨胀，不在本轮 UI 优化中实现。
**Migration**: 无。若未来需要，将以“增强项”单独立项（含信息架构与权限策略）。

