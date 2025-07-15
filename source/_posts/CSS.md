---
title: CSS学习笔记
tags:
  - CSS
  - 学习笔记
categories:
  - 前端
abbrlink: 15279
date: 2025-07-15 16:30:00
---

# CSS

##  1 简介

CSS是对网页的修饰，在html设置好了网页的结构后，用CSS来对网页的样式进行修改。并且网页跟PS修图一样，也是分层的，CSS可以对网页的不同层进行修饰。

`<p style="color:red;font-size:30px;">test</p>`

## 2 CSS的使用位置

### 内联样式

如上一个例子，CSS直接写在了p标签内部，叫做内联样式，这种方式不方便维护，一般不推荐使用。

### 单个网页

第二种方法：直接在head中对不同标签设置样式。

```html
<head>
   <style>
        p{
            color:rgb(0, 255, 81);
            font-size:50px;
        }
    </style>
</head>
```

### 外部样式表

将CSS样式写到一个CSS文件中

然后通过link标签将CSS文件引入

```html
<head>
<link rel="stylesheet" href="./test01.css">
</head>
```

这是最推荐的样式



在style标签中的语法与html的不同，应该遵循CSS的语法。

## 3 选择器

通过选择器选择页面中的指定元素

### 常用选择器：

```
1、元素选择器：直接将标签名作为选择器的名字
如：p{}为p标签的选择器
2、id选择器(id不能重复)
首先对该标签设置一个id，然后通过#加id属性值{}作为选择器
3、对任意个标签进行设置，一个标签还可以使用多个class
使用.class属性值{}
.yellow{color:yellow;}
<p class="yellow">任意标签例子</p>
4、通配选择器
选中页面中的所有元素
*{}
```

### 复合选择器：

```CSS
<head>
 <style>
/* 为同时满足标签名为div和class名为red的设置,交集选择器（直接写在一起） */
/*标签名和类名要同一级别*/
div.red{
    color:red;
}
  </style>
</head>
<body>
<div class="red">div</div>
<p class="red">p</p>
</body>
```

```
<head>
 <style>
/* 并集选择器,用逗号连接 */
div,.red{
    color:brown;
}
  </style>
</head>
<body>
<div class="bf">div</div>
<p class="red">p</p>
</body>
```

### 关系选择器

父元素包含子元素，直接或间接包含其他元素的为该元素的祖先元素。对应的为子元素和后代元素。拥有相同元素的元素为兄弟元素。

- 父代>子代 表示选中该父代后面的子代
- 祖先 后代（中间用的空格相连） 表示选中该祖先的后代 

- 兄弟1+兄弟2 表示选中兄弟1后面的第一个兄弟2
- 兄弟1~兄弟2 表示选中兄弟1后面的所有兄弟2

### 属性选择器

```
<style>
/*使用[]包住属性名*/
/*或者[title=abc] 选择含有属性名和属性值的元素*/
/*[title^=abc]以abc开头*/
/*[title$=abc]以abc结尾*/
/*[title*=abc]含有abc*/
[title]{
color:orange;
}
</style>

<p title="abc"></p>
```

### 伪类

```
ul>li:first-child{}  /*第一个子元素*/
ul>li:last-child{} /*最后一个子元素*/
ul>li:nth-child{} /*第n个子元素*/
/*这里第几个子元素指的是所有子元素中第几个*/
:nth-child(n){}所有元素
:nth-child(2n){}偶数位元素
改成：first-of-type是按相同元素中排序
:not(nth-child(3)){}排除第三个
:not(nth-of-type(3)){}排除按相同元素排序的第三个
 
<ul>
    <li>test</li>
</ul>
```

