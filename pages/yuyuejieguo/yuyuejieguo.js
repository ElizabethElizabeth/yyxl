
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
    wodeyiyue:0,
    display:"block",
    display1:"none"
  },
  // 取消预约
  quxiao: function(){
    var that = this;
    wx.showModal({
      title: '取消预约',
      content: '确认取消预约吗？',
      success: function (res) {
        if (res.confirm) {
          var order_id = that.data.order_detail.id;
          wx.getStorage({
            key: 'user_id',
            success: function (res) {
              var user_id = res.data;
              wx.request({
                url: 'https://c.16ylj.com/api/User/cancel_order.html',
                data: {
                  order_id: order_id,
                  user_id: user_id
                },
                header: {
                  "Content-Type": "applciation/json"
                },
                method: 'GET',
                success: function (res) {
                  console.log(res.data)
                  if (res.data.datas == 1) {
                    // 清除缓存
                    wx.removeStorage({
                      key: 'wodeyiyue',
                      success: function (res) {
                        console.log(res.data)
                      }
                    })
                    wx.showModal({
                      title: '取消预约',
                      content: '您已成功取消预约',
                      showCancel: false,
                      success: function (res) {
                        if(res.confirm){
                          wx.showLoading()
                          setTimeout(function () {
                            wx.hideLoading({
                              success(res) {
                                // 设置让页面刷新成暂无预约页
                                that.setData({
                                  display: "none",
                                  display1: "block"
                                })
                              }
                            })
                          }, 1000)
                        }
                      },
                      fail: function (res) { }
                    })
                  }else{
                    wx.showToast({
                      title: '抱歉，您已不能取消预约',
                      icon: 'none',
                      duration:2000
                    })
                  }

                },
                fail: function (err) {

                }
              })
            },
          })
        }

      },
      fail: function (res) { }
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
  onLoad: function (option) {
   
    var that = this;
    
    wx.getStorage({
      key: 'wodeyiyue',
      success: function(res) {
        var wodeyiyue=res.data;
        console.log(wodeyiyue);
        if (wodeyiyue == 999) {
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
                  var riqi = that.data.order_detail.start_time.slice(0, 10)
                  var st = that.data.order_detail.start_time.slice(11, 16)
                  var et = that.data.order_detail.end_time.slice(11, 16)
                  var shijian = st + "-" + et
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
          
        } else {
         
        }
      },
      fail(res){
        that.setData({
          display: "none",
          display1: "block"
        })
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