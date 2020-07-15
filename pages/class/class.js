// pages/class/class.js
import {
  req
} from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allUser: [],
    className: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getUser(options.cname)
    this.setData({
      className: options.cname
    })
    wx.setNavigationBarTitle({
      title: options.cname
    });
  },
  async getUser(name) {
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findAllUser',
      data: {
        className: name
      }
    })
    console.log(res.data);
    this.setData({
      allUser: res.data
    })
  },
  // 加入班级
  async joinClass(cname) {
    let userId = wx.getStorageSync('userId');
    let userInfo = wx.getStorageSync('userInfo');
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/joinClass',
      data: {
        username: userInfo.nickName,
        className: this.data.className,
        role: userId.toString()
      }
    })
    console.log(res);
    if (res.data == 'success') {
      wx.showToast({
        title: '加入成功',
        success: () => {
          wx.setStorageSync('hasClass', true);
          wx.switchTab({
            url: '/pages/home/home',
          });
        }
      });
    } else {
      wx.showToast({
        title: '您已加入该班级',
        icon: 'none',
        success: (result) => {
          wx.setStorageSync('hasClass', true);
          wx.switchTab({
            url: '/pages/home/home',
          });
        }
      });
    }
  },

})