### 超链接的伪类

  ```html
<head>
 <style>
a:link{   /*link表示没访问过的链接*/
    color:black;
}
a:visited{  /*visited表示访问过的链接,为了保护隐私，只能改变颜色，一般不用 */
    color:red;
}
a:hover{   /*鼠标悬浮在链接上时发生的变化*/
    font-size: 50px;
}
a:active{  /*点击发生变化*/
color:green;
}
  </style>
</head>
<body>
<a href="https://www.baidu.com">没访问过的链接</a>
<br>
<a href="https://www.bilibili.com">访问过的链接</a>

</body>
  ```

### 伪元素

```
<head>
 <style>
p::first-letter{  /*对该标签中的第一个字母进行修改*/
    font-size: 30px ;
}
p::first-line{  /*对该标签的第一行字母进行修改*/
    background:yellow;
}
p::before{  /*在该部分最前面插入*/
    content:'┍';
    color:red;
}
p::after{
    content:'┚';
    color:red;
}
  </style>
</head>
<body>
    <p>Life is like an ocean, and no one can get it.</p>
</body>
```

## 4 继承

样式的继承，如果给一个标签设置一个样式，则它的后代元素也会继承该样式。但不是所有样式都会被继承，例如布局样式，背景样式不会被继承如backgroud-color。

## 5 选择器权重

当同一个元素有多个选择器时，对不同选择器进行样式设定时，会发生冲突。这时，用哪个样式，由选择器的权重决定。	

```shell
#选择器的权重
 #内联样式 1000
 #id选择器  100
 #类选择器和伪类选择器  10 
 #元素选择器1
 #计算优先级时，将所有选择器的权重相加，分组选择器（以，相隔）分别计算。选择器的累加不会超过他自己的数量级。
 #相同优先级，下面覆盖上面
 #通配选择器（*）优先级为0，继承的样式没有优先级。
```

## 6 声明块

通过声明块为选中的元素设置样式，声明块由一条条声明组成。每条声明由一个样式名和一个样式值加冒号组成。

  

## 7 像素和百分比单位

```shell
width:100px;
height:100px; #px为像素大小,可用百分比，表示子元素相对父元素的大小
#em单位表示相对于字体大小（font-size)的多少倍
#rem单位，相对于根元素的字体大小的多少倍（根元素在<style><html></html></style>中）

```

## 8颜色单位

```shell
#直接用颜色单词red、green
#使用RGB值
rgb(255,0,0,1)#最后一位表示透明度
#HSLA  H：色相（0-360） S：饱和度（颜色的浓度0-100%） L：亮度（0-100%） A:透明度
hsl(0,50%,50%)
```

## 9 文档流

网页是多层结构，最底层的叫做文档流。

我们创建的元素默认都是存放在文档流里面的。

元素主要有两个状态：在文档流中和不在文档流中。	

---

元素在文档流中的特点：

- 块元素：在页面中独占一行，默认宽度是父元素的全部，默认高度是被内容撑开的。
- 行内元素：不会独占一行，只占自身大小。当一行中容纳不下这些元素，这些元素会换行。默认宽度和高度被内容撑开。

## 10 盒模型

### 简介

在网页中，通过css将每个元素抽象成一个一个的矩形盒子，对页面的布局就相当于将盒子摆放到不同位置。

盒子的组成：

> 内容区（content）
>
> 内边距（padding）：决定边框与内容的距离
>
> 边框（border）
>
> 外边距（margin）：决定相邻不同盒子边框的距离

实例：

```html
<style>
   .box{
       /*  所有元素内的文本和子元素都在内容区中，内容
       区的大小由width和height来设定。 */
       background-color:#bfa;
       width:200px;
       height:200px;
       /* 边框的设置（至少需要三个样式） */
       border-width:10px;
       border-color: red;
       border-style: solid; 

   }
</style>
```

###  边框

```html
border-width:10px 20px 30px 40px; /*分别表示上右下左四个方向上的边框宽度（顺时针旋转）*/
border-color:red green yellow black; /*同上*/
border-style:solid dotted dashed double; /*实线 点虚线 虚线 双线*/
/*这三个值必须指定*/
/*border简写属性（常用）*/
border: 10px orange solid; 
```

