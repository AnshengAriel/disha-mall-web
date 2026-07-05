<template>
  <div class="app-form">
    <el-form ref="formRef" :model="model" :rules="rules" :label-width="labelWidth">
      <slot></slot>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  model: Object,
  rules: Object,
  labelWidth: String
})

const formRef = ref()

</script>

<style lang="scss">
</style>