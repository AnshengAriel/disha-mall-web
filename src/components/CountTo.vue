<template>
  <span>{{ initNum.value.toFixed(0) }}</span>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted, reactive, watch } from 'vue';

// 更新值
const props = defineProps({
  num: {type: Number, default: 0}
})

// 初始值
const initNum = reactive({
  value: 0
})

// 从初始值滚动到更新值
const countTo = () => {
  gsap.to(initNum, {
    duration: 1,
    value: props.num
  })
}

watch(() => props.num, (n, o) => {
  countTo()
})

onMounted(() => {
  countTo()
})
</script>

<style lang="scss">
</style>