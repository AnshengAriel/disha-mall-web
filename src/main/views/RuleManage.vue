<template>
  <div class="rule-manage">
    <el-card shadow="never" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <el-button type="primary" @click="showAddRule">新增</el-button>
          <el-button text type="primary" @click="getRuleList">
            <el-icon :size="18"><Refresh /></el-icon>
          </el-button>
        </div>
      </template>

      <el-tree ref="treeRef" v-bind="tree">
        <template #default="{ node, data }">
          <div class="w-full flex justify-between items-center">
            <div class="flex items-center font-medium">
              <template v-if="ruleIsMenu(data.type)">
                <el-tag type="primary">菜单</el-tag>
                <el-icon :size="16" :style="{'margin-left':'10px'}"><component :is="data.icon"></component></el-icon>
              </template>
              <el-tag v-else type="danger" style="margin-right:0.5rem;">权限</el-tag>
              <span>{{ data.name }}</span>
              <el-tag v-show="!ruleIsMenu(data.type)" class="ml-2" type="success">{{ data.content }},{{ data.method }}</el-tag>
            </div>
            <div class="w-[300px]">
              <el-switch v-model="data.status" :active-value="1" :inactive-value="0" @change="updateRuleModel(data)"></el-switch>
              <el-button class="ml-2" type="primary" link @click.stop="showUpdateRule(data)">修改</el-button>
              <el-button v-if="ruleIsMenu(data.type)" class="ml-2" type="primary" link @click.stop="showAddRule(data.id)">增加</el-button>
              <el-button class="ml-2" type="primary" link @click.stop="showDeleteRule(data)">删除</el-button>
            </div>
          </div>
        </template>
      </el-tree>
    
    </el-card>
    
    <!-- 表单 -->
    <Drawer v-model="drawer.show" :="drawer">
      <el-form ref="formRef" :="form" style="width:320px">
        <el-form-item label="上级菜单" prop="pid">
          <el-cascader v-model="form.model.pid" v-bind="cascader">
            <template #default="{ node, data }">
              <div class="flex items-center">
                <el-icon :size="16"><component :is="data.icon"></component></el-icon>
                <span>{{ data.name }}</span>
              </div>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜单/权限" prop="type">
          <el-radio-group v-model="form.model.type">
            <el-radio :value="1" border>菜单</el-radio>
            <el-radio :value="2" border>权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.model.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item v-show="isMenu" label="菜单图标" prop="icon">
          <div class="flex items-center">
            <el-icon v-if="form.model.icon" :size="16"><component :is="form.model.icon"></component></el-icon>
            <el-select v-model="form.model.icon" placeholder="请选择图标" filterable style="width:194px;margin-left:10px;">
              <el-option v-for="item in icons" :key="item.name" :value="item.name">
                <div class="flex items-center justify-between">
                  <el-icon :size="16"><component :is="item.name"></component></el-icon>
                  <span class="ml-2">{{ item.label }}</span>
                </div>
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item v-show="!isMenu" label="后端规则" prop="content">
          <el-input v-model="form.model.content" placeholder="请输入规则" />
        </el-form-item>
        <el-form-item v-show="!isMenu" label="方法" prop="method">
          <el-select v-model="form.model.method" placeholder="请选择方法">
            <el-option v-for="item in ['POST','PUT','GET','DELETE']" :key="item" :value="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="weight">
          <el-input-number v-model="form.model.weight" :min="0"/>
        </el-form-item>
      </el-form>
    </Drawer>
    
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRule } from '@/main/composables/RuleUse';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const tree = reactive({
  data: [],
  pid: null,
  nodeKey: 'id',
  emptyText: '空',
  props: {
    label: 'name',
    children: 'children',
  },
  highlightCurrent: true,
  checkOnClickNode: true,
  defaultExpandedKeys: [],
})

const drawer = reactive({
  show: false,
  title: '',
  submit: null,
  closed: onCloseDrawer,
})

const form = reactive({
  model: {
    pid: null,
    name: '',
    type: 1,
    weight: 0,
    content: '',
    method: 'POST',
    icon: '',
  },
  rules: {
    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
    type: [{required: true, message: '请输入类型', trigger: 'blur'}],
  },
  labelWidth: 100,
})

const isMenu = computed(() => ruleIsMenu(form.model.type))

// 上级菜单
const cascader = reactive({
  options: [],
  props: {
    expandTrigger: true, 
    emitPath: false, 
    value: 'id', 
    label: 'name',
    checkStrictly: true,
  },
  placeholder: "请选择菜单",
})

// 图标集合
const icons = []
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  icons.push({
    label: key,
    name: key
  })
}

const {
  getRuleList,
  getRuleMenuList,
  submitAddRule,
  submitUpdateRule,
  updateRuleModel,
  showDeleteRule,
  ruleIsMenu,
} = useRule(tree, cascader)

const formRef =  ref()

const showAddRule = id => {
  drawer.show = true
  drawer.title = '新增权限'
  drawer.submit = () => submitAddRule(form.model, formRef)
  form.model.id = null
  getRuleMenuList()
  if (id) {
    form.model.pid = id
    tree.pid = id
  }
}

const showUpdateRule = row => {
  drawer.show = true
  drawer.title = '编辑权限'
  drawer.submit = () => submitUpdateRule(form.model, formRef)
  Object.assign(form.model, row)
  tree.pid = row.pid
  getRuleMenuList([form.model.id])
}

// 关闭弹窗后
function onCloseDrawer() {
  formRef.value.resetFields()
}

onMounted(() => {
  getRuleList()
})
</script>

<style lang="scss">
.rule-manage {
  padding: 10px 20px;
  height: calc(100vh - 100px);
  @apply bg-gray-100;
}

.rule-manage .el-tree-node__content {
  height: 32px;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>