### 内边距

```html
padding
padding-top:100px： /*只能指定大小*/
padding-right
padding-bottom
padding-left  /*内边距的大小会影响盒子的大小，该元素的背景颜色也会延伸到内边距中*/
```

### 外边距

```html
margin:10px;
margin-top
margin-right
margin-bottom
margin-left
```

### 盒子的水平布局

```html
<style>
    .box{
        
    }
    .inner{
        
    }  /*子元素的盒子模型必须满足:margin-left+border-left+padding-left+width+Padding-right+border-right+margin-right等于父元素盒子模型的内容区宽度。如果不成立，则成为过度约束，如果没有auto的值，等式会自动调整margin-right的值。*/
    /*如果宽度设置为auto，则其他auto自动设置为0，宽度设置最大。如果宽度设置为固定值，则其他auto按按方程求解*/
</style>



<div class="box">
    <div class="inner">
        
    </div>
</div>
```

### 盒子的垂直方向的布置

```html
/*当子元素高度超过父元素的高度时，会发生溢出*/
/*避免溢出的方式：在父元素中设置overflow的值*/
/*visible 可见，hidden 剪裁，scroll 生成滚动条，auto  */
overflow-x
overflow-y
```

### 外边距的折叠

垂直方向上相邻的两个盒子，他们的外边距会发生重叠。

>兄弟元素的相邻间距
>
>>符号相同取绝对值较大的
>
>>如果一正一负，则取他们之间的和。
>
>父子元素相邻
>
>>子元素的外边距会传递给父元素
>
>>当父元素有边框时，将不会传递外边距	

### 行内元素的盒模型

行内元素不支持高度和宽度的设置，但是可以设置padding,border,margin，不影响垂直方向上的布局。

**display**：用来设置元素的显示类型

```html
display:inline /*设置为行内元素*/
		block /*设置为块元素*/
		inline-block /*既可以设置宽度高度，也不会独占一行*/
		table /*设置为一个表格*/
		none /*隐藏一个元素*/

```

### 盒子的尺寸

```html
/*在标签样式设定中，规定了标签的width与height，对于不同的盒子尺寸计算方法，该盒子的内容区、内边距、边框也不相同*/
box-sizing:content-box; /*表示盒子的尺寸大小为内容区的尺寸，默认为该选项*/
box-sizing:boder-box;/*盒子的尺寸表示盒子边框的尺寸，会自动调整内容区的尺寸*/
```

### 轮廓阴影和圆角

```html
    .box{
        width:100px;
        height:100px; 
        background-color: blue;
        /* border: 20px yellow solid; */
outline:10px red solid;
/* outline 用来设置盒子的轮廓，并不会改变盒子占据的空间。它的使用方法跟边框的设定一样 */
box-shadow: 10px 10px  20px black;
/* box-shadow 用来设置元素的阴影，不会影响元素的布局。该阴影的大小与元素的大小相同。
前两个值为阴影的水平偏移量和垂直偏移量，第三个值为阴影的模糊半径。最后一个为阴影的颜色 */
border-radius: 20px / 40px;
/* border-radius用来设置边框的圆角，可以同时给左上、右上、右下、左下设置半径大小。
还有border-top-right-radius等方式设定。用/来分别设定水平和竖直方向上的半径*/
    }
```



## 11浏览器的默认样式

**通常情况下，浏览器会为每个元素设置默认样式。默认样式会影响到页面布局，通常情况下，编写网页时必须去除浏览器的默认样式。**

```html
<style>
    *{
        margin:0;
        pading:0;
    }
</style> /*这种方法不能完全清除标签默认样式*/
```

使用别人的重置样式表（别人写的用于清除浏览器默认样式的文件）

## 12 浮动的简介

