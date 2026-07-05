<template>
  <div class="image-upload">
    <el-upload
      :action="fileUploadUri"
      accept=".png, .jpg, .jpeg"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove"
    >
      <div v-if="imageUrl" class="img-wrap" :style="{width: width+'px', height:height+'px'}">
        <img :src="getFileUrl(imageUrl)" class="avatar" />
        <div class="overlay">
          <el-icon class="delete-icon" :size="18" @click.stop="handleRemove"><Delete /></el-icon>
        </div>
      </div>
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script setup>
import { apiFile } from '@/main/api/FileApi';
import { useAppCookies } from '@/main/composables/AppCookiesUse';
import { useAppRouter } from '@/configs/router';
import { reactive } from 'vue';

const imageUrl = defineModel({type: String})
const props = defineProps({
  width: {type: Number, default: 200},
  height: {type: Number, default: 200},
})
const headers = reactive({
  Authorization: null
})

const { toLogin } = useAppRouter()
const {
  getFileUrl,
  fileUploadUri,
} = apiFile()

const token = useAppCookies().getToken()
if (token) {
  headers.Authorization = 'bearer ' + token
}else {
  toLogin()
}

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = response.data
}

const handleRemove = file => {
  imageUrl.value = null
}
</script>

<style lang="scss">
.image-upload .avatar-uploader-icon {
  width: 200px;
  height: 200px;
  border: 1px dashed rgba(103, 92, 92, 0.5);
  border-radius: 8px;
  @apply flex justify-center items-center;
}
.image-upload .avatar-uploader-icon:hover {
  border: 1px solid rgb(12, 63, 215);
}

.image-upload .img-wrap {
  height: 200px;
  position: relative;
}

.image-upload .img-wrap img {
  height: 200px;
}

.image-upload .img-wrap .overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  @apply flex justify-center items-center;
}

.image-upload .img-wrap .overlay:hover {
  background-color: rgba(0, 0, 0, 0.5);
  .delete-icon {
    opacity: 1;
  }
}

.image-upload .img-wrap .overlay .delete-icon {
  @apply text-light-50 opacity-0;
}
.image-upload .img-wrap .overlay .delete-icon:hover {
  @apply text-light-800;
}
</style>