import { BookModel } from '../../models/book'
import { ClassicModel } from '../../models/classic'

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  getMyFavor () {
    classicModel.getMyFavor(res => {
      console.log(res)
      this.setData({
        classics: res
      })
    })
  },

  handleGetUserInfo (e) {
    const userInfo = e.detail.userInfo
    this.setData({
      authorized: true,
      userInfo: userInfo
    })
  },

  handleJumpToAbout () {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  handleJumpToDetail () {
    const cid = event.detail.cid
    const type = event.detail.type
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  handleStudy () {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },

  getMyBookCount () {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  }
})