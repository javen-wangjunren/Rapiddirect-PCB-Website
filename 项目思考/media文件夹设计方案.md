下面是「当前项目已落地版本」的 **Media Library 设计方案（对齐现状 + 下一步演进）**。

---

# Media Library 设计方案（已落地版）

## 1. 目标

为 EMS/PCB 后台增加一个类似 WordPress Media 的轻量媒体库，用来解决：

```text
1. 图片不能只靠手填 URL
2. 需要上传图片
3. 需要复制图片链接
4. 需要维护 title / alt（第一版已做）
   caption（暂不做，后续可选）
5. 需要按文件夹管理图片
6. Page Editor 的图片字段更易用（第一版：Media 链接 + Paste + 预览；
   后续：Choose from Media 回填）
```

---

# 2. 核心结论

采用：

```text
Supabase Storage
+ media_folders
+ media_assets
+ 动态文件夹 Media Library
```

不建议：

```text
❌ 图片继续只填 URL
❌ 固定写死一堆模块文件夹
❌ 回到 WordPress Media
❌ 第一版接 Cloudinary / S3 / R2
```

补充（对齐当前实现）：

- Storage bucket 使用 public read：前台直接使用 public URL，不做 signed URL。
- 页面内容 `content_json` 里图片字段仍存 URL 字符串（不改数据结构）。
- 避免 URL 过长的本质是“规范化路径前缀 + 好看的文件名”，不是换存储。

---

# 3. 信息架构

后台侧边栏建议：

```text
Pages
Media
Settings（后续）
```

Media 下：

```text
Media
├─ Library
└─ Add New（也可以合并在 Library 页面顶部）
```

当前落地：已合并为一个页面 `/ems/admin/media/`，Upload 位于页面顶部。

---

# 4. Media Library UI 结构

```text
Media Library
├─ 左侧：文件夹列表
│  ├─ All Media
│  ├─ Unfiled
│  ├─ Folders（树形，最多 2 层）
│  │   ├─ 父级文件夹
│  │   └─ 子级文件夹
│  └─ + New Folder（支持选择 Parent=父级）
│
└─ 右侧：媒体内容区
   ├─ Toolbar
   │  ├─ Upload
   │  ├─ Refresh
   │  └─ Logout
   │
   ├─ Image Grid
   │  ├─ Image Card
   │  ├─ Image Card
   │  └─ Image Card
   │
   └─ Detail Panel（右侧固定）
      ├─ Preview
      ├─ Title
      ├─ Alt Text
      ├─ File URL
      ├─ Copy URL
      ├─ Move to Folder
      └─ Delete
```

说明（已落地）：
- Unfiled 是“没有路径前缀”的文件（`path` 中不包含 `/`）。
- 已支持：Move（Storage move + 同步更新 `media_assets.path/public_url`）。
- 已支持：Delete（删除 Storage object + 删除 `media_assets` 记录）。

---

# 5. 数据结构

## 5.1 Supabase Storage

只使用一个 bucket：

```text
media
```

上传路径由文件夹决定：

```text
folder.path + "/" + file_name
```

示例（已落地）：

```text
ems/ems-home/test-image--a1b2c3.jpg
icons/pcb-icon--k8m2qz.svg
og/ems-home-og--m4n9p2.jpg
```

---

## 5.2 media_folders 表

用途：管理后台里的动态文件夹。

```text
media_folders
- id
- name
- path
- parent_id
- created_at
- updated_at
```

说明：

```text
name = 后台显示名，例如 EMS Home
path = Storage 实际路径，例如 ems-home
parent_id = 父级文件夹，第一版最多支持 2 层
```

约束（已落地）：
- Parent 只能选择顶层文件夹，保证最多 2 层。
- 第一版不做“重命名文件夹/移动文件夹”，避免批量改路径导致引用失效。

---

## 5.3 media_assets 表

用途：记录每个上传文件的信息和元数据。

```text
media_assets
- id
- bucket
- path
- public_url
- title
- alt
- mime_type
- size
- created_at
- updated_at
```

说明：

```text
path = Supabase Storage 内路径
public_url = 可用于前台展示的图片链接
title = 后台管理用名称
alt = 图片 SEO / 无障碍文本
```

备注：当前表结构已精简，避免 `file_name/file_path` 冗余；需要文件名时从 `path` basename 推导。

---

# 6. 文件夹策略

采用动态文件夹，而不是固定模块文件夹。

第一版支持：

```text
1. 创建文件夹
2. 选择文件夹上传图片
3. 查看某个文件夹下的图片
4. 移动图片到其他文件夹（已做）
5. 删除媒体文件（已做）
```

第一版限制：

```text
1. 最多支持 2 层文件夹
2. 不做批量操作
3. 不做复杂权限
4. 不做图片裁剪
5. 不做自动压缩
6. 不做版本历史
7. 不做“重命名文件夹/移动文件夹”（因为会导致批量改 path 与引用失效）
```

---

# 7. 上传规则

上传流程：

```text
1. 用户选择目标文件夹
2. 用户选择图片
3. 系统生成安全文件名
4. 上传到 Supabase Storage
5. 写入 media_assets 记录
6. 在 Media Library 中展示
```

文件名规则：

```text
slugified original file name + "--" + shortid + extension
```

示例：

```text
原始文件：Test Image.jpg
目标文件夹 path：ems/ems-home
最终 path：ems/ems-home/test-image--a1b2c3.jpg
```

---

# 8. Page Editor 图片字段体验

在 Page Editor 的图片字段中，不要只显示普通 URL 输入框。

推荐结构：

```text
Image URL
[ 输入框 ]

[Media] [Paste]

[图片预览]
```

