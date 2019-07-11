import { HTTP } from '../utils/http'

class ClassicModel extends HTTP {
  getLatest (sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  getPreviousOrNext (index, previousOrNext, sCallback) {
    let ids = previousOrNext == 'next' ? (index + 1) : (index - 1)
    let classic = wx.getStorageSync(this._getKey(ids))
    if (classic) {
      sCallback(classic)
    } else {
      this.request({
        url: `/classic/${index}/${previousOrNext}`,
        success: (res) => {
          sCallback(res)
          wx.setStorageSync(this._getKey(res.index), res)
        }
      })
    }
  }

  isFirst (index) {
    return index == 1 ? true : false
  }

  isLatest (index) {
    var latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor (success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  _setLatestIndex (index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex () {
    return wx.getStorageSync('latest')
  }

  _getKey (index) {
    return 'classic_' + index
  }

}

export {
  ClassicModel
}
