---
title: java笔记
tags:
  - java
  - 学习笔记
categories:
  - Java
abbrlink: 15279
date: 2025-07-15 16:30:00
---

# 1 基础知识

- java语言是解释型：其编译后的文件不能直接机器执行（例如c和cpp等编译型语言），需要通过解释器来执行。
- java文件需要通过编译形成class文件后才能被执行。并且可以在不同平台上运行。java的运行需要**JVM（java虚拟机）**，这就是其跨平台性的原因。
- JVM：一台虚拟计算机，具有指令集并使用不同的存储区域。负责执行指令，管理数据、内存、寄存器,包含在**JDK**中。
- JDK（java Development kit java开发工具包：包含**JRE（java runtime environment java运行环境，即JVM和java的核心类库）**和**java开发工具 （javac、java、javadoc、javap）**。

- 程序的入口有固定的格式

  ```java
  public static void main(string[] args)
  {
  }
  ```

- 一个源文件中只能有一个public类。对于一个.java文件，里面存在多个类的时候，编译后会对每个类生成对应的.class文件。并且每个源文件的名称必须与该文件的public类的名称相同。

- 该程序的入口方法main不一定必须在public类中，也可以在非public类中。在运行的时候分别指定的不同类。

- java二进制没有无符号数，运算的时候使用的是补码。结果显示的是原码。
- 

#  数据类型

- 基本数据类型： 数据值是存储在自己的空间中的。
- 引用数据类型：数据值是存储在其他空间中的，自己空间中存储的是地址值。 

# 注释

```java
//    单行注释
/**/ 多行注释
```

文档注释：注释内容可以被JDK提供的工具javadoc所解析，生成一套以网页文件形式体现的该程序的说明文档，一般写在类。在多行注释的第一个`/*`后面加上`*`

> javadoc 标签
>
> ```java
> /**
> * * @author ZhangSan
> * * @version 1.0
> *
> */
> ```
>

# 可变参数

- 格式：`数据类型...变量名`

- 注意：可变参数的底层实现是数组，因此可以将可变参数替换成数组。

- 例子:

  ```java
  public static int getSum(int... args){
      int sum = 0;
      for (int i: args) {
          sum += i;
      }
      return sum
  }
  ```

- 注意：

  - 形参中最多有一个可变参数
  - 除了可变参数以外还有其他参数的时候，必须把可变参数放到最后面。

#  java代码规范

1. 类、方法的注释要以javadoc的方式来写，即文档注释。其余注释给代码维护者来看，告诉他们为什么这样写，使用单行注释或者多行注释。
2. 运算符和`=`两边都要加空格。
3. 源文件使用utf-8的编码格式
4. 行宽不要超过80个字符
5. 类名首字母大写
6. 方法首字母不大写，后面的单词首字母大写
7. 包名：多单词组成时，所有字母均小写（其组成为字母加.）
8. 类名、接口：多单词组成时，所有字母首字母均要大写。
9. 对于变量名和方法名：多单词组成时，第一个单词首字母小写，其余单词首字母大写。
10. 常量名：所有字母都要大写，多单词时，各个单词由 _连接。

#   java API 文档

- JDK包含很多**包**，**包**中包含了**接口**、**类**、**异常**等。

- 类中包含了**字段**、**构造器**、**成员方法**。

该文档的使用方法：通过包找类，在类里面找方法。

## 方法的值传递

- 基本数据类型 ：传递的是变量的实际值，形参改变，不影响实际参数的值
- 隐隐数据类型：传递的是变量的地址，形参改变，影响实际参数的值

# 控制流程
## switch

- 一是跟普通cpp的switch一样的使用
- jdk12以后简化后的Switch

```java
switch(){
    case 字面量 -> {
        
    }
    case 字面量 -> {
        
    }
}
```
# 数组

- 数组的定义与初始化：`int[] array = new int[]{1, 2, 3}`. 简写格式:`int[] array = {1, 2, 3}`. 指定数组大小，让系统初始化里面的值:`int[] array = int[4]`
- 直接打印数组变量得到的是这个数组的地址值:`I@776ec8df`， 其中I表示int类型，@后面的数值表示地址值。
- 求数组的长度：`array.length`

# java的内存分配

- 栈：方法运行的时候使用的内存。基本数据类型的存放在栈上，对象的引用变量也在栈上（存放的是对象在堆上的地址值）。
- 堆：存储对象或数组，new创建的东西在堆上（对象是存放在堆上的）
- ![image-20230722131124561](assets/image-20230722131124561.png)
- 方法区：存储可以运行的class文件
- 本地方法栈：jvm使用操作系统功能的时候使用
- 寄存器

# java 包

## java.lang
- 该包是隐含在java中
```java
//类
String

Exception


Integer
parseInt("");//将一个字符串转化成整数。
intValue()//返回一个int类型的数据
longValue()
doubleValue()
toString()  //返回String类
Integer.parseInt(String str)//将某个字符串转化为int类型数据


Double.parseDouble(String str )

```
## util包

```java
import java.util.* // 引入包
StringTokenizer  //将一个字符串拆分，默认根据空格划分
StringTokenizer(String str)  
StringTokenizer(String str, String delim) //delim指的是根据什么字符串划分
boolean hasMoreTokens() //是否还剩划分的字符串
String nextToken()//字符串中下一个划分的字符串
int countTokens()  //返回剩下的token数目


```


## java.io
```java
import java.io.*; //引入包
//注意main函数有不同之处
public static void main(String[] args) throws IOException{

}

//用包中的类声明对象。
private static BufferedReader stdIn= new BufferedReader(new InputStreamReader(System.in));
private static PrintWriter stdOut = new PrintWriter(System.out,true);//当第二个参数为true的时候，输出自动刷新。自动刷新指不等待缓存区满了再将缓存区的信息传送到显示器上。
private static PrintWriter stdErr=new PrintWriter(System.err,true);
```
```java
//类中常用的方法
stdOut.println("");
stdOut.print(""); //后者不自动换行
stdErr.print("");//光标不换行
stdErr.flush();//刷新。print与flush配合
String input = stdIn.readLine();
```

# 对象与类

- 一个java文件只能有一个public类，可以有多个类。

## 标准的javaBeabn类

- 类名使用大驼峰方式，类名有意义
- 成员变量使用private修饰
- 至少提供两个构造方法，一个无参构造，一个带全部参数的构造。

- 应该提供`setXXX() getXXX()`的方法，用于获取成员变量的值，和设置成员变量的值。

## 成员变量的初始值

- 整数类型：0
- 浮点数：0.0
- boolean：false
- 引用数据类型：null

## 成员变量与局部变量的区别

![image-20230722141759394](assets/image-20230722141759394.png)

## 封装

