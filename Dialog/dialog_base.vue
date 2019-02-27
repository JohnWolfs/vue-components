<template>
  <div class="dialog-wrapper" v-on:click.stop="() => {}">
      <div class="main">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DialogBase'
}
</script>

<style lang="postcss" scoped>
  .dialog-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
