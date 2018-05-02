export default [{
    path: '/basket',
    meta: {
      title: '精选篮筐',
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('./BasketChoice')), 'BasketChoice')
  }, {
    path: '/basketdetail',
    meta: {
      title: '精选篮筐',
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('./BasketDetail')), 'BasketDetail')
  }
]