​	通过浮动能够使一个元素向其父元素的左侧或右侧移动。用于元素在水平方向上的排列。 

- **当元素设置了float后，元素水平方向上的尺寸和等于父元素的宽度的这个条件将不再成立。**

- **而且设置float后，元素也将从文档流中脱离，因此元素后面在文档流中的元素会自动填补上来。**

- **当多个元素都设置float后，这几个元素均脱离了文档流，并横向排列。并且后面的浮动元素不能够超过前面的浮动元素。**

- **当父元素宽度不能够容纳这些元素时，多余的元素会往下移动**

```html
.box1{
        width:100px;
        height:100px;
        background-color: #bfa;
        float:left;
    }
    .box2{
        width:100px;
        height:100px;
        background-color: black;
        float:left;
    }
```

- 浮动的其他特点
  - 浮动元素不会覆盖文字，文字会环绕图片。

脱离文档流的元素特点：

- 块的高度和宽度默认被内容撑开
- 行内元素脱离文档流后就变成了块元素。即对于脱离文档流后的元素均为块元素。

## 13 解决高度塌陷问题 开启父元素的BFC

- BFC（block  formatting contex）块级格式化环境

- 用途：解决子元素浮动后，父元素产生高度塌陷的问题。
- 特征：
  - 开启BFC的元素不会被浮动元素覆盖
  - 子元素和父元素外边距不会重叠
  - 开启BFC的元素可以包含浮动的元素

- 开启方式:有很多，但均有副作用，因此一般的开启方式为`overflow:hidden`

## 14 clear -- 解决浮动元素对其他元素的影响

- 参数：left  right  both(选择对该元素影响最大的那一边)

## 15 高度塌陷的最终解决方案

 使用css中的伪类来解决：

```html
<style> //解决高度塌陷和外边距重叠的问题
.clearfix::before,
    .clearfix::after{
content:'';
display:table;
clear:both;
    }
</style>
```

## 16 定位

```html
position //通过定位属性来设置元素在页面的位置
参数：static(默认值)
	relative(相对定位)
	absolute（绝对定位）
	fixed（固定定位）
 	sticky（粘滞定位）
```



### 16.1 相对定位

```html
.box{
position:relative;  //开启box元素的相对定位
top:10px;
bottom:10px
}
```

开启相对定位后通过`offset`偏移量来确定元素的位置：top、bottom、left、right。

### 16.2 绝对定位

​	使用`solute`。

**注意：**开启绝对定位后，元素会从文档流中脱离。

- 子元素的相对原点在其最近的开启了定位的父块上，不包含行内元素。

### 16.3 固定定位

**相于绝对定位，其相对位置是网页的视口（网页显示的窗口）**

### 16.4 粘滞定位

**跟相对定位基本一致，但是到达视口顶端时会粘在那 **

## 17 字体的使用

```html
style{
@font-face{
font-family:'字体名称（自定义）';
	src:url('字体的路径')format("格式")
}
.box{
font-size:;
color:;
font-family:;
}
}
```

font-size和font-family可以简写为font：`font: 50px 'Time News Roman',Times;`

`font-weight:normal(或者bold)`字体正常或加粗

`font-style：normal(italic)`字体正常或者倾斜

## 18 图标字体

- 简介：将图片转化为跟文字一样的属性，能够调节大小颜色等

- 使用方法:

  ```html
  <head>
      <link rel="stylesheet" href="../font_style/css/all.css">  /*将图标字体的文档引入*/
  </head>
  <body>
      <i class="fas fa-bell" style="font-size:160px;color:green;"></i> <!--class的第一个是必须的，为fas或者fab。第二个值为图标的名称，可以从文档中找到-->
  </body>
  ```

- 使用伪元素来添加图标

  ```html
  style{
  box::before{
  content:'\f1b0';  <!--该图标的编码-->
  font-family:'Font Awesome 5 free'; <!--图标的族-->
  font-weight:900; 
  }
  }
  ```

