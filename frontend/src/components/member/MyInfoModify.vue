<template>
    <div class="mymodify">
        <div class="field-row">
            <div class="mymodify-div">
                <label for="name">이름</label>
                <input id="name" type="text"/>
            </div>
            <div class="mymodify-div">
                <label for="question">질문</label>
                <select id="question" name="question">
                    <option value="1">아버지 성함은?</option>
                    <option value="2">어렸을 적 살던 동네는?</option>
                    <option value="3">졸업한 초등학교 이름은?</option>
                    <option value="4">가장 친한 친구 이름은?</option>
                </select>
            </div>
            <div class="mymodify-div">
                <label for="answer">답</label>
                <input id="answer" type="text"/>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .field-row {
        display: flex;
        flex-direction: column;
    }

    .mymodify-div {
        width: 250px;
        padding: 5px 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    label, input, select {
        font-size: small;
    }

    input, select {
        width: 200px;
    }
</style>