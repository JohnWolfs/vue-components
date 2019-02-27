<template>
  <div class="float-tool-wrapper" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" :style="{'left': left + 'px', 'top': top + 'px'}">
    <div class="btn-toggle" @click="onToggle" ref="btn" :class="{'animateBtn':animateBtn}"></div>
    <div class="float-tool">
      <div class="tool-container" v-if="showTools" :class="{slideDown: animateTool==='slideDown', slideUp: animateTool==='slideUp'}">
        <div class="tool-item" @click="onToolClick('app')">
          <div class="icon-gotoapp"></div>
          <p>item1</p>
        </div>
        <div class="tool-item" @click="onToolClick('invite')">
          <div class="icon-invite"></div>
          <p>item2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openApp from '../../modules/openApp.js'

export default {
  name: 'DragBox',
  data () {
    return {
      showTools: false,
      animateTool: 'slideDown',
      animateBtn: false,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0,
      startTime: 0,
      top: 410,
      left: 280,
      btnWidth: 0,
      btnHeight: 0,
      pageWidth: document.documentElement.clientWidth,
      pageHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    onToolClick (type) {
      switch (type) {
        case 'app':
          openApp.open()
          break
        case 'invite':

          break
      }
    },
    onToggle () {
      if (this.showTools) {
        this.animateTool = 'slideUp'
        this.animateBtn = false
        setTimeout(() => {
          this.showTools = false
        }, 300)
      } else {
        this.animateBtn = true
        this.showTools = true
        this.animateTool = 'slideDown'
      }
    },
    onTouchStart (e) {
      e.preventDefault()
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
      this.startLeft = this.left
      this.startTop = this.top
      this.startTime = (new Date()).getTime()
    },
    onTouchMove (e) {
      let changeX = e.touches[0].clientX - this.startX
      let changeY = e.touches[0].clientY - this.startY

      this.left = this.startLeft + changeX
      this.top = this.startTop + changeY
      if (this.left < 4) this.left = 4
      if (this.top < this.btnHeight / 2) this.top = this.btnHeight / 2
      if (this.left > this.pageWidth - this.btnWidth) this.left = this.pageWidth - this.btnWidth
      if (this.top > this.pageHeight - this.btnHeight * 3 / 2) this.top = this.pageHeight - this.btnHeight * 3 / 2
    },
    onTouchEnd (e) {
      let changeX = e.changedTouches[0].clientX - this.startX
      let changeY = e.changedTouches[0].clientY - this.startY
      var now = (new Date()).getTime()
      if (now - this.startTime < 300 && changeX < 3 && changeY < 3) {
        e.changedTouches[0].target.click()
      }
    }
  },
  mounted () {
    this.btnWidth = this.$refs.btn.offsetWidth
    this.btnHeight = this.$refs.btn.offsetHeight
    this.left = this.pageWidth - this.btnWidth
  }
}
</script>

<style lang="postcss" scoped>
@keyframes slideDown {
  0% {
    transform: translateY(-300px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes slideUp {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-300px);
  }
}
.float-tool-wrapper {
  position: fixed;
}
.float-tool {
  width: 58px;
  overflow: hidden;
  z-index: 1;
  position: relative;
}
.btn-toggle {
  width: 68px;
  height: 68px;
  background: #619;
  background-size: cover;
  position: absolute;
  top: -30px;
  left: -5px;
  z-index: 2;
  transition: all .5s;
}
.animateBtn{
  transform: rotateZ(135deg);
}
.tool-container {
  background: #ffece1;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  padding-top: 32px;
  padding-bottom: 26px;
  transform: translateY(-300px);
  .tool-item {
    margin-top: 6px;
    p {
      font-family: PingFangSC-Regular;
      font-size: 8px;
      color: #ff683f;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
.slideDown {
  animation: slideDown .3s;
  animation-fill-mode: forwards;
}
.slideUp {
  animation: slideUp .3s;
  animation-fill-mode: forwards;
}
.icon-gotoapp {
  width: 42px;
  height: 42px;
  background: #128;
  background-size: cover;
  margin: 0 auto;
}
.icon-invite {
  width: 42px;
  height: 42px;
  background: #821;
  background-size: cover;
  margin: 0 auto;
}
</style>
