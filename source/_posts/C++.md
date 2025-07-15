---
title: C++
tags:
  - C++
  - 学习笔记
categories:
  - CPP
abbrlink: 15279
date: 2025-07-15 16:30:00
---


# C++

## 引用

引用变量实际上也是指针常量（即指针指向的地址不能改变），但是在使用时，编译器在识别到其为引用时，会自动将其进行转换。

```c++
//在main函数中
int &b=a; /*当编译器识别到b为引用变量时，自动转换为 int const *b=&a;*/
b=100; //相当于*b=100;

```

## 关于变量加括号的理解

变量总的来说，其声明都相当于一个类名，因此所有变量在c++中都是类的一个具体对象。

``` c++
int a(10)     //这里相当于 int a= int(10), int也为一个类名，其构造函数的参数为一个int值，因此变量后面加括号，括号里面的值为该变量所属类的构造函数的参数。
class Person()
{
    public:
    	person(int a,int b):m_a(a),m_b(b)
        {}   
    int m_a,m_b;
}
//这里的m_a(a)相当于int m_a=a（隐式），我觉得如果编译器将其翻译成显式法更容易理解。
//总之，对于括号里面的数据，其就是某个函数的参数。
```

## 静态成员的理解

静态成员函数和静态成员变量都是在编译的时候直接开辟一块静态空间。因此相同类的所有对象都共享该静态成员。但是要注意的是，静态成员函数不能访问非静态变量。原因是调用静态成员函数时，其无法区分访问的是哪一个对象的变量。

对类来说里面的内容只包括非静态成员变量，其余的静态成员函数、静态成员变量、非静态成员函数都不在类中。

## 问题

1. 如何打印引用变量的地址。编译器会默认将引用变量更改为其指向的变量（相当于*b），则如何获得引用变量的地址将成为一个问题。

## 浅拷贝与深拷贝

浅拷贝是编译器默认的拷贝构造函数，及对两个对象的成员变量进行简单的赋值操作。

但是对于成员变量指向堆区的数据测绘存在一些问题：

``` c++
//线面演示成员变量指向堆区，调用默认的拷贝构造函数
class Person
{
public:
    Person(int age,int height)
    {
        m_Age=age;
        m_Height=new int(height);
    }
    ~Person()    //析构函数，用于将创建的堆区数据进行释放。
    {
     delete m_Height;
        m_Height =NULL; 
     }
    int m_Age;
    int *m_Height;
}


void test01()
{
    Person p1(11,180);
    Person p2(p1);
}//test01函数使用完后则会调用两个析构函数对同一个堆区进行两次释放从而产生了错误。



//解决措施，用户自己编写类的拷贝构造函数，从而实现深拷贝。
~Person(Person &p)
{
m_Age=p.m_Age;
    m_Height=new int(*p);   //这样为新的对象创建一个新的堆区就不会重复释放两次相同的堆区了。
}

```



## 学习内容

### 1 对象模型与this指针

#### 1.1 this指针

因为类中的成员变量和成员函数是分开存储的，创建一个类，其中只有一份函数实例，故不同对象共享一份函数。

this是一个指针，其默认在对象中，其指向的是成员函数所属 的对象。

解决的问题：

1. 成员变量与成员函数的参数变量名称相同；

2.  连式编程思想：即成员函数的返回值为该成员本身

   ```c++
   class Person
   { public:
   	 Person( int age)
   	{
   		  this->age = age;
   		cout << "构造函数的调用" << endl;
   	}
   	 Person & PersonAdd(Person& p)
   	 {
   		 this->age += p.age;
   		 return *this;
   	}
   	int age;
   };
   
   
   void test01()
   {
   	Person p1(10);
   	Person p2(10);
   	p2.PersonAdd(p1).PersonAdd(p1).PersonAdd(p1);
   	cout << "the age of p2 is:" << p2.age<<endl;
   }
   ```

**注意上面代码中返回的一定要以引用的方式进行返回，否则相当于将原对象拷贝给了一个新的对象，但是原对象并没有被返回。**

####  1.2 const 修饰成员函数

##### 常函数

用const修饰后的函数（在函数定义的后面加上const），在里面无法修改对象的成员变量 。原因是this指针为指针常量，即：

```c++
class Person
{
    public:
    void func() const
    {
    m_A=100;//这里的m_A相当于this m_Age,不能修改
    m_B=100;//加了mutable后可以修改
    }
    //这里面的this 相当于 const Person* const this
int m_A;
mutable int m_B;
};
```

##### 常对象

在创建对象的时候在前面加上const，则这个对象的成员变量不可以修改。

**常对象能调用特殊的成员变量，但是只能调用常函数**

```c++
class Person
{
    public:
    void func()
    {
    m_A=100;
    }
    //这里面的this 相当于 const Person* const this
int m_A;
mutable int m_B;
};

void fun()
{
    const Person p; //p为常对,因此除了特殊成员变量外，其余成员变量不能修改
    p.func();//如果能调用非普通成员函数的话，那么就可以通过这个函数来 修改成员变量，与常对象的定义冲突，因此常对象只能调用常函数。
    
}
```



### 2 友元

#### 2.1 全局函数做友元

```c++
class Building
{
    friend void Access(Building &building); //这里用friend加一个全局函数的声明之后，这个全局函数就能访问该对象的私有成员变量
public:
    Building()
    {
        sittingroom = "客厅";
        bedroom = "卧室";
    }
    string sittingroom;
private:
    string bedroom;
};

void Access(Building & building)
{
    cout << "正在访问" << building.sittingroom;
    cout << "正在访问" << building.bedroom;
};

void test01()
{
    Building a;
    Access(a);
}


int main(void)
{
	test01();
}
```

