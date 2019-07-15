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
    index:0,
    yueList: app.globalData.yueList,
    zhuangtai:'',
    xiabiao: '',
    yue:{},
    array: []
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (option,e) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,   
    });
    
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
      console.log(option.xiabiao);
      this.setData({
        xiabiao: option.xiabiao,
      })
      var yue=this.data.yueList.filter(elem=>elem.id==option.xiabiao)[0];
      console.log(yue);
      this.setData({yue});
      this.setData({
        array: this.data.yue.shijian
      })    
   
  },
  querenyuyue: function () {
    this.setData({
      zhuangtai: this.data.yue.status[this.data.index].yiyue+"/"+this.data.yue.status[this.data.index].total
    })
    wx.navigateTo({
      url: '../yuyuejieguo/yuyuejieguo?chehao=' + this.data.yue.chehao + "&chepai=" + this.data.yue.chepai + "&jiaolian=" + this.data.yue.jiaolian+"&zhuangtai="+this.data.zhuangtai+"&riqi="+this.data.date+"&shijian="+this.data.array[this.data.index]
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