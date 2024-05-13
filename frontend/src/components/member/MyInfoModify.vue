<template>
    <div class="mymodify">
        <ErrorModal
        v-if="showModal"
        :title="modalTitle"
        :message="modalMessage"
        :success="modalSuccess"
        @close="handleModalClose"
        />
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
        <div class="btn-div">
            <button @click="update">수정</button>
        </div>
    </div>
</template>

<script setup>
import {ref, defineEmits} from 'vue';
import axios from 'axios';
import ErrorModal from '@/views/error/ErrorModal.vue';


const accessToken = localStorage.getItem('accessToken');
const answer = ref("");
const name = ref("");
const questionId = ref(0);

const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
const modalSuccess = ref(false);

const emit = defineEmits(['closeMypage']);

function handleModalClose() {
  showModal.value = false;
  emit('closeMypage');
}


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
    try {
        await axios.put('/member/name', {
            name: name.value,
            questionId: questionId.value,
            answer: answer.value
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        modalTitle.value = '성공';
        modalMessage.value = '회원 정보가 수정되었습니다.';
        modalSuccess.value = true;
    } catch (error) {
        modalTitle.value = '실패';
        modalMessage.value = '회원 정보 수정에 실패했습니다.';
        modalSuccess.value = false;
    }
    showModal.value = true;
}


</script>

<style scoped>
    .errorModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    z-index: 1000; /* 충분히 높은 값 */
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .window {
    position: relative; /* 부모인 .errorModal에 대해서 위치 지정 */
    z-index: 1001;
    }
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

    .btn-div {
        width: 100%;
        padding: 20px 0;
        display: flex;
        justify-content: flex-end;
    }
</style>