- 直接使用

  ```html
  <body>
      <i class="fas">&#f1b0;</i>
  </body>
  ```

## 19 字体大小和行高

`font-size`设置的字体大小是字体外面这个框的大小，字体本身的大小不会超过这个框。

`line-height`设置该元素块中，文字所占的行高，文字会在这个行高中中居中分布。这个文字行会从该元素块上部排下来。 

`line-height`的值有：

>50px（设置行高的实际高度）
>
>1.5（行高相对于字体块高度的倍数）



## 20 文本样式

```html
text-align:left  /*文本水平对齐，它的值除了left还有right和center、justify（两端对齐）*/
vertical-align:baseline; /*文本垂直对齐，baseline（默认值，基 线对齐）、top（顶部对齐）、bottom、middle*/
text-decoration:underline;/*none underline(下划线) line-through(删除线) overline（上划线）*/
```

- 显示一个文本的部分值，其余部分显示省略号：

  ```html
  <style>
      .box{
          white-space:nowrap;/*nowrap(不换行) pre(保留空白，多个换行和空格均会显示出来)*/
      	overflow:hidden;/*将多余的部分遮住，否则会在方框外面显示*/
          text-overflow:ellipsis;/*对于不显示的文字显示省略号*/
      }
  </style>
  ```


## 21 背景

```html
background-image:url();  /*在样式设置里面设置元素的背景图片。当背景图片尺寸小于元素尺寸时，元素会被背景图片铺满。反之图片会被剪切*/
background-repeat:;/*设置背景图片的重复方式。repeat默认值，在x、y轴上重复。repeat-x，沿着x轴重复。repeat-y同理。no-repeat背景图片不重复*/
backgtound-position:;/*设置背景图片的位置。top left bottom right center。九个方位，通过两个值组合起来使用。或者使用两个偏移量来确定位置（前者是x轴后）*/
```

- 背景与box的关系：

  ```html
  backgroud-clip:;/*对背景的裁剪。border-box，背景会出现在边框下。padding-box，背景会出现在内边距上。conten-box，背景只会出现在内容区中*/
  ```

- ```html
  backgroud-origin:;/*背景的原点。border-box、padding-box、content-box，背景起始点分别从边框、内边距、内容区左上角开始*/
  background-size;:/*背景图片的大小，第一个值表示宽度，第二个值表示高度。使用100%和cover值会将背景图片缩放以适应元素大小*/
  ```

## 22 颜色渐变

- 线性渐变

```html
background-image:linear-gradient(to right,red,yellow，blue，white);/*设置背景的线性渐变色。第一个参数是渐变方向，渐变方向也可以使用角度来表示，0deg、10deg。后面为颜色。*/
```

- 径向渐变

  ```html
  background-image:radial-gradient(at 0 0,yellow,red) /*径向渐变的形状由元素的形状决定.at指定中心位置*/ 
  ```


## 23 表格

- 使用方法

```html
<table>
    <tr>
    <td>第一行第一列</td>
    <td>第一行第二列</td>
    </tr>
    <tr>
    <td>第二行第一列</td>
    </tr>
</table>
```

- 合并单元格：

  `<td colspan="2"></td>`横向合并单元格

  `<td rowspan="2"></td>`纵向合并单元格



 ### 23.1 长表格

```html
<teble>
	<thead>  <!--头部-->
    	<tr>
            <td>
            </td>
        </tr>
    </thead>
<tbody>
        	<tr>
            <td>
            </td>
        </tr>
</tbody>    <!--主体-->
 <tfoot>
     	<tr>
            <td>
            </td>
        </tr>   
 </tfoot>    <!--底部-->
</teble>
```

​	 

**注**：如果没有创建tbody元素，浏览器会默认创建该元素，默认的th不是table的子元素 

### 23.2 表格样式

