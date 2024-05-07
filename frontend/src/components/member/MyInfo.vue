<template>
    <div class="myinfo">
        <div class="guide">
            <img src="@/assets/windowsIcon/address_book_card_users.png" alt="windows-icon-img" width="40" height="40">
            <p>아래의 정보는 사용자의 회원 정보입니다. 이름, 기수, 지역, 반, 본인확인 질문을 확인해 주십시오.</p>
        </div>
        <div class="field-row">
            <div class="myinfo-div">
                <label for="name">이름:</label>
                <input id="name" type="text" value="이예림" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="ordinal">기수:</label>
                <input id="ordinal" type="text" value="11" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="region">지역:</label>
                <input id="region" type="text" value="구미" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="ban">반:</label>
                <input id="ban" type="text" value="4" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="question">질문:</label>
                <input class="question-input" id="question" type="text" value="어렸을 적 살던 동네는?" disabled/>
            </div>
        </div>
    </div>
</template>

<script setup>

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