// pages/driving/driving.ts

const centPerSec = 18.981829761239


function formatDuration(sec: number){
  const padString = (n:number) =>{
    return n<10 ? '0'+n.toFixed(0): n.toFixed(0)
  }
  const h = Math.floor(sec/3600)
  sec -= 3600 * h
  const m =Math.floor(sec/60)
  sec -= 60 * m
  const s = Math.floor(sec)
  return `${padString(h)}:${padString(m)}:${padString(s)}`
}

function formatFee(cents:number){
  return (cents/100).toFixed(2)
}


Page({

  /**
   * 页面的初始数据
   */
  timer : undefined as number|undefined,
  data: {
    location:{
      latitude:39.92,
      longitude:116.46,
    },
    scale:14,
    elapsed:"00:00:00",
    sents:""
  },
  setupLocationUpdator(){
    wx.startLocationUpdate({

    })
    wx.onLocationChange(loc=>{
      console.log(loc.latitude,loc.longitude)
      this.setData({
        location:{
          latitude:loc.latitude,
          longitude:loc.longitude
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad( opt) {
    console.log('current trip',opt.trip_id)
    this.setupLocationUpdator()
    this.setupTimer()
  },
  onUnload(){
    wx.stopLocationUpdate()
     if (this.timer){
       clearInterval(this.timer)
     }
  },

  setupTimer(){
    let elapsedSec = 0
    let sents = 0
    this.timer = setInterval(()=>{
      elapsedSec++
      sents+=centPerSec
      this.setData({
        elapsed:formatDuration(elapsedSec),
        sents:formatFee(sents),
      })
    },0.05)
  },

  
})