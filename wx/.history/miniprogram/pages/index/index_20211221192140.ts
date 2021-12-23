// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    setting:{
      skew:0,
      rotate:0,
      showLocation: true,
      showScale:true,
      subKey:"",
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,

    },
    location:{
      latitude: 23.099994,
      longitude: 113.324520,
    },
    scale:10,
    makers:

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getLocation(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
        console.log(res.latitude,res.longitude)
      }
     })
  }
})
