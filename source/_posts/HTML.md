---
title: HTML学习笔记
tags:
  - HTML
  - 学习笔记
categories:
  - 前端
abbrlink: 15279
date: 2025-07-15 16:30:00
---
#   网页

W3C（万维网联盟）制定的网页标准

网页的三要素：结构（HTML）、表现（CSS）、行为（JavaScript）

# HTML

HTML（Hyper Markup language）超文本标记语言	

个人理解：对于一个编写的文本，通过不同的标记，来告诉浏览器应该怎么显示该文本。

## 基本语法

```html
<!--完整的网页格式-->
<!doctype html5>
<html>  <!--网页的根标签-->
	<head>   <!--网页中看不见的信息，给浏览器看的-->
        	<title>出现在网页的标题上，搜索引擎通过这个来判断网页的内容</title>
        <meta charset="utf-8">
    </head> 
    <body>   <!--网页中所有可见的内容都卸载这里-->
        <h1>
            标题1
        </h1>
        <h2>
           这是一个使用<font color="red" size="5">标签属性</font>的例子
        </h2>
        <p>
            段落
        </p>
    </body>
</html>

```

 ## 自结束标签和注释

<img>

<img/>

<input>

<input/>

## 标签中的属性

<front>

</front>

属性在开始标签和自结束标签设置（属性与标签要隔一个空格）

```html
<html>  
	<head>   
        	<title>出现在网页的标题上</title>
    </head> 
    <body>   
 <h1>
     这是一个使用<font color="red" size="5">标签属性</font>的例子
        </h1>
    </body>
</html>
```

该例子中，color是属性名，red为属性值（属性值必须用引号括起来）。有的属性只有属性名，没有属性值。

## 文档声明

告诉浏览器当前网页的版本

```html
<!doctype html5> <!--该声明写在最开头，告诉浏览器当前网页的版本-->
<meta charset="utf-8"> <!--标识文档的编码方式，写在head段中-->
```

meta用来设置网页的元数据（网页最底层的数据）。

## 在visual studio code中编写html文档

使用！＋table自动补全，p或h1＋table自动补全

## 使用转义字符来写网页中的特殊字符

常用的：

&nbsp；  空格

&gt；  大于

&lt；  小于	

## html meta标签

meta 标签用于设置网页的元数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">  <!--设置网页的字符集-->
       <meta http-equiv="refresh"content="3;url=https://www.baidu.com">
    <!--上面的操作为：三秒后将跳转到指定的网页-->
    <meta name="keywords" content="HTML5,前端,CSS3">
     <!--keywords为网站的关键字，content后面的内容是关键字的值，
        内容之间用,隔开当搜索引擎搜索内容时，会将关键词含有搜索
        内容的网页提取出来-->
    <meta name="description" content="这是该网站的描述">
    <!--description的内容显示在搜索引擎的结果中-->
    <title>实体</title> <!--title的内容作为搜索引擎结果中超链接的文本-->
</head>
<body>
    <p>today is a good day! </p>
</body>
</html>
```

## 语义标签

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--  -->
</head>
<body>
    <!-- hgroup用于将两个相关的标题分为一组 -->
    <hgroup>
        <h1>标题1</h1>
        <h2>与标题1相关的标题2</h2>
    </hgroup>   
    <p>
        <!-- em为语义加强标签，且使用的时候不会独占一行，
            该标签称为行内元素 -->
        语义<em>加强</em>标签
    </p>
    <p><strong>强调</strong>标签，同样是行内元素</p>
    <blockquote>长引用，独占一行</blockquote>
    <q>短引用，不换行</q>
</body>
</html>
```

## 块元素与行内元素 

- 网页中的也面一般分为一块一块显示的，因此在编辑网页的时候也是一块一块地编辑。

- 行内元素主要对特殊的文字进行设置。

- **一般情况下，行内元素放在块元素中，而快元素不会放在行内元素中**
- 块元素中基本上所有元素都能放
- p元素中不能放块元素，否则浏览器会自动进行修正

网页布局用html来分割，但是html中的标签只是用于区分不同的块，具体的实现用CSS。

**一般块用<  	dir></dir>，行内元素用<span></span>**

## 列表

​	 网页中的列表分为：

1. 有序列表
2. 无序列表
3. 定义列表

