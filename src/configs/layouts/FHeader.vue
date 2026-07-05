<template>
  <div class="f-header">
    <span class="f-header-left">
      <el-icon :size="20"><ElementPlus /></el-icon>
      <span class="text-xl ml-1">蒂莎编程</span>
    </span>
    <span class="flex justify-between w-full">
      <!-- 收起和刷新 -->
      <span>
        <el-icon class="icon-btn" @click="setMenuCollapse(!$store.state.menu.isCollapse)">
          <Fold v-if="$store.state.menu.isCollapse" style="transform: rotateY(180deg);" />
          <Fold v-else />
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-icon class="icon-btn ml-4" @click="location.reload()"><Refresh /></el-icon>
        </el-tooltip>
      </span>
      <!-- 全屏和视频 -->
      <span class="flex items-center">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-icon class="icon-btn" @click="toggle">
            <Aim v-if="isFullscreen" />
            <FullScreen v-else />
          </el-icon>
        </el-tooltip>
        <el-icon class="icon-btn ml-4 mr-6"><VideoCamera /></el-icon>
        <el-avatar :size="30" :src="getFileUrl($store.state.user.avatar)" />
        <!-- 下拉框 -->
        <el-dropdown class="ml-2 text-light-50" @command="handleCommand">
          <span>
            {{ $store.state.user.name }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </span>
  </div>

  <Drawer v-model="drawer.show" :="drawer">
    <el-form ref="formRef" 
      class="mt-4" 
      :model="form.model" 
      :rules="form.rules" 
      label-position="right"
      :label-width="100"
    >
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input v-model="form.model.oldPassword" type="password" placeholder="请输入旧密码" show-password></el-input>
      </el-form-item>
      <el-form-item class="my-4" prop="password" label="新密码">
        <el-input v-model="form.model.password" type="password" placeholder="请输入新密码" show-password></el-input>
      </el-form-item>
      <el-form-item class="my-4" prop="confirmPassword" label="确认新密码">
        <el-input v-model="form.model.confirmPassword" type="password" placeholder="请确认新密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </Drawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core';
import Drawer from '@/components/Drawer.vue';
import { useAppStore } from '@/main/composables/AppStoreUse';
import { apiFile } from '@/main/api/FileApi';
import { checkPassword, checkSamePassword } from '@/utils/validator.js'
import { useManger } from '@/main/composables/ManagerUse';
import { reactive, ref } from 'vue';

const drawer = reactive({
  show: false,
  title: '',
  submit: () => submitUpdatePassword(form.model,formRef),
  closed: () => formRef.value.resetFields()
})
const formRef = ref()
const form = reactive({
  model: {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  },
  rules: {
    oldPassword: [
      { required: true, message: '请输入密码', trigger: 'blur'},
      { validator: checkSamePassword, trigger: 'blur'},
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur'},
      { validator: checkSamePassword, trigger: 'blur'},
    ],
    confirmPassword: [
      { required: true, message: '请输入密码', trigger: 'blur'},
      { validator: checkPassword, trigger: 'blur'},
    ],
  },
  loading: false
})

const { getFileUrl } = apiFile()
// 收起菜单
const { setMenuCollapse } = useAppStore()
// 全屏
const {
  isFullscreen,
  toggle
} = useFullscreen()

const {
  logout,
  submitUpdatePassword,
} = useManger()

// 点击下拉框
function handleCommand(command) {
  switch (command) {
    case 'updatePassword':
      drawer.show = true
      break
    case 'logout':
      logout()
      break
  }
}
</script>

<style lang="scss">
.f-header {
  height: 60px;
  @apply flex bg-indigo-500 text-light-50 px-5;
}
.f-header .f-header-left {
  width: 300px;
  @apply flex items-center justify-center;
}

.f-header .icon-btn {
  width: 32px;
  height: 60px;
  cursor: pointer;
  @apply px-2;
}
.f-header .icon-btn:hover {
  @apply bg-indigo-400;
}

.f-header .el-dropdown {
  cursor: pointer;
}
</style>