import {HTTP} from '../utils/http'

class LikeModel extends HTTP {
  like (behavior, artId, category) {
    let url = behavior ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  getClassicLike (atrId, category, sCallback) {
    this.request({
      url: `classic/${category}/${atrId}/favor`,
      success: sCallback
    })
  }

}

export {
  LikeModel
}
