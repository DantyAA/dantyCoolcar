// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

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
    ]

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




  moverCars(){
    const map = wx.createMapContext("map")
    const dest={
      latitude: 23.099994,
      longitude:113.324520
    }
    
    const moveCar = () =>{
      
      dest.latitude += 0.1
      dest.longitude += 0.1
      this.data{
        
      }
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
  

  getLocation(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
        console.log(res.latitude,res.longitude)
      }
     })
  }
})
