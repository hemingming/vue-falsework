export default [{
  path: '/hello',
  meta: {
    title: '首页',
    notLoading: true
  },
  component: r => require.ensure([], () => r(require('./HelloWorld')), 'HelloWorld')
}, {
  path: '/hello2',
  meta: {
    title: '首页2'
  },
  component: r => require.ensure([], () => r(require('./HelloWorld2')), 'HelloWorld')
}]
