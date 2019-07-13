/**
 * 获取音乐信息
 * 1. 音乐列表 method=baidu.ting.billboard.billList&type=1&size=10&offset=0 
 * type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
 * size = 10 //返回条目数量
 * offset = 0 //获取偏移
 * 2. 搜索音乐 method=baidu.ting.search.catalogSug&query=海阔天空
 * query = ” //搜索关键字
 * 3. 播放音乐 method=baidu.ting.song.play&songid=877578 || method=baidu.ting.song.playAAC&songid=877578
 * 参数：songid = 877578 //歌曲id
 * 注：关于使用file_link不能播放的问题，是因为百度使用Http中的Referer头字段来防止盗链，在HTML文件中加上 <meta name=”referrer” content=”never”>这一句让发送出去的Http包都不含Referer字段就行了
 * 4. lrc歌词
 * 例：method=baidu.ting.song.lry&songid=877578
 * 参数：songid = 877578 //歌曲id
 * 5. 推荐列表
 * 例：method=baidu.ting.song.getRecommandSongList&song_id=877578&num=5
 * 参数： song_id = 877578
 * num = 5//返回条目数量
 * 6. 下载
 * 例：method=baidu.ting.song.downWeb&songid=877578&bit=24&_t=1393123213
 * 参数： songid = 877578//歌曲id
 * bit = 24, 64, 128, 192, 256, 320 ,flac//码率
 * _t = 1430215999,, //时间戳
 * 7. 获取歌手信息
 * 例：method=baidu.ting.artist.getInfo&tinguid=877578
 * 参数： tinguid = 877578 //歌手ting id
 * 8. 获取歌手歌曲列表
 * 例：method=baidu.ting.artist.getSongList&tinguid=877578&limits=6&use_cluster=1&order=2
 * 参数： tinguid = 877578//歌手ting id
 * limits = 6//返回条目数量
 */
function getMusicList(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting',
      data: data,
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

function getUrl(url, data) {
  url = url + '?'
  for (const key in data) {
    url += key + '=' + data[key] + '&'
  }
  url = url.slice(0, -1)
  return url
}

function prevMusic() {
  this.setData({
    isPlay: false
  })
  var index = this.data.musicList.findIndex((item) => {
    return item.song_id === this.data.currentSongId
  })
  var id = 877578
  var data = {
    method: 'baidu.ting.song.play',
    songid: id
  }
  if (index > -1) {
    if (index === 0) {
      index = this.data.musicList.length - 1
    } else {
      index--
    }
    id = this.data.musicList[index].song_id;
    data.songid = id;
    this.getMusicForPlay(data);
  } else {
    id = this.data.musicList[0].song_id
    data.songid = id
    this.getMusicForPlay(data)
  }
}

function nextMusic() {
  this.setData({
    isPlay: false,
    currentTime: 0
  })
  var index = this.data.musicList.findIndex((item) => {
    return item.song_id === this.data.currentSongId
  })
  var id = 877578
  var data = {
    method: 'baidu.ting.song.play',
    songid: id
  }
  if (index > -1) {
    if (index === this.data.musicList.length - 1) {
      index = 0
    } else {
      index++
    }
    id = this.data.musicList[index].song_id;
    data.songid = id;
    this.getMusicForPlay(data);
  } else {
    id = this.data.musicList[0].song_id
    data.songid = id
    this.getMusicForPlay(data)
  }
}

module.exports = {
  getMusicList: getMusicList,
  prevMusic: prevMusic,
  nextMusic: nextMusic
}