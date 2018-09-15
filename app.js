//app.js
const map = require('./utils/getCityName');

// 引入腾讯地图sdk核心类
const QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');

App({
  data: {
    city: '北京',
    API_250: 'https://douban.uieee.com/v2/movie/top250',
    API_theater: 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b',
    API_comingMovie: 'http://douban.uieee.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a',
    API_newMovie: 'http://douban.uieee.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
    API_movieInfo: 'https://douban.uieee.com/v2/movie/subject/'
  },
  map: map,
  onLaunch: function() {

    let that = this;

    let qqmapsdk = new QQMapWX({
      key: 'Z2OBZ-DPY6P-IFJDP-VDVC7-O3XBS-QSF6G'
    });

    wx.getLocation({
      success: function(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            wx.setStorage({
              key: 'city',
              data: res.result.address_component.city.replace('市', ''),
            })
          }
        })
      }
    });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    city: '北京'
  }
})