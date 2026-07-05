<template>
  <div class="drawer">
    <el-drawer
      v-model="showModel"
      :title="title"
      :size="size"
      :direction="direction"
      :close-on-click-modal="false"
      :destroy-on-close="destroyOnClose"
      :before-close="handleClose"
      @closed="closed"
    >
      <div class="drawer-body">
        <slot></slot>
      </div>
      <template #footer>
        <el-button type="primary"  @click="handleSubmit" :loading="loading">
          <span class="text-light-50">{{ confirmText }}</span>
        </el-button>
        <el-button type="default" @click="cancelSubmit">{{ cancelText }}</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { useAppMessage } from '@/main/composables/AppMessageUse'
import { ref } from 'vue'

const showModel = defineModel({type: Boolean, default: false})
const props = defineProps({
  show: Boolean,
  title: String,
  size: {type: String, default: '30%'},
  direction: {type: String, default: 'rtl'},
  destroyOnClose: {type: Boolean, default: false},
  confirmOnClose: {type: Boolean, default: false},
  showLoading: {type: Boolean, default: true},
  autoClose: {type: Boolean, default: true},
  confirmText: {type: String, default: '提交'},
  cancelText: {type: String, default: '取消'},
  submit: Function,
  closed: Function,
})

const loading = ref(false)

const { confirm } = useAppMessage()

// 点击右上角退出时
function handleClose(done) {
  if (props.confirmOnClose) {
    confirm('关闭此窗口将导致当前页面数据丢失，你确定吗？', () => done(false))
  }else {
    done(false)
  }
}

// 点击取消时
const cancelSubmit = () => {
  if (props.confirmOnClose) {
    confirm('关闭此窗口将导致当前页面数据丢失，你确定吗？', () => showModel.value = false)
  }else {
    showModel.value = false
  }
}

const handleSubmit = () => {
  if (props.showLoading) {
    loading.value = true
  }
  (props.submit() || Promise.resolve()).then(() => {
    if (props.autoClose) {
      showModel.value = false
    }
  }).catch(e => console.log(e)).finally(() => {
    loading.value = false
  })
}
</script>

<style lang="scss">
.drawer .drawer-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>