
  
<template>
  <div class="letterWrite">
      <div style="display: inline">
          <h3>편지쓰기</h3>
      </div>
      <div style="display: inline">
          <p>{{ordinal}} + "기 " + {{region }} + " " + {{ban}} + "반 " + {{names}} + "에게.."</p>

          <textarea style="width: 300px; height: 100px;"/>
      </div>
      <div style="display: inline">
        <button @click="send">보내기</button>
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
    const names = ref(params.get('names'));
    const message = ref(''); // textarea 내용을 담을 변수

    const send = () => {
      axios.post('/api/sendLetterasdf', {
        ordinal: ordinal.value,
        region: region.value,
        ban: ban.value,
        names: names.value,
        message: message.value
      }).then(response => {
        console.log(response.data);
        alert("메시지 전송 성공!");
      }).catch(error => {
        console.error(error);
        alert("메시지 전송 실패 ㅜㅠ!");
      });
    };
    

    // 반환할 값들을 객체로 묶어서 반환
    return {
      ordinal,
      region,
      ban,
      names,
      send
    };
  }
}
</script>


<style scoped>

</style>

    