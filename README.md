## 前言
> **技术千千万，学习永不断；虽然是咸鱼，也想努把力！！！**   
> 这段时间一直很迷茫，做前端这行也有6年了，眼看马上奔三的人了，但依旧是个菜逼，整天代码写了不少，但总感觉缺少些什么，一直都没什么进步；每下定决心准备沉淀下自己，过不了几天人又变懒了；这不新一轮的沉淀开始了，本次研究基于NodeJS搭建一套实用的后台管理系统。  
**项目地址：**
[github](https://github.com/sunshine824/Nestjs-Cli-Serve)、
[gitee](https://gitee.com/sunshine824/Nestjs-Cli-Serve)

## 为什么不选择学习新后端语言
1. 如果重新学习一门后端语言，学习成本过高，再加上就算初步学会了，没有实战的机会，过不了多久就会忘掉。
2. 数据库知识还没掌握好，这时再学习新语言，精力不够。
3. 这一点才是最重要的，前面的都是借口，人太笨，理解能力太差了，担心自己学废。

## 为什么选择NestJS
- 基于JavaSript，不需要重新学习新语言。
- Nest (NestJS) 是一个用于构建高效、可扩展的 [`Node.js`](https://link.juejin.cn/?target=https%3A%2F%2Fnodejs.org%2F "https://nodejs.org/") 服务器端应用程序的开发框架。它利用`JavaScript` 的渐进增强的能力，使用并完全支持 [`TypeScript`](https://link.juejin.cn/?target=http%3A%2F%2Fwww.typescriptlang.org%2F "http://www.typescriptlang.org/")
- 用的人多，遇到问题好查询。

## 开始前的准备
1. 一定的JavaScript、TypeScript基础
2. Redis安装（在本项目中，只用来了单点登录）
3. [MySQL](https://dev.mysql.com/downloads/mysql/)的安装，网上的教程有很多，这里就不多赘述了(我本地是安装在docker，方便管理)
4. [Nodejs & npm](https://nodejs.org/zh-cn/download/) ：配置本地开发环境，安装 Node 后你会发现 npm 也会一起安装下来 (V12+)

>ps：mysql安装好后，手动新建一个名为"nest_admin"的数据库，后面的表创建就交给代码

## 实现功能
- [X] JWT登录注册
- [X] 单点登录拦截
- [X] 权限接口拦截
- [X] 分页逻辑封装
- [X] 日志监控系统
- [X] Swagger API接入、文档生成
- [ ] 文件本地上传、云端上传
- [ ] Nest微服务搭建


## 项目结构

```
├── config                         # 项目配置信息(数据库，redis，全局变量)
├── src
    ├── auth                       # 权限管理模块(登录认证，接口权限拦截)
    │   └── dto                    # swagger文档
    ├── cache                      # Redis缓存工具包
    ├── core
    │   ├── filter                 # 请求错误拦截
    │   │   ├── any-exception
    │   │   └── http-exception
    │   └── interceptor            # 请求成功拦截
    │       └── transform
    ├── menu                       # 菜单管理模块
    │   ├── dto
    │   └── entities               # 数据库表实体
    │   └── menu.controller.ts     # 控制器(接口定义)
    │   └── menu.service.ts        # 接口业务逻辑实现
    ├── middleware                 # 访问日志
    │   └── logger
    ├── organization               # 组织管理模块
    ├── role                       # 权限管理模块
    ├── user                       # 用户管理模块
    └── utils                      # 工具包
```

## 启动项目
>ps：启动项目前请确保mysql，redis已启动
```bash
# clone
$ git clone https://github.com/sunshine824/Nestjs-Cli-Serve.git

# install
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## swagger
启动项目之后，swagger访问地址：http://localhost:9080/docs

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47865f5d6ae84d42bc225eef6ce8bc60~tplv-k3u1fbpfcp-watermark.image?)

## 最后
文章暂时就写到这，后续会单独将每个模块拆出来讨论，如果本文对您有些许帮助，麻烦动动您的金手指搓个赞❤️。
本文如果有错误和不足之处，欢迎大家在评论区指出，多多提出您宝贵的意见！

最后分享项目地址：[github](https://github.com/sunshine824/Nestjs-Cli-Serve)、
[gitee](https://gitee.com/sunshine824/Nestjs-Cli-Serve)