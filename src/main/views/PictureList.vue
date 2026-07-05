<template>
  <el-container class="picture-list">
    
    <!-- 侧边栏分类列表 -->
    <el-aside width="300px" class="px-4">
      <Table v-model="table.search.pageNum" v-bind="table" @change-row="onChangeCategory">
        <template #op="{row, index}">
          <el-button text type="primary" @click.stop="showUpdateDrawer(row)" class="p-0">
            <el-icon class="hover:text-blue-600" :size="16"><Edit /></el-icon>
          </el-button>
          <el-button text type="primary" @click.stop="showDeletePictureCategory(row)" class="p-0">
            <el-icon class="hover:text-blue-600" :size="16"><Close /></el-icon>
          </el-button>
        </template>
      </Table>

    </el-aside>

    <!-- 主栏图片列表 -->
    <el-main class="py-0 px-5">
      <TableRower v-model="pictureTable.search.pageNum" v-bind="pictureTable">
        <template #="{col, index}">
          <div class="relative h-[150px]">
            <el-image 
              :src="getFileUrl(col.path)" 
              fit="cover"
              :preview-src-list="[getFileUrl(col.path)]"
              :initial-index="0"
              class="h-[150px]"
            ></el-image>
            <span class="picture-title">{{ col.name }}</span>
          </div>
          <div class="flex justify-around items-center">
            <el-checkbox v-if="selectable" v-model="col.checked" size="large" @change="onChangePicture(col)" />
            <el-button text type="primary" :dark="true" @click="showUpdatePicture(col)">重命名</el-button>
            <el-button text type="primary" :dark="true" @click="showDeletePicture(col)">删除</el-button>
          </div>
        </template>
      </TableRower>
    </el-main>
  </el-container>

  <!-- 图片分类表单 -->
  <Drawer v-model="drawer.show" :="drawer">
    <el-form ref="categoryFormRef" :="categoryForm">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="categoryForm.model.name"></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="weight">
        <el-input-number v-model="categoryForm.model.weight" :min="0" />
      </el-form-item>
    </el-form>
  </Drawer>

  <!-- 上传图片 -->
  <Drawer v-model="fileUploadDrawer.show" :="fileUploadDrawer">
    <FileUpload ref="fileUploadRef"></FileUpload>
  </Drawer>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { apiFile } from '@/main/api/FileApi';
import { usePicture, usePictureCategory } from '../composables/PictureUse';

const props = defineProps({
  selectable: {type: Boolean, default: false},
})
const table = reactive({
  search: {
    pageNum: 1,
    pageSize: 10,
  },
  total: 0,
  extraHeight: 230,
  fetchList: () => getPictureCategoryPage(),
  list: [],
  activeId: 0,
  showHeader: false,
  showPointer: true,
  layout: 'prev, next',
  pagerAlign: 'center',
  columns: [
    {
      label: '名称',
      prop: 'name',
      width: 160,
    },
    {
      label: '操作',
      prop: 'op',
      width: 100,
      scoped: 'op'
    },
  ],
})

const pictureTable = reactive({
  search: {
    pageNum: 1,
    pageSize: 10,
    categoryId: null, 
  },
  list: [],
  fetchList: () => getPicturePage,
  autoFetch: false,
  total: 0,
  extraHeight: 230,
  pagerAlign: 'center',
})

const drawer = reactive({
  show: false,
  title: '',
  submit: null,
  closed: onCloseDrawer,
})

const categoryForm = reactive({
  model: {
    name: '',
    weight: 0,
  },
  rules: {
    name: [{required: true, message: '请输入分类名称', trigger: 'blur'}],
  },
  labelWidth: 100,
})

const fileUploadDrawer = reactive({
  show: false,
  title: '上传文件',
  submit: null,
  closed: null,
})

const { getFileUrl } = apiFile()

const {
  submitAddPictureCategory,
  submitUpdatePictureCategory,
  showDeletePictureCategory,
  getPictureCategoryPage,
} = usePictureCategory(table)

const {
  getPicturePage,
  submitAddPicture,
  showUpdatePicture,
  showDeletePicture,
  onChangePicture,
  getSelectedPicture,
} = usePicture(pictureTable)

const categoryFormRef =  ref()

// 新增分类
function showAddDrawer() {
  drawer.show = true
  drawer.title = '新增图片分类'
  drawer.submit = () => submitAddPictureCategory(categoryForm.model, categoryFormRef)
}

// 修改分类
function showUpdateDrawer(row) {
  drawer.show = true
  drawer.title = '编辑图片分类'
  drawer.submit = () => submitUpdatePictureCategory(categoryForm.model, categoryFormRef)
  Object.assign(categoryForm.model, row)
}

// 活跃分类ID
const onChangeCategory = row => {
  table.activeId = row.id
  pictureTable.search.categoryId = row.id
  getPicturePage()
}

// 关闭弹窗后
function onCloseDrawer() {
  categoryFormRef.value.resetFields()
}


const fileUploadRef = ref()
// 新增图片
function showUploadPicture() {
  fileUploadDrawer.show = true
  fileUploadDrawer.submit = () => submitAddPicture(fileUploadRef)
}

defineExpose({
  showAddDrawer,
  showUploadPicture,
  getSelectedPicture
})
</script>

<style lang="scss">
.picture-list .picture-title {
  position: absolute;
  left: -1px; // 覆盖卡片边框
  right: -1px;
  bottom: 0;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>