点击 `Choose from Media`：

```text
1. 打开 Media Selector
2. 选择图片
3. 自动把 public_url 回填到当前 image_url 字段
4. 显示图片预览
```

当前落地（第一版）：
- 不做 Media Selector 回填
- 在 URL 字段提供：Media（新开 tab）+ Paste（从剪贴板粘贴）+ 预览

---

# 9. title / alt / caption 区别

```text
title:
后台管理名称，方便编辑人员识别图片

alt_text:
图片替代文本，给 SEO、无障碍、图片加载失败时使用

caption:
图片说明文字，通常显示在图片下方，第一版可选
```

第一版重点：

```text
必须做：title / alt
可选做：caption（后续）
```

---

# 10. 当前推荐实施顺序

```text
1. 建 media_folders 表
2. 建 media_assets 表
3. 创建 Supabase Storage bucket: media
4. 做 Media Library 页面
5. 实现上传到指定文件夹
6. 实现图片网格展示
7. 实现图片详情编辑 title / alt
8. 实现复制 public_url
9. （增强）实现 Page Editor 图片字段 Choose from Media 自动回填
```

---

# 给 TRAE 的提示词（更新版 / 与当前实现一致）

你可以直接复制下面这段给 TRAE：

```text
请为 EMS/PCB 后台设计并实现一个简版 Media Library，不要继续只用 URL 输入框管理图片。

目标：
做一个类似 WordPress Media 的轻量媒体库，用于上传、管理、选择图片，并和 Page Editor 的 image_url 字段打通。

一、总体要求

1. 不要回到 WordPress Media。
2. 不要使用固定模块文件夹。
3. 使用 Supabase Storage + Supabase 数据表实现。
4. Storage 只使用一个 bucket：media。
5. 第一版支持动态文件夹管理（最多 2 层）。
6. 第一版不要做图片裁剪、批量操作、复杂权限、版本历史、自动压缩。
7. 第一版不做“重命名文件夹/移动文件夹”。

二、数据库结构

请新增 media_folders 表：

字段：
- id
- name
- path
- parent_id
- created_at
- updated_at

说明：
- name 是后台显示名称，例如 EMS Home
- path 是 Storage 实际路径，例如 ems/ems-home
- parent_id 用于父级文件夹
- 第一版最多支持 2 层文件夹

请新增 media_assets 表：

字段：
- id
- bucket
- path
- public_url
- title
- alt
- mime_type
- size
- created_at
- updated_at

说明：
- path 是 Supabase Storage 内路径
- public_url 是前台可用图片链接
- title 用于后台管理
- alt 用于 SEO / 无障碍

三、Storage 规则

1. 只使用一个 bucket：media。
2. 上传路径由 folder.path 决定。
3. 文件路径规则：

上传路径 = folder.path + "/" + slugified original file name + "--" + shortid + extension

示例：
原始文件：Test Image.jpg
目标文件夹 path：ems-main-visuals
最终 path：ems-main-visuals/test-image--a1b2c3.jpg

四、Media Library UI

请新增后台页面：

/admin/media

页面结构：

左侧：
- All Media
- Unfiled
- 文件夹列表
- + New Folder

右侧：
- Upload 按钮
- Search
- Sort
- Grid/List 切换可以先不做，默认 Grid 即可
- 图片网格

点击图片后，显示详情区域或 Drawer：

- 图片预览
- Title
- Alt Text
- File URL
- Copy URL
- Move to Folder
- Delete

五、文件夹功能

第一版需要支持：

1. 创建文件夹
2. 查看某个文件夹下的图片
3. 上传图片时选择目标文件夹
4. 移动图片到其他文件夹
5. 删除媒体文件

第一版限制：

1. 最多支持 2 层文件夹
2. 不做批量移动
3. 不做复杂权限
4. 不做图片裁剪
5. 不做自动压缩
6. 不做“重命名文件夹/移动文件夹”

六、Page Editor 集成

在 Page Editor 中，所有图片字段，例如：

- image_url
- background_image_url
- icon_url
- og_image
- featured_image

不要只显示普通 URL input。

请升级为：

- URL input
- 图片预览

第一版可先实现：
- Media（打开 Media Library 新页）
- Paste（从剪贴板粘贴）
- 图片预览

点击 Choose from Media：
1. 打开 Media Selector
2. 选择某张图片
3. 自动把 media_assets.public_url 回填到当前字段
4. 显示图片预览

七、数据兼容原则

1. content_json 里的图片字段暂时仍然保存 public_url 字符串。
2. 不要把 image 字段改成复杂对象。
3. title / alt 存在 media_assets 表中。
4. 不要破坏现有 emsHomeSchema 和 defaults 结构。

八、后台侧边栏调整

后台左侧导航调整为：

- Pages
- Media
- Settings（后续预留）

Media 下至少有：
- Library
- Add New（也可以合并在 Library 顶部）

九、验收标准

完成后需要满足：

1. 可以创建文件夹
2. 可以上传图片到指定文件夹
3. 上传后 Supabase Storage 中路径正确
4. media_assets 中生成对应记录
5. 可以编辑 title / alt
6. 可以复制 public_url
7. 可以 Move 到文件夹、Delete（并同步 storage 与 media_assets）
8. 前台页面可以正常显示该图片
```

---

# 简短结论

**Media 方案建议直接做动态文件夹，不做固定模块文件夹。**

核心路线：

```text
Supabase Storage 一个 bucket
+ media_folders 管文件夹
+ media_assets 管图片元信息
+ Media Library 管理界面
+ Page Editor 图片字段辅助（Media + Paste + 预览；后续再做选择器回填）
```
