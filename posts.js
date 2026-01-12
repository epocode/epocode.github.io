/**
 * 文章索引配置文件
 * 
 * 添加新文章步骤：
 * 1. 在 posts 目录下创建新的 .md 文件
 * 2. 在下面的 posts 数组中添加一条记录
 * 
 * 文章格式说明：
 * - id: 唯一标识符（数字）
 * - title: 文章标题
 * - date: 发布日期 (YYYY-MM-DD)
 * - file: Markdown 文件路径（相对于网站根目录）
 * - excerpt: 文章摘要（可选，如果不填会自动提取）
 * - tags: 标签数组
 * - category: 分类名称（默认为"默认"）
 * - author: 作者（可选）
 */

const posts = [
    {
        id: 1,
        title: "欢迎来到我的博客",
        date: "2026-01-12",
        file: "posts/welcome.md",
        excerpt: "这是我的第一篇博客文章，介绍这个博客的创建目的和未来计划。欢迎你的到来！",
        tags: ["博客", "介绍"],
        category: "默认",
        author: "博主"
    },
    {
        id: 2,
        title: "如何部署到 GitHub Pages",
        date: "2026-01-11",
        file: "posts/github-pages-deploy.md",
        excerpt: "详细说明如何将这个静态博客部署到 GitHub Pages，让全世界都能访问你的博客。",
        tags: ["教程", "GitHub", "部署"],
        category: "教程",
        author: "博主"
    },
    {
        id: 3,
        title: "Markdown 写作指南",
        date: "2026-01-10",
        file: "posts/markdown-guide.md",
        excerpt: "Markdown 是一种轻量级标记语言，本文介绍如何使用 Markdown 来撰写博客文章。",
        tags: ["教程", "Markdown", "写作"],
        category: "教程",
        author: "博主"
    }
];

/**
 * 关于页面配置
 * 指定关于页面的 Markdown 文件路径
 */
const aboutPageConfig = {
    file: "about.md"  // 关于页面的 Markdown 文件路径
};
