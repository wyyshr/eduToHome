// pages/changeLession/changeLession.js
import {
  req
} from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lession: {},
    userId: 2,
    lessionName: '',
    teacher: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.value == "") {
      wx.setNavigationBarTitle({
        title: '添加课程'
      });
    } else if (options.userId == 1) {
      wx.setNavigationBarTitle({
        title: '查看课程'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '修改课程'
      });
    }
    this.setData({
      lession: options,
      userId: options.userId
    })
    
  },
  // 修改课表
  async changeLession(options) {
    let userInfo = wx.getStorageSync('userInfo');
    let lessionName = this.data.lessionName
    // if(this.data.lession.value != ''){
    //   lessionName = this.data.lession.value
    // }else{
    //   lessionName = this.data.lessionName
    // }
    let res = await req({
      url: 'https://d30n971042.imdo.co/teacher/fillTimetable',
      data: {
        course: parseInt(options.lession),
        week: parseInt(options.week),
        grade:lessionName,
        className: options.className,
        username: userInfo.nickName,
        teacher: this.data.teacher
      }
    })
    console.log(options.lession,options.week,lessionName,options.className);
    
    if(res.data == 'success'){
      let title
      this.data.lession.value == ''?title = '添加成功':title = '修改成功'
      wx.showToast({
        title: title,
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
  // 输入课名
  lessionInput(e){
    console.log(e.detail.value);
    if(e.detail.value != ''){
      this.setData({
        lessionName: e.detail.value
      })
    }
  },
  // 输入老师名
  teacherInput(e){
    if(e.detail.value != ''){
      this.setData({
        teacher: e.detail.value
      })
    }
  },

  // 确认修改
  sure(){
    if(this.data.lessionName == ''){
      wx.showToast({
        title: '课名不可为空',
        icon: 'none',
      });
    }else{
      this.changeLession(this.data.lession)
    }
  }
})