<template>
  <div class="tab-component">
    <div class="tabbar">
      <div :ref="'tab' + key" class="tab" :class="{'selected': selected === key}" v-for="(item, key) in tabs" :key="key" @click="selectTab(key)">{{item}}</div>
      <div class="tabselector" v-if="tabselector && tabselectorObj.enable" :style="{'width': tabselectorObj.width, 'transform': 'translateX(' + tabselectorObj.left + ')'}"></div>
    </div>
    <div class="tabcontent">
      <div class="swiper-container-tabcontent swiper-container" :class="{'swiper-no-swiping': noTouchSwiper}">
          <div class="swiper-wrapper">
            <div class="swiper-slide content" :class="{'no-transition': contentTransition === false}" v-for="(item, key) in tabs" :key="key">
              <slot :name="'content' + (key + 1)">
              </slot>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabComponent',
  data () {
    return {
      swiper: null,
      selected: 0,
      contentTransition: true,
      tabselectorObj: {
        enable: true,
        width: '0px',
        left: '0px'
      }
    }
  },
  props: [ 'tabs', 'gotoIndex', 'tabselector', 'noTouchSwiper' ],
  computed: {
    // tabselectorObj () {
    //   console.log(this.tabselector)
    //   return this.tabselector
    // }
  },
  methods: {
    selectTab (i) {
      if (!this.swiper) return
      this.selected = i
      this.swiper.slideTo(i)
      this.relocateSelector(i)
    },
    relocateSelector (i) {
      var tab = this.$refs['tab' + i][0]

      if (this.tabselector && this.tabselectorObj.enable) {
        this.tabselectorObj.width = tab.offsetWidth + 'px'
        this.tabselectorObj.left = tab.offsetLeft + 'px'
      }
    },
    progressRelocateSelector (progress) {
      var tab = this.$refs['tab' + 0][0]
      var distance = this.$refs['tab' + 1][0].offsetLeft - this.$refs['tab' + 0][0].offsetLeft
      if (this.tabselector && this.tabselectorObj.enable) {
        this.tabselectorObj.width = tab.offsetWidth + 'px'
        this.tabselectorObj.left = (tab.offsetLeft + distance * progress) + 'px'
      }
    }
  },
  watch: {
    gotoIndex (cur, old) {
      setTimeout(() => { this.selectTab(cur) }, 0)
    }
  },
  mounted () {
    var that = this
    var index = 0

    if (this.gotoIndex !== undefined) index = this.gotoIndex

    this.relocateSelector(index)

    setTimeout(() => {
      this.swiper = new Swiper('.swiper-container-tabcontent', {
        on: {
          slideChange: function () {
            that.selected = this.activeIndex
            // that.relocateSelector(this.activeIndex)
          },
          progress: progress => {
            this.progressRelocateSelector(progress)
          }
        }
      })
      this.swiper.slideTo(index)
    }, 300)
  }
}
</script>

<style lang="postcss" scoped>
.tab-component {
  width: 100%;
  min-width: 300px;
}
.tabselector {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #666;
  transition: all .1s;
  left: 0;
}
.tabbar {
  width: 375px;
  margin: 0 auto;
  z-index: 2;
}
.tabcontent {
  width: 100%;
  /* padding: 2px; */
}
.no-transition {
  transition: none!important;
}
.tabbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
