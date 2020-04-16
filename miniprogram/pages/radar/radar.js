const app = getApp()
const log = console.log.bind(console)
const error = console.error.bind(console)
import create from '../../utils/create'
import store from '../../store/index'
create(store, {
  data: {
    use: [
      'themeValue'
    ]
  },
  onLoad: function (options) {
    log(options)
    const t = this
    let radarSrc = 'https://earth.weather.ioslide.com/#current/wind/surface/level/orthographic=' + options.longitude + ',' + options.latitude + ',3000'
    log('[radarSrc]',radarSrc)
    t.setData({
      radarSrc : radarSrc
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function (a) {
    return {
      title: '奇妙天气',
      imageUrl: 'https://weather.ioslide.com/shareimg.png',
      path: "/pages/index/index"
    };
  },
})