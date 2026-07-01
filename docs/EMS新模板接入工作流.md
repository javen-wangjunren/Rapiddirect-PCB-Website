# EMS 新模板接入工作流

## 1. 文档目的

这份文档用于固化当前 `apps/ems-site` 项目中新模板的标准接入流程，覆盖：

- 新模板注册
- 设计稿转前端模块
- 默认值准备
- 后台字段 schema 设计
- Admin Page Editor 接入
- `content_json` 保存与读取
- normalize 归一化
- 前台页面渲染

这份流程文档的目标，不只是指导人工开发，也为后续封装“网页搭建相关 SKILL”提供标准化步骤。

---

## 2. 当前项目的模板架构认知

当前项目不是 WordPress + ACF 的“模块字段组独立复用”模式，而是：

- 前端模块：以组件形式存在
- 后台字段：以“模板聚合 schema”为主，同时对 `common / 稳定模块` 逐步抽成“模块化 schema（标准版）”
- 页面内容：统一写入 `page_content.content_json`
- 页面类型：由 `pages.template_type` 决定

也就是说：

- 一个模块可以只有前端组件，没有独立 schema 文件
- 某个模块是否能在后台编辑，取决于它有没有被写进对应模板的 schema
- 同一个 common 模块，历史上可能会在多个模板 schema 里重复出现字段定义；现在的推荐方向是把它抽到 `src/content/schemas/modules/` 作为单一来源

这是当前阶段的架构选择，优点是按模板管理更直接，适合快速搭建业务页面。

---

## 3. 总体链路

一个新模板从 0 到可用，实际要打通两条链路：

### 3.1 内容模型链路

`TemplateType -> defaults -> schema -> normalize -> AdminPageEditor -> save content_json`

### 3.2 前台渲染链路

`Astro route page -> get published page -> merge defaults -> normalize -> section components render`

两条链路都打通，模板才算真正完成。

---

## 4. 推荐开发顺序

### 阶段 A：先完成前端页面结构

推荐顺序：

1. 新建模板路由页
2. 设计稿拆分为 section 模块
3. 每个模块先完成前端样式
4. 模板页按顺序串联模块
5. 用默认值让页面先跑起来

原因：

- 设计稿阶段字段通常还不稳定
- 先做 schema 容易反复返工
- 页面整体跑起来后，更容易从“页面视角”统一字段命名和后台模块边界

### 阶段 B：再集中做后台字段接入

页面结构稳定后，再做：

1. 模块字段确认
2. 模板 schema
3. normalize
4. AdminPageEditor 接入
5. 后台测试与保存

### 阶段 C：联调与收口

最后做：

1. defaults 与 schema 对齐
2. 历史/脏数据 normalize 兜底
3. 后台创建页验证
4. 前台渲染验证

---

## 5. 文件职责总览

### 5.1 模板类型

文件：

- `apps/ems-site/src/types/page.ts`

职责：

- 注册新的 `TemplateType`
- 让后台创建、编辑、保存时都能识别这个模板

### 5.2 前台模板页面

文件：

- `apps/ems-site/src/pages/<slug>.astro`

职责：

- 获取当前路径 slug
- 查询已发布页面内容
- 合并 defaults 与数据库内容
- normalize
- 把每个 section 数据传给前端组件

### 5.3 模板默认值

文件：

- `apps/ems-site/src/content/defaults/<template>.ts`

职责：

- 页面首次开发时提供完整默认内容
- 数据库内容缺失时兜底
- 后台加载时提供稳定初始结构

### 5.4 模板字段 schema

文件：

- `apps/ems-site/src/content/schemas/<template>.ts`

职责：

- 定义后台哪些模块可编辑
- 定义表单字段结构
- 驱动 `SchemaForm`

### 5.5 模板 normalize

文件：

- `apps/ems-site/src/content/normalize/<template>.ts`

职责：

- 对保存前和读取后的数据做结构清洗
- 防止 `undefined.map`
- 兼容旧字段、历史数据、空值

### 5.6 模板模块前端组件

文件：

- `apps/ems-site/src/components/<template>/...`
- 或 `apps/ems-site/src/components/common/...`

职责：

- 实现设计稿对应的 section

放置原则：

- 只属于某个模板的模块：放模板专属目录
- 多模板共享的稳定模块：放 `common`

### 5.7 后台模板模块编辑器

文件：

- `apps/ems-site/src/components/admin/<Template>EditorContentModules.tsx`

职责：

- 把模板 schema 中的模块分组展示到后台 Content tab
- 每个模块交给 `SchemaForm` 渲染

### 5.8 后台编辑总入口

文件：

