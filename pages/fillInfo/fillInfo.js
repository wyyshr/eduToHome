// pages/fillInfo/fillInfo.js
import {
  req
} from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: '',
    phone: '',
    teacherMsg: '',
    childName: '',
    teacherInfo: {},
    parentInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getInfo()
  },
  // 获取信息
  getInfo(){
    let userInfo = wx.getStorageSync('userInfo');
    if(this.data.id == 0){
      req({
        url: 'https://d30n971042.imdo.co/user/findTeacherMsg',
        data: {
          username: userInfo.nickName
        }
      }).then(res => {
        this.setData({
          teacherInfo: res.data,
          name: res.data.teacherName,
          phone: res.data.iphone,
          teacherMsg: res.data.intro
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
          parentInfo: res.data,
          name: res.data.parentName,
          phone: res.data.iphone,
          childName: res.data.childName
        })
      })
    }

  },
  // 姓名
  inpName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 电话
  inpPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 简介
  inpTeacherMsg(e) {
    this.setData({
      teacherMsg: e.detail.value
    })
  },
  // 孩子姓名
  inpChildName(e) {
    this.setData({
      childName: e.detail.value
    })
  },
  // 信息完善
  submit() {
    let userInfo = wx.getStorageSync('userInfo');
    if (this.data.id == 0) {
      req({
        url: 'https://d30n971042.imdo.co/teacher/fillMsg',
        data: {
          username: userInfo.nickName,
          teacherName: this.data.name,
          intro: this.data.teacherMsg,
          iphone: this.data.phone
        }
      }).then(res => {
        if (res.data == 'success') {
          wx.showToast({
            title: '完善信息成功',
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 500);
            }
          });
        }
      })
    } else {
      req({
        url: 'https://d30n971042.imdo.co/parent/fillMsg',
        data: {
          username: userInfo.nickName,
          parentName: this.data.name,
          childName: this.data.childName,
          iphone: this.data.phone
        }
      }).then(res => {
        if (res.data == 'success') {
          wx.showToast({
            title: '完善信息成功',
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 500);
            }
          });
        }
      })
    }
  }
})