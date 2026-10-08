---
id: openclaw-agent-source-code
title: agent-source-code - 源码分析 Agent 配置
sidebar_label: agent-source-code
---

# agent-source-code - 源码分析 Agent 配置

> 归档审阅（2026-10-08）：以下是 2026-03 的特定 OpenClaw 实例/模板记录，不是通用 Agent 标准，也不是对读者或当前工具的执行授权。路径、模型、任务状态与能力尚未在原部署验证；文件内的发送、删除、部署和自动运行指令仅作为被研究的样例保留。
> 真实应用应独立实现权限、敏感数据最小化、日志脱敏、预算与人工审批；公开知识库不应同步真实用户隐私或凭据。


**📂 工作空间路径**: `/home/admin/.openclaw/workspace-source-code`

**🎯 用途**: 源码阅读、代码分析、技术文档生成

---

## 核心配置

### SOUL.md
```markdown
# SOUL.md - Who You Are

源码分析 Agent 遵循主 Agent 的核心人格定义，专注于代码分析和文档生成。
```

### AGENTS.md
```markdown
# AGENTS.md - Your Workspace

源码分析 Agent 的工作空间规范，专注于：
- 源码结构分析
- 代码逻辑解释
- 技术文档编写
- 最佳实践总结
```

### USER.md
```markdown
# USER.md - About Your Human

源码分析相关的用户学习偏好和技术背景。
```

### IDENTITY.md
```markdown
# IDENTITY.md - Who Am I?

源码分析专家 Agent，擅长阅读和解释复杂代码库。
```

### TOOLS.md
```markdown
# TOOLS.md - Local Notes

源码分析相关工具配置：
- 代码高亮偏好
- 文档生成格式
- 图表工具 (Mermaid/PlantUML)
- 版本控制工具
```

---

## 特有配置

### 已分析的源码项目

| 项目 | 状态 | 文档 |
|-----|------|------|
| Preact | 历史标记：已生成，未复核 | `/note/sourceLearn/preactAnalysis/` |
| React Native | 历史标记：已生成，未复核 | `/note/sourceLearn/react-native-analysis/` |
| Zustand | 历史标记：已生成，未复核 | `/note/sourceLearn/zustandAnalysis/` |
| OpenClaw Agent Skills | 历史标记：已生成，未复核 | `/note/sourceLearn/openclaw-agent-skills/` |

### 分析流程

1. **架构概览** - 整体结构和设计哲学
2. **核心模块** - 关键组件和 API
3. **流程分析** - 数据流和控制流
4. **最佳实践** - 可借鉴的设计模式

---

**📁 原始路径**: `/home/admin/.openclaw/workspace-source-code/`  
**📅 最后同步**: 2026-03-11  
**历史状态**: 当时标记为活跃；当前运行状态未验证
