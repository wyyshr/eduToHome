// pages/publish/publish.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    index: 0,
    className: '',
    describe: '',
    url: '',
    suffixName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let index = options.id
    let className = options.className
    this.setData({
      index,
      className
    })
    if(index == 1){
      wx.setNavigationBarTitle({
        title: '发布公告'
      });
    }else{
      wx.setNavigationBarTitle({
        title: '上传资料'
      });
    }
  },

  input(e){
    this.setData({
      value: e.detail.value
    })
  },
  // 发布公告
  publish(){
    if(this.data.value != ''){
      req({
        url: 'https://d30n971042.imdo.co/teacher/fillNotice',
        data: {
          className: this.data.className,
          content: this.data.value
        }
      }).then(res => {
        if(res.data == 'success'){
          wx.showToast({
            title: '发布成功！',
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
    }else{
      wx.showToast({
        title: '公告不可为空！',
        icon: 'none'
      });
    }
    
  },
  // 选取图片
  chooseImage(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        console.log(res.tempFilePaths);
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://d30n971042.imdo.co/user/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header:{
            "Content-Type": 'multipart/form-data'
          },
          formData: {
            'user': 'test'
          },
          success: (res)=>{
            console.log(res.data);
            this.setData({
              url: res.data,
              suffixName: 'png'
            })
          }
        });
      }
    });
  },
  chooseVideo(){
    wx.chooseVideo({
      sourceType:['album', 'camera'],
      compressed: true,
      maxDuration:15,
      success: (res)=>{
        let tempFilePath = res.tempFilePath
        console.log(tempFilePath);
        wx.uploadFile({
          url: 'https://d30n971042.imdo.co/user/upload',
          filePath: tempFilePath,
          name: 'file',
          header:{
            "Content-Type": 'multipart/form-data'
          },
          success: (res)=>{
            console.log(res.data);
            this.setData({
              url: res.data,
              suffixName: 'mp4'
            })
          }
        });
      }
    });
  },
  // 文件描述
  describe(e){
    this.setData({
      describe: e.detail.value
    })
  },
  // 上传资料
  async upload(){
    let userInfo = wx.getStorageSync('userInfo');
    let res = await req({
      url: 'https://d30n971042.imdo.co/teacher/fillData',
      data: {
        className: this.data.className,
        url: this.data.url,
        dataContent: this.data.describe,
        username: userInfo.nickName,
        suffixName: this.data.suffixName
      }
    })
    // console.log(res.data);
    if(res.data == 'success'){
      wx.showToast({
        title: '上传成功',
        success: (result)=>{
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 500);
        }
      });
    }
  },
})