<template>
    <div class="login">
        <img class="background-img" src="@/assets/loginImg/login-background-2.png" alt="login-background-img">
        <img class="logo-img" src="@/assets/loginImg/ssafyworld-logo.png" alt="ssafyworld-logo-img">
        <button class="google-login-btn">구글 로그인</button>
    </div>
</template>

<script>
export default {
     
}
</script>

<style scoped>
    .login {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }   

    .background-img {
        width: 100%;
        height: 100vh;
        position: absolute;
    }

    .logo-img {
        width: 1000px;
        height: 150px;
        position: relative;
        z-index: 1;
    }

    .google-login-btn {
        width: 300px;
        height: 50px;
        font-size: large;
        background-color: white;
        position: relative;
        z-index: 1;
    }
</style>