---
title: "OpenCLI：AI Agent 的搜索神器"
date: 2026-06-11
tags: ["tech", "AI", "tool"]
github_url: "https://github.com/dongmu233/blog-issues/issues/3"
---

<!-- from-github-issue -->

# OpenCLI：AI Agent 的搜索神器 —— 当 Hermes 遇上 159 个网站

> 整理：陈夏亮 | 2026-06-11

---

## 痛点：Hermes 搜索的困境

用 Hermes Agent 的都知道，自带的 `web_search` 有几个老问题：

- ❌ 频繁被搜索引擎封 IP
- ❌ 等半天结果抛异常
- ❌ 搜出来的内容质量不稳定
- ❌ 每次搜索都烧 LLM token（浏览器模式）

直到发现了 **OpenCLI**，问题全解决了。

---

## OpenCLI 是什么

> **一句话：把任何网站变成 CLI 命令行工具，复用你 Chrome 已登录的状态。**

- GitHub 14k+ 星
- 支持 **159 个网站/平台**
- Python/Node.js 编写，本地运行
- 专为 AI Agent 设计

### 核心原理

传统方式：AI 分析 DOM → 决定点哪里 → 每次都烧 token

OpenCLI 方式：**AI 只在第一次生成适配器**，之后每次执行是确定性的，零 LLM 调用。

```
传统: 每次搜索 → AI分析页面 → 烧token → 不稳定
OpenCLI: 第一次AI生成适配器 → 之后零token → 确定性执行
```

### 关键特性

| 特性 | 说明 |
|------|------|
| 🔐 复用 Chrome 登录态 | 不用配置 cookie，直接用你已登录的浏览器 |
| 🌐 159+ 站点 | 中英文平台全覆盖 |
| 💰 零 token 消耗 | CLI 适配器是确定性的 |
| 📊 多种输出格式 | json/table/md/csv/yaml |
| 🔧 可扩展 | 支持自定义适配器和插件 |

---

## 支持的平台（精选）

### 📱 社交媒体
小红书、微博、知乎、B站、Twitter/X、Reddit、抖音、即刻、豆瓣、LinkedIn、Facebook、Instagram

### 💰 金融投资
东方财富、雪球、新浪财经、同花顺、币安、Yahoo Finance、CoinGecko、DefiLlama

### 📰 新闻资讯
36氪、今日头条、Hacker News、Reuters、BBC、ProductHunt

### 📚 知识学习
微信读书、豆瓣、arXiv、Google Scholar、百度学术、Wikipedia、知网(CNKI)

### 💼 求职
Boss直聘、LinkedIn、Indeed、51job

### 🔧 开发工具
GitHub、npm、PyPI、StackOverflow、Docker Hub、Maven

### 🛒 电商
淘宝、京东、1688、拼多多、闲鱼、Amazon

### 🎵 其他
Spotify、Steam、12306、携程、大众点评

---

## 实际使用场景

### 1. 替代 web_search（不怕封）

```bash
opencli google search "长江电力分析" --format json
opencli duckduckgo search "量化交易策略" --format json
```

### 2. 抓取微信公众号（直接转 Markdown）

```bash
opencli weixin download --url "https://mp.weixin.qq.com/s/..."
```

### 3. 金融数据（比 API 更稳定）

```bash
opencli eastmoney stock --code "600900" --format json    # 长江电力
opencli xueqiu hot --format json                         # 雪球热帖
opencli binance ticker --symbol "BTCUSDT" --format json  # 币安行情
```

### 4. 社交媒体监控

```bash
opencli weibo hot --format json                          # 微博热搜
opencli zhihu hot --format json                          # 知乎热榜
opencli xiaohongshu search --keyword "基金" --format json # 小红书
```

### 5. 学术搜索

```bash
opencli arxiv search --query "LLM agent" --format json
opencli google-scholar search "量化交易" --format json
```

### 6. 浏览器模式（v1.7.0+）

CLI 适配器不够用时，直接驱动 Chrome：

```bash
opencli browser open "https://example.com"
opencli browser click --selector ".btn"
opencli browser extract --selector ".content"
opencli browser screenshot
```

---

## 安装与配置

### 安装

```bash
npm install -g @jackwener/opencli
```

### 验证

```bash
opencli doctor    # 检查环境
opencli list      # 列出所有命令
```

### Chrome 扩展

从 Chrome Web Store 搜索 "OpenCLI" 安装，或手动下载 `.zip` 加载。

---

## 总结

| 对比 | web_search | OpenCLI |
|------|-----------|---------|
| 被封风险 | 高 | 低（复用 Chrome） |
| Token 消耗 | 每次都烧 | 零消耗 |
| 结果稳定性 | 不稳定 | 确定性 |
| 平台覆盖 | 通用搜索 | 159+ 精准站点 |
| 登录态 | 无 | 复用 Chrome |

**一句话：OpenCLI 是 AI Agent 时代的搜索基础设施。**

---

## 项目信息

- **GitHub**：https://github.com/jackwener/opencli
- **星标**：14k+
- **安装**：`npm install -g @jackwener/opencli`
- **文档**：https://opencli.info