#### 2.2 类做友元

```c++
#include<iostream>
using namespace std;
#include <string>
class Children;
class Parent
{

public:
	Parent();
	void Access();
private:
	Children *m_Child;
};

class Children
{
	friend class Parent;//这里表示，Parent这个类可以访问Children这个类的私有成员变量
public:
	Children();
	string m_Score;
private:
	string m_Change;
};

Parent::Parent()
{
	m_Child = new Children;
}

Children::Children()
{
	m_Score = "分数";
	m_Change = "零花钱";
}
void Parent::Access()
{
	cout << "parent正在访问child的" << m_Child->m_Score;
	cout << "parent正在访问child的" << m_Child->m_Change;
}

void test01()
{
	Parent p;
	p.Access();
}


int main(void)
{
	test01();
}
```

#### 2.3 成员函数做友元

 ```c++
 #include<iostream>
 using namespace std;
 #include <string>
 class Building;
 class Person
 {
 
 public:
 	Person();
 	void visit1();
 	void visit2();
 private:
 	Building *building;
 };
  
 class Building
 {
 	friend void Person::visit2();  //跟前面类似
 public:
 	Building();
 	string m_Sittingroom;
 private:
 	string m_Bedroom;
 };
 
 Person::Person()
 {
 	building = new Building;
 }
 
 Building::Building()
 {
 	m_Sittingroom = "客厅";
 	m_Bedroom = "卧室";
 }
 
 void Person::visit1()
 {
 	cout << "vist1正在访问：" << building->m_Sittingroom;
 }
 void Person::visit2()
 {
 	cout << "vist2正在访问：" << building->m_Bedroom;
 }
 void test01()
 {
 	Person p;
 	p.visit1();
 	cout << endl;
 	p.visit2();
 }
 
 
 int main(void)
 {
 	test01();
 }
 ```

### 3 运算符重载

#### 3.1 加号

可以使用成员函数或全局函数，将函数名写为“operator+”，编译器就会将该函数名重载+号。并且这种函数也能实现函数的重载（即通过传入不同的参数来实现不同的操作）

**但是传入的参数顺序必须满足规定的条件**

#### 3.2左运算符

``` c++
class Person
{
public:
	////利用成员函数来实现左移运算符的重载来实现 cout << p;
	//void operator<<(cout)     这样的结果为   p.operator<<cout
	//{

	//}     因此，成员函数不能实现左移运算符的重载
	int m_A;
	int m_B;
};

//用全局函数来实现左移运算符的重载
//cout 的定义为 PURE_APPDOMAIN_GLOBAL extern _CRTDATA2_IMPORT ostream cout;   cout为标准输出流ostream这个类的一个对象
ostream & operator<<(ostream& cout, Person& p) //这里必须使用引用，因为全局只能有一个哦stream对象
{
	cout << p.m_A << "\t" << p.m_B << endl;
	return cout;  //这里返回cout用于<<后面参数的追加
}
void test01()
{
	Person p;
	p.m_A = 10;
	p.m_B = 10;
	cout << p;
}
 

int main(void)
{
	test01();
}
```

#### 3.3 递增运算符

![image-20220306014046392](C:\Users\www15\AppData\Roaming\Typora\typora-user-images\image-20220306014046392.png)

#### 3.4 赋值运算符

operator= 这个函数名等同于运算符“=”，是类中除了默认构造函数、默认拷贝构造函数、默认析构函数之外的最后一种默认的东西。可以直接对两个对象进行赋值运算符，相当于将其中一个对象的成员变量赋值给另一个（这里跟默认拷贝构造函数一样都是浅拷贝，因此遇到堆区的时候需要自己进行定义）。

```c++
//这里对于存在维护堆区的成员变量的对象，在赋值时需要考虑原对象的成员变量也指向一个堆区，需要在使用赋值运算时考虑对其进行释放
//这里列举了类中的一个赋值运算符的重载函数。（在类的定义中定义这个函数，及 其为一个成员函数
Person & operator=(Person &p)   //注意，这里必须用引用，不然在传递值时，临时创建的对象会实现浅拷贝并将原对象维护的堆区释放产生错误。要实现链式编程，故需要返回一个相同的类。
{
    //这里先考虑将被赋值的对象所维护的堆区释放掉
    if（m_Age!=NULL)
    delete m_Age;   //这里的m_Age定义为    int* m_Age;
    m_Age=new int(*p.m_Age);
return *this; 
}
//析构函数同之前的方式。
```

#### 3. 5 关系运算符的重载

 **关系运算符的返回值都是布尔值，因此自定义函数的返回值也应该是bool类的对象**

其他的部分，有手就行！

#### 3.6	函数调用运算符重载（）

在类中重载了小括号的函数叫做仿函数，因为他与实际的函数调用十分像。

值得注意的是可以实现匿名对象的创建

```c++
class Add()
{
    public:
    int operator()(int a,int b)
    {
return a+b;
    }
    
}


void test01()
{
cout <<Add()(10,10)<<endl; //这里的Add（）相当于创建了一个匿名的对象
}
```



### 4 继承

#### 4.1 基本语法

继承是子类能访问父类的成员（变量与函数）

