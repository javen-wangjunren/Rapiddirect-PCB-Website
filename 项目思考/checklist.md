# EMS 子站 Checklist（执行追踪）

用途：把 [开发路线图.md](file:///Users/javen/Desktop/Javen%20Project/PCB/%E9%A1%B9%E7%9B%AE%E6%80%9D%E8%80%83/%E5%BC%80%E5%8F%91%E8%B7%AF%E7%BA%BF%E5%9B%BE.md) 拆成可打勾的任务清单，并标记当前已完成/未完成的工作，便于后续推进与验收。

***

## 0. 当前完成状态（汇总）

- [x] Phase 0：项目初始化与基线确认（Astro + React + Tailwind + `/ems` 子路径配置 + 路由骨架）
- [x] Phase 1：首页模块拆分与字段决策（字段由人工确认，写入 schema/defaults）
- [x] Phase 2：首页组件开发（mock data 驱动 + 局部交互）
- [x] Phase 3：首页 schema 固化（`content/schemas` + `content/defaults`）+ 服务页骨架（4 个服务页路由）
- [x] Phase 4：Supabase 基础接入（首页所需三表 + RLS + seed + 前端查询封装）
- [\~] Phase 5：动态渲染闭环（已完成：首页 `/ems/` + `/ems/pcb-assembly/`；待完成：其他3个服务页闭环复制）
- [ ] Phase 6：SEO 与全局内容能力（canonical/sitemap/robots/global sections）
- [\~] Phase 7：后台管理（简版 CMS）（已完成：WP 风格 Admin Shell + 登录 + Pages 列表/Add Page + 通用编辑器 + EMS 编辑器 + PCB Assembly 编辑器 + Media Library；待完成：其他服务页编辑器）
- \[\~] Phase 8：表单、媒体与交互增强（表单/上传走 Supabase 等）
- [ ] Phase 9：部署、缓存与上线

***

## 1. Phase 0：项目初始化与基线确认

**目标**：项目可运行，`/ems/*` 子路径规则锁定，不再反复变动。

- [x] 初始化前端应用目录：`apps/ems-site/`
- [x] 配置 Astro 基础：`site/base/trailingSlash/build.format`
- [x] 建立 Layout：`src/layouts/EmsLayout.astro`
- [x] Tailwind 生效（全局样式入口存在且被 layout 引用）
- [x] 建立路由骨架（文件名与 slug 对齐）
  - [x] `/ems/` → `src/pages/index.astro`
  - [x] `/ems/pcb-assembly/` → `src/pages/pcb-assembly.astro`
  - [x] `/ems/pcb-design/` → `src/pages/pcb-design.astro`
  - [x] `/ems/pcb-manufacturing/` → `src/pages/pcb-manufacturing.astro`
  - [x] `/ems/components-sourcing/` → `src/pages/components-sourcing.astro`
- [x] 构建产物可生成（`pnpm check` / `pnpm build` 通过）

***

## 2. Phase 1：首页模块拆分与字段决策

**目标**：字段由人工确定，形成稳定结构，用于组件开发与后续数据接入。

- [x] 明确首页模块（10 个）
  - [x] Hero Banner
  - [x] EMS Service
  - [x] Quality Control
  - [x] Certification
  - [x] Industry
  - [x] Equipment
  - [x] Why Choose Us
  - [x] Order Process
  - [x] FAQ
  - [x] Quote Form（表单）
- [x] 字段固化到 schema/defaults（不从 `.figma` 自动推导字段，不引入视觉噪音字段）

***

## 3. Phase 2：首页组件开发（mock data）

**目标**：所有模块用 mock data 驱动渲染；交互只在必要处用 React。

- [x] 模块组件落位：`apps/ems-site/src/components/ems/`
- [x] 首页只负责组合模块：`src/pages/index.astro`
- [x] 交互模块（React）：
  - [x] Quality Control tabs
  - [x] Industry tabs
  - [x] FAQ accordion
  - [x] Quote Form（提交、附件选择、Turnstile widget）

***

## 4. Phase 3：首页 schema 固化与服务页骨架

**目标**：首页字段结构稳定并固化；服务页先搭骨架，保证 URL 与文件命名一致。

- [x] 首页 schema：`apps/ems-site/src/content/schemas/ems.ts`
- [x] 首页 defaults（mock data）：`apps/ems-site/src/content/defaults/ems.ts`
- [x] 服务页路由骨架已建立（见 Phase 0 路由骨架）
- [x] `components/common/` 抽离（仅当真实复用且职责一致时）
  - [x] `HeroBanner`
  - [x] `PcbProcessSection`
  - [x] `WhyChooseUsSection`
  - [x] `IndustrySection`
  - [x] `ReviewsSection`
  - [x] `FaqSection`
  - [x] `QuoteFormSection`

***

## 5. Phase 4：Supabase 基础接入（进行中：最小闭环已完成）

**目标**：完成 Supabase 表结构 + 前端查询封装 + seed 数据，具备读取页面内容的能力。

- [x] 设计并创建表（最小闭环）：`pages / seo_meta / page_content`
- [x] 确认远端 Supabase 已创建三表且已开启 RLS（`pages / seo_meta / page_content`）
- [ ] 创建表：`global_sections`（全局内容，Phase 6 会用到）
- [x] 启用 RLS + policy（浏览器端仅 anon key；published 可读）
- [x] 建立 `media` bucket + `media_assets` + `media_folders`（后台媒体库使用，public read）
- [x] 前端查询封装（支持按 slug 获取 published 页面）
  - [x] `lib/supabase/client.ts`（已接入 `@supabase/supabase-js`）
  - [x] `lib/supabase/queries.ts`
  - [x] `lib/supabase/mappers.ts`（`content_json` 与 defaults 的 fallback 合并）
- [x] 初始化首页 `/ems/` 的测试数据（seed）
- [x] 初始化至少 1 个服务页的测试数据（seed）：`/ems/pcb-assembly/`

补充说明（本阶段新增的关键事实）：

- 项目已接入 `@astrojs/node` adapter，使 `/ems/` 可以按请求读取 Supabase（服务端渲染），用于 Phase 5 闭环。

***

## 6. Phase 5：动态渲染闭环（进行中：首页已完成）

**目标**：先让 `/ems/` 完成“数据库驱动闭环”，再复制到服务页。

- [x] `/ems/`：通过 slug 查询 `pages`（published）
- [x] `/ems/`：读取 `page_content.content_json`
- [x] `/ems/`：读取 `seo_meta`（用于页面 title/description fallback）
- [x] `/ems/`：根据 `content_json` 渲染首页模块（保留 defaults fallback）
- [x] 用后台完成一次端到端验收：修改 `hero.title` → 保存 → 刷新 `/ems/` 生效（证明“后台 → Supabase → 前台”闭环）
- [x] 完成至少 1 个服务页的数据驱动闭环：`/ems/pcb-assembly/`（seed + SSR 按 slug 渲染 + 后台 schema 表单编辑）

### 6.x `/ems/pcb-assembly/`（PCB Assembly 服务页）当前进度

**前端（已完成：mock data 驱动 + 关键交互）**

- [x] 页面路由：`apps/ems-site/src/pages/pcb-assembly.astro`
- [x] Hero：`components/common/HeroBanner.astro`
- [x] PCBA Capability：`components/pcb-assembly/PcbaCapabilitySection.*`（含 gallery 左右切换、tabs）
- [x] Quality Control：`components/pcb-assembly/PcbaQualityControlSection.tsx`（时间轴 + equipment carousel；修复按钮遮挡）
- [x] PCB Process：`components/common/PcbProcessSection.*`（tabs + 左图右文 + expert advice）
- [x] Why Choose Us：`components/common/WhyChooseUsSection.astro`
- [x] Industry：`components/common/IndustrySection.*`（tabs）
- [x] Reviews：`components/common/ReviewsSection.*`（carousel + hover 上浮；修复 badge 位置与按钮遮挡）
- [x] FAQ：`components/common/FaqSection.*`
- [x] Quote Form：`components/common/QuoteFormSection.*`

**schema/数据（已完成：可在后台编辑并驱动前台 SSR 渲染）**

- [x] 类型（作为字段结构草案）
  - [x] `apps/ems-site/src/types/pcb-assembly.ts`（capability / quality）
  - [x] `apps/ems-site/src/types/pcb-process.ts`
  - [x] `apps/ems-site/src/types/why-choose-us.ts`
  - [x] `apps/ems-site/src/types/reviews.ts`
- [x] 为 `/ems/pcb-assembly/` 补齐 `content/schemas/*` 与 `content/defaults/*`
- [x] 写入 seed：`pages + page_content + seo_meta`（published）
- [x] 前端按 slug 读取 Supabase（复制 `/ems/` 闭环）
- [x] 后台为 `pcb_assembly` 增加 schema 表单（替换页面内 mock data）

验收方法（必做一次）：

- 在 Supabase 修改 `/ems/` 对应 `page_content.content_json.hero.title`，刷新页面应即时变化。
- 在后台修改 `/ems/` 对应 `hero.title` 并保存，刷新页面应即时变化。

***

## 6.1 下一步（从现在开始做什么）

建议严格按“最小闭环复制”推进：

- [x] Phase 5（优先）：用后台跑通一次“后台 → Supabase → 前台”验收（改 `/ems/` hero.title）
- [x] Phase 5：为 `/ems/pcb-assembly/` 写入 seed（`pages + page_content + seo_meta`），并在前端按 slug 渲染
- [x] Phase 5：`/ems/pcb-assembly/` 后台编辑器完成（schema 表单替换 JSON 编辑）
- [ ] Phase 5：把服务页渲染流程固化成可复用模式（其他服务页复刻闭环：pcb-manufacturing / pcb-design / components-sourcing）
- [ ] Phase 7：把 `ems_service` 从 JSON 占位升级为 schema 表单（服务页编辑体验 MVP）
- [ ] Phase 4/6：补 `global_sections` 表与读取策略（为全局 CTA/认证等做准备）
- [ ] Phase 6：补 canonical/sitemap/robots（上线前必须做）
- [ ] Phase 8：Worker 上线与同域路由绑定（`/api/contact`）+ 生产 Turnstile/Resend 配置验证

## 7. Phase 6：SEO 与全局内容能力（未开始）

**目标**：补齐 canonical/sitemap/robots 与全局内容模型，避免后期返工。

- [ ] canonical 逻辑（确保主域 `/ems/*` 正确）
- [ ] 统一 SEO 输出（meta/OG）
- [ ] sitemap 生成（只输出主域 `/ems/` 路径）
- [ ] robots 策略（临时域名禁止抓取）
- [ ] `global_sections` 读取与渲染策略（全局 CTA/认证等）

***

## 8. Phase 7：后台管理（简版 CMS）（进行中：原型已落地）

**目标**：不改代码即可编辑页面内容与 SEO（非拖拽式 builder）。

- [x] 登录页：`/ems/login/`（Supabase Auth）
- [x] Admin Shell：WordPress 风格布局（左侧 Sidebar + 顶部栏 + 内容区）
- [x] Pages 列表页：`/ems/admin/pages/`（读取 pages）
- [x] Add Page：从列表创建 draft，并初始化 `seo_meta` / `page_content`
- [x] 通用编辑入口：`/ems/admin/pages/edit/?slug=...`（按 slug 读取并保存到三表）
- [x] EMS 首页编辑器快捷入口：`/ems/admin/pages/ems/`（等价于编辑 `/ems/`）
- [x] PCB Assembly 服务页编辑器：`pcb_assembly`（schema(Tabs+Accordion) 编辑并保存到三表）
- \[\~] Content 编辑：`ems_home` 已按 schema(Tabs+Accordion) 编辑；`ems_service` 暂为 JSON 编辑占位
- [x] 权限：authenticated 可读写（RLS policy 迁移已落地）
- [x] SchemaForm 体验优化：`items[]` 默认折叠摘要 + 长文本 2–3 行预览
- [x] 图片字段辅助：Media（新开）+ Paste + 预览（仍存 URL 字符串）
- [x] Media Library：`/ems/admin/media/`（上传、复制链接、title/alt、文件夹、移动、删除）
- [ ] Pages 列表增强：搜索/筛选（draft/published）/批量操作/分页
- [ ] 模板扩展：为 `ems_service` 增加 schema + 友好表单（替换 JSON 占位）
- [ ] 删除/回收站：Move to Trash（需要软删字段或额外表设计）
- [ ] 全局模块管理：`global_sections`

补充（经验结论）：

- WordPress + ACF 之所以“看起来简单”，是因为字段数量与字段组织（Tabs/Accordion/Repeater/Conditional Logic）本质上是一个小型建模系统。
- 现阶段路线合理：先做最小可用编辑体验（WP 心智模型 + schema 驱动表单）→ 逐步把每个模板的 schema 补全，而不是一上来做可视化 builder 或通用拖拽。

***

## 9. Phase 8：表单、媒体与交互增强（部分完成）

**目标**：增强真实业务所需能力（表单、上传、轻交互），但不让 React 接管主内容 SEO。

- [x] 表单前端模块（Floating Center Card）已完成（mock 驱动）
- [x] Cloudflare Worker `/api/contact` 脚手架已建立（Turnstile 校验 + Resend 发信）
  - 参考文档：[表单.md](file:///Users/javen/Desktop/Javen%20Project/PCB/%E9%A1%B9%E7%9B%AE%E6%80%9D%E8%80%83/%E8%A1%A8%E5%8D%95.md)
- [x] Media Library MVP（Supabase Storage + Media 管理后台）已完成
- [ ] Worker 部署到生产并绑定同域路由（推荐 `rapiddirect.com/api/contact`）
- [ ] 生产 Turnstile site/secret key 配置与验证
- [ ] Resend 域名/发件人配置与验证
- [ ] 后续如果要“表单数据可追踪/可统计”：再接 Supabase（非初期必做）

***

## 10. Phase 9：部署、缓存与上线（未开始）

**目标**：主域 `/ems/*` 正式上线，缓存策略正确，SEO 规则不偏离。

- [ ] Cloudflare `/ems/*` 分流规则
- [ ] Cloudways 部署（或等价部署链路）
- [ ] 缓存策略：`/ems/_astro/*` 长缓存；HTML 不被错误缓存
- [ ] 上线前 SEO 自检（canonical、sitemap、robots、单 H1、资源路径）

***

## 11. 备注（执行习惯）

- 每完成一个模块/阶段，优先补齐：
  - `content/defaults`（fallback/mock）
  - schema（字段稳定后固化）
  - `pnpm check` / `pnpm build`（确保不会引入不可见错误）
