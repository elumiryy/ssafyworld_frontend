<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

</script>

<template>
  <div class="received" v-if="isOpen">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text" style="font-size: 12px">
          개발자 소개
        </div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" @click="closeModal"></button>
        </div>
      </div>

      <div class="window-body">

        <div class="main" style="backgroud-color: black">
          <div class="console">
              <div class="console-body" style="padding: 0">
                  <pre>

██╗   ██╗███████╗███╗   ███╗██╗███╗   ██╗      ██╗██╗██╗     ██╗███╗   ███╗
██║   ██║██╔════╝████╗ ████║██║████╗  ██║      ██║██║██║     ██║████╗ ████║
╚██╗ ██╔╝█████╗  ██╔████╔██║██║██╔██╗ ██║      ██║██║██║     ██║██╔████╔██║
   ██║   ██╔══╝  ██║╚██╔╝██║██║██║╚██╗██║██║   ██║██║██║     ██║██║╚██╔╝██║
   ██║   ███████╗██║ ╚═╝ ██║██║██║ ╚████║ ╚█████╔╝██║███████╗██║██║ ╚═╝ ██║
   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝  ╚═══╝ ╚═╝╚══════╝╚═╝╚═╝     ╚═╝
    :: SSAFY WORLD ::                                              (v1.0.0)

예민지림은 싸피 롤링페이퍼 서비스입니다.
서비스를 이용해주셔서 감사합니다.
소개소개


!개발자소개
⠀⠀⠀⠀⠀⢀⣀⣄⣄⡀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣞⣿⠻⢳⢯⣿⣳⡀⠀⠀⠀
⠀⠀⠀⠸⡾⠂⠐⡀⢻⣿⣻⡇⠀⠀⠀
⠀⠀⠀⠀⡃⠍⢕⠐⠭⠭⢹⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡂⠄⠢⡡⡈⡂⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠢⡡⢙⢌⠢⠀⠀⠀⠀⠀
⠀⡀⣀⣤⣶⠡⢊⠕⡕⢍⣶⣦⣄⣀⠀
⣾⣿⣿⣿⣿⣿⣦⣵⣼⣾⣿⣿⣿⣿⣿
⣽⣿⣽⣾⣿⣾⣿⡿⣟⣿⣿⣟⣿⣟⣿
⣿⡿⣿⣿⣻⣿⣽⣿⣿⣿⡿⣿⣿⣿⣿

1. 팀장 김민종
   Role: Backend Developer
   About: 삼성 갈꺼니께~

⠀⠀⠀⠀⠀⠀⢀⢀⢀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⢔⣞⣞⣞⣞⢮⡢⡄⠀⠀⠀
⠀⠀⠀⢸⡳⡳⡱⢱⠹⢱⠹⡮⠀⠀⠀
⠀⠀⠀⢸⢰⡑⡎⡆⡇⣇⢣⠹⠀⠀⠀
⠀⠀⠀⠠⢡⠩⢣⠑⢌⠪⡊⠌⠀⠀⠀
⠀⠀⠀⠀⢕⢕⢱⢪⢢⠣⡪⡨⠀⠀⠀
⠀⠀⠀⠀⠡⡣⡓⡗⡕⢕⢕⠄⠀⠀⠀
⠀⠀⠀⢀⢌⢎⢦⡱⡬⡪⡊⡎⡄⡀⠀
⡄⡆⡎⡎⢎⢎⢎⢎⢎⢎⢎⢎⢎⢎⢆
⢎⢎⢎⢮⢘⢜⣜⣞⣎⢎⢎⢢⢣⢣⢣


2. 팀원 이예찬
   Role: Backend Developer
   About: 다이어트 3주차.. 예민지림 

⠀⠀⠀⢀⣴⢾⣿⣿⣽⢷⢦⡀⠀⠀⠀
⠀⠀⠀⣾⢽⣻⢳⢯⢟⣿⢽⣖⠀⠀⠀
⠀⠀⠀⣽⠻⡢⠣⡣⠫⠾⠿⡽⠀⠀⠀
⠀⠀⠀⠕⠈⠈⠂⠄⠑⠉⠄⠕⠀⠀⠀
⠀⠀⠀⠁⠌⢀⢑⠠⢁⠂⡐⠀⠀⠀⠀
⠀ ⠀ ⢈⠄⢂⠨⠐⡀⣂⠀⠀⠀
⠀⡀⣄⣴⣗⠁⠅⠊⠨⠐⢼⣧⣄⡀⡀
⣟⣿⣻⣽⣧⠁⠄⠁⠌⠠⢱⣿⣽⢿⣳
⣻⣽⣿⣽⣾⠄⠀⠀⠀⢀⣿⢷⡿⣟⣿

3. 팀원 이지언
   Role: Backend Developer
   About: https://trillium.tistory.com/

