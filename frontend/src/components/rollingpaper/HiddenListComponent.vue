<template>
  <div class="hidden" v-if="showModal">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text" style="font-size: 12px">숨긴 편지함</div>
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
          <span>도움말(<u>H</u>)</span>
        </div>

        <div class="main letter-area">
          <div class="sunken-panel letter-list">
            <table>
              <thead>
                <tr>
                  <th style="width: 10%">보낸 사람</th>
                  <th style="width: 35%">제목</th>
                  <th style="width: 35%">내용</th>
                  <th style="width: 20%">전송 날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="letter in letters"
                  :key="letter.letterId"
                  @click="showLetterDetail(letter)"
                  tabindex="0"
                  :class="{ 'selected-row': selectedLetter === letter }"
                >
                  <td>{{ letter.fromUser }}</td>
                  <td>{{ truncate(letter.title) }}</td>
                  <td>{{ truncate(letter.content) }}</td>
                  <td>{{ letter.createdAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="letter-detail">
            <div class="letter-info">
              <div class="letter-info-div-first">
                <span><b>보낸 사람</b> &nbsp;:&nbsp; {{ selectedLetter.fromUser }} </span>
                <button v-if="selectedLetter.fromUser != null" @click="HideCancle">숨기기 취소</button>
              </div>
              <div class="letter-info-div-second">
                <span class="letter-info-div-title"><b>제목</b> &nbsp;:&nbsp; {{ selectedLetter.title }}</span>
                <span class="letter-info-div-createdAt"><b>전송 날짜</b> &nbsp;:&nbsp; {{ selectedLetter.createdAt }}</span>
              </div>
            </div>
            <div class="letter-content">{{ selectedLetter.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits, ref, watch } from "vue";
import {truncate} from '@/components/letter.js'
import { adjustTime } from '@/components/timezone.js'

const letters = ref([]);
const selectedLetter = ref({});
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  showModal: Boolean,
});

const closeModal = () => {
  emit("closeModal");
};

const showList = () => {
  axios
    .get("/letter/hidden", {
      headers: {
        Authorization: window.localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      letters.value = res.data;
      letters.value.forEach((letter) => {
        letter.fromUser = "익명";
        letter.createdAt = adjustTime(letter.createdAt)
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

watch(() => props.showModal, (value) => {
  if (value) {
    showList();
  }
});

const HideCancle = () => {
  axios
    .post(
      "/letter/hidden",
      {
        letterId: selectedLetter.value.letterId,
        hidden: false,
      },
      {
        headers: {
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }
    )
    .then(() => {
      selectedLetter.value = {};
      showList()
    })
    .catch((error) => {
      console.error("Failed to hide letter:", error);
    });
};


const showLetterDetail = (letter) => {
  selectedLetter.value = letter;
};
</script>

<style scoped>
.hidden {
  z-index: 1000;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
}

.window {
   height: 100%;
}

.window-body {
  height: 90%;
  margin: 0;
  padding: 0 8px;
  font-size: 13px;
}

.inner-nav {
  /* margin-top: 0;
  margin-bottom: 1%; */
  padding: 8px 0;
}

.inner-nav > span {
  /* margin-right: 1%; */
  padding-right: 8px;
}

.letter-area {
  height: 90%;
  /* margin-left: 5px;
  margin-bottom: 10px; */
}

ul {
  font-size: 14px;
}

table {
  font-size: 14px;
}

.letter-list {
  height: 50%;
}

.letter-detail {  
  /* margin-top: 5px; */
  height: 50%;
  background-color: white;
  border-style: inset;
  box-shadow: inset -1px -1px #626262, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
}

.letter-info {
  padding: 3px;
  font-size: 14px;
  background-color: #bfbfbf;
  /* box-shadow: 1px 1px 1px 1px #8f8f8f; */
  box-shadow: inset -1px -1px #626262, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
}

.letter-info-div-first {
  display: flex;
  justify-content: space-between;
}

.letter-info-div-first > span {
  display: flex;
  align-items: center;
}

.letter-info-div-second {
  display: flex;
  justify-content: space-between;
}

.letter-info-div-second > span {
  display: flex;
  align-items: center;
}

.letter-info-div-createdAt {
  width: 40%;
}

.letter-content {
  padding: 1px 10px;
  font-size: 15px;
}

tr > td {
  cursor: pointer;
}

.selected-row {
  background-color: #BFBFBF;
  color: white;
}
</style>
