// pages/liancheyuyue/liancheyuyue.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    carList:[],
    inputValue: '', // 搜索的内容
    date: "",
    today:"",
    xuanze:"inline"
  },
  bindDateChange: function (e) {
    this.setData({
      xuanze: "none",
      date: e.detail.value
    })
    var DATE = util.formatDate(new Date());
    this.setData({
      today: DATE,
    });
    var that = this;
    console.log(that.data.date+"和"+that.data.today)
    if(that.data.date>that.data.today){
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

          if (res.data.datas.carList.length == 0) {
            wx.showModal({
              content: '暂无课程安排',
              showCancel: false,
              success: function (res) {

              }
            })
          }
        },
        fail: function (err) {

        }
      })
    }else{
      wx.showModal({
        content: '日期选择错误，只能选择明天或明天以后的课程',
        showCancel: false,
        success: function (res) {

        }
      })
      that.setData({
        carList: null
      })
    }
   
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })  
  },
  
  yuyuetiaozhuan: function(e){
    var car_id=e.currentTarget.dataset.car_id;
    var date=this.data.date;
    if(date==""){
      console.log("设置为当天的第二天")
      var date = this.data.carList.filter(elem => elem.car_id == car_id)[0].start_time;
    }
    date = date.slice(0, 10);
    console.log(date);
    console.log(car_id);
  
    wx.navigateTo({
      url: `../liancheyuyue/liancheyuyue?car_id=${car_id}&date=${date}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          // --------- 发送凭证 ------------------
          wx.request({
            url: 'https://c.16ylj.com/api/User/login.html',
            data: { code: code },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              console.log(res.data);
              var key = res.data.datas.key;
              if (res.data.datas.is_user == 0) {
                wx.showModal({
                  content: '还未注册,请先前往注册',
                  showCancel: false,
                  success: function (res) {
                    wx.redirectTo({
                      url: '/pages/zhuce/zhuce?key=' + key,
                    })
                  }
                })
              } else {
                var user_id = res.data.datas.user_id;
                wx.setStorage({
                  key: 'user_id',
                  data: user_id,
                  success: function (res) {
                    that.getData();
                  }
                })
              }
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
   
       
    
  },
  getData: function () {
    var that = this;
    wx.request({
      url: 'http://c.16ylj.com/api/User/carList.html',//请求地址
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


