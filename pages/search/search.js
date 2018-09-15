// pages/search/search.js
var API_URL = 'http://douban.uieee.com/v2/movie/search';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    searchResult: '',
    showMovie: false,
    start: 0,
    count: 20,
    page: 1,
    totalPage: 0,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  search: function(res) {
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading',
      duration: 10000
    })
    this.setData({
      searchResult: res.detail.value
    })
    // var that = this;
    // var searchVal = res.detail.value;
    this.loadMore(this.data.start, this.data.count);
    // wx.request({
    //   url: API_URL + '?q=' + searchVal,
    //   method: 'GET',
    //   header: {
    //     'content-type': 'json'
    //   },
    //   success: function(res) {
    //     if(res.data.subjects.length < 1) {
    //       that.setData({
    //         showMovie: true,
    //         searchResult: '对不起，没有找到您搜索的电影...'
    //       })
    //     }
    //     wx.hideToast();
    //     that.setData({
    //       searchList: res.data.subjects
    //     })
    //   }
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading) {
      return;
    } else {
      if (this.data.page <= Math.ceil(this.data.totalPage / 20) - 1) {
        let start = this.data.count * this.data.page;
        this.loadMore(start, this.data.count);
        this.setData({
          page: ++this.data.page
        })
        console.log(this.data.page);
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
  loadMore: function (start, count) {
    let searchVal = this.data.searchResult;
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 10000
    })
    let that = this;
    wx.request({
      url: API_URL + '?q=' + searchVal + '&start=' + start + '&count=' + count,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        let movieArr = that.data.searchList;
        res.data.subjects.map(item => {
          movieArr.push(item);
        })
        wx.hideToast();
        wx.stopPullDownRefresh();
        that.setData({
          searchList: movieArr,
          totalPage: res.data.total
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})