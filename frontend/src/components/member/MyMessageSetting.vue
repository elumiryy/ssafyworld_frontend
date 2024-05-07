<template>
    <div class="message">
        <div class="group-field">
            <div class="field-row">
                <input id="all" type="radio" name="range">
                <label for="all">누구나</label>
            </div>
            <div class="field-row">
                <input id="no" type="radio" name="range">
                <label for="no">수신 거부</label>
            </div>
        </div>
        <div class="group-field">
            <div class="field-row">
                <input id="ordinal" type="radio" name="range">
                <label for="ordinal">같은 기수만</label>
            </div>
            <div class="field-row">
                <input id="region" type="radio" name="range">
                <label for="region">같은 지역만</label>
            </div>
            <div class="field-row">
                <input id="ban" type="radio" name="range">
                <label for="ban">같은 반만</label>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .message {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .group-field {
        padding: 20px 0;
        display: flex;
        flex-direction: row;
    }
    
    .field-row {
        padding: 0 5px;
        margin: 0;
    }

    input, label {
        font-size: small;
    }
</style>