```html
<style>
    table{
		border:1px solid black;
        border-spacing:0px; /*表格中格子之间的间距*/
        border-collapse:collapse;/*将格子之间的边框合并*/ 	  	
    }
    tr:nth-child(2n+1){
        background-color:#bfa; /*对奇数行的元素设置背景颜色*/
    }
</style>
```

## 24 表单

```html
<form action="">  <!--action指定提交的网页地址-->
    <input type="text" name="" value="默认的文本内容">    <!--要将文本提交到服务器，必须为改文本元素指定一个那么属性，提交的文本的名称为name-->
    <input type="submit" value="按钮的名字">  <!--创建提交的按钮-->
    <input type="password" name="passwd">   <!--密码框，跟文本框样式相同，但是输入的数据不会显示-->
    <input type="radio" name="group1" value="" checked>   <!--单选框，创建一个可以选择的圆框，若有多个框，当这些框的name的值相同的时候，这些框形成一个组，该组内只能选中一个。选中一个单选框后，会将单选框中value的值传递给服务器。checked表示默认选中-->
    <input type="checkbox" name="">  <!--多选框，效果跟单选框相似-->
    <select name="下拉框" id="">  <!--下拉框-->
        <option value="1">选项1</option>
        <option value="2">选项2</option>
    </select>
    <input type="button" value="按钮"> <!--创建一个按钮，关联js-->
    <input type="reset">  <!--重置文本框的内容-->
</form>
```

相比于`submit button reset`用的更多的是：

```html
<input type="submit">提交</input>
<input type="button">按钮</input>
<input type="reset">重置</input>
```

```html
  <input type="text" name="" value="" autocomplete>
```

## 25 过渡

使用`transition:[指定属性] [过渡时间] [延迟时间] [贝塞尔曲线函数];`来实现，`all`表示所有变化的属性，可以选择特定的属性。

`transition-property`指定需要过渡的属性。

`transition-duration`指定过渡的持续时间。

`transition-timing-function`过渡的方式

> ease 默认值 先加速后减速
>
> linear 匀速运动
>
> ease-in 加速运动
>
> ease-out 减速运动
>
> cubic-bezier() 贝塞尔曲线函数
>
> steps() 分步执行过渡。如steps(2,end)表示将过渡分为两次进行，end表示每个时间段结束后动画才进行。

`transition-delay`过渡延迟。

**注意**：`auto`不能与过渡联合使用。

## 26 动画

```css
/*首先设置一个关键帧*/
    @keyframes test{  /*设置动画效果的名称，便于后面元素的调用.*/
    from{  /*设置属性的初始值*/
    margin-left:0;
    }  
    to{
    margin-left:700;
    }
    }
    
    .test{
    animation-name:test;  /*调用动画*/
    animation-duration:2s;/*设置动画持续时间*/
	animation-delay:;
    animation-timing-function:ease-in-out;
    animation-iteration-count:infinite;/*动画执行的次数 infinite表示无限循环*/
    animation-direction:normal;/*动画执行的方向,reverse表示反向、alternate表示交替执行*/
    animation-play-state:running;/*动画的执行状态,还有pause*/
    animation-fill-mode:none;/*动画的填充模式。none表示动画执行完毕后回到初始位置，不是from设置的位置，而是元素自身的位置。forwards，结束后停到to的位置。backwards，动画延迟结束前，元素已经处于动画的from状态。both，延迟之前就执行from，结束后，停到to的状态。*/
}
```

**注意**:动画是在延迟之后才开始的，之前为元素自身的属性。

## 27 变形

变形指对元素的形状和位置进行改变。且变形不会影响到元素的布局。使用`transform`。

- 平移：`tansform:`

> `tanslateX();`沿着x轴方向平移
>
> `translateY();`沿着y轴方向平移
>
> `translateZ();`沿着z轴方向平移

对于`translateZ()`要对网页设置视距（设定的人眼离网页的距离）：

```css
body{
    perspective:800px;
}
```

