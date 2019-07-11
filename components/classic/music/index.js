import { classicBehavior } from '../classic_behavior'

const myMusic = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc: './images/player@play.png',
    pauseSrc: './images/player@pause.png'
  },

  attached: function (e) {
    if (myMusic.paused) {
      this.setData({
        playing: false
      })
      return
    }
    if (myMusic.src === this.properties.src) {
      this.setData({
        playing: true
      })
      return
    }

    myMusic.onPlay(() => {
      if (myMusic.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (myMusic.src === this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    })
    myMusic.onPause(() => {
      if (myMusic.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (myMusic.src === this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    })
    myMusic.onStop(() => {
      if (myMusic.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (myMusic.src === this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    })
    myMusic.onEnded(() => {
      if (myMusic.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (myMusic.src === this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangePlayStatus: function () {
      if (this.data.playing) {
        this.setData({
          playing: false
        })
        myMusic.pause()
      } else {
        this.setData({
          playing: true
        })
        myMusic.src = this.properties.src
        myMusic.title = this.properties.title
        myMusic.coverImgUrl = this.properties.img
      }
    }
  },
  _recoverStatus: function () {
    if (myMusic.paused) {
      this.setData({
        playing: false
      })
      return
    }
    if (myMusic.src === this.properties.src) {
      this.setData({
        playing: true
      })
      return
    }
  },

  _monitorSwitch: function () {
    myMusic.onPlay(() => {
      this._recoverStatus()
    })
    myMusic.onPause(() => {
      this._recoverStatus()
    })
    myMusic.onStop(() => {
      this._recoverStatus()
    })
    myMusic.onEnded(() => {
      this._recoverStatus()
    })
  }
})

function _recoverStatus() {
  if (myMusic.paused) {
    this.setData({
      playing: false
    })
    return
  }
  if (myMusic.src === this.properties.src) {
    this.setData({
      playing: true
    })
    return
  }
}

function _monitorSwitch () {
  myMusic.onPlay(() => {
    this._recoverStatus()
  })
  myMusic.onPause(() => {
    this._recoverStatus()
  })
  myMusic.onStop(() => {
    this._recoverStatus()
  })
  myMusic.onEnded(() => {
    this._recoverStatus()
  })
}
