# EMS Admin 视觉风格对齐（设计稿）Spec

## Why

当前后台已具备 tokens、primitives 与页面模板，但整体视觉仍与 `UI设计风格参考.png` 差异明显（色板、密度、圆角、阴影、Sidebar/Topbar 版式、列表/编辑器的层级与留白）。需要在不引入不存在业务模块的前提下，将后台 UI 系统性对齐到设计稿风格，并引入 Rapid Direct 品牌（logo/品牌区）。

## What Changes

* 调整后台 Design Tokens，使其与设计稿的色板/灰阶/圆角/阴影/控件高度/版式密度一致

* 收口 Admin Shell（Sidebar/Topbar）到设计稿风格：深色侧栏、分组标签、激活态、品牌区（logo-rd）

* 将核心页面（Pages 列表 / Page 编辑器 / Media Library）的布局与视觉层级对齐设计稿：卡片层级、表单分组、tabs/徽标/菜单一致

* 保持裁剪：不新增设计稿中但现网未实现的模块入口（Search/Need Help/Logs/Settings/ users 等除非现网确认存在）

## Impact

* Affected specs: 后台 tokens/primitives、AdminShell、Pages 列表、Page 编辑器、Media Library

* Affected code:

  * tokens：`apps/ems-site/src/styles/admin.css`

  * shell：`apps/ems-site/src/layouts/AdminLayout.astro`、`apps/ems-site/src/components/admin/AdminSidebar.astro`、`AdminTopbar.astro`

  * pages：`apps/ems-site/src/components/admin/AdminPagesIndex.tsx`、`AdminPageEditor.tsx`

  * media：`apps/ems-site/src/components/admin/AdminMediaLibrary.tsx`

  * assets：新增/移动 `logo-rd.png` 到前端可引用位置（public 或 assets pipeline）

## ADDED Requirements

### Requirement: 设计稿风格 Tokens

系统 SHALL 在后台 tokens 中提供与设计稿一致的核心变量，并使后台所有 primitives/模板默认使用该 tokens。

#### Scenario: 颜色与灰阶一致

* **WHEN** 用户浏览后台页面（Pages/Editor/Media）

* **THEN** Sidebar 深蓝背景、主色红、灰阶文字/边框/背景与设计稿保持同一色阶层级

#### Scenario: 圆角/阴影/密度一致

* **WHEN** 用户查看任意 Card、Dropdown、Input、Button

* **THEN** 圆角与阴影强度一致，控件高度与间距遵循统一密度规则（无页面级“临时值”漂移）

### Requirement: Brand 区（logo-rd）

系统 SHALL 在 Sidebar 顶部展示 Rapid Direct 品牌区：logo + 文本（或仅 logo，按实际资源与可读性决定），并与设计稿的对齐/留白一致。

#### Scenario: Sidebar 品牌区可见

* **WHEN** 用户进入任意后台页面

* **THEN** Sidebar 顶部显示品牌区，且不影响现有导航与响应式折叠

## MODIFIED Requirements

### Requirement: 不新增不存在业务模块

系统 SHALL 不引入 `UI设计风格参考.png` 中但现网未实现的模块入口或功能（例如全局 Search、Need Help 卡片、Logs/Settings/Users）。

### Requirement: 现有功能与路由稳定

系统 SHALL 保持现有后台路由、session guard、保存/发布闭环不被“视觉对齐”改造破坏。

## REMOVED Requirements

### Requirement: Editor Advanced Tab（原型 JSON 编辑入口）

**Reason**: 运营阶段不需要暴露 JSON 编辑入口；且与设计稿信息架构不一致。
**Migration**: 非 schema 模板在 Content 区显示“暂不支持编辑”的提示，不提供 Advanced 入口。
