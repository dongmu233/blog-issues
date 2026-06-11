---
title: "Hermes 技能库实战：research-paper-writing、女娲、达尔文"
date: 2026-06-11
tags: ["tech", "AI", "agent", "skill"]
github_url: "https://github.com/dongmu233/blog-issues/issues/4"
---

<!-- from-github-issue -->

# Hermes 技能库实战：research-paper-writing、女娲、达尔文

> 整理：陈夏亮 | 2026-06-11

---

## 一、research-paper-writing：ML论文全流程

### 是什么

Hermes 内置的学术论文写作流水线，覆盖从实验设计到投稿的完整生命周期。

**支持会议**：NeurIPS、ICML、ICLR、ACL、AAAI、COLM

### 核心能力

| 阶段 | 能力 |
|------|------|
| 实验设计 | 假设生成、baseline选择、统计功效分析 |
| 实验执行 | 代码生成、超参搜索、GPU监控 |
| 结果分析 | 统计检验、效应量、图表生成 |
| 论文写作 | LaTeX生成、引用管理、摘要润色 |
| 审稿模拟 | 模拟审稿人反馈、找出薄弱环节 |
| 投稿准备 | 格式检查、补充材料打包 |

### 实际使用场景

**场景1：写一篇关于量化交易策略的论文**

```
帮我用 research-paper-writing 写一篇论文：
主题：基于12金K形态的加密货币量化交易策略
数据：BTC/ETH 6年回测数据
目标会议：（选一个合适的）
```

**场景2：把回测结果变成学术论文**

```
我有以下回测结果：
- v20均衡版：BTC +23.3%, ETH +72.4%, 回撤18%
- 5x杠杆：BTC +665.7%, ETH +17589.8%
用 research-paper-writing 帮我写成论文格式
```

**场景3：模拟审稿**

```
我写了一篇关于12金K形态识别的论文草稿，
用 research-paper-writing 模拟审稿人给我反馈
```

### 实用技巧

1. **先跑实验再写** — 这个skill最适合有数据、有结果的情况
2. **用subagent并行** — 实验执行和论文写作可以分给不同子agent
3. **统计分析是核心** — 它会自动做t-test、效应量、置信区间
4. **引用管理** — 自动从Semantic Scholar和arXiv拉取相关论文

---

## 二、女娲（nuwa-skill）：思维蒸馏术

### 是什么

把任何人的思维方式蒸馏成一个可运行的AI Skill。

**核心理念**：不是复制人，是提炼思维框架。

### 蒸馏五层

| 层次 | 提取内容 |
|------|----------|
| 怎么说话 | 表达DNA——语气、节奏、用词偏好 |
| 怎么想 | 心智模型、认知框架 |
| 怎么判断 | 决策启发式 |
| 什么不做 | 反模式、价值观底线 |
| 知道局限 | 诚实边界 |

### 使用方式

**明确人名（直接路径）：**

```
蒸馏一个保罗·格雷厄姆
造一个张小龙的视角Skill
帮我做一个段永平的Skill
```

**模糊需求（诊断路径）：**

```
我想提升决策质量
有没有一种思维方式能帮我看透商业本质
```

### 已蒸馏人物（官方提供）

| 人物 | 领域 | 安装命令 |
|------|------|----------|
| Paul Graham | 创业/写作/产品 | `npx skills add alchaincyf/paul-graham-skill` |
| 张一鸣 | 产品/组织/全球化 | `npx skills add alchaincyf/zhang-yiming-skill` |
| Karpathy | AI/工程/教育 | `npx skills add alchaincyf/karpathy-skill` |
| 芒格 | 投资/多元思维 | `npx skills add alchaincyf/munger-skill` |
| 费曼 | 物理/教学/科学思维 | `npx skills add alchaincyf/feynman-skill` |
| 特朗普 | 谈判/权力/传播 | `npx skills add alchaincyf/trump-skill` |
| 乔布斯 | 产品/设计/商业 | `npx skills add alchaincyf/steve-jobs-skill` |
| 马斯克 | 工程/第一性原理 | `npx skills add alchaincyf/elon-musk-skill` |

### 实际使用场景

**场景1：用芒格视角分析投资**

```
用芒格的视角帮我分析长江电力的投资决策
```

