export default [{
  path: '/member',
  meta: {
    title: '个人中心'
  },
  component: r => require.ensure([], () => r(require('./MemberCenter')), 'BasketChoice')
  }
]