```
class Person
{
public:

};

class Aperson :public Person  //Aperson继承了Person，Aperson为子类，Person为父类。
{

};
```

#### 4.2 继承方式

![image-20220309002515562](C:\Users\www15\AppData\Roaming\Typora\typora-user-images\image-20220309002515562.png)

#### 4.3 继承中的构造与析构

（进栈）先父后子

#### 4.4 子类与父类存在同名成员（包括静态成员）时的访问

- 成员变量

  子类中的成员变量直接访问，父类中的同名变量要加作用域（e.g.    s.f::m_A   ) s表示子类，f为s继承的父类，m_A为父类中与子类重名的成员变量

- 成员函数跟变量相同

#### 4.5 多继承语法

class 子类： 继承方式 父类1，继承方式  父类2

**当父类中出现了同名的成员，调用时要加作用域**

#### 4.6 菱形继承

概念：两个派生类继承同一个基类，同时又有个新的派生类去继承这两个旧的派生类

```
#include<iostream>
using namespace std;
#include <string>

class Base
{
public:
	int m_A;
};

//使用virtual会在创建子类的时候创建一个虚基类指针 vbptr 指向->  虚基类表 vrtable(表中含有该类到基类的偏移地址）
class Tree1 : virtual public Base
{

};
class Tree2 : virtual public Base
{

};
void test01()
{
	Tree1 a;
	Tree2 b;   //两个子类继承的m_A都是同一个（相当于先创建了同一个基类，然后每个子类再去继承这个基类）；相比于直接创建子类，会为每一个子类隐式创建一个基类。
}
 
```

### 5 多态

#### 5.1 多态的基本概念

多态（一个函数多种状态）的分类：

- 静态多态：函数的重载，运算符的重载，在编译阶段确定函数的地址。
- 动态多态：派生类（继承父类的子类）和虚函数的实现运行时多态，在运行的阶段确定函数的地址。

e.g.

```c++
class Animal    //创建父类
{
    public:
    virtual void Speak( ) //使用virtual关键字实现虚函数的创建，在编译阶段确定函数的地址
    {
cout<<"父类"<<endl;
    }
};

class Cat ： public Animal
{
  public:
    void Speak( )
    {
        cout<<"子类Cat"<<endl;
    }
};
class Dog ：public Animal  //创建两个派生类
{
  public:
    void Speak( )
    {
        cout<<"子类Dog"<<endl;
    }
};

void DoSpeak(Animal & animal )
{
    animal.speak();  //在该函数中调用的是父类的类型
}

void test01()
{
 Cat cat;
    DoSpeak(cat); //但是传入的是子类的类型
}
//如果不加virtual创建虚函数，则到时调用的是父类的函数，因为DoSpeak的函数地址在编译阶段已经确定了。但是如果创建的是一个虚函数的话，则函数地址在运行阶段才确定函数的地址，即根据传入的参数来确定函数。
```

实现多态所需要的条件：

- 首先子类要继承父类
- 子类的函数要重写父类中的虚函数（即子类的函数的返回类型、函数名、参数类型必须相同。

#### 5.2 多态的内部剖析

![多态的内部剖析](C:\Users\www15\Pictures\笔记图片\多态的内部剖析.jpg)

#### 5.3 纯虚函数与抽象类

因为父类的虚函数根本用不上，所以父类中的虚函数可以直接写成纯虚函数 	`virtual 返回值类型 函数名（参数列表）=0；`

当类中有了纯虚函数时，这个类叫做抽象类。

抽象类特点：

- 抽象类的纯虚函数没有意义，所以不能实例化对象
- 抽象类的子类必须重写纯虚函数，否则也为抽象类（指的是不能在栈区或堆区创建该抽象类的对象数据）

使用多态的方式，使用父类的指针或引用来指向子类，从而调用这个函数。

这个的作用是只使用一个相同变量的指针通过指向不同类来实现不同函数的调用。

 #### 5.4 虚析构和纯虚析构

当子类中有创建堆区的数据时，要调用虚析构或純虚析构来释放掉子类中的堆区数据，而且纯虚析构和虚析构都必须有定义，因为父类中也可能存在堆区的数据。 

### 6 文件操作

#### 6.1 文本文件

##### 写文件的步骤

1. 包含头文件<fstream>

2. 创建流对象  

    ofstream ofs；

3. 打开文件 

   ofs.open("文件路径"，打开方式)；

4. 写入数据

   ofs<<"写入的数据"；

5. 关闭文件 

   ofs.close();

![image-20220313212811082](C:\Users\www15\AppData\Roaming\Typora\typora-user-images\image-20220313212811082.png)

##### 读文件

1. #include<fstream>

2. ifstream ifs;

3. ifs.open("路径",方式)；

4. if(!ifs.is_open())

   {

   cout<<"文件打开失败"<<endl;

   }	

5. char buf[1024]={0};

6. 读取方式

   - while(ifs>>buf)

     {

     cout<<buf<<endl;

     }

   - while(ifs.getline(buf,sizeof(buf)))

     {cout<<buf<<endl;}

   - string  buf;

     while(getline(ifs,buf))

     {

     cout<<buf;

     }

#### 6.2 二进制文件

 打开方式：`ios::binary`

写文件：ostream &write(const char* buffer,int len); 

osf.write(const char* ,int);

读文件：ostream &read(const char*buffer,int len);

isf.read(const char* buffer,int);   //将文件流指向的文件内容读到buffer中  

### 7 模板

#### 7.1 函数模板

