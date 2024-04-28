<template>
  <div>
    <MainView />
    <FooterView />
  </div>
</template>

<script>
import MainView from '@/components/MainView.vue'
import FooterView from '@/components/common/FooterView.vue'

export default {
  name: 'App',
  components: {
    MainView,
    FooterView
  }
}
</script>

<style>
  #app {

  }
</style>
