<template>
  
  <div class="sendlist">
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
            <td>{{ letter.toUserName }}</td>
            <td>{{ truncate(letter.title) }}</td>
            <td>{{ truncate(letter.content) }}</td>
            <td>{{ letter.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="letter-detail">
      <div class="letter-info" v-if="selectedLetter">
        <div class="letter-info-div-first">
          <span>
            <b>보낸 사람</b> &nbsp;:&nbsp; {{ selectedLetter.toUserOrdinal }} 
            {{ selectedLetter.toUserRegion }}
            {{ selectedLetter.toUserBan }} 
            {{ selectedLetter.toUserName }}
          </span>
        </div>
        <div class="letter-info-div-second">
          <span class="letter-info-div-title"><b>제목</b> &nbsp;:&nbsp; {{ selectedLetter.title }}</span>
          <span class="letter-info-div-createdAt"><b>전송 날짜</b> &nbsp;:&nbsp; {{ selectedLetter.createdAt }}</span>
        </div>
      </div>
      <div class="sunken-panel letter-content">{{ selectedLetter.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import {truncate} from '@/components/letter.js'
defineProps({
  letters: Array,
});
const selectedLetter = ref({});
const showLetterDetail = (letter) => {
  selectedLetter.value = letter;
};
</script>

<style scoped>
.sendlist {
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
  /* border-collapse: separate;
  border-spacing: 0 12px; */
}

.letter-detail {  
  /* margin-top: 5px; */
  height: 50%;
  background-color: white;
  /* border-style: inset; */
  box-shadow: inset -1px -1px #626262, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
}
.letter-info {
  height: 30%;
  padding: 3px;
  font-size: 14px;
  background-color: #bfbfbf;
  /* box-shadow: 1px 1px 1px 1px #8f8f8f; */
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
  overflow-y: auto; /* 세로 스크롤 생성 */
  overflow-x: hidden;
  white-space: pre-wrap; /* 연속된 공백 및 줄 바꿈 유지 */
  width: 100%; /* 예시로 너비를 200px로 설정 */
  word-wrap: break-word; /* 글자가 너비를 초과할 때 줄 바뜨 */
}
tr > td {
  cursor: pointer;
}
.selected-row {
  background-color: #BFBFBF;
  color: white;
}
</style>