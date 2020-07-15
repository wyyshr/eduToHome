// pages/join/join.js
import {
  req
} from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    classArr: [],
    className: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.cid);
    this.getAllClass()
    this.setData({
      id: options.cid
    })
  },

  inputClass(e) {
    console.log(e.detail.value);
    this.setData({
      className: e.detail.value
    })
  },
  // 创建班级
  async creatClass() {
    if(this.data.className != ''){
      let userInfo = wx.getStorageSync('userInfo');
    // 创建班级
    let res = await req({
      url: 'https://d30n971042.imdo.co/teacher/createClass',
      data: {
        className: this.data.className
      }
    })
    // 加入班级
    if (res.data == 'success') {
      let res1 = await req({
        url: 'https://d30n971042.imdo.co/user/joinClass',
        data: {
          className: this.data.className,
          username: userInfo.nickName,
          role: this.data.id
        }
      })
      console.log(res1);
      if (res1.data == 'success') {
        wx.showToast({
          title: '创建并加入成功',
          success: () => {
            wx.setStorageSync('hasClass', true);
            wx.switchTab({
              url: '/pages/home/home',
            });
          }
        });
      }
    } else {
      wx.showToast({
        title: '该班级已存在',
        icon: 'none'
      });
    }
    }else{
      wx.showToast({
        title: '班级名不可为空',
        icon: 'none'
      });
    }
    
  },
  // 加入班级
  async joinClass() {
    if(this.data.className != ''){
      let userInfo = wx.getStorageSync('userInfo');
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/joinClass',
      data: {
        username: userInfo.nickName,
        className: this.data.className,
        role: this.data.id.toString()
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
    }else{
      wx.showToast({
        title: '您已加入该班级',
        icon: 'none',
        success: (result)=>{
          wx.setStorageSync('hasClass', true);
          wx.switchTab({
            url: '/pages/home/home',
          });
        }
      });
    }
    }else{
      wx.showToast({
        title: '班级名不可为空',
        icon: 'none'
      });
    }
    
  },
  // 所有班级
  async getAllClass(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findAllClass'
    })
    // console.log(res.data);
    
    this.setData({
      classArr: res.data
    })
  }
})