定义：制定一个通用的函数类型，返回值和形参类型不具体制定，用一个虚拟的类型来表示。

语法：  

```c++
template<typelatename T>   //  template   声明创建模板；typelate/class 声明位置参数类型；T  未知参数的符号，通常大写
函数声明或函数定义
```



使用方法：

- 直接调用，编译器会根据传入的参数类型自动对未知变量进行修改(简介推导)
- 手动输入T的数据类型。e.g. ` fun()<int>;`

注意事项：

- 编译器推导出的数据类型必须一致
- 模板必须确定了T的数据类型，该模板才能使用。即使没有使用T这个数据类型。

函数与模板的差异：

- 函数的参数可以发生隐式转换
- 而模板的传入参数不会自动发生隐式转换，但可以通过手动输入参数类型来进行类型转换。

#### 7.2 普通函数与函数模板的调用规则

当普通函数名与函数模板名相同时：

1. 如果两者都可以调用，则优先调用普通函数
2.  可以通过空模板的参数列表来调用函数模板。e.g. `myPrint<>();`这里的<>为空模板参数列表。
3. 函数模板也可以实现重载。
4. 如果函数模板产生了更好地匹配，则优先调用函数模板。如：当普通函数要参数类型转换，则直接调用函数模板。

#### 7.3 函数模板的问题及解决

问题：当函数模板的两个传入的数据类型不能实现函数里面的操作的时候，如传入的参数是自定义的类，则该类不能比较。

解决：

- 使用运算符重载
- 利用具体化的类的版本实现代码

e.g.

```c++
class Person
{
    public:
    string m_name;
    int m_Age;
}

template <class T>
bool compare(T a,T b)
{
    if(a==b)
        return true;
return false;
}    //普通函数模板不能直接调用Person类型的变量

//下面使用具体化Person的版本来实现对Person变量的调用
template<> bool compare(Person a,Person b)
{
if(a.m_Name==b.m_Name&&a.m_Age==b.m_Age)
    return true;
    return false;
}
```

#### 7.4 类模板

类模板的创建：

```c++
template<class typeA,class typeB> class person
{
public:
Person(typeA a,typeB b)
{
    m_A=a;
    m_B=b;
}
  typeA m_A;
  typeB m_B;
}

```

类模板的一些特性：

- 编译器不能自动推导出传入的变量类型，调用模板的时候必须使用模板参数列表指明调用的函数模板中变量类型。<>

- 类模板可以设置默认的变量类型

  `template<class typeA=string,class typeB=int>`

#### 7.5 类模板的成员函数的创建时机

在调用类模板的成员函数这个时候才创建

而类的成员函数则是在一开始就创建好了 

#### 7.6 类模板对象作为函数参数

方式

- 直接指明参数的类型（在类模板后面加上模板参数列表，在列表中指明该类模板的成员变量的类型）    `void fun1(Person <int,string> p)   该参数直接指明了类模板的类型;`  **这种是最常用的类型**

- 将该函数设为函数模板，则该参数的类型可以通过编译器推导出来。

  ```c++
  template <class T1,class T2>
      void func(T1 p)  //传入的类模板可以通过编译器推导出来.，
  ```

#### 7.7 类模板与继承

1. 父类为类模板，子类为普通类

    在创建子类的时候要在父类后面加上参数列表。`class Child : public Base<int>{};   //父类为Base的类模板（只有一个成员变量`。

2. 父类与子类都为类模板

   ```c++
   template<class T>
   class Base
   {
   public:
   	T m;
   };
   
   template<class T1,class T2>
   class Son :public Base<T1>
   {  
   public:
   	T2 n;
   };
   ```

   

总之，只要在定义函数和类的时候，只要存在未知的变量的时候，就直接用模板。

#### 7.8 类模板成员函数的类外实现

就是类内声明，类外定义

**注意：**一定要在作用域符号后面加上参数列表，不然就是普通类的函数类外声明。并且同时还要使用template。`void Person<int,string>::ShowPerson(){}   //Person为类模板有两个成员变量。`

```c++
template<class T1,class T2>
class Person
{
public:
	Person(T1 name, T2 age);

	void ShowPerson();
	T1 m_Name;
	T2 m_Age;
};
template<class T1,class T2>
Person<T1,T2>::Person(T1 name, T2 age)
{
	this->m_Name = name;
	this->m_Age = age;
}
template<class T1, class T2>
void Person<T1, T2>::ShowPerson()
{
	cout << "姓名：" << this->m_Name << endl;
	cout << "年龄：" << this->m_Age << endl;
}
```



#### 7.9 类模板分文件编写

问题：由于类模板的成员函数是在调用该成员函数的时候才创建的，因此只包含头文件会导致连接错误。

解决方式：

1. 直接包含该头文件的源文件，及该类模板的cpp。（一般不用这样的操作）
2. 或者将类模板的声明和实现写在同一个文件中，并以“hpp”后缀命名，在主文件中直接包含这个hpp文件。

#### 7.10 类模板与友元

全局函数在类内实现：

直接在类内添friend 和函数定义即可。`friend void show_person(Person<T1,T2> p);`

全局函数在类外实现：

```c++
template<class T1,class T2>
class Person;  //提前声明了这个类模板，否则这个全局函数不能识别这个类

template<class T1, class T2>   
void show_person(Person<T1, T2> p)  //该全局函数的实现
{
	cout << "姓名：" << p.m_Name << endl;
	cout << "年龄：" << p.m_Age << endl;
}
template<class T1,class T2>
class Person
{
public:
	Person(T1 name, T2 age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}
	friend void show_person<>(Person<T1, T2> p);   //这里加了一个空模板的参数列表表明了这个全局函数是个函数模板。 
	T1 m_Name;
	T2 m_Age;
};
```

