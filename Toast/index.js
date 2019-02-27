/**
 * 自定义 提示框( Toast )组件
 */
import ToastVue from './Toast.vue'
import LoadingVue from './Loading.vue'

var Toast = {}
var toastVm = null
var loadingVm = null

Toast.install = function (Vue, options) {
  // 参数
  var opt = {
    duration: 2000
  }
  var timer1
  var timer2
  for (var property in options) {
    opt[property] = options[property]
  }

  /** 重置toast */
  var resetToast = () => {
    toastVm && (toastVm.animationState = 0)
    toastVm && (toastVm.show = false)
  }

  Vue.prototype.$toast = function (text, type) {
    /** 还原状态 */
    clearTimeout(timer1)
    clearTimeout(timer2)
    resetToast()

    /** 创建 */
    if (!toastVm) {
      var ToastComponent = Vue.extend(ToastVue)
      toastVm = new ToastComponent()

      document.body.appendChild(toastVm.$mount().$el)
    }

    toastVm.text = text
    toastVm.show = true

    /** 动画 */
    timer1 = setTimeout(() => {
      toastVm.animationState = 1
      timer2 = setTimeout(() => {
        resetToast()
      }, 300)
    }, opt.duration)
  }

  Vue.prototype.$loading = function (text, type) {
    /** 还原状态 */
    clearTimeout(timer1)
    clearTimeout(timer2)
    resetToast()

    /** 创建 */
    if (!loadingVm) {
      var LoadingComponent = Vue.extend(LoadingVue)
      loadingVm = new LoadingComponent()

      document.body.appendChild(loadingVm.$mount().$el)
    }

    if (type === 'open') {
      loadingVm.text = text
      loadingVm.show = true
    }

    if (type === 'close') {
      loadingVm.animationState = 1
      timer1 = setTimeout(() => {
        loadingVm.animationState = 0
        loadingVm.show = false
      }, 300)
    }
  }

  var loadingMethods = ['open', 'close']
  loadingMethods.forEach((type) => {
    Vue.prototype.$loading[type] = function (text) {
      return Vue.prototype.$loading(text, type)
    }
  })

  Vue.prototype.$loading.isShow = () => {
    return (loadingVm && loadingVm.show) || false
  }
}

// 向外暴露接口
export default Toast
