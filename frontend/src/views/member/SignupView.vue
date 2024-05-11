<template>
  <div class="signup">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">싸피월드 가입 마법사</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>

      <div class="window-body">
        <img src="@/assets/windows-wizard.png" alt=""> <!-- 이미지 -->
        <div class="user-info-div">
          <h3>사용자 정보</h3>
          <h4>사용자 정보를 입력해 주시기 바랍니다.</h4>
          <br>
          <form>
            <div class="user-info-form">
              <div>
                <label for="name">이름</label>
                <input type="text" id="name" name="name" v-model="name" />
              </div>
              <div>
                <label for="ordinal">기수</label>
                <select id="ordinal" name="ordinal" v-model="ordinal">
                  <option value="11" selected>11기</option>
                </select>
              </div>
              <div>
                <label for="region">지역</label>
                <select id="region" name="region" v-model="region" @change="updateBans">
                  <option value="서울">서울</option>
                  <option value="대전">대전</option>
                  <option value="구미">구미</option>
                  <option value="부울경">부울경</option>
                  <option value="광주">광주</option>
                </select>
              </div>
              <div>
                <label for="ban">반</label>
                <select id="ban" name="ban" v-model="ban">
                  <option v-for="item in bans" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    
      <div class="signup-hr">
        <hr />
      </div>

      <div class="page-btn-div">
        <button v-on:click="nextStep">다음 &gt; </button>
        <button v-on:click="cancel">취소</button>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store/signup';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const sub = route.params.sub; // 이곳에서만 `sub`를 정의하고 사용

    return {
      sub
    };
  },
    data() {
    return {
     
      name: '', 
      ordinal: '11',
      region: '서울', 
      ban: '', 
      banOptions: {
        '서울': Array.from({ length: 22 }, (_, i) => `${i + 1}반`),
        '대전': Array.from({ length: 8 }, (_, i) => `${i + 1}반`),
        '구미': Array.from({ length: 6 }, (_, i) => `${i + 1}반`),
        '부울경': Array.from({ length: 4 }, (_, i) => `${i + 1}반`),
        '광주': Array.from({ length: 6 }, (_, i) => `${i + 1}반`)
      },
      bans: []
    };
  },
 
  created() {
    
    this.updateBans();
  },
    methods: {
    updateBans() {
      this.bans = this.banOptions[this.region]; 
      this.ban = ''; 
    },
    saveUserInfo() {
      store.commit('setUserInfo', {
        name: this.name,
        ordinal: this.ordinal,
        region: this.region,
        ban: this.ban
      });
    },
    nextStep() {
      this.saveUserInfo(); // 수정: 메소드 실행
      this.$router.push('/signupqa');
    },
    cancel() {
      this.$router.push('/ssafyworld');
    }
  }
}
</script>

<style scoped>
    .signup {
        height: 100vh;
        background-color: #000060;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .window {
        width: 900px; 
        height: 600px;
        padding-bottom: 10px;
        border: 1px solid white;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .window-body {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .window-body > img {
        width: 250px;
        border: 2px solid black;
    }

    .title-bar-text {
        font-size: medium;
        padding: 0 10px;
    }

    .page-btn-div {
        display: flex;
        justify-content: flex-end;
    }

    .page-btn-div > button {
        color: black;
    }

    .user-info-div {
        width: 60%;
    }
    
    .user-info-form > div {
        height: 50px;
    }

    .user-info-form > div > label {
        width: 80px;
        padding: 5px 10px;
        font-size: large;
        font-weight: bold;
    }

    .user-info-form > div > input, select, option {
        width: 200px;
        height: 30px;
        font-size: medium;
    }

    .window-body, .signup-hr, .page-btn-div {
        padding: 0 10px;
    }
</style>
