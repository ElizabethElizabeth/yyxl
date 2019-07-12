//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
    yueList: [
      { "chehao": "1号车", "chepai": "陕A12345", "jiaolian": "李教练", "total": "10", "yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "2号车", "chepai": "陕A12345", "jiaolian": "张教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "3号车", "chepai": "陕A12345", "jiaolian": "赵教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "4号车", "chepai": "陕A12345", "jiaolian": "钱教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "5号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "6号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "7号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "8号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
      { "chehao": "9号车", "chepai": "陕A12345", "jiaolian": "何教练", "total": "10" ,"yiyue": "0", "tatal1": "3", "yiyue1": "0", "total2": "3", "yiyue2": "0", "tatal3": "4", "yiyue3": "0"},
    ],
    yuePerson: [
      {
        "s":"1/3",
        "z":"1/3",
        "x":"1/4"
      }
    ]
  }
})