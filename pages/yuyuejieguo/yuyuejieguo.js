
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    user_id:"",
    order_detail:{},
    riqi: "",
    shijian: "",
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    wx.getStorage({
      key: 'user_id',
      success(res) {
        that.setData({
          user_id: res.data,
        })
        wx.request({
          url: 'https://c.16ylj.com/api/User/order_detail.html?user_id=' + that.data.user_id,
          header: {
            "Content-Type": "applciation/json"
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            that.setData({
              order_detail: res.data.datas.order_detail
            })
            var riqi=that.data.order_detail.start_time.slice(0,10)
            var st=that.data.order_detail.start_time.slice(11,16)
            var et = that.data.order_detail.end_time.slice(11, 16)     
            var shijian=st+"-"+et           
            that.setData({
              riqi: riqi,
              shijian: shijian,
            }) 
          },
          fail: function (err) {

          }
        })   
      },
      fail(res) {
        
      }
    })
    
  },
  
  huitiao: function () {
    wx.getStorage({
      key: 'huitiao',
      success: function (res) {
        var tomorrow = res.data.tomorrow;
        var cid=res.data.cid;
        wx.navigateTo({
          url: `../liancheyuyue/liancheyuyue?date=${tomorrow}&car_id=${cid}`,
        })
      },
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