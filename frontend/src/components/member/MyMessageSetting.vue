<template>
    <div class="mymessage">
        <div class="guide">
            <img src="@/assets/windowsIcon/file_question.png" alt="windows-icon-img" width="40" height="40">
            <p>사용자는 나에게 메시지를 전달할 수 있는 사람의 범위를 지정할 수 있습니다. 희망하는 수신 범위를 선택해 주십시오.</p>
        </div>
        <div class="content-div">
            <p>메시지 수신 범위:</p>
            <div>
                <div class="group-field">
                    <div class="field-row">
                        <input id="all" type="radio" name="range">
                        <label for="all">누구나</label>
                    </div>
                    <div class="field-row">
                        <input id="no" type="radio" name="range">
                        <label for="no">수신 거부</label>
                    </div>
                </div>
                <div class="group-field">
                    <div class="field-row">
                        <input id="ordinal" type="radio" name="range">
                        <label for="ordinal">같은 기수만</label>
                    </div>
                    <div class="field-row">
                        <input id="region" type="radio" name="range">
                        <label for="region">같은 지역만</label>
                    </div>
                    <div class="field-row">
                        <input id="ban" type="radio" name="range">
                        <label for="ban">같은 반만</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .mymessage {
        width: 90%;
        /* height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center; */
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

    .content-div {
        display: flex;
        flex-direction: row;
    }

    .content-div > p {
        padding: 10px 10px;
        margin: 0;
        font-size: small;
    }

    .group-field {
        padding: 5px 0;
        display: flex;
        flex-direction: row;
    }
    
    .field-row {
        padding: 0 5px;
        margin: 0;
    }

    input, label {
        font-size: small;
    }
</style>