# antd-pro
基于antd的react脚手架

### 开始使用

```bash
https://github.com/cxm1011/antd-pro.git
cd antd-pro
npm install 
npm run start  开发
npm run build  生产
```


### 目录结构

```
   |
   ├──mock/                      * mock 数据配置
   |
   ├──src/                       * 主程序
   │   │
   │   │──api                    * 后端接口配置
   │   │
   │   └──assets                 * 所有静态资源
   │   │
   │   └──components             * 所有组件
   │   │
   │   └──page                   * 所有页面
   │   │
   │   └──style                  * 所有样式变量集中管理
   │   │
   │   └──utils                  * 封装的工具
   │   │
   │   └──App.jsx                * 应用入口
   │   │
   │   └──index.js               * 项目入口
   │   │
   │   └──index.less             * 项目整体样式
   │
   │──.babelrc                   * Babel 配置
   │
   │──dbox.html                  * 生产环境页面模版
   │
   │──devServer.js               * mock 数据
   │
   │──index.html                 * 开发环境页面模版
   │
   │──package.json               * 包信息
   │
   │──webpack.common.js          * webpack 公共配置
   │
   │──webpack.dev.js             * 开发环境启动 webpack 配置
   │
   │──webpack.dll.config.js      * 项目依赖包 webpack 配置
   │
   └──webpack.prod.js            * 生产环境 webpack 配置
```
