<template>
    <NavigationBar v-if="!$route.meta.hideNav" />
  <router-view></router-view>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  }
}
</script>
