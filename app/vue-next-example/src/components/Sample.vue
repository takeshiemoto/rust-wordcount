<template>
  <>
    <h1 class="heading">{{ message }}</h1>
    <h2>foobar</h2> <!-- OK! -->
  <>
</template>
<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, onUpdated, ref } from '@vue/composition-api';
  export default defineComponent({
    setup() {
      /** ライフサイクル */
      onMounted(() => console.log('mounted!!'))
      onUpdated(() => console.log('updated!!'))
      onUnmounted(() => console.log('unMounted!!'))

      /** dataに相当するref */
      const message = ref<string>('Hello, world')

      // setupからreturnされたものが<template>で利用できる
      return { message }
    }
  })
</script>
<style scoped>
  .heading {
    font-size: 12px;
  }
</style>