- 方法应该属于哪一个类：如果某个类拥有完成某个职责所需要的所有信息，那么这个职责就应该分配给这个类来实现（信息专家模式） 

## 多态

多态实现的必要条件：

- 有继承关系
- 父类指向子类
- 子类中有方法的重写 

多态调用的规则：

- 调用成员变量：编译看左边，运行看左边（编译时，只看父类是否有该成员变量。运行时父类调用成员变量，看的是父类，而不是具体引用的子类）
- 调用成员方法：编译看左边，运行看右边（编译时，只看父类是否有该成员方法。运行时父类调用成员方法，看的是子类的方法，而不是父类的方法） 

## 初始化一个对象的步骤（内存图 ）

1. 加载class文件，将class类和里面的成员变量，成员方法加载到方法区
2. 申明局部变量，该对象的引用变量，将其放到栈上
3. 在堆内开辟一个空间，即该对象的空间。将方法区对应的class类和对应的成员变量拷贝到堆上。
4. 默认初始化，对该对象内部的成员变量默认初始化。
5. 显示初始化，如果该类的成员变量已经有初始值时，直接赋予该初始值
6. 构造方法初始化
7. 将堆内存中对象的地址赋值给栈上对应引用变量。

![image-20230722140807085](assets/image-20230722140807085.png)

​	

## final关键字

- 修饰方法：表示该方法是最终方法，不能够被重写
- 修饰类：表示最终类，不能够被继承
- 修饰变量:不能被改变，为常量。
  - 常量的命名：全部大写，单词之间用下划线隔开
  - final修饰基本数据类型，存储的值不能改变。修饰引用数据类型，存储的地址不能改变。

## 权限修饰符

- 一般只用private和public

![image-20230722165156408](assets/image-20230722165156408.png)

## 静态代码块

- 格式:`static{}`
- 随着类的加载而加载，自动触发，只执行一次



# 抽象类

- 抽象方法：从子类中提取出的共性的方法，但是不能在父类中确定方法体。格式:在方法定义前面加上abstract.
- 抽象类：类中存在至少一个抽象方法的类。格式：加上abstract
- 抽象类不一定有抽象方法，但是有抽象方法的一定是抽象类。
- 抽象类的子类要么重修父类的所有抽象方法，要么自身也是抽象类。

**抽象类抽象方法的意义**：父类中写了相应的抽象方法，则子类必须要这样写，以后调用子类方法的时候，只用看父类的方法定义即可。

# 接口

- 接口定义了一种行为，是行为的一个对象。
- 如果部分子类拥有一个相同的行为，但是另一部分没有该行为，那么如果在父类中定义了该行为的方法，那么没有该行为的子类将不能继承父类。因此定义一个接口，给拥有这个行为的子类指定了这个方法的规则。
- 如果只有某个特定的类拥有该行为，那么不必定义该行为的接口，因为直接在该特定类中定义这种行为的方法即可。

## 接口中的成员

- 成员变量
  - 只能为常量
  - `public static final `
- 没有构造方法
- 成员方法
  - 只能定义抽象方法（jdk7以前）。`public abstract`
  - 可以定义默认方法（jdk8） 
    - `public default`。
    - 解决了接口升级的时候（接口中添加新的方法），以前实现该接口的类立马报错的问题。
    - 当实现该方法的子类重写该方法的时候，需要去掉default关键字
    - 当实现多个接口的时候，这多个接口有相同的默认方法，子类必须对该默认方法重写。
  - 定义静态方法（jdk8）
    - `public static`
    - 静态方法只能通过接口名调用
    - 静态方法不能被重写，如果重写也只是子类中自己定义的方法。
  - 私有方法（jdk9）
    - `private` 给默认方法服务， `private static` 给静态方法服务。
    - 私有方法只提供给该接口使用，外类无法访问。
    - 解决的问题：接口中有重复的代码需要调用，因此定义了一个私有方法用于减少代码冗余，同时避免外部类的调用。

## 多个接口

- 当多个接口拥有相同方法的时候，实现的时候只用实现一次就行了。

# 内部类

- 定义：定义在一个类中的类
- 意义：内部类是外部类的一部分，内部类依赖于外部类，单独定义内部类的话是没有意义的。
- 内部类可以直接访问外部类的成员，外部类要访问内部类的成员，必须创建对象。

## 成员内部类

- 成员内部类的定义跟普通的类的定义相同，除了不能使用static修饰符
- 成员内部类的获取：
  - 一是外部类直接定义一个方法，提供内部类的对象
  - 或者`Outer.Inner test = new Outer().new Inner()`
- 成员内部类调用外部类的成员变量：`Outer.this.a`。Outer是外部类的类名，this指向该外部类自己，a是外部类的成员变量。

## 静态内部类

- 用static修饰
- 创建的方式：`Outer.Inner test =new Outer.Inner()`。new的是Inner。
- 调用静态内部类的方法：
  - 静态方法：`Outer.Inner.method()`
  - 非静态方法：创建内部类对象，再调用。

## 局部内部类（省略）

## 匿名内部类(重要)

- 格式：

  ```java
  new InterfaceOrSuperClass(){//大括号这一堆为匿名对象，前面的InterfaceOrSuperClass表示这个对象实现的接口或者父类。大括号里面重写了接口或者父类的方法
      overrride method();
  }
  ```

  



# 常用API

## java.lang.Object

### 方法

- `toString()`，子类需要重写

- `equals(Object test)`，子类需要重写

- `clone()`

  - 该类需要重写clone

    ```java
    protected Object clone() throws CloneNotSupportedException{
        return super.clone();//这是浅克隆
    }
    ```

  - 该类还要实现`Cloneable`接口，这是一个标记性接口，表示该类可以被克隆

## Objects

- 是一个工具类

### 方法

- `public static bolean equals(Object a, Object b)`，先判断a不为空，然后调用a的equals方法
- `public static bolean isNull(Object a)`
- `public static bolean nonNull(Object a)`

## BigInteger

### 构造方法

- `public BigInteger(int num, Random rnd)` 获取一个随机的大整数，范围为[0, 2的num次方-1]
- `public BigInteger(String val)` 获取一个指定的大整数
- `public static BigInteger valueOf(long val)`静态获取BigInteger对象。

### 方法

![image-20230723205440181](assets/image-20230723205440181.png)

## BigDecimal

- 一般通过字符串的形式构造对象：`public BigDecimal(String val)`
- 通过静态方法构造对象：`public static BigDecimal valueOf(long val)`//数字不超过double的取值范围使用这种方式

![image-20230723211607531](assets/image-20230723211607531.png)

## 正则表达式

![Screenshot_20230725_023648_tv.danmaku.bili](assets/Screenshot_20230725_023648_tv.danmaku.bili.jpg)

