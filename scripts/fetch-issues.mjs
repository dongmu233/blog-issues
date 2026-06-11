#!/usr/bin/env node

/**
 * 从 GitHub Issues 拉取文章并生成 Astro 可用的 markdown 文件
 */

import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO = 'dongmu233/blog-issues';
const POSTS_DIR = 'src/content/posts';

// 清理旧的 Issues 文章（保留手动创建的）
const OLD_ISSUES_MARKER = '<!-- from-github-issue -->';

async function fetchIssues() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'blog-issues-bot'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${REPO}/issues?state=open&per_page=100`, { headers });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return await response.json();
}

function issueToMarkdown(issue) {
  const date = new Date(issue.created_at).toISOString().split('T')[0];
  const labels = issue.labels.map(l => l.name);
  
  // 从 body 提取内容
  let content = issue.body || '';
  
  // 添加 frontmatter
  const frontmatter = `---
title: "${issue.title.replace(/"/g, '\\"')}"
date: ${date}
tags: [${labels.map(l => `"${l}"`).join(', ')}]
github_url: "${issue.html_url}"
---

${OLD_ISSUES_MARKER}
${content}
`;
  
  return frontmatter;
}

function sanitizeFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

async function main() {
  console.log('📥 正在从 GitHub Issues 拉取文章...');
  
  // 确保目录存在
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  
  // 删除旧的 Issues 文章
  const existingFiles = fs.readdirSync(POSTS_DIR);
  for (const file of existingFiles) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes(OLD_ISSUES_MARKER)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️  删除旧文章: ${file}`);
    }
  }
  
  // 拉取 Issues
  const issues = await fetchIssues();
  console.log(`📋 找到 ${issues.length} 个 Issues`);
  
  for (const issue of issues) {
    const date = new Date(issue.created_at).toISOString().split('T')[0];
    const slug = sanitizeFilename(issue.title);
    const filename = `${date}-${slug}.md`;
    const filePath = path.join(POSTS_DIR, filename);
    
    const markdown = issueToMarkdown(issue);
    fs.writeFileSync(filePath, markdown);
    console.log(`✅ 生成文章: ${filename}`);
  }
  
  console.log(`\n✨ 完成！共生成 ${issues.length} 篇文章`);
}

main().catch(console.error);
