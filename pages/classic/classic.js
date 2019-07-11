import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: true,
    latest: true,
    favNum: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        first: res.index == 1 ? true : false,
        favNum: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  handleOnLike: function (e) {
    let behavior = e.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  handleLeft: function (e) {
    this._getPreviousOrNext('next')
  },

  handleRight: function (e) {
    this._getPreviousOrNext('previous')
  },
  _getPreviousOrNext: function (prevOrNext) {
    let index = this.data.classic.index
    classicModel.getPreviousOrNext(index, prevOrNext, (res) => {
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
      this._getClassicLikeStatus(res.id, res.type)
    })
  },
  _getClassicLikeStatus (art_id, category) {
    likeModel.getClassicLike(art_id, category, (res) => {
      this.setData({
        favNum: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})