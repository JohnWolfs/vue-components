/*
 * Filename: /Users/linzhiqiang/web/td-activity/201902/团粉挑战赛/src/components/Dialog/index.js
 * Path: /Users/linzhiqiang/web/td-activity/201902/团粉挑战赛
 * Created Date: Sunday, September 16th 2018, 12:50:12 pm
 * Author: linzhiqiang
 * 
 * Copyright (c) 2019 Your Company
 */

import DialogVue from './index.vue'
import Dom from './dom'

var Dialog = {}
var dialogVm = null

Dialog.install = function (Vue, options) {

  /** 输入配置 */
  var dialogConfig = {}

  /** 检查是否创建了dom */
  function checkCreate () {
    if (!dialogVm) {
      var DialogComponent = Vue.extend(DialogVue)
      dialogVm = new DialogComponent()
      dialogVm.config = {}
      dialogVm.onClose = function () { hide() }

      document.body.appendChild(dialogVm.$mount().$el)
    }
  }

  /** 关闭时清除配置 */
  function clear () {
    /** 重置配置 */
    Object.keys(dialogVm.config).map(key => {
      dialogVm[key] = null
    })
    dialogConfig = {}

    /** relative定位 */
    if (dialogConfig.positionType === 'relative') {
      Dom.relative()
    }
  }

  /** 展示对话框 */
  const open = (type, option, config) => {
    if (!type) {
      throw 'param type required'
    }

    checkCreate()

    dialogVm.type = type
    dialogVm.show = true
    dialogVm.config = {}
    dialogVm.setOption(option || {})

    if (config) {
      dialogConfig = config

      Object.keys(config).map(key => {
        dialogVm.config[key] = config[key]
      })

      /** relative定位 */
      if(config.positionType === 'relative') {
        Dom.fixed()
      }
    }
  }

  /** 隐藏对话框 */
  const hide = () => {
    dialogVm.show = false
    clear()
  }

  const close = () => {
    dialogVm.closeDialog()
  }

  /** dialog对外接口 */
  Vue.prototype.$dialog = {
    open: open,
    close: close
  }
}

export default Dialog
