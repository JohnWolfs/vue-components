<template>
  <div class="infinite-scroll">
      <ul :style="{'animation-duration': listData.length * duration + 's'}">
        <li v-for="(item, index) in displayData" :key="index">
          {{item}}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScroll',
  data () {
    return {
      duration: 1
    }
  },
  props: [ 'listData' ],
  computed: {
    displayData () {
      return this.listData.concat(this.listData)
    }
  }
}
</script>

<style lang="postcss" scoped>
@keyframes infinite-scroll {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}
.infinite-scroll {
  height: 300px;
  overflow: hidden;
  & ul {
    animation: infinite-scroll 6s infinite;
    animation-timing-function: linear;
  }
}
</style>
