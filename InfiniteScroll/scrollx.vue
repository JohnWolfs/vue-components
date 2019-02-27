<template>
  <div class="infinite-scroll infinite-scroll-x">
      <ul ref="ul" :style="{'animation-name': animationName, 'animation-duration': listData.length * duration + 's'}">
        <li v-for="(item, index) in displayData" :key="index">
          {item}}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScrollX',
  data () {
    return {
      animationName: '',
      duration: 3
    }
  },
  props: [ 'listData' ],
  computed: {
    displayData () {
      if (!this.listData) return []
      return this.listData.concat(this.listData)
    }
  },
  mounted () {
    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = `
    @keyframes infinite-scroll-x {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-${this.$refs.ul.scrollWidth / 2}px);
      }
    }
    @-webkit-keyframes infinite-scroll-x {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-${this.$refs.ul.scrollWidth / 2}px);
      }
    }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    this.animationName = 'infinite-scroll-x'
  }
}
</script>

<style lang="postcss" scoped>
.infinite-scroll {
  width: 300px;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #edd;
  & ul {
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    white-space: nowrap;
  }
  & li {
    padding-right: 20px;
    display: inline-block;
  }
}
</style>
