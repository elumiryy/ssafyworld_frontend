<template lang="">
  <div class="main">
    <div class="windows-icon-div">
      <router-link to="/login">
        <img
          src="@/assets/windowsIcon/computer_explorer-4.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>내 컴퓨터</p>
      </router-link>
    </div>
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
    <ReceivedLetterView :isOpen="isOpen" @close-modal="closeModal" />

    <div class="windows-icon-div received">
      <div
        @click="changeErrorModalState"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <img
          src="@/assets/windowsIcon/newspaper_mail.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>에러팝업</p>
      </div>
    </div>
    <ErrorModal v-if="errorModalState" @close="changeErrorModalState" :success="isSuccess" title="에러가 발생하였습니다" message="에러메시지!!원하는 에러메시지 작성"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ReceivedLetterView from "./letter/ReceivedLetterView.vue";
import ErrorModal from "./error/ErrorModal.vue";

const isOpen = ref(false);
const isSuccess = ref(false) //에러모달 성공/실패여부

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

const errorModalState = ref(false)
const changeErrorModalState = () => {
  errorModalState.value = !errorModalState.value;
}

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
}
</style>
