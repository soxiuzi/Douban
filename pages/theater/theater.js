// pages/theater/theater.js

let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theaterList: [],
    start: 0,
    count: 20,
    page: 1,
    totalPage: 0,
    loading: false,
    city: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(res) {
    wx.setNavigationBarTitle({
      title: '正在上映的电影-' + res.city,
    });
    this.setData({
      city: res.city
    })
    this.loadMore(this.data.start, this.data.count);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      theaterList: [],
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
      if (this.data.page <= Math.ceil(this.data.totalPage / 20) - 1) {
        let start = this.data.count * this.data.page;
        this.loadMore(start, this.data.count);
        this.setData({
          page: ++this.data.page
        })
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  loadMore: function(start, count) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000
    })
    let that = this;
    wx.request({
      url: App.data.API_theater + '&city=' + that.data.city + '&start=' + start + '&count=' + count,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        let movieArr = that.data.theaterList;
        res.data.subjects.map(item => {
          movieArr.push(item);
        })
        wx.hideToast();
        wx.stopPullDownRefresh();
        that.setData({
          theaterList: movieArr,
          totalPage: res.data.total
        })
      }
    })
  }
})