- `apps/ems-site/src/components/admin/AdminPageEditor.tsx`
- `apps/ems-site/src/components/admin/AdminPagesIndex.tsx`

职责：

- 识别模板类型
- 加载 defaults + normalize
- 保存 content_json
- 提供 Add New Page 的模板下拉选项

---

## 6. 标准接入步骤

## Step 1：注册新的 TemplateType

修改：

- `src/types/page.ts`

操作：

- 在 `TemplateType` 联合类型中新增模板值

示例：

```ts
export type TemplateType =
  | 'ems_home'
  | 'pcb_board_manufacturing'
  | 'components_sourcing';
```

---

## Step 2：创建前台模板路由页

新增：

- `src/pages/<template-slug>.astro`

页面至少包含：

1. `export const prerender = false;`
2. 引入模板模块组件
3. 查询已发布内容
4. 合并 defaults
5. normalize
6. 渲染模块

建议结构：

```astro
---
export const prerender = false;

import EmsLayout from '../layouts/EmsLayout.astro';
import { createSupabaseClient } from '../lib/supabase/client';
import { getPublishedPageBundleBySlug } from '../lib/supabase/queries';
import { mergeSectionFallback } from '../lib/supabase/mappers';
import { xxxDefaults } from '../content/defaults/xxx';
import { normalizeXxxContentJson } from '../content/normalize/xxx';

const slug = Astro.url.pathname;
const supabase = createSupabaseClient();
const bundle = supabase ? await getPublishedPageBundleBySlug(supabase, slug) : null;
const contentJson = bundle?.content?.content_json ?? null;
const merged = mergeSectionFallback(xxxDefaults as any, contentJson);
const data = normalizeXxxContentJson(merged) as typeof xxxDefaults;
---
```

注意：

- 推荐前台页面也显式调用 normalize，不要只 merge 不 normalize

---

## Step 3：把设计稿拆成前端模块

原则：

- 一个 section 一个组件
- 在开始写模块前，先确认该模块属于：`common 模块` 或 `模板专属模块`
- 模块归属会直接决定：组件放置目录 + schema 组织方式（见下文）

建议目录：

- `src/components/<template>/`

例如：

- `src/components/pcb-board-manufacturing/PcbBoardIntroductionSection.astro`
- `src/components/pcb-board-manufacturing/PcbBoardStackupSection.tsx`

如果模块有交互：

- 用 `.tsx` 做交互主体
- 再用 `.astro` 做包装

### 先做“模块归属判定”（强制步骤）

在开始写模块前，必须先回答两个问题：

1. 这个模块是否会被多个模板复用？
2. 这个模块的字段结构是否稳定（不会因为单个模板的需求而变化很大）？

判定结果分两种：

#### A) common 模块（稳定复用）

放置位置：

- `apps/ems-site/src/components/common/`

字段约定：

- `common 模块的 schema = 标准版（single source of truth）`
- 不存在“某个模板少开放字段”的情况
- 多个模板引用同一个 common 模块时，后台字段结构必须一致
- 如果出现“同名模块但字段不一致”的需求，应视为新模块（模板专属或 common 变体），不要在 common schema 上做裁剪

因此 common 模块需要：

- 抽成“模块化 schema”，供不同模板直接复用（见 Step 5 的复用方式）

#### B) 模板专属模块（只在该模板体系内使用）

放置位置：

- `apps/ems-site/src/components/<template>/`

字段策略：

- schema 直接写在该模板的 schema 文件里
- 不需要单独抽模块 schema

---

## Step 4：先给每个模块准备默认值

新增或修改：

- `src/content/defaults/<template>.ts`

原则：

- 默认值先按前端页面渲染需要写全
- 哪怕后台字段还没接，也应该让页面先能渲染

规则：

- 模块已经删除的字段，不要继续保留在 defaults
- 模块固定内容可以保留在 defaults，但不一定要进 schema

例如：

- `quote_form` 是固定模块，可以只留 defaults，不做 schema

---

## Step 5：确认模块字段，再写进 schema

新增或修改：

- `src/content/schemas/<template>.ts`

原则：

- schema 按“模板”聚合
- 模块是否能在后台编辑，取决于是否写进 schema
- 字段只保留“真正需要编辑”的内容

例如：

- 固定样式的表单模块，如果标题、描述、背景都固定，可以不做 schema
- common 模块：不在模板里重复手写字段，而是复用“模块化 schema（标准版）”；不允许按模板裁剪字段

例如：

```ts
export const pcbBoardManufacturingSchema = {
  hero: { ... },
  introduction: { ... },
  stackup: { ... },
  equipment: emsHomeSchema.equipment,
  faq: emsHomeSchema.faq
};
```

