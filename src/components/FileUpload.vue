<template>
  <div class="file-upload">
    <el-upload
      v-model:file-list="data.fileList"
      :action="fileUploadUri"
      drag
      multiple
      accept=".png, .jpg, .jpeg"
      :headers="data.headers"
    >
      <el-icon class="text-gray-600" :size="40"><upload-filled /></el-icon>
      <div class="text-gray-600">
        拖拽文件到这里，或者<span class="text-blue-400">点击上传</span>
      </div>
      <template #tip>
        <div class="text-gray-500 text-sm">
          jpg/png文件大小最多500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import { apiFile } from '@/main/api/FileApi';
import { useAppCookies } from '@/main/composables/AppCookiesUse';
import { useAppRouter } from '@/configs/router';
import { reactive } from 'vue';

const data = reactive({
  fileList: [],
  headers: {
    Authorization: null
  }
})

const { toLogin } = useAppRouter()
const { getToken } = useAppCookies()
const { fileUploadUri } = apiFile()

const token = getToken()
if (token) {
  data.headers.Authorization = 'bearer ' + token
}else {
  toLogin()
}

const getFileList = () => {
 return data.fileList.map(file => {
  return {
    name: file.name,
    path: file.response.data
  }
 })
}

const resetList = () => {
  data.fileList.length = 0
}

defineExpose({
  getFileList,
  resetList,
})

</script>

<style lang="scss">
</style>