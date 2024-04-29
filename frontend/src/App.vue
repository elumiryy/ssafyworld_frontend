<template>
  <div>
    <MainView />
    <div class="setting-footer">
      <SettingView />
      <FooterView />
    </div>
  </div>
</template>

<script>
import MainView from '@/components/MainView.vue'
import FooterView from '@/components/common/FooterView.vue'
import SettingView from '@/components/common/SettingView.vue'

export default {
  name: 'App',
  components: {
    MainView,
    FooterView,
    SettingView
  }
}
</script>

<style>

  .setting-footer {
    width: 100%;
    /* 하단에 고정 */
    position: absolute;
    bottom: 0;
  }
  
</style>
