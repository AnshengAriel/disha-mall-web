<template>
  <div class="index">
    <el-skeleton
      :loading="loading"
      animated
      :count="1"
    >
      <template #template>
        <el-row :gutter="20">
          <el-col :span="6" v-for="index in 4" :key="index">
            <el-card shadow="never">
              <template #header>
                <div class="flex justify-between items-center h-12">
                  <el-skeleton-item variant="text" style="width:30%;"/>
                  <el-skeleton-item variant="text" style="width:15%;"/>
                </div>
              </template>
              <div class="h-10" >
                <el-skeleton-item variant="text" style="width:20%;" />
              </div>
              <el-divider></el-divider>
              <div class="flex justify-between items-center h-5">
                <el-skeleton-item variant="text" style="width:40%;" />
                <el-skeleton-item variant="text" style="width:10%;" />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <template #default>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(stat, index) in stats" :key="index">
            <el-card shadow="never">
              <template #header>
                <div class="flex justify-between items-center h-12">
                  <span class="font-medium">{{ stat.title }}</span>
                  <el-tag :type="stat.tagType" size="small" effect="plain">{{ stat.tag }}</el-tag>
                </div>
              </template>
              <div class="text-gray-500 text-3xl font-bold h-10">
                <CountTo :num="stat.count"></CountTo>
              </div>
              <el-divider></el-divider>
              <div class="flex justify-between items-center h-5">
                <span>{{ stat.totalTitle }}</span>
                <span>{{ stat.totalCount }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  
    <el-row class="mt-4" :gutter="20">
      <el-col :span="3" :offset="0" v-for="menu,index in menus" :key="index">
        <el-card shadow="hover" :body-style="{padding:'20px'}">
          <div class="flex flex-col justify-center items-center cursor-pointer h-15" @click="$router.push({name:menu.name})">
            <el-icon :class="menu.iconColor" :size="24"><component :is="menu.icon"></component></el-icon>
            <span class="mt-2">{{ menu.title }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    

    <el-row class="mt-4" :gutter="20">
      <el-col v-permission="['/order/stats,POST']" :span="12" :offset="0">
        <IndexCharts></IndexCharts>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexTradeStats></IndexTradeStats>
      </el-col>
    </el-row>
    
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import CountTo from '@/components/CountTo.vue';
import { useAppRouter } from '@/configs/router';
import IndexCharts from '@/components/IndexCharts.vue';
import IndexTradeStats from '@/components/IndexTradeStats.vue';

const stats = reactive([
  {
    title: '支付订单',
    tag: '年',
    tagType: 'success',
    count: 49,
    totalTitle: '总支付订单',
    totalCount: 49,
  },
  {
    title: '订单量',
    tag: '周',
    tagType: 'primary',
    count: 555,
    totalTitle: '转化率',
    totalCount: '60%',
  },
  {
    title: '销售额',
    tag: '年',
    tagType: 'warning',
    count: 4,
    totalTitle: '总销售额',
    totalCount: 3.54,
  },
  {
    title: '新增用户',
    tag: '年',
    tagType: 'danger',
    count: 17,
    totalTitle: '总用户',
    totalCount: 17,
  },
])

const {
  useryManage, goodesManage, orderManage, commentManage, picutureManage, noticeManage, systemSettings, couponsManage
} = useAppRouter().getRouteNames()

const menus = [
  {
    title: '用户',
    name: useryManage,
    icon: 'User',
    iconColor: 'text-cyan-400',
  },
  {
    title: '商品',
    name: goodesManage,
    icon: 'ShoppingCart',
    iconColor: 'text-fuchsia-400',
  },
  {
    title: '订单',
    name: orderManage,
    icon: 'Tickets',
    iconColor: 'text-fuchsia-600',
  },
  {
    title: '评价',
    name: commentManage,
    icon: 'Comment',
    iconColor: 'text-green-400',
  },
  {
    title: '图库',
    name: picutureManage,
    icon: 'Picture',
    iconColor: 'text-pink-400',
  },
  {
    title: '公告',
    name: noticeManage,
    icon: 'Bell',
    iconColor: 'text-green-400',
  },
  {
    title: '配置',
    name: systemSettings,
    icon: 'SetUp',
    iconColor: 'text-gray-600',
  },
  {
    title: '优惠券',
    name: couponsManage,
    icon: 'Postcard',
    iconColor: 'text-yellow-400',
  },
]

const loading = ref(true)

loading.value = false

</script>

<style lang="scss">
.index {
  padding: 10px 20px 0 20px;
  height: calc(100vh - 110px);
  @apply bg-gray-100;
}
.index .el-card,
.index .el-card__header {
  border: 0;
}
</style>