<template lang="">
<div>
    <div>
        <button class="windows-icon-btn" @click="iconClick" ref="iconBtn">
            <img src="@/assets/windowsIcon/computer_explorer-4.png" alt="windows-icon-img" width="50" height="50">
            <p>내 컴퓨터</p>
        </button>
    </div>
</div>
</template>

<script setup>

function iconClick(event) {
    if (event.target.tagName == "BUTTON")
        event.target.style.border = "1px dotted black";
    else
        event.target.parentElement.style.border = "1px dotted black";
}

</script>

<style>

    body {
        height: 100%;
        margin: 0;
        overflow: hidden;
        background-color: #008080;
    }
    
    .windows-icon-btn {
        background-color: transparent;
        border: none;
    }

</style>