- 正则表达式的匹配

  ```java
  import java.util.regex.Mathcer;
  import java.util.regex.Pattern;
  
  ...
  Pattern p = Pattern.compile(正则表达式的字符串);
  Matcher m = p.matcher(原字符串);
  while(m.find()){//如果有匹配正则表达式的字符串
      String s = m.group();//将匹配的字符串返回   
      
  }
  ```

- 正则表达式的替换`replaceAll()`

  ```java
  //...
  String String.replaceAll(String regex, String replacement);
  //...
  ```

- 正则表达式的切割`split()`

  ```java
  //...
  Stirng s;
  String[]  String.split(String regex);//以正则表达式为分界，把除了正则表达式的字符串返回回来。
  ```

## 时间

### Date

- `Date()`创建date对象，时间为当前时间
- `Date(long date)` ，date表示距离起始时间（1970-1-1)的毫秒值。
- `setTime(long date)`
- `long getTime()`获取date对象时间的毫秒值
- date对象直接打印，是规范的时间格式

### SimpleDateFormat

解决date对象只能按照默认的格式打印的问题

```java
//...
SimpleDateFormat sdf = new SimpelDateFormat();//默认格式
Date d = new Date();
String s = sdf.format(d);
SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");使用指定格式 
Date date = sdf1.parse("2021-12-4 12:23:12");//将一个时间的字符串(符合指定的时间格式),转化为一个date对象
```

### Calendar

- `public static Calendar getInstance()`获取当前的日历对象
- `public final Date getTime()`
- `public final setTime(Date date)`设置对应的时间
- `public long getTimeInMillis()`
- `public void setTimeInMillis(long millis)`
- `int get(int field)`根据field（field的值表示纪元、年、月、日等，field用常量表示），返回对应的值。
- `void set(int field, int value)`设置日历中对应字段的值

![image-20230725120402546](assets/image-20230725120402546.png)

### ZoneId

- ZoneId 对象直接打印，是打印对应的时区。
- `ZoneId zoneId = ZoneId.systemDefault()`返回系统的时区
- `ZoneId ZoneId.of("指定时区")`

### Instance 时间戳

- `Instance Instance.now()`
- 时间戳也可以直接打印
- `Instance Instance.ofEpochMilli(long millis)`返回一个时间戳，该时间是相对于初始时间过去了多少分钟
- `Instance Instance.ofEpochSecond(long second)`返回一个时间戳，该时间是相对于初始时间过去了多少秒
- `Instance Instance.ofEpochMilli(long second, long nanosecond)`返回一个时间戳，该时间是相对于初始时间过去了多少秒，多少纳秒
- `atZone(ZoneId zoneId)`
- `boolean isAfter(Instance instance)`
- `Instance minusSecond(long second)`在当前时间减去多少秒

### ZonedDateTime

### DateTimeFormatter

- `DateTimeFormatter DateTimeFormmater.ofPattern("时间格式")`
- `String format(ZonedDateTime time)`

### LocalDate

- `LocalDate LocalDate.now()`
- `LocalDate LocalDate.of(int year, int month, int day)`
- `int getYear()`
- `Month getMonth()`
- `int getMonthValue()`
- `int getDayOfMonth`
- `DayOfWeek getDayOfWeek()`

### LocalTime

- `int getHour()`
- `int getMinute()`
- `int getSecond()`

## 包装类

基本数据类型的引用类型

- `Byte Short Character Integer Long Float Double Boolean`
- 获取对象：`Integer Integer.valueOf(int num)`
- 自动拆箱，自动装箱：`Integer test = 1 + 2`自动转化为Integer。`Integer i3 = (Integer)i2 + (Integer)i1`先自动将integer转化为int，相加后转化为Integer。
- `Integer Integer.parseInt(String num)`

# lambda 表达式

- 简化匿名内部类

- `()->{}`小括号表示形参，大括号包含方法体
- lambda表达式只能简化函数式接口（有且只有一个抽象方法的接口叫做函数式接口）

# 集合

- collection(单列接口)
  - List（接口）
    - ArrayList
    - LinkedList
    - Vector（淘汰了）
  - Set（接口）
    - HashSet
      - LinkedHashSet
    - TreeSet

List集合都是有序（存放的顺序）、可重复、有索引

Set集合是无序、不重复、无索引

## Collection（单列集合）

方法：

- `public boolean add(E e)`
- `public void clear()`
- `public boolean remove(Object obj)`
- `public boolean contains(Object obj) ` 底层实现依赖对象的equals方法来判断是否存在
- `public boolean isEmpty()`
- `public int size()`
- `public Iterator iterator()`返回迭代器

遍历方式：

- 迭代器:
  - `boolean hasNext()`判断当前位置是否有元素
  - `E next()` 获取当前位置的元素，并将迭代器移动到下一个位置。
  - 并且迭代器遍历的时候，不能用集合的方法增删。
  - `remove()`删除当前位置的元素，并且将迭代器移动到下一个位置
- 增强for遍历：
  - 所有的单列集合和数组才能用这种方式
  - `for(E e: collection){}`
- lambda表达式：
  - `collection.forEach(s->{处理每个元素})`，s表示集合中的每一个元素。

### List

- 特有的方法： 
  - `void add(int index, E element)`
  - `E remove(int index)`
  - `E set(int index, E element)`
  - `E get(int index)`

#### ArrayList

- `public boolean add(E e)`
- `public void clear()`
- `public boolean remove(Object obj)`
- `public boolean contains(Object obj) ` 底层实现依赖对象的equals方法来判断是否存在
- `public boolean isEmpty()`
- `public int size()`
- `public Iterator iterator()`返回迭代器
- `void add(int index, E element)`
- `E remove(int index)`
- `E set(int index, E element)`
- `E get(int index)`

- 底层是数组：
- 空参创建集合的时候，底层创建一个默认长度为0的数组。
- 添加第一个元素的时候，底层创建一个新的长度为10的数组。
- 存满后，扩容1.5倍
- 如果一次添加多个元素，超过了1.5倍的空间，则创建的数组长度以元素个数为准。

#### LinkedList

- 底层是双向链表

特有方法：

- `public void addFirst(E e)`
- `public void addLast(E e)`
- `public E getFirst()`
- `public E getLast()`
- `public E removeFirst()`
- `public E removeLast()`

### Set

#### HashSet

- 特点：无序、不重复、无索引	

- 底层是哈希表（jdk8以后，哈希表是由数组＋链表+红黑树构成）
- 哈希值：
  - 每个对象通过哈希函数(hashCode)算出来的一个整数值。
  - 该方法定义在Object类中，所有对象都能调用，默认使用地址值来进行计算的。
  - 一般要重写对象的hasCode方法，利用对象内部的属性值来计算哈希值。
