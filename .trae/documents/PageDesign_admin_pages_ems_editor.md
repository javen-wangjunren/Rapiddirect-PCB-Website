# /admin/pages/ems 后台编辑器（WordPress 风格）页面设计说明（Desktop-first）

## Global Styles（全局设计规范）
- Layout 基线：12 栅格容器（max-width: 1200–1320px）；页面内容区采用 CSS Grid 两列：主区自适应 + 右侧 320px（sticky）。
- 色彩：
  - Background: #F6F7F7（接近 WP admin 背景）
  - Surface/Card: #FFFFFF
  - Border: #DCDCDE
  - Primary: #2271B1（按钮/链接主色）
  - Danger: #D63638（删除/高风险动作）
  - Text: #1D2327
  - Muted: #646970
- 字体与排版：
  - 基础字号 14px；标题 20–24px；表单标签 12–13px；行高 1.4–1.6
- 组件规范：
  - Button：Primary/Secondary/Tertiary；hover 加深 6–10%；disabled 40% 透明
  - Input：高度 36px；focus ring 使用 Primary 20% 透明
  - Card：圆角 6px；内边距 16px；卡片间距 12–16px
  - Tabs：顶部横向 tabs；active tab 下划线或底部边框强调
  - Accordion：块标题行 + 展开区域；支持拖拽排序（视觉上提供 drag handle）

---

## Page 1：登录页（/login）

### Layout
- 居中单列布局（Flexbox）：页面垂直水平居中；表单卡片宽 360–420px。

### Meta Information
- title: "后台登录"
- description: "登录后进入 EMS 页面编辑器"

### Page Structure
1. Logo/产品名（可选）
2. 登录卡片（表单）
3. 错误提示区域

### Sections & Components
- 登录表单卡片
  - Input：邮箱
  - Input：密码
  - Primary Button：登录
  - Inline error：必填/账号密码错误
- 交互
  - 提交后按钮 loading
  - 登录成功跳转到 /admin/pages/ems

---

## Page 2：EMS 后台编辑器页（/admin/pages/ems）

### Layout
- 页面外壳：顶部固定/非固定均可（原型建议非固定，避免遮挡表单）。
- 内容区：CSS Grid 两列
  - 左列（主区）：min-width 0，自适应
  - 右列（侧栏）：width 320px；position: sticky; top: 16px
- 间距：主区与侧栏 gap 24px；模块垂直间距 16px

### Meta Information
- title: "EMS 页面编辑器"
- description: "编辑 EMS 页面内容、发布状态与 SEO 信息"
- Open Graph：后台页无需对外分享，可不设置；如设置则同 title/description

### Page Structure（从上到下）
1. 顶部信息栏（标题 + slug）
2. 主内容区（Tabs + 内容面板）
3. 右侧侧栏（发布卡片 + SEO 卡片）
4. 页脚说明（范围声明：不做 pcb-assembly）

### Sections & Components

#### 1）顶部信息栏（Title + Slug）
- 标题输入
  - 大号 Input（20–24px 字号）
  - placeholder："添加标题"
- Slug 行
  - 文案："固定链接" + 当前 slug（可点击“编辑”）
  - Slug 编辑态：小号 Input + 保存/取消
  - 规则提示：仅小写字母、数字、连字符（可在输入下方轻提示）
- 保存状态提示（右侧或标题下方）
  - 文案："未保存更改" / "保存中…" / "已保存"
- 预览入口
  - Secondary Button：预览（仅前端渲染当前草稿，不要求已发布）

#### 2）主区内容（Tabs）
- Tabs（至少 2 个）
  - Tab A："内容"
  - Tab B："模块"

##### Tab A：内容
- 富文本编辑器卡片
  - 工具栏：粗体/链接/列表/标题（最小集即可）
  - 编辑区：最小高度 320–480px

##### Tab B：模块（Accordion）
- 顶部工具条
  - Primary："新增模块"
  - 辅助文案："使用模块组织 EMS 页面结构化内容"
- Accordion 列表（每个模块一张可折叠卡）
  - 折叠行：模块标题 + drag handle + 删除（危险动作二次确认）
  - 展开区（最小集字段）：
    - Input：模块标题
    - Textarea/富文本：模块内容
  - 排序：拖拽后即时更新顺序（视觉反馈为占位线）

#### 3）右侧发布栏（Publish 卡片）
- 卡片标题："发布"
- 状态区
  - 状态：草稿/已发布
  - 可选展示：最后更新（时间）
- 操作区
  - Secondary Button："保存草稿"
  - Primary Button："发布"（若已发布则显示"更新"）
- 校验提示
  - 若标题/slug 为空：在按钮上方红色提示并定位到对应字段

#### 4）SEO 独立卡片（SEO 卡片）
- 卡片标题："SEO"
- 字段（最小集）
  - Input：Meta Title
  - Textarea：Meta Description（带字数提示）
  - OG 图片：上传/移除（可选，接 Supabase Storage）
- 预览区
  - SERP 片段样式预览：标题（蓝）+ 域名/slug（绿/灰）+ 描述（灰）

#### 5）范围声明（不做 pcb-assembly）
- 在页面底部或侧栏下方以提示条呈现：
  - "本编辑器仅用于 EMS 页面内容管理；不包含 pcb-assembly 相关字段与模块。"

### Responsive（可选，原型简单处理）
- <= 1024px：右侧栏下移到主区下方（grid 改为单列），发布卡片与 SEO 卡片在内容之后堆叠。