- 旋转：（使用旋转你的时候需要设置视距，否则不能得到近大远小的效果）

  ```css
  transform:rotateZ(45deg);/*绕z轴旋转*/
  transform:rotateX(1turn);/*绕x轴旋转*/
  transform:rotateY(.5turn);/*绕y轴旋转*/
  backface-visibility:hidden;/*隐藏元素的背面，*/
  ```

- 缩放：

  ```css
  transform:scaleX([相对于原元素的大小倍数]);
  transform:scaleY();
  transform:scale();/*两个方向同时缩放*/
  ```

- `transform-origin:20px 20px;`设置变形的原点默认值是center

# 注释

rel 是 relationship 的英文缩写

url：Uniform Resource Locator统一资源定位符

src：Source资源

href：Hypertext Reference超文本引用 

# less

## 1 less简介

less是比css更加高级的语言，但是需要通过编译将less文件转化成css文件才能生效。

## 2 less中的变量

- 变量的语法:声明时，`@`加上变量名。调用时同样为`@`加上变量名。

  如：`@a:100px;`

  `.box{width:@a;}`

- 当变量作为类名使用时：声明方式不变。调用方式为`@{变量名}`

- 变量作为文件路径时：`url("@{变量名}/img01")`，这里必须给路径加上双引号。

- 变量声明也有作用域，在大括号下的变量会覆盖其上一级的同名变量。

- 可以通过`$`加属性名来直接调用已经有值的属性。

## 3 父元素和拓展

- 对于子元素的样式设置，直接在父元素中使用`>`来实现

```css
.box1{
    >.box2{
	color:red; //直接设置box1的子元素box2
    }	
}
```

- 如果对一个父元素进行`hover`设置，则需要通过`&`符号(这是指向它的父元素)

```css
.box1{
    &:hover{
        color:orange;
    }
}
```

- 拓展（继承前面元素的样式）

  ```less
  .p2:extend(.p1){
      color:red; //添加除了p1样式以外的其他样式
  }
  
  .p1{
  .p2(); //直接复制了p1的样式
  }
  ```

- 创建mixin

  ```less
  .p1(@a，@b，@c：red){  //.p1为一个专门给别人使用的一个mixin函数，别人可以直接调用它来使用里面的属性，@a @b为形参。最后@c为默认参数
  width:@a;
  height:@b;
  }
  
  .p2{
  .p1(100px，200px);  //p2调用了p1，同时传入了100px和200px参数
  }
  ```

## 4 less补充

- less中的数值可以直接进行运算
- 可以使用`@import "test.less";`引入其他less文件
- 调试：在easyless的配置文件中进行更改，使得网页源码显示的行数是less文件中的行数而不是css文件中的行数

## 5 弹性盒简介（flex）

- css中的另一种布局手段，代替浮动完成页面布局。

- 让元素具有弹性，让元素根据页面大小的变化而改变

- 使用步骤：

  - 通过`display:flex;`和`display:inline-flex`来将元素设置为弹性容器

  - 弹性容器的子元素会变成弹性元素，后代元素中只有子元素才是弹性元素。并且弹性元素也可以同时成为弹性容器。

  - 对弹性容器进行设置

    > -  `flex-direction:;`row为默认值，弹性元素排列从左往右（row-reverse反向）。排列column自上往下。	
    > -  如果排列方向为row，则主轴为从左往右。如果为column，主轴为自上往下。侧轴为与主轴垂直的方向。

  - 对弹性元素进行设置

    > - `flex-grow:;`弹性元素的伸展的系数。当弹性容器还有多余空间的时候，子元素如何进行伸展。1表示伸展铺满，0表示不伸展。弹性容器中的弹性元素会按这个属性的值进行按比例分配空间。
    > - `flex-shrink:;`指定弹性元素的收缩系数。当弹性容器的空间容纳所有子元素时，按比例对子元素进行收缩。