- 构建哈希表的过程：
  - 计算对象的哈希值
  - 找到对应的数组位置，如果该位置为空，则将该对象放在这个位置，如果不为空，则通过这个对象的equals方法判断这个是否存在跟这个对象相等的对象。如果有，则不加入，如果链表中没有相等的对象，则将这个对象加入到链表的尾部。
  - 当链表长度超过8，并且数组长度大于64时，链表自动转化成红黑树。
  - 因此构建哈希表的时候，必须重写自定义对象的hashCode和equals方法。

#### LinkedHashSet

- 特点：有序（存取顺序相同）、不重复、无索引
- 底层原理：底层数据结构是哈希表，每个元素多了一个双链表的机制记录存储的顺序。
- 当需要去重且存取有序的时候才使用LinkedHashSet

#### TreeSet

- 不重复、无索引、可排序（默认从小到大排序）
- 底层基于红黑树实现排序的			
- 对于自定义类型，排序方式：
  - 实现Comparable接口
  - 传递比较器Comparator指定排序规则

## Map(双列集合)

常用api：

- `V put(K key, V value)`,put的返回值是指，当有重复键加入的时候，之前的旧值被替换为新值，然后返回旧值。
- `V remove(Object key)`
- `void clear()`
- `boolean containsKey(Object key)`
- `boolean containsValue(Object value)`
- `boolean isEmpty()`
- `int size()` 
- `V get(K key)`

### Map的遍历方式

1. ```java
   map.keySet()//返回所有键的set集合
   map.get("键");//返回值
   ```

2. ```java
   map.entrySet();//返回Set<Map.Entry<>>类型
   entry.getKey();//每个entry对应一个键值对
   entry.getValue();
   ```

3. 

   ```java
   map.forEach((key, value) -> {do something})
   ```

### HashMap

- 无序、不重复、无索引

- 底层实现是哈希表
- HashMap的键如果是对象，要重写对象的hashCode和equals方法，因为在添加键值对的时候是通过键来比较的。

#### HashMap的底层原理



### LinkedHashMap

- 有序、不重复、无索引
- 底层是在哈希表的基础上加上了双链表的机制存储了记录的顺序

### TreeMap

- 底层是红黑树
- 不重复、无索引、可排序
- 添加的时候顺序默认是键的升序，或者自定义比较方式

## 自定义比较器

- 传递Comparato比较对象

  ```java
  TreeMap<Integer, String> tm = new TreeMap<>(new Comparator<Integer>() {
              @Override
              public int compare(Integer o1, Integer o2) {
                  return o2 - o1;
              }
          });
  ```

  

- 自定义类的比较器写法：

  ```java
  public class Student implements Comparable<Student>{
      @Override
      public int compareTo(Student o) {//o表示已经在集合中的元素,this表示要添加到集合中的元素
          return 0;
      }
  }
  ```

  

## 集合的使用场景

- 单列集合

  - 元素可重复，使用ArrayList

  - 元素可重复，并且增删操作多于查询操作，使用LinkedList

  - 元素去重，使用HashSet


- 双列集合
  - 一般使用`HashMap`效率最高
  - 元素去重，且保持存取顺序，使用LinkedHashSet
  - 对元素排序，使用TreeSet

## Collections工具类

- `java.util.Collections`
- 常用方法
  - `public static <T> boolean addAll(Collection<T> c, T...elements)` 批量添加元素
  - `public static void shuffle(List<?> list)` 打乱List的顺序
  - `public static <T> void sort(List<T> list)` 
  - `public static <T> void sort(List<T> list, Comparator<T> c)`
  - `public static <T> int binarySearch(List<T> list, T key)`
  - `public static <T> void copy(List<T> dest, List<T> src)`
  - `public static <T> T max/min(Collection<T> coll)`
  - `public static <T> void swap(List<?> list, int i, int j) `

# 泛型

- 解决的问题：同一了数据类型，把运行时可能遇到的问题提前到了编译阶段。
- 如果不写泛型，那么默认类型是Object

## 泛型类

- 格式：`修饰符 class 类名<T>{}`一般用T(type)、E(element)、K（key）、V（value）代替。

## 泛型方法

- 仅仅只有该方法中有未知的数据类型
- 格式：`修饰符 <T>返回值 方法名(){}`

## 泛型接口

- 使用方式：
  - 实现类给出具体类型
  - 实现类继续延续泛型

- 格式：`修饰符 interface 接口名<e>{}`



# Stream 流

- 流的三个步骤：产生流、中间处理流、终结流

- 产生流：
  - 单列集合：`直接调用内部的stream()方法返回一条流，然后对流进行处理`
  - 双列集合：`没有产生流的方法，只能先产生单列集合，再对单列集合进行操作`
  - 数组：`使用Arrays.stream(arr),arr为数组`
  - 同种数据类型的零散数据：`Stream.of(T... values)返回零散数据values的流`
  
- 中间方法：
  - ```java
    .filter(e -> {
      //这里的e为流中的每一个元素
      if () {//e满足某个要求返回true，表示留下这个元素，返回false表示丢弃
          return true;
      }
    })
    ```
  
  - ```java
    .limit(n);//获取流中的前n个元素
    ```
  
  - ```java
    .skip(n);//跳过前n个元素
    ```
  
  - ```java
    .distinct()//去重
    ```
  
  - ```java
    Stream.concat(s1, s2); //合并两个流 
    ```
  
  - ```java
    .map(s -> {返回转化类型后的元素});//s为流中的每一个元素,该方法将原来流中的元素转化成新的类型
    ```
  
    
  
  - **注意**：
    - 流使用中间方法产生新的流后，之前的流将被关闭，因此没必要使用中间变量去存储流，而是采用链式编程。
    - 修改流中的数据，不会影响产生流的源数据
  
- 终结方法：

  - 遍历：

    ```java
    .forEach(s -> 对每个元素进行处理);//s为流中的每一个元素
    ```

  - 计数

    ```java
    .count();返回流中元素的数量
    ```

  - 收集数据

    - ```java
      .toArray(value -> new Object[value]);//value指的是流中的元素的个数，返回值是对应类型的的数组，数组大小必须跟流的元素的个数相同。
      ```

    - ```java
      .collect(Collectors.toList());//将所有流中的数据收集到list集合当中
      .collect(Collectors.toSet());//这样可以直接将之前集合中的元素直接去重
      .collect(Collectors.toMap(s -> 返回的键, s -> 返回的值));//s表是流中的每一个元素，返回的键和值，表示对元素处理后返回每个元素对应的键和值。
      ```



# 方法的引用

- 解释：在使用抽象方法的地方（亦或是简化后的用lambda表达式），使用已有的方法进行替代，这个方法表示该抽象方法的方法体。
- 需要满足的条件：
  - 引用处必须是函数式接口
  - 该方法必须与该处的原本方法的参数与返回值一致

