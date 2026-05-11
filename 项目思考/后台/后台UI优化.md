## 后台 UI 优化（方向方案）

> 参考风格图：`项目思考/后台/UI设计风格参考.png`（仅作为视觉方向；信息架构与功能以现有后台为准）

### 1. 目标与边界

**目标**

- 统一后台的视觉与交互语言（布局、间距、按钮、表单、状态反馈），降低学习成本。
- 提升内容管理效率：列表更好筛选/定位，编辑更清晰分区，保存/发布更可控。
- 改造可渐进上线：不要求一次性重写全部页面，优先覆盖高频路径。

**边界（明确不做）**

- 不为了“像设计稿”而新增不存在的业务模块：例如 `Logs / Settings / Need Help / 全局 Search` 等。
- 不改变后端业务逻辑与数据结构（除非已有需求），UI 改造优先在展示层完成。

**约束**

- 保持现有功能入口与关键流程稳定（创建/编辑/保存/发布/预览/删除）。
- 保持路由与权限策略不被 UI 改造破坏（按钮可隐藏，但权限逻辑要继续有效）。

### 2. 功能映射与范围清单（以现网为准）

> 目的：把“参考风格图的控件/页面形态”映射到“现有后台真实功能”，避免设计脱节。

**建议先做一次盘点（输出一张表）**

| 参考图里的元素/模块              |   现有后台是否存在 | 处理策略                             |
| ----------------------- | ---------: | -------------------------------- |
| 左侧深色 Sidebar + 分组导航     |          是 | 保留形态，按现有菜单分组与命名统一                |
| Topbar 全局 Search（⌘K）    |          否 | 不实现；若未来需要，作为增强项                  |
| Need Help 卡片            |          否 | 不实现；可预留位置但默认不显示                  |
| Users / Settings / Logs | 不确定/可能部分存在 | 若现网没有则不出现；若有则放在 SYSTEM 分组        |
| Pages 列表页（搜索/状态/分页）     |        通常有 | 作为第一优先改造页面                       |
| 右侧编辑器面板（Editing + tabs） |        通常有 | 作为第二优先改造页面                       |
| 模块化编辑（左模块列表 + 右表单）      |      取决于现有 | 若已模块化则对齐交互；若未模块化则不强上，先做“表单分组卡片化” |

**建议以现有后台为主的导航草案（可调整）**

- DASHBOARD
  - Dashboard
- CONTENT
  - Pages
  - Add New Page
- EMS MANAGEMENT
  - EMS Home Editor
  - Media Library
  - View EMS Site
- SYSTEM（仅当现有功能确实存在时显示）
  - Users
  - Settings
  - Logs

### 3. 信息架构与导航规范

**侧边栏（Sidebar）**

- 结构：最多两级；分组标题使用小号大写/弱化色（如参考图）。
- 规则：
  - 高频放上：Pages / Home Editor 放在最显眼区。
  - 命名统一：优先“名词”或“动词 + 名词”，全站一致（例如：`Add New Page` vs `New Page` 选一个）。
  - 激活态明确：当前路由高亮 + 左侧强调条/背景块。

**顶部栏（Topbar）**

- 保留：汉堡菜单（折叠侧边栏）、当前区域标题、用户头像/下拉。
- 不新增：全局搜索、通知、帮助（除非后续明确要做）。

### 4. 页面模板（优先统一两类）

#### 4.1 列表页模板（List）

适用：Pages 列表、Media 列表、Users（如有）等。

**结构**

- Header：页面标题 + 副标题（可选） + 主操作按钮（如 `+ Add Page`）。
- Filters：搜索框、状态筛选、更多筛选（可渐进）。
- Content：卡片式列表（行内信息 + 状态徽标 + 更多菜单）。
- Footer：分页与统计（如 `Showing 1–10 of 52`）。

**交互规范**

- 搜索：输入防抖；Enter 立即查询；清空回到默认。
- 状态筛选：All / Published / Draft（以现网状态为准）。
- 空状态：明确文案 + 主按钮（如 `Create your first page`）。

