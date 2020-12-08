<template>
  <div>
    <div
      @click='moveToCameraAVG()'
      v-cloak
    >
      <img
        v-if="imginfo!==''"
        :src="imginfo"
      />
      <div class="warm_title2">点击自拍一张头像</div>
    </div>
    <video
      id="video"
      class="pic_video"
      playsinline
      autoplay
      x5-video-player-type="h5"
      style='object-fit:fill'
    ></video>
    <canvas
      id="canvas"
      class="canvas_pic"
      style='margin: 0;padding: 0;'
    ></canvas>
    <div class="bottom_div">
      <div>拍照</div>
      <img
        src='images/pic_btn.png'
        class="capture-btn"
        @click='captureAvg'
      />
    </div>

  </div>
</template>

<script>
require("tracking/build/tracking-min.js");
require("tracking/build/data/face-min.js");
require("tracking/build/data/mouth-min.js");
//   require('tracking/examples/assets/stats.min.js')

export default {
  name: "login",

  data() {
    return {
      trackerTask: null,

      trackering: null,

      mediaStreamTrack: null
    };
  },

  mounted() {
    this.getCompetence();
  },

  methods: {
    // 头像相机
    moveToCameraAVG() {
      var self = this;
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          var getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.oGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      if (window.stream) {
        window.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      var constraints = (window.constraints = {
        audio: false,
        video: {
          sourceId: "default",
          facingMode: { exact: "user" }
        }
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          var video = document.getElementById("video");
          try {
            window.stream = stream;
            video.srcObject = stream;
          } catch (error) {
            video.src = window.URL.createObjectURL(stream);
          }
          self.localMediaStream = stream;
          video.play();
        })
        .catch(function(err) {
          alert(err.name + ": " + err.message);
        });
    },
    //停止摄像机
    stopCapture: function() {
      var video = document.getElementById("video");
      if (!video.srcObject) return;
      let stream = video.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    },
    // 头像照片
    captureAvg() {
      var vm = this;
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        CHeight = video.clientHeight, //获取屏幕大小让canvas自适应
        CWidth = video.clientWidth;
      canvas.width = CWidth;
      canvas.height = CHeight;
      if (vm.localMediaStream) {
        ctx.drawImage(video, 0, 0, CWidth, CHeight);
        var dataURL = canvas.toDataURL("image/jpeg"); //dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
        vm.imginfo = dataURL;
        // 停止摄像机
        video.pause();
        this.stopCapture();
      }
    }
  }
};
</script>

<style scoped>
</style>
