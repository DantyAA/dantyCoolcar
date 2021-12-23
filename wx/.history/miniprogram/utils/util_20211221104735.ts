const app = getApp<IAppOption>()

export function getSetting():Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject,
      })
    })
  }

export function getUserProfile(): Promise<WechatMiniprogram.GetUserInfoSuccessCallback> {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      desc:"xixixixixixi",
      success: resolve,
      fail: reject,
    })
  })
}