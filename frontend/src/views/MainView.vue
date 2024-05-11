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
          src="@/assets/windowsIcon/windows.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>채팅방</p>
      </router-link>
    </div>
    <div class="windows-icon-div">
      <div @click="goToChatRoom">
        <img
          src="@/assets/windowsIcon/windows.png"
          alt="windows-icon-img"
          width="50"
          height="50"
        />
        <p>채팅방 입장</p>
      </div>
    </div>
    <div class="windows-icon-div">
      <div class="write-letter">
        <LetterView></LetterView>
        <p>편지쓰기</p>
      </div>
    </div>

    <div
      class="windows-icon-div received"
      @click="openModal"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <img
        src="@/assets/windowsIcon/directory_open_file_mydocs-5.png"
        alt="windows-icon-img"
        width="50"
        height="50"
      />
      <p>받은 편지 보기</p>
    </div>
    <ReceivedLetterView :isOpen="isOpen" @close-modal="closeModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LetterView from "@/views/letter/LetterView.vue";

import ReceivedLetterView from "./letter/ReceivedLetterView.vue";

const isOpen = ref(false);

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

const goToChatRoom = () => {
  window.open(
    "/chatroom",
    "_blank",
    "width=550, height=400, left=550, top=250"
  );
};
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

.windows-icon-div > a {
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
