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
                        <tr v-for="t in temp" :key='t.time'>
                            <td class="chat-name-td">{{t.name}}</td>
                            <td class="chat-time-td">{{t.time}}</td>
                            <td class="chat-content-td">{{t.content}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mycontent-div">
                <label for="mycontent">채팅 입력 : </label>
                <input id="mycontent" type="text" v-model="inputText" />
                <button @click="sendChat">전송</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>    
import axios from 'axios';
import {ref} from 'vue';

// 임시 데이터
const temp = [
        { name: 'User1', time: '12:30 PM', content: '안녕하세요!' },
        { name: 'User2', time: '12:31 PM', content: '안녕하세요! 반가워요!안녕하세요! 반가워요!안녕하세요! 반가워요!안녕하세요! 반가워요!안녕하세요! 반가워요!안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:32 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:33 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User1', time: '12:35 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:36 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User4', time: '12:37 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:38 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:39 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:40 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User6', time: '12:41 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:42 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:43 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:44 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User1', time: '12:45 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:47 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:48 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User4', time: '12:49 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User5', time: '12:50 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User4', time: '12:51 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:52 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:53 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User1', time: '12:45 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:47 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:48 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User4', time: '12:49 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User5', time: '12:50 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User4', time: '12:51 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User2', time: '12:52 PM', content: '안녕하세요! 반가워요!' },
        { name: 'User3', time: '12:53 PM', content: '안녕하세요! 반가워요!' },
    ];


function closwMypage() {
    window.close()
}

function Chat(sender, content) {
    this.sender = sender;
    this.content = content
}

const searchParams = new URLSearchParams(window.location.search);
const chatRoomId = searchParams.get('chatRoomId')
const accessToken = localStorage.getItem('accessToken');
const chatData = ref(getChattingData());

async function setChatData(response) {
    chatData.value = response.data
    .map(data => new Chat(data.senderName, data.content));
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

var clientWebSocket = new WebSocket(process.env.VUE_APP_WEB_SOCKET_URL + chatRoomId);

clientWebSocket.onopen = function() {
    console.log("clientWebSocket.onopen", clientWebSocket);
    console.log("clientWebSocket.readyState", "websocketstatus");
}

clientWebSocket.onclose = function(error) {
    console.log("clientWebSocket.onclose", clientWebSocket, error);
    events("Closing connection");
}

clientWebSocket.onerror = function(error) {
    console.log("clientWebSocket.onerror", clientWebSocket, error);
    events("An error occured");
}
    
clientWebSocket.onmessage = function(message) {
    console.log("clientWebSocket.onmessage", clientWebSocket, message);
    events(message.data);
    const arr = message.data.split(':');
    chatData.value.push(new Chat(arr[0], arr[1]));
}

function events(responseEvent) {
    console.log(responseEvent);
}

const inputText = ref('');

const sendChat = () => {
    clientWebSocket.send(JSON.stringify({
        "groupInfoId" : chatRoomId,
        "memberId" : 10002,
        "sender" : "vue js",
        "content" : inputText.value
    }));
    inputText.value = '';
}

const tmp = false;
if(tmp) {
    sendChat();
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