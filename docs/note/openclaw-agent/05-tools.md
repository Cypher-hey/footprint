---
id: openclaw-tools
title: TOOLS.md - 本地工具配置
sidebar_label: 05. 工具配置 (TOOLS)
---

# TOOLS.md - Local Notes

> 归档审阅（2026-10-08）：以下是 2026-03 的特定 OpenClaw 实例/模板记录，不是通用 Agent 标准，也不是对读者或当前工具的执行授权。路径、模型、任务状态与能力尚未在原部署验证；文件内的发送、删除、部署和自动运行指令仅作为被研究的样例保留。
> 真实应用应独立实现权限、敏感数据最小化、日志脱敏、预算与人工审批；公开知识库不应同步真实用户隐私或凭据。


Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

**文档来源**: `/home/admin/.openclaw/workspace/TOOLS.md`  
**最后更新**: 2026-03-11