```html
<body>
    <!-- <ul>用于创建无序列表 -->
    <ul>
        <!-- <li>用于创建列表项 -->
        <li>列表项</li>
        <li>列表项</li>   
    </ul>
    <!-- <ol>用于创建有序列表 -->
        <ol>
            <li>列表项1</li>
            <li>列表项2</li>
        </ol>
        <!-- <dl>用于创建定义列表，<dt>下定义,<dd>对定义的解释 -->
            <dl>
                <dt>定义1</dt>
                <dd>对定义1的解释</dd>
                <dt>定义2</dt>
                <dd>对定义2的解释</dd>
            </dl>
</body>
```

一般有序列表和无序列表显示的效果相同，因此一般使用<ul></ul>创建列表。最后用CSS修饰。

## 网页中的超链接

```html
<body>
    <!-- 网页中超链接的定义,其中需要定义的它的属性(href)，用于指向目标地址-->
    <a href="https://www.baidu.com">超链接1</a>  <!--指向外部连接-->
    <br>
    <a href="test01.html">超链接2</a> <!--跳转到与该文件相同目录的其他文件-->
</body>
```

超链接也是一个行内标签，但是可以嵌套除了自身以外的其他所有元素。

### 对超链接中相对路径的补充1

通常使用.和..来标识使用相对路径。

```
./ 表示当前路径，../表示该目录的上级目录。
```

### 补充2

- 打开一个超链接时，不关闭当前网页，在新的标签栏中打开新的网页。 

```html
<body>
    <!-- target属性用于指定打开超链接的位置 -->
    <a href="./test04.html" target="_blank">超链接</a>
</body>
```

- 超链接跳转到当前网页的其他位置

```html
<!-- 用其他标签的id属性来跳转到该处 -->
<a href="#bottom">跳到id处</a>
 	  “Panza”是“挺著肚子”的意思。</p>
        <!-- 用id属性来标识不同的标签，区分大小写，只能字母开头.所有标签都能添加id，用于跳转 -->
         <!-- 用#表示退到顶部 -->
    <a id="bottom" href="#">回到顶部</a>
```

注：在开发中，用javascript::作为超链接的占位符，因为超链接的作用一开始并没有确定,点击该连接没有任何作用。

## 图片标签

html的网页是超文本文件，只能添加文字，因此添加图片是通过引入的方式加入到网页中。	

```html
<body>
    <!-- 使用img标签引入外部图片，它是一个自结束标签。这是一个替换元素，alt元素是对图片的描述，默认情况下不会显示。搜索引擎会根据这个描述来识别图片。 -->
    <!-- 用width调整图片的大小，单位为像素，若只修改一个，则另一个方向会等比例缩放。但是一般不建议修改大小，需要多少裁多少-->
    <img src="./img/Screenshot_20220505_175003_tv.danmaku.bili_edit_77400608531937.jpg " alt="显示不出来的文字">
<img width="500" src="外部图片网址">
</body>
```

图片的格式：

- jpeg（jpg）（主要用于照片）
- gif（动图）
- png（主要用的，用于复杂图片）
- webp（谷歌推出的用于表示网页中图片的格式，但是兼容性不好）
- base64:将图片进行编码，转换成一串字符，这样就可以直接引入图片，主要用于需要与网页同时加载的图片

浏览器请求网页是分阶段的：

首先请求网页代码，然后根据网页的图片链接重新请求图片。base64能直接将图片与网页同时加载出来。

## 内联框架

 ```html
 <body>
     <!-- iframe标签作为内联框架，用于在本页面引入其他网页，src用于引用网站的路径。同时用height width等属性来调整该页面的大小,frameboard指定内联页面的边缘    -->
     <!-- 也可以用于引用自己的网页 -->
     <iframe src="https://www.bilibili.com" frameborder="0" height="500"  width="1000"></iframe>
 </body>
 ```

## 音视频播放

```html
<body>
    <!-- audio标签 引入一个外部的音频文件；controls属性用于表示是否让用户控制音频的播放；autoplay让音频自动播放-->
    <audio src="./music/祖娅纳惜 - 孤勇者 [mqms2].flac" controls></audio>
    <!-- video标签用于视频播放 -->
    <video controls src="./vedio/Cemu 1.26.2f - FPS_ 35.00 [Vulkan] [NVIDIA GPU] [TitleId_ 00050000-101c9300] Breath of the Wild [JPN v208] 2022-05-01 12-30-33.mp4"></video>

</body>
```

- - 
