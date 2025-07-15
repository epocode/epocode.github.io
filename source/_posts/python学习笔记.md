---
title: Python学习笔记 
tags:
  - Python
  - 学习笔记
categories:
  - 人工智能
abbrlink: 15279
date: 2025-07-15 16:30:00
---
# 数据类型

- python中的变量直接可以定义，形式为`[variable] = [value]`。变量跟cpp不一样的是，他的类型不是确定的，类型通过赋值给他的值的类型而确定。
- 布尔类型中，`True`和`False`分别代表真和假，不同于cpp的是，其首字符大写。
- 空值`None`，表示一个占位符，实际没有意义

# 代码格式
- 在条件判断处，若存在比较运算符，则比较运算符两侧最好使用空格`if test < 1:`
- 对于较长的字典，使用逗号换行的方式进行字典的定义
	```python
	dict = {
		"name": "liu wei",
		age: 18,
		}
	
	```

- 类名使用大坨峰的形式，不用下划线连接

## 函数名的编写
- 函数名只用小写字母和下划线
- 实例名和模块名也使用小写字母并用下划线连接
- 给形参指定默认值的时候，等号两边不要空格。函数调用的时候，关键字实参的等号也遵循这种约定
# 模块
- 一个`.py` 文件就可以成为一个模块，其他py文件只需要导入这个模块就能使用该文件中定义的所有函数。
- 使用`import 模块` 的方式导入整个文件,使用该模块的时候通过`模块.函数()`的方式使用。
- `from 模块 import *` 导入该模块的所有函数
- 使用`from 模块 import 函数 as 新的函数名` 将原来的函数名改为自己希望的函数名
下面为建议的方式：
- 也可以直接`import 模块 as 新的模块名`
- 使用`from 模块  import 函数`的方式导入指定的某个函数，使用的时候直接使用函数名，不用写模块名。
# 常用函数

- 使用`type([the variable])`返回该变量的类型，改返回值为字符串。

- 
  `print([the parameters should be strings or variable ])`该函数打印传给他的参数。参数可以是变量，可以使字符串，还可以直接是可以直接计算出的值。
	-  print中的参数也可以像cpp的printf一样，使用格式化字符串的形式，但是有一点区别。

    ```python
    print("字符串：%s，整型数据：%d,浮点型：%f" %("string", 12, 2.0))
```


	 或者可以使用`print(f"通过大括号包着变量来打印变量的值{variable}")`
	 字符串的拼接直接通过`+`来实现。 
	 - 使用格式化字符串
		 `print(f"{变量}")` ,变量将会转换成对应的字符串


- `input([里面的参数可以是输入的提示])`返回值为字符串类型。

- `int([variable])`将传入的数据类型转化成对应的int型。如传入字符串转成对应的int类型的数据。`float()`和`str()`同理
- `len([内容])` 返回该内容的长度，内容的类型可以为列表。
- `renge([数字])` 根据数字的大小生成一个从0开始，每次增加1的列表，数量该数字的大小。

# 运算符（不同于cpp的）
## 算术运算符
- `//`整除操作，由于python中变量没有指定的类型的规定，因此，当两个数相除的时候，如果没有整除，默认的结果会是浮点型。如果使用`//`操作符，则结果会返回整型。即便是两个浮点型相除，也会保留到整数位。
- `**`，相比于cpp必须调用数学库来实现某个数的几次方，python直接使用了`**`操作符来表示一个数的几次方。
## 关系运算符
- `is`关键词比`==`更加强大，判断两者是否完全相等。用法` if A is B :`
- `is not` 同样是关键词
- 上面两个关键词一般用于比较`False` `True` `None`的时候使用
# 分支逻辑

## if语句的使用

### if
- 格式

  ```python
  if <判断的内容>:
      <True执行的内容>   #这里通过四个空格缩进来实现归属的判断
      <if接下来的内容>
  <条件判断外的语句>
```

### if else

- 格式

  ```python
  if <判断的内容>:
      <True执行的内容>   #这里通过四个空格缩进来实现归属的判断
      <if接下来的内容>
  else:
      <else中的语句>
  <条件判断外的语句>
  ```

### if-elif-else

