# 如何部署到 GitHub Pages

将博客部署到 GitHub Pages 非常简单，只需要几个步骤就可以让全世界都能访问你的博客。

## 准备工作

在开始之前，确保你已经：

1. 拥有一个 GitHub 账号
2. 安装了 Git（可选，也可以使用网页上传）

## 部署步骤

### 步骤一：创建 GitHub 仓库

首先，在 GitHub 上创建一个新的仓库。仓库名称可以是：

- `username.github.io` - 这样访问地址就是 `https://username.github.io`
- 其他任意名称 - 访问地址是 `https://username.github.io/仓库名`

### 步骤二：上传文件

#### 方法 A：使用 Git 命令行

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 重命名分支为 main
git branch -M main

# 添加远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 GitHub
git push -u origin main
```

#### 方法 B：使用 GitHub 网页界面

1. 进入你的仓库页面
2. 点击 "Add file" → "Upload files"
3. 将所有文件拖拽上传
4. 点击 "Commit changes"

### 步骤三：启用 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单找到 **Pages**
3. 在 "Source" 下拉菜单中选择 **main** 分支
4. 点击 **Save**

### 步骤四：等待部署完成

GitHub 会自动构建和部署你的网站，通常需要 1-2 分钟。部署完成后，你会看到：

> Your site is live at https://username.github.io/repo-name

## 注意事项

- 确保 `index.html` 在仓库根目录
- 每次更新文件后，GitHub Pages 会自动重新部署
- 首次部署可能需要几分钟生效

## 使用自定义域名

如果你有自己的域名，可以：

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入你的域名（如 `blog.example.com`）
3. 在域名 DNS 设置中添加 CNAME 记录，指向 `username.github.io`

恭喜！现在你的博客已经上线了 🎉
