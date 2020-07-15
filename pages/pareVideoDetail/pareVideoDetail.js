// pages/pareVideoDetail/pareVideoDetail.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    req({
      url: 'https://322b074517.eicp.vip/api/video',
      data: {
        id: options.id
      }
    }).then(res => {
      wx.setNavigationBarTitle({
        title: res.data[0].name
      });
      this.setData({
        video: res.data[0]
      })
    })
  },

})