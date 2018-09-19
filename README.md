### znpm-cli 脚手架

<p align="left">
<a href="https://www.npmjs.com/package/znpm-cli"><img src="https://img.shields.io/npm/dm/znpm-cli.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/znpm-cli"><img src="https://img.shields.io/npm/v/znpm-cli.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/znpm-cli"><img src="https://img.shields.io/npm/l/znpm-cli.svg" alt="License"></a>
</p>

在发 npm 包的时候需要自己起个项目，并搭建各个目录，做单元测试，如果用到了ES6的语法还需利用babel做下语法转换，发包的时候还需要压缩下代码。过程有点繁琐。

`znpm-cli` 脚手架定义了一套模板,集成了 `webpack`，`ava`，`eslint`，可以更加方便的在 npm 发自己的工具包

#### 使用

```
cnpm i znpm-cli -g  // 需要全局安装npm
znpm-cli init       // 在当前目录下初始化工程
```

可以看到当前目录载入了一些文件,接着可以在 `src目录` 下愉快的写自己的 npm 包了，并可以在 `test目录` 下做单元测试

发布前的准备

```
npm install         // 装一些必要的包
npm run pack        // 对工程打包
npm run test        // 对工程开发后的功能做单元测试
npm run testDist    // 对打包后的的文件做单元测试
npm run nyc         // 检验单元测试覆盖率
npm run report      // 生成单元测试报告
```    

#### 上传 npm 包

首先你需要有 npm 账号，没有到话到 npm 官网注册一个。

上传 npm 包前需要注意的是根目录下的 `.npmignore` 可以忽略掉一些不必要的文件往 npm 上上传。

根目录下的 package.json 的 `name` 字段就是你上传到 npm 的包名，`version` 字段是 npm 包的版本号，每次更新自己的 npm 包时需要更新 版本号才能重新上传 npm 包。

一切准备就绪，执行以下命令

```
npm login    // 按照提示输入用户名密码
npm publish  // 上传 npm 包
```

