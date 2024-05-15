<template>
  <div class="chatroom">
    <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">
            <img src="@/assets/windowsIcon/desktop-1.png" alt="windows-icon-img" width="10" height="10">
            채팅방 관리자
          </div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" v-on:click="closwMypage()"></button>
          </div>
        </div>

        <div class="window-body">
            <!-- <ul>
                <li v-for="chat in chatData" :key='chat'> {{chat}}</li>
            </ul> -->

            <!-- 테스트용 코드 -->
            <div class="sunken-panel">
                <table class="interactive">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>날짜</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="chat in chatData" :key='chat.time'>
                            <td class="chat-name-td">{{chat.sender}}</td>
                            <td class="chat-time-td">{{chat.time}}</td>
                            <td class="chat-content-td">{{chat.content}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mycontent-div">
                <label for="mycontent">채팅 입력 &nbsp; : &nbsp; </label>
                <input id="mycontent" type="text" @keypress.enter = "sendChat" v-model="inputText" />
            </div>
            <div style="height: 40px"/> <!-- footer와 겹치지않도록 처리 -->
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
    height: 100%;
    margin: 0;
    background-color: #314CA5;
  }


  .sunken-panel {
    width: 100%;
    height: 85%;
    background-color: #314CA5;
  }
  /* 스크롤바 숨기기(마우스 휠로 스크롤 가능) */
  .sunken-panel::-webkit-scrollbar {
    display: none;
  }

  table {
    width: 100%;
    background-color: #314CA5;
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
  }

  .chat-time-td {
    width: 15%;
  }

  .chat-content-td {
    width: 70%;
    white-space: normal; /* 자동 줄바꿈 */
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