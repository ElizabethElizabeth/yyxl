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
    array: ['8:00-11:00', '11:00-14:00', '14:00-18:00'],
    array1: ['', '', ''],
    index:"0",
    yueList: app.globalData.yueList,
    yuePerson: app.globalData.yuePerson,
    zhuangtai:'',
    xiabiao: '',
    chehao1: '',
    chehao: 'chehao',
    chepai1:"",
    chepai:"chepai",
    jiaolian1:"",
    jiaolian:"jiaolian",
    multiArray: [['2019', '2020'], ['7', '8', '9', '10', '11'], ['10']],
    multiIndex: [0, 0, 0],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '2019'
        },
        {
          id: 1,
          name: '2020'
        }
      ], [
        {
          id: 0,
          name: '7'
        },
        {
          id: 1,
          name: '8'
        },
        {
          id: 2,
          name: '9'
        },
        {
          id: 3,
          name: '10'
        },
        {
          id: 3,
          name: '11'
        }
      ], [
        {
          id: 0,
          name: '10'
        }

      ]
    ],
  },
  
    
   
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index);
   if(this.data.index==0){
     this.setData({
       zhuangtai: this.data.yuePerson[0].s
     })
   }else if(this.data.index==1){
     this.setData({
       zhuangtai: this.data.yuePerson[0].z
     })
   }else{
     this.setData({
       zhuangtai: this.data.yuePerson[0].x
     })
   }
    
  },
  // bindMultiPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     multiIndex: e.detail.value
  //   })
  // },
  // bindMultiPickerColumnChange: function (e) {
  //   console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  //   var data = {
  //     multiArray: this.data.multiArray,
  //     multiIndex: this.data.multiIndex
  //   };
  //   data.multiIndex[e.detail.column] = e.detail.value;
  //   switch (e.detail.column) {
  //     case 0:
  //       switch (data.multiIndex[0]) {
  //         case 0:
  //           data.multiArray[1] = ['7', '8', '9', '10', '11'];
  //           data.multiArray[2] = ['10','20'];
  //           break;
  //         case 1:
  //           data.multiArray[1] = ['7', '8', '9', '10', '11'];
  //           data.multiArray[2] = ['10','20'];
  //           break;
  //       }
  //       data.multiIndex[1] = 0;
  //       data.multiIndex[2] = 0;
  //       break;
  //     case 1:
  //       switch (data.multiIndex[0]) {
  //         case 0:
  //           switch (data.multiIndex[1]) {
  //             case 0:
  //               data.multiArray[2] = ['10'];
  //               break;
  //             case 1:
  //               data.multiArray[2] = ['10','20'];
  //               break;
  //             case 2:
  //               data.multiArray[2] = ['10', '20','30'];
  //               break;
  //             case 3:
  //               data.multiArray[2] = ['10', '20', '30','40'];
  //               break;
  //             case 4:
  //               data.multiArray[2] = ['10', '20', '30', '40','50'];
  //               break;
  //           }
  //           break;
  //         case 1:
  //           switch (data.multiIndex[1]) {
  //             case 0:
  //               data.multiArray[2] = ['10'];
  //               break;
  //             case 1:
  //               data.multiArray[2] = ['10', '20'];
  //               break;
  //             case 2:
  //               data.multiArray[2] = ['10', '20', '30'];
  //               break;
  //             case 3:
  //               data.multiArray[2] = ['10', '20', '30','40'];
  //               break;
  //             case 4:
  //               data.multiArray[2] = ['10', '20', '30','40','50'];
  //               break;
  //           }
  //           break;
  //       }
  //       data.multiIndex[2] = 0;
  //       break;
  //   }
  //   console.log(data.multiIndex);
  //   this.setData(data);
  //   console.log(data);
  // },
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
    console.log(this.data.index);
    this.setData({
      zhuangtai: this.data.yuePerson[0].s
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

    //     //以下两行注释的是同步方法，不过我不太喜欢用。
    //     //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
    //     //console.log(base64)
    //   }
    // })
      this.setData({
        xiabiao: option.xiabiao,
      })
      
      console.log(this.data.xiabiao);
      console.log(this.data.yueList[this.data.xiabiao]);
      console.log(this.data.chehao);
      console.log(this.data.yueList[this.data.xiabiao].chehao);
      console.log(this.data.yueList[this.data.xiabiao].chepai);
      console.log(this.data.yueList[this.data.xiabiao].jiaolian);
      this.setData({
      chehao1: this.data.yueList[this.data.xiabiao].chehao,
      chepai1: this.data.yueList[this.data.xiabiao].chepai,
      jiaolian1: this.data.yueList[this.data.xiabiao].jiaolian
      })
      


    
    // var xiabiao = this.data.xiabiao;
    // console.log(xiabiao);
    // this.setData({
    //   this.data.chehao: yueList[xiabiao].chehao,
    //   // chepai: app.globalData.yueList[xiabiao].chepai,
    //   // jiaolian: app.globalData.yueList[xiabiao].jiaolian
    // })
    // console.log(chehao, chepai, jiaolian);
  
  },
  querenyuyue: function () {
    wx.navigateTo({
      url: '../yuyuejieguo/yuyuejieguo?chehao=' + this.data.chehao1 + "&chepai=" + this.data.chepai1 + "&jiaolian=" + this.data.jiaolian1+"&zhuangtai="+this.data.zhuangtai+"&riqi="+this.data.date
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