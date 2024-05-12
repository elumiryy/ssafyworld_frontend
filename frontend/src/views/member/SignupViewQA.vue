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
                    <!-- <h3>사용자 정보</h3>
                    <h4>사용자의 이름과 기수, 지역, 반을 입력하여 주십시오.</h4> -->
                    <h3>사용자 정보</h3>
                    <h4>사용자 확인용 질문과 답을 입력하여 주십시오.</h4>
                    <br>
                    <form>
                        <div class="user-info-form">

                            <div>
                                <label for="question">질문</label>
                                <select id="question" name="question" v-model="question">
                                    <option value="1">당신이 어릴적 살던 동네는</option>
                                    <option value="2">당신의 초등학교 담임 선생님 이름은?</option>
                                    <option value="3">당신의 보물 1호는?</option>
                                    <option value="4">당신의 1학기 첫 페어는?</option>
                                    <option value="5">싸근피에서 제일 친해진 친구 이름은?</option>
                                    <option value="6">가장 가고 싶은 회사는?</option>
                                    <option value="7">현재 교육받는 장소 말고 가보고 싶은 교육 장소는?</option>
                                    <option value="8">지금 가장 생각나는 음식은?</option>
                                </select>
                            </div>

                            <div>
                                <label for="answer">답</label>
                                <input type="text" id="answer" name="answer" v-model="answer" />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        
            <div class="signup-hr">
                <hr />
            </div>
          

            <div class="page-btn-div">
                <button v-on:click="prevStep">&lt; 뒤로(B)</button>
                <button v-on:click="finish">완료</button>
                <button v-on:click="cancel">취소</button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      question: '',
      answer: '',
      groupInfoId: null
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo',
      sub: 'getUserSub'
    })
  },
  created() {
  console.log("sub from Vuex in SignupViewQA:", this.sub); // 컴포넌트 생성 시 sub 로깅
},
  methods: {
    logSub() {
    console.log(this.sub);  // 여기에서 `this.sub`은 계산된 속성의 값을 로그합니다.
  },
    prevStep() {
      this.$router.push('/signup');
    },
    cancel() {
      this.$router.push('/ssafyworld');
    },
    extractNumberFromBan(ban) {
      const matches = ban.match(/\d+/);
      return matches ? parseInt(matches[0], 10) : null;
    },
    async finish() {
      this.logSub();
      try {
        const numericBan = this.extractNumberFromBan(this.userInfo.ban);
        const groupInfoResponse = await axios.get('/groupInfo', {
          params: {
            ordinal: this.userInfo.ordinal,
            region: this.userInfo.region,
            ban: numericBan
          }
        });

        if (groupInfoResponse.data) {
          this.groupInfoId = groupInfoResponse.data;
          console.log("Fetched groupInfoId:", this.groupInfoId);
        } 

        const now = new Date().toISOString();

        const registrationData = {
          sub: this.sub,
          provider: 'google',
          name: this.userInfo.name,
          serialNumber: 'adssda',
          questionId: this.question,
          answer: this.answer,
          groupInfoId: this.groupInfoId,
          createdAt: now,  // createdAt에 현재 시간 설정
          updatedAt: now   // updatedAt에 현재 시간 설정
        };

        console.log("Registration data:", registrationData);

        const registerResponse = await axios.post('/member/register', registrationData);
        console.log('Registration successful', registerResponse);
        this.$router.push({ name: 'LoginView' });
      } catch (error) {
        console.error('Error in registration or fetching group info:', error);
      }
    }
  }
};
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
        width: 300px;
        height: 30px;
        font-size: medium;
    }

    .window-body, .signup-hr, .page-btn-div {
        padding: 0 10px;
    }
</style>