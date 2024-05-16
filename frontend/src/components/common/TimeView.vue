<template>
    <div class="time">
        *** 오늘은 
        {{ date.year }}년 
        {{ date.month }}월 
        {{ date.day }}일 ***
        <br>
        \\\ {{ weekString[date.dayWeek] }} 
        {{ week[date.dayWeek] }}요일입니다 ///
        <br>
        {{ week[date.dayWeek] }}요팅!!
    </div>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
    date: Object
})

const week = ['일', '월', '화', '수', '목', '금', '토']
const weekString = ['즐거운', '새로운', '활기찬', '힘나는', '화창한', '기대되는', '행복한']

</script>
<style scoped>
    .time {
        width: 200px;
        height: 60px;
        background-color: #B8BCB8;
        border: 2px outset #DADADA;
        box-shadow: 1px 1px 0 black;
        z-index: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        /* position: relative;
        
        display: flex;
        flex-direction: row;
        justify-content: space-between; */
    }
</style>