#### 4.2 编辑页模板（Editor）

适用：页面编辑、模块编辑、SEO 设置等。

**结构（推荐对齐参考图）**

- 顶部信息条：`Editing: {name}` + 状态徽标 + Permalink（复制）。
- 操作区：`Preview`（次要）、`Save Draft`（次要）、`Update/Publish`（主按钮）、`Move to Trash`（危险）。
- 内容区：Tabs（`Content` / `SEO` / `Settings` / `Advanced`，按现网功能裁剪）。

**模块化编辑（可选增强）**

- 若现网已有“模块/区块”概念：左侧模块列表（可拖拽排序）+ 右侧模块表单。
- 若现网没有：先做“表单分组卡片化 + 折叠面板”，把复杂度降下来。

### 5. 组件改造框架（从 Tokens → 基础组件 → 业务组件）

> 思路：先做统一的“设计变量 + 组件库”，再改页面；避免每个页面各写一套样式。

#### 5.1 Design Tokens（设计变量）

**颜色（建议值，可按品牌微调）**

- Sidebar 背景：深海军蓝（参考图约 `#0E1B2B`）
- 主色（Primary）：红：#EA543F
- 成功（Success）：`#22C55E`
- 警示（Warning）：`#F59E0B`
- 文本：主 `#0F172A`；次 `#64748B`
- 边框/分割：`#E5E7EB`
- 背景：`#F8FAFC`

**排版（字号与字重）**

- 字体：保持系统无衬线或现有项目字体（避免引入新字体导致加载与一致性问题）。
- 字号阶梯：12 / 14 / 16 / 20 / 24。
- 字重：400（正文）/ 500（强调）/ 600（标题）。

**空间与圆角**

- 8px 基线：8/16/24/32。
- 圆角：输入/按钮 8；卡片 12。
- 阴影：尽量轻（仅浮层/下拉/弹窗）。

#### 5.2 基础组件（Primitives）

- Button：Primary / Secondary / Ghost / Danger（文本/线框）。
- Input：Text / Search / Number；支持 suffix（计数器/单位）。
- Select：统一下拉样式与尺寸。
- Badge：Published / Draft / Disabled（颜色与圆角统一）。
- Card：统一卡片容器（标题区、内容区、工具区）。
- Tabs：激活下划线用主色（参考图红色下划线）。
- Modal / Confirm：删除、离开未保存等二次确认。
- Toast：成功/失败/进行中（保存中）反馈。
- Pagination：上一页/页码/下一页（轻量）。
- Table/List Row：行 hover、更多菜单、可选中态。

#### 5.3 业务组件（Patterns）

- PageHeader：标题 + 描述 + 主按钮。
- FilterBar：搜索 + 状态筛选 + 更多筛选。
- EditorHeader：Editing 标题 + 状态 + Permalink + 操作按钮组。
- SortableList：模块/条目拖拽排序（如现网支持）。
- RichTextToolbar：只保留实际支持的能力（粗体/斜体/列表/链接/代码等）。

### 6. 状态与反馈（必须统一）

- Loading：列表 skeleton；表单局部 loading；按钮 loading 防重复提交。
- Success/Error：保存成功 toast；失败提示原因与重试。
- Dirty state：表单有改动未保存时，离开页面二次确认。
- 权限：无权限按钮隐藏或 disabled，并提供原因提示（tooltip/说明）。

### 7. 响应式策略

- ≥ 1200px：列表 + 编辑双栏（对齐参考图）。
- < 1200px：上下布局（列表在上、编辑在下），操作按钮固定在顶部。
- 移动端：只保留核心操作（Preview/Save/Update），复杂侧边栏可抽屉化。

### 8. 渐进式改造路径（建议 3 个阶段）

**阶段 A：设计变量与基础组件落地（先打底）**

- 输出 tokens（颜色/间距/圆角/字体）与基础组件（Button/Input/Card/Badge/Tabs/Toast/Modal）。
- 目的：后续页面改造只“拼组件”，不再散落写样式。