## 引用静态方法

- 调用方法：`类名::方法名`，`::`是方法引用符号
- 一般引用的方法是已经存在的，即java库中的方法

## 引用成员方法

- 调用方法：(一般自定义方法 )
  - 其他类：`其他类对象::方法名`
  - 本类：`this::方法名`
  - 父类：`super::方法名`

## 引用构造方法

- 目的是创建对象：`类名::new`创建对象
- 使用方法：该构造方法不用管返回值，因为默认的返回值就是这个类的对象，构造方法的形参跟原方法的形参一致，构造方法的处理过程也要跟原方法一致。

 ## 类名引用成员方法

- 这时候，这个类的类型必须跟原方法的第一个参数的类型一致。比如：`fun(String)`只能使用`String::someFun()`来替代，不能使用其他的类。
- 引用的方法的参数应该从原方法的第二个参数开始匹配。
- 相当于原来的这个参数调用了这个类的方法

## 引用数组的构造方法

- 使用方法：`数据类型[]::new`，创建一个数组

# 异常

- 异常的作用

  - 查询bug的关键信息 
  - 作为方法内部的特殊返回值， 通知调用者底层的执行情况（当调用者调用方法时，如果出现异常，方法将抛出异常供调用者参考，要么处理异常，要么继续抛出异常）

- 异常的处理方式：

  - 默认虚拟机自己处理（没有自己捕获异常的话，那么虚拟机将自己捕获该异常，并且在异常处终止程序的执行）
  - `使用try-catch语句进行处理`（不同于默认的处理方式，捕获异常后，程序将继续执行），catch没有捕获到的异常将采用默认的处理方式进行处理。
  - 抛出异常：（使用这种方式的意义是，当遇到某个异常并且已经没有必要再继续执行下去了，就直接抛出这个异常，并告诉调用者）![image-20230920092419696](C:\Users\www15\Nutstore\1\notes\java\assets\image-20230920092419696.png)

- `try-catch`的处理流程：

  ```java
  try {
      语句;//当某个位置产生异常的时候，直接跳到catch语句中，try块后面的代码将不再执行。
      语句;
  }catch (异常类型1 | 异常类型3) {//jdk7以后，当有多个异常的处理方案相同的时候，可以使用|将多个异常写在一起
      //处理异常后将跳出try-catch块，继续执行其他代码
  }catch (异常类型2) {
      
  }catch (异常类型3) {//如果该异常类型是上面异常类型的父类，那么必须将这个catch块写在子类的下面。
  
  }
  ```

- 常用的异常处理的方法：`public void .printStackTrace()`将异常的信息打印在控制台。

- 自定义异常(意义是为了让控制台的报错信息更加见名知意)

  ```java
  public class 异常名 extends 父类异常 {//运行时异常:RuntimeException, 编译时异常:Exception
      public 异常名() {
          
      }
      public 异常名(String message) {
          super(message);
      }
  }
  ```
  
- try-catch-finally语法：

  ```java
  try {
      
  }catch () {
      
  }finally {//finally代码块中的代码一定被执行
      
  }
  ```

  

# 文件处理(java.io.*)

## 构造方法

- `File f = new File("路径");`
- `File f  = new File("父路径", "子路径");`将两个路径拼接成一个路径，相当于给两个路径的字符串中间加上了分隔符然后拼接在一起
- `File f = new File(fatherFile, "子文件或者文件夹的名称");`将父路径和子文件的名称拼接形成新的文件对象

## 常见的成员方法

- 获取和判断的方法

  ```java
  boolean isDirectory();
  boolean isFile();
  boolean exists();
  long length(); //返回文件的字节大小
  String getAbsolutePath();
  String getName();//返回文件的名称，带后缀
  long lastModified();//最后的修改时间
  
  ```

- 创建和删除

  ```java
  boolean createNewFile();//f.createNewFile();如果f对应位置不存在文件，调用这个方法就能创建对应的文件。如果已经存在这个文件，那么创建失败返回false。并且该文件的父级路径必须存在。
  boolean mkdir();//同样跟createNewFile()一样，是在对应的位置创建文件夹（注意：windows下文件夹和文件的名字不能重复，路径必须是唯一的）。
  boolean mkdirs();//可以创建多级文件夹
  boolean delete();//删除文件和空的文件夹
  ```

- 获取和遍历:`File[] listFiles()`

  注意：文件路径不存在、文件路径是文件、没有访问权限的文件夹都返回null

# IO流

- 用于读写文件中的数据

## 分类

- 按文件类型：
  - 字符流
  - 字节流
- 按读写：
  - 输入流
  - 输出流

## 字节流

### 字节输出流

- 基本使用：

```java
FileOutputStream fos = new FileOutputStream("test.txt"); //这里既可以使用File参数也可以直接字符串指定路径，该路径不存在对应文件的时候，会自动创建对应的文件，但是不能多级创建。如果文件已经存在，那么会清空之前的文件内容
fos.write(98);//参数是整数，那么写到文件上的是其对应的ascii码
fos.close();
```

创建对象：

- `new FileOutputStream("filePath", true);//第二个参数表示是否打开续写`

写入：

- `write(int b)`
- `write(byte[] b);//配合str.getBytes()，可以将字符串转化为字节数组`
- `write(byte[], int startIndex, int len)`写入字节数组的部分数据

### 字节输入流

- 读取：
  - `read()`每次读取一个字节并返回对应的ASCII值，并移动到下一个字节准备读取，如果读到了末尾，返回-1.
  - `read(byte[] b)`将读取很多字节，尽可能将该数组填满，并返回读取到的字节的数量 
  - `new String(byte[] b)`将字节数组转化为对应的字符串(按照默认的编码方式)
  - `new String(byte[] b, int startIndex, int len)`字符串另一个构造方法

## 字符流

- 相比于字节流，字符流是有缓冲区的。

### 字符输入流

- 创建对象：`FileReader fin = new FileRader("file path", Charset.forName("字符编码"));`
- 读取数据：
  - `int read()`一次读取一个字节，如果遇到中文，一次读取多个字节，并返回对应的int数值。读到了末尾返回-1.
  - `int read(char[] buffer)`

### 字符输出流

- 创建对象：`FileWriter("file path", Charset.forName("字符编码"));`
- 输出：
  - `write(int c)`写入一个字符
  - `write(String str)`写入字符串

## 高级流

对基本流的封装（`FileInputStream FileOutputStream FileReader FileWriter`）

### 字节缓冲流

- 就是对字节输出输入流的一个包装
- 用于提高输入输出的效率

```java
public BufferedInputStream(InputStream is);//这里的InputStream指的是基本流，一般使用FileInputStream作为参数
public BufferedOutputStream(OutputStream os);//同理这里的os用FileOutputStream
```

