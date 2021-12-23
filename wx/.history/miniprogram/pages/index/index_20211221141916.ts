// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    longitude: 192.11,
    latitude:168.11,
    markers:
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