- 格式

  ```	python
  if <判断的内容>:
      <True执行的内容>   #这里通过四个空格缩进来实现归属的判断
      <if接下来的内容>
  elif <判断的内容>:
      <不满足上面的条件，满足该条件后执行的语句>
  else:
      <以上条件都不满足后执行的语句>
  <条件判断外的语句>
  ```

### 多级条件判断

- 这时候需要使用缩进来实现不同级别的条件判断

  ```python
  if <>:
      if <>:
          
      else:
          
  else:
     
  ```
### in在条件判断中的使用
```python
test_list = {1,2,3}
if 2 in test_list:
	print("ok")
```
- not in 表示不包含在其中
## try-except语句
try中的语句表示可能会出现错误的语句。当try中的语句出现错误的时候，则执行except中的语句。
```python
try:
	<可能会出现错误的一些列表达>
except:
	<try中出现错误的时候，执行except中的命令>
```

# 循环语句
## break continue 关键词
跟cpp的用法相同

## while循环

```python
while <判断>:
    <执行的语句>
<循环外>
```

- 嵌套同条件判断语句的用法一样
### 在while中使用标志
```python
active = True
while active:
	if 条件:
		active = False
	else:
		
```

## for语句

- 语法

  ```python
  for <临时变量> in <序列类型>:
      <满足条件执行的语句>
  <循坏外>
  ```

- for循坏没有条件判断的语句，只是将序列类型中的内容一个一个的取出，直到取完为止，因此循坏的次数是有限的。

- **序列类型**：内容能够被一个个取出的一种类型，比如字符串、列表、元组等。

- 例子

  ```python
  test = "hello world"
  for x in test:
	      print(x)    #打印字符串的每个字符
  ```

## range语句

- （个人理解）构建一个序列，作为for循环的一个序列类型，里面的参数为取数列中的每个值的规则。
- `range(num)`表示取出0到num-1。`range(num1,num2)`从num1到num2-1。`range(num1,num2,step)`如果没有第三个参数，则默认步长为1,即一个接一个的取出。
- 实际作用个人感觉是用来控制循环执行的次数。

## break continue 同 cpp

# 函数

- 格式

  ```python
  def <函数名>(<参数1>,<参数2>,...):
      <函数体>
      return <返回值>
  ```
- **参数**为一个占位符，他的数据类型由传入的参数的数据类型决定
## 使用关键字实参
```python
def fun(arg1, arg2):
	print()

fun(arg1 = "", arg2 = "")
```
  这样调用函数可以避免参数对应错误
## 传递任意数量的实参
- 在形参上添加`*` ，表示该形参为一个空的元组，将传入的所有实参放到这个元组中进行
- 如果有多个形参，则任意数量的形参应该放到参数列表最后面
## 参数为列表
- 跟java相同，虽然都是参数调用都是值传递，但是列表这里数据类型可以看作为对象，因此传递给形参后，形参也指向这个列表对象，因此列表的值可以修改。
- 如果不想修改原来的列表，则传递参数的时候只传递列表的副本，即使用切片。`fun(list[:])`
### 使用任意数量的关键字实参
- `fun(**dict)` .该形参为一个空的字典，使用该函数的时候需要向该函数传递一个字典，然后将该实参字典赋值给形参字典。

# 字符串
## slicing string 切片
- 对于字符串`str`。使用切片可以获取改字符串的某一子字符串。e.g.`print(str[0:4])`，表示从0开始到4结束。包括0但不包括4.
- 使用的其他格式:`str[:6]` `str[7:]` `str[:]`。前面三个分别表示从头开始、到结束
## in在字符串中的使用
-  `a in str`。 表示a是否在字符串中，返回布尔值。a可以是单个字符也可以是一个字符串。
## 比较运算符在字符串中的使用
- `==` `<` `>`都可以用在字符串的比较中
## 字符串对象调用自身的方法
- lower
	 - 使用方式`str.lower() `，返回str字符串全部转化为小写的字符串。
	- str可以为变量，也可以为字符串常量
	- 调用该函数不会改变字符串本身的值
-  find()
	- 用法: `str.find(str_search)`。找到字符串中要查询的字符是否存在，如果存在并返回改字符串的位置。
	- 返回值 ：-1表示没有找到，否则为该字符的下标位置。
