// app.ts

import { getSetting, getUserProfile } from "./utils/util"


App<IAppOption>({
  globalData: {
    userInfo:WechatMiniprogram.UserInfo
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
  if (setting.authSetting['scope.userInfo']){
    getUserProfile()
    console.log("123123123123",this.globalData.userInfo)
  }
  }
})