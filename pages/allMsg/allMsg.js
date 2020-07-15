// pages/allMsg/allMsg.js
import { req } from "../../network/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    classArr: [],
    teacherArr: [],
    allMsgArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllClass()
    this.getAllTeacher()
    this.setData({
      id: options.id
    })
    if(options.id == 0){
      wx.setNavigationBarTitle({
        title: '全部班级'
      });
    }else if(options.id == 1){
      wx.setNavigationBarTitle({
        title: '全部老师'
      });
    }else if(options.id == 2){
      wx.setNavigationBarTitle({
        title: '全部资料'
      });
      // 获取资料数据
      this.getMessage()
    }else{
      wx.setNavigationBarTitle({
        title: '更多'
      });
    }
  },
  // 资料数据
  getMessage(){
    req({
      url: 'https://322b074517.eicp.vip/api/allimg',
    }).then(res => {
      console.log(res.data);
      this.setData({
        allMsgArr: res.data
      })
    })
  },
  // 班级数据
  async getAllClass(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findAllClass'
    })
    this.setData({
      classArr: res.data
    })
  },
  // 老师数据
  async getAllTeacher(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/parent/findAllTeacher'
    })
    this.setData({
      teacherArr: res.data
    })
  },
})