//app.js
App({
  globalData: {
    userInfo: {}
  },
  onLaunch: function () {
    // let openid = wx.getStorageSync('openid');
    let isLogin = wx.getStorageSync('isLogin') || 2;
    let hasClass = wx.getStorageSync('hasClass') || 2;
    // if(openid.length > 0){
    //   wx.switchTab({
    //     url: '/pages/home/home'
    //   });
    // }
    // if(isLogin == true && hasClass == true){
    //   wx.switchTab({
    //     url: '/pages/home/home'
    //   });
    // }

  },
  
})