// pages/noFound/noFound.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isShow: false,
    videoUrl: [{
        id: 0,
        name: '蜜蜂优课寒假抢分营',
        url: 'https://ke.qq.com/course/373394?taid=8540366374810258',
        imgSrc: 'https://fudao.qq.com/tx_tls_gate=https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCa4JFJmSUAwmfaicTHTmpX5fUKkFLSIDrm6nA5UoFvFxj9H292Vsbo8GvM8aS35MoQ/356',
        detailImg: ['http://10.url.cn/qqke_course_info/ajNVdqHZLLDSuMD33MMy8OibYdY46Tnb7ClOicRrGfJNYDYtcTjGrrVOuINGHNic8JN4Y0faAKg2wQ/640',
                    'http://10.url.cn/qqke_course_info/ajNVdqHZLLAxRkA3ZLnLeZPPIDNmcK6tiaIBEI445YDo56KCrQLNibI5caqfJAjAtkAS5gKaUjD1k/640',
                    'http://10.url.cn/qqke_course_info/ajNVdqHZLLBYUCSJxexSkdnBUHohFTFickHVXS0t4nWiatngc1nSWF5MyJn7CyQ8uoPsdEYEczpSY/640'
                   ]
      },
      {
        id: 1,
        name: '高中语文寒春同步直播班',
        url: 'https://ke.qq.com/course/458503?taid=8282449293803271',
        imgSrc: 'https://fudao.qq.com/tx_tls_gate=https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLAg3xibM7YCYaG3LjXf1iaucDLVjhxJcolwD8G3GTFL3DbA5K5GA51fZNyYM4KKttHZM/356',
        detailImg: ['http://10.url.cn/qqke_course_info/ajNVdqHZLLCjns9BMJW1wHe2wy9do3Jg9R8vkQCVDKI2QhicwCz5wDAeP0fZSEo47ibkVAjga7sJg/640',
                    'http://10.url.cn/qqke_course_info/ajNVdqHZLLCpzeLvFC9ZY00ibHbTVSQVBVKqcVQZRUW0xyicv9weWCVClnc46KbfHNMncsiaicAMlgM/640'
                  ]
      },
      {
        id: 2,
        name: '2020高考数学冲刺系列公开课',
        url: 'https://ke.qq.com/course/378030?taid=8047372848710830',
        imgSrc: 'https://fudao.qq.com/tx_tls_gate=https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLAuvdSeq7xbSQJeC2HfoukyARGw1WwHMC1JL0aFhuciarf5TD9c0lvibaBYDvVPnlEac/356',
        detailImg: ['http://10.url.cn/qqke_course_info/ajNVdqHZLLBWfoTtnwoXiahSNQ9mcuPHdtrPBiaEH8eYvzIXDhXLyW7NcCria33OWyyibFodNMH1Qds/640']
      },
      {
        id: 3,
        name: '简单易学的立体裁剪基础班',
        url: 'https://ke.qq.com/course/234171',
        imgSrc: 'https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCtma00micjVHcZQXrpwSe3bicFeQMkEFye0bAGWkz5P55o7p4eyxz9ErTZ278VHAxxg/356',
        detailImg: ['http://10.url.cn/qqke_course_info/ajNVdqHZLLC2rpAWDwsQErv5OkvOicVv19LNr0PvmecSVSWWbib75tLCvqvQVIV7zsPFHSicqNWp6Q/640']
      },
      {
        id: 4,
        name: '超轻粘土手工DIY教程',
        url: 'https://ke.qq.com/course/58215',
        imgSrc: 'https://10.url.cn/qqcourse_logo_rn/ajNVdqHZLLDxJbstMNIvcmPTqrSILHYwGoialmrB7HprBicdmzMRnQAutN4oBeuGT35GwgjOmzpro/356',
        detailImg: ['http://10.url.cn/qqke_course_info/ajNVdqHZLLCRYtjJp6vDJrOiaBtSjKTppfjBEOwrztQNHWZfVpEhqRflHf8YSHVelibOvH0E89mdw/',
                      'http://10.url.cn/qqke_course_info/ajNVdqHZLLAm6wQMDlmzPZ8XaRagqNgc6sNMQaeNkvz8CIxnsV00h694d6ajUKObKr3TnMoyTsg/',
                      'http://10.url.cn/qqke_course_info/ajNVdqHZLLAy7H070yGxRWIjbkU84icEcFBTRkLF65eVzakAuOAEm5B5XvBPT2RJvw5IEMsX2VqU/',
                      'http://10.url.cn/qqke_course_info/ajNVdqHZLLCcrQdSr2yl0txZSVnHc2EVeDko5qibhrwmI5ho13t2n41jcL8VNbgriaXlSCYteRcYg/',
                      '//10.url.cn/qqke_course_info/ajNVdqHZLLB1TL2v831c0QTYFgyZ7G5ibQwPSVwaAsR4Qmj4giavZWV0WKbicL2fs64I9Q7r6t5VPk/'
                    ]
      },
      {
        id: 5,
        name: '香道塔香手工制作',
        url: 'https://ke.qq.com/course/1967394?taid=8061498997736738',
        imgSrc: 'https://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCDrsYKJCTrCy2Xg4a4zj2eXtYKu1qlyRuDlXs0c0L0Amia33bNgvg1IzyLVexxMbZI/356',
        detailImg: ['//10.url.cn/qqke_course_info/ajNVdqHZLLDatDHsfgiaZwibjnmQ9nhh9rc5cZgqHbQfUzEwam9xyRyl97iahjBmtBvGt7rosTXgJ0/','//10.url.cn/qqke_course_info/ajNVdqHZLLB9ejEictclp1ZzOpzbteqNMJibE2Hr2HOiclZjs2g7AcPcEoFpfTOb3CIpjb76ozTpvo/']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.videoUrl[options.id].name
    });
    this.setData({
      id: options.id
    })
  },
  showUrl(){
    this.setData({
      isShow: true
    })
  },

})