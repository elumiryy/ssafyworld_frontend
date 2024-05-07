<template>
    <div class="mypage">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">내 정보</div>
                <div class="title-bar-controls">
                    <button aria-label="Help"></button>
                    <button aria-label="Close" v-on:click="closwMypage()"></button>
                </div>
            </div>
            <div class="window-body">
                <div>
                    <menu role="tablist">
                        <!-- aria-selected="true" 왜 이 속성은 aria-selected="isSelectedMyInfo" 이게 안될까? -->
                        <li role="tab" @click="tabMyInfo()">내 정보</li>
                        <li role="tab" @click="tabMyInfoModify()">내 정보 수정</li>
                        <li role="tab" @click="tabMessage()">메시지</li>
                    </menu>
                </div>
                <div class="window" role="tabpanel">
                    <MyInfo v-if="isSelectedMyInfo" />
                    <MyInfoModify v-if="isSelectedMyInfoModify" />
                    <MyMessageSetting v-if="isSelectedMessage" />
                </div>
                <div class="page-btn-div">
                    <button>확인</button>
                    <button class="cancel-btn" v-on:click="closwMypage()">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MyInfo from '@/components/member/MyInfo.vue'
import MyInfoModify from '@/components/member/MyInfoModify.vue'
import MyMessageSetting from '@/components/member/MyMessageSetting.vue'
import { ref } from 'vue'

const isSelectedMyInfo = ref(true)
const isSelectedMyInfoModify = ref(false)
const isSelectedMessage = ref(false)

function closwMypage() {
    window.close()
}

function tabMyInfo() {
    isSelectedMyInfo.value = true
    isSelectedMyInfoModify.value = false
    isSelectedMessage.value = false
}

function tabMyInfoModify() {
    isSelectedMyInfo.value = false
    isSelectedMyInfoModify.value = true
    isSelectedMessage.value = false
}

function tabMessage() {
    isSelectedMyInfo.value = false
    isSelectedMyInfoModify.value = false
    isSelectedMessage.value = true
}
</script>

<style scoped>
    .mypage {
        background-color: #C3C2C3;
        height: 100vh;
        position: relative;
        z-index: 1;
    }

    .window {
        height: 100%;
        
    }

    .window-body {
        height: 60%;
    }

    .window-body > .window {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .window-body li {
        padding: 5px;
        cursor : default;
    }

    .page-btn-div {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
    }

    .cancel-btn {
        margin-left: 5px;
    }
</style>