⠀⠀⠀⠀⠀⠀⡀⣀⢀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡠⣮⡻⣪⡳⣕⠄⠀⠀⠀⠀
⠀⠀⠀⢀⣟⢎⠂⠄⠉⢮⡳⡀⠀⠀⠀
⠀⠀⠀⢰⡻⡐⡔⢈⢐⠌⡿⡄⠀⠀⠀
⠀⠀⠀⣮⡣⢈⢐⠠⠐⢀⢹⣕⠀⠀⠀
⠀⠀⠀⣗⢧⢂⠆⡅⠌⢄⣞⢮⠀⠀⠀
⠀⠀⠰⡽⡽⡇⢇⠄⠕⣸⣺⢽⡅⠀⠀
⢀⣀⢼⢝⢽⢕⠡⠊⡐⢸⢮⢯⣳⣀⠀
⡳⡽⡽⡽⣝⠆⡁⠂⠄⢱⣝⣗⣗⢷⢽
⢯⢯⢯⡻⣮⡃⠠⢈⠀⢜⣞⣞⢮⢯⣳
⡯⣯⡳⣝⢮⡇⠠⠀⠀⣗⢷⢽⣝⣗⣗

4. 팀원 이예림
   Role: Frontend Developer
   About: 

⠀⠀⠀⠀⣠⡲⡽⡽⣽⡳⣄⡀⠀⠀⠀
⠀⠀⠀⣞⢮⢫⠹⡸⡐⢝⢜⣖⠄⠀⠀
⠀⠀⢸⢮⢳⠱⢱⢐⠌⠌⠦⡫⣇⠀⠀
⠀⠀⢼⢕⢈⠊⢂⠂⠨⠁⠅⠸⡸⠀⠀
⠀⠀⢽⢧⢂⢐⢐⠡⢈⢐⠠⣱⢽⠀⠀
⠀⠀⢽⢽⢧⢂⠅⢃⠡⠀⡦⡯⣯⡃⠀
⠀⠀⡯⡯⡯⣇⠪⡐⠄⢱⢽⣝⣞⣆⠀
⣔⢶⢽⢽⢽⡎⡂⢂⠁⢮⣻⣺⣺⡺⡦
⡯⡯⡯⡯⡯⣟⡶⣕⣞⣞⣞⣞⡮⡯⡯

5. 팀원 주효림
   Role: Backend Developer
   About: Expert in Python and cloud infrastructure.

                  </pre>
                <span style="padding: 5px; font-size: 15px;">
                  C:\&gt;
                  <a href="https://naver.com" style="color: lightblue">자세히보기</a>
                </span>
                <div style="height: 10px"/>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <HiddenListComponent :showModal="isHiddenOpen" @close-modal="closeHiddenModal"/>
</template>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Yanolja+Yawang&display=swap'); */
    
body {
  /* font-family:'Yanolja Yawang', 'Nanum Gothic', Arial, sans-serif;  */
    /* font-family: "Pixelated MS Sans Serif", Arial; */
    background-color: #0f0f0f;
    color: #00ff00;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

pre {
  background-color: #0f0f0f;
  border: none;
  box-shadow: inset -1px -1px #000000,inset 1px 1px grey,inset -2px -2px #000000,inset 2px 2px #0a0a0a
}



@font-face {
    font-family: "Pixelated MS Sans Serif", Arial;
    src: url(https://unpkg.com/98.css@0.1.16/dist/ms_sans_serif.woff) format("woff");
}


.console {
    width: 100%;
    height: 70vh;
    min-height: 100px;
    background-color: #000;
    /* border: 1px solid #c5bf00; */
    /* border-radius: 5px; */
    overflow: hidden;
    color: #fff; /* 모든 텍스트를 하얀색으로 설정 */
}

.console-body {
    height: calc(100%);
    overflow-y: auto;
    font-size: 15px;
}


.received {
  position: fixed;
  width: 800px;
  min-width: 100px;
  height: 60%;
  top: 35%;            /* 화면의 중앙에 위치 */
  left: 50%;           /* 화면의 중앙에 위치 */
  transform: translate(-50%, -50%); /* 정확한 중앙 */
}

/* 반응형 레이아웃 설정 */
@media (max-width: 800px) {
  .received {
    width: 500px;
  }
}

@media (max-width: 500px) {
  .received {
    width: 300px;
  }
}

.window-body {
  font-size: 13px;
  margin: 0
}

.inner-nav {
  margin-top: 0;
}

.inner-nav > span {
  margin-right: 1%;
}

.inner-tab {
  margin-top: 5px;
  border-style: groove;
}

.go-to-write {
  width: 10%;
  margin: 10px;
}

.side-bar {
  width: 20%;
  background-color: white;
}

.letter-area {
  width: 80%;
  margin-left: 5px;
  margin-bottom: 10px;
}
</style>
