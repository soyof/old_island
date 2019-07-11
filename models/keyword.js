import { HTTP } from '../utils/http_promise'
class KeywordModel extends HTTP {
  key = 'keyword'
  maxLength = 10

  getHistory () {
    return wx.getStorageSync(this.key) || []
  }

  getHotSearch () {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  setToHistory (keyword) {
    let keywordArr = this.getHistory()
    let flag = keywordArr.includes(keyword)

    if (flag) return
    if (keywordArr.length >= this.maxLength) {
      keywordArr.pop()
    }
    keywordArr.unshift(keyword)
    wx.setStorageSync(this.key, keywordArr)
  }

}

export {
  KeywordModel
}
