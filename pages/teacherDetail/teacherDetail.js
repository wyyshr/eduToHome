// pages/teacherDetail/teacherDetail.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    url: '',
    teacherInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.setData({
      name: options.name,
      url: options.url
    })
    this.getTeacherMsg()
  },

  // 获取老师信息
  getTeacherMsg(){
    req({
      url: 'https://d30n971042.imdo.co/user/findTeacherMsg',
      data: {
        username: this.data.name
      }
    }).then(res => {
      this.setData({
        teacherInfo: res.data
      })
    })
  },
  
})