// pages/zhuce/zhuce.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagename: "填写信息",
    key:"",
    user_code:""
  },
  bindKeyInput: function (e) {
    this.setData({
      user_code: e.detail.value
    })
  },
  
  zhuce: function(){
    var that=this;
    // 注册填写身份证时可以用33或44或55或66
    wx.request({
      url: 'https://c.16ylj.com/api/User/register.html',
      data:{
        key: that.data.key,
        user_code: that.data.user_code
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        if(res.data.datas.user_id==null){
          var tishi=res.data.datas.error
          wx.showModal({
            content: tishi,
            showCancel: false,
            success: function (res) {
            }
          })
        }else{
          // 将user_id保存在本地
          var user_id = res.data.datas.user_id;
          console.log(user_id);
          wx.setStorage({
            key: 'user_id',
            data: user_id,
            success: function (res) {
            }
          })

          wx.showModal({
            content: "注册成功！",
            showCancel: false,
            success: function (res) {
              wx.reLaunch({
                url: '../yuyueliebiao/yuyueliebiao',
              })
            }
          })
        }
          
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      key:option.key
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
      title: '加载中...',
      icon: 'loading'
    })
    wx.showNavigationBarLoading()
    setTimeout(
      function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }, 1500)

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