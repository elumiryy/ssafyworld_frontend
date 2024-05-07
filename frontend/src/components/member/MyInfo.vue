<template>
    <div class="myinfo">
        <div class="field-row">
            <div class="myinfo-div">
                <label for="name">이름</label>
                <input id="name" type="text" value="이예림" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="ordinal">기수</label>
                <input id="ordinal" type="text" value="11" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="region">지역</label>
                <input id="region" type="text" value="구미" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="ban">반</label>
                <input id="ban" type="text" value="4" disabled/>
            </div>
            <div class="myinfo-div">
                <label for="question">질문</label>
                <input id="question" type="text" value="어렸을 적 살던 동네는?" disabled/>
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

    .myinfo-div {
        width: 250px;
        padding: 5px 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .myinfo-div > label, .myinfo-div > input {
        font-size: small;
    }

    .myinfo-div > input {
        width: 200px;
    }
</style>