import { routing } from "../../utils/routing"

// register/register.ts
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    redirectURL:'',
    licImgURL:'',
    //licImgURL:"../../material/register/driving_license.jpeg",
    genders:['未知','男','女','不男不女','我不说'],
    genderIndex: 0,
    date:"1995-05-03",
    lic_name:'',
    lic_number:'',
    state: 'UNSUBMITTED' as 'UNSUBMITTED'|'PEDING'|'VERIFIED',

    
  },



  onLoad(opt: Record<'redirect',string>){
    const o: routing.RegisterOpts = opt
    if (o.redirect){
      this.setData({
        redirectURL:decodeURIComponent(o.redirect)
        
      })
      
      }
  },

  onUploadLic(){
    wx.chooseImage({
      success: res =>{
        if(res.tempFilePaths.length>0){
          this.setData({
            licImgURL:res.tempFilePaths[0]
          })
          setTimeout(() => {
              this.setData({
                lic_name: '吴彦祖',
                lic_number: "21000000019950503",
                genderIndex: 1,
                date: "2021-12-23"
              })
            },2000)
        }

      }
    })
  },
  onGenderChange(e:any){
    this.setData({
      genderIndex : e.detail.value
    
    })
  },
  DateChange(e:any) {
    this.setData({
      date: e.detail.value
    })
  },

  onSubmit(){
    this.setData({
      state: 'PEDING',
    })
    setTimeout(()=>{
      this.onLicVerified()
      },3000
    )
  },
  unSubmit(){
    this.setData({
      state: 'UNSUBMITTED',
      licImgURL: ''
    })
  },
  onLicVerified(){
    this.setData({
      state:'VERIFIED'
    })
  },
  confirm(){
    console.log(this.data.redirectURL)
    if (this.data.redirectURL){
      wx.redirectTo({
        url:this.data.redirectURL
      })
    }else{
      wx.navigateBack()
    } 
  }
})