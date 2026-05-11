# Tasks

- [x] Task 1: 设计稿差异盘点与对齐范围冻结
  - [x] 根据 `项目思考/后台/后台UI优化.md` 附录对照表，列出“差异点 → 对应组件/页面/样式入口”
    - 差异点 → 入口映射（冻结范围，不新增模块）
      | 差异点 | 对应组件/页面 | 样式/入口 |
      | --- | --- | --- |
      | 色板/灰阶（Primary 红、Sidebar 深蓝、surface/border/fg） | 全局 admin UI | `apps/ems-site/src/styles/admin.css` |
      | 圆角（按钮/输入 8、卡片/下拉 12） | primitives + 页面容器 | `admin.css` + `apps/ems-site/src/components/admin/ui/*` |
      | 阴影（card/dropdown/modal 统一 shadow-sm/md） | Card/Modal/Dropdown | `admin.css` + `apps/ems-site/src/components/admin/ui/{Card,Modal,Toast}.tsx` |
      | 密度（控件高度 36/40/44；page/card padding 16/24） | Button/Input/Select + layout | `admin.css` + `apps/ems-site/src/components/admin/ui/{Button,Input,Select}.tsx` + `AdminLayout.astro` |
      | Sidebar 分组标题/Item 高度/active（背景块+强调条） | Admin Shell | `apps/ems-site/src/components/admin/AdminSidebar.astro` |
      | Topbar 高度/分割线/间距（不新增 Search/Help/通知） | Admin Shell | `apps/ems-site/src/components/admin/AdminTopbar.astro` |
      | 品牌区（logo-rd） | Admin Shell | `apps/ems-site/public/logo-rd.png` + `AdminSidebar.astro` |
  - [x] 确认不新增模块清单（Search/Need Help/Logs/Settings/Users 等）并将其从 UI 结构中剔除
  - [x] 确认需要对齐的页面范围：Pages 列表、Page 编辑器、Media Library、Admin Shell（Sidebar/Topbar）

- [x] Task 2: Tokens 对齐（与设计稿数值一致）
  - [x] 在 `admin.css` 中对齐色板：Sidebar 深蓝、Primary 红（#EA543F）、灰阶（fg/fg-muted/border/surface）
  - [x] 对齐圆角：按钮/输入（8）、卡片/下拉（12）
  - [x] 对齐阴影：dropdown/modal/card 使用统一 shadow-sm/shadow-md
  - [x] 对齐密度：控件高度（36/40/44）与页面/卡片 padding（16/24）统一

- [x] Task 3: Admin Shell 对齐（Sidebar/Topbar + 品牌区）
  - [x] Sidebar：分组标题样式（弱化小字）、item 高度/圆角、active 状态（背景块/强调条）对齐设计稿
  - [x] Brand 区：将 `logo-rd.png` 放到前端可引用位置，并在 Sidebar 顶部渲染（logo + 文本或仅 logo）
  - [x] Topbar：高度/分割线/间距对齐；保持不新增 Search/Help/通知
  - [x] 响应式：折叠/抽屉行为不变，仅调整视觉密度与样式

- [x] Task 4: Pages 列表页视觉对齐
  - [x] Header：标题/副标题层级、主按钮（Add New Page）样式与位置对齐
  - [x] Filters：Input/Select 的高度、圆角、间距对齐
  - [x] 列表项：卡片层级（border+shadow）、hover、状态 badge（Published/Draft soft）对齐
  - [x] More 菜单：宽度/圆角/阴影/间距对齐，点击后自动关闭

- [x] Task 5: Page 编辑器视觉对齐
  - [x] EditorHeader：Editing 标题/状态 badge/Permalink 行布局对齐
  - [x] Tabs：激活红色下划线与字重/灰阶对齐（仅 Content/SEO/Settings）
  - [x] Page Settings：卡片层级、控件高度与按钮区密度对齐（不出现 Logout/Advanced）
  - [x] Content：模块编辑区域与表单卡片层级对齐（按现有 schema 编辑器能力收口）

- [x] Task 6: Media Library 视觉对齐
  - [x] Header/Filters：对齐 Pages 的密度与控件高度
  - [x] Grid 卡片：圆角/边框/hover/选中态阴影对齐
  - [x] Aside 详情面板：卡片层级、按钮样式与分组分隔对齐

- [x] Task 7: 验证与回归
  - [x] 关键闭环：登录 → Pages → 编辑 → 保存/发布 → 前台生效
  - [x] 视觉回归：Sidebar/Topbar/Buttons/Inputs/Badges/Tabs/Dropdown 在三个页面一致
  - [x] 响应式回归：≥1200 双栏 / <1200 堆叠
  - [x] 工程检查：`apps/ems-site` build/check 通过

# Task Dependencies
- Task 3 depends on Task 2
- Task 4 depends on Task 2 and Task 3
- Task 5 depends on Task 2 and Task 3
- Task 6 depends on Task 2 and Task 3
- Task 7 depends on Task 4, Task 5, Task 6
