<template>
  <div class="app-admin">
    <el-card shadow="never" :body-style="{ padding: '10px' }">

      <!-- 搜索 -->
      <template #header>
        <div>
          <span>
            <span>名称</span>
            <el-input class="ml-2" v-model="table.search.name" placeholder="请输入名称" clearable style="width: 240px"></el-input>
          </span>
          <el-button class="ml-4" type="primary" size="default" @click="getUserPage">搜索</el-button>
        </div>
      </template>

      <!-- 菜单 -->
      <div class="flex justify-between items-center">
        <el-button type="primary" size="default" @click="showAddUser">新增</el-button>
        <el-button text type="primary" size="default" @click="getUserPage">
          <el-icon :size="18"><Refresh /></el-icon>
        </el-button>
      </div>
      
      <!-- 列表 -->
      <Table class="mt-4" v-model="table.search.pageNum" :="table">
        <template #name="{row, index}">
          <div class="flex items-center">
            <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="getFileUrl(row.avatar)" fit="cover"></el-avatar>
            <div class="ml-2">
              <div class="text-gray-600 text-base">{{ row.name }}</div>
              <small>ID: {{ row.id }}</small>
            </div>
          </div>
        </template>
        <template #status="{row, index}">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @click="submitUserStatus(row)"></el-switch>
        </template>
        <template #op="{row, index}">
          <el-button class="p-0" text type="primary" size="default" @click="showUpdateUser(row)">修改</el-button>
          <el-button class="p-0 ml-4" text type="primary" size="default" @click="showDeleteUser(row)">删除</el-button>
        </template>
      </Table>
    </el-card>
    
    <!-- 编辑 -->
    <Drawer v-model="drawer.show" :="drawer">
      <el-form ref="formRef" :="form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.model.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <div class="h-[200px] w-[200px] cursor-pointer rounded overflow-hidden" @click="showSelectPicture">
            <div v-if="form.model.avatar" class="relative h-full">
              <img class="h-full" :src="getFileUrl(form.model.avatar)" alt="none" />
              <div class="absolute inset-0 bg-black opacity-0 z-10 hover:opacity-60 flex items-center justify-center">
                <el-icon class="text-light-50 hover:text-light-800" :size="24" @click.stop="form.model.avatar=null"><Delete /></el-icon>
              </div>
            </div>
            <div v-else class="h-full flex items-center justify-center rounded bg-gray-100 cursor-pointer hover:bg-gray-200">
              <el-icon :size="18"><Plus /></el-icon>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="所属管理员" prop="role">
          <el-input v-model="form.model.role"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.model.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
    </Drawer>

    <!-- 图片选择 -->
    <Dialog v-model="dialog.show" :="dialog">
      <PictureList ref="pictureRef" selectable></PictureList>
    </Dialog>

  </div>
</template>

<script setup>
import { apiFile } from '@/main/api/FileApi';
import { reactive, ref } from 'vue';
import PictureList from '@/main/views/PictureList.vue';
import { useManger } from '@/main/composables/ManagerUse';

const table = reactive({
  search: {
    pageNum: 1,
    pageSize: 10,
    name: ''
  },
  total: 0,
  extraHeight: 310,
  fetchList: () => getUserPage(),
  list: [],
  pagerAlign: 'right',
  columns: [
    {
      label: '管理员',
      prop: 'name',
      width: 400,
      scoped: 'name'
    },
    {
      label: '所属角色',
      prop: 'roleName',
      minWidth: 200,
    },
    {
      label: '状态',
      prop: 'status',
      minWidth: 100,
      scoped: 'status'
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

const formRef =  ref()
const form = reactive({
  model: {
    name: '',
    password: '',
    avatar: '',
    role: '',
    status: 1,
  },
  rules: {
    name: [{required: true, message: '请输入标题', trigger: 'blur'}],
    password: [{required: true, message: '请输入标题', trigger: 'blur'}],
    role: [{required: true, message: '请输入标题', trigger: 'blur'}],
  },
  labelWidth: 100,
})

const dialog = reactive({
  show: false,
  title: '选择图片',
  width: 1200,
  top: '5vh',
  confirm: () => submitPicture(),
})

const {
  getUserPage,
  submitAddUser,
  submitUpdateUser,
  showDeleteUser,
  submitUserStatus,
} = useManger(table)


const { getFileUrl } = apiFile()

// 新增
const showAddUser = () => {
  drawer.show = true
  drawer.title = '新增管理员'
  drawer.submit = () => submitAddUser(form.model, formRef)
}

// 修改
const showUpdateUser = row => {
  drawer.show = true
  drawer.title = '修改管理员'
  drawer.submit = () => submitUpdateUser(form.model, formRef)
  Object.assign(form.model, row)
  form.model.password = ''
}

// 关闭弹窗后
function onCloseDrawer() {
  formRef.value.resetFields()
}

// 选择图片
const showSelectPicture = () => {
  dialog.show = true
}

const pictureRef = ref()
function submitPicture() {
  form.model.avatar = pictureRef.value.getSelectedPicture()
  dialog.show = false
}

</script>

<style lang="scss">
.app-admin {
  padding: 10px 20px;
  height: calc(100vh - 100px);
  @apply bg-gray-100;
}
</style>