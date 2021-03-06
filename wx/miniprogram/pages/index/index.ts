import { routing } from "../../utils/routing"

// 获取应用实例

Page({
  data: {
    setting:{
      skew:0,
      rotate:0,
      showLocation: true,
      showScale:true,
      subKey:"",
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,

    },
    location:{
      latitude: 23.099994,
      longitude: 113.324520,
    },
    scale:10,
    markers:[
      {
        iconPath:"../../material/index_map/car.png",
        id:0,
        latitude:23.099994,
        longitude:113.324520,
        width:50,
        height:50
      },
      {
        iconPath:"../../material/index_map/car.png",
        id:1,
        latitude:23.099994,
        longitude:114.324520,
        width:50,
        height:50
      }
    ],
    avatarURL:'',

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    } 
  },

  onShow(){
    if (wx.getStorageSync("userinfo").avatarUrl){
      this.setData({
        avatarURL:wx.getStorageSync("userinfo").avatarUrl || false
      })
    }
  },


  moverCars(){
    const map = wx.createMapContext("map")
    const dest={
      latitude: 23.099994,
      longitude:113.324520
    }
    
    const moveCar = () =>{
      
      dest.latitude += 0.1
      dest.longitude += 0.1
      map.translateMarker({
      destination: {
        latitude: dest.latitude ,
        longitude:dest.longitude , 
        },
      markerId:0,
      autoRotate:false,
      rotate:0,
      duration:5000,
      animationEnd: moveCar
      },
    ) 
  }
    moveCar()
  },
  

  onScanTap(){
    wx.scanCode({
      success:async ()=>{
        await this.selectComponent('#licModal').showModal()
        const carID = 'car123'
        const redirectURL = routing.lock({
          car_id:carID
          })
        wx.navigateTo({
          //url:`../register/register?redirect=${encodeURIComponent(redirectURL)}`
          url: routing.register({
            redirectURL:redirectURL
          })
        })

        this.setData({
          showModal:true
        })
      }
    })
  },


  getLocation(){
    const map = wx.createMapContext('map')
    map.moveToLocation({
      longitude:this.data.location.longitude,
      latitude:this.data.location.latitude, 
    })

  },

  onMyTripsTap(){
    wx.navigateTo({
      url:"../myTrip/myTrip",
    })
  },
})
