<template>
  <el-result
    icon="warning"
    title="404提示"
    sub-title="你的页面走丢了~"
    class="my-24">
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup>
</script>

<style lang="scss">
</style>