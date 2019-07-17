// pages/liancheyuyue/liancheyuyue.js
const app = getApp();
var util=require('../../utils/util.js');
Page({

  /**  
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    date: "",
    array: ["8:00-11:00", "11:00-14:00", "14:00-18:00"],
    index:0,
    index1:0,
    carList: [],
    zhuangtai:'',
    car_id: '',
    car_code:"",
    coach: "",
    c_num: "",
    t_num: ""
   
    
    // yueList: app.globalData.yueList,
    // yue:{},
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var kssj = this.data.array[this.data.index].slice(0, 4);
    var that=this;
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
          t_num: res.data.datas.detail.t_num
        }) 
      }
    })
  },
  bindPickerChange1: function(e){
    console.log("picker发送选择改变，携带值为",e.detail.value)
    this.setData({
      index1:e.detail.value,
      car_id:this.data.carList[this.data.index1].car_id
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
          t_num: res.data.datas.detail.t_num
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
          t_num: res.data.datas.detail.t_num
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
    console.log(option.car_id, option.date,option.car_id-1);
    this.setData({
      car_id: option.car_id,
      date: option.date,
      index1: option.car_id-1
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
        console.log(res.data)
        that.setData({
          carList: res.data.datas.carList
        })
      },
      fail: function (err) {

      }
    })
    
    
    // wx.request({
    //   url: 'http://c.16ylj.com/api/User/c_detail.html',//请求地址
    //   header: {
    //     "Content-Type": "applciation/json"
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res.data)
        
    //   },
    //   fail: function (err) {

    //   }
    // })
    // var DATE = util.formatDate(new Date());
    // this.setData({
    //   date: DATE,   
    // });
    
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
    this.setData({
      zhuangtai: this.data.yue.status[this.data.index].yiyue+"/"+this.data.yue.status[this.data.index].total
    })
    wx.navigateTo({
      url: '../yuyuejieguo/yuyuejieguo?chehao=' + this.data.yue.chehao + "&chepai=" + this.data.yue.chepai + "&jiaolian=" + this.data.yue.jiaolian + "&riqi=" + this.data.date + "&shijian=" + this.data.array[this.data.index] + "&zhuangtai=" + this.data.zhuangtai
    })
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
    var that=this;
    var kssj = this.data.array[this.data.index].slice(0, 4);
   console.log(this.data.date, this.data.car_id, kssj)
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date+"&car_id="+this.data.car_id+"&time="+`${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          car_code: res.data.datas.detail.car_code,
          coach:res.data.datas.detail.coach,
          c_num: res.data.datas.detail.c_num,
          t_num: res.data.datas.detail.t_num
        })
      },
      fail: function (err) {

      }
    })
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
