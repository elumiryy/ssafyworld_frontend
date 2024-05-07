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
    </div>
</template>

<script setup>


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