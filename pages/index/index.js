//index.js
//获取应用实例
const app = getApp()
import {
  req
} from "../../network/request.js";
Page({
  data: {
    id: 0,
    isChoose: true,
    phoneNum: 0,
    appId: 'wx2d38ec0e7886efde',
    secret: '0c900972658b173a433bed1e846d338f',
    js_code: 0,
    grant_type: 'authorization_code',
    openid: '',
    session_key: '',
    userInfo: {},
    isShow: false
  },

  onLoad: function () {
    let userId = wx.getStorageSync('userId');
    if (userId) {
      this.setData({
        isShow: true
      })
    }
  },
  onShow() {
    // 若已注册过便直接跳转主页
    let openid = wx.getStorageSync('openid');
    if (openid.length > 0) {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  },
  // // 手机号
  // inputPhoneNum(e) {
  //   console.log(e.detail.value);
  //   this.setData({
  //     phoneNum: e.detail.value
  //   })
  // },
  // 下一步
  nextClick() {
    // 登录 获取openid
    wx.login({
      success: res => {
        this.setData({
          js_code: res.code
        })
        console.log(this.data.js_code);
        // 获取openid和session_key
        req({
          url: 'https://322b074517.eicp.vip/req/getData',
          data: {
            appid: this.data.appId,
            secret: this.data.secret,
            js_code: this.data.js_code,
            grant_type: this.data.grant_type
          }
        }).then(res => {
          console.log(res.data);
          this.setData({
            openid: res.data.openid,
            session_key: res.data.session_key
          })

          console.log(this.data.userInfo.nickName, this.data.openid);
          // 注册
          req({
            url: 'https://d30n971042.imdo.co/user/register',
            data: {
              username: this.data.userInfo.nickName,
              password: this.data.openid,
              role: this.data.id.toString()
            }
          }).then(res => {
            // 登录
            req({
              url: 'https://d30n971042.imdo.co/user/login',
              data: {
                username: this.data.userInfo.nickName,
                password: this.data.openid,
              }
            }).then(res => {
              if (res.data == 'success') {
                wx.setStorageSync('isLogin', true);
                wx.navigateTo({
                  url: `/pages/join/join?cid=${ this.data.id }`
                });
              }
            })
          })


          wx.setStorageSync('phoneNum', this.data.phoneNum);
          wx.setStorageSync('openid', res.data.openid);
          wx.setStorageSync('userId', this.data.id);
        })
      }
    })
  },

  // 上传头像
  // uploadIcon(userInfo){
  //   req({
  //     url: 'https://d30n971042.imdo.co/user/updatePhoto',
  //     username: userInfo.nickName,
  //     url: userInfo.avatarUrl
  //   }).then(res => {
  //     console.log(res);

  //   })

  // },
  // 上传信息
  // unloadInfo(userInfo) {
  //   if (this.data.id == 0) {
  //     req({
  //       url: 'https://d30n971042.imdo.co/teacher/fillMsg',
  //       data: {
  //         username: userInfo.nickName,
  //         teacherName: "",
  //         intro: '',
  //         iphone: this.data.phoneNum
  //       }
  //     })
  //   } else {
  //     req({
  //       url: 'https://d30n971042.imdo.co/parent/fillMsg',
  //       data: {
  //         username: userInfo.nickName,
  //         parentName: "",
  //         childName: '',
  //         iphone: this.data.phoneNum
  //       }
  //     })
  //   }

  // },
  // 获取用户信息
  getUserInfo(e) {
    // let phone = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
    // let isRight = phone.test(this.data.phoneNum)

    // if (isRight) {
      wx.setStorageSync('userInfo', e.detail.userInfo);
      // wx.setStorageSync('userInfo', userInfo);
      this.setData({
        userInfo: e.detail.userInfo
        // userInfo
      })
      // this.uploadIcon(e.detail.userInfo)
      // this.unloadInfo(e.detail.userInfo)
      this.nextClick()
    // } else {
    //   wx.showToast({
    //     title: '请输入正确的手机号',
    //     icon: 'none'
    //   });
    // }
  },

  /**
   * 身份选择
   */
  radioChange(e) {
    console.log(e.detail.value);
    this.setData({
      id: e.detail.value
    })
  },
  teacherChoose() {
    this.setData({
      isChoose: true
    })
  },
  parentChoose() {
    this.setData({
      isChoose: false
    })
  }
})