// pages/myTrip/myTrip.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoPlay: true,
    interval: 3000,
    duration:500,
    circular: true,
    multiltemCount:1,
    prevMargin:'',
    nextMargin:'',
    vertical: false,
    imgUrls:[
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201706%2F07%2F20170607174114_wQuUf.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643206149&t=c94041627efbfaef6e115de593a968ee',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11643372691%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643206159&t=7df62da45f74075da3095172a3c7bdea',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F24%2F14%2F5ba4ad60885b9.jpg%21%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643206159&t=eb4fdd4d4b099c7f414474b4f9134b56'
    ],
    avatarURL:'',
  },

  onLoad(){
    this.setData({
      avatarURL:wx.getStorageSync("userinfo").avatarUrl || false
    })
  },
  
  onRegisterTap(){
    wx.navigateTo({
      url:'../register/register'
    })
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
})