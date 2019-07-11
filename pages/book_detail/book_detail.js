import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const id = options.id
    const bookDetail = bookModel.getDetail(id)
    const bookLikeStatus = bookModel.getLikeStatus(id)
    const bookComments = bookModel.getComments(id)
    Promise.all([bookDetail, bookLikeStatus, bookComments]).then(res => {
      this.setData({
        bookDetail: res[0],
        likeStatus: res[1].like_status,
        likeCount: res[1].fav_nums,
        comments: res[2].comments,
      })
      wx.hideLoading()
    })
  },

  handleLike: function (e) {
    const likeFlag = e.detail.behavior
    likeModel.like(likeFlag, this.data.bookDetail.id, 400)
  },

  handleShowFakePost: function () {
    this.setData({
      posting: true
    })
  },

  handleCancel: function () {
    this.setData({
      posting: false
    })
  },

  handlePostComment: function (e) {
    const comment = e.detail.text || e.detail.value
    if (comment.length > 12 || !comment) {
      wx.showToast({
        title: comment ? '短评最多12个字' : '短评不能为空',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.bookDetail.id, comment).then(res => {
      wx.showToast({
        title: '添加成功,短评+1',
        icon: 'none'
      })
      let comments = this.data.comments
      comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments,
        posting: false
      })
    })
  }
})