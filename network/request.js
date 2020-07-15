// 请求次数
let requestTimes = 0
export function req(obj){
  requestTimes++
  // 加载图标
  // wx.showLoading({title: '加载中',mask: true})
  return new Promise((resolve, reject) => {
    wx.request({
      ...obj,
      success: (result)=>{
        resolve(result)
      },
      fail: (error)=>{
        reject(error)
      },
      complete: () => {
        requestTimes--
        if(requestTimes == 0){
          // 结束图标
          // wx.hideLoading();
        }
      }
    });
  })
}