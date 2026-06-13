<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['locale'])
const user = cookies.get('user')
</script>

<style lang="scss">
</style>