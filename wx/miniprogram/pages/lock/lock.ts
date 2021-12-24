// lock/lock.ts

const shareLocationKey = "share_location"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarURL:'',
    shareLocation:false,
  },

  async onLoad(){

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
      console.log(userInfo)
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
    wx.showLoading({
      title:"等待开锁中",
      mask:true,
    })
    setTimeout(()=>{
      wx.redirectTo({
        url:"../driving/driving",
        complete:()=>{
          wx.hideLoading()
        }
      })
    },2000)
  },
})