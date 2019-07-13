var newsData = require('../../data/posts-data')
var imgData = require('../../data/images-data')
Page({
  data: {
    collectFlag: false,
    shareFlag: false,
    actionSheetHidden: true,
    playMusic: false,
    detailList: {}
  },
  onLoad: function (option) {
    var id = parseInt(option.id)
    var newsList = newsData.postList
    var list = newsList.find((val) => {
      return val.id === id
    })
    this.setData({
      detailList: list,
      collectFlag: list.collectFlag,
      shareFlag: list.shareFlag
    })
  },
  handImgPreview: function (e) {
    var img = e.currentTarget.dataset.img
    var arr = imgData.imgList
    wx.previewImage({
      current: arr[0],
      urls: arr
    })
  },
  handleCollcetion: function () {
    var collectFlag = this.data.collectFlag
    if (collectFlag) {
      this.setData({
        collectFlag: false
      })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 1000,
        mask: true
      })
    } else {
      this.setData({
        collectFlag: true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
    }
  },
  handleShare: function () {
    var shareFlag = this.data.shareFlag
    var itemList = [
      '分享到朋友圈',
      '分享给微信好友',
      '分享到微信群',
      '分享到QQ',
      '分享到微博'
    ]
    this.setData({
      shareFlag: !this.data.shareFlag
    })
    if (!shareFlag) {
      wx.showActionSheet({
        itemList: itemList,
        itemColor: '#405f80',
        success: (res) => {
          wx.showModal({
            title: '即将' + itemList[res.tapIndex],
            content: '是否取消 "' + res.cancel + '" 功能暂时未能实现',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              console.log(result)
            },
            fail: () => {},
            complete: () => {}
          });
        }
      })
    }
  }
})