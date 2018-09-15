// pages/indexSwipe/indexSwipe.js
let API_newMovie = 'http://douban.uieee.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&city=%E8%B4%B5%E9%98%B3&start=0&count=3'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: API_newMovie,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        let images = res.data.entries.map(item => {
          return item.images.large
        })
        that.setData({
          movies: images
        })
      }
    })
  },
  start: function() {
    // console.log('测试');
    wx.reLaunch({
      url: '/pages/index/index',
      success: function(res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})