写入写出：`read() write()`跟基本的字节流使用方式相同

### 字符缓冲流

- 对字符输出输入流的包装
- 相比于字节缓冲流，主要目的不是为了提高传输效率。而是其中特有的方法。

```java
public BufferedReader(Reader r);
public BufferedWriter(Writer w);
```

- 输入流特有的方法：
  - `public String readLine()`每次读取一行数据，并且不会读取换行符。如果没有数据可读取的话则返回`null`
- 输出流特有的方法：
  - `public void newLine()`一个跨平台的换行

### 转化流

- 输入流`InputStreamReader`将字节流转化为字符流

  ```java
  InputStreamReader(InputStream("file path"));
  .read();//本质上转化流就是字符流，直接使用字符流的方法
  ```

  

- 输出流`OutputStreamWriter`将字节输出流转化为字符输出流

  ```java
  OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("file path"), "字符编码");//淘汰了，用FileWriter来指定字符编码
  ```

### 序列化流

- 序列化流的用途:相当于给保存的数据加密，是字节流的包装类

- 序列化流：`ObjectOuputStream`:

  ```java
   ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("test.txt"));
   Student stu = new Student("jack", 11);
   oos.writeObject(stu);//这里的stu对象必须实现Serializable接口，该接口没有任何抽象方法，被称为标记型接口,实现了这个接口的对象表示可以被对象输出流写到文件中
  
  ```

- 反序列化流:`ObjectInputStream`:

  ```java
     ObjectInputStream ois = new ObjectInputStream(new FileInputStream("test.txt"));
     Object o = ois.readObject();
     System.out.println(o);
  ```

- 在序列化和反序列化的时候，要保证类的序列号一致。`即设置类中的成员变量private static final long serialVersionUID = 1233545L`。否则反序列化会抛出异常

- 一般序列化对象的时候，是将所有对象放到列表中，然后将该列表序列化，这样避免了反序列化的时候不知道对象的个数

### 打印流

- 打印流只能写，不能读。

- 字节打印流

  ```java
  PrintStream ps =   new PrintStream(new FileOutputStream("test.txt"));
  ps.println("test");
  ```

  

- 字符打印流

  ```java
  PrintWriter pw = new PrintWriter(new FileWriter("test.txt"));
  pw.println("english words test");
  ```

### 压缩流

- 是字节流的包装类

- 解压

  ```java
  ZipInputStream zip = new ZipInputStream(new FileInputStream("outer.zip"));
  ZipEntry file;//
  while ((file = zip.getNextEntry()) != null) {
  System.out.println(file);
  }
  ```

- 压缩

  ```java
  ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(new File("test.zip")));//要创建的压缩包的名称
  ZipEntry src = new ZipEntry("test.txt");//ZipEntry表示要在压缩包中创建的文件或者文件夹，可以多级创建。
  zos.putNextEntry(src);//将要创建的文件和文件夹放到压缩包中
  zos.closeEntry();
  zos.close();            
  ```

  

## 资源释放

```java
创建io流对象1;
创建io流对象2;
try (io流1, io流2) {//当io流对象实现了AutoCloseable接口后，通过该语句能自动释放申请的io资源。jdk9
    
}catch () {
    
}
```

## 常用的IO工具包

- Commons-io
- Huto

# 多线程

## 并发和并行

- 并发：多条指令交替执行
- 并行：多条指令在多个CPU上同时执行

## 多线程的实现方式

- 继承Thread类：

  ```java
  public class MyThread extends Thread {//继承Thread类
      public void run() {//重写run方法
          System.out.println("print lines in my thread");
      }
  public static void main(String[] args) {
          MyThread t = new MyThread();
          t.start();//调用该类中的start方法才能启动线程
      }
  }
  ```

- 实现Runnable接口：

  ```java
  public class MyRunnable implements Runnable {//继承Thread类
      public void run() {//重写run方法
          for (int i = 0; i < 10; i++) {
              System.out.println("print" + i);
          }
      }
      public static void main(String[] args) {
          MyRunnable mr = new MyRunnable();//创建Runnable对象
          new Thread(t).start();//创建一个匿名Thread类，将实现了Runnable的接口作为参数，然后运行start方法开启线程。
          new Thread(t).start();
      }
  }
  ```

- 利用Callable接口和Future接口方式实现(前面两种方式无法获取线程运行的返回值`void run()`)：

  ```java
  public class MyCallable implements Callable<Integer>  {//Callable类的泛型类型为该线程运行后的返回值类型
      public Integer call() throws Exception{
           int i = 0;
           while (i++ < 100) {
              int c = i;
              Thread.sleep(1);
           }
           return i;
      }
      public static void main(String[] args) throws InterruptedException, ExecutionException {
          MyCallable mc = new MyCallable();
          FutureTask<Integer> ft = new FutureTask<Integer>(mc);//创建FutureTask管理多线程运行的结果，该类的泛型类型为返回值的类型
          Thread t1 = new Thread(ft);
          t1.start();
          int result = ft.get();//结果显示调用get()方法的时候，线程会阻塞主线程
          System.out.println(result);
          System.out.println("在获取多线程结果之后的打印输出");
      }
  }
  
  ```

## Thread类中的常用方法

```java
String getName();//Thread线程的默认名字是Thread-X，X为序号，从0开始
void setName();
public static Thread currentThread();
public static void sleep(long time);//时间为毫秒
setPriority(int newPriority);//设置线程的优先级，最小是1，最大是10
final int getPriority();
final void setDaemon(boolean on);//守护线程
public static void yield();//出让线程
public static void join();//插入线程
```

### 线程的优先级

- 优先级越大的线程，抢占CPU资源的概率就越大。默认的优先级是5。Main线程的优先级也是5

### 守护线程

- 当其他非守护执行完毕后，守护线程才会陆续结束，即使守护线程还没有执行完毕。
- 相当于非守护线程执行完毕后，守护线程将没有存在的必要

### 出让线程

- 出让当前线程对CPU的执行权

### 插入线程

- 将某个线程插入到另一个线程之前，被插入的线程必须等插入的线程执行完毕后才能继续执行
- 比如：在a线程执行中，调用b线程的`join()`方法，那么b线程将插入到a线程中。

## 线程的生命周期

![image-20230927092842196](assets/image-20230927092842196.png)

## 线程安全

### 同步代码块

- 线程轮流执行该代码块，当一个线程执行该代码块的时候，其他同类线程不能执行该部分的代码

- 实现：

  ```java
  public class Test extends Thread {
      static Object lock = new Object();
      public void run() {
          synchronized(lock) {//这里的锁对象可以为任意对象，但是要保证线程拥有的这把锁是唯一的。可以使用Test.class()，即当前类的Class对象，该对象是唯一的。
              //do something
          }
      }
      public static void main(String[] args) {
          
      }
  }
  ```

