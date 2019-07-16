// pages/liancheyuyue/liancheyuyue.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    yueList: app.globalData.yueList,
    carList:[],
    inputValue: '', // 搜索的内容
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  souSuo: function () {
    console.log("haha");
    var that = this;
    console.log(this.data.inputValue);
    wx.request({
      url: 'http://c.16ylj.com/api/User/carList.html?date='+this.data.inputValue,//请求地址
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