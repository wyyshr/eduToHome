// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabItems: [
      {
        id: 0,
        value: "首页",
        img:'',
        isActivity: true
      },
      {
        id: 1,
        value: "班级",
        img:'',
        isActivity: false
      },
      {
        id: 2,
        value: "通知",
        img:'',
        isActivity: false
      },
      {
        id: 3,
        value: "我的",
        img:'',
        isActivity: false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
