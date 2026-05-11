# Tasks

- [x] Task 1: 明确范围与 UI 目标对齐
  - [x] 盘点现网后台页面与入口（Pages/Editor/Media/Login 等），列出将要覆盖的页面清单
  - [x] 将“参考风格图元素”映射到“现有后台能力”，输出裁剪结果（不新增 Search/Help 等不存在模块）
  - [x] 确认后台导航分组与命名规范（以现网菜单为准）

- [x] Task 2: 落地 Design Tokens（后台样式基线）
  - [x] 在样式层建立 tokens（颜色/排版/间距/圆角/阴影），并确保后台页面可引用
  - [x] 定义后台通用 layout 密度（页面 padding、卡片间距、表单间距）
  - [x] 定义基础可访问性样式（focus ring、对比度基线）

- [x] Task 3: 构建 UI Primitives（可复用基础组件）
  - [x] Button：Primary / Secondary / Ghost / Danger（含 loading/disabled）
  - [x] Input：Text / Search（可选 suffix，如计数器）
  - [x] Select：统一下拉样式与尺寸
  - [x] Card：容器、标题区、工具区的统一结构
  - [x] Badge：Published / Draft / Disabled（以现网状态为准）
  - [x] Tabs：统一激活态（主色下划线）与键盘可达
  - [x] Modal/Confirm：删除/离开未保存确认
  - [x] Toast：保存成功/失败/进行中的统一反馈
  - [x] Pagination：上一页/页码/下一页（轻量）

- [x] Task 4: 收口 Admin Shell（Layout/Sidebar/Topbar）
  - [x] AdminLayout：统一页面容器、背景、内容宽度与响应式折叠规则
  - [x] AdminSidebar：按分组规范与激活态规范收口（不展示不存在入口）
  - [x] Topbar：保留标题与用户入口；不新增全局 Search/Help/通知（除非现网已有）

- [x] Task 5: 改造 Pages 列表页（优先落地 List 模板）
  - [x] Header：标题 + 可选副标题 + 主操作（Add New Page）
  - [x] Filters：搜索 + 状态筛选（All/Published/Draft，按现网支持裁剪）
  - [x] List：行信息（title/path/status/date/更多菜单）组件化与 hover/active 规范
  - [x] Empty/Loading/Error：空态引导、skeleton、错误重试
  - [x] Pagination：展示统计与分页控件

- [x] Task 6: 改造 Page 编辑页（优先落地 Editor 模板）
  - [x] EditorHeader：Editing 标题 + 状态 badge + Permalink（复制）+ 操作按钮组
  - [x] Tabs：Content / SEO / Settings / Advanced（按现网功能裁剪）
  - [x] Content：若已有模块化（content modules），收口为“左列表 + 右表单”；若无则先做“表单分组卡片化/折叠”
  - [x] Publish/Save：loading、防重复提交、成功/失败 toast、一致的危险操作确认
  - [x] Dirty state：未保存离开提示（仅在确实有变更时触发）

- [x] Task 7: 扩展覆盖到 Media Library（与其余后台页面）
  - [x] MediaLibrary：复用 List 模板（筛选/列表/分页/空态）
  - [x] 其余页面按模板收口（如存在 Users/Settings/Logs 才纳入）

- [x] Task 8: 验证与回归
  - [x] 关键路径手动回归：登录 → Pages 列表 → 编辑 → 保存/发布 → 前台刷新生效
  - [x] 响应式回归：≥1200 双栏、<1200 堆叠、移动端核心操作可用
  - [x] 可访问性基础回归：Tab 顺序、focus 可见、按钮语义

# Task Dependencies
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 3 and Task 4
- Task 6 depends on Task 3 and Task 4
- Task 7 depends on Task 3 and Task 4
- Task 8 depends on Task 5 and Task 6 (and Task 7 if纳入范围)