- 替换
- 去除空格
	- `rstrip()` 去掉字符串后面的所有空格，包括换行符。
- 查找以什么开头的方法
	- `str.startswith("<字符串>")` 如果str以该字符串开头的话，则返回True，反之False
- 拆分
	- `split()`，没有参数，根据空格将字符串拆分成隔离的列表并返回。有参数则以参数为划分的依据。
- `title()` 将该字符串首位大写其余小写并返回
# 文件
- 通过函数`open("<文件名>",'<打开模式>')` 打开文件，返回文件的句柄，通过改句柄访问文件的内容。打开模式一般分为`r` `w`
- 文件打开失败的处理方式，使用`try-except` 方式处理。 
- 一行一行读取文件的方式：`for-in` 。 
```python
fh = open("test.txt")
for line in fh:
	print(line)
```
- 文件每一行都带有换行符`\n` 。但是print()函数打印文件某一行内容的时候也会加上一个换行符。因此会重复换行。解决方式：通过字符串自带的方法来处理每一行最后的换行符。方法：`str.rstrip()` 将该字符串右边的空格全部去除。
- 读取整个文件的内容，通过`filehandle.read()`。filehandle为文件句柄，read()为改句柄的方法，返回值为整个文件的文本内容。
- 使用`filehandlel.readlines()` 读取文件中每一行将其存储在一个列表中

## 使用with -as语句

```python
with open("文件路径") as file_object():
    contents = file_object.read()
```

- 去使用with语句后，python会自动合适的时候将文件关闭
- file_object只能在with代码段使用

## 写入文件

```python
filename = "programming.txt"

with open("programming.txt","w") as file_object:
    file_object.write("test")
```

- w 表明是写入模式，没写默认为r。w是直接清空之前的内容，然后再写入
- a  表示往之前文件末尾添加内容
- write为写入字符串的方法，没有自动添加换行符
- 

# 数据结构

## 列表

- 形式：list=[a,b,c]
- []生成一个列表，列表中的内容任意，可以嵌套列表。
- 创建一个空列表`list()` 返回一个空列表。

### 对列表可执行的操作

- 使用`+` 将两个列表首尾相连，跟字符串一样
- 同样可以使用切片来取出列表的某一部分内容。
- `in`  `not in` 同样可以跟字符串一样使用在列表中。
- 当列表位于条件判断的位置的时候，如果列表元素不为空则返回True，否则返回False

### 能够作用于列表的函数

- `len()` 
- `max()`
- `min()`
- `sum()`

### 列表的方法

- `append()` 在列表末尾添加元素。
- `sort()` 对列表进行排序。
- `pop()` 弹出列表中的最后一个元素并返回该元素
- `remove(元素名称)` 在列表中删除该元素 

## 字典

- 创建方式：
	- `dict_var =dict()`
	- `dict_var={} ` 创建空字典
	- `dict_var = {"key1" : value1, "key2" : value2}`
- 添加元素： `dict_var["关键字"]=<值>`,如果关键字已经在字典中存在的话，直接给改关键词对应的值，否则添加该键值对。
- 删除键值对 `del dict[键的名称]` ，使用`del` 语句删除对应的键值对
- 如果直接使用字典，如`print(dict_var[test])` ，要是没有该关键词的话，则会报错。
- `in` 同样可以作用在字典上，比较的时候判断的是关键词。
	
	- 如果在添加元素的时候没有关键词，则会报错。  
- 统计元素个数的常用方法：
	```python
	counts = dict()
	names = ["test1","test2","test3","test4"]
	for name in names:
		counts[name] = counts.get(name,0)+1
		
```
## 对字典执行的操作
### 遍历字典
```python
for key, value in dict.items(): 
	# 相应的代码段
```
### 字典的方法

- `get("<关键词>",0)` ，表示如果没有这个关键词，则返回0。如果有则返回该关键词对应的值。
- `keys()` 返回所有关键词的列表
- `values()` 返回所有值的列表
- `items()` 返回一个列表，该列表的每一项为一个元组，每个元组为字典的所有键值对。
```python
#items() 的使用
for aaa, bbb in dict_var.items():
	print(aaa,bbb)
#同时迭代两个变量
```

