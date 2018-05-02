# i百联APPVue项目

> A Vue.js project for iBailianApp

### vue快速指南 `https://bl-front-end.github.io/bluerdoc/#/home`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build Package third-party libraries
npm run vendor

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

- 开发代码gitlab仓库地址:`git@gitlab.bl.com:FED/iBailianAppVue.git`
- 生产代码gitlab仓库地址:`git@gitlab.bl.com:FED/relace-ibailianAppVue.git`

# 步骤

## 拉取代码,关联远程仓库

1. 先把开发代码克隆到本地目录,执行`git clone git@gitlab.bl.com:FED/iBailianAppVue.git`
2. 命令行指向`dist/app/new`目录,执行`git remote add origin git@gitlab.bl.com:FED/relace-ibailianAppVue.git`,把代码跟生产代码仓库地址关联.

## 提交代码

修改完代码后执行`npm run build`,完毕后压缩的代码更新到dist文件夹下

命令行指向到`dist/app/new` `git add .` `git commit -m ''` `git push`,这个步骤完毕后代码就提交到gitlab仓库里了

### 测试环境访问地址（st）(URL:https://mh5.st.bl.com/#/)

### 测试环境访问地址（st）(URL:https://mh5.ut.bl.com/#/)

### 发布到生产环境(PRD)(URL:https://mh5.bl.com/#/)


## 开发注意事项

### 代码提交备注规则
1. [A] 新增
2. [U] 优化
3. [F] 修复

如果修复了一个bug，提交代码时可以这样写`git commit -m '[F] 修复闪购样式问题'`
