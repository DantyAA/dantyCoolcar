// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
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
})
