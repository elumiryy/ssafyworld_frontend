<template>
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
      <span>
        <b>보낸 사람</b> : {{ selectedLetter.toUserOrdinal }} 
        {{ selectedLetter.toUserRegion }}
        {{ selectedLetter.toUserBan }} 
        {{ selectedLetter.toUserName }}
      </span>

      <p>
        <span><b>제목</b> : {{ selectedLetter.title }}</span>
        <span style="margin-left: 20%"
          ><b>전송 날짜</b> : {{ selectedLetter.createdAt }}</span
        >
      </p>
    </div>
    <div class="letter-content">{{ selectedLetter.content }}</div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

defineProps({
  letters: Array,
});

const selectedLetter = ref({});

const showLetterDetail = (letter) => {
  selectedLetter.value = letter;
};

const MAX_LENGTH = 15
const truncate = (text) => {
  if (text.length > MAX_LENGTH) {
    return text.substring(0, MAX_LENGTH) + ' ...'
  }
  return text
}
</script>

<style scoped>
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

tr > td {
  cursor: pointer;
}

.selected-row {
  background-color: #BFBFBF;
  color: white;
}
</style>
