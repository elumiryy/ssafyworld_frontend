<template>
  <div>
    
    <!-- router 설정 -->
    <router-view></router-view>

    <!-- Footer -->
    <div class="setting-footer">
      <FooterView />
    </div>

  </div>
</template>

<script>
import FooterView from '@/components/common/FooterView.vue'

export default {
  name: 'App',
  components: {
    FooterView
  }
}
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }

  .setting-footer {
    width: 100%;
    /* 하단에 고정 */
    position: absolute;
    bottom: 0;
  }
  
</style>
