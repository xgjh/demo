// pages/classfy/classfy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在拼命加载',
    })
    var that=this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bc9bda036cd6f2c70fa553d/classify/classify', 
      method:"GET",
      success(res) {
        wx.hideLoading();
        that.setData({
          cData:res.data
        })
      }
    })
   
  },
  handleT:function(ev){
    var  id=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'class-detail/class-detail?id='+id,
      success: function(res) {
      },
       
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})