## 集合

- 创建的方式:`myset = {元素1， 元素2， 元素3}` 。相比于字典，集合的每个元素不是一个键值对，而是仅有一个元素。
- 使用`set(列表)`也能返回一个集合
- 集合的特点为没有重复的元素
## 元组 tuples

- 创建方式：
	- `tuples_var = (a,b,c)` ,相当于一个集合，包含了三个元素。
	- `tuples_var = tuple()`
	- `tuples = 1, 2, 3`
- 使用的方式跟列表一样，通过下标索引使用。
- 跟列表的区别，元组的元素不能够修改

### 元组的常用使用方法

```python
(x,y,z) = (1, "test", 'a')  #这样同时对三个变量进行赋值
print(x)
print(y)
```
- 元组也可以像字符串一样进行比较，先比较前面的元素，若不同，则不再比较后面的元素。若不同，再陆续往后比较。
### 根据元组列表的值进行排序

```python
c = {'a':10, 'b':1, 'c'"22"}
tmp = list()
for key, val in c.items:
	list.append((val, key))
sorted(temp, reverse = True)
```

- 更简短的方式:列表推导式
```python
c = {'a':10, 'b':1, 'c'"22"}
sorted([(v, k) for k, v in c.items()], reverse = True)
```

## 列表、集合、字典的推导式

- 列表推导式：`[expr for val in collection if condition]`，在集合中找到满足条件的元素，然后expr对元素进行处理。最后将得到的结果放到一个列表中
- 字典推导式：`{key-expr: value-expr for value in collection if condition}`
- 集合推导式：`expr for value in collection if condition`

# 类

- 类的定义

  ```python
  class 类名:
      def __init__(self, 参数1, 参数2):
          """相当于构造函数，初始化属性，每个函数都要添加这个形参.每次创建这个类的实例的时候会自动调用这个方法"""
          self.参数1 = 参数1
          self.参数3 = 具体值 #为参数3设置默认值
  ```

- 实例化对象

  ```python
  object_name = Class_name(参数1, 参数2)
  ```

- 似乎python类的所有属性均是公开的

## 继承

```python
class Child_class(Father_class):
    def __init__(self, ...):
        super.__init__(...)  #super()返回父类的一个对象
        # 下面添加子类特有的属性
```

- 当子类重写了与父类重名的方法后，在子类的所有实例中，将用该方法覆盖父类相对应的方法。

# 异常处理

## try-except

```python
try:
    不知道正不正确的代码段
except 异常类:
    如果try中的代码段出错则执行这里的代码
  
```

## try-except-else

- `try` 可能引发异常的代码
- `except` 引发异常后怎么处理的代码
- `else` 没有异常怎么处理

## FileNotFoundError

```python
try:
    with open(filename, encoding = "utf-8") as f:
        contents = f.read()
    except FileNotFoundError:
        
```

## 静默失败

- 如果想在except什么都不做的话，直接使用`pass` 关键词

# 存储数据（jason）

- `import jason` 首先引入jason模块
- `jason.dump(数据, 文件对象)` 将该数据对象存放到文件对象指向的文件中
- `jason.load(文件对象)` 返回该文件中存储的数据

# 代码测试

```python
import unittest

class NamesTestCase(unitteset.TestCase):
    def test_first_last_name(self):
        formatted_name = get_formatted_name("janis", "joplin")
        self.assertEqual(formatted_name, "janis joplin")
     
if __name__ == "__main__":
    unittest.main()
```

- 只有执行该测试文件的时候，`__name__` 才为`__main__` ，才会执行main
- 测试类中的测试方法必须以`test` 开头

# python 在网络中的运用

## 连接一个网站的方式
```python
import socket 
mysock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
mysock.connect(("data.pr4e.org",80))

cmd = ""  //这里输入要向服务器发送的请求消息

data = mysock.recv(512)  //这里将从服务器获得512个字节的信息，以字符串的形式返回。
```

```python
# 将服务器的文件当作本地文件来处理  
import urllib.request, urllib.parse, urllib.error  
fhand = urllib.request.urlopen("http://data.pr4e.org/romeo.txt")  
for line in fhand:  
    print(line.decode())
```