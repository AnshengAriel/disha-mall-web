<template>
  <div class="f-menu">
    <el-menu
      ref="menuRef"
      :default-active="activeMenu"
      :collapse="$store.state.menu.isCollapse"
      :collapse-transition="false"
      unique-opened
      @select="selectMenuItem"
    >
      <template v-for="(menu, index) in $store.state.menus" :key="index">
        <el-sub-menu v-if="menu.children.length>0" :index="menu.name">
          <template #title>
            <el-icon>
              <component v-bind:is="menu.icon"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item 
            v-for="(subMenu, subIndex) in menu.children" 
            :key="subIndex" 
            :index="subMenu.index"
          >
            <el-icon>
              <component v-bind:is="subMenu.icon"></component>
            </el-icon>
            <span>{{ subMenu.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.index">
          <el-icon>
            <component v-bind:is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </template>
      
    </el-menu>
  </div>
</template>

<script setup>
import { useAppStore } from '@/main/composables/AppStoreUse';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 刷新页面时校准菜单
const route = useRoute()
const activeMenu = computed(() => route.name)

// 点击跳转路由
const router = useRouter()
const { getMenus } = useAppStore()
const selectMenuItem = e => {
  router.push({
    name: e
  })
}

// 通过路由获取子菜单的索引
const menuRef = ref()
const getSubmenuName = () => {
  for (const menu of getMenus()) {
    if (menu.children) {
      for (const subMenu of menu.children) {
        if (subMenu.index == activeMenu.value) {
          return menu.name
        }
      }
    }
  }
}

onMounted(() => {
  menuRef.value.open(getSubmenuName())
})

</script>

<style lang="scss">
.f-menu {
  height: calc(100vh - 60px);
  overflow-y: auto;
  @apply shadow-md;
}
.f-menu::-webkit-scrollbar {
  width: 0;
}

.f-menu .el-menu {
  border: 0;
}

</style>