### 8 标准模板库

#### 8.1 基本定义

STL（standard template library)标准模板库

STL的六大组件:
    1.容器(就是一个类模板（也是一个自定义数组），比如：vector)
    2.算法（包含算法头文件后，可以直接使用相应的函数）
    3.迭代器（容器中用来指向元素的位置的成员变量）
    4.仿函数
    5.适配器
    6.空间配置器

#### 8.2 容器vector的使用

容器：vector

迭代器（容器中的用于指向元素位置的成员变量）：vector<>::iterator

使用事例：

```c++
#include <iostream>
using namespace std;
#include<string>
#include<vector>  //在使用vector容器前，一定要包含它的头文件


void test01()
{
	//这里我创建一个用于存放int类型的容器
	vector<int> v;
	//向容器中插入相应的数据（使用容器中的成员函数push_back()）
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(40);
	//用迭代器访问容器中的每一个数据（iterator 类型表示指向容器中的数据的位置的指针）  自己猜测iterator应该相当于 T*(这是自定义的模板数据类型）

	for( vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
	cout << *it << endl;
	}
}

int main(void)
{

	test01();
	system("pause");
	return 0;
}
```

#### 8.3 vector使用自定义数据类型和使用嵌套

自定义的数据类型与使用普通数据类型相似

```c++
#include <iostream>
using namespace std;
#include<string>
#include<vector>  //在使用vector容器前，一定要包含它的头文件

class Person 
{
public:
	Person(int age, string name)
	{
		this->m_Age = age;
		this->m_Name = name;
	}
	int m_Age;
	string m_Name;
};
void test01()
{
	//存放自定义的数据类型Person
	vector<Person> v;
	Person p1(10,"one");
	Person p2(20, "two");
	Person p3(30, "three");
	Person p4(40, "four");
	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);
	for( vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	{
	cout << "年龄："<<(*it).m_Age << endl;
	cout << "姓名：" << (*it).m_Name << endl;
	}
}

int main(void)
{

	test01();
	system("pause");
	return 0;
}
```

嵌套的使用就相当于使用二维数组。

#### 8.4 string 字符串

以下均参考手册

#### 8.5 deque容器

##### 赋值操作

```
deque<int> d1;
for(int 1=0;i<10;i++)
{
d1.push_back(i);
}
deque<int> d2;
d2=d1;  //使用等号赋值，等号是运算符重载
deque<int>d3;
d3.assign(d1.begin(),d1.end());  //assign函数将，d1的值赋值给d2
deque<int> d4;
d4.assign(10,100);  //给d4赋值10个100	
```

##### deque大小操作

```
deque<int> d1(10,100);
if(d1.empty())  //empty查询是否为空
{
cout<<"为空";
}
d1.size()   //size()查询大小
d1.resize(n)  //重新指定d1的大小为n,多的用0填充,少了删除
d1.resize(10,100)  //重载版本
```

##### 插入和删除

```
//基本的头插尾插操作省略
deque<int> d1;
d1.insert(d1.begin(),1000)  //在d1的头部插入1000
d1.insert(d1.begin(),10,100) //insert的重载版本
deque<int> d2;
d2.insert(d2.begin(),d1.begin(),d1.end());//重载版本，插入一段数据
d1.erase(d1.begin()) //删除某个位置
d1.erase(d1.begin(),d1.end())  //删除一个区间
d1.clear()  //清空容器
```

##### 数据的存取

```
deque.at(n)  //访问容器的第n个位置（从0开始）
deque.front //返回首元素
deque.back //返回尾部元素
deque[]//通过中括号，类似数组一样访问容器元素
```

##### 排序

```
sort(.begin(),.end()) //需要包含标准算法头文件algorithm,按升序排序
```

#### 8.6 stack容器

##### 基本介绍

stack就是栈，先进后出，不允许有遍历行为。

##### stack常用接口

```CPP
//构造方式，默认构造和拷贝构造
//赋值操作，重载等号
//数据存取
stack<int> s;
s.push(1);   //使用push放入数据到栈顶
s.pop();  //pop将栈顶元素取出
cout<<s.top(); //top返回栈顶的数据的值
cout<<s.size();  //size返回栈的大小
if(s.empty)
    cout<<"栈里的数据为空";  //empty返回栈是否为空
```

#### 8.7 queue容器

##### 基本概念

先进先出的数据结构			

##### queue常用接口

```cpp
//构造方式默认构造和拷贝构造
//数据的增删和查看
queue<int> q;
q.push(10);
q.pop();
cout<<q.front()<<endl; //返回队头元素
cout<<q.back()<<endl; //返回队尾元素
cout<<q.size()<<endl; //返回队列的大小
if(q.empty()) //判断是否为空
```

#### 8.8 list容器

##### 基本介绍

- 优点：插入和删除的速度快
- 缺点：遍历的速度没有数组快，占用的空间比数组大
- STL的链表是一个双向循环链表，每个节点存放了前一个和后一个节点的地址，且最后一个节点记录这第一个节点的地址，第一个节点记录着最后一个节点的位置。
- 该STL中的迭代器不支持跳跃式访问，只能一个一个地访问。

##### 构造函数