### common 模块的模块化 schema（推荐目录）

当一个模块确定为 common 模块时，应把它的 schema 抽到：

- `apps/ems-site/src/content/schemas/modules/`

例如：

- `src/content/schemas/modules/hero.ts`
- `src/content/schemas/modules/faq.ts`
- `src/content/schemas/modules/equipment.ts`

然后在各模板 schema 中直接引用该模块 schema（标准版）：

- `hero: heroSchema`
- `faq: faqSchema`
- `equipment: equipmentSchema`

---

## Step 6：补 normalize

新增或修改：

- `src/content/normalize/<template>.ts`

作用：

- 保存前：清洗并规范字段结构
- 读取后：兼容历史数据和旧字段

必须覆盖：

- 每个进入 schema 的模块
- 每个前台会渲染、且结构复杂的模块

典型风险：

- 数组字段不是数组
- 老字段名和新字段名不一致
- 模块删掉了字段，但旧数据里还有

normalize 规则建议：

- 字符串统一兜底为 `''`
- 数组统一兜底为 `[]`
- 对象统一兜底为 `{}` 再映射
- 历史字段兼容时，写清楚映射关系

---

## Step 7：接入后台模板模块编辑器

新增：

- `src/components/admin/<Template>EditorContentModules.tsx`

职责：

- 维护模块列表
- 每个模块交给 `SchemaForm`

建议：

- 模块名称与前台 section 名称保持一致
- 不在 schema 中的固定模块，不要放进这里

---

## Step 8：接入 AdminPageEditor

修改：

- `src/components/admin/AdminPageEditor.tsx`

需要补的点：

### 8.1 顶部 import

引入：

- defaults
- normalize
- schema
- `<Template>EditorContentModules`

### 8.2 加载时识别模板

在 `template === 'your_template'` 分支里：

1. `deepMerge(defaults, safeRaw)`
2. `setContentJson(normalizeXxxContentJson(merged))`

### 8.3 保存时识别模板

在 `doSave()` 里：

1. `normalizeXxxContentJson(contentJson)`
2. `pruneEmpty`
3. `saveAdminBundle`

### 8.4 声明 hasSchema

如果该模板有 schema，要加入 `hasSchema` 逻辑

### 8.5 编辑页 Template 下拉

在 Template 选项中加入新模板

### 8.6 Content tab 渲染分支

在 Content 区域中渲染对应的 `<Template>EditorContentModules`

---

## Step 9：接入 Add New Page 的模板下拉

修改：

- `src/components/admin/AdminPagesIndex.tsx`

这里经常漏。

需要补：

- 创建弹窗中的 Template `<option>`

如果这里只改编辑页，不改创建页，就会出现：

- 已有页面可以改成这个模板
- 但 Add New Page 无法直接创建这个模板

这是实际开发中已经踩过的坑。

---

## Step 10：确保 defaults 与 schema 对齐

完成字段接入后，必须检查：

- defaults 中是否还有无效字段
- schema 中是否有前台已删除的字段
- normalize 是否保留了旧字段逻辑但前台已不用

处理原则：

- 已删除的 UI 字段，从 defaults 和 normalize 一起清理
- 固定模块如果不做后台可编辑，应明确只保留 defaults

---

## Step 11：前台渲染验证

检查：

1. 数据库无记录时，页面能否用 defaults 正常渲染
2. 创建后台页面并保存后，前台是否读到 `content_json`
3. 模块新增字段后，前台是否同步消费
4. normalize 是否避免了报错

重点验证：

- `undefined.map`
- `startsWith` 空值报错
- 图片字段空值
- Repeater 结构不一致

---

## Step 12：提交前检查

至少执行：

```bash
cd apps/ems-site
npm run check
```

如果做了后台模板接入，还要手动验证：

1. Add New Page 能看到新模板
2. 创建页面成功
3. Content tab 能看到对应模块
4. 保存后刷新仍正常
5. 前台对应 slug 页面正常渲染

---

## 7. common 模块与模板专属模块的判断规则

### 放 `common`

满足任意条件可考虑：

- 多个模板明确复用
- 字段结构已稳定
- 视觉和业务含义都比较通用

例如：

- `HeroBanner`
- `EquipmentSection`
- `FaqSection`
- `QuoteFormSection`

补充约定：

- common 模块如果进入后台可编辑，必须提供“模块化 schema（标准版）”，避免在不同模板 schema 中重复手写字段

### 放模板目录

满足任意条件建议放模板目录：

- 只在某一个模板体系中使用
- 带明显业务语义
- 结构或交互比较独特
- 后续还会随模板演化

例如：

