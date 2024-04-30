<template lang="">
    <div class="main">
        <router-link to="/login">
            <div class="windows-icon-div">
                <img src="@/assets/windowsIcon/computer_explorer-4.png" alt="windows-icon-img" width="50" height="50">
                <p>내 컴퓨터</p>
            </div>
        </router-link>
    </div>
</template>

<script setup>


</script>

<style>

    .main {
        height: 100vh;
        background-color: #008080;
    }

    .main > a {
        outline: none;
        text-decoration: none;
    }

    .windows-icon-div {
        width: 60px;
        padding: 5px;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .windows-icon-div > p {
        margin: 0;
        padding: 1px 0;
        color: #F8FCF8;
        font-size: small;
    }

</style>