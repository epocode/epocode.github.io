---
title: nginx学习笔记
tags:
  - nginx
  - 学习笔记
categories:
  - 常用工具
abbrlink: 15279
date: 2025-07-15 16:30:00
---
# 1 nginx安装

1. 安装相关依赖`yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel`
2. 将nginx的压缩包放到`/usr/src`
3. 解压`tar -xvf nginx.tar.gz`
4. 进入解压后的目录中
5. 执行`configure`,`./configure`
6. 执行`make && make install`

# 2 nginx的启动

1. 进入目录`/usr/local/nginx/sbin`
2. 执行nginx，`./nginx`
3. 查看进程`ps -ef | grep nginx`
4. 有一条就算成功
5. 如果启动失败查看80端口占用情况`fuser -n tcp 80`
6. 关闭该进程`kill -9 进程号`
7. 进入目录`cd /usr/local/nginx/conf`
8. 打开文件`vim nginx.conf`
9. 根路径在`/usr/local/nginx/`下

# 3 关于端口

- 查看开放的端口`firewall-cmd --list-all`
- 开放端口`sudo firewall-cmd --add-port=8001/tcp --permanent`
- 重启防火墙`firewall-cmd --reload`

# 4 nginx常用命令

- 使用nginx命令的前提是提前进入`/usr/local/nginx/sbin/`目录中

常用命令：

- 查看版本号：`./nginx -v`
- 启动nginx：`./nginx`
- 关闭nginx：`./nginx -s stop`
- 重新加载nginx(当配置文件更改后需要重加载才能生效)：`./nginx -s reload`

# 5 关于nginx的配置文件

- 文件的位置:`/usr/local/nginx/conf/nginx.conf`

- 配置文件的组成：

  > - 第一部分：全局块（从配置文件开头到events块之间的部分，主要会设置一些影响nginx服务器整体运行的配置命令）
  >
  >   比如：`worker_process 1;`值越大，可处理的并发量越高。 
  >
  > - 第二部分：events块 （影响nginx服务器与用户的网络连接）
  >
  >   比如：`worker_connection: 1024;`表示支持的最大连接数
  >
  > - 第三部分：http块（Nginx服务器配置中最频繁的部分，代理、缓存和日志定义等绝大部分功能和第三方模块的配置都在这)
  >
  >   > - http 全局块（http块开始到server块开头的部分。包块文件引入、MIME-TYPE定义、日志自定义、连接超时时间、单链接请求数上限等）
  >   >
  >   > - server块
  >   >
  >   >   > - 全局server块
  >   >   >
  >   >   > - location块

# 6 配置反向代理实例一

- 实现的效果：在浏览器地址栏输入一个域名，跳转到linux系统tomcat主页

步骤：

1. 准备工作：
   1. 安装Tomcat，使用默认端口号8080。
   2. 在`/usr/src/`下将`tomcat`解压
   3. 进入解压后的目录中，进入`bin`运行`./startup.sh`
   4. 开放8080端口`firewall-cmd --add-port=8080/tcp --permanent`，重启防火墙  		
2.  在nginx中进行请求转发的配置（nginx.conf）
   1. 进入`/usr/local/nginx/conf`,打开`nginx.conf`
   2. 将http块中server块中server全局块中的`sever_name`改成该服务器的ip地址
   3. 在server块中的location块中添加`proxy_pass http://124.221.243.52:8080`访问80 端口时，服务器会将消息转发到8080端口。
   4. 重新加载nginx。`./nginx -s reload`

# 7 配置反向代理实例二

- 实现效果：使用nginx反向代理，根据访问的路径跳转到不同端口的服务中 。访问`attackedbear.xyz:9001/edu` 直接跳转到`attackedbear.xyz:8080`,访问`attackedbear.xyz:9001/vod` 直接跳转到`attackedbear.xyz:8081`

1. 准备工作

   1. 在新的端口创建一个Tomcat服务
   2. 在`/usr/src/`下创建文件夹tomcat1和tomcat2.
   3. 将tomcat的压缩文件分别放到两个文件夹中
   4. 在两个文件夹中分别解压该压缩文件。在第一个解压后的目录中运行tamcat。
   5. 对于第二个解压后的文件，需要对其配置文件进行修改，使其运行在8081端口。
   6. 进入`conf`目录中，编辑`sever.xml`文件
   7. 将`sever port="8005"`改成`8015`，将`connector port="8080"`改成`8081`,`connection port="8009"`改成`8019`
   8. 启动`tomcat`。 

