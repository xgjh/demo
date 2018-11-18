// pages/classfy/class-detail/class-detail.js
  var  AV=require("../../../utils/av-weapp-min.js");
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
    var _This=this;
    var query=new AV.Query("Books");
    var i=options.id||1;
    query.equalTo("classify",i);
    query.find().then(function(res){
      var arr=[];
      for(var i=0;i<res.length;i++){
        var data=res[i].attributes;
        //增加id值
        data.classId = res[i].id;
        arr.push(data);
      }
      _This.setData({
        classifyDetail:arr
      })
    })
  },
  handleTo:function(ev){
    var id=ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../details/details?classId='+id,
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