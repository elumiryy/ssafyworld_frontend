<template>
    <div class="mymodify">
        <div class="guide">
            <img src="@/assets/windowsIcon/directory_admin_tools-5.png" alt="windows-icon-img" width="40" height="40">
            <p>내 정보 수정은 이름만 변경할 수 있습니다. 변경하고자 하는 사용자 이름과 본인 확인용 질문 그리고 답을 입력해 주십시오.</p>
        </div>
        <div class="field-row">
            <div class="mymodify-div">
                <label for="name">이름:</label>
                <input id="name" type="text"/>
            </div>
            <div class="mymodify-div">
                <label for="question">질문:</label>
                <select id="question" name="question">
                    <option value="1">아버지 성함은?</option>
                    <option value="2">어렸을 적 살던 동네는?</option>
                    <option value="3">졸업한 초등학교 이름은?</option>
                    <option value="4">가장 친한 친구 이름은?</option>
                </select>
            </div>
            <div class="mymodify-div">
                <label for="answer">답:</label>
                <input class="answer-input" id="answer" type="text"/>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .mymodify {
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

    .mymodify-div {
        width: 100%;
        padding: 5px 0;
        margin: 0;
        display: flex;
    }

    label, input, select {
        font-size: small;
    }

    .mymodify-div > label {
        width: 50px;
    }

    .mymodify-div > input:not(.answer-input) {
        width: 50%;
    }

    .answer-input, select {
        width: 90%;
    }
</style>