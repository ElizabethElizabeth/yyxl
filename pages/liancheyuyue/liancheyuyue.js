const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**  
   * 页面的初始数据
   */
  data: {
    pagename: "传益行科目二考场",
    date: "",
    array: ["8:00-11:00", "11:00-14:00", "14:00-18:00"],
    index:0,
    carList: [],
    index1:0,
    car_id: '',
    car_code:"",
    coach: "",
    c_num: "",
    t_num: "",
    user_id:"",
    course_id:"",

    today:"",
    jinyong:false,
    zhuangtai:"",

    today:""

    // yue:{},
  },
  
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var kssj = this.data.array[this.data.index].slice(0, 4);
   
    var that = this;
    if (that.data.date > that.data.today) {
    
    // 时间段改变，重新渲染页面
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log("时间段改变，重新请求")
        console.log(res.data)
        if (res.data.datas.detail == null) {
          wx.showToast({
            icon: 'none',
            title: '当前所选预约日期暂无车辆安排',
            duration: 3000,
            mask: true
          })
        } else if (res.data.datas.detail.id) {
          that.setData({
            car_code: res.data.datas.detail.car_code,
            coach: res.data.datas.detail.coach,

            // c_num: res.data.datas.detail.c_num,
            // t_num: res.data.datas.detail.t_num,
            zhuangtai: res.data.datas.detail.c_num + "/" + res.data.datas.detail.t_num,

            c_num: res.data.datas.detail.c_num,
            t_num: res.data.datas.detail.t_num,

            course_id: res.data.datas.detail.id
          })
        } 
        
      }
    })
    } else {
      wx.showModal({
        content: '只能预约明天及明天以后的课程',
        showCancel: false,
        success: function (res) {

        }
      })
      that.setData({
        carList: null
      })
    }
  },
  bindPickerChange1: function(e){
    this.setData({
      index1:e.detail.value,
      car_id:this.data.carList[e.detail.value].car_id
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
          // c_num: res.data.datas.detail.c_num,
          // t_num: res.data.datas.detail.t_num,   
          zhuangtai: res.data.datas.detail.c_num + "/" + res.data.datas.detail.t_num,
          course_id : res.data.datas.detail.id    
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
    // 日期改变，重新渲染页面
    if (that.data.date > that.data.today) {
    wx.request({
      url: 'https://c.16ylj.com/api/User/carList.html?date=' + this.data.date,//请求地址
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
    // 日期改变，重新渲染页面
      wx.request({
        url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
        header: {
          "Content-Type": "applciation/json"
        },
        method: 'GET',
        success: function (res) {
          console.log("日期发生改变，重新发送请求")
          console.log(res.data);
          if (res.data.datas.detail == null) {
            wx.showToast({
              icon:'none',
              title: '当前所选日期暂无车辆安排',
              duration:3000,
              mask: true
            })

            that.setData({
              jinyong: true
            })
            
          }else if(res.data.datas.detail.id){
            that.setData({
              jinyong: false,
              car_code: res.data.datas.detail.car_code,
              coach: res.data.datas.detail.coach,
              // c_num: res.data.datas.detail.c_num,
              // t_num: res.data.datas.detail.t_num,
              zhuangtai: res.data.datas.detail.c_num + "/" + res.data.datas.detail.t_num,
            })
          }else if(res.data.datas.detail.id){
            that.setData({
              car_code: res.data.datas.detail.car_code,
              coach: res.data.datas.detail.coach,
              c_num: res.data.datas.detail.c_num,
              t_num: res.data.datas.detail.t_num,
              course_id: res.data.datas.detail.id
            })
          } 
            
          
        }
      })
    } else {
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

  //回退
  navBack: function () {    
    wx.switchTab({
      url: '../yuyueliebiao/yuyueliebiao'
    })    
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (option,e) {
    var DATE = util.formatDate(new Date());

    this.setData({
      car_id: option.car_id,
      date: option.date,
      today: DATE
    })
    var that = this;
    // 从后台获取数组来渲染车号的下拉框
    wx.request({
      url: 'https://c.16ylj.com/api/User/carList.html?date='+this.data.date,//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        for(var i=0;i<res.data.datas.carList.length;i++){
          if(res.data.datas.carList[i].car_id==option.car_id)
            break;
        }
        that.setData({
          carList: res.data.datas.carList,
          index1:i
        })
      },
      fail: function (err) {

      }
    })
    
    var that = this;
    var kssj = this.data.array[this.data.index].slice(0, 4);
    console.log(this.data.date, this.data.car_id, kssj)
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          car_code: res.data.datas.detail.car_code,
          coach: res.data.datas.detail.coach,
          // c_num: res.data.datas.detail.c_num,
          // t_num: res.data.datas.detail.t_num,
          zhuangtai: res.data.datas.detail.c_num + "/" + res.data.datas.detail.t_num,
          course_id : res.data.datas.detail.id
        })
       
      },
      fail: function (err) {

      }
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
    //   }
    // })
    
      // var yue=app.globalData.carList.filter(elem=>elem.id==option.id)[0];
      // this.setData({yue});
       
    
  },

  querenyuyue: function () {
    var kssj = this.data.array[this.data.index].slice(0, 4);
    var that=this;
    if(that.data.jinyong==true){
      wx.showModal({
        content: '选择正确的日期后才能预约',
        showCancel: false
      })
    } else if (kssj=='8:00'&that.data.zhuangtai=="3/3"){
      wx.showModal({
        content: '预约人数已满，请重新选择',
        showCancel: false
      })
    } else if (kssj == '11:00' & that.data.zhuangtai == "3/3") {
      wx.showModal({
        content: '预约人数已满，请重新选择',
        showCancel: false
      })
    } else if (kssj == '14:00' & that.data.zhuangtai == "4/4") {
      wx.showModal({
        content: '预约人数已满，请重新选择',
        showCancel: false
      })
    } else if(that.data.jinyong==false){
      wx.getStorage({
        key: 'user_id',
        success (res) {
          that.setData({
            user_id : res.data,
          })
          wx.request({
            url: 'https://c.16ylj.com/api/User/order.html?user_id=' + that.data.user_id + '&course_id=' + that.data.course_id,
            header: {
              "Content-Type": "applciation/json"
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              wx.setStorage({
                key: 'wodeyiyue',
                data: 999,
              })
              if(res.data.datas==1){
                wx.showToast({
                  icon:'success',
                  title: '预约成功',
                  duration: 3000,
                  mask:true,
                  success: function (res) {
                    
                    setTimeout(function(){
                      wx.navigateTo({
                        url: '../yuyuejieguo/yuyuejieguo',
                      })
                    },3000)                  
                  }
                })
              }else if(res.data.datas.error){
                var error=res.data.datas.error;
                wx.showToast({
                  title: error,
                  icon: 'none',
                  duration:4000
                })
      
              }
            },
            fail: function (err) {

            }
          })   
        },
        fail (res) {
          console.log("失败了"+res)
        }  
      })
    
    }
   
    
    
    
   
   
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
    if (that.data.date > that.data.today) {
    wx.request({
      url: 'https://c.16ylj.com/api/User/c_detail.html?date=' + this.data.date + "&car_id=" + this.data.car_id + "&time=" + `${kssj}`,
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          zhuangtai: res.data.datas.detail.c_num + "/" + res.data.datas.detail.t_num
        })

      },
      fail: function (err) {

      }
    })
    }
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