```cpp
list<T> lst;
list<T>(begin,end);
list<T>(n,elem);
list<T>(const list &lst);
```

##### 赋值

```cpp
list<int> l1;
l1.push_back(10);
l1.push_back(10);
list<int> l2;
l2.assign(l1.begin(),l2.end()); 
l2.assign(10,100); //给l2赋值10个100
l2=l1; //利用运算符重载给l2赋值
l2.swap(l1)  //交换l1和l2的值
```

##### 大小操作

```cpp
list<int> l1;
if(l1.empty())
    cout<<"容器为空"<<endl;  //empty判断是否为空
cout<<l1.size()<<endl;  //size判断容器中元素的个数
li.resize(100);  //resize重新指定容器的大小，超过的部分用0填充，少的删除。
l1.resize(10,100)  //用100填充多余的部分
```

##### 插入删除

```cpp
list<int> l1(10,100);
l1.push_back(10);
l1.push_front(10);  //头部插入
l1.pop_back();
l1.pop_front();
l1.insert(l1.begin(),10); //在头部前面插入一个元素
list<int>:: iterator it=l1.begin();
++it; //迭代器只能增加一次，不能跳跃增加
l1.erase(it);
l1.remove(1000);  //删除了所有与该值相同的元素
l1.clear();
```

##### 数据存取

```cpp
front();  //返回第一个元素
back();  //返回最后一个元素
/*不支持at与[]访问（底层是链表）*/
```

##### 反转和排序

```cpp
list<int> l1;
l1.reverse()  //反转容器
/*不支持随机访问的迭代器，不支持标准算法，但是list内部提供了成员函数sort进行排序*/
 l1.sort();  //升序排序
```

##### 实例

```cpp
#include <iostream>
using namespace std;
#include<list>
#include<string>

/*用list容器装几个人（属性为姓名年龄身高，他们按年龄升序排序，若年龄相同，则按身高降序排序*/

class Person {
public:
	Person(string name, int age,int height)
	{
		this->m_Age = age;
		this->m_Height = height;
		this->m_Name = name;
	}
	string m_Name;
	int m_Age;
	int m_Height;
};
 
bool compare(const Person &p1,const Person &p2) //编写一个排序函数，用与list内部sort函数的排序
{
	if (p1.m_Age == p2.m_Age)
	{
		return p1.m_Height > p2.m_Height;
	}
	return p1.m_Age < p2.m_Age;
}

void test01()
{
	list<Person> l1;
	Person p1("李白", 24, 160);
	Person p2("杜甫", 24, 163);
	Person p3("白居易", 22, 167);
	Person p4("李商隐", 22, 159);
	Person p5("李贺", 50, 164);
	l1.push_back(p1);
	l1.push_back(p2);
	l1.push_back(p3);
	l1.push_back(p4);
	l1.push_back(p5);
	for (list<Person>::iterator it = l1.begin(); it != l1.end(); it++)
	{
		cout << "姓名： " << it->m_Name << "	" << "年龄： " << it->m_Age << "	" << "身高： " << it->m_Height << endl;
}
	cout << "先按年龄升序，相同年龄按身高降序排序后：" << endl;
	cout << "--------------------------------" << endl;
	l1.sort(compare);
	for (list<Person>::iterator it = l1.begin(); it != l1.end(); it++)
	{
		cout << "姓名： " << it->m_Name << "	" << "年龄： " << it->m_Age << "	" << "身高： " << it->m_Height << endl;
	}

}

int main(void)
{
	test01();
	
	system("pause");
	return 0;
}
```

#### 8.9 set/mutiset容器

##### 简介

在插入数值的时候就将其排好了序。

**本质**：利用二叉树实现

**区别：**set容器中不允许有重复的元素，mutiset允许，其他地方相同

**头文件**为set

##### 构造和赋值

```cpp
set<int> s1;  //默认构造
set<int> s2(s1); //拷贝构造
//赋值操作
s1.insert(); 
s2=s1;  //运算符重载赋值
```

##### 大小和交换操作

```cpp
if(s1.empty())  //判断是否为空
    cout<<"empty.";
cout<<s1.size();  //返回大小
 s1.swap(s2);  //交换元素
```

##### 插入和删除

```cpp
s1.insert(20); //在容器中插入元素
s1.erase(s1.begin()); //删除某个位置的元素
s1.erase(20); //删除容器中30这个数值删除
s1.erase(s1.begin(),s1.end());  
s1.clear();	
```

##### 查找与统计

```cpp
s1.find(10); // 在容器中寻找10这个值，如果有返回这个值的迭代器，如果没有返回s1.end();
s1.count(10); //返回10这个值的个数
```

##### pair对组创建

```cpp
pair<int,string> p1(10,"test"); //创建对组	
p.first p.sencond  //表示该对组的第一个值和第二个值
pair<string,int> p2=make_pair("test",10)    
```

##### 排序

```cpp
//在插入数据之前指定排序规则，利用仿函数来实现
	class MyCompare    
{
public:
	bool operator()(int v1,int v2) const
	{
		return v2 < v1;
	}

};
void test01()
{
	set<int,MyCompare> s1;
	s1.insert(10);
	s1.insert(20);
	s1.insert(30);
	s1.insert(40);
	  
}
```

##### set存放自定义数据类型

对于自定义的数据类型，存放到set容器中的时候要指定排序方式。

