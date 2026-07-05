<template>
  <div class="app-dialog">
    <el-dialog
      v-model="showModel"
      :title="title"
      :width="width"
      :top="top"
      :before-close="handleClose"
    >
      <slot></slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="default" @click="handleCancel">
            <span>取消</span>
          </el-button>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            <span>确定</span>
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModel = defineModel({type: Boolean, default: false})
const props = defineProps({
  show: Boolean,
  title: {type: String, default: ''},
  width: {type: Number, default: 400},
  top: {type: String, default: '15vh'},
  confirmOnClose: {type: Boolean, default: false},
  showLoading: {type: Boolean, default: true},
  autoClose: {type: Boolean, default: true},
  cancel: {type: Function},
  confirm: {type: Function},
})
const loading = ref(false)
const emits = defineEmits(['update:show'])

// 点击取消时
const handleCancel = () => {
  if (props.confirmOnClose) {
    confirm('关闭此窗口将导致当前页面数据丢失，你确定吗？', () => showModel.value = false)
  }else {
    showModel.value = false
  }
}


// 点击右上角退出时
function handleClose(done) {
  if (props.confirmOnClose) {
    confirm('关闭此窗口将导致当前页面数据丢失，你确定吗？', () => done(false))
  }else {
    done(false)
  }
}

const handleSubmit = () => {
  if (props.showLoading) {
    loading.value = true
  }
  (props.confirm() || Promise.resolve()).then(() => {
    if (props.autoClose) {
      showModel.value = false
    }
  }).catch(e => console.log(e)).finally(() => {
    loading.value = false
  })
}

</script>

<style lang="scss">
</style>