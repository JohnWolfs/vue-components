<template>
  <div class="dialog-rule">
    <DialogBase>
      <template>
        <div class="swiper-container-rule swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <ul>
                <li class="rule-item">
                  <span class="rule-index">1.</span>
                  <div class="rule-text">活动时间：8月24日-10月22日；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">2.</span>
                  <div class="rule-text">活动对象：活动期间内APP用户均可参与；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">3.</span>
                  <div class="rule-text">
                    活动奖励：每位邀请人拥有可同时获得双重邀请奖励资格，前提是被邀请人必须满足活动条件；
                    <br> （例如：A邀请B，B出借了网贷平台并且获得返利，同时B也成功开得1张信用卡，则A可同时获得：网贷+信用卡双重邀请奖励）
                  </div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">4.</span>
                  <div class="rule-text">邀请的好友必须是历史未注册过财喵星球的新用户，同一个号码只能被邀请一次（同一个登录账号、同一设备号或者其它合理显示为同一用户的情形，均视为同一用户）；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">5.</span>
                  <div class="rule-text">同一个新用户可同时参与财喵星球网贷版块和信用卡版块，且需符合对应活动规则方可获得对应奖励；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">6.</span>
                  <div class="rule-text">同一个新用户可同时申请多个银行信用卡，银行新户下卡成功，邀请人即可获得每张10元奖励；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">7.</span>
                  <div class="rule-text">被邀请人是否符合活动条件需财喵星球工作人员核实，且会在7个工作日内激活邀请奖励；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">8.</span>
                  <div class="rule-text">邀请的好友仅限出借财喵星球网贷版块的平台，且需符合平台出借返利条件，方可成功累计返利总额，财喵其它额外返利活动不计算在被邀请人累计返利内；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">9.</span>
                  <div class="rule-text">活动期间内成功邀请注册的用户，在活动结束后7个工作日内满足活动条件，视为有效邀请并可发放奖励，过期作废；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">10.</span>
                  <div class="rule-text">奖励发放：所有现金奖励将以现金券的形式统一发放到APP-我的-财喵宝箱，请注意点击提现到我的零钱；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">11.</span>
                  <div class="rule-text">好友申请信用卡后，由银行和第三方机构批核，财喵不参与任何批核流程，也不承担与批核结果相关的责任；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">12.</span>
                  <div class="rule-text">如发现恶意刷奖作弊行为，财喵星球有权取消邀请人邀请资格，并暂停或收回奖励；</div>
                </li>
                <li class="rule-item">
                  <span class="rule-index">13.</span>
                  <div class="rule-text">本活动最终解释权归财喵星球所有。</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="swiper-scrollbar"></div>
        </div>
      </template>
    </DialogBase>
  </div>
</template>

<script>
import DialogBase from './dialog_base'
import Swiper from 'swiper'

export default {
  name: 'DialogRule',
  components: { DialogBase },
  data () {
    return {
      swiper: null
    }
  },
  methods: {},
  mounted () {
    setTimeout(() => {
      this.swiper = new Swiper('.swiper-container-rule', {
        freeMode: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheel: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      })
    }, 500)

    window.addEventListener('resize', () => {
      setTimeout(() => this.swiper.update(), 500)
    })
  }
}
</script>

<style lang="postcss" scoped>
.dialog-rule {
  width: 80%;
  margin: 0 auto;
  background: #fff;
}
.swiper-container-rule {
  /* height: 600px; */
}
.swiper-slide {
  height: auto;
}
</style>
