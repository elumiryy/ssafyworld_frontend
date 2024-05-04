<template>
  <div>
    <h1>채팅방</h1>

    <ul>
        <li v-for="chat in chatData" :key='chat'> {{chat}}</li>
    </ul>

    <label for="">채팅 입력 : </label>
    <textarea type="text" v-model="inputText"></textarea>
    <button @click="sendChat"></button>
  </div>
</template>

<script setup>    
import axios from 'axios';
import {ref} from 'vue';

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

<style>

</style>