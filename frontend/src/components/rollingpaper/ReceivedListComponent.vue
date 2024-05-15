<template>
  <div class="receivedlist">
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
      <div class="letter-info" v-if="selectedLetter.fromUser">
        <div class="letter-info-div-first">
          <span><b>보낸 사람</b> &nbsp;:&nbsp; {{ selectedLetter.fromUser }} </span>
          <button v-if="selectedLetter.fromUser != null" @click="hideLetter">숨기기</button>
        </div>
        <div class="letter-info-div-second">
          <span class="letter-info-div-title"><b>제목</b> &nbsp;:&nbsp; {{ selectedLetter.title }}</span>
          <span class="letter-info-div-createdAt"><b>전송 날짜</b> &nbsp;:&nbsp; {{ selectedLetter.createdAt }}</span>
        </div>
      </div>
      <div class="sunken-panel letter-content">
        <FormattedContent :content="selectedLetter.content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { truncate } from '@/components/letter.js';
import axios from 'axios';
import FormattedContent from '@/components/rollingpaper/FormattedContent.vue'; // 새로운 컴포넌트 임포트

defineProps({
  letters: Array,
});
const emit = defineEmits(['hideLetter']);

const selectedLetter = ref({});

const showLetterDetail = (letter) => {
  selectedLetter.value = letter;
  selectedLetter.value.createdAt = selectedLetter.value.createdAt.replace("T", " ");
};

const hideLetter = () => {
  axios.post("/letter/hidden", {
    letterId: selectedLetter.value.letterId,
    hidden: true,
  }, {
    headers: {
      Authorization: window.localStorage.getItem("accessToken"),
    }
  }).then(() => {
    selectedLetter.value = {};
    emit('hideLetter');
  }).catch(error => {
    console.error("Failed to hide letter:", error);
  });
};
</script>

<style scoped>
.receivedlist {
  height: 100%;
}

.letter-list {
  height: 50%;
}

ul {
  font-size: 14px;
}

table {
  font-size: 14px;
}

.letter-detail {
  height: 50%;
  background-color: white;
  box-shadow: inset -1px -1px #626262, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
}

.letter-info {
  height: 30%;
  padding: 3px;
  font-size: 14px;
  background-color: #bfbfbf;
  box-shadow: inset -1px -1px #626262, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  height: 70%;
  padding: 0 10px;
  font-size: 15px;
  overflow-y: auto; /* Enable vertical scrolling */
}

tr > td {
  cursor: pointer;
}

.selected-row {
  background-color: #BFBFBF;
  color: white;
}
</style>
