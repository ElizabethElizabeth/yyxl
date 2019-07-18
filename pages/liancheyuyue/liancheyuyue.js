const app = getApp();
Page({

  /**  
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    date: "",
    array: ["8:00-11:00", "11:00-14:00", "14:00-18:00"],
    index:0,
    carList: [],
    index1:0,
    car_id: '',
    car_code:"",
    coach: "",
    c_num: "",
    t_num: "",
    user_id:"",
    course_id:""
    // yueList: app.globalData.yueList,
    // yue:{},
  },
  
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var kssj = this.data.array[this.data.index].slice(0, 4);
    var that=this;
    // 时间段改变，重新渲染页面
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log("时间段改变，重新请求")
        console.log(res.data)
        that.setData({
          car_code: res.data.datas.detail.car_code,
          coach: res.data.datas.detail.coach,
          c_num: res.data.datas.detail.c_num,
          t_num: res.data.datas.detail.t_num,
          course_id : res.data.datas.detail.id
        }) 
        
      }
    })
  },
  bindPickerChange1: function(e){
    this.setData({
      index1:e.detail.value,
      car_id:this.data.carList[e.detail.value].car_id
    })
    var kssj = this.data.array[this.data.index].slice(0, 4);
    var that = this;
    // 车号改变，重新渲染页面
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log("车号发生改变，重新请求")
        console.log(res.data)
        that.setData({
          car_code: res.data.datas.detail.car_code,
          coach: res.data.datas.detail.coach,
          c_num: res.data.datas.detail.c_num,
          t_num: res.data.datas.detail.t_num,   
          course_id : res.data.datas.detail.id    
        })
        
      }
    })
  },
  
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    
    var that=this;
    // 日期改变，重新渲染页面
    wx.request({
      url: 'http://c.16ylj.com/api/User/carList.html?date=' + this.data.date,//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          carList: res.data.datas.carList
        })
      },
      fail: function (err) {

      }
    })
    var kssj = this.data.array[this.data.index].slice(0, 4);
    // 日期改变，重新渲染页面
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log("日期发生改变，重新发送请求")
        console.log(res.data)
        that.setData({
          car_code: res.data.datas.detail.car_code,
          coach: res.data.datas.detail.coach,
          c_num: res.data.datas.detail.c_num,
          t_num: res.data.datas.detail.t_num,
          course_id : res.data.datas.detail.id
        })
        
      }
    })
  },

  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (option,e) {
    this.setData({
      car_id: option.car_id,
      date: option.date,
    })
    var that = this;
    // 从后台获取数组来渲染车号的下拉框
    wx.request({
      url: 'http://c.16ylj.com/api/User/carList.html?date='+this.data.date,//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        for(var i=0;i<res.data.datas.carList.length;i++){
          if(res.data.datas.carList[i].car_id==option.car_id)
            break;
        }
        that.setData({
          carList: res.data.datas.carList,
          index1:i
        })
      },
      fail: function (err) {

      }
    })
    
    var that = this;
    var kssj = this.data.array[this.data.index].slice(0, 4);
    console.log(this.data.date, this.data.car_id, kssj)
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          car_code: res.data.datas.detail.car_code,
          coach: res.data.datas.detail.coach,
          c_num: res.data.datas.detail.c_num,
          t_num: res.data.datas.detail.t_num,
          course_id : res.data.datas.detail.id
        })
       
      },
      fail: function (err) {

      }
    })
    
    // base64转换
    // wx.chooseImage({
    //   success: res => {
    //     wx.getFileSystemManager().readFile({
    //       filePath: res.tempFilePaths[0], //选择图片返回的相对路径
    //       encoding: 'base64', //编码格式
    //       success: res => { //成功的回调
    //         console.log('data:image/png;base64,' + res.data)
    //       }
    //     })
    //   }
    // })
    
      // var yue=app.globalData.carList.filter(elem=>elem.id==option.id)[0];
      // console.log(yue);
      // this.setData({yue});
      // this.setData({
      //   array: this.data.yue.shijian
      // })    
   
  },
  querenyuyue: function () {
    var that=this;
    wx.getStorage({
      key: 'user_id',
      success (res) {
        that.setData({
          user_id : res.data,
        })
        console.log(that.data.user_id, this.data.course_id)
      },
      fail (res) {
        console.log("失败了"+res)
      }  
    })
    
    wx.request({
      url: 'https://c.16ylj.com/api/User/order.html?user_id='+ that.data.user_id+'&course_id='+this.data.course_id,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {

      }
    }) 
    
    
    
   
    // wx.navigateTo({
    //   url: '../yuyuejieguo/yuyuejieguo?chehao=' + this.data.yue.chehao + "&chepai=" + this.data.yue.chepai + "&jiaolian=" + this.data.yue.jiaolian + "&riqi=" + this.data.date + "&shijian=" + this.data.array[this.data.index] 
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
