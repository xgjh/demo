// pages/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isValue:true,
    isEye:false//密码加密
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleDel:function(){//清空手机号
    this.setData({
      isValue:false
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  handleBlur:function(e){//输入框失焦
    var _This=this;
    var value=e.detail.value;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则   
    var flag = reg.test(value); 
    if(!flag){
      wx.showModal({
        title: '请输入正确的手机号码',
        showCancel:false
      })
      _This.setData({
        isValue:false
      })
    }
  },
  handleChange:function(){//密码显示与隐藏
    var state=this.data.isEye;
    this.setData({
      isEye:!state
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