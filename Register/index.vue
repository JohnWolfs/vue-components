<template>
  <div class="register">
    <div class="register-item">
      <div class="register-input">
        <i class="icon-phone"></i>
        <input type="text" v-model="phone" placeholder="请输入手机号" pattern="\d*" maxlength="11">
      </div>
    </div>
    <div class="register-item">
      <div class="register-input">
        <i class="icon-imgcode"></i>
        <input type="text" v-model="imgcode" placeholder="图形验证码" maxlength="4">
      </div>
      <div class="register-btn">
        <div class="btn-imgCode" v-if="!imgcodesrc" @click="refreshImgCode">获取图形验证码</div>
        <div class="imgcode" v-if="imgcodesrc"><img :src="imgcodesrc" alt="" @click="refreshImgCode"></div>
      </div>
    </div>
    <div class="register-item">
      <div class="register-input">
        <i class="icon-msgcode"></i>
        <input type="text" v-model="msgcode" placeholder="手机验证码" maxlength="4">
      </div>
      <div class="register-btn">
        <div class="btn-msgCode" @click="getMsgCode">{{btnMsgCodeText}}</div>
      </div>
    </div>
    <div class="register-item">
      <div class="agreement-check" @click="toggleAgreement">
        <i class="icon-check" v-if="agreement"></i>
        <i class="icon-uncheck" v-if="!agreement"></i>
      </div>
      <div class="agreement">我已阅读并同意<span @click="linkUserProtocol">《财喵星球用户协议》</span></div>
    </div>
    <div class="register-submit" @click="register">注册</div>
  </div>
</template>

<script>
import http from './http'
import openApp from './openApp'

export default {
  name: 'Register',
  data () {
    return {
      phone: '',
      imgcode: '',
      msgcode: '',
      imgcodesrc: null,
      counting: false,
      btnMsgCodeText: '获取手机验证码',
      errors: [],
      channel: '',
      inviteUid: '',
      agreement: true,
      submiting: false,
      http: http
    }
  },
  methods: {
    refreshImgCode () {
      if (!this.checkPhone()) return
      this.http.getImgCode({ phone: this.phone }).then(res => {
        this.imgcodesrc = res
      })
    },
    getMsgCode () {
      if (this.counting) {
        this.showMsg('验证码已发送')
        return
      }
      if (!this.checkPhoneImgCode()) return

      this.http.getMsgCode({phone: this.phone, imgcode: this.imgcode}).then(res => {
        this.showMsg(res.statusMsg)
        if (res.statusCode === 1002) {
          this.startCounter()
        } else {
          this.refreshImgCode()
        }
      }).catch(() => {
        this.showMsg('请求失败')
        this.refreshImgCode()
      })
    },
    register () {
      if (this.submiting || !this.checkForm()) return

      this.submiting = true

      this.http.register({
        phone: this.phone,
        password: '',
        msgcode: this.msgcode,
        channel: this.channel,
        invite_uid: this.inviteUid
      }).then(res => {
        this.submiting = false
        if (res.statusCode === 1002) {
          this.showMsg('注册成功')
          openApp.open()
        } else this.showMsg(res.statusMsg)
      }).catch(() => {
        this.submiting = false
        this.showMsg('注册失败')
      })
    },
    startCounter () {
      var countTime = 60
      this.counting = true
      var tid = setInterval(() => {
        this.btnMsgCodeText = countTime + 's后可重新发送'
        if (countTime <= 0) {
          clearInterval(tid)
          this.btnMsgCodeText = '重新获取'
          this.counting = false
        }
        countTime--
      }, 1000)
    },
    linkUserProtocol () {
      this.$router.push('/agreement')
    },
    toggleAgreement () {
      this.agreement = !this.agreement
    },
    checkPhone () {
      this.errors = []
      if (this.phone === '') this.errors.push('手机号码不能为空')
      if (!this.validPhone(this.phone)) this.errors.push('请输入正确的手机号码')
      this.showError()

      return !this.errors.length
    },
    checkPhoneImgCode () {
      this.errors = []
      if (this.phone === '') this.errors.push('手机号码不能为空')
      if (!this.validPhone(this.phone)) this.errors.push('请输入正确的手机号码')
      if (this.imgcode === '') this.errors.push('图形验证码不能为空')

      this.showError()

      return !this.errors.length
    },
    checkForm () {
      this.errors = []
      if (this.phone === '') this.errors.push('手机号码不能为空')
      if (!this.validPhone(this.phone)) this.errors.push('请输入正确的手机号码')
      if (this.msgcode === '') this.errors.push('手机验证码不能为空')
      if (!this.validMsgCode(this.msgcode)) this.errors.push('请输入正确的手机验证码')
      if (!this.agreement) this.errors.push('请阅读并勾选协议')

      this.showError()

      return !this.errors.length
    },
    validPhone (phone) {
      return /^1\d{10}$/.test(phone)
    },
    validMsgCode (code) {
      return /^\d{4}$/.test(code)
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    showError () {
      this.$toast && this.errors.length && this.$toast(this.errors[0])
    },
    showMsg (msg) {
      this.$toast && msg && this.$toast(msg)
    }
  },
  mounted () {
    this.channel = this.getUrlParam('channel') || 'yyzWD88a1brxgsy'
    this.inviteUid = this.getUrlParam('invite_uid')
  }
}
</script>

<style lang="postcss" scoped>
.register {
  width: 600px;
  border: 1px solid #ddd;
  margin: 0 auto;
}
.register-item {
  display: flex;
}
.register-input {
  & input {
    width: 300px;
  }
}
.agreement-check {
  width: 30px;
  height: 30px;
}
.icon-phone {

}
.icon-imgcode {

}
.icon-msgcode {

}
.icon-check {
  width: 100%;
  height: 100%;
  display: inline-block;
  background: #666;
}
.icon-uncheck {
  width: 100%;
  height: 100%;
  display: inline-block;
  background: #fff;
}
</style>
