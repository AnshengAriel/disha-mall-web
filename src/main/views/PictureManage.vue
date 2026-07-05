<template>
  <div class="image-manage">
    <el-container class="bg-white pt-4">
      <el-header height="40px">
        <el-button type="primary" size="default" @click="pictureListRef.showAddDrawer()">新增图片分类</el-button>
        <el-button type="warning" size="default" @click="pictureListRef.showUploadPicture()">上传图片</el-button>
      </el-header>
      
      <PictureList ref="pictureListRef"></PictureList>

    </el-container>
  
  </div>
</template>

<script setup>
import PictureList from '@/main/views/PictureList.vue';
import { reactive, ref } from 'vue';

const pictureListRef = ref()

</script>

<style lang="scss">
.image-manage {
  padding: 10px 20px;
  height: calc(100vh - 100px);
  @apply bg-gray-100;
}
</style>