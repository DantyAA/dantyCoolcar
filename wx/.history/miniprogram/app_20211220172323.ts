// app.ts

import { getSetting, getUserProfile } from "./utils/util"


App<IAppOption>({
  globalData: {
  },
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
    }
  })
  const setting= await getSetting()
  console.log(setting.authSetting)
  if (c)
  }
})