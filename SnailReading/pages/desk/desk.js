// pages/desk/desk.js
var AV=require("../../utils/av-weapp-min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    potIndex:0,
    isShow:false,//控制我的书桌界面的显示
    isTidy:false//控制是否为整理书桌状态，false为未整理
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _This=this;
    var query=new AV.Query("Books");
    query.equalTo("Add",true);
    query.find().then(function(res){
      var AddArr=[];
      for(var i=0;i<res.length;i++){
        var data=res[i].attributes;
        var isSelect = res[i].attributes.isSelect ? true : false;
        data.objId = res[i].id;
        data.isSelect=isSelect;
        AddArr.push(data);
      }
      _This.setData({
        AddArr: AddArr
      })
    })
  },
  handleindex:function(res){
    var index=res.detail.current;
    this.setData({
      potIndex:index
    })
  },
  handleToDesk:function(){//书桌列表显示函数
    this.setData({
      isShow:true,
      isTidy:false
    })
  },
  handleClose:function(){//隐藏书桌列表函数
    this.setData({
      isShow:false,
      isTidy:false
    })
  },
  handleTidy:function(){//控制整理书桌显示函数
    var isTidy=this.data.isTidy;
    var _This=this;
    this.setData({
      isTidy: !isTidy
    });
    if (isTidy) {
      var AddArr = _This.data.AddArr;
      for (var i = 0; i < AddArr.length; i++) {
        var upDate = AV.Object.createWithoutData("Books", AddArr[i].objId);
        AddArr[i].isSelect=false;
          upDate.set("isSelect", false);
          upDate.save().then(function (res) {
            _This.setData({
              AddArr: AddArr
            })
          })
      }
    }
  },
  handleSelect:function(res){//选择或者取消图书
    var _This=this;
    var num=res.currentTarget.dataset.num;
    var thisId = this.data.AddArr[num].objId;
    var upDate=AV.Object.createWithoutData("Books",thisId);
    var state = this.data.AddArr[num].isSelect;
    upDate.set("isSelect",!state);
    upDate.save().then(function(res){
      var AddArr=_This.data.AddArr;
      AddArr[num].isSelect = !AddArr[num].isSelect;
      _This.setData({
        AddArr: AddArr
      })
    })
  },
  handleDel:function(){//书本移除书桌函数
    var AddArr = this.data.AddArr;
    var _This=this;
    for (var i = 0; i < AddArr.length; i++) {
      var upDate = AV.Object.createWithoutData("Books", AddArr[i].objId);
      if(AddArr[i].isSelect){
        upDate.set("Add", false);
        upDate.set("isSelect", false);
        AddArr[i].Add = false;
        AddArr.splice(i,1);
        i--;
        upDate.save().then(function (res) {
          _This.setData({
            AddArr: AddArr
          })
          wx.showToast({
            title: '移除书本成功',
          })
        })
      }
    }
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