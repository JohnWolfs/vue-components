<template>
  <div class="toast-loading" v-show="show" :class="{fadeIn: animationState === 0, fadeOut: animationState === 1}">
    <img class="loading-icon" src="./loading.svg" alt="">
    <div class="toast-text">{{text}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      show: false,
      animationState: 0
    }
  }
}
</script>

<style lang="postcss" scoped>
@keyframes rotate {
  0% { transform: rotate(0deg); -webkit-transform: rotate(0deg); }
  100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }
}
.toast-loading {
  max-width: 150px;
  padding: 12px 17px 9px 17px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  background: rgba(0, 0, 0, .8);
  border-radius: 3px;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  z-index: 99999;
}
.toast-text {
  line-height: 18px;
  margin-top: 3px;
}
.loading-icon {
  width: 24px;
  animation: rotate 1.5s infinite;
  animation-fill-mode: forwards;
  -webkit-animation: rotate 1.5 infinite;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}
.fadeIn {
  animation: fadeIn .3s;
  animation-fill-mode: forwards;
  -webkit-animation: fadeIn .3s;
  -webkit-animation-fill-mode: forwards;
}
.fadeOut {
  animation: fadeOut .3s;
  animation-fill-mode: forwards;
  -webkit-animation: fadeOut .3s;
  -webkit-animation-fill-mode: forwards;
}
</style>
