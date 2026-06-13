<template>
  <div>
    <el-button class="btn">
      hello
    </el-button>
    <el-button class="bg-blue-400 text-indigo-200 px-5 mx-10 hover:( bg-blue-800 )">
      hello
    </el-button>
  </div>
</template>

<script setup>

</script>

<style scoped>
.btn {
  @apply bg-blue-400 text-indigo-200 px-5 mx-10 hover:( bg-blue-800 ) transition-all;
}
</style>