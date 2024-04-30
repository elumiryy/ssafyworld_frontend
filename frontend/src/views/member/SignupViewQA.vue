<template>
    <div class="signup">
        <div class="window">

            <div class="title-bar">
                <div class="title-bar-text">ssafyworld 사용자 설정</div>
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
                    <h3>User Info</h3>
                    <h4>사용자 확인용 질문과 답을 입력하여 주십시오.</h4>
                    <br>
                    <form>
                        <div class="user-info-form">

                            <div>
                                <!-- <label for="question">질문 : </label> -->
                                <label for="question">question</label>
                                <select id="question" name="question">
                                    <option value="a">아버지 성함은?</option>
                                    <option value="b">어렸을 적 살던 동네는?</option>
                                    <option value="d">졸업한 초등학교 이름은?</option>
                                    <option value="c">가장 친한 친구 이름은?</option>
                                </select>
                            </div>

                            <div>
                                <!-- <label for="answer">답 : </label> -->
                                <label for="answer">answer</label>
                                <input type="text" id="answer" name="answer" />
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
export default {
    methods: {
        prevStep() {
            this.$router.push('/signup')
        },
        cancel() {
            this.$router.push('/ssafyworld')
        },
        finish() {
            this.$router.push('/ssafyworld')
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
        /* SettingView에 가려져서 버튼 클릭 안됨 문제 일시 해결한 것. 추후 주석 해제 필요 */
        /* align-items: center; */
    }

    .window {
        width: 900px; 
        height: 600px;
        padding-bottom: 10px;
        border: 1px solid white;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: spacee-between;
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
        font-size: small;
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