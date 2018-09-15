// 引入腾讯地图sdk核心类
const QQMapWX = require('./qqmap-wx-jssdk.min.js');

let qqmapsdk = new QQMapWX({
  key: 'Z2OBZ-DPY6P-IFJDP-VDVC7-O3XBS-QSF6G'
});

function getCityName(latitude, longitude) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          let name = res.result.address_component.city;
          return 'c';
          // that.globalData.city = res.result.address_component.city.replace('市', '');
        }
      })
}

module.exports = {
  getCityName
}