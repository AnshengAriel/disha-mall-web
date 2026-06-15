<template>
  <el-button type="primary" @click="user=getUser()">刷新</el-button>
  <el-button type="primary" @click="logout">注销</el-button>
  <div>
    {{ user }}
  </div>
</template>

<script setup>
import { removeToken } from '@/composables/auth';
import { confirm } from '@/composables/message';
import { setStateInSessionStorage } from '@/composables/session';
import { getUser, setUser } from '@/composables/store';
import { toLogin } from '@/router';

const user = getUser()

// 注销
const logout = () => {
  confirm('确定要退出登录吗？', () => {
    removeToken()
    setUser()
    setStateInSessionStorage()
    toLogin()
  })
}

</script>

<style lang="scss">
</style>