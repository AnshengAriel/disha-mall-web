<template>
  <div class="table-rower">
    <el-row
      v-loading="loading"
      :gutter="gutter"
      highlight-current-row
      @current-change="onChangeRow"
      :style="{
        height: tableHeight+'px',
        overflow: 'auto',
      }"
    >
      <el-col :span="span" v-for="item,index in list" :key="index">
        <el-card shadow="never" :body-style="{padding:'0px', overflow:'visible'}">
          <slot :col="item" :index="index"></slot>
        </el-card>
      </el-col>
    </el-row>

    <el-pagination
      v-model:currentPage="pageNumModel"
      :page-size="search.pageSize"
      :total="total" 
      :layout=layout
      background
      class="flex items-center my-2"
      :class="pagerAlignStyle[pagerAlign]"
      @current-change="onChangePage"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const pageNumModel = defineModel({type: Number, default: 1})
const props = defineProps({
  search: {type: Object, default: {pageSize: 10}},
  total: {type: Number, default: 0},
  gutter: {type: Number, default: 20},
  span: {type: Number, default: 6},
  height: {type: Number},
  extraHeight: {type: Number, default: 100},
  fetchList: {type: Function, required: true},
  autoFetch: {type: Boolean, default: true},
  list: {type: Array, default: []},
  activeId: {type: Number},
  layout: {type: String, default: 'total, prev, pager, next, jumper'},
  pagerAlign: {type: String, default: 'right'},
})

const loading = ref(false)

const emit = defineEmits(['change-row'])

const tableHeight = computed(() => 
  props.height ? props.height : (window.innerHeight || document.body.clientHeight) - props.extraHeight  
)

const pagerAlignStyle = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const onChangePage = () => {
  loading.value = true
  props.fetchList().finally(() => {
    loading.value = false
  })
}

// 示例
function example() {
  return {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    extraHeight: 100,
    fetchList: null,
    list: [],
    columns: [
      {
        label: '名称',
        prop: 'name',
        width: 80,
        scoped: 'name'
      }
    ],
  }
}

const onChangeRow = row => {
  if (row) {
    emit('change-row', row)
  }
}

onMounted(() => {
  if (props.autoFetch) {
    onChangePage()
  }
})
</script>

<style lang="scss">
</style>