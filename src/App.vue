<template>
  <router-view></router-view>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import store from '@/composables/store';
import { getStateInSessionStorage, setStateInSessionStorage } from '@/composables/session';

onBeforeMount(() => {
  console.log('app重载中。。。')
})

// 在页面刷新后，保存state
function onBeforeunload() {
  console.log('触发window监听事件[beforeunload]')
  setStateInSessionStorage()
  window.removeEventListener('beforeunload', onBeforeunload)
}
window.addEventListener('beforeunload', onBeforeunload)

const storeData = getStateInSessionStorage()
if (storeData) {
  console.log('重新加载store', storeData)
  store.replaceState(storeData)
}
</script>

<style scoped>
</style>
