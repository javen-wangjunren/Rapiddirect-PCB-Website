---
title: Quality Control Tab 图标颜色 active 逻辑反了
date: 2026-05-05
severity: low
scope: 前台 /ems/ Quality Control 区块
---

## 1. 问题概述

Quality Control 区块的顶部 tabs（Pre-Production / In-Production / After-Production）里，图标颜色与 active 状态逻辑相反：
- active 时图标应为白色（与白色文字一致），实际显示为黑色
- inactive 时图标应为黑色，实际显示为白色

## 2. 复现步骤

1) 打开前台 `/ems/`
2) 滚动到 Quality Control 区块
3) 观察 tab：
   - 切换 active tab 后，图标颜色与文字颜色不一致

## 3. 根因分析

tab 图标源文件本身并不统一：
- `mocbk63g-mxl6407.svg` 等是 `stroke="white"`
- `mocbk63g-mr0ruiq.svg` 等是 `stroke="#0A0A0A"`

因此单纯依赖 `invert`（CSS filter）无法让 3 个图标在 active/inactive 下都稳定呈现期望颜色：同一套 invert 逻辑对不同源色的 SVG 会得到相反结果。

## 4. 修复方案

改为不使用 `invert`，而是用 SVG mask + `currentColor` 渲染：
- icon 作为 mask（只取形状 alpha）
- 颜色来自按钮的 `color`（即文字颜色）
- active 时 `text-white` → icon 白
- inactive 时 `text-slate-900` → icon 黑

修改文件：
- [QualityControlSection.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/ems/QualityControlSection.tsx)

## 5. 验证（手动）

1) 打开 `/ems/`
2) Quality Control 顶部 3 个 tab 逐个点击切换
3) 验证：
   - active tab：图标为白色，和文字一致
   - inactive tab：图标为黑色
