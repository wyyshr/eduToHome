// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabItems: {
      type:Array,
      value:[
        {
          id: 0,
          value: "综合",
          isActivity: true
        },
        {
          id: 1,
          value: "销量",
          isActivity: false
        },
        {
          id: 2,
          value: "价格",
          isActivity: false
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      // console.log(e);
      let index = e.currentTarget.dataset.index
      this.triggerEvent("tabClick",index)
    }
  }
})
