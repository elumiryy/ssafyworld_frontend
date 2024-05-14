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
            <table style="width: 100%">
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
            <div class="letter-info" v-if="selectedLetter">
              <span><b>보낸 사람</b> : {{ selectedLetter.fromUser }} </span>
              <button
                @click="HideCancle"
                style="float: right; margin-top: 2px; margin-right: 2px"
              >
                숨기기 취소
              </button>
              <p>
                <span><b>제목</b> : {{ selectedLetter.title }}</span>
                <span style="margin-left: 20%"
                  ><b>전송 날짜</b> : {{ selectedLetter.createdAt }}</span
                >
              </p>
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
import { defineProps, defineEmits, onMounted, ref } from "vue";

const letters = ref([]);
const selectedLetter = ref({});
const emit = defineEmits(["closeModal"]);

defineProps({
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
        letter.createdAt = letter.createdAt.replace("T", " ");
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(showList)

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

const MAX_LENGTH = 10
const truncate = (text) => {
  if (text.length > MAX_LENGTH) {
    return text.substring(0, MAX_LENGTH) + ' ...'
  }
  return text
}
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

.window-body {
  font-size: 13px;
}

.inner-nav {
  margin-top: 0;
  margin-bottom: 1%;
}

.inner-nav > span {
  margin-right: 1%;
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
  margin-top: 5px;
  height: 50%;
  background-color: white;
  border-style: inset;
}

.letter-info {
  font-size: 14px;
  background-color: #bfbfbf;
  box-shadow: 1px 1px 1px 1px #8f8f8f;
}

.letter-content {
  padding: 1px 10px;
  font-size: 15px;
}

.letter-area {
  height: 350px;
  margin-left: 5px;
  margin-bottom: 10px;
}
</style>