**阶段 B：高频页面改造（先见效）**

- Pages 列表页：Header + FilterBar + 列表卡片化 + Badge + Pagination。
- Page 编辑页：EditorHeader + Tabs + 表单卡片化（或模块化，如果现网已经是模块结构）。

**阶段 C：扩展到剩余页面与一致性收敛**

- Media、Home Editor、Users（如有）等按模板统一。
- 补齐空状态、错误态、权限态、可访问性与键盘操作。

### 9. 验收标准（UI 视角）

- 任意页面的按钮、输入、卡片、徽标样式一致（同尺寸、同色阶、同交互）。
- 列表页：可在 3 步内定位到目标内容（搜索/筛选/分页路径清晰）。
- 编辑页：保存/发布状态明确，不出现“点了没反应/重复提交/保存中还可乱点”。
- 不出现设计稿里不存在的模块入口（除非业务明确新增）。

### 10. 待办清单（可直接转任务）

- 盘点现网菜单、路由、角色权限，并完成“功能映射表”。
- 落地 tokens 与基础组件（Button/Input/Card/Badge/Tabs/Toast/Modal/Pagination）。
- 改造 Pages 列表页到统一模板。
- 改造 Page 编辑页到 EditorHeader + Tabs + 分组表单/模块化形态。
- 收敛空/加载/错误/未保存/权限等统一状态。

---

## 附录：对齐设计稿风格的操作清单（从“现在”到“参考图”）

> 目标：让后台在“不新增不存在业务模块”的前提下，尽可能贴近 `UI设计风格参考.png` 的视觉语言与秩序感。  
> 方法：先收口 tokens，再收口 primitives，最后用模板把页面结构对齐。绝不在页面里散写“临时样式”。

### A. 一次性差异盘点（必须先做）

**1) Layout 差异**
- 双栏比例：左侧列表宽度、右侧编辑器宽度、栏间距（gap）。
- 页面 padding：外层容器内边距、卡片间距、表单分组间距。
- 层级：卡片用“浅边框 + 轻阴影”，避免边框/阴影混用导致廉价感。

**2) Sidebar 差异**
- 背景色与渐层（如果不用渐层，至少要做到同色阶深蓝）。
- 分组标题（CONTENT / EMS MANAGEMENT / SYSTEM）的字号、字重、颜色弱化程度。
- Item 高度、圆角、active 的背景块与强调条（左侧短条/背景色加深二选一或组合）。

**3) Topbar 差异**
- 高度、下分割线、右侧工具区间距。
- 按“设计稿秩序”保留标题/用户入口；不新增 Search/Help/Logs 等不存在模块。

**4) 组件差异（最常见偏差来源）**
- Button：主/次/幽灵/危险的填充、边框、hover/active、禁用态一致性。
- Input/Select：高度、圆角、边框色、placeholder 灰度、focus ring。
- Badge：Published/Draft 的 soft 背景色与文本色。
- Tabs：激活态红色下划线、字重与颜色。
- Dropdown/Menu：宽度、圆角、阴影、间距、点击项后是否自动关闭。

> 产出建议：做一张对照表（UI 点位 → 当前状态 → 目标状态 → 负责组件/样式入口），每次改动前先对照表更新。

### B. Tokens 对齐（决定“像不像”的关键）

**要做的操作**
- 把“设计稿里的数值”固化为 tokens（颜色/排版/间距/圆角/阴影/控件高度）。  
- 任何页面/组件都不允许直接写“新的随意颜色/阴影值”，必须从 tokens 取。

**建议要锁定的 tokens（示例）**
- Sidebar：背景、分割线、hover、active 背景、active 强调色。
- Primary 红：base/hover/active/soft（按钮、tabs 下划线、link）。
- 灰阶：fg/fg-muted/fg-subtle、border/border-subtle、surface/surface-muted。
- 圆角：按钮/输入（8）、卡片（12）、弹窗/下拉（12）。
- 阴影：sm/md（仅给 dropdown/modal/card）。
- 控件高度：按钮/输入/下拉（例如 36/40/44 三档，统一全站）。

