import { BookModel } from '../../models/book'
import { random } from '../../utils/common'

const bookModel = new BookModel()

Page({
  data: {
    bookList: null,
    searchFlag: false,
    more: ''
  },

  onLoad: function (options) {
    bookModel.getHotBooks().then(res => {
      this.setData({
        bookList: res
      })
    })
  },

  handleCancelSearch () {
    this.setData({
      searchFlag: false
    })
  },

  handleShowSearch () {
    this.setData({
      searchFlag: true
    })
  },

  onReachBottom () {
    this.setData({
      more: random(16)
    })
  }
})