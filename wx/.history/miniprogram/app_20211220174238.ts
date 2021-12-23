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
  if (setting.authSetting['scope.userInfo']){
    const userInfoRes = await getUserInfo()
        resolveUserInfo(userInfoRes.userInfo)
    console.log("123123123123",this.globalData.userInfo)
  }
  }
})