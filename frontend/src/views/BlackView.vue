<template>
    <div class="black">
        <img src="@/assets/hacked.png" alt="">
    </div>
</template>
<script setup>
localStorage.removeItem('accessToken');
</script>
<style scoped>
    .black {
        /* Footer 가리기용 */
        position: relative;
        z-index: 1;
    }

    img {
        width: 100%;
        height: 100vh;
    }
</style>