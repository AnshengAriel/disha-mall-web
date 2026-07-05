<template>
  <div class="notice">
    <el-card shadow="never" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <el-button type="primary" @click="showAddNotice">新增</el-button>
          <el-button text type="primary" @click="getNoticePage">
            <el-icon :size="18"><Refresh /></el-icon>
          </el-button>
        </div>
      </template>
      <Table v-model="table.search.pageNum" :="table">
        <template #createTime="{row, index}">
          {{ getDateStr(row.createTime) }}
        </template>
        <template #op="{row, index}">
          <el-button class="p-0" text type="primary" size="default" @click="showUpdateNotice(row)">修改</el-button>
          <el-button class="p-0 ml-4" text type="primary" size="default" @click="showDeleteNotice(row)">删除</el-button>
        </template>
      </Table>
    </el-card>
    
    <!-- 表单 -->
    <Drawer v-model="drawer.show" :="drawer">
      <el-form ref="formRef" :="form">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.model.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input 
            v-model="form.model.content" 
            type="textarea" 
            :autosize="{ minRows: 4, maxRows: 10 }"
            maxlength="150"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
    </Drawer>
    
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getDateStr } from '@/utils/datetime.js'
import { useNotice } from '../composables/NoticeUse';

const table = reactive({
  search: {
    pageNum: 1,
    pageSize: 10,
  },
  total: 0,
  extraHeight: 260,
  fetchList: () => getNoticePage(),
  list: [],
  pagerAlign: 'center',
  columns: [
    {
      label: '公告标题',
      prop: 'title',
      width: 600,
    },
    {
      label: '发布时间',
      prop: 'createTime',
      width: 300,
      scoped: 'createTime'
    },
    {
      label: '操作',
      prop: 'op',
      width: 180,
      scoped: 'op'
    },
  ],
})

const drawer = reactive({
  show: false,
  title: '',
  submit: null,
  closed: onCloseDrawer,
})

const form = reactive({
  model: {
    title: '',
    content: '',
  },
  rules: {
    title: [{required: true, message: '请输入标题', trigger: 'blur'}],
  },
  labelWidth: 100,
})

const {
  getNoticePage,
  submitAddNotice,
  submitUpdateNotice,
  showDeleteNotice,
} = useNotice(table)

const formRef =  ref()

const showAddNotice = () => {
  drawer.show = true
  drawer.title = '新增公告'
  drawer.submit = () => submitAddNotice(form.model, formRef)
}

const showUpdateNotice = row => {
  drawer.show = true
  drawer.title = '编辑公告'
  drawer.submit = () => submitUpdateNotice(form.model, formRef)
  Object.assign(form.model, row)
}

// 关闭弹窗后
function onCloseDrawer() {
  formRef.value.resetFields()
}

</script>

<style lang="scss">
.notice {
  padding: 10px 20px;
  height: calc(100vh - 100px);
  @apply bg-gray-100;
}
</style>