**落地入口（代码映射）**
- 后台 tokens 建议统一维护在：`apps/ems-site/src/styles/admin.css`

### C. Primitives 皮肤化（让组件“天然像设计稿”）

**要做的操作**
- 把 Button/Input/Select/Card/Badge/Tabs/Modal/Toast/Pagination 的默认观感调到“无需页面额外补样式就好看”。  
- 收敛 size 体系（sm/md/lg）与密度（padding、font-size、line-height）。

**关键组件的设计稿对齐点**
- Button
  - Primary：红色实心（Update/Publish）+ 清晰 hover/active。
  - Secondary：浅灰底/浅边框（Save Draft/Preview）。
  - Ghost：透明底（弱操作）。
  - Danger：红色文本/红色边框（Move to Trash）。
- Input/Select
  - placeholder 更浅；focus ring 更干净（不要厚重蓝光）。
- Badge
  - Published：绿 soft 背景 + 深绿字；Draft：琥珀 soft 背景 + 深琥珀字。
- Tabs
  - 激活态：红色下划线 + 字色更深；非激活态灰。
- Dropdown/Menu（⋯）
  - 宽度更接近设计稿（偏宽一点）、内边距一致、阴影统一，点击项后自动关闭。

**落地入口（代码映射）**
- primitives 目录：`apps/ems-site/src/components/admin/ui/*`
- Tabs/Dropdown 的阴影/圆角应来自 tokens，不在页面里写新 shadow 值。

### D. 页面模板对齐（结构 + 留白 + 层级）

> 设计稿的“高级感”主要来自结构秩序：分栏比例、留白、卡片层级、信息分组，而不是花哨组件。

**1) Pages 列表页（List 模板）**
- Header：标题（大）+ 副标题（小灰）+ 主按钮靠右。
- Filters：搜索 + 状态筛选控件高度一致，左右对齐。
- List：卡片式容器 + row hover 背景 + icon/标题/路径/状态/日期的层级清晰。
- Footer：当数据量很少时不要强出分页/统计（避免“原型感”）。

**2) Page 编辑页（Editor 模板）**
- EditorHeader：Editing 标题 + 状态 badge + Permalink（Copy）+ 操作按钮组按主次排布。
- Tabs：仅保留需要的分区（Content/SEO/Settings），不保留多余入口（如 Advanced 已删除）。
- 右侧 Page Settings：保持“卡片 + 纵向按钮组”的秩序，按钮样式对齐设计稿。
- Content Modules（若做）：左模块列表（选中态/图标/行高）+ 右表单卡片（分组清晰）。

**落地入口（代码映射）**
- 模板组件：`apps/ems-site/src/components/admin/templates/*`
- 页面组件：`apps/ems-site/src/components/admin/AdminPagesIndex.tsx`、`AdminPageEditor.tsx`、`AdminMediaLibrary.tsx`
- 壳层：`apps/ems-site/src/layouts/AdminLayout.astro`、`src/components/admin/AdminSidebar.astro`、`AdminTopbar.astro`

### E. Icon / 字体 / 细节收口（决定“最后 20%”）

- Icon：统一来源（同一套线性/同一 stroke），避免混用 emoji/字符/不同 SVG 风格。
- 字体：统一一套系统无衬线即可，但要统一标题/正文/辅助信息的字号与字重规则。
- 边框/分割线：尽量轻；只在需要分组时出现。
- 阴影：只用于 dropdown/modal/card；其他地方用边框解决层级。

### F. 验收标准（是否“像设计稿”）

- Sidebar：背景色、分组标题、item 高度/圆角、active 状态一致。
- Topbar：高度、分割线、间距一致；不出现不存在功能入口。
- 控件：Button/Input/Select/Badge/Tabs 在任意页面一致（无需页面补样式）。
- 页面：List/Editor 模板的间距、分栏比例、卡片层级一致。