2. 创建文件夹和测试页面

   1. 进入`/usr/src/tomcat8080/tomcat/webapps`
   2. 创建文件夹`edu`,并进入该文件夹
   3. 创建文件`a.html`
   4. 浏览器访问`attackedbear.xyz:8080/edu/a.html`
   5. 对于8081文件同样进行相同的操作

3. 具体配置

   1. 找到`nginx`的配置文件，进行反向代理的配置。

   2. 在配置文件中添加新的server块

      ```nginx
      server{
      listen 9001;
      server_name 124.221.243.52;
      
      location ~ /edu/ {   #正则表达式，遇到了edu则怎么样
      proxy_pass http://http://124.221.243.52:8080;
      }
      location ~ /vod/ {
      proxy_pass http://124.221.243.52:8081;
      }
      }
      ```

   3. 同时开放9001端口

**注意云服务器需要同时在ssh和控制台开放端口。**

# 8 ngixn配置实例-负载均衡

- 实现效果：在地址栏输入地址`http://attackedbear.xyz/edu/a.html`，nginx服务器将访问平均分配到8080和8081端口。

1. 准备工作

   1. 准备两台tomcat服务器，分别布置在两个不同的端口
   2. 在两台tomcat服务器中，在`webapps`目录中创建`edu/a.html`文件。

2. 在nginx的配置文件中进行负载均衡的配置

   1. 在http全局块中添加

      ```nginx
           upstream myserver {
      server attackedbear.xyz:8080; #添加服务器列表
      server attackedbear.xyz:8081;
      }
      
      ```

   2. 在location块中添加映射规则

      ```nginx
      proxy_pass http://myserver;	
      ```

- nginx的分配策略

> - 轮询（默认策略）：
>
>   每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down了，能自动剔除
>
> - weight
>
>   权重默认为1，权重越高被分配的客户端就越多。weight加在http全局块中服务器列表中。
>
>   ```nginx
>       upstream myserver {
>   server attackedbear.xyz:8080 weight=5; #添加服务器列表
>   server attackedbear.xyz:8081 weight=10;
>   }
>   ```
>
> - ip_hash
>
>   每个请求按照访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
>
>   ```nginx
>       upstream myserver {
>       ip_hash; #直接添加这条实现
>   server attackedbear.xyz; #添加服务器列表
>   server attackedbear.xyz;
>   }
>   ```
>
> - fair（第三方）
>
>   按后端服务器的响应时间来分配请求，响应时间短的优先分配。
>
>   ```nginx
>       upstream myserver {
>       fair;
>   server attackedbear.xyz; #添加服务器列表
>   server attackedbear.xyz;
>   }
>   ```

# 9 nginx配置实例-动静分离

- 解释：
  - 实现效果:用tomcat实现动态访问，nginx实现静态访问。			

1. 准备工作：

   1. 在服务器中准备好静态资源

      比如：在根目录下创建`data/www/a.html`和`data/image/`

2. 具体配置

   1. 在nginx的配置文件中进行配置（设置规则）。更改监听80端口的服务器的location块。

      ```nginx
            location /www/  {
                  root   data;
      # proxy_pass http://myserver;       
            index  index.html index.htm;
              }
            location /image/ {
      		root data;
      		autoindex on;
      }
      
      ```

3. 测试

   1. 在浏览器中输入`attackedbear.xyz/image/01.jpg`

	# 10 nginx配置实例-高可用

1. 准备两台服务器分别安装ngixn
2. 在两台服务器上安装`keepalived`
   1. 使用命令`yum install keepalived -y`
   2. 查看是否安装成功`rpm -q -a keepalived`
   3. keepalived的配置文件的位置是`/etc/keepalived/keepalived.conf`
3. 完成高可用配置（修改keepalived.conf）
4. 重启nginx，启动keepalived，`systemctl start keepalived.service`
