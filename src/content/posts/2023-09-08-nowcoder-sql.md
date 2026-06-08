---
title: "牛客SQL"
date: 2023-09-08
tags: ["SQL", "数据库"]
description: "牛客网SQL题目练习笔记"
---

## 基础查询

### SELECT语句

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

### 常用函数

| 函数 | 用途 |
|------|------|
| COUNT() | 计数 |
| SUM() | 求和 |
| AVG() | 平均值 |
| MAX() | 最大值 |
| MIN() | 最小值 |

## 进阶查询

### JOIN连接

```sql
-- 内连接
SELECT a.name, b.order_id
FROM users a
INNER JOIN orders b ON a.id = b.user_id;

-- 左连接
SELECT a.name, b.order_id
FROM users a
LEFT JOIN orders b ON a.id = b.user_id;
```

### 子查询

```sql
SELECT name
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
    WHERE amount > 1000
);
```

## 窗口函数

```sql
-- 排名
SELECT name, score,
       RANK() OVER (ORDER BY score DESC) as ranking
FROM students;
```

## 总结

SQL是数据分析师的必备技能，多练习才能熟练掌握。
