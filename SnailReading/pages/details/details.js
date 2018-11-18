// pages/details/details.js
var AV=require("../../utils/av-weapp-min.js");
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowDetails:true,
    isShowDirec:false,
  },
  showDetails:function(){
    this.setData({
      isShowDetails:true,
      isShowDirec: false
    })
  },
  showDirec:function(){
    this.setData({
      isShowDirec:true,
      isShowDetails: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在拼命加载',
    })
    var _This=this;
   id = options.classId ||"5bcad6a60b6160006f32fe93";
    var query=new AV.Query("Books");
    query.equalTo("objectId",id);
    query.find().then(function(res){
      var isAdd = res[0].attributes.Add?true:false;
      wx.hideLoading();
      var direc = res[0].attributes.direc.split('$');
      _This.setData({
        detailData:res[0].attributes,
        dataArr:direc,
        addDesk:isAdd
      })
    })
   
  },
  handleAdd:function(){
    var _This=this;
    //给加入书桌的加入特定字段
    var upDate = AV.Object.createWithoutData("Books", id);
    var state=this.data.addDesk;
    upDate.set("Add", !state);
    upDate.save().then(function(res){
      var s=res.attributes.Add;
      _This.setData({
        addDesk: !_This.data.addDesk
      })
      if(s){
        wx.showToast({
          title: '加入成功',
        })
      }else{
        wx.showToast({
          title: '移出成功',
        })
      }
      
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