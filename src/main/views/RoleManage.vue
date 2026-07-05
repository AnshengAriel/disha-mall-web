<template>
  <div class="role-manage">
    <el-card shadow="never" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <el-button type="primary" @click="showAddRole">新增</el-button>
          <el-button text type="primary" @click="getRolePage">
            <el-icon :size="18"><Refresh /></el-icon>
          </el-button>
        </div>
      </template>
      <Table v-model="table.search.pageNum" :="table">
        <template #status="{row, index}">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @click="updateRoleModel(row)"></el-switch>
        </template>
        <template #op="{row, index}">
          <el-button class="p-0" link type="primary" size="default" @click="showUpdateRule(row)">配置权限</el-button>
          <el-button class="p-0 ml-4" link type="primary" size="default" @click="showUpdateRole(row)">修改</el-button>
          <el-button class="p-0 ml-4" link type="primary" size="default" @click="showDeleteRole(row)">删除</el-button>
        </template>
      </Table>
    </el-card>
    
    <!-- 表单 -->
    <Drawer v-model="drawer.show" :="drawer">
      <el-form ref="formRef" :="form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.model.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="form.model.desc"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-switch v-model="form.model.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
    </Drawer>

    <!-- 配置权限 -->
    <Drawer v-model="treeDrawer.show" :="treeDrawer">
      <el-tree-v2 ref="treeRef" v-bind="tree">
        <template #default="{ node, data }">
          <div class="flex items-center font-medium">
            <template v-if="ruleIsMenu(data.type)">
              <el-tag type="primary">菜单</el-tag>
              <el-icon :size="16" :style="{'margin-left':'10px'}"><component :is="data.icon"></component></el-icon>
            </template>
            <el-tag v-else type="danger" style="margin-right:0.5rem;">权限</el-tag>
            <span>{{ data.name }}</span>
          </div>
        </template>
      </el-tree-v2>
    </Drawer>
    
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRole } from '@/main/composables/RoleUse';
import { useRule } from '../composables/RuleUse';

const table = reactive({
  search: {
    pageNum: 1,
    pageSize: 10,
  },
  total: 0,
  extraHeight: 260,
  fetchList: () => getRolePage(),
  list: [],
  pagerAlign: 'center',
  columns: [
    {
      label: '角色名称',
      prop: 'name',
      minWidth: 200,
    },
    {
      label: '角色描述',
      prop: 'desc',
      width: 500,
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
      minWidth: 100,
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
    name: '',
    desc: '',
    status: 1,
  },
  rules: {
    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
  },
  labelWidth: 100,
})

const treeDrawer = reactive({
  show: false,
  title: '',
  submit: null,
  closed: onCloseTreeDrawer,
})

const tree = reactive({
  data: [],
  props: {
    value: 'id',
    label: 'name',
    children: 'children',
  },
  showCheckbox: true,
  height: window.innerHeight - 180,
  itemSize: 32,
  defaultExpandedKeys: []
})

const {
  getRolePage,
  submitAddRole,
  submitUpdateRole,
  showDeleteRole,
  updateRoleModel,
  updateRoleRuleModel,
  getRoleRuleList,
} = useRole(table)

const {
  getRuleList,
  ruleIsMenu,
} = useRule(tree)

const formRef =  ref()
const treeRef = ref()

const showAddRole = () => {
  drawer.show = true
  drawer.title = '新增角色'
  drawer.submit = () => submitAddRole(form.model, formRef)
}

const showUpdateRole = row => {
  drawer.show = true
  drawer.title = '编辑角色'
  drawer.submit = () => submitUpdateRole(form.model, formRef)
  Object.assign(form.model, row)
}

const showUpdateRule = row => {
  treeDrawer.show = true
  treeDrawer.title = '配置权限'
  treeDrawer.submit = () => updateRoleRuleModel(row, treeRef.value.getCheckedKeys())
  getRuleList().then(() => {
    getRoleRuleList(row)
      .then(d => treeRef.value.setCheckedKeys(d))
  })
}

// 关闭弹窗后
function onCloseDrawer() {
  formRef.value.resetFields()
}
function onCloseTreeDrawer() {
  tree.data = []
}

</script>

<style lang="scss">
.role-manage {
  padding: 10px 20px;
  height: calc(100vh - 100px);
  @apply bg-gray-100;
}

</style>