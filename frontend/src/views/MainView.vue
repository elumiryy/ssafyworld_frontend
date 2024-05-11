<template lang="">
    <div class="main">
        <div class="windows-icon-div">
            <router-link to="/login">
                <img src="@/assets/windowsIcon/computer_explorer-4.png" alt="windows-icon-img" width="50" height="50">
                <p>내 컴퓨터</p>
            </router-link>
        </div>
        <div class="windows-icon-div">
            <router-link to="/chat">
                <img src="@/assets/windowsIcon/windows.png" alt="windows-icon-img" width="50" height="50">
                <p>채팅방</p>
            </router-link>
        </div>
        <div class="windows-icon-div">
            <div @click="goToChatRoom">
                <img src="@/assets/windowsIcon/windows.png" alt="windows-icon-img" width="50" height="50">
                <p>채팅방 입장</p>
            </div>
        </div>
        <div class="windows-icon-div">
            <router-link to="/LetterView">
                <img src="@/assets/windowsIcon/directory_closed-4.png" alt="windows-icon-img" width="50" height="50">
                <p>편지쓰기</p>
            </router-link>
        </div>
    </div>
</template>

<script setup>
const goToChatRoom = () => {
    window.open("/chatroom", "_blank", "width=550, height=400, left=550, top=250");
}

</script>

<style scoped>

    .main {
        height: 100vh;
        background-color: #008080;
    }

    .windows-icon-div {
        width: 60px;
        padding: 15px;
    }

    .windows-icon-div > a {
        text-decoration: none;
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .windows-icon-div p {
        margin: 0;
        padding: 1px 0;
        color: #F8FCF8;
        font-size: small;
    }

</style>