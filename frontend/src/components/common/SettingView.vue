<template>
    <div class="setting">
        <img src="@/assets/windows-98-logo.png" alt="windows-icon-img" width="15">
        <div class="start-menu">
            <router-link to="/ssafyworld">
                <img src="@/assets/windowsIcon/windows.png" alt="windows-icon-img" width="40" height="40">
                <p>바탕화면</p>
            </router-link>
            <div class="gotomypage-div" @click="openMypage">
                <img src="@/assets/windowsIcon/gears_tweakui_a-1.png" alt="windows-icon-img" width="40" height="40">
                <p>내 정보 수정</p>
            </div>
            <hr />
            <div @click="logout">
                <img src="@/assets/windowsIcon/ac_plug-0.png" alt="windows-icon-img" width="40" height="40">
                <p>로그아웃</p>
            </div>
            <router-link to="/login">
                <img src="@/assets/windowsIcon/recycle_bin_full_2k-2.png" alt="windows-icon-img" width="40" height="40">
                <p v-on:click="print">회원 탈퇴</p>
            </router-link>
            <router-link to="/blue" replace="">
                <img src="@/assets/windowsIcon/shut_down_normal-2.png" alt="windows-icon-img" width="40" height="40">
                <p v-on:click="print">시스템 종료</p>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from "vue";
    import {useRouter} from 'vue-router'

    const emit = defineEmits(["openMypage"]);

    const openMypage = () => {
        emit("openMypage");
    };

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("accessToken");
        router.push({name : 'LoginView'})
    }
    
</script>

<style scoped>
    .setting {
        width: 300px;
        height: 250px;
        background-color: #B8BCB8;
        border: 2px outset #DADADA;
        box-shadow: 1px 1px 0 black;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .start-menu {
        width: 95%;
    }

    .start-menu > a, .start-menu > div, .gotomypage-div {
        padding: 3px 10px;
        text-decoration: none;
        color: black;
        outline: none !important;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .start-menu > a:hover, .start-menu > div:hover , .gotomypage-div:hover {
        background-color: #000078;
        color: #F8FCF8;
    }

    .start-menu > a > p, .start-menu > div > p, .gotomypage-div > p {
        margin: 0;
        padding: 0 20px;
        font-size: medium;
    }

</style>