# 个人博客

一个简洁、现代的个人博客网站，使用纯 HTML、CSS 和 JavaScript 构建，支持 Markdown 文章，可以轻松部署到 GitHub Pages。

## ✨ 特性

- 📝 **Markdown 支持** - 只需编写 md 文件即可发布文章
- 🌓 **深色/浅色主题** - 自动保存主题偏好
- 📱 **响应式设计** - 完美支持移动端和桌面端
- 🔍 **搜索功能** - 快速搜索文章标题和内容
- 📂 **分类系统** - 文章分类管理，支持查看分类下的所有文章
- 🏷️ **标签系统** - 通过标签筛选文章
- 📁 **文章归档** - 按年份归档所有文章
- 🚀 **快速部署** - 无需构建步骤，直接部署

## 📁 文件结构

```
personal-blog/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript 功能
├── posts.js            # 文章索引配置
├── about.md            # 关于页面内容（Markdown）
├── posts/              # Markdown 文章目录
│   ├── welcome.md
│   ├── github-pages-deploy.md
│   └── markdown-guide.md
├── .gitignore
└── README.md
```

## 📝 如何添加新文章

### 步骤 1：创建 Markdown 文件

在 `posts` 目录下创建一个新的 `.md` 文件，例如 `my-new-post.md`：

```markdown
# 文章标题

这是文章内容...

## 二级标题

- 列表项 1
- 列表项 2

> 引用文字

\`\`\`javascript
// 代码块
console.log('Hello!');
\`\`\`
```

### 步骤 2：添加索引

编辑 `posts.js` 文件，在 `posts` 数组中添加新文章的信息：

```javascript
{
    id: 4,                              // 唯一 ID（递增）
    title: "文章标题",                   // 标题
    date: "2026-01-15",                 // 日期 (YYYY-MM-DD)
    file: "posts/my-new-post.md",       // Markdown 文件路径
    excerpt: "这是文章的摘要...",        // 摘要（显示在列表中）
    tags: ["标签1", "标签2"],            // 标签数组
    category: "教程",                    // 分类名称（可选，默认为"默认"）
    author: "作者名"                     // 作者（可选）
}
```

就这么简单！刷新页面就能看到新文章了。

## 📂 分类功能

博客支持文章分类管理，现在可以通过前端界面轻松管理分类，无需修改代码！

### 使用分类管理界面

1. **进入管理页面**：点击导航栏的"管理"按钮
2. **创建新分类**：
   - 在"创建新分类"输入框中输入分类名称
   - 点击"创建分类"按钮
3. **分配文章到分类**：
   - 在"文章分类分配"区域，为每篇文章选择对应的分类
   - 使用下拉菜单选择分类，更改会立即生效
4. **删除分类**：点击分类旁边的"删除"按钮（默认分类不能删除）

### 数据管理

- **导出配置**：点击"导出分类配置"按钮，将分类数据导出为 JSON 文件，方便备份
- **导入配置**：点击"导入分类配置"按钮，从之前导出的 JSON 文件恢复分类数据
- **清空数据**：点击"清空所有分类"按钮，删除所有分类数据（谨慎操作）

### 数据存储

分类数据存储在浏览器的 localStorage 中，这意味着：
- ✅ 数据会保存在本地浏览器
- ✅ 更换浏览器或清除浏览器数据会丢失分类信息
- ⚠️ 建议定期导出配置进行备份

### 查看分类

- 点击导航栏的"分类"查看所有分类
- 点击侧边栏的分类列表快速查看某个分类下的文章
- 在文章卡片中点击分类名称也可以查看该分类的所有文章

分类会自动统计每个分类下的文章数量，并按文章数量排序显示。

## 👋 编辑关于页面

关于页面也使用 Markdown 文件管理，只需编辑根目录下的 `about.md` 文件即可。

编辑 `about.md` 文件，使用 Markdown 语法编写你的个人介绍：

```markdown
# 关于我

你好！欢迎来到我的个人博客。

## 个人简介

我是一名热爱技术和写作的开发者...

## 联系方式

- **GitHub**: [github.com/yourusername](https://github.com)
- **Email**: [your.email@example.com](mailto:your.email@example.com)
```

保存后刷新页面即可看到更新。如果你想要更改关于页面的 Markdown 文件路径，可以编辑 `posts.js` 中的 `aboutPageConfig.file` 配置。

## 🚀 部署到 GitHub Pages

### 方法一：使用 GitHub 网页界面

1. 在 GitHub 上创建一个新仓库
2. 将所有文件上传到仓库
3. 进入仓库 **Settings** → **Pages**
4. 在 **Source** 中选择 **main** 分支
5. 点击 **Save**
6. 等待 1-2 分钟，通过 `https://用户名.github.io/仓库名` 访问

### 方法二：使用 Git 命令行

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/用户名/仓库名.git
git push -u origin main
```

然后在 GitHub 仓库设置中启用 Pages。

## ⚙️ 自定义配置

### 修改站点信息

编辑 `index.html`：
- 修改 `<title>` 标签中的网站标题
- 修改导航栏中的博客名称
- 修改侧边栏中的个人信息
- 修改页脚信息

### 修改样式

编辑 `styles.css` 中的 CSS 变量来自定义主题：

```css
:root {
    --primary: #e07020;        /* 主色调 */
    --accent: #4a9f4a;         /* 强调色 */
    --bg: #f5f0e8;             /* 背景色 */
    --card-bg: #ffffff;        /* 卡片背景 */
    /* ... 其他变量 */
}
```

## 🖥️ 本地预览

由于浏览器安全限制，直接打开 HTML 文件可能无法加载 Markdown。推荐使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve

# 使用 VS Code
# 安装 "Live Server" 扩展，右键点击 index.html 选择 "Open with Live Server"
```

然后访问 `http://localhost:8000`

## 📄 许可证

MIT License - 你可以自由使用、修改和分发这个项目。

---

祝你使用愉快！🎉 如有问题欢迎提 Issue。
