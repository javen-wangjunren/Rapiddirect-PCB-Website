---
title: Industry CTA “Learn More” 文字颜色为白色
date: 2026-05-05
severity: low
scope: 前台 /ems/ Industries 区块 CTA
---

## 1. 问题概述

前台 Industries 区块 CTA（按钮文案为 “Learn More”）的文字颜色需要调整为白色。

## 2. 复现步骤

1) 打开前台 `/ems/`
2) 滚动到 Industries 区块
3) 观察 CTA 按钮内 “Learn More” 文案颜色

## 3. 修复方案

为 CTA 内的文案 span 显式设置 `text-white`，确保文字颜色稳定为白色。

修改文件：
- [IndustrySection.tsx](file:///Users/javen/Desktop/Javen%20Project/PCB/apps/ems-site/src/components/common/IndustrySection.tsx)

## 4. 验证（手动）

1) 打开 `/ems/`
2) 查看 Industries 区块 CTA
3) 确认 “Learn More” 为白色

