// pages/liancheyuyue/liancheyuyue.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    yueList: app.globalData.yueList,
    carList:[],
    inputValue: '', // 搜索的内容
    date: ""
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    var that = this;
    console.log(this.data.date);
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
  },
  
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    
  },
  

  yuyuetiaozhuan: function(e){
    var id=e.currentTarget.dataset.id;
    var carList=this.data.carList;
    console.log(id);
    console.log(carList)
    wx.navigateTo({
      url: `../liancheyuyue/liancheyuyue?xiabiao=${id}&carList=${carList}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
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