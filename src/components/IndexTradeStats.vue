<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-medium">店铺及商品提示</span>
          <el-tag type="warning" size="small" effect="plain">店铺及商品提示</el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item,index in goodsStats" :key="index">
          <div class="flex flex-col items-center justify-center h-30 bg-gray-50 rounded">
            <span class="text-2xl">{{ item.count }}</span>
            <span class="text-gray-500 mt-2">{{ item.title }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mt-4" shadow="never" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-medium">交易提示</span>
          <el-tag type="warning" size="small" effect="plain">需要立即处理的交易订单</el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item,index in orderStats" :key="index">
          <div class="flex flex-col items-center justify-center h-30 bg-gray-50 rounded">
            <span class="text-2xl">{{ item.count }}</span>
            <span class="text-gray-500 mt-2">{{ item.title }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';


const goodsStats = reactive([
  {
    title: '审核中',
    count: 0
  },
  {
    title: '销售中',
    count: 9
  },
  {
    title: '已下架',
    count: 0
  },
  {
    title: '库存预警',
    count: 0
  },
])

const orderStats = reactive([
  {
    title: '待付款',
    count: 3
  },
  {
    title: '待发货',
    count: 14
  },
  {
    title: '已发货',
    count: 1
  },
  {
    title: '退款中',
    count: 117
  },
])
</script>

<style lang="scss">
</style>