<template>
  <div class="f-tab-list">
    <el-tabs
      v-model="$route.name"
      type="card"
      @tab-remove="removeTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="item in $store.state.tabList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown placement="bottom-end" @command="handleCommand">
      <el-icon size="16px" ><arrow-down /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useAppStore } from '@/main/composables/AppStoreUse';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

const router = useRouter()
  
const {
  removeTab,
  addTab,
  removeAllTab,
  removeOtherTab
} = useAppStore()

// 下拉框事件
const handlerDropDown = {
  closeOther: removeOtherTab,
  closeAll: removeAllTab,
}
const handleCommand = command => {
  handlerDropDown[command]()
}

// 选择标签
const changeTab = tabName => {
  router.push({name: tabName})
}

onBeforeRouteUpdate(route => {
  addTab({
    title: route.meta.title,
    name: route.name,
    closable: true,
  })
})
</script>

<style lang="scss">
.f-tab-list {
  @apply bg-gray-100 flex items-center;
}

.f-tab-list .el-tabs {
  width: calc(100% - 30px);
}

.f-tab-list .el-tabs__header {
  margin: 2px;
}

.f-tab-list .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 0;
}

.f-tab-list .el-tabs--card>.el-tabs__header {
  border: 0;
}

.f-tab-list .el-tabs--card>.el-tabs__header .el-tabs__item {
  border: 0;
  height: 32px;
  line-height: 32px;
  @apply bg-white rounded mx-1;
}

.f-tab-list .el-tabs__nav-next, .el-tabs__nav-prev {
  line-height: 32px;
  .el-icon {
    width: 24px;
    height: 32px;
    line-height: 32px;
    svg {
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      // font-size: 1.5rem;
    }
  }
}

.f-tab-list .el-dropdown {
  width: 30px;
  height: 32px;
  @apply flex justify-center items-center bg-white rounded;
}
</style>