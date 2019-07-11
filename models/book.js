import { HTTP } from '../utils/http_promise'

class BookModel extends HTTP {
  getHotBooks () {
    return this.request({
      url: 'book/hot_list'
    })
  }

  search (start, count, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        start,
        count,
        q
      }
    })
  }

  getDetail (id) {
    return this.request({
      url: `/book/${id}/detail`
    })
  }

  getLikeStatus (id) {
    return this.request({
      url: `/book/${id}/favor`
    })
  }

  getComments (id) {
    return this.request({
      url: `/book/${id}/short_comment`
    })
  }

  postComment (id, comment) {
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: id,
        content: comment
      }
    })
  }

  getMyBookCount () {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export {
  BookModel
}
