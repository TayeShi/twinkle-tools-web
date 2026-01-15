---
name: version-iteration
description: 管理多阶段项目版本迭代，使用结构化文档、架构约束和测试驱动验证，确保AI辅助开发准确无误
---

# 版本迭代工作流

## 概述

本技能提供AI辅助开发(vibecoding)项目中版本迭代的结构化方法。确保AI准确理解项目状态，实现改动时不会出现重大偏差。

## 核心原则

1. **一次一个版本** - 绝不同时处理多个VERSION-SPEC
2. **先读后写** - 修改前务必读取VERSIONS.md、VERSION-SPEC和CONTEXT.md
3. **增量验证** - 每完成一个子功能立即运行测试
4. **文档记录** - 标记版本完成前更新CHANGELOG.md

## 第一阶段：版本规划

开始新版本迭代时：

1. **读取VERSIONS.md** 确认当前版本状态
2. **创建VERSION-SPEC-v{N}.md**，包含：
   - 版本号和状态（planned/in_progress/completed）
   - 目标概述（1-2段）
   - 功能清单（关联features.md的具体条目）
   - 改动范围（哪些模块/文件会受影响）
   - 验收标准（可测试的指标）
   - 风险和依赖项
3. **更新VERSIONS.md** 标记新版本为`in_progress`
4. **更新CONTEXT.md** 的"当前版本"和"已知约束"部分

## 第二阶段：实现

1. **建立基准** - 运行现有测试套件
2. **定位受影响模块** - 基于VERSION-SPEC的改动范围
3. **遵循依赖顺序** - 先修改被依赖的模块
4. **增量实现**：
   - 完成一个子功能
   - 运行相关测试
   - 修复问题后再继续
5. **尊重模块边界** - 保持tasks/calendar/notes/memory模块独立

## 第三阶段：验证

1. **运行完整回归测试套件**
2. **验证验收标准** 来自VERSION-SPEC
3. **更新CHANGELOG.md** 记录实际改动
4. **在VERSIONS.md中标记版本完成**

## 文件结构参考

```
/docs
  ├── VERSIONS.md              # 版本地图
  ├── CONTEXT.md               # 项目上下文
  ├── CHANGELOG.md             # 变更日志
  └── specs
      ├── VERSION-SPEC-v1.0.md
      ├── VERSION-SPEC-v1.1.md
      └── VERSION-SPEC-v1.2.md

/tests
  ├── acceptance/              # 验收测试（对应VERSION-SPEC）
  ├── contract/                # 契约测试（OpenAPI验证）
  └── regression/              # 回归测试套件

/api-contracts
  └── openapi.yaml             # API契约
```

## 模块架构

- **tasks** - 任务CRUD和管理
- **calendar** - 日历事件和日程
- **notes** - 笔记管理（Markdown支持）
- **memory** - FSRS间隔重复算法

每个模块包含：
- 独立的数据模型
- 独立的API端点
- 隔离的业务逻辑

## 版本规格模板

```markdown
# VERSION-SPEC-v{N}

## 状态
[in_progress | planned | completed]

## 目标
[版本目标的简要概述]

## 功能清单
- [ ] 功能1（参考：features.md#section）
- [ ] 功能2

## 改动范围
- 模块：tasks
- 文件：src/tasks/*.ts, api/tasks/*.rs
- 数据库：tasks表（新增列X, Y）

## 验收标准
- [ ] 所有功能通过验收测试
- [ ] 现有功能无回归
- [ ] API契约验证通过

## 风险与依赖
- 风险：tasks API可能有不兼容变更
- 依赖：Redis升级以支持新的缓存策略
```

## 上下文模板

```markdown
# 上下文

## 当前版本
v1.1 (进行中)

## 模块架构
[4个模块的快速概览]

## 已实现功能
- [x] 用户认证（v1.0）
- [x] 任务CRUD（v1.0）
- [ ] 日程重复规则（v1.1 - 进行中）

## 已知约束
- JWT过期时间：2小时
- 会话存储：Redis
- API版本：/api/v1/*

## 最近变更
- v1.0完成：MVP功能
- v1.1开始：添加重复规则
```

## 每次迭代检查清单

- [ ] 阅读并理解VERSIONS.md
- [ ] 阅读当前VERSION-SPEC
- [ ] 阅读CONTEXT.md
- [ ] 运行基准测试
- [ ] 遵循模块边界实现改动
- [ ] 增量测试
- [ ] 运行完整回归测试
- [ ] 更新CHANGELOG.md
- [ ] 更新VERSIONS.md状态
- [ ] 如需要更新CONTEXT.md

## 常见陷阱

1. **跳过CONTEXT.md** - AI可能遗漏架构约束
2. **多版本并行** - 上下文混乱导致错误
3. **忽略模块边界** - 导致级联变更和回归问题
4. **不运行测试** - 集成问题晚期才发现
5. **验收标准模糊** - "完成"的定义不明确