```cpp
class Person
{
public:
	Person(string name,int age ) {
		this->m_Name = name;
		this->m_Age = age;
	}

	string m_Name;
	int m_Age;
};

class MyCompare    
{
public: 
	bool operator()(const Person  &p1,const Person &p2) const  //这里要在函数后面加const
	{
		return p1.m_Age < p2.m_Age;
	}

};
void test01()
{
	set<Person,MyCompare > s1;
	Person p1("A", 10);
	Person p2("B", 12);
	Person p3("C", 11);
	Person p4("D", 9);
	s1.insert(p1);
	s1.insert(p2);
	s1.insert(p3);
	s1.insert(p4);
	for (set<Person, MyCompare >::iterator it = s1.begin(); it != s1.end(); it++)
	{
		cout << "姓名： " << it->m_Name << "\t" << "年龄： " << it->m_Age << endl;
	  }
}
```

#### 8.10 map/multimap容器

##### 构造与赋值

- map的默认排序不是按照value进行排序，而是按照key。
- map不允许有重复的key
- multimap允许有重复的key
- 给map容器赋值的时候，要成对地赋值。

```cpp
map<int,int>m1; //map中前一个int表示索引值（key），后面一个int表示元素的实值（value）
map<int,int>m2(m1);  //拷贝构造

m1.insert(pair<int,int>(1,10)); //map容器中存放pair值，这里用的是匿名构造，pair<int,int>(1,10)创建匿名对象，将值插入到map容器中，执行完这条指令后，这个匿名对象将被销毁
for(int map<int,int>::iterator it=m1.begin();it!=m1.end();it++)
{
    cout<<it->first<<"	"<<it->second; //打印出每个元素的第一个索引值和第二个实值
}

```

##### map的大小与交换操作

```cpp
map<int,int>m1，m2;
m1.size();   //返回m1的大小
m1.empty();
m1.swap(m2); //懂的都懂

```

##### 元素的插入与删除

- 插入方式

```cpp
map<int,int> m;
m.insert(pair<int,int>(1,10));  //第一种
m.insert(make_pair(1,10));  
m[1]=10;  //不建议
```

- 

```cpp
m.erase(m.begin());
m.erase(m.begin(),m.end());
m.erase(key); //按照key删除
```

##### 查找与统计

```cpp
m.find(key)  //查找key的元素，返回迭代器，没找到返回m.end()
m.count(key) //返回key元素有多少个
    
```

##### 改变map排序规则

```cpp
class MyCompare    
{
public: 
	bool operator()(int v1, int v2) const
	{
		return v1>v2;
	}

};
void test01()
{
	map<int,int,MyCompare > m;
	m.insert(pair<int,int>(2,10));
	m.insert(pair<int, int>(1, 40));
	m.insert(pair<int, int>(3, 60));
	m.insert(pair<int, int>(4, 4));

	for (map<int,int,MyCompare>::iterator it = m.begin(); it != m.end(); it++)
	{
		cout << "key： " << it->first << "\t" << "value： " << it->second << endl;
	  }
}
```

### 9 STL-函数对象

- 函数对象是一个类，不是一个函数。这个类重载了函数调用操作符 

特点：

- 使用时跟普通函数一样，有参数和返回值。

  ```cpp
  
  class MyAdd {
  public:
  	int operator()(int a, int b)
  	{
  		return a + b;
  	}
  };
    
  void test01()
  {
  	MyAdd myadd;
  
  	cout<<myadd(1,1);  //myadd的使用完全类似于函数，有参数和返回值 
  }
  ```

  

- 函数对象不同于函数，有自己的状态

  ```cpp
  class MyPrint{
      public:
      void operator()(string test)
      {
          cout<<test;
          this->count++;
      }
      int count;  //这个函数对象的状态，用来记录这个函数被调佣的次数,这是有别于普通函数的地方。
  }
  ```

  

- 函数对象可以作为参数传递

  ```cpp
  //使用上面的MyPrint函数对象
  void doPrint(MyPrint & mp,strin& test)
  {
  mp(test);
  }
  void test()
  {
      MyPrint myprint;
      doPrint(myprint,"test");//函数对象myprint作为参数
      
  }
  ```

### 10 谓词

- 概念

  - 返回bool类型的仿函数成为谓词
  - 如果operator()接受一个参数，叫做一员谓词
  - 接受两个参数，叫做二元谓词

- 一员谓词的使用

  ```cpp
  class Above5 {
  public:
  	bool operator()(int val	)
  	{
  		return val > 5;
  	}
  };
  
  void test01()
  {
  	vector<int> v;
  	for (int i = 0; i < 10; i++)
  	{
  		v.push_back(i);
  	}
  	vector<int>::iterator it = find_if(v.begin(), v.end(), Above5; //一元谓词Above5作为这个算法函数的参数，在这个算法中，对于每个指针指向的元素，将其作为一员谓词的参数，若这个谓词返回true则最终返回这个位置的指针，如果为false则将一直遍历到最后，返回最后一个的位置
  	cout << *it;
  
  }
  ```
  
- 二元谓词

  ```cpp
  class MyCompare {
  public:
  	bool operator()(int n1,int n2	)
  	{
  		return n1>n2;
  	}
  };
  
  void test01()
  {
  	vector<int> v;
  	for (int i = 0; i < 10; i++)
  	{
  		v.push_back(i);
  	}
  
  	sort(v.begin(), v.end(), MyCompare;//二元谓词，sort算法的底层是两个数相互对比，因此二元谓词也是两个数字对比。
  }
  ```

  

### 11内建函数对象

