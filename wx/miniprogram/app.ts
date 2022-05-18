// app.ts
import camelcaseKeys from "camelcase-keys"
import { IAppOption } from "./appoption"
import { auth } from "./service/proto_gen/auth/auth_pb"
import { rental } from "./service/proto_gen/rental/rental_pb"
import { getSetting, getUserProfile } from "./utils/wxapi"
let resolveUserInfo: (value?: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo> | undefined) => void

App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve) => {
      resolveUserInfo = resolve
    })
  },
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    console.log(logs,Date.now())
    
    // 登录
    wx.login({
      success: res => {
        console.log(res) 
        wx.request({
          url:'http://localhost:8080/v1/auth/login',
          method:'POST',
          data:{
            code: res.code
          } as auth.v1.ILoginRequest,
          success: res=>{
            const loginResp:auth.v1.ILoginResponse = auth.v1.LoginResponse.fromObject(
              camelcaseKeys(res.data as object)
            )

            console.log(loginResp)
            wx.request({
              url:"http://localhost:8080/v1/rental/trip",
              method:'POST',
              data:{
                  start:'abc',
                  carId:'123',
                  toJSON:
              } as rental.v1.CreateTripRequest,
              header:{
                authorization: 'Bearer '+ loginResp.accessToken
              }
            })
          },
          fail: console.error

        })
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
}})