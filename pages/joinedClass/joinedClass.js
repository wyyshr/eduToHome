// pages/joinedClass/joinedClass.js
import { req } from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0,
    userId: 2,
    tabItems1: [
      {
        id: 0,
        value: "课表",
        isActivity: true
      },
      {
        id: 1,
        value: "公告",
        isActivity: false
      },
      {
        id: 2,
        value: "资料",
        isActivity: false
      },
      {
        id: 3,
        value: "家长",
        isActivity: false
      }
    ],
    detailArr: [],
    index2: 0,
    tabItems2: [
      {
        id: 0,
        value: "课表",
        isActivity: true
      },
      {
        id: 1,
        value: "公告",
        isActivity: false
      },
      {
        id: 2,
        value: "资料",
        isActivity: false
      },
      {
        id: 3,
        value: "老师",
        isActivity: false
      }
    ],
    className: '',
    classPublic: [],
    touchDot: '',
    touchMove: '',
    move: '',
    publicId: 0,
    pubMsg: [],
    parentArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let className = options.name
    let userId = wx.getStorageSync('userId');

    wx.setNavigationBarTitle({
      title: options.name
    });
    
    this.setData({
      userId,
      className
    })
    this.getTeacher()
    this.getParent()
  },
  onShow(){
    /**
     * 课表
     * 公告
     * 资料
     */
    this.getLession()
    this.getPublic()
    this.getPubMsg()
  },

  // 老师tab点击事件
  tabClick1(e){
    let index1 = e.detail
    let tabItems1 = this.data.tabItems1
    tabItems1.forEach((v) => {
      v.id == index1 ? v.isActivity = true : v.isActivity = false
    });
    this.setData({
      tabItems1,
      index1
    })
  },
  // 老师table点击事件
  tableClick1(e){
    if(e.detail.value.length > 1 || e.detail.value == ""){
      wx.navigateTo({
        url: `/pages/changeLession/changeLession?week=${e.detail.week}&lession=${e.detail.lession}&teacherName=${e.detail.teacherName}&value=${e.detail.value}&userId=${this.data.userId}&className=${this.data.className}`
      });
    }
  },
  // 家长tab点击事件
  tabClick2(e){
    let index2 = e.detail
    let tabItems2 = this.data.tabItems2
    tabItems2.forEach((v) => {
      v.id == index2 ? v.isActivity = true : v.isActivity = false
    });
    this.setData({
      tabItems2,
      index2
    })
  },
  // 家长table点击事件
  tableClick2(e){
    if(e.detail.value.length > 1){
      wx.navigateTo({
        url: `/pages/changeLession/changeLession?week=${e.detail.week}&lession=${e.detail.lession}&teacherName=${e.detail.teacherName}&value=${e.detail.value}&userId=${this.data.userId}`
      });
    }
  },
  // 家长获取班级老师
  async getTeacher(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/parent/findTeacherByClass',
      data: {
        className: this.data.className
      }
    })
    // console.log(res.data);
    
    this.setData({
      teacherArr: res.data
    })
  },
  // 老师获取班级家长
  async getParent(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/teacher/findParentAll',
      data: {
        className: this.data.className
      }
    })
    // console.log(res.data);
    
    this.setData({
      parentArr: res.data
    })
  },
  // 获取课表
  getLession(){
    req({
      url: 'https://d30n971042.imdo.co/user/getAllClassTimetable',
      data: {
        className: this.data.className
      }
    }).then(res => {
      this.setData({
        detailArr: res.data
      })
    })
    
  },
  // 获取公告
  async getPublic(){
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findAllNotice',
      data: {
        className: this.data.className
      }
    })
    this.setData({
      classPublic: res.data
    })
  },
  // 触摸开始事件
  touchStart(e){
    // console.log(e.currentTarget.dataset.id);
    
    let touchDot = e.touches[0].pageX;  // 触摸原点
    this.setData({
      touchDot,
      publicId:e.currentTarget.dataset.id
    })
    
  },
  touchMove(e){
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot
    this.setData({
      touchMove
    })
    // 节流
    function throttle(fun, times) {
      // valid : 是否处于工作状态
      let valid = true
      return function () {
        if (!valid) {
          //休息时间 暂不接客
          return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
          fun()
          valid = true;
        }, times)
      }
    }
    if(touchDot-touchMove <= 66){
      throttle(this.setData({
        move: touchDot-touchMove
      }), 200)
    }
    
  },
  touchEnd(e){
    console.log(e);
  },
  // 删除公告
  delete(e){
    // console.log(e.currentTarget.dataset.id);
    wx.showModal({
      title: '确定删除吗',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          req({
            url: 'https://d30n971042.imdo.co/teacher/deleteNotice',
            data: {
              id: e.currentTarget.dataset.id,
              className: this.data.className
            }
          }).then(res => {
            if(res.data == 'success'){
              this.onShow()
            }
          });
          
        }
      }
    });
    
  },
  // 收藏
  collect(e){
    let userInfo = wx.getStorageSync('userInfo');
    // console.log(e.currentTarget.dataset.obj.status);
    if(e.currentTarget.dataset.obj.status == 0){
      req({
        url: 'https://d30n971042.imdo.co/user/addCollect',
        data: {
          dataId: e.currentTarget.dataset.obj.id,
          username: userInfo.nickName
        }
      }).then(res => {
        // console.log(res.data);
        if(res.data == 'success'){
          wx.showToast({
            title: '收藏成功',
            success: (result)=>{
              setTimeout(() => {
                this.getPubMsg()
              }, 500);
              
            }
          });
        }
      })
    }else{
      req({
        url: 'https://d30n971042.imdo.co/user/deleteCollect',
        data: {
          dataId: e.currentTarget.dataset.obj.id,
          username: userInfo.nickName
        }
      }).then(res => {
        // console.log(res.data);
        if(res.data == 'success'){
          wx.showToast({
            title: '取消成功',
            success: (result)=>{
              setTimeout(() => {
                this.getPubMsg()
              }, 500);
              
            }
          });
        }
      })
    }
    
  },
  // 获取班级资料
  async getPubMsg(){
    let userInfo = wx.getStorageSync('userInfo');
    let res = await req({
      url: 'https://d30n971042.imdo.co/user/findAllData',
      data: {
        className: this.data.className,
        username: userInfo.nickName
      }
    })
    // console.log(res.data);
    this.setData({
      pubMsg: res.data
    })
  },
  // 退出班级
  quitClass(){
    let userInfo = wx.getStorageSync('userInfo');
    req({
      url: 'https://d30n971042.imdo.co/user/quitClass',
      data: {
        username: userInfo.nickName,
        className: this.data.className
      }
    }).then(res => {
      console.log(userInfo.nickName,this.data.className);
      
      console.log(res.data);
      if(res.data == 'success'){
        wx.showToast({
          title: '退出成功！',
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
    
    
  },
})