- `pcb-board-manufacturing/PcbBoardStackupSection`
- `components-sourcing/SourceCapabilitySection`

---

## 8. 模块字段规划原则

字段规划时建议只保留三类内容：

1. 业务文案
2. 图片/媒体
3. 明确需要运营或后台修改的结构

不建议轻易开放：

- 纯样式字段
- 已固定的标签文案
- 实际不会改的按钮/布局属性

一个实用标准：

- “这个内容后续会不会真的在后台改？”
- 如果答案是否定的，就不进 schema

---

## 9. 固定模块处理原则

并不是页面上所有模块都必须进入 schema。

例如固定表单模块：

- 如果表单标题、描述、背景、字段都固定
- 且不同产品页不需要改

那么建议：

- 保留前端组件
- 保留 defaults
- 不写进 schema
- 不接入后台编辑器

这样可以减少后台复杂度，也避免无意义字段膨胀。

---

## 10. 当前推荐的模板开发 SOP

以后新建模板时，建议严格按下面顺序执行：

1. 明确模板 slug 与 template_type
2. 在 `page.ts` 注册 `TemplateType`
3. 新建路由页
4. 新建设计稿对应模块组件
5. 写完整 defaults，让页面先跑起来
6. 按模块确认字段
7. 写模板 schema
8. 写模板 normalize
9. 写 `<Template>EditorContentModules.tsx`
10. 接入 `AdminPageEditor.tsx`
11. 接入 `AdminPagesIndex.tsx` 创建页模板下拉
12. 对齐 defaults / schema / normalize
13. 后台手动创建页面并验证保存
14. 前台验证渲染
15. `npm run check`
16. 提交代码

---

## 11. 新模板接入检查清单

### 基础注册

- [ ] `TemplateType` 已新增
- [ ] 新模板路由页已创建
- [ ] 模板 slug 已确定

### 前端模块

- [ ] 设计稿已拆成 section 组件
- [ ] 模块目录归属已明确
- [ ] 页面模块顺序已串联完成

### 内容模型

- [ ] defaults 已写全
- [ ] schema 已写入需要编辑的模块
- [ ] normalize 已覆盖结构复杂模块

### 后台接入

- [ ] `<Template>EditorContentModules.tsx` 已创建
- [ ] `AdminPageEditor` 已接 defaults / schema / normalize / Content modules
- [ ] 编辑页 Template 下拉已加入模板
- [ ] Add New Page 弹窗 Template 下拉已加入模板

### 联调

- [ ] defaults 与 schema 已对齐
- [ ] 删除字段已从 defaults 清理
- [ ] 后台创建页面成功
- [ ] 后台保存内容成功
- [ ] 前台页面读取正常
- [ ] `npm run check` 通过

---

## 12. 已知易漏点

### 易漏点 1：只接编辑页，不接创建页

表现：

- 编辑页 Template 下拉里有新模板
- Add New Page 里没有

处理：

- 记得同步改 `AdminPagesIndex.tsx`

### 易漏点 2：前台有模块，后台没有 schema

表现：

- 页面能渲染
- 但后台 Content tab 没有这个模块

处理：

- 检查 schema 和 `<Template>EditorContentModules.tsx`

### 易漏点 3：defaults 有字段，前端已经不用了

表现：

- defaults 越积越乱
- normalize 和 schema 出现历史字段残留

处理：

- 每次字段确认后同步清理 defaults / normalize

### 易漏点 4：只 merge 不 normalize

表现：

- 历史数据结构变形时容易报错

处理：

- 前台 route page 也建议显式 normalize

---

## 13. 后续可继续沉淀的方向

这份流程后续可以继续抽象成 3 个层次：

### 13.1 模板创建 SKILL

输入：

- 页面类型
- slug
- 模块列表

输出：

- TemplateType
- route page
- defaults
- schema
- normalize
- AdminPageEditor 接线

### 13.2 模块创建 SKILL

输入：

- 设计稿 HTML
- 模块名称
- 是否 common

输出：

- 前端 section 组件
- 默认值结构建议
- 字段规划建议

### 13.3 字段规划 SKILL

输入：

- 模块 HTML 结构
- 用户说明

输出：

- 最小可编辑字段结构
- schema 片段
- normalize 片段

---

## 14. 结论

当前项目的新模板接入，不是单一步骤，而是一个完整闭环：

`新模板注册 -> 前端模块实现 -> 默认值 -> 字段确认 -> schema -> normalize -> AdminPageEditor -> Add New Page -> 保存 content_json -> 前台 merge + normalize -> 页面渲染`

后续无论是人工开发还是封装 SKILL，都应以这条闭环为标准，而不是只做其中某一段。
