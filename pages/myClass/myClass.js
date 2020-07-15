// pages/myClass/myClass.js
import {
  req
} from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArr: [],
    userId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow() {
    let userId = wx.getStorageSync('userId');
    this.setData({
      userId
    })
    wx.setNavigationBarTitle({
      title: '我的班级'
    });

    let userInfo = wx.getStorageSync('userInfo');
    this.getClass(userInfo.nickName)
  },

  // 获取加入的班级
  async getClass(username){
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findClassByUser',
      data: {
        username
      }
    })
    // console.log(res);
    
    this.setData({
      classArr: res.data
    })
  }



})