芒格Skill会用他的心智模型：
- 多元思维模型（跨学科）
- 逆向思考（先想怎么亏钱）
- 安全边际
- 能力圈

**场景2：用费曼解释复杂概念**

```
费曼会怎么解释量化交易中的"盈亏比"？
```

费曼Skill会：
- 用日常类比
- 从具体例子出发
- 避免术语
- 追问到本质

**场景3：造一个自定义人物Skill**

```
帮我蒸馏一个"招行客户经理"的Skill，
提取优秀客户经理的思维方式和服务理念
```

---

## 三、达尔文（darwin-skill）：Skill自动优化器

### 是什么

对SKILL.md进行自动评估和优化的工具。基于Microsoft Research的SkillLens论文，用9维度评分+爬山算法+独立评审。

### 核心流程

```
评估 → 改进 → 实测验证 → 人类确认 → 保留或回滚 → 生成成果卡片
```

### 9维度评分（总分100）

**结构维度（59分）— 静态分析**

| 维度 | 权重 | 评分标准 |
|------|------|----------|
| Frontmatter质量 | 7 | name规范、description包含触发词 |
| 工作流清晰度 | 12 | 步骤明确、有输入/输出 |
| 失败模式编码 | 12 | 显式写出失败分支 |
| 检查点设计 | 6 | 关键决策前有用户确认 |
| 可执行具体性 | 17 | 禁止"建议/可以考虑"等软化措辞 |
| 资源整合度 | 4 | 引用正确、路径可达 |

**效果维度（35分）— 需要实测**

| 维度 | 权重 | 评分标准 |
|------|------|----------|
| 整体架构 | 12 | 层次清晰、不冗余 |
| 实测表现 | 23 | 用测试prompt跑，看输出质量 |

**元技能维度（6分）**

| 维度 | 权重 | 评分标准 |
|------|------|----------|
| 反例与黑名单 | 6 | 明确写出"不要做什么" |

### 使用方式

**优化单个Skill：**

```
帮我优化这个skill：opencli
用达尔文跑一遍评分
```

**批量优化：**

```
帮我用达尔文检查 ~/.hermes/skills/ 下的所有skill
```

**评分检查：**

```
这个skill质量怎么样？用达尔文的9维度评一下
```

---

## 四、三件套组合使用

这三个skill可以组合成一个完整的技能管理闭环：

```
女娲（造） → 达尔文（优化） → research-paper-writing（产出）
```

### 完整工作流示例

**目标**：造一个"量化交易大师"的Skill，优化到高质量，然后写成论文

```bash
# Step 1: 用女娲蒸馏
"帮我蒸馏一个量化交易大师的Skill，
基于12金K课程体系+6年回测数据"

# Step 2: 用达尔文优化
"用达尔文优化这个skill，目标90分以上"

# Step 3: 用research-paper-writing写论文
"把这个量化交易策略写成学术论文，
包含回测数据、统计检验、对比实验"
```

---

## 五、安装总结

| Skill | 状态 | 安装路径 |
|-------|------|----------|
| research-paper-writing | ✅ 已有（内置） | `~/.hermes/skills/research/research-paper-writing/` |
| 女娲（nuwa-skill） | ✅ 已安装 | `~/.hermes/skills/creative/nuwa-skill/` |
| 达尔文（darwin-skill） | ✅ 已安装 | `~/.hermes/skills/creative/darwin-skill/` |

---

## 六、个人使用心得

### 女娲最打动我的点

**"怎么想"比"怎么说"重要得多。**

女娲提取的是认知操作系统，不是名人语录。它不是在复读芒格说过的话，而是在用芒格的认知框架帮你分析。

### 达尔文最实用的点

**独立评审避免自我欺骗。**

自己改自己的skill，很容易觉得"改得不错"。达尔文用子agent独立评分，更客观。

### research-paper-writing最省心的点

**统计分析自动做。**

不用自己算t-test、效应量、置信区间，skill会自动处理，还能生成SciencePlots风格的图表。

---

*本文整理自Hermes Agent官方文档和GitHub仓库。*
*research-paper-writing: NousResearch/hermes-agent (bundled)*
*女娲: github.com/alchaincyf/nuwa-skill*
*达尔文: github.com/alchaincyf/darwin-skill*
