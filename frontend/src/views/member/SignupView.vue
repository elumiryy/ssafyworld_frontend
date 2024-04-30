<template>
    <div class="signup">
        <div class="window">

            <div class="title-bar">
                <div class="title-bar-text">Windows 98 설치 마법사</div>
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
                    <h4>사용자의 이름과 기수, 지역, 반을 입력하여 주십시오.</h4>
                    <br>
                    <form>
                        <div class="user-info-form">

                            <div>
                                <label for="name">이름 : </label>
                                <input type="text" id="name" name="name" />
                            </div>

                            <div>
                                <label for="ordinal">기수 : </label>
                                <select id="ordinal" name="ordinal">
                                    <option value="9">9기</option>
                                    <option value="10">10기</option>
                                    <option value="11">11기</option>
                                    <option value="12">12기</option>
                                </select>
                            </div>

                            <div>
                                <label for="region">지역 : </label>
                                <select id="region" name="region">
                                    <option value="서울">서울</option>
                                    <option value="대전">대전</option>
                                    <option value="구미">구미</option>
                                    <option value="부울경">부울경</option>
                                    <option value="광주">광주</option>
                                </select>
                            </div>

                            <div>
                                <label for="ban">반&nbsp;&nbsp;&nbsp; : </label>
                                <select id="ban" name="ban">
                                    <option value="1반">1반</option>
                                    <option value="2반">2반</option>
                                    <option value="3반">3반</option>
                                    <option value="4반">4반</option>
                                    <option value="5반">5반</option>
                                    <option value="6반">6반</option>
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
                <button onclick="prevStep()">&lt; 뒤로(B)</button>
                <button onclick="nextStep()">다음 &gt; </button>
                <button onclick="cancel()">취소</button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    
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
        height:600px;
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
        font-size: small;
        padding: 0 10px;
    }

    .page-btn-div {
        display: flex;
        justify-content: flex-end;
    }
    
    .user-info-form > div {
        height: 50px;
    }

    .user-info-form > div > label {
        width: 50px;
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