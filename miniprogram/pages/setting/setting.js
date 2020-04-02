const app = getApp();
import create from '../../utils/create'
import store from '../../store/index'
const log = console.log.bind(console)

create(store, {
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    theme: {},
    distanceUnit:{},
    refreshfrequencyValue: '',
    refreshfrequency: {},
    languageValue: '',
    language: {},
    use: [
      'themeValue'
    ]
  },
  onLoad: function (e) {
    // wx.hideLoading()
  },
  onShow: function (e) {
    const t = this
    let $$ = wx.getStorageSync('$$')
    t.setData({
      theme: $$.theme,
      // temperatureUnit : $$.temperatureUnit,
      // temperatureUnitValue:$$.temperatureUnitValue,
      // distanceUnit : $$.distanceUnit,
      // distanceUnitValue:$$.distanceUnitValue,
      refreshfrequency: $$.refreshfrequency,
      refreshfrequencyValue: $$.refreshfrequencyValue,
      indexHeadImageValue:$$.indexHeadImageValue,
      indexHeadImage:$$.indexHeadImage,
      language: $$.language,
      languageValue: $$.languageValue
    })
  },
  indexHeadImageRadioChange:function(e){
    log('[indexHeadImageRadioChange]', e.detail.value )
    let
      t = this,
      indexHeadImageValue = e.detail.value.toString(),
      indexHeadImage = {
        indexHeadImageBing:false,
        indexHeadImageNASA:false,
        indexHeadImageCus:false
      }
    if(indexHeadImageValue == 'Bing'){
      indexHeadImage['indexHeadImageBing'] = true
    }
    else if(indexHeadImageValue == 'NASA'){
      indexHeadImage['indexHeadImageNASA'] = true
    }
    else{
      indexHeadImage['indexHeadImageCus'] = true
    }
    t.setData({
      indexHeadImageValue: indexHeadImageValue,
      indexHeadImage: indexHeadImage,
      modalName: null
    })
    t.store.data.indexHeadImageValue = indexHeadImageValue
    app.changeStorage('indexHeadImageValue', indexHeadImageValue)
    app.changeStorage('indexHeadImage', indexHeadImage)
  },
  themeRadioChange: function (e) {
    log('[themeRadioChange]', e.detail.value)
    let t = this,
      themeValue = e.detail.value.toString(),
      theme = {
        switch_themeChecked_light: false,
        switch_themeChecked_dark: false
      }
    if(themeValue == '明亮'){
      theme['switch_themeChecked_light'] = true
    }else{
      theme['switch_themeChecked_dark'] = true
    }
    t.setData({
      themeValue: themeValue,
      theme: theme,
      modalName: null
    })
    let
      pages = getCurrentPages(),
      prevPage = pages[pages.length - 2];
    prevPage.setData({
      canDrawSunCalcAgain: true
    })
    t.store.data.themeValue = themeValue
    app.changeStorage('themeValue', themeValue)
    app.changeStorage('theme', theme)
  },
  refreshfrequencyRadioChange:function(e){
    log('[refreshfrequencyRadioChange]', e.detail.value )
    let
      t = this,
      refreshfrequencyValue = e.detail.value.toString(),
      refreshfrequency = {
        switch_refreshfrequencyChecked_1: false,
        switch_refreshfrequencyChecked_5: false,
        switch_refreshfrequencyChecked_10: false,
        switch_refreshfrequencyChecked_30: false,
        switch_refreshfrequencyChecked_60: false
      }
    if(refreshfrequencyValue == '1分钟'){
        refreshfrequency['switch_refreshfrequencyChecked_1'] = true
    }
    else if(refreshfrequencyValue == '5分钟'){
      refreshfrequency['switch_refreshfrequencyChecked_5'] = true
    }
    else if(refreshfrequencyValue == '10分钟'){
      refreshfrequency['switch_refreshfrequencyChecked_10'] = true
    }
    else if(refreshfrequencyValue == '30分钟'){
      refreshfrequency['switch_refreshfrequencyChecked_30'] = true
    }
    else{
      refreshfrequency['switch_refreshfrequencyChecked_60'] = true
    }
    t.setData({
      refreshfrequencyValue: refreshfrequencyValue,
      refreshfrequency: refreshfrequency,
      modalName: null
    })
    t.store.data.refreshfrequencyValue = refreshfrequencyValue
    app.changeStorage('refreshfrequencyValue', refreshfrequencyValue)
    app.changeStorage('refreshfrequency', refreshfrequency)
  },
  // languageTap: function (e) {
  //   var t = this,
  //     id = e.currentTarget.id,
  //     language = {
  //       switch_languageChecked_ChineseTraditional: false,
  //       switch_languageChecked_Japan: false,
  //       switch_languageChecked_Chinese: false,
  //       switch_languageChecked_English: false
  //     }
  //   log(e)
  //   language[id] = true
  //   app.changeStorage('language', language)
  // },

  languageRadioChange: function (e) {
    var t = this,
      language = {
        switch_languageChecked_ChineseTraditional: false,
        switch_languageChecked_Japan: false,
        switch_languageChecked_Chinese: false,
        switch_languageChecked_English: false
      },
      languageValue = e.detail.value.toString()
    log('[languageValue] =>', e.detail.value.toString())
    if (e.detail.value == 'English') {
      language['switch_languageChecked_English'] = true
      log('[language] =>', 'switch_languageChecked_English = true')
    }
    if (e.detail.value == '中文简体') {
      language['switch_languageChecked_Chinese'] = true
      log('[language] =>', 'switch_languageChecked_Chinese = true')
    }
    if (e.detail.value == '日本語') {
      language['switch_languageChecked_Japan'] = true
      log('[language] =>', 'switch_languageChecked_Japan = true')
    }
    if (e.detail.value == '中文繁體') {
      language['switch_languageChecked_ChineseTraditional'] = true
      log('[language] =>', 'switch_languageChecked_ChineseTraditional = true')
    }
    this.setData({
      language: language,
      languageValue: languageValue,
      modalName: null
    })
    let $$ = wx.getStorageSync('$$')
    $$.language = language
    $$.languageValue = languageValue
    wx.setStorageSync('$$', $$)

    // t.saveData("isRequestUserInfoAgain", 1);
  },
  showProModeModal(e) {
    const t = this
    let $$ = wx.getStorageSync('$$')
    if ($$.proMode == true) {
      wx.navigateTo({
        url: 'pro/pro'
      });
    } else {
      t.setData({
        modalName: e.currentTarget.dataset.target
      })
    }
  },
  // ensureOpenProMode: function (e) {
  //   var t = this
  //   wx.getWeRunData({
  //     success(res) {
  //       wx.checkSession({
  //         success: function () {
  //           wx.BaaS.wxDecryptData(res.encryptedData, res.iv, 'we-run-data').then(decrytedData => {
  //             //检查用户运动步数是否达到开通专业模式要求
  //             t.store.data.decrytedData = decrytedData
  //             if (t.store.data.decrytedData.stepInfoList[30].step >= 0) {
  //               wx.cloud.callFunction({
  //                 name: 'proMode',
  //                 data: {
  //                   id: $$.data.created_by
  //                 },
  //                 success(res) {
  //                   wx.showToast({
  //                     title: '开通成功',
  //                     icon: 'success',
  //                     duration: 2000,
  //                   });
  //                   console.log(res)
  //                   app.changeStorage('proMode', true)
  //                   // t.saveData("isRequestUserInfoAgain", 1);
  //                 },
  //                 fail(res) {
  //                   console.log(res)
  //                 }
  //               })
  //             } else {
  //               wx.showModal({
  //                 title: '无法开通',
  //                 content: '您当前步数不足10000步',
  //                 success(res) {
  //                   if (res.confirm) {} else if (res.cancel) {}
  //                 }
  //               })
  //             }
  //           }, err => {})
  //         },
  //         fail: function () {
  //           wx.BaaS.logout()
  //           wx.BaaS.login()
  //         }
  //       })
  //     }
  //   })
  //   t.setData({
  //     modalName: null
  //   })
  // },
  showModal(e) {
    var t = this
    t.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    var t = this
    t.setData({
      modalName: null
    })
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  navChange(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.cur + '/' + e.currentTarget.dataset.cur
    });
  },
  onShareAppMessage: function (a) {
    return {
      title: '奇妙天气',
      imageUrl: 'https://weather.ioslide.com/shareimg.png',
      path: "/pages/index/index"
    };
  },
  saveData: function (a, t) {
    a && t && wx.setStorage({
      key: a,
      data: t
    });
  },
  onHide: function () {
    var t = this
    // t.store.data.refreshfrequencyValue = t.data.refreshfrequencyValue
    // t.store.data.languageValue = t.data.languageValue
    // t.store.data.themeValue = t.data.themeValue
  },
  onDev: function () {
    wx.showModal({
      title: '没钱开发中',
      content: '不要期待',
      success(res) {}
    })
  },
  onGetWeRunData() {
    wx.getWeRunData({
      success: res => {
        wx.cloud.callFunction({
          name: 'openapi',
          data: {
            action: 'getWeRunData',
            // info 字段在云函数 event 对象中会被自动替换为相应的敏感数据
            info: wx.cloud.CloudID(res.cloudID),
          },
        }).then(res => {
          console.log('[onGetWeRunData] 收到 echo 回包：', res)

          this.setData({
            weRunResult: JSON.stringify(res.result),
          })
        }).catch(err => {
          console.log('[onGetWeRunData] 失败：', err)
        })
      }
    })
    t.setData({
      modalName: null
    })
  },
  onGetUserInfo(e) {
    console.log(e)
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getOpenData',
        openData: {
          list: [
            e.detail.cloudID,
          ]
        }
      }
    }).then(res => {
      console.log('[onGetUserInfo] 调用成功：', res)

      this.setData({
        userInfoResult: JSON.stringify(res.result),
      })
    })
  }
})