### 同步方法

- 将该方法锁起来，被锁起来的方法叫做同步方法
- 实现：`修饰符 synchronized 返回值 方法名() {}`.非静态方法的锁对象是`this`，静态方法的锁对象是当前类的字节码对象。

### 多线程中应该使用StringBuffer代替StringBuilder，保证线程安全。

单线程使用`StringBuilder`，多线程使用`StringBuffer`

### Lock锁对象

- 相比较于`synchronized`这种方法，使用`Lock`锁对象能够手动上锁和释放锁

- 实现：

  ```java
  public class Test extends Thread {
      static Lock lock = new ReentrantLock();
      private static int num = 0;
  
      public Test(String name) {
          super(name);
      }
  
      public void run() {
  
          // do something
          while (true) {
              lock.lock();
              try {
                  if (num < 100) {
                      System.out.println("thread" + this.getName() + "print" + num++);
                      Thread.sleep(10);
                  } else {
                      break;
                  }
              } catch (Exception e) {
                  e.printStackTrace();
              }finally {
                  lock.unlock();//这样保证了无论线程是结束还是执行完一次循环，都能将锁给释放掉，避免其他线程一直等待锁
              }
          }
  
      }
  ```

## 死锁（见操作系统知识）

- 写多线程的时候避免两个锁嵌套

## 等待唤醒机制（生产者消费者）

 ```java
 public class Desk {
     public static int foodFlag = 0; //表示桌子是否有面条
     public static int count = 10;
     public static Object lock = new Object();
     
 }
 
 
 
 
 public class Cook extends Thread{
 
     public void run() {
         while (true) {
             synchronized(Desk.lock) {
                 if (Desk.count == 0) {
                     break;
                 }else {
                     if (Desk.foodFlag != 0) {
                         try {
                             Desk.lock.wait();
                         } catch (InterruptedException e) {
                             // TODO Auto-generated catch block
                             e.printStackTrace();
                         }
                     }else {
                         System.out.println("cooking");
                         Desk.foodFlag = 1;
                         Desk.lock.notifyAll();
                     }
                 }
             }
         }
     }
 }
 
 
 
 public class Eating extends Thread{
     public void run() {
         while (true) {
             synchronized(Desk.lock) {
                 if (Desk.count == 0) {
                     break;
                 }else {
                     if (Desk.foodFlag == 0) {
                         try {
                             Desk.lock.wait();
                         } catch (InterruptedException e) {
                             // TODO Auto-generated catch block
                             e.printStackTrace();
                         }
                         Desk.lock.notifyAll();
                     }else {
                         System.out.println("eating noodles");
                         Desk.lock.notifyAll();
                         Desk.count--;
                         Desk.foodFlag = 0;
                     }
                 }
             }
         }
     }
 }
 
 ```

## 阻塞队列

```java
public class Eating extends Thread{
    ArrayBlockingQueue queue;
    public Eating(ArrayBlockingQueue queue) {
        this.queue = queue;
    }
    public void run() {
        while (true) {
            try {
                queue.take();
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Cook extends Thread{
    ArrayBlockingQueue  queue;
    public Cook(ArrayBlockingQueue queue) {
        this.queue = queue;
    }  
    public void run() {
        while (true) {
            try {
                queue.put("");//queue调用put方法的时候，里面是加锁了的,但是在这个方法外面是没有加锁的
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}


public class Test {
    public static void main(String[] args) {
    ArrayBlockingQueue queue = new ArrayBlockingQueue<>(2);
    Cook c = new Cook(queue);
    Eating e = new Eating(queue);
    c.start();
    e.start();
    }
}
```

## 线程池

### 线程池的使用

```java
		ExecutorService pool = Executors.newCachedThreadPool();//创建一个没有上限的线程池
        pool = Executors.newFixedThreadPool(100);//创建一个有上限的线程池。提交任务的时候，如果池子中没有空闲线程，也不能继续创建新的线程后，那么线程池就会等待其他线程执行完毕
        pool.submit(new Test());//提交一个runnable对象作为线程池要创建的线程任务.提交后线程池会选择空闲的线程来执行，如果没有空闲的线程，那么就会创建一个新的线程,并将其放到线程池中.
        pool.shutdown();//用完后销毁线程池
```

### 自定义线程池

- 执行流程：
  - 当核心线程数量有空闲的时候，添加的任务将被分配给核心线程
  - 当核心线程不够的时候，任务将被添加到队列中
  - 队列满了将分配临时线程给任务
  - 全都分配完了以后将根据任务拒绝策略进一步执行

```java
public class MyThreadPool {
    int corePoolSize = 3;
    int maximumPoolSize = 5;
    long keepAliveTime = 60;
    TimeUnit unit = TimeUnit.SECONDS;
    ArrayBlockingQueue queue = new ArrayBlockingQueue<>(3);


    ThreadPoolExecutor pool = new ThreadPoolExecutor(
        corePoolSize,
        maximumPoolSize,
        keepAliveTime,
        unit,
        queue,
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.AbortPolicy()
        );
        /*corePoolSize核心线程数量，maximumPoolSize最大线程数量（多余核心线程的那部分是），keepAliveTime是空闲线程多少时间没有工作就被销毁
    unit为时间的单位,一般使用TimeUnits.SECOND,queue是任务队列，下一个参数是创建线程工厂，最后一个参数是任务的拒绝策略*/
    }

```

- 线程池的建议大小：
  - CPU密集型计算（计算多于数据读写）：线程池的大小为计算机的总线程数量（最大并行数量）加1
  - I/O密集型计算（读取数据库的时间很多）：$线程池的大小=最大并行数*期望CPU利用率*\frac{总时间（CPU时间+等待时间}{CPU计算时间}$

# 网络编程

## UDP通信

发送数据：

```java
		DatagramSocket ds = new DatagramSocket(8000);//创建套接字，并且绑定端口，如果没有指定端口，那么绑定的端口是随机的
        byte[] msg = "test message".getBytes();//要发送的信息
        InetAddress address = InetAddress.getByName("127.0.0.1");//创建目的IP类
        int port = 8086;
        DatagramPacket dp = new DatagramPacket(msg, msg.length, address, port);//打包数据
        ds.send(dp);//发送数据
        ds.close();//释放资源
```

接受数据：

```java
        DatagramSocket ds = new DatagramSocket(8086);//创建udp套接字
        byte[] datas = new byte[100];
        DatagramPacket dp = new DatagramPacket(datas, datas.length);//创建数据包用于接受
        ds.receive(dp);//接受数据并将数据放到数据包中
        int len = dp.getLength();//获取数据的大小
        InetAddress from = dp.getAddress();
        int port = dp.getPort();

        System.out.println("receive data:" + new String(datas, 0, datas.length) + " from IP:" + from.toString() + " port:" + port);

```