## 6 弹性容器上的样式

- `flex-wrap:;`设置弹性元素是否在弹性容器中自动换行。默认值为`nowrap`不会自动保存。`wrap`沿着辅轴方向自动换行。
- `justify-content:;`弹性容器中，弹性元素和剩余的空白空间的排列方式。默认值为`flex-start`弹性元素紧贴着靠主轴起边排列。`flex-end`弹性元素紧贴着靠终边排列。`center`弹性元素紧贴着居中排列。`space-around`弹性容器中的空白空间平均分布在弹性元素的两侧，中间重叠的部分不会合并，因此中间的空白部分会比两侧的空白部分大。`space-evenly`空白空间平均分布在他弹性元素的单侧。`space-between`空白空间平均分配到几个弹性元素之间，两侧元素靠边。
- `align-items:;`元素在辅轴上如何对齐。`stretch`（默认值）将元素在辅轴上的长度拉伸为相同的值。`flex-start`元素不会拉伸，而是沿着辅轴起边对齐。`flex-end`沿着辅轴的终边对齐。`center`沿着辅轴居中对齐。`baseline`基线对齐。
- `align-content:;`设置容器空白空间的分布。`center`元素居中，空白在两侧。`flex-start`元素靠起边。`flex-end`元素靠终边。`space-around` `space-between`同`justify-content`一样的效果。
- `flex-flow`是`flex-direction`和`flex-wrap`的复合属性。

## 7 弹性元素的样式

- `flex-basis:;`指定元素的长度，会覆盖之前设定的`width`。`auto`为默认值，会参考元素自身的宽度。
- `flex:;`三个属性值分别为增长系数、缩减系数、基础长度。`initial`表示默认值 分别表示`0 1 auto`。`auto` 表示`1 1 auto`。`none`表示`0 0 auto`。
- `order:;` 为弹性元素设置排列次序。值越大排后面。

## 8 移动端的网页设计

为了在移动端能够有较好的网页表现，需要设置像素比（css像素与物理像素之比）为1:2或1:3。因此需要对网页的视口宽度进行设定。

通过`meta`标签进行设定。`<meta name="viewport" content="witdh=device-width,initial-scale=1.0">` 。`device-width`表示设备的宽度。这样就可以将其设定为移动端的完美视口。

- 每一款移动设备设计时都有一个最佳的像素比，一般只需要将像素比设置到这个值就行。
- 在设置元素宽度的时候不能给元素设定确定的像素值，因为在不同设备下，视口宽度会发生变化，因此元素的展示效果也会随之发生变化。也不能设定百分比，因为其父元素的改变也会对该元素产生影响。因此需要设定新的属性值为`100vw`。`vw`表示视口宽度。前面的数值表示它是视口宽度的多少百分比。`100vw`表示一个视口宽度。

## 9 响应式布局

- 响应式布局指的是网页会随着设备的不同和窗口大小呈现出不同的效果。

- 使用响应式布局，可以使一个网页适用于不同设备。

- 响应布局通过媒体查询，可以为不同的设备或者设备的不同状态分别设置样式。

- 语法：

  ```css
  @media all{  /*所有设备*/
      body{     
          background-color:#bfa
      }
  }
  
  @media print{  /*打印样式*/
      
  }
  
  @media screen{ /*带屏幕的设备*/
      
  }
  
  @media screen,print{}/*表示或者关系*/
  ```

- 媒体特性

  - 视口宽度和视口高度。`@media(width:500px){}`。当视口宽度为500px时，网页呈现的样式。
  - `@media(min-width:500px){}`。当视口宽度大于500px时，就生效。`max-width`表示视口小于该大小时生效。
  - 通常的屏幕视口宽度的断点有768px,992px,1200px. 
  - 用`,`连接表示或。`and`表示且。`@media (min-width:500px) and (max-width:700px)`表示在500px到700px之间。