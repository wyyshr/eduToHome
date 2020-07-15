// pages/my/my.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userId: 0,
    phoneNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');

    this.setData({
      userInfo
    })
    this.getInfo(userInfo)
  },
  quit(){
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },
  onShow() {
    let userId = wx.getStorageSync('userId');
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userId
    })
    this.getInfo(userInfo)
  },
  // 获取信息
  getInfo(userInfo){
    if(this.data.userId == 0){
      req({
        url: 'https://d30n971042.imdo.co/user/findTeacherMsg',
        data: {
          username: userInfo.nickName
        }
      }).then(res => {
        this.setData({
          phoneNum: res.data.iphone,
        }) 
      })
    }else{
      req({
        url: 'https://d30n971042.imdo.co/user/findParentMsg',
        data: {
          username: userInfo.nickName
        }
      }).then(res => {
        this.setData({
          phoneNum: res.data.iphone
        })
      })
    }
  },
  
})