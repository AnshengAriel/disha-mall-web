<template>
  <div class="f-header">
    <span class="f-header-left">
      <el-icon :size="20"><ElementPlus /></el-icon>
      <span class="text-xl ml-1">蒂莎编程</span>
    </span>
    <span class="flex justify-between w-full">
      <span>
        <el-icon class="icon-btn"><Fold /></el-icon>
        <el-icon class="icon-btn ml-4"><Refresh /></el-icon>
      </span>
      <span class="flex items-center">
        <el-icon class="icon-btn"><FullScreen /></el-icon>
        <el-icon class="icon-btn ml-4 mr-6"><VideoCamera /></el-icon>
        <el-avatar :size="30" :src="getFileUri($store.state.user.avatar)" />
        <el-dropdown class="ml-2 text-light-50">
          <span>
            {{ $store.state.user.name }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </span>
  </div>
</template>

<script setup>
import { getFileUri } from '@/composables/file';

</script>

<style lang="scss">
.f-header {
  height: 64px;
  @apply flex bg-indigo-500 text-light-50 px-5;
}
.f-header .f-header-left {
  width: 300px;
  @apply flex items-center justify-center;
}

.f-header .icon-btn {
  width: 32px;
  height: 64px;
  @apply px-2;
}
.f-header .icon-btn:hover {
  @apply bg-indigo-400;
}

.f-header .el-dropdown {
  cursor: pointer;
}
</style>