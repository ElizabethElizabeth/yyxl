// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": [
      "https://c.16ylj.com/img/daoku.jpg",
      "https://c.16ylj.com/img/cefang.jpg",
      "https://c.16ylj.com/img/banpo.jpg",
      "https://c.16ylj.com/img/zhijiao.jpg",
      "https://c.16ylj.com/img/swan.jpg"
    ],
    imgUrl1: ["https://c.16ylj.com/img/pic1.jpg"],
    imgUrl2: ["https://c.16ylj.com/img/pic2.jpg"],
    shipin: "https://c.16ylj.com/img/shipin.mp4",
    pagename: "传益行科目二考场",
    interval: 4000,
    fullscreen: '',
    pause: ''
  },
  play: function(){
    var that=this
    that.setData({
      interval: 9999999999999,
      pause: false
    })
  },
  pause: function () {
    var that = this
    that.setData({
      pause: true
    })
    if(that.data.fullscreen==false){
      that.setData({
        interval: 4000
      })
    } else if (that.data.fullscreen == true){
      that.setData({
        interval: 9999999999999
      })
    }   
  },
  fullscreen: function (e) {
    var that=this;
    var fullscreen=e.detail.fullscreen;
    console.log(fullscreen)
    that.setData({
      fullscreen: fullscreen
    })
    if(fullscreen==true){
      that.setData({
        interval: 9999999999999
      })
    } else if (fullscreen == false&&that.data.pause==true){
      that.setData({
        interval: 4000
      })
    }
  },
  
  //回退
  // navBack: function () {
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function pf() {
      if (this.data.play == 'yes') {
        this.setData({
          interval: 9999999999999999999
        })
      } else if (this.data.fullscreen == 'yes') {
        this.setData({
          interval: 9999999999999999999
        })
      }
    }
    
    let that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
   
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrl // 需要预览的图片http链接列表  
    })
  },   
  previewImage1: function () {
    wx.previewImage({
      current: this.data.imgUrl1, // 当前显示图片的http链接  
      urls: this.data.imgUrl1 // 需要预览的图片http链接列表  
    })
  },   
  previewImage2: function (e) {
    wx.previewImage({
      current: this.data.imgUrl2, // 当前显示图片的http链接  
      urls: this.data.imgUrl2 // 需要预览的图片http链接列表  
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
    // wx.startPullDownRefresh()
    wx.showToast({
      // title: '加载中...',
      icon: 'loading'
    })
    wx.showNavigationBarLoading()
    setTimeout(
      function(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },1500)
   
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
