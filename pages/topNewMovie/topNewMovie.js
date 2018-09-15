// pages/topNewMovie/topNewMovie.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMoviesTop: [],
    start: 0,
    count: 20,
    page: 1,
    totalPage: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadMore(this.data.start, this.data.count);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      loading: false,
      page: 1,
    })
    this.loadMore(0, 20);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loading) {
      return;
    } else {
      wx.showToast({
        title: '无更多内容！',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        loading: true
      })
    }
  },
  loadMore: function(start, count) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000
    })
    let that = this;
    wx.request({
      url: App.data.API_newMovie + '&city=' + App.data.city + '&start=' + start + '&count=' + count,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        wx.hideToast();
        wx.stopPullDownRefresh();
        that.setData({
          newMoviesTop: res.data.subjects
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})