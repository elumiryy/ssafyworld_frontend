<script setup>
import ReceivedList from "@/components/rollingpaper/ReceivedListComponent.vue";
import SentList from "@/components/rollingpaper/SentListComponent.vue";
import HiddenListComponent from "@/components/rollingpaper/HiddenListComponent.vue";
import { defineProps, defineEmits, ref } from "vue";
import { adjustTime } from "@/components/timezone.js";
import axios from "axios";

defineProps({
  isOpen: Boolean,
});

axios.defaults.baseURL = process.env.VITE_APP_API_URL;
const emit = defineEmits(["closeModal", "goToFolderView"]);

const closeModal = () => {
  emit("closeModal");
};

const showReceived = ref(true);
const showSent = ref(false);

const receivedLetters = ref([]);
const sentLetters = ref([]);

const showReceivedList = () => {
  axios.get("/letter/receive", {
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
      }
    }
  ).then((response) => {
    receivedLetters.value = response.data;
    receivedLetters.value.forEach((letter) => {
      letter.fromUser = "익명";
      letter.createdAt = adjustTime(letter.createdAt)
    });
  }).catch((error) => {
    console.error("Failed to fetch received letters:", error);
    receivedLetters.value = [];
  });

  showReceived.value = true;
  showSent.value = false;
};

const showSentList = () => {
  axios.get("/letter/send", {
    headers: {
      Authorization: window.localStorage.getItem("accessToken"),
    },
  }).then((response) => {
    sentLetters.value = response.data;
    sentLetters.value.forEach((letter) => {
      letter.toUserOrdinal += '기'
      letter.toUserBan += '반'
      letter.createdAt = adjustTime(letter.createdAt)
    });
  }).catch((error) => {
  console.error("Failed to fetch sent letters:", error);
  sentLetters.value = [];
  });

  showReceived.value = false;
  showSent.value = true;
};

const goToFolderView = () => {
  emit("goToFolderView");
};

const isHiddenOpen = ref(false)
const openHideModal = () => {
  isHiddenOpen.value = true;
}
const closeHiddenModal = () => {
  isHiddenOpen.value = false;
}
</script>

<template>
  <div class="received" v-if="isOpen">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text" style="font-size: 12px">
          받은 편지함 - Ssafy Express
        </div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" @click="closeModal"></button>
        </div>
      </div>

      <div class="window-body">
        <div class="inner-nav">
          <span>파일(<u>F</u>)</span>
          <span>편집(<u>E</u>)</span>
          <span>보기(<u>V</u>) </span>
          <span>이동(<u>G</u>) </span>
          <span>도구(<u>T</u>)</span>
          <span>작성(<u>C</u>)</span>
          <span>도움말(<u>H</u>)</span>
        </div>

        <div class="inner-tab">
          <div
            class="go-to-write"
            style="text-align: center"
            @click="goToFolderView"
          >
            <img src="@/assets/windowsIcon/write_wordpad-1.png" alt="" /><br />
            롤링 페이퍼<br>작성
          </div>
        </div>

        <div class="main">
          <ul class="tree-view side-bar">
            <li>
              <div style="display: flex; align-items: center">
                <img
                  src="@/assets/windowsIcon/netshow_notransm-1.png"
                  alt=""
                  style="height: 16px; margin-right: 5px"
                />
                SSAFY Express
              </div>
              <ul>
                <li
                  class="side-bar-receive"
                  @click="showReceivedList"
                >
                  <div style="display: flex; align-items: center">
                    <img
                      src="@/assets/windowsIcon/winrep_mag_glass.png"
                      alt=""
                      style="height: 16px; margin-right: 5px"
                    />
                    받은 편지함
                  </div>
                </li>
                <li
                  class="side-bar-sent"
                  @click="showSentList"
                >
                  <div style="display: flex; align-items: center">
                    <img
                      src="@/assets/windowsIcon/replace_directory.png"
                      alt=""
                      style="height: 16px; margin-right: 5px"
                    />
                    보낸 편지함
                  </div>
                </li>
                <li
                  class="side-bar-hidden"
                  @click="openHideModal"
                >
                  <div style="display: flex; align-items: center">
                    <img
                      src="@/assets/windowsIcon/recycle_bin_full-4.png"
                      alt=""
                      style="height: 16px; margin-right: 5px"
                    />
                    숨긴 편지함
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <div class="letter-area">
            <ReceivedList v-if="showReceived" :letters="receivedLetters" @hide-letter="showReceivedList"/>
            <SentList v-if="showSent" :letters="sentLetters" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <HiddenListComponent :showModal="isHiddenOpen" @close-modal="closeHiddenModal"/>
</template>

<style scoped>
.received {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 850px;
  height: 800px;
}

@media (max-width: 800px) {
  .received {
    width: 500px;
  }
}

.window-body {
  font-size: 13px;
}

.inner-nav {
  margin-top: 0;
}

.inner-nav > span {
  margin-right: 1%;
}

.inner-tab {
  margin-top: 5px;
  border-style: groove;
}

.go-to-write {
  width: 10%;
  margin: 10px;
}

.main {
  margin-top: 3px;
  display: flex;
  height: 50vh;
}

.side-bar {
  width: 20%;
  background-color: white;
}

.letter-area {
  width: 80%;
  margin-left: 5px;
  margin-bottom: 10px;
}

.go-to-write:hover {
  cursor: pointer;
}

.side-bar-receive:hover {
  cursor: pointer;
} 
.side-bar-sent:hover {
  cursor: pointer;
}
.side-bar-hidden:hover {
  cursor: pointer;
}

</style>
