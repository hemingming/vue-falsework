export default [{
  path: '/apticket',
  meta: {
    title: '增票资质',
    notLoading: true
  },
  component: r => require.ensure([], () => r(require('./apticket')), 'apticket')
  }
]
