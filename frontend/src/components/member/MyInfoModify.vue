<template>
    <div class="mymodify">
        <div class="guide">
            <img src="@/assets/windowsIcon/directory_admin_tools-5.png" alt="windows-icon-img" width="40" height="40">
            <p>내 정보 수정은 이름만 변경할 수 있습니다. 변경하고자 하는 사용자 이름과 본인 확인용 질문 그리고 답을 입력해 주십시오.</p>
        </div>
        <div class="field-row">

            <div class="mymodify-div">
                <label for="name">이름:</label>
                <input id="name" type="text" v-model="name"/>
            </div>

            <div class="mymodify-div">
                <label for="question">질문:</label>
                <select id="question" name="question" v-model="questionId">
                    <option :value="question.id" v-for="question in questions" :key=question.id>{{question.question}}</option>
                </select>
            </div>

            <div class="mymodify-div">
                <label for="answer">답: </label>
                <input class="answer-input" id="answer" type="text" v-model="answer"/>
            </div>
        </div>
        <button @click="update">수정</button>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const answer = ref("");
const name = ref("");
const questionId = ref(0);

const questions = ref([]);

async function getQuestions() {
    await axios.get(
            '/question',
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            }
        ).then(response => {
            questions.value = response.data;
        });
}

getQuestions();

async function update() {
   
    console.log(answer.value, name.value, questionId.value, accessToken)

    await axios.put(
        '/member'
        ,{
            name : name.value,
            questionId : questionId.value,
            answer : answer.value
        },{
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }
    );

    window.close();
}

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