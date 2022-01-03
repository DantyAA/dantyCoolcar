// lock/lock.ts

import { routing } from "../../utils/routing"

const shareLocationKey = "share_location"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarURL:'',
    shareLocation:false,
  },

  async onLoad(opt:Record<'car_id', string>){
    const o:routing.LockOpts = opt
    console.log("unlocking car",o.car_id)
    this.setData({
      avatarURL:wx.getStorageSync("userinfo").avatarUrl || false,
      shareLocation: wx.getStorageSync(shareLocationKey) || false

    })
    console.log(wx.getStorageSync(shareLocationKey))
  },

  onGetUserInfo(e:any){
    console.log("avatarURL=",this.data.avatarURL)
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    if (userInfo){
      wx.setStorageSync("userinfo",userInfo)
      this.setData({
      avatarURL:userInfo?.avatarUrl
    })
    }
  },

  onShareLocation(e:any){
    const shareLocation:boolean = e.detail.value
   
    wx.setStorageSync(shareLocationKey,shareLocation)
  },

  onUnlockTap(){
    wx.getLocation({
      type: 'gcj02',
      success: loc=>{
        console.log("starting a trip ",{
          location:{
            latitude:loc.latitude,
            longitude:loc.longitude
          },
          avatarURL:this.data.shareLocation? this.data.avatarURL:'',
        })

        const tripID = 'trip456'

        wx.showLoading({
          title:"等待开锁中",
          mask:true,
        })

        setTimeout(()=>{
          wx.redirectTo({
            //url:`../driving/driving?trip_id=${tripID}`,
            url: routing.drving({
              trip_id:tripID,
            }),
            complete:()=>{
              wx.hideLoading()
            }
          })
        },2000)
      },
      fail:()=>{
        wx.showToast({
          icon:'none',
          title: '请前往设置页面授权未知信息' 
        })
      }
    })
    

  },
})