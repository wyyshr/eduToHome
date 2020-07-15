// pages/notice/notice.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    historyMsg: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
    })
    
  },
  onShow(){
    this.getMsg()
  },

  // 获取消息通知
  async getMsg(){
    let userInfo = wx.getStorageSync('userInfo');
    let res = await req({
      url: 'https://d30n971042.imdo.co/chat/findInform',
      data: {
        username: userInfo.nickName,
      }
    })
    let arr = res.data
    this.setData({
      historyMsg: arr
    })
  },
})