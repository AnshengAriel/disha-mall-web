<template>
  <div class="app-table">
    <el-table
      v-loading="loading"
      :data="list" 
      :height="tableHeight" 
      :show-header="showHeader" 
      highlight-current-row
      row-key="id"
      :current-row-key="activeId"
      @current-change="onChangeRow"
      :row-style="{cursor: showPointer?'pointer':'auto'}"
    >
      <template v-for="column in columns">
        <el-table-column v-if="column.scoped" :label="column.label" :prop="column.prop" :width="column.width" :min-width="column.minWidth">
          <template #default="scope">
            <slot :name="column.scoped" :row="scope.row" :index="scope.$index"></slot>
          </template>
        </el-table-column>

        <el-table-column v-else :label="column.label" :prop="column.prop" :width="column.width"></el-table-column>
      </template>

    </el-table>

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
import { computed, onMounted, ref, watch } from 'vue';

const pageNumModel = defineModel({type: Number, default: 1})
const props = defineProps({
  search: {type: Object, default: {pageSize: 10}},
  total: {type: Number, default: 0},
  height: {type: Number},
  extraHeight: {type: Number, default: 100},
  fetchList: {type: Function, required: true},
  autoFetch: {type: Boolean, default: true},
  list: {type: Array, default: []},
  columns: {type: Array, required: true},
  activeId: {type: Number},
  showHeader: {type: Boolean, default: true},
  showPointer: {type: Boolean, default: false},
  layout: {type: String, default: 'total, prev, pager, next, jumper'},
  pagerAlign: {type: String, default: 'right'},
})

const loading = ref(false)

const emits = defineEmits(['change-row'])

const tableHeight = computed(() => 
  props.height ? props.height : (window.innerHeight || document.body.clientHeight) - props.extraHeight  
)

const pagerAlignStyle = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const onChangeRow = row => {
  if (row) {
    emits('change-row', row)
  }
}

const onChangePage = () => {
  loading.value = true
  props.fetchList().finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  if (props.autoFetch) {
    onChangePage()
  }
})
</script>

<style lang="scss">
</style>