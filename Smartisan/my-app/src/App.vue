<template>
  <div id="app">
    <router-view name="header"/>
    <transition name="fade">
      <router-view/>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.3s linear;
}
.fade-enter-to,
.fade-leave{
  opacity: 1;
}
</style>
