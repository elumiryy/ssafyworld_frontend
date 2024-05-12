<template>
    <div class="myinfo">
        <div class="guide">
            <img src="@/assets/windowsIcon/address_book_card_users.png" alt="windows-icon-img" width="40" height="40">
            <p>아래의 정보는 사용자의 회원 정보입니다. 이름, 기수, 지역, 반, 본인확인 질문을 확인해 주십시오.</p>
        </div>
        <div class="field-row">
            <div class="myinfo-div">
                <label for="name">이름:</label>
                <input id="name" type="text" :value="memberInfo.name" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="ordinal">기수:</label>
                <input id="ordinal" type="text" :value="memberInfo.ordinal" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="region">지역:</label>
                <input id="region" type="text" :value="memberInfo.region" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="ban">반:</label>
                <input id="ban" type="text" :value="memberInfo.ban" disabled/>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');


const memberInfo = ref({
  name: '',
  ordinal: '',
  region: '',
  ban: '',
  question: ''
});

// 회원 정보를 가져오는 함수
async function fetchMemberInfo() {
  try {
    const response = await axios.get(
        '/member/info',
        {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }

    );  
    const data = response.data;
    memberInfo.value = {
      name: data.memberInfo.name,
      ordinal: data.groupInfo.ordinal,
      region: data.groupInfo.region,
      ban: data.groupInfo.ban,
    };
  } catch (error) {
    console.error('Failed to fetch member information:', error);
  }
}

// 컴포넌트가 마운트될 때 회원 정보를 가져옴
onMounted(fetchMemberInfo);
</script>

<style scoped>
    .myinfo {
        width: 90%;
    }

    .guide {
        display: flex;
        flex-direction: row;
    }

    .guide > p {
        padding-left: 20px;
        font-size: small;
        word-break: break-all;
        line-height: 100%;
    }

    .field-row {
        display: flex;
        flex-direction: column;
    }

    .myinfo-div {
        width: 100%;
        padding: 5px 0;
        margin: 0;
        display: flex;
    }
    
    .myinfo-div > label, .myinfo-div > input {
        font-size: small;
    }

    .myinfo-div > label {
        width: 50px;
    }

    .myinfo-div > input:not(.question-input) {
        width: 50%;
    }

    .question-input {
        width: 90%;
    }
</style>