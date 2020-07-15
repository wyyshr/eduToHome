// pages/myCollect/myCollect.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pubMsg: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCollect()
  },
  // 获取我的收藏
  async getMyCollect(){
    let userInfo = wx.getStorageSync('userInfo');
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findCollect',
      data: {
        username: userInfo.nickName
      }
    })
    this.setData({
      pubMsg: res.data.reverse()
    })
  },
  // 收藏
  collect(e){
    // console.log(e.currentTarget.dataset.obj.dataId);
    
    let userInfo = wx.getStorageSync('userInfo');
      req({
        url: 'https://d30n971042.imdo.co/user/deleteCollect',
        data: {
          dataId: e.currentTarget.dataset.obj.dataId,
          username: userInfo.nickName
        }
      }).then(res => {
        // console.log(res.data);
        if(res.data == 'success'){
          wx.showToast({
            title: '取消成功',
            success: (result)=>{
              setTimeout(() => {
                this.getMyCollect()
              }, 500);
              
            }
          });
        }
      })
    
    
  },
  
})