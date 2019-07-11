// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean  // 默认值为false
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOnLike: function (e) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count: count
      })

      // 激活组件从而将数据的改变传出去
      let behavior = this.properties.like ? true : false
      this.triggerEvent('like', {
        behavior: behavior
      }, {})

    }
  }
})
