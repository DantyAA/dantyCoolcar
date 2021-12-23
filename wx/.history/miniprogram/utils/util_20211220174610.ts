const app = getApp<IAppOption>()

export function getSetting():Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject,
      })
    })
  }

export function getUserInfo(): Promise<WechatMiniprogram.GetUserProfileSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc:"xixixixixixi",
      success: res=>{
        resolve(res)
      },
      fail: reject,
    })
  })
}