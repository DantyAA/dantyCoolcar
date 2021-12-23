// app.ts

import { getSetting, getUserProfile } from "./utils/util"
let resolveUserInfo: (value?: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo> | undefined) => void
let rejectUserInfo: (reason?: any) => void

App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfo = resolve
      rejectUserInfo = reject
    })
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
    const userInfoRes = await getUserProfile()
    resolveUserInfo(userInfoRes.userInfo)

  }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
}}
)