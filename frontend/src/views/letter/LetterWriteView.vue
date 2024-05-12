<template>
  <div class="letterWrite">
      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">
            <img src="@/assets/windowsIcon/desktop-1.png" alt="windows-icon-img" width="10" height="10">
            편지 작성 관리자
          </div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>

        <div class="window-body">
          <img src="@/assets/windows-menu-bar.png" alt="windows-icon-img" width="100%">
          <div class="letter-content-div">
            <div>
              <label for="to">To:</label>
              <input id="to" type="text" :value="ordinal + '기 ' + region + ' ' + ban + '반 ' + names + '에게..'" disabled/>
            </div>
            <div>
              <label for="title">Title:</label>
              <input id="title" type="text" placeholder="input title.." v-model="titleField"/>
            </div>
            <textarea name="content" id="content" v-model="contentField" placeholder="input text.."></textarea>
          </div>
          <div class="letter-write-btn">
            <button @click="reset">다시 작성</button>
            <button @click="cancel">취소</button>
            <button @click="send">보내기</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default{
  setup() {
    const url = new URL(window.location.href);
    // URLSearchParams 객체를 사용하여 쿼리 파라미터 접근
    const params = new URLSearchParams(url.search);

    // 특정 쿼리 파라미터 값 읽기
    const ordinal = ref(params.get('ordinal'));
    const region = ref(params.get('region'));
    const ban = ref(params.get('ban'));
    const toUser = ref(params.get('upk'));
    const names = ref(params.get('names'));
    const titleField = ref(''); // title 내용을 담을 변수
    const contentField = ref(''); // textarea 내용을 담을 변수

    const send = () => {
      axios.post('/letter', {

        toUser: toUser.value,
        title: titleField.value,
        content: contentField.value
      },
       {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          withCredentials: true, // default
          Accept: "application/json",
        }
       }).then(response => {
        console.log(response.data);
        alert("메시지 전송 성공!");
        
        window.close();
      }).catch(error => {
        console.error(error);
        alert("메시지 전송 실패 ㅜㅠ!");
      });
    };

    const reset = () => {
      document.querySelector("#title").value = null
      document.querySelector("#content").value = null
    }
    
    const cancel = () => {
      window.close()
    }

    return {
      ordinal,
      region,
      ban,
      names,
      send,
      cancel,
      reset,
      contentField, //TODO마지막 글자가 안들어가는 문제
      titleField
    };
  }
}
</script>


<style scoped>
  .letterWrite {
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
  }

  .letter-content-div {
    height: 65%;
    padding: 5px 10px;
  }

  .letter-content-div > div {
    padding-bottom: 3px;
    display: flex;
    justify-content: space-between;
  }

  .letter-content-div label, .letter-content-div input {
    height: 25px;
    font-size: small;
  }

  .letter-content-div input {
    width: 90%;
    background-color: white;
    color: black;
  }

  .letter-content-div textarea {
    width: 100%;
    height: 75%;
    padding: 5px 10px;
    border: 3px ridge #d1d1d1;
    border-top: 6px ridge #d1d1d1;
    border-radius: 5px;
    resize: none;
    font-size: small;
  }

  .letter-write-btn {
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
  }

  .letter-write-btn > button {
    margin-left: 5px;
  }

</style>

    