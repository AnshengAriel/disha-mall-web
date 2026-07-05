<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <span>订单统计</span>
          <div>
            <el-check-tag
              class="ml-2"
              v-for="tag,index in chartsTags" 
              :key="index" 
              :checked="activeTag == tag.value" 
              @click="onClickChartsTag(tag)"
            >{{ tag.title }}</el-check-tag>
          </div>
        </div>
      </template>
      <div ref="chartsRef" id="index-charts" style="width:100%; height:300px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core';
import * as echarts from 'echarts';
import { onMounted, reactive, ref, useTemplateRef } from 'vue';

const activeTag = ref('month')
const chartsTags = reactive([
  {
    title: '近1个月',
    checked: true,
    value: 'month'
  },
  {
    title: '近1周',
    checked: false,
    value: 'week'
  },
  {
    title: '近1天',
    checked: false,
    value: 'day'
  },
])


const option = reactive({
  month: {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 432, 12, 342, 234, 232],
        type: 'bar'
      }
    ]
  },
  week: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  },
  day: {
    xAxis: {
      type: 'category',
      data: ['0', '1', '2', '3', '4', '5', '6', '23']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [122, 120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  },
})

let myChart = null

function onClickChartsTag(tag) {
  activeTag.value = tag.value
  changeCharts()
}

function changeCharts() {
  myChart.showLoading()
  try {
    myChart.setOption(option[activeTag.value]);
  } finally {
    myChart.hideLoading()
  }
}

// 自动缩放
const chartsRef = useTemplateRef('chartsRef')

onMounted(() => {
  const chartsDom = document.getElementById('index-charts')
  if (chartsDom) {
    myChart = echarts.init(chartsDom)
    changeCharts()
    useResizeObserver(chartsRef, entries => {
      myChart.resize()
    })
  }
})
</script>

<style lang="scss">
</style>