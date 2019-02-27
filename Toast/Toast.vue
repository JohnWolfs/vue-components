<template>
  <div class="toast" v-show="show" :class="{fadeIn: animationState === 0, fadeOut: animationState === 1}">
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
.toast {
  max-width: 160px;
  padding: 8px;
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
  line-height: 18px;
  font-size: 12px;
  z-index: 99999;
}
.fadeIn {
  animation: fadeIn .3s;
  animation-fill-mode: forwards;
}
.fadeOut {
  animation: fadeOut .3s;
  animation-fill-mode: forwards;
}
</style>
