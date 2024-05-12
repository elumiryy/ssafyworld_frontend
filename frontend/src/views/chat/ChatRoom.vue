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
                <label for="mycontent">채팅 입력 : </label>
                <input id="mycontent" type="text" @keyup.enter = "sendChat" v-model="inputText" />
                <button @click="sendChat">전송</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>    
import axios from 'axios';
import {ref, onBeforeMount} from 'vue';
import {onBeforeRouteLeave} from 'vue-router'

function closwMypage() {
    window.close()
}

function Chat(sender, content,time) {
    this.sender = sender;
    this.content = content;
    this.time = time;
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

onBeforeMount(() => {
  getChattingData();
  clientWebSocket = new WebSocket(process.env.VUE_APP_WEB_SOCKET_URL + chatRoomId);

  clientWebSocket.onmessage = function(message) {
      const arr = message.data.split(':');
      chatData.value.push(new Chat(arr[0], arr[1], arr[2]));
  }
})

onBeforeRouteLeave(async (to,from) => {
  clientWebSocket.close();
  to,from;
})

const inputText = ref('');

const sendChat = () => {
    clientWebSocket.send(JSON.stringify({
        "groupInfoId" : chatRoomId,
        "token" : accessToken,
        "content" : inputText.value,
    }));
    inputText.value = '';
}

</script>

<style scoped>
  .chatroom {
    height: 100vh;
    position: relative;
    z-index: 1;
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
    font-size: small;
    box-shadow: none;
  }

  td {
    color: #E6F5FF;
    font-size: small;
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
    padding: 10px 0;
    display: flex;
    justify-content: space-between
  }

  label {
    color: #E6F5FF;
    font-size: small;
  }

  input {
    width: 70%;
    font-size: small;
  }
</style>