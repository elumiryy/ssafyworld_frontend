<template>
  <div>
    
    <!-- router 설정 -->
    <router-view></router-view>

    <!-- Footer -->
    <div class="setting-footer">
      <SettingView />
      <FooterView />
    </div>

  </div>
</template>

<script>
import FooterView from '@/components/common/FooterView.vue'
import SettingView from '@/components/common/SettingView.vue'

export default {
  name: 'App',
  components: {
    FooterView,
    SettingView
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
