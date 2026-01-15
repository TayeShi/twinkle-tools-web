# Power Skills - AI 开发技能仓库

## 项目简介

本项目用于保存通用的 AI 开发技能文档，旨在标准化 AI 在不同技术栈下的行为，确保输出的一致性和高质量。每个技能集（Skill）针对特定的技术栈和开发模式提供完整的代码模板、最佳实践和架构指南。

## 项目结构

```
power-skills/
├── README.md              # 项目说明文档
├── SKILLS_STANDARD.md     # Skill标准格式定义
│
├── docs/internal/         # 仓库内部维护文档（仅维护仓库时参考）
│   └── agent/             # 详细的开发文档
│       ├── development_commands.md
│       ├── architecture.md
│       ├── testing.md
│       └── conventions.md
│
├── axum_backend/          # AUXM 后端开发技能
│   ├── SKILL.md           # 技能概述和索引
│   ├── project_structure.md
│   ├── handlers.md
│   ├── services.md
│   ├── repositories.md
│   ├── error_handling.md
│   ├── middleware.md
│   ├── database.md
│   ├── authentication.md
│   ├── openapi.md
│   ├── docker.md
│   ├── app_state.md
│   ├── validation.md
│   ├── development.md
│   └── dependencies.md
│
└── nextjs_frontend/       # Next.js 前端开发技能
    ├── SKILL.md           # 技能概述和索引
    ├── project_structure.md
    ├── pages_and_layouts.md
    ├── components.md
    ├── data_fetching.md
    ├── state_management.md
    ├── api_client.md
    ├── forms.md
    ├── routing.md
    ├── styling.md
    ├── hooks.md
    ├── error_handling.md
    ├── optimization.md
    ├── development.md
    └── dependencies.md
```

## Skill 目录结构规范

每个 Skill 必须包含：

- `SKILL.md` - 技能概述文件，包含适用范围、何时使用、技术栈和文件索引
- 核心功能文档 - 每个文档聚焦一个主题，包含代码模板和最佳实践

## 使用说明

### 在其他项目中使用

当其他项目需要引用此仓库的技能时：

1. 确定项目所需的技术栈
2. 指定完整的skill路径，例如：
   - `power-skills/axum_backend/SKILL.md`
   - `power-skills/nextjs_frontend/SKILL.md`
3. AI代理会阅读对应技能的 `SKILL.md` 了解适用范围
4. 根据任务需要参考具体的子文档

### 维护此仓库

修改或添加新技能时，参考：
- `SKILLS_STANDARD.md` - 创建新技能的标准格式
- `docs/internal/agent/` - 详细的开发文档（架构、测试、命令、约定）

### 添加新 Skill

1. 在根目录创建新的文件夹
2. 创建 `SKILL.md` 遵循 `SKILLS_STANDARD.md` 定义的格式
3. 根据需要添加子文档，每个文档聚焦单一主题
4. 更新本 `README.md` 的项目结构部分

## 维护

- 定期更新和优化技能内容
- 根据实际开发反馈调整规范
- 保持规范与实际项目需求的一致性
- 所有变更使用清晰的提交信息

## 技能列表

### axum_backend
基于 Rust + Axum + PostgreSQL 的 RESTful API 后端开发技能

### nextjs_frontend
基于 Next.js 16+ (App Router) + React 19+ + TypeScript 的前端开发技能
