//app.js
App({
  onLaunch: function () {
    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);

            // --------- 发送凭证 ------------------
            wx.request({
              url: 'https://c.16ylj.com/api/User/login.html?code='+code,
              data: { code: code },
              header: {
               'content-type': 'application/json' 
              },
              success: (res) => {                
                console.log(res.data)
                let key=res.data.datas.key;
                if(res.data.datas.is_user==0){
                  wx.showModal({
                    content: '还未注册,请先前往注册',
                    showCancel: false,
                    success: function (res) {
                      wx.redirectTo({
                        url: '/pages/zhuce/zhuce?key='+key,
                      })
                    }
                  })
                  
                }else{
                  console.log("登录成功，保存user_id后跳转")
                  // 将user_id保存在本地
                  var user_id = res.data.datas.user_id;
                  console.log(user_id);
                  wx.setStorage({
                    key: 'user_id',
                    data: user_id,      
                    success: function (res) {
                      wx.reLaunch({
                        url: '/pages/home/home',
                      })
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    navHeight: 0,
    carList:[],
    is_user:'',
    yueList: [
      { "id": 1, "chehao": "1号车", "chepai": "陕A12345", "jiaolian": "李教练", "total": 10, "yiyue": 5, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"], "status": [{ "total": 4, "yiyue": 2 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 2 }]},
      { "id": 2, "chehao": "2号车", "chepai": "陕A12345", "jiaolian": "张教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"], "status": [{ "total": 4, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 3, "chehao": "3号车", "chepai": "陕A12345", "jiaolian": "赵教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"],"status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 4, "chehao": "4号车", "chepai": "陕A12345", "jiaolian": "钱教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"],"status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 5, "chehao": "5号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"],"status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 6, "chehao": "6号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"],"status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 7, "chehao": "7号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"], "status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 8, "chehao": "8号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": 10, "yiyue": 0, "shijian": ["8:00-11:00", "11:00-14:00", "14:00-18:00"],"status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
      { "id": 9, "chehao": "9号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": 10, "yiyue": 0, "shijian":["8:00-11:00","11:00-14:00","14:00-18:00"], "status": [{ "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }, { "total": 3, "yiyue": 1 }]},
    ],
   
  }
})