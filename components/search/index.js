import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
import { paginationBehavior } from '../behavior/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBehavior],
  properties: {
    more: {
      type: String,
      observer: 'getMore'   // 调用getMore方法获取更多数据,当more的值改变的时候,触发observer
    }
  },

  data: {
    searchInputValue: '',
    historyKeyword: [],
    hotSearchList: [],
    searching: false,
    loadingCenter: false
  },

  attached () {
    wx.showLoading()
    keywordModel.getHotSearch().then(res => {
      this.setData({
        historyKeyword: keywordModel.getHistory(),
        hotSearchList: res.hot
      })
      wx.hideLoading()
    })
    
  },

  methods: {
    handleCancel () {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    handleConfirm (e) {
      this._showLoadingCenter()
      let word = e.detail.value || e.detail.text
      word = this._judgeWord(word)  // 校验word是否为空或者超过限定长度
      if (!word) return
      this._showResult(word)
      this.initialize()  // 初始化数据
      bookModel.search(this.getCurrentStart(), this.getCount(), word).then(res => {
        keywordModel.setToHistory(word)
        this.setTotal(res.total)
        this.setMoreData(res.books)
        this.setData({
          historyKeyword: keywordModel.getHistory()
        })
        this._hideLoadingCenter()
      })
    },

    handleDelete () {
      this.initialize()
      this.setData({
        searching: false,
        searchInputValue: ''
      })
    },

    getMore () {
      let start = this.getCurrentStart()
      let count = this.getCount()
      let word = this.data.searchInputValue
      if (!this.hasMore() || !word) {
        return
      }
      if (this.isLocked()) {
        return
      }
      this.locked()
      bookModel.search(start, count, word).then(res => {
        this.setMoreData(res.books)
        this.unLocked()
      }, () => {
        this.unLocked()  // 请求失败时 也需解锁,否则下次请求不能发起
      })
    },

    _showResult (word) {
      this.setData({
        searching: true,
        searchInputValue: word
      })
    },

    _judgeWord (word) {
      if (!word) {
        wx.showToast({
          title: '搜索内容不能为空',
          icon: 'none'
        })
        return false
      }
      word = word.trim()
      if (word.length > 20) {
        wx.showToast({
          title: '搜索内容不能超过20个字符',
          icon: 'none'
        })
        return false
      }
      return word
    },

    _showLoadingCenter () {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter () {
      this.setData({
        loadingCenter: false
      })
    }
  }
})
