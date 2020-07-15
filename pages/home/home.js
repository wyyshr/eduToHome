// pages/home/home.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    teacherImgArr: [
      {
        id: 0,
        src: 'https://fudao.qq.com/tx_tls_gate=https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCa4JFJmSUAwmfaicTHTmpX5fUKkFLSIDrm6nA5UoFvFxj9H292Vsbo8GvM8aS35MoQ/356'
      },
      {
        id: 1,
        src: 'https://fudao.qq.com/tx_tls_gate=https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLAg3xibM7YCYaG3LjXf1iaucDLVjhxJcolwD8G3GTFL3DbA5K5GA51fZNyYM4KKttHZM/356'
      },
      {
        id: 2,
        src: 'https://fudao.qq.com/tx_tls_gate=https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLAuvdSeq7xbSQJeC2HfoukyARGw1WwHMC1JL0aFhuciarf5TD9c0lvibaBYDvVPnlEac/356'
      }
    ],
    parentImgArr: [
      {
        id: 3,
        src: 'https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCtma00micjVHcZQXrpwSe3bicFeQMkEFye0bAGWkz5P55o7p4eyxz9ErTZ278VHAxxg/356'
      },
      {
        id: 4,
        src: 'https://10.url.cn/qqcourse_logo_rn/ajNVdqHZLLDxJbstMNIvcmPTqrSILHYwGoialmrB7HprBicdmzMRnQAutN4oBeuGT35GwgjOmzpro/356'
      },
      {
        id: 5,
        src: 'https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCDrsYKJCTrCy2Xg4a4zj2eXtYKu1qlyRuDlXs0c0L0Amia33bNgvg1IzyLVexxMbZI/356'
      }
    ],
    parentIconArr: [
      {
        id: 0,
        name: '班级',
        src: '/img/classes.png'
      },
      {
        id: 1,
        name: '老师',
        src: '/img/teachers.png'
      },
      {
        id: 2,
        name: '资料',
        src: '/img/datas.png'
      },
      {
        id: 3,
        name: '更多',
        src: '/img/more.png'
      }
    ],
    parentVideos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页'
    });
    
    req({
      url: 'https://322b074517.eicp.vip/api/img'
    }).then(res => {
      this.setData({
        parentVideos: res.data
      })
    })
  },
  onShow(){
    let userId = wx.getStorageSync('userId');
    this.setData({
      userId
    })
  }
  
})