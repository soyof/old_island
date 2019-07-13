//news.js
// apikey=0b2bdeda43b5688921839c8ecb20399b
var newData = require('../../data/posts-data')
Page({
  data: {
    newsList: []
  },
  onLoad: function (options) {
    this.setData({
      newsList: newData.postList
    })
  },
  handleNewsTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/news_detail/news_detail?id=${id}`
    });
  },
  handleTargetForId: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/news_detail/news_detail?id=${id}`
    });
  }
})
