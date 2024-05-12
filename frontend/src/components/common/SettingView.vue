<template>
    <div class="setting">
        <img src="@/assets/windows-98-logo.png" alt="windows-icon-img" width="15">
        <div class="start-menu">
            <router-link to="/signup">
                <img src="@/assets/windowsIcon/recycle_bin_full_cool-0.png" alt="windows-icon-img" width="40" height="40">
                <p v-on:click="print">회원 탈퇴</p>
            </router-link>
            <div class="gotomypage-div" @click="openMypage">
                <img src="@/assets/windowsIcon/users_key-4.png" alt="windows-icon-img" width="40" height="40">
                <p>내 정보 수정</p>
            </div>
            <hr />
            <router-link to="/ssafyworld">
                <img src="@/assets/windowsIcon/ac_plug-0.png" alt="windows-icon-img" width="40" height="40">
                <p>로그아웃</p>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from "vue";

    const emit = defineEmits(["openMypage"]);

    const openMypage = () => {
        emit("openMypage");
    };
    
</script>

<style>
    .setting {
        width: 300px;
        height: 200px;
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

    .start-menu > a, .gotomypage-div {
        padding: 3px 10px;
        text-decoration: none;
        color: black;
        outline: none !important;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .start-menu > a:hover, .gotomypage-div:hover {
        background-color: #000078;
        color: #F8FCF8;
    }

    .start-menu > a > p, .gotomypage-div > p {
        margin: 0;
        padding: 0 20px;
        font-size: medium;
    }

</style>