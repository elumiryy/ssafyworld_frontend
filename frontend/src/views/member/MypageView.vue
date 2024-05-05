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
                        <li role="tab" aria-selected="true">내 정보</li>
                        <li role="tab">메시지</li>
                    </menu>
                </div>
                <div class="window" role="tabpanel">
                    <MyInfo />
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

function closwMypage() {
    window.close()
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