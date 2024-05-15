<template lang="">
  <div class="main">
    <!-- ErrorModal을 코드 최상단으로 올려야 전체 화면에 대한 클릭이벤트를 적용할 수 있다 -->
    <ErrorModal v-if="errorModalState" @close="changeErrorModalState" :success="isSuccess" title="에러가 발생하였습니다" message="에러메시지!!원하는 에러메시지 작성"/>

    <div class="windows-icon-div received">
      <div
        @click="openIntroModal"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        >
        <img
          src="@/assets/windowsIcon/computer_explorer-4.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>내 컴퓨터</p>
      </div>
    </div>
    <IntroView :isOpen="introOpen" @close-modal="closeIntroModal" style="position: absolute; top:0; left:0"/>

    <div class="windows-icon-div">
      <router-link to="/chat">
        <img
          src="@/assets/windowsIcon/address_book_card_users.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>채팅방</p>
      </router-link>
    </div>
    <div class="windows-icon-div received">
      <div
        @click="openModal"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <img
          src="@/assets/windowsIcon/newspaper_mail.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>편지함</p>
      </div>
    </div>
    <ReceivedLetterView :isOpen="isOpen" @close-modal="closeModal" @goToFolderView="goToFolderView" />

    <div class="windows-icon-div received">
      <div
        @click="openHiddenModal"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <img
          src="@/assets/windowsIcon/recycle_bin_full-4.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>숨긴<br>편지함</p>
      </div>
    </div>
    <HiddenListComponent :showModal="isHiddenOpen" @close-modal="closeHiddenModal"/>
  
    <!-- 숨겨놓은 컴포넌트 (letter보낼 사용자 선택 디렉토리) -->
    <LetterView v-if="folderOpen" :isOpen="folderOpen" @isColsed="closeFolder"></LetterView>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ReceivedLetterView from "./letter/ReceivedLetterView.vue";
import IntroView from "./intro/IntroView.vue";
import HiddenListComponent from "@/components/rollingpaper/HiddenListComponent.vue";
import LetterView from "./letter/LetterView.vue";
import ErrorModal from "./error/ErrorModal.vue";

const isOpen = ref(false);
const isHiddenOpen = ref(false);
const isSuccess = ref(false) //에러모달 성공/실패여부

const openHiddenModal = () => {
  isHiddenOpen.value = true;
};
const closeHiddenModal = () => {
  isHiddenOpen.value = false;
}

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const handleMouseEnter = () => {
  document.querySelector(".received").style.cursor = "pointer"; // 마우스를 올렸을 때 커서 변경
};

const handleMouseLeave = () => {
  document.querySelector(".received").style.cursor = "default"; // 마우스를 떼었을 때 커서 원래대로 변경
};

//에러모달 관련------------------------------
const errorModalState = ref(false)
const changeErrorModalState = () => {
  errorModalState.value = !errorModalState.value;
}

//letter를 보낼 사용자 선택 관련--------------
const folderOpen = ref(false)

const goToFolderView = () => {
  folderOpen.value = true;
}

const closeFolder = () => {
  folderOpen.value = false;
}
//-------------------------------------------

//개발자 소개 관련----------------------------
const introOpen = ref(false);

const openIntroModal = () => {
  introOpen.value = true;
};

const closeIntroModal = () => {
  introOpen.value = false;
};

// const goToIntroView = () => {
//   introOpen.value = true;
// }
//-------------------------------------------

</script>

<style scoped>
.main {
  height: 100vh;
  background-color: #008080;
}

.windows-icon-div {
  width: 60px;
  padding: 15px;
}

.windows-icon-div > a, .windows-icon-div > div {
  text-decoration: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.windows-icon-div p {
  margin: 0;
  padding: 1px 0;
  color: #f8fcf8;
  font-size: small;
  text-align: center;
}
</style>
