const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@integer(1000000000, 9999999999)',
    'status|1': ['published', 'draft', 'deleted'],
    author: '匿名',
    display_time: '2021-4-2',
    pageviews: '@integer(300, 5000)',
    carnumber: '@integer(1, 5)',
    cabinet: '@integer(1, 20)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
