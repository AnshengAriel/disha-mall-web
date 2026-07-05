<template>
  <el-container>
    <el-header class="p-0">
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside class="transition-all duration-300" :style="{width:$store.state.menu.width,overflow:'visible'}">
        <f-menu></f-menu>
      </el-aside>
      <el-main class="p-0 overflow-hidden">
        <FTabList></FTabList>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10">
              <component class="overflow-auto" :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from '@/configs/layouts/FHeader.vue';
import FMenu from '@/configs/layouts/FMenu.vue';
import FTabList from '@/configs/layouts/FTabList.vue';
import { useAppSession } from '@/main/composables/AppSessionUse';
import { useRoute } from 'vue-router';
import { useAppRouter } from '@/configs/router';
import store from '@/main/composables/AppStoreUse';

const {
  saveState,
  getState,
} = useAppSession()

const {
  main
} = useAppRouter().getRouteNames()

const {
  hasMatched
} = useAppRouter()
const route = useRoute();

// 在页面刷新后，保存state
function onBeforeunload() {
  const routeName = route.name
  console.log('触发window监听事件[beforeunload]', routeName)
  if (hasMatched(route, main)) {
    saveState()
  }
  window.removeEventListener('beforeunload', onBeforeunload)
  
}
window.addEventListener('beforeunload', onBeforeunload)

const state = getState();
if (hasMatched(route, main)) {
  console.log("replaceState", JSON.stringify(store.state), '\n', JSON.stringify(state))
  store.replaceState(state)
}

console.log('app重载中。。。')
</script>

<style lang="scss">

.fade-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}
.fade-enter-to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.fade-leave-from {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>