<template>
  <div class="">
    <el-row>
      <el-col :xs="0" :sm="12" :md="16">
        <div class="bg-blue-400 min-h-screen flex items-center justify-start pl-24">
          <div class="flex flex-col">
            <h1 class="text-5xl text-light-400 my-4">欢迎光临</h1>
            <span class="text-light-400">此站点是蒂莎商城的演示地址</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50">
          <span class="text-3xl text-black">欢迎回来</span>
          <span class="text-gray-400 mt-2">账号密码登录</span>
          <el-form ref="formRef" class="mt-4" :model="form.model" :rules="form.rules" style="width: 300px;">
            <el-form-item prop="name">
              <el-input v-model="form.model.name" type="text" placeholder="请输入名称">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="my-4" prop="password">
              <el-input v-model="form.model.password" type="password" placeholder="请输入密码" show-password>
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="w-full" round color="#60a5fa" @click="submitLogin" :loading="form.loading">
                <span class="text-light-50">登录</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { login } from '@/api/manager'
import { useRouter } from 'vue-router'
import { successMsg, errorMsg } from "@/composables/notification";
import { setToken } from '@/composables/auth';
import { setUser } from '@/composables/store';

const router = useRouter()
const form = reactive({
  model: {
    name: '张三',
    password: '123456',
  },
  rules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur'}],
    password: [{ required: true, message: '请输入密码', trigger: 'blur'}],
  },
  loading: false
})

const formRef = ref(null)
const submitLogin = () => {
  formRef.value.validate(valid => {
    if (valid) {
      form.loading = true
      login(form.model)
        .then(d => {
          setToken(d.token)
          setUser(d)
          successMsg('登录成功')
          router.push('/')
        }).catch(e => {
          console.error('登录失败: ', e)
          errorMsg('账号或密码错误')
        }).finally(() => {
          form.loading = false
        })
    }
  })
}
</script>

<style lang="scss">

</style>