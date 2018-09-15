//index.js

let App = getApp();
Page({
  data: {
    city: App.data.city,
    theaterList: [],
    willShowList: [],
    newMovie: [],
    movieTop: [],
    list: [],
    title: '加载中...'
  },
  // 当页面初始化时记载APId
  onLoad: function() {
    let that = this;

    wx.getStorage({
      key: 'city',
      success: function(res) {
        that.setData({
          city: res.data
        })
      },
    })
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000
    })
   
    
    // 获取正在上映的电影
    wx.request({
      url: App.data.API_theater + '&city=' + App.data.city + '&start=0&count=8',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        that.setData({
          theaterList: res.data.subjects
        })
      }
    });
    // 获取即将上映的电影
    wx.request({
      url: App.data.API_comingMovie + '&city=' + App.data.city + '&start=0&count=8',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        that.setData({
          willShowList: res.data.subjects
        })
      }
    });
    // 获取豆瓣电影新片榜
    wx.request({
      url: App.data.API_newMovie,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        let newMovies = res.data.subjects.map((item, index) => {
          if(index < 8) {
            return item
          }
        }).filter(item => item !== undefined);
        that.setData({
          newMovie: newMovies
        })
      }
    });
    // 获取豆瓣电影Top250
    wx.request({
      url: App.data.API_250 + '?start=0&count=8',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        wx.hideToast();
        that.setData({
          movieTop: res.data.subjects
        })
      }
    })
  },
})