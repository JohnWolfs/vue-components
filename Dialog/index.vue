<template>
  <div class="dialog-overlay"
    :class="overlayClass"
    @click="onOverlayClick"
    @touchmove="onOverlayTouchMove"
    v-show="show">
    <div 
      class="dialog"
      :class="dialogClass"
    >
      <component :is="dialog" @close="closeDialog" :option="option"></component>
    </div>
  </div>
</template>

<script>
import DialogRule from './dialog_rule'

export default {
  name: 'Dialog',
  props: {
    show: Boolean,
    type: String, // 对话框标识 eg: DialogRule
    
    config: {
      enableOverlayScroll: Boolean, // 蒙层是否可滑动
      enableOverlayClose: Boolean, // 蒙层是否可点击
      positionType: String, // 定位类型 'relative'
      animation: {
        in: String,
        out: String,
        durationIn: Number, // 只适用部分时间值，具体看animate.css定义的class
        durationOut: Number
      }, // 动画类型 默认（fadeindown和fadeoutup）
      overlayAnimation: {
        in: String,
        out: String,
        durationIn: Number, // 只适用部分时间值，具体看animate.css定义的class
        durationOut: Number
      },
      dialogLocation: String, // 指定对话框位置 'bottom' 会去掉所有动画
    }
  },
  components: { DialogRule },
  data () {
    return {
      /** 动画状态 0 对话框准备进入状态 1 对话框准备退出状态 */
      animationState: 0,
      /** 传入的对话框参数（用于渲染） */
      option: {},
      /** 默认配置 */
      defaultConfig: {
        enableOverlayScroll: false,
        enableOverlayClose: false,
        positionType: null,
        animation: {
          in: 'DialogZoomIn',
          out: 'DialogZoomOut',
          durationIn: 800,
          durationOut: 800
        },
        overlayAnimation: {
          in: 'DialogFadeIn',
          out: 'DialogFadeOut',
          durationIn: 800,
          durationOut: 800
        },
        dialogLocation: null,
        positionOverlayClassMap: {
          'relative': 'dialog-overlay-relative'
        },
        positionDialogClassMap: {
          'relative': 'dialog-relative'
        },
        dialogLocationClassMap: {
          'bottom': 'dialog-bottom'
        }
      },
    }
  },
  computed: {
    dialog () {
      if (this.type) return this.type
      else return 'DialogRule'
    },
    dialogAnimationIn () {
      return (this.config.animation && this.config.animation.in) || this.defaultConfig.animation.in
    },
    dialogAnimationOut () {
      return (this.config.animation && this.config.animation.out) || this.defaultConfig.animation.out
    },
    overlayAnimationIn () {
      return (this.config.overlayAnimation && this.config.overlayAnimation.in) || this.defaultConfig.overlayAnimation.in
    },
    overlayAnimationOut () {
      return (this.config.overlayAnimation && this.config.overlayAnimation.out) || this.defaultConfig.overlayAnimation.out
    },
    overlayClass () {
      var durationClass = 'overlay-animation-duration-' + (this.animationState === 0 ?
      ((this.config.overlayAnimation && this.config.overlayAnimation.durationIn) || this.defaultConfig.overlayAnimation.durationIn) : 
      ((this.config.overlayAnimation && this.config.overlayAnimation.durationOut) || this.defaultConfig.overlayAnimation.durationOut))
      return [
        this.animationState === 0 ? this.overlayAnimationIn : '',
        this.animationState === 1 ? this.overlayAnimationOut : '',
        this.config.positionType && this.defaultConfig.positionOverlayClassMap[this.config.positionType],
        durationClass
      ]
    },
    dialogClass () {
      var durationClass = 'dialog-animation-duration-' + (this.animationState === 0 ?
      ((this.config.animation && this.config.animation.durationIn) || this.defaultConfig.animation.durationIn) : 
      ((this.config.animation && this.config.animation.durationOut) || this.defaultConfig.animation.durationOut))
      return [
        this.animationState === 0 ? this.dialogAnimationIn : '',
        this.animationState === 1 ? this.dialogAnimationOut : '',
        this.config.positionType && this.defaultConfig.positionDialogClassMap[this.config.positionType],
        this.config.dialogLocation && this.defaultConfig.dialogLocationClassMap[this.config.dialogLocation],
        durationClass
      ]
    }
  },
  methods: {
    setOption (opt) {
      this.option = opt
    },
    closeDialog () {
      var animationDurationOut = (this.config.animation && this.config.animation.durationOut) || this.defaultConfig.animation.durationOut
      var overlayAnimationDurationOut = (this.config.overlayAnimation && this.config.overlayAnimation.durationOut) || this.defaultConfig.overlayAnimation.durationOut
      this.animationState = 1
      setTimeout(() => {
        this.animationState = 0
        this.onClose()
      }, Math.max(animationDurationOut, overlayAnimationDurationOut))
    },
    onClose () {
    },
    onOverlayClick () {
      if (this.config.enableOverlayClose && this.animationState === 0) this.closeDialog()
    },
    onOverlayTouchMove (e) {
      if (!this.config.enableOverlayScroll) e.preventDefault()
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './animate.css';

.dialog-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 9999;
}
.dialog-overlay-relative {
  position: relative;
  top: initial;
  bottom: initial;
  left: initial;
  right: initial;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
}
.dialog {
  min-height: 100px;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: left;
}
.dialog-overlay .dialog-bottom {
  top: initial;
  position: absolute;
  bottom: 0;
  transform: none;
  animation: none;
}
.dialog-relative {
  position: relative;
  transform: initial;
}
</style>
