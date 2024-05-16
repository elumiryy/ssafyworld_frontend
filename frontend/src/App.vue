<template>
  <div>
    <!-- 드래그 금지 설정 -->
    <div ondragstart="return false" @click="closeModal">
      <!-- router 설정 -->
      <router-view></router-view>
    </div>

    <div class="mypage-modal">
      <MypageView :isOpenMypage="isOpenMypage" @close-mypage="closeMypage"/>
    </div>

    <!-- menu -->
    <div class="menu">
      <SettingView v-if="isSettingVisible" @open-mypage="openMypage"/>
    </div>

    <!-- time -->
    <div class="time">
      <TimeView v-if="isTimeVisible" :date="date"/>
    </div>

    <!-- notComplete.. sorry -->
    <div class="notComplete">
      <NotCompleteView v-if="isNotCompleteVisible"/>
    </div>

    <div class="notComplete2">
      <NotCompleteView v-if="isNotComplete2Visible"/>
    </div>
    
    <!-- Footer -->
    <footer>
      <FooterView @open-start-modal="callOpenStartModal" @open-time-modal="callOpenTimeModal" @open-not-complete-modal="callOpenNotCompleteModal" @open-not-complete2-modal="callOpenNotComplete2Modal"/>
    </footer>

  </div>
</template>

<script>
import FooterView from '@/components/common/FooterView.vue'
import SettingView from '@/components/common/SettingView.vue';
import TimeView from '@/components/common/TimeView.vue';
import NotCompleteView from '@/components/common/NotCompleteView.vue';
import MypageView from '@/views/member/MypageView.vue';

export default {
  name: 'App',
  data() {
    return {
      isSettingVisible: false,
      isTimeVisible: false,
      isNotCompleteVisible: false,
      isNotComplete2Visible: false,
      isOpenMypage: false,
      date: {
        year: '',
        month: '',
        day: '',
      }
    };
  },
  components: {
    FooterView,
    SettingView,
    TimeView,
    MypageView,
    NotCompleteView
  },
  methods: {

    //not complete view 관련----------
    callOpenNotCompleteModal() {
      this.isNotCompleteVisible = !this.isNotCompleteVisible
    },
    callOpenNotComplete2Modal() {
      this.isNotComplete2Visible = !this.isNotComplete2Visible
    },
    //--------------------------------

    callOpenStartModal() {
      this.isSettingVisible = !this.isSettingVisible
    },
    callOpenTimeModal(year, month, day, dayWeek) {
      this.isTimeVisible = !this.isTimeVisible
      this.date.year = year
      this.date.month = month
      this.date.day = day
      this.date.dayWeek = dayWeek
    },
    closeModal() {
      if (this.isSettingVisible == true) {
        this.isSettingVisible = !this.isSettingVisible
      }
      if (this.isTimeVisible == true) {
        this.isTimeVisible = !this.isTimeVisible
      }
      if (this.isNotCompleteVisible == true) {
        this.isNotCompleteVisible = false
      }
      if (this.isNotComplete2Visible == true) {
        this.isNotComplete2Visible = false
      }
    },
    openMypage() {
        this.isOpenMypage = true;
        // window.open("/mypage", "_blank", "width=550, height=400, left=550, top=250");
    },
    closeMypage() {
        this.isOpenMypage = false;
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }

  .mypage-modal {
    /* width: 550px;
    height: 350px; */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); /* 모달 정중앙 정렬 */
    position: absolute;
    /* window.open("/mypage", "_blank", "width=550, height=400, 
    left=550, top=250"); */
  }

  .menu {
    position: absolute;
    bottom: 40px; /* FooterView : #footer css의 height: 40px;랑 같게 */
  }

  .time {
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  .notComplete {
    position: absolute;
    bottom: 20px;
    left: 45px;
  }

  .notComplete2 {
    margin-right: 95px;
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  footer {
    width: 100%;
    /* 하단에 고정 */
    position: absolute;
    bottom: 0;
  }
  
</style>