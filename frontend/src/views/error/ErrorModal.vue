<template>
  <div class="errorModal" style="width:100%; height: 100%;" @click="handleBackgroundClick">
    <div class="window" style="width: 300px; min-height: 130px; min-width: 350px;">
      <div class="title-bar">
        <div class="title-bar-text">{{ title }}</div>
        <div class="title-bar-controls">
          <button aria-label="Close" @click="$emit('close')">Close</button>
        </div>
      </div>
      <div class="window-body">
        <div style="display: flex">
          <img v-if="success" src="@/assets/windowsIcon/msg_success.png" alt="success-icon">
          <img v-else src="@/assets/windowsIcon/msg_error.png" alt="error-icon">
          <p>{{ message }}</p>
        </div>
        <div>
          <button ref="closeButton" @click="$emit('close')">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  props : ['title', 'message', 'success'],	
  data() {
    return {
        closeButton: null,
    }
  },
  methods: {
    handleBackgroundClick() {
              if (this.$refs.closeButton) {
        this.$refs.closeButton.focus();
              }
    }
  },
  mounted() {
    // DOM이 마운트된 후 ref를 접근할 수 있습니다.
    this.closeButton = this.$refs.closeButton;
  }
}
</script>

<style scoped>
.window {
  position: fixed;     /* 모달창 위치를 고정 */
  top: 50%;            /* 화면의 중앙에 위치 */
  left: 50%;           /* 화면의 중앙에 위치 */
  transform: translate(-50%, -50%); /* 정확한 중앙 */
}

h2 {
  margin-top: 0;
  color: white;         /* 제목 색상 */
}

p {
  color: black;
  cursor: pointer;     /* 클릭 가능한 요소임을 표시 */
  text-align: left;   /* 텍스트 우측 정렬 */
  margin: 10px 0 0;    /* 마진 조정 */
  font-size: 15px;
}

.window {
  width: 300px; /* 윈도우의 너비 고정 */
}

.title-bar-text {
  flex-grow: 1; /* 제목 내용이 공간을 넓게 사용 */
}


.window-body {
  /* padding: 10px; 내부 여백 */
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
}

.window-body > div:first-child {
  display: flex;
  align-items: center; /* 아이콘과 텍스트를 수직 중앙 정렬 */
}

.window-body img {
  flex: 0 0 40px; /* 이미지 너비를 30px 으로 고정, 성장 및 축소 비율 0 */
  margin: 5px;
}

.window-body p {
  flex: 1; /* 나머지 공간을 모두 사용 */
  margin: 0; /* 기본 마진 제거 */
  padding: 0 10px; /* 좌우 패딩 */
  text-align: center; /* 텍스트 중앙 정렬 */
}

.window-body > div:last-child {
  display: flex;
  justify-content: center; /* 버튼을 수평 중앙으로 정렬 */
  padding: 10px 0; /* 상하 패딩 */
}

.window-body button {
  padding: 5px 20px; /* 버튼 내부 패딩 */
}
</style>