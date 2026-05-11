先不做 `pcb-assembly`。

目前的路线是：

```text
先把 /ems/ 首页完整闭环跑通
再复制模式到服务页
```

---

# `/ems/` 首页完整闭环包括什么？

现在你已经完成了：

```text
Supabase 数据 → 前端页面渲染 ✅
```

接下来还差的是：

```text
后台编辑体验 → Supabase 保存 → 前端变化
```

也就是：

```text
Admin Page Editor
→ 修改 hero.title
→ 保存到 page_content.content_json
→ 刷新 /ems/
→ 页面变化
```

---

# 下一步应该做什么？

## 1. 先做 EMS Page Editor 静态原型

不要先做完整后台系统。
只做一个页面：

```text
/admin/pages/ems
```

里面包含：

```text
Basic
- title
- slug
- template_type
- status

SEO
- meta_title
- meta_description
- canonical_url
- og_image

Content
- Hero
- EMS Service
- Quality Control
- Certification
- Industry
- Equipment
- Why Choose Us
- Order Process
- FAQ
- Quote Form
```

用：

```text
Tabs + Accordion
```

解决字段太多的问题。

---

## 2. 再让它读取 Supabase 数据

也就是后台打开时：

```text
读取 pages
读取 seo_meta
读取 page_content.content_json
```

然后把字段填进表单。

---

## 3. 最后做保存

保存时分别更新：

```text
pages
seo_meta
page_content
```

---

# 推荐当前顺序

```text
1. /ems/ 前台动态读取 ✅ 已完成
2. /admin/pages/ems 静态后台原型
3. 后台读取 /ems/ 的 Supabase 数据
4. 后台字段可编辑
5. 保存回 Supabase
6. 前台 /ems/ 刷新后变化
```

---

# 这才叫 EMS 首页完整闭环

```text
Supabase → 前台
后台 → Supabase
后台 → Supabase → 前台
```

---

# 可以给 TRAE 的指令

```text
现在不要做 pcb-assembly 页面。

请继续完成 /ems/ 首页的完整闭环，优先开发 EMS Page Editor。

目标：
1. 新建一个后台编辑页面 /admin/pages/ems
2. 采用类似 WordPress ACF 的编辑布局
3. 顶部编辑 pages 基础字段：title、slug、template_type、status
4. SEO 区域编辑 seo_meta 字段
5. Content 区域按 emsHomeSchema 渲染 content_json 字段
6. Content 使用 Tabs + Accordion，避免所有模块从上堆到下
7. 先用现有 Supabase 数据读取并填充表单
8. 保存时更新 pages、seo_meta、page_content
9. 不做前台可视化编辑
10. 不做 drag builder
11. 不做 pcb-assembly
```

---

# 一句话结论

**你现在应该先做 `/ems/` 首页的后台编辑闭环，而不是去做 `pcb-assembly`。**




我希望实现接近 WordPress 后台的真实编辑体验以下是我对这个后台布局的思考。

**不是所有东西都放进 Tab。**
更合理的是：

```text
页面基础信息 = 直接展开
SEO = 右侧或独立卡片
内容模块 = Tab + Accordion
发布状态 = 右侧栏
```

---

# 推荐后台布局

```text
EMS Page Editor
├─ 顶部主编辑区
│  ├─ Page Title
│  └─ Permalink / Slug
│
├─ 左侧主内容区
│  ├─ Content Modules Card
│  │  ├─ Tab: Overview
│  │  ├─ Tab: Capabilities
│  │  ├─ Tab: Trust
│  │  └─ Tab: FAQ
│  │
│  │  每个 Tab 内：
│  │  └─ Accordion 模块字段
│  │
│  └─ SEO Settings Card
│     ├─ SEO Title
│     ├─ SEO Description
│     ├─ Canonical URL
│     └─ OG Image
│
└─ 右侧栏
   ├─ Publish
   ├─ Featured Image
   └─ Page Settings
```

---

# 具体怎么分

## 顶部直接展开

```text
Page Title
Slug / Permalink
```

这两个不需要放 Tab。

---

## 右侧栏

```text
Publish
- status
- visibility
- updated_at
- save / update

Featured Image
- featured image

Page Settings
- template_type
- noindex
```

---

## SEO Settings

我建议放在主内容下面单独一个 Card，而不是塞进内容模块 Tab。

```text
SEO Settings
- meta_title
- meta_description
- canonical_url
- og_title
- og_description
- og_image
```

原因：SEO 是页面级配置，不属于内容模块。

---

# 内容模块的 Tab 规划

只给内容模块用 Tab。

## Tab 1：Overview

放首屏和业务概览。

```text
Hero
EMS Service
```

---

## Tab 2：Capabilities

放服务能力、技术能力、流程类内容。

```text
Quality Control
Equipment
Order Process
```

---

## Tab 3：Trust

放信任背书。

```text
Certification
Why Choose Us
Industry
```

> Industry 也可以放 Overview，但我更倾向放 Trust，因为它是“我们服务哪些行业”的信任证明。

---

## Tab 4：FAQ

```text
FAQ
```

FAQ 单独一个 Tab 很合理，因为它通常字段多，items 也多。

---

# Quote Form

不进后台，固定调用。

```text
Quote Form = 固定前端功能模块
```

最多以后只做全局配置，例如：

```text
表单收件人
表单标题
是否显示附件上传
```

但第一阶段不用。

---

# 最终结构

```text
顶部：
- Page Title
- Slug

主内容：
[Content Modules]
  Overview
    - Hero
    - EMS Service

  Capabilities
    - Quality Control
    - Equipment
    - Order Process

  Trust
    - Certification
    - Industry
    - Why Choose Us

  FAQ
    - FAQ

[SEO Settings]
  - meta title
  - meta description
  - canonical
  - OG

右侧栏：
[Publish]
[Featured Image]
[Page Settings]
```

---

# 给 TRAE 的指令

```text
请按 WordPress ACF 后台风格重新规划 EMS Page Editor：

1. Page Title 和 Slug 放在页面顶部，直接展开，不放入 Tabs。
2. 右侧固定 Sidebar：
   - Publish
   - Featured Image
   - Page Settings

3. SEO Settings 不放进内容 Tabs，作为主内容区下方单独 Card 展示。

4. 只有页面内容模块使用 Tabs + Accordion。

Content Modules 的 Tab 结构如下：

Overview:
- Hero
- EMS Service

Capabilities:
- Quality Control
- Equipment
- Order Process

Trust:
- Certification
- Industry
- Why Choose Us

FAQ:
- FAQ

5. Quote Form 不进入后台编辑，作为固定前端模块保留。
6. 先做 UI 原型和字段展示，不做前台可视化编辑，不做 drag builder。
```

---

一句话：
**Basic / SEO / Publish 这些是页面级配置；只有真正的内容模块才需要 Tab + Accordion。**

