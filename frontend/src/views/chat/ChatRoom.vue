<template>
  <div class="chatroom">
    <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">
            채팅방 관리자
          </div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" v-on:click="closwMypage()"></button>
          </div>
        </div>

        <div class="window-body">
            <div class="sunken-panel" style=" overflow-x: hidden; ">
                <table class="interactive">
                    <thead>
                        <tr>
                          <th class="th-name">이름</th>
                          <th class="th-time">날짜</th>
                          <th class="th-content">내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="chat in chatData" :key='chat.time'>
                          <td class="chat-name-td"><span>{{chat.sender}}</span></td>
                            <td class="chat-time-td"><span>{{chat.time}}</span></td>
                            <td class="chat-content-td"><span>{{chat.content}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mycontent-div">
                <label for="mycontent">채팅 입력 &nbsp; : &nbsp; </label>
                <input id="mycontent" maxlength="200" type="text" @keypress.enter = "sendChat" v-model="inputText" />
            </div>
        </div>
    </div>
  </div>
</template>
<script setup>    
import axios from 'axios';
import {ref, onBeforeMount, onUpdated} from 'vue';
import {onBeforeRouteLeave, useRouter} from 'vue-router'
import moment from 'moment';
import {adjustTime} from '@/components/timezone.js'
const router = useRouter();
function closwMypage() {
   router.push({ name: 'MainView' });
}
function Chat(sender, content,time) {
    this.sender = sender;
    this.content = content;
    this.time = adjustTime(time);
}
const searchParams = new URLSearchParams(window.location.search);
const chatRoomId = searchParams.get('chatRoomId')
const accessToken = localStorage.getItem('accessToken');
const chatData = ref([]);
async function setChatData(response) {
    chatData.value = response.data
    .map(data => new Chat(data.senderName, data.content,data.createdAt));
}
async function getChattingData() {
    return await axios.get(
        `/chat/${chatRoomId}/messages`,
        {
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }
    ).then(response => setChatData(response));
}
var clientWebSocket = undefined;
onUpdated(() => {
  const bottom = document.querySelector('.sunken-panel');
  bottom.scrollTop =  bottom.scrollHeight;
})
onBeforeMount(() => {
  getChattingData();
  clientWebSocket = new WebSocket(process.env.VUE_APP_WEB_SOCKET_URL + chatRoomId);
  clientWebSocket.onmessage = function(message) {
      const chat = JSON.parse(message.data);
      chat.time = adjustTime(chat.time);
      chatData.value.push(chat);
      const bottom = document.querySelector('.sunken-panel');
      bottom.scrollTop =  bottom.scrollHeight;
  }
})
onBeforeRouteLeave(async (to,from) => {
  clientWebSocket.close();
  to,from;
})
const inputText = ref('');
const sendChat = () => {
    inputText.value = inputText.value.trim();
  
    if(inputText.value.length < 2) {
      window.alert("글자 수가 너무 적습니다." , inputText.value);
      return;
    }
    if(inputText.value.length > 200) {
      window.alert("글자 수 제한을 초과하였습니다.");
      return;
    }
    clientWebSocket.send(JSON.stringify({
        "groupInfoId" : chatRoomId,
        "accessToken" : accessToken,
        "createdAt" : moment().format('yyyy-MM-DD HH:mm:ss'),
        "content" : inputText.value,
    }));
    inputText.value = '';
}
</script>
<style scoped>
  .chatroom {
    height: 100vh;
  }
  .window {
    height: 100%;
  }
  .window-body {
    height: 90%;
    margin: 0;
    background-color: #314CA5;
  }
  .sunken-panel {
    width: 100%;
    height: 90%;
    background-color: #314CA5;
  }
  /* 스크롤바 숨기기(마우스 휠로 스크롤 가능) */
  .sunken-panel::-webkit-scrollbar {
    display: none;
  }
  table {
    width: 100%;
    background-color: #314CA5;
    table-layout: fixed;
  }
  thead {
    width: 100%;
  }
  th {
    background-color: #314CA5;
    color: #E6F5FF;
    font-size: large;
    box-shadow: none;
  }
  .th-name {
    width: 10%;
    text-align: center;
  }
  .th-time {
    width: 20%;
    text-align: center
  }
  td {
    color: #E6F5FF;
    font-size: large;
  }
  table {
    border-collapse: separate;
    border-spacing: 5px;
  }
  
  .chat-name-td {
    width: 15%;
    text-align: center
  }
  .chat-time-td {
    width: 15%;
    text-align: center
  }
  .chat-content-td {
    width: 70%;
    white-space: normal; /* 자동 줄바꿈 */
    word-break: break-all;
    /* word-wrap: break-word; 글자가 너비를 초과할 때 줄 바뜨 */
  }
  .chat-name-td > span, .chat-time-td > span {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .chat-content-td > span {
    height: 100%;
    display: flex;
    align-items: flex-start;
  }
  .mycontent-div {
    padding: 10px;
    display: flex;
  }
  label {
    color: #E6F5FF;
    font-size: large;
  }
  input {
    width: 95%;
    font-size: large;
  }
</style>