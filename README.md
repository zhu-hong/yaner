# Yaner

## 介绍

Yaner是一个前后端分离的记账应用

[Yaner (项目暂未完成点击预览)](https://yaner-zh.vercel.app/)

测试账号

```javascript
{
  账号: 010816,
	密码: 010816,
}
```

这是Yaner项目前端部分,[后端部分项目地址](https://github.com/zhu-hong/yaner-api)

## 使用了

1. 使用Vite2构建打包
2. Vue全家桶(vue3 Composition API, Vue-Router, Vuex)
3. ant-design-vue
4. Axios

## 实现了

1. 使用Promise对Axios进行二次封装，使其充分结合`async`，`await`使用，提升开发效率
2. 拦截Axios的请求和响应，实现自动添加token验证，全局loading效果
3. 路由导航守卫，控制用户的路由权限
4. 封装自定义UI组件库，如导航栏Nav导航栏组件(传入路由数据自动生成导航栏)，支持按需加载
5. 手写防抖函数,对性能进行优化
6. 数据懒加载，所有数据与真实渲染数据分离，按需加载，提升页面加载性能
7. 利用ES6 Map对象统计账单的收入与分类