#### 11.1简介

- 概念：STL内建了一些函数对象
- 分类：
  - 算数仿函数
  - 关系仿函数
  - 逻辑仿函数
- 用法：
  - 这些仿函数所产生的的对象，用法与一般那函数相同
  - 要引入头文件functional

#### 11.2 算数仿函数

功能：

- 实现四则运算
- 只有negate是一元运算，其他都是二元运算

函数原型：

- `template<class T> T plus<T>`
- `template<class T> T minus<T>`
- `template<class T> T multiplies<T>`
- `template<class T> T divides<T>`
- `template<class T> T modulus<T>//取模`
- `template<class T> T negate<T>//取反` 

```cpp
	plus<int> Add;
	cout << Add(11, 11);
```

#### 11.3 关系仿函数

- `template<class T>bool equal_to<T>`
- `template<class T>bool mot_equal_to<T>`
- `template<class T>bool greater<T>//大于`
- `template<class T>bool greater_equal<T>`
- `template<class T>bool less<T>`
- `template<class T>bool less_equal<T>`

```cpp
	vector<int> v;
	v.push_back(1);
	v.push_back(3);
	v.push_back(2);
	v.push_back(4);
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << endl;
	}
	sort(v.begin(), v.end(), greater<int>());
```

#### 11.4 逻辑仿函数

- `template<class T>bool logical_and<T> //`
- `template<class T>bool logical_not<T> //取反`
- `template<class T>bool logical_or<T>` 

### 12 STL常用算法

#### 12.1 简介

- 头文件主要包括`<algorithm> <functional> <numeric>`
- `<algorithm>`涉及到了比较、交换、查找、遍历操作、复制、修改。
- `<numeric>`进行简单数学运算的模板函数
- `<fuctional>`定义了一些模板类，用于声明函数对象。

#### 12.2 algorithm

##### 12.2.1遍历算法

- `for_each` 遍历容器
- `transform`(iterator beg1,iterator end1,iterator beg2,_func) 搬运容器到另一个容器 

```cpp
vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}
	for_each(v.begin(), v.end(), PrintVal);
```

 ```cpp
 class Print
 {
 public:
 	void operator()(int val)
 	{
 		cout << val;
 	}
 };
 
 class Transform {
 public:
 	int operator()(int val)
 	{
 		return (val + 1);
 	}
 };
 void test01()
 {
 	vector<int> v;
 	vector<int> v2;  
 	for (int i = 0; i < 10; i++)
 	{ 
 		v.push_back(i);
 	}
 	v2.resize(v.size());
 	for_each(v.begin(), v.end(), Print());
 	transform(v.begin(), v.end(), v2.begin(),Transform());
 	for_each(v2.begin(), v2.end(), Print());
 
 }
 ```

##### 12.2.2 查找算法

- ` iterator find(iterator beg,iterator end,value)`按值查找元素，返回指定位置的迭代器，或者结束迭代器的位置。

- `iterator find_if(iterator beg,iterator end,_Pred)`按条件查找元素，该条件由谓词_Pred提供

- ` iterator adjacent_find(iterator beg,iterator end)`返回相邻元素第一个元素的位置

- `boll binary_search(iterator beg,iterator end,value)`找到了指定元素返回true否则为false。

  **在无序序列中不可用**：因为其使用的是二分查找法

- `int count(iterator beg,iterator end,value)`统计容器中该值的个数，返回这个统计值。

- `int count_if(iterator beg,iterator end,_Pred);`按条件统计元素个数

##### 12.2.3 排序算法

- `void sort(iterator beg,iterator end,_Pred)`对容器中的元素排序

- `void random_shuffle(iterator beg,iterator end)`将容器中的元素全部打乱

  在使用的时候，这个随机要有种子`srand((usigned int)time(NULL));`

- `merge(iterator beg1,iterator end1,iterator beg2, iterator end2, iterator dest);`将两个容器元素合并，并存储到另一容器中

  **两个容器必须是有序的，合并之前必须给目标容器提供空间**

  

-    `void reverse(iterator beg, iterator end)`将容器中的元素反转

##### 12.2.4 拷贝和替换算法

- `void copy(iterator beg, iterator end,iterator dest);`将指定容器的元素全部拷贝到目标容器
- `void replace(iterator beg, iterator end, oldvalue, newvalue)`将所有的旧的元素替换成新的元素
- `void replace_if(iterator beg, iterator end, _Pred, newvalue);`将满足条件的元素替换 为新元素
- `void swap(container c1, container c2)`将同种类型的容器中元素互换。

##### 12.2.5 集合算法

- `iterator itEnd = set_intersection(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);`将两个容器的元素交集放到目标容器中，并返回这个结束的位置

  **原容器必须是有序的序列**

- `iterator itEnd= set_union(iterator beg1, iterator end1, iterator beg2, iterator end2, dest);`将两个容器的元素的并集放到新的容器中。

  **同样，原容器必须是有序序列**

- `iterator itEnd = set_difference(iterator beg1, iterator end1, iterator beg2, iterator end2, dest);`将两个容器的差集（前一个容器中有，后一个容器没有的元素）放到目标容器中。

  **同样，原容器必须是有序序列**

#### 12.3 numeric

##### 12.3.1 算术生成算法

- ` accumulate(iterator beg, iterator end, value);`将容器中的所有元素的总和，`value`为起始累加值。
- `void fill(iterator beg, iterator end, value);`往容器中填充该数值。

---









#          OVER!