## TCP通信

- 服务端：

  ```java
  ServerSocket ss = new ServerSocket(7880);//建立服务端套接字，绑定自己的端口
  Socket socket = ss.accept();//监听该端口，返回接受到的socket连接
  InputStream in = socket.getInputStream();
  int b;
  while ((b = in.read()) != -1) {
      System.out.println((char)b);
  }
  in.close();
  socket.close();//关闭了与客户端的连接
  ss.close();//关闭了服务器
  ```

- 客户端：

  ```java
  Socket socket = new Socket("127.0.0.1", 7880);//创建套接字，参数为要连接的服务器的地址
  OutputStream os = socket.getOutputStream();//获取输出流
  os.write("中文编码问题".getBytes());//向输出流写入数据
  
  os.close();//关闭输出流,流可以不管，因为关闭socket套接字的时候已经自动关闭了输出流
  socket.close();//关闭套接字	
  
  ```

- 输出信息的结束标记`socket.shutdownOutput()`

# 反射

- 通过反射可以获取类中的所有信息（成员方法、成员变量、构造方法）

## 获取Class对象

- `Class.forName("类名")`,最常用的方式
- `类名.class`，一般作为参数进行传递
- `对象.getClass()`

## 获取信息

### 构造方法

- 获取构造方法：

  ```java
  Constructor[] getConstructors();//获取所有公共的构造方法
  Constructor[] getDeclaredConstructors();//加了Declared表示所有的构造方法，不局限于公共
  Constructor getConstructor();//获取单个,加上Declared表示所有。
  Constructor getConstructor(Class<?> ...);//匹配对应的参数类型，参数必须是字节码类型,可以是多个参数。比如String.class, int.class
  ```

- 获取的构造对象的用途：

  ```java
     public static void main(String[] args) throws NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
      Class c = String.class;
      Constructor con = c.getConstructor();
      int modifier = con.getModifiers();//获取该构造方法的权限，1为public,2为私有,4为保护
      Parameter[] parameters = con.getParameters();//获取该构造方法的参数
      for (Parameter p: parameters) {
          System.out.println(p);
      }
      con.setAccessible(true);//临时取消该构造方法的权限检测，即使是私有方法也能调用
      String str = (String)con.newInstance();//调用newInstance方法可以用这个构造方法类来构造新的对象
      System.out.println(str);
  
     } 
  ```

### 成员变量

- 获取：

  ```java
  Field[] getFields();
  Field[] getDeclaredFields();
  Field getField(String name);//name 为成员变量的名称
  Field getDeclaredField(String name);
  ```

- 使用

  ```java
      Class c = Test.class;
      Field[] fs = c.getFields();
      Field f = fs[0];
      int modifier = f.getModifiers();//获取访问权限
      System.out.println(modifier);
      f.getName();//返回该成员变量的名称
      f.getType();//获取成员变量的数据类型
      System.out.println(f.getType());
      Test test = new Test();
      Object o = f.get(test);//获取这个对象该成员变量的值
      f.set(test,  100);//设置这个对象该成员函数的值
  ```

### 成员方法

- 获取：

  ```java
  Method[] getMethods();
  Method[] getDeclaredMethods();
  Method getMethod(String name, Class<?>...parameterTypes);//name为方法名，后面的参数为对应参数类型的class
  ```

- 使用：

  ```java
  Class c = Test.class;
      Method m = c.getMethod("getNum", int.class);
      int modifier = m.getModifiers();
      String name = m.getName();//获取方法名字
      Parameter[] parameters = m.getParameters();//获取参数
      m.getExceptionTypes();//返回异常的类型
      m.invoke(new Test(), 10);//调用该方法，第一个参数是这个类的对象，后面的参数是这个方法的参数
  ```

# 动态代理

- 作用：给类中的某些方法增加一些功能，而不用更改原来的方法

- 实现：

  ```java
  //被代理的方法
  public class BigStar implements Star{
      public void sing(String name) {
          System.out.println(name + " is sing");
      }
  }
  
  
  //要更改的方法，放在这个接口中
  public interface Star {
      public void sing(String name);
  }
  
  
  //代理的生成类
  public class ProxyUtil {
      public static Star createProxy(BigStar bs) {// 给一个对象创建代理,参数是被代理的对象
          Star s = (Star) Proxy.newProxyInstance(
                  ProxyUtil.class.getClassLoader(),
                  new Class[] { Star.class },
                  new InvocationHandler() {
                      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                          // proxy一般用不到，method表示要运行的方法,args调用method传递的参数
                          if ("sing".equals(method.getName())) {// 判断是调用的哪一个方法
                              // 加入前置的准备工作
                              System.out.println("前置的工作");
                          } else {
  
                          }
  
                          return method.invoke(bs, args);// 调用该方法
                      }
                  });// 参数1是类加载器，加载生成的代理类,参数2是接口，表示这个代理中介可以代理所有接口中的方法，这十个接口数组，里面是所有要代理的接口的字节码
          // 参数3指定生成的代理干什么事
          return s;// 返回值是创建的代理
      }
  }
  
  
  
  //测试类
  public class Test {
      public static void main(String[] args) {
          BigStar bs = new BigStar();
          Star proxy = ProxyUtil.createProxy(bs);//获取对象相应的代理对象
          proxy.sing("test"); //调用代理中的sing方法        
      }
  }
  
  ```

  

# 树

## 平衡二叉树

![image-20230725211334390](assets/image-20230725211334390.png)![image-20230725211457249](assets/image-20230725211457249.png)![image-20230725211913541](assets/image-20230725211913541.png)

## 红黑树

红黑树的红黑规则：

- 每个节点要么红色要么黑色
- 根节点必须是黑色
- 如果一个节点没有子节点，则该节点相应的指针属性值为Nil，这些节点被视为叶节点，每个叶节点是黑色的
- 如果一个节点是红色，那么他的子节点必须是黑色，不能出现两个红色节点相连的情况
- 对于每一个节点，从该节点到其所有后代叶节点的简单路径上，均包含相同数目的黑色节点

添加节点：

- 默认节点是红色效率更高
- 

# 设计模式

## 适配器模式

- 问题：当接口实现类只要实现部分接口的方法的时候，实现类需要重写所有接口的方法
- 解决办法：在接口和实现类之间添加一个中间类，称之为适配器，适配器空实现了接口所有的方法。然后实现类继承该适配器。实现类只需要重写自己需要的方法。
- `public abstract class XXXAdapter` 。 适配器是抽象的原因是防止其他类创建适配器对象，这是没有意义的。
- 当实现类还有其他的指定类需要继承的时候，直接用适配器去继承这个指定类，实现类间接继承这个指定类。 