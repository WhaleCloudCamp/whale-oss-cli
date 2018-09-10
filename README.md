# whale-oss-cli
[![NPM version](https://img.shields.io/npm/v/whale-oss-cli.svg?style=flat)](https://npmjs.org/package/whale-oss-cli)
[![NPM downloads](http://img.shields.io/npm/dm/whale-oss-cli.svg?style=flat)](https://npmjs.org/package/whale-oss-cli)

CLI for [dva-native](https://github.com/react-native-examples/react-native-dva-starter) 

## Getting Started

Install, create and start.

```bash
# Install
$ npm install whale-oss-cli -g
or
$ yarn global add whale-oss-cli

# Create app
$ whale-oss create Myapp

# Start app
$ cd Myapp
$ npm run ios
```

## Commands

We have 2 commands: `create`  and `generate`(alias `g`).

### whale-oss new appName

Create app with new directory.

#### Usage Examples

```bash
$ whale-oss create myapp

```


### whale-oss g <type> <name> <?pagename> (short-cut alias: "g")

Generate page and component.

#### Usage Examples

```bash
$ whale-oss g rgpage home
```

## License

[MIT](https://tldrlegal.com/license/mit-license)


## 用法说明
### 安装whale-oss-cli
使用[whale-oss-cli](https://github.com/react-native-examples/whale-oss-cli)创建项目
```bash
yarn global add whale-oss-cli
npm i whale-oss-cli -g # 或者使用npm，和上面的2选1

whale-oss -v # 0.0.* 能打印版本号，说明安装成功了 

```
### 创建项目

使用``whale-oss create <appName>``,
```bash
cd dev  #先确认在你想创建项目的目录

whale-oss create myapp # 安装需要一点时间

```
注：安装需要一点时间，因为要先创建一个RN项目，再增加[dva-code](https://github.com/dvajs/dva/tree/master/packages/dva-core)和[react-navigation](https://github.com/react-navigation/react-navigation)的相关内容，最后要再次安装升级全部的npm模块。



### 创建页面
当需要新建一个页面时，可以使用``whale-oss g rnpage <pageName>``

```bash
cd <appName> # 确认是在项目的根目录下
whale-oss g rnpage List #比如这里我们创建一个List页面
```
```bash
│ ├── /pages/          # 自动在pages目录下新建
│ │ └── /List/         # List文件夹
│ │   ├── /components/ #私有组件     
│ │   ├── /models/     #私有模型
│ │   │ └── /List/     # List model
│ │   ├── /services/   #私有服务
│ │   │ └── /List/     # List services
│ │   └──  page.js       
```
## 注意：这里创建完页面需要**手动**添加路由和引入model
#### 1.在``/src/index.js``中添加路由
```
+ import list from './pages/List/models/List'

const app = dva({
  initialState: {},
-  models: [appModel, other, home],
+  models: [appModel, other, home, list],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})
```
#### 2.在``/src/navigation/AppNavigator.js``中加入路由
这个要看具体的项目路由结构，可以参考``/src/navigation/AppNavigator.js``和``/src/navigation/MainTabNavigator.js``中的写法。或者查阅react-navigation[官方文档](https://reactnavigation.org/docs/en/hello-react-navigation.html)

### 目录结构

```bash
├── /android/          # android原生代码
├── /ios/              # ios原生代码
├── /src/              # 项目源码目录
│ ├── /assets/         # 公共资源文件
│ ├── /components/     # UI组件及UI相关方法
│ ├── /models/         # 全局数据模型
│ ├── /navigation/     # 路由相关的东西
│ ├── /pages/          # 页面
│ │ └── /user/         # 路由
│ │   ├── /components/ #私有组件     
│ │   ├── /models/     #私有模型
│ │   ├── /services/   #私有服务
│ │   └──  page.js       
│ ├── /services/       # 数据接口
│ ├── /themes/         # 项目样式
│ ├── /utils/          # 工具函数
│ │ ├── config.js      # 项目常规配置
│ │ ├── dva.js         # 创建dva的辅助工具
│ │ ├── index.js       # 将utils模块导出
│ │ ├── request.js     # 异步请求函数
│ │ └── storage.js     # storage工具
│ ├── helpers.js       # redux-helpers
│ └──  index.js        # 入口文件
├── .babelrc           # babel配置
├── .eslintrc          # eslint配置
├── app.json           # 项目信息
├── index.js           # rn启动文件
├── package.json       # 模块和脚本信息
```

## LICENSE

MIT
