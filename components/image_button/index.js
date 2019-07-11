// components/image_button/index.js
Component({
  options: {
    multipleSlots: true
  },

  properties: {
    openType: {
      type: String
    }
  },

  data: {

  },

  methods: {
    handleGetUserInfo: function (e) {
      this.triggerEvent('getUserInfo', e.detail, {})
    }
  }
})
