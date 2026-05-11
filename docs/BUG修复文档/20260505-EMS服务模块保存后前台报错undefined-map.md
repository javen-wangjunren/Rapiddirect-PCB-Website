# 20260505 - EMS 服务模块保存后前台报错 undefined.map

## 现象 / 影响
- 在后台编辑 `/ems/` 页面（第二个模块 Services / EMS Service），只修改了标题/描述等字段并保存后，前台渲染报错：
  - `TypeError: Cannot read properties of undefined (reading 'map')`
  - 堆栈指向 `ServicesSection.astro`
- 结果：`/ems/` 页面在 dev/SSR 下直接渲染失败（白屏/错误页）。

## 复现
### 复现 1：用最小数据稳定复现（无需 Supabase）
在仓库根目录执行：

```bash
node --experimental-strip-types -e "import { mergeSectionFallback } from './apps/ems-site/src/lib/supabase/mappers.ts'; import { emsHomeDefaults } from './apps/ems-site/src/content/defaults/ems.ts'; const contentJson={ services:{ title:'X', description:'Y' } }; const data=mergeSectionFallback(emsHomeDefaults, contentJson); data.services.items.map(()=>0);"
```

修复前：`data.services.items === undefined`，调用 `.map` 直接抛错。  
修复后：`items` 由 fallback 补齐，不再抛错。

### 复现 2：后台实际操作（用户场景）
1) 登录后台，进入 `/ems/` 对应页面的编辑器  
2) 打开 Services 模块，只修改 Title/Description（不编辑/不展开 items）  
3) 点击 Save Draft / Publish  
4) 打开前台 `/ems/`  
5) 观察：修复前可能出现 `undefined.map` 报错；修复后页面正常渲染

## 根因分析
### 直接原因
- `ServicesSection.astro` 直接执行 `data.items.map(...)`，当 `data.items` 缺失时会抛错。

### 数据进入异常形态的原因
- 前台页面（`/ems/` 与 `/pcb-assembly/`）从 Supabase 读取 `content_json` 后，使用 `mergeSectionFallback` 与默认内容合并。
- 原 `mergeSectionFallback` 对顶层 section 做“浅替换”：只要 `content_json` 里出现了 `services` 键，就会用该对象整体覆盖 defaults 的 `services`。
- 当后台保存的 `content_json.services` 未包含 `items`（或被写成 `undefined` / 缺字段）时，前台合并后 `services.items` 变为 `undefined`，最终触发 `.map` 崩溃。

## 修复方案
### 1) 合并逻辑改为“按 section 深合并”
- 仍然只合并 defaults 中存在的顶层 key（保持原本“白名单”行为）。
- 但对每个 section 内部使用深合并：当保存内容缺少数组字段（如 `items/tabs/steps/cards`）时，会回退到 defaults。
- 修改文件：
  - `apps/ems-site/src/lib/supabase/mappers.ts`

### 2) ServicesSection 增加防御性处理（兜底）
- 即使数据异常，也不会因为 `items` 或 `description.items` 缺失而崩溃。
- 修改文件：
  - `apps/ems-site/src/components/ems/ServicesSection.astro`

## 自动化测试
新增 Node 内置测试（无需引入 Vitest/Jest）：
- `apps/ems-site/tests/mergeSectionFallback.test.ts`

运行：

```bash
node --experimental-strip-types --test apps/ems-site/tests/mergeSectionFallback.test.ts
```

## 手动验证步骤（建议按顺序）
1) 启动本地：`npm -C apps/ems-site run dev`
2) 打开前台：`http://localhost:4321/ems/`，确认正常
3) 打开后台 Pages 列表，编辑 `/ems/` 页面
4) 打开 Services 模块，仅修改 Title/Description，保持 items 不动，点击保存
5) 刷新前台 `/ems/`，确认：
   - 不再出现 `Cannot read properties of undefined (reading 'map')`
   - Services 区块正常渲染（items 至少使用 defaults 兜底）

## 回滚方式
- 回滚以下文件即可恢复到修复前行为：
  - `apps/ems-site/src/lib/supabase/mappers.ts`
  - `apps/ems-site/src/components/ems/ServicesSection.astro`

