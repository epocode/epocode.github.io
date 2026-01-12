// ========== 主题切换 ==========
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ========== 导航功能 ==========
const navLinks = document.querySelectorAll('.site-nav .nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        showPage(pageName);
    });
});

function showPage(pageName) {
    // 更新导航状态
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector(`[data-page="${pageName}"]`)?.classList.add('active');
    
    // 显示对应页面
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageName)?.classList.add('active');
    
    // 特殊处理
    if (pageName === 'home') {
        renderPostsList();
    } else if (pageName === 'categories') {
        renderCategories();
    } else if (pageName === 'archives') {
        renderArchives();
    } else if (pageName === 'about') {
        loadAboutPage();
    } else if (pageName === 'manage') {
        renderManagePage();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
    showPage('home');
}

// ========== 文章列表渲染 ==========
function renderPostsList(filterTag = null, searchTerm = null) {
    const container = document.getElementById('postsList');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<div class="loading">暂无文章</div>';
        return;
    }
    
    // 按日期排序（最新在前）
    let sortedPosts = [...posts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    // 标签筛选
    if (filterTag) {
        sortedPosts = sortedPosts.filter(p => p.tags.includes(filterTag));
    }
    
    // 搜索筛选
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        sortedPosts = sortedPosts.filter(p => 
            p.title.toLowerCase().includes(term) ||
            p.excerpt.toLowerCase().includes(term) ||
            p.tags.some(t => t.toLowerCase().includes(term))
        );
    }
    
    if (sortedPosts.length === 0) {
        container.innerHTML = '<div class="loading">没有找到匹配的文章</div>';
        return;
    }
    
    container.innerHTML = sortedPosts.map(post => {
        const date = new Date(post.date);
        const day = date.getDate();
        const month = date.toLocaleDateString('zh-CN', { month: 'short' });
        const fullDate = formatDate(post.date);
        
        return `
            <article class="post-card" onclick="showArticle(${post.id})">
                <div class="post-header">
                    <div class="post-date-box">
                        <span class="post-date-day">${day}</span>
                        <span class="post-date-month">${month}</span>
                    </div>
                    <div class="post-title-area">
                        <h2 class="post-title">
                            <a href="javascript:void(0)">${post.title}</a>
                        </h2>
                        <div class="post-meta">
                            <span>📅 ${fullDate}</span>
                            ${post.author ? `<span>✍️ ${post.author}</span>` : ''}
                            <span>📂 <a href="javascript:void(0)" onclick="event.stopPropagation(); showCategoryPosts('${getPostCategory(post.id)}')">${getPostCategory(post.id)}</a></span>
                        </div>
                    </div>
                </div>
                <div class="post-excerpt">
                    <p>${post.excerpt}</p>
                </div>
                <div class="post-footer">
                    <div class="post-tags">
                        ${post.tags.map(tag => `
                            <span class="tag" onclick="event.stopPropagation(); filterByTag('${tag}')">${tag}</span>
                        `).join('')}
                    </div>
                    <a href="javascript:void(0)" class="read-more">
                        阅读全文 →
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// ========== 文章详情 ==========
async function showArticle(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) {
        console.error('Article not found');
        return;
    }
    
    const container = document.getElementById('articleContent');
    container.innerHTML = '<div class="loading">加载中...</div>';
    
    // 切换到文章页面
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('article').classList.add('active');
    navLinks.forEach(l => l.classList.remove('active'));
    
    try {
        // 加载 Markdown 文件
        const response = await fetch(post.file);
        if (!response.ok) {
            throw new Error('Failed to load article');
        }
        const markdown = await response.text();
        
        // 解析 Markdown
        const htmlContent = marked.parse(markdown);
        
        container.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${post.title}</h1>
                <div class="article-meta">
                    <span>📅 ${formatDate(post.date)}</span>
                    ${post.author ? `<span>✍️ ${post.author}</span>` : ''}
                    <span>🏷️ ${post.tags.join(', ')}</span>
                </div>
            </div>
            <div class="article-body">
                ${htmlContent}
            </div>
        `;
    } catch (error) {
        console.error('Error loading article:', error);
        container.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${post.title}</h1>
            </div>
            <div class="article-body">
                <p style="color: var(--text-muted);">
                    文章加载失败。请确保 Markdown 文件存在于正确的路径。
                </p>
                <p><strong>预期路径：</strong> ${post.file}</p>
            </div>
        `;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== 分类页面 ==========
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<div class="loading">暂无文章</div>';
        return;
    }
    
    // 收集所有分类及其文章数量（使用新的分类数据源）
    const categories = {};
    const categoryList = getCategories();
    const postCategories = getPostCategories();
    
    // 初始化所有分类
    categoryList.forEach(cat => {
        categories[cat] = {
            name: cat,
            count: 0,
            posts: []
        };
    });
    
    // 分配文章到分类
    posts.forEach(post => {
        const category = getPostCategory(post.id);
        if (!categories[category]) {
            categories[category] = {
                name: category,
                count: 0,
                posts: []
            };
        }
        categories[category].count++;
        categories[category].posts.push(post);
    });
    
    // 按文章数量排序
    const sortedCategories = Object.values(categories).sort((a, b) => b.count - a.count);
    
    if (sortedCategories.length === 0) {
        container.innerHTML = '<div class="loading">暂无分类</div>';
        return;
    }
    
    let html = '<div class="categories-grid">';
    sortedCategories.forEach(cat => {
        // 按日期排序该分类下的文章
        const sortedPosts = cat.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        html += `
            <div class="category-card">
                <div class="category-header">
                    <h2 class="category-name">${cat.name}</h2>
                    <span class="category-count">${cat.count} 篇文章</span>
                </div>
                <div class="category-posts-preview">
                    ${sortedPosts.slice(0, 5).map(post => `
                        <div class="category-post-item">
                            <span class="category-post-date">${formatDate(post.date)}</span>
                            <a href="javascript:void(0)" class="category-post-title" onclick="showArticle(${post.id})">${post.title}</a>
                        </div>
                    `).join('')}
                    ${sortedPosts.length > 5 ? `<div class="category-more"><a href="javascript:void(0)" onclick="showCategoryPosts('${cat.name}')">查看全部 ${sortedPosts.length} 篇 →</a></div>` : ''}
                </div>
                <div class="category-footer">
                    <a href="javascript:void(0)" class="category-view-all" onclick="showCategoryPosts('${cat.name}')">
                        查看该分类所有文章 →
                    </a>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

function showCategoryPosts(categoryName) {
    const container = document.getElementById('categoryPostsList');
    const titleElement = document.getElementById('categoryTitle');
    
    // 更新标题
    titleElement.textContent = `📂 ${categoryName}`;
    
    // 筛选该分类下的文章（使用新的分类数据源）
    const categoryPosts = posts
        .filter(p => getPostCategory(p.id) === categoryName)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (categoryPosts.length === 0) {
        container.innerHTML = '<div class="loading">该分类下暂无文章</div>';
    } else {
        // 使用与首页相同的文章卡片样式
        container.innerHTML = categoryPosts.map(post => {
            const date = new Date(post.date);
            const day = date.getDate();
            const month = date.toLocaleDateString('zh-CN', { month: 'short' });
            const fullDate = formatDate(post.date);
            
            return `
                <article class="post-card" onclick="showArticle(${post.id})">
                    <div class="post-header">
                        <div class="post-date-box">
                            <span class="post-date-day">${day}</span>
                            <span class="post-date-month">${month}</span>
                        </div>
                        <div class="post-title-area">
                            <h2 class="post-title">
                                <a href="javascript:void(0)">${post.title}</a>
                            </h2>
                            <div class="post-meta">
                                <span>📅 ${fullDate}</span>
                                ${post.author ? `<span>✍️ ${post.author}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="post-excerpt">
                        <p>${post.excerpt}</p>
                    </div>
                    <div class="post-footer">
                        <div class="post-tags">
                            ${post.tags.map(tag => `
                                <span class="tag" onclick="event.stopPropagation(); filterByTag('${tag}')">${tag}</span>
                            `).join('')}
                        </div>
                        <a href="javascript:void(0)" class="read-more">
                            阅读全文 →
                        </a>
                    </div>
                </article>
            `;
        }).join('');
    }
    
    // 切换到分类文章列表页面
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('category-posts').classList.add('active');
    navLinks.forEach(l => l.classList.remove('active'));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== 归档页面 ==========
function renderArchives() {
    const container = document.getElementById('archivesList');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p>暂无文章</p>';
        return;
    }
    
    // 按年份分组
    const sortedPosts = [...posts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    const grouped = {};
    sortedPosts.forEach(post => {
        const year = new Date(post.date).getFullYear();
        if (!grouped[year]) {
            grouped[year] = [];
        }
        grouped[year].push(post);
    });
    
    let html = '';
    Object.keys(grouped).sort((a, b) => b - a).forEach(year => {
        html += `<h2 class="archive-year">${year}年</h2>`;
        grouped[year].forEach(post => {
            const date = new Date(post.date);
            const monthDay = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            html += `
                <div class="archive-item">
                    <span class="archive-date">${monthDay}</span>
                    <a href="javascript:void(0)" class="archive-title" onclick="showArticle(${post.id})">${post.title}</a>
                </div>
            `;
        });
    });
    
    container.innerHTML = html;
}

// ========== 关于页面 ==========
async function loadAboutPage() {
    const container = document.getElementById('aboutContent');
    
    if (!aboutPageConfig || !aboutPageConfig.file) {
        container.innerHTML = '<div class="about-page"><p>关于页面配置未找到。</p></div>';
        return;
    }
    
    container.innerHTML = '<div class="loading">加载中...</div>';
    
    try {
        // 加载 Markdown 文件
        const response = await fetch(aboutPageConfig.file);
        if (!response.ok) {
            throw new Error('Failed to load about page');
        }
        const markdown = await response.text();
        
        // 解析 Markdown
        const htmlContent = marked.parse(markdown);
        
        container.innerHTML = `
            <div class="about-page">
                ${htmlContent}
            </div>
        `;
    } catch (error) {
        console.error('Error loading about page:', error);
        container.innerHTML = `
            <div class="about-page">
                <h1 class="page-title">👋 关于我</h1>
                <p style="color: var(--text-muted);">
                    关于页面加载失败。请确保 Markdown 文件存在于正确的路径。
                </p>
                <p><strong>预期路径：</strong> ${aboutPageConfig.file}</p>
            </div>
        `;
    }
}

// ========== 侧边栏功能 ==========
function renderSidebar() {
    // 统计
    document.getElementById('postCount').textContent = posts.length;
    
    // 收集所有分类（使用新的分类数据源）
    const categories = {};
    const categoryList = getCategories();
    
    // 初始化所有分类
    categoryList.forEach(cat => {
        categories[cat] = 0;
    });
    
    // 统计每个分类下的文章数
    posts.forEach(post => {
        const category = getPostCategory(post.id);
        categories[category] = (categories[category] || 0) + 1;
    });
    
    document.getElementById('categoryCount').textContent = Object.keys(categories).length;
    
    // 渲染分类列表
    const sidebarCategories = document.getElementById('sidebarCategories');
    sidebarCategories.innerHTML = Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .map(([category, count]) => `
            <a href="javascript:void(0)" class="category-link" onclick="showCategoryPosts('${category}')">
                <span class="category-link-name">${category}</span>
                <span class="category-link-count">${count}</span>
            </a>
        `).join('');
    
    // 收集所有标签
    const allTags = {};
    posts.forEach(post => {
        post.tags.forEach(tag => {
            allTags[tag] = (allTags[tag] || 0) + 1;
        });
    });
    
    document.getElementById('tagCount').textContent = Object.keys(allTags).length;
    
    // 渲染标签云
    const tagsCloud = document.getElementById('tagsCloud');
    tagsCloud.innerHTML = Object.entries(allTags)
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => `
            <span class="tag" onclick="filterByTag('${tag}')">${tag} (${count})</span>
        `).join('');
}

function filterByTag(tag) {
    showPage('home');
    renderPostsList(tag);
    // 更新标题显示筛选状态
    const container = document.getElementById('postsList');
    const filterInfo = document.createElement('div');
    filterInfo.innerHTML = `
        <div style="margin-bottom: 1rem; padding: 0.5rem 1rem; background: var(--bg-alt); border-radius: var(--radius);">
            标签筛选：<strong>${tag}</strong>
            <a href="javascript:void(0)" onclick="clearFilter()" style="margin-left: 1rem;">清除筛选</a>
        </div>
    `;
    container.insertBefore(filterInfo, container.firstChild);
}

function clearFilter() {
    renderPostsList();
}

// ========== 搜索功能 ==========
const searchInput = document.getElementById('searchInput');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const term = e.target.value.trim();
        if (term) {
            showPage('home');
            renderPostsList(null, term);
            // 添加搜索提示
            const container = document.getElementById('postsList');
            const searchInfo = document.createElement('div');
            searchInfo.innerHTML = `
                <div style="margin-bottom: 1rem; padding: 0.5rem 1rem; background: var(--bg-alt); border-radius: var(--radius);">
                    搜索：<strong>${term}</strong>
                    <a href="javascript:void(0)" onclick="clearSearch()" style="margin-left: 1rem;">清除搜索</a>
                </div>
            `;
            container.insertBefore(searchInfo, container.firstChild);
        } else {
            renderPostsList();
        }
    }, 300);
});

function clearSearch() {
    searchInput.value = '';
    renderPostsList();
}

// ========== 分类数据管理 ==========
const CATEGORIES_STORAGE_KEY = 'blog_categories';
const POST_CATEGORIES_STORAGE_KEY = 'blog_post_categories';

// 获取分类数据（从 localStorage 或 posts.js）
function getCategories() {
    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing categories:', e);
        }
    }
    // 如果没有存储，从 posts.js 中提取
    const categories = new Set();
    posts.forEach(post => {
        categories.add(post.category || '默认');
    });
    return Array.from(categories);
}

// 保存分类数据
function saveCategories(categories) {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
}

// 获取文章分类映射（从 localStorage）
function getPostCategories() {
    const stored = localStorage.getItem(POST_CATEGORIES_STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing post categories:', e);
        }
    }
    return {};
}

// 保存文章分类映射
function savePostCategories(postCategories) {
    localStorage.setItem(POST_CATEGORIES_STORAGE_KEY, JSON.stringify(postCategories));
}

// 获取文章的分类（优先使用 localStorage）
function getPostCategory(postId) {
    const postCategories = getPostCategories();
    if (postCategories[postId]) {
        return postCategories[postId];
    }
    // 回退到 posts.js 中的 category
    const post = posts.find(p => p.id === postId);
    return post?.category || '默认';
}

// 设置文章分类
function setPostCategory(postId, category) {
    const postCategories = getPostCategories();
    postCategories[postId] = category;
    savePostCategories(postCategories);
    // 刷新相关页面
    if (document.getElementById('manage').classList.contains('active')) {
        renderManagePage();
    }
    renderPostsList();
    renderSidebar();
    renderCategories();
}

// ========== 管理页面 ==========
function renderManagePage() {
    const categories = getCategories();
    const postCategories = getPostCategories();
    
    // 渲染分类列表
    const categoriesList = document.getElementById('manageCategoriesList');
    if (categories.length === 0) {
        categoriesList.innerHTML = '<p style="color: var(--text-muted);">暂无分类</p>';
    } else {
        categoriesList.innerHTML = categories.map(cat => {
            const count = Object.values(postCategories).filter(c => c === cat).length;
            return `
                <div class="manage-category-item">
                    <span class="category-name-display">${cat}</span>
                    <span class="category-count-display">${count} 篇文章</span>
                    ${cat !== '默认' ? `<button class="btn btn-small btn-danger" onclick="deleteCategory('${cat}')">删除</button>` : ''}
                </div>
            `;
        }).join('');
    }
    
    // 渲染文章分类分配
    const postsAssign = document.getElementById('postsCategoryAssign');
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    postsAssign.innerHTML = sortedPosts.map(post => {
        const currentCategory = getPostCategory(post.id);
        return `
            <div class="post-category-item">
                <div class="post-category-info">
                    <span class="post-title-display">${post.title}</span>
                    <span class="post-date-display">${formatDate(post.date)}</span>
                </div>
                <select class="category-select" onchange="setPostCategory(${post.id}, this.value)">
                    ${categories.map(cat => `
                        <option value="${cat}" ${currentCategory === cat ? 'selected' : ''}>${cat}</option>
                    `).join('')}
                </select>
            </div>
        `;
    }).join('');
}

function createCategory() {
    const input = document.getElementById('newCategoryName');
    const categoryName = input.value.trim();
    
    if (!categoryName) {
        alert('请输入分类名称');
        return;
    }
    
    const categories = getCategories();
    if (categories.includes(categoryName)) {
        alert('该分类已存在');
        return;
    }
    
    categories.push(categoryName);
    saveCategories(categories);
    input.value = '';
    
    renderManagePage();
    renderSidebar();
    renderCategories();
    
    alert(`分类 "${categoryName}" 创建成功！`);
}

function deleteCategory(categoryName) {
    if (categoryName === '默认') {
        alert('不能删除默认分类');
        return;
    }
    
    if (!confirm(`确定要删除分类 "${categoryName}" 吗？该分类下的文章将自动归入"默认"分类。`)) {
        return;
    }
    
    const categories = getCategories();
    const index = categories.indexOf(categoryName);
    if (index > -1) {
        categories.splice(index, 1);
        saveCategories(categories);
    }
    
    // 将该分类下的文章移到默认分类
    const postCategories = getPostCategories();
    Object.keys(postCategories).forEach(postId => {
        if (postCategories[postId] === categoryName) {
            postCategories[postId] = '默认';
        }
    });
    savePostCategories(postCategories);
    
    renderManagePage();
    renderSidebar();
    renderCategories();
    
    alert('分类已删除');
}

function exportCategories() {
    const categories = getCategories();
    const postCategories = getPostCategories();
    const data = {
        categories,
        postCategories,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-categories-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('分类配置已导出');
}

function importCategories() {
    document.getElementById('importFile').click();
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.categories) {
                saveCategories(data.categories);
            }
            if (data.postCategories) {
                savePostCategories(data.postCategories);
            }
            renderManagePage();
            renderSidebar();
            renderCategories();
            renderPostsList();
            alert('分类配置已导入');
        } catch (error) {
            alert('导入失败：' + error.message);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // 重置文件输入
}

function clearCategories() {
    if (!confirm('确定要清空所有分类数据吗？此操作不可恢复！')) {
        return;
    }
    
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
    localStorage.removeItem(POST_CATEGORIES_STORAGE_KEY);
    
    renderManagePage();
    renderSidebar();
    renderCategories();
    renderPostsList();
    
    alert('所有分类数据已清空');
}

// ========== 工具函数 ==========
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, '0')}月${date.getDate().toString().padStart(2, '0')}日`;
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    renderPostsList();
    renderSidebar();
    
    // 处理 URL hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('post-')) {
            const postId = parseInt(hash.replace('post-', ''));
            showArticle(postId);
        } else if (['home', 'categories', 'archives', 'about', 'manage'].includes(hash)) {
            showPage(hash);
        } else if (hash.startsWith('category-')) {
            const categoryName = decodeURIComponent(hash.replace('category-', ''));
            showCategoryPosts(categoryName);
        }
    }
    
    // 初始化默认分类（如果不存在）
    const categories = getCategories();
    if (categories.length === 0 || !categories.includes('默认')) {
        categories.push('默认');
        saveCategories(categories);
    }
});

// 全局函数
window.showArticle = showArticle;
window.showHome = showHome;
window.showPage = showPage;
window.showCategoryPosts = showCategoryPosts;
window.filterByTag = filterByTag;
window.clearFilter = clearFilter;
window.clearSearch = clearSearch;
window.createCategory = createCategory;
window.deleteCategory = deleteCategory;
window.setPostCategory = setPostCategory;
window.exportCategories = exportCategories;
window.importCategories = importCategories;
window.handleImportFile = handleImportFile;
window.clearCategories = clearCategories;
