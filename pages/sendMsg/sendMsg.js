// pages/sendMsg/sendMsg.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    userInfo: {},
    message: [],
    content: '',
    top: 0,
    isStop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      name: options.name,
      userInfo
    })
    this.getMsg()
    
  },
  onReady(){
    if (this.data.isStop == false) {
      let times = setInterval(() => {
        this.getMsg()
      }, 5000);
    }
    
    // if(this.data.isStop == true){
    //   clearInterval(times)
    // }
    
  },

  // 开始加载
  startLoad(){
    this.setData({
      isStop: false
    })
  },
  // 消息输入
  contentInp(e){
    // console.log(e.detail.value);
    this.setData({
      content: e.detail.value,
      isStop: true
    })
  },
  // 发送消息
  async sendMsg(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/chat/sendMsg',
      data: {
        sendName: this.data.userInfo.nickName,
        receiveName: this.data.name,
        content: this.data.content
      }
    })
    if(res.data == 'success'){
      let message = this.data.message
      
      req({
        url: 'https://d30n971042.imdo.co/chat/findMsg',
        data: {
          sendName: this.data.userInfo.nickName,
          receiveName: this.data.name,
          times: message[message.length-1].times
        }
      }).then(res => {
        console.log(res.data);
        this.setData({
          content: '',
          message: message.concat(res.data),
          top: message.concat(res.data).length*400
        })
      })
      
    }
  },
  // 显示消息
  async getMsg(){
    let res1 = await req({
      url: 'https://d30n971042.imdo.co/chat/findMsg',
      data: {
        sendName: this.data.userInfo.nickName,
        receiveName: this.data.name,
        times: 0
      }
    })
    let res2 = await req({
      url: 'https://d30n971042.imdo.co/chat/findMsg',
      data: {
        sendName: this.data.name,
        receiveName: this.data.userInfo.nickName,
        times: 0
      }
    })
    let arr = res1.data.concat(res2.data)
    let t
    // 数组排序
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if(arr[i].id < arr[j].id){
          t = arr[i]
          arr[i] = arr[j]
          arr[j] = t
        }
      }
    }
    this.setData({
      message: arr,
      top: arr.length*400
    })
  },
  // 滑动取消加载
  scroll(e){
    if(e){
      this.setData({
        isStop: true
      })
    }
    
  },
})