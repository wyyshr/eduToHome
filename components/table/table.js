// pages/components/table/table.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headArr: {
      type: Array,
      value: [,
        {
          id: 0,
          name: '周一'
        },
        {
          id: 0,
          name: '周二'
        },
        {
          id: 0,
          name: '周三'
        },
        {
          id: 0,
          name: '周四'
        },
        {
          id: 0,
          name: '周五'
        }
      ]
    },
    detailArr: {
      type: Array,
      observer: function (newVal, oldVal) {

        let detailArr = newVal
        let bodyArr = this.data.bodyArr

        if (detailArr.length > 0) {
          detailArr.forEach((v, i) => {
            bodyArr[v.course - 1][v.week].value = v.grade
            bodyArr[v.course - 1][v.week].teacherName = v.teacher
          });
          this.setData({
            bodyArr
          })
        }


      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bodyArr: [
      [{
          id: 0,
          value: 1
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 2
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 3
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 4
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 5
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 6
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 7
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ],
      [{
          id: 0,
          value: 8
        },
        {
          id: 1,
          value: '',
          teacherName: ''
        },
        {
          id: 2,
          value: '',
          teacherName: ''
        },
        {
          id: 3,
          value: '',
          teacherName: ''
        },
        {
          id: 4,
          value: '',
          teacherName: ''
        },
        {
          id: 5,
          value: '',
          teacherName: ''
        }
      ]
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    trClick(e) {
      // console.log(e.currentTarget.dataset);
      
      let week = e.currentTarget.dataset.arr.id
      let lession = e.currentTarget.dataset.index + 1
      let value = e.currentTarget.dataset.arr.value
      let teacherName = e.currentTarget.dataset.arr.teacherName
      // console.log('周' + week, `第${lession}节`, value);
      let msg = {
        week,
        lession,
        value,
        teacherName
      }
      this.triggerEvent("tableClick", msg)
    }
  },
  lifetimes: {
    attached() {
      
    }
  }
})