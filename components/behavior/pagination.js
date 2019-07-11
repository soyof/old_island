const paginationBehavior = Behavior({
  data: {
    bookList: [],
    noneResult: false,
    loading: false,
    total: null,
    start: 0,
    count: 10
  },

  methods: {
    setMoreData (bookList) {
      let tempArray = this.data.bookList
      tempArray = tempArray.concat(bookList)
      this.setData({
        bookList: tempArray,
        start: this.data.start + this.data.count
      })
    },

    getCurrentStart () {
      return this.data.start
    },

    getCount () {
      return this.data.count
    },

    setTotal (total) {
      this.data.total = total
      if (total === 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    hasMore () {
      if (this.data.start >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    initialize () {
      this.setData({
        bookList: [],
        start: 0,
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },

    isLocked () {
      return this.data.loading ? true : false
    },

    locked () {
      this.setData({
        loading: true
      })
    },

    unLocked () {
      this.setData({
        loading: false
      })
    }
  }
})

export {
  paginationBehavior
}