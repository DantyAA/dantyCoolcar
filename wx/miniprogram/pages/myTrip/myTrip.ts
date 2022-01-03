import { routing } from "../../utils/routing"

interface Trip{
    id: string
    start: string
    end: string
    duration: string
    fee: string
    distance: string
    status: string
}

interface MainItem{
  id : string
  navId : string
  navScrollId: string
  data : Trip
}

interface NavItem{
  id : string
  mainId : string
  lable: string
}

interface MainItemQueryResult{
  id: string
  top: number
  dataset:
  {
  navId: string
  navScrollId: string
  }
}

// pages/myTrip/myTrip.ts
Page({
  scrollStates:{
    mainItems:[] as MainItemQueryResult[],
  },
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
    navCount:0,  
    MainItems:[] as MainItem[],
    NavItems:[] as NavItem[],
    tripsHeight:0,
    mainScroll:'',
    scrollTop:0,
    navSel:'',
    navScroll:'',
  },

  onLoad(){
    this.populateTrips()
    this.setData({
      avatarURL:wx.getStorageSync("userinfo").avatarUrl || false
    })
  },

  onReady(){
    wx.createSelectorQuery().select('#heading')
      .boundingClientRect(rect => {
        wx.getSystemInfo({
          success:res=>{  
            console.log(res.windowHeight) 
            const height = res.windowHeight-rect.height
            this.setData({
              tripsHeight:height,
              navCount: Math.round(height/50),
            }) 
          },
          fail:err=>{
            console.log("this is fail",err)
          }
          
        })
      }).exec()
  },
  
  onRegisterTap(){
    wx.navigateTo({
      url:routing.register(),
    })
  },

  populateTrips(){
    const MainItems : MainItem[] = []
    const NavItems : NavItem[] = []
    let prevNav = ''
    for (let i = 0 ;i < 100;i++){
      const mainId = 'main-'+i
      const navId = 'nav-'+i
      const tripId = (10001+i).toString()
      if (!prevNav){
        prevNav = navId
      }
      MainItems.push({
        id:mainId,
        navId,
        navScrollId:prevNav,
        data:{
          id:tripId,
          start:'深圳',
          end:'长春',
          distance:'2600.0公里',
          duration: '10时40分',
          fee: '2400.00元',
          status:'已完成',
          }

      })
      NavItems.push({
        id:navId,
        mainId,
        lable:tripId,
      })

      if (i===0){
        this.setData({
          navSel : navId
        })
      }
      prevNav = navId
    }
    this.setData({
      MainItems,
      NavItems,
    },()=>{
      this.perpareScrollStates()
    })
  },

  perpareScrollStates(){
    wx.createSelectorQuery().selectAll('.main-item')
      .fields({
        id: true,
        dataset: true,
        rect:true,
      }).exec(res=>{
        console.log(res)
        this.scrollStates.mainItems = res[0]
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

  onNavItemTap(e:any){
    const mainId:string = e.currentTarget?.dataset?.mainId
    const navId:string = e.currentTarget?.id
    if(mainId && navId){
      this.setData({
        mainScroll:mainId,
        navSel: navId,
      }) 
    }
  },

  onMainScroll(e:any){
    console.log(e)
    const top:number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if (top === undefined){
      return
    }
    
    const selItem = this.scrollStates.mainItems.find(v =>v.top >= top)

    if (!selItem) {
      return
    }
    this.setData({
      navSel: selItem.dataset.navId,
      navScroll: selItem.dataset.navScrollId,
    })
  }
})