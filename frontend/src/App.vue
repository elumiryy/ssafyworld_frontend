<template>
  <div>
    <!-- 드래그 금지 설정 -->
    <div ondragstart="return false" @click="closeStartModal">
      <!-- router 설정 -->
      <router-view></router-view>
    </div>
    
    <!-- menu -->
    <div class="menu">
      <SettingView v-if="isSettingVisible"/>
    </div>
    <!-- Footer -->
    <footer>
      <FooterView @open-start-modal="callOpenStartModal" />
    </footer>

  </div>
</template>

<script>
import FooterView from '@/components/common/FooterView.vue'
import SettingView from '@/components/common/SettingView.vue';


export default {
  name: 'App',
  data() {
    return {
      isSettingVisible: false
    };
  },
  components: {
    FooterView,
    SettingView,
  },
  methods: {
    callOpenStartModal() {
      this.isSettingVisible = !this.isSettingVisible
      console.log("상태 ", this.isSettingVisible)
    },
    closeStartModal() {
      if (this.isSettingVisible == true) {
        this.isSettingVisible = !this.isSettingVisible
        console.log("호출 ", this.isSettingVisible)
      }
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }

  .menu {
    position: absolute;
    bottom: 40px; /* FooterView : #footer css의 height: 40px;랑 같게 */
  }

  footer {
    width: 100%;
    /* 하단에 고정 */
    position: absolute;
    bottom: 0;
  }
  
</style>