<template>
<div class="footer">
    <button class="footer-start-btn">
        <img src="@/assets/windowsIcon/windows.png" alt="windows-icon-img" width="30" height="30">
        <p class="footer-start-p">시작</p>
    </button>
    <button class="footer-time-div">
        <p class="footer-time-p">{{ampm}}</p>
        <p class="footer-time-p">{{time}}</p>
    </button>
</div>
</template>

<script>
export default {
    name: 'FooterView',
    data() {
        return {
            ampm: '',
            time: ''
        }
    },
    created() {
        setInterval(() => this.getNow(), 1000)
    },
    methods: {
        getNow() {
            const date = new Date()

            // 오전, 오후 표시
            this.ampm = date.getHours() >= 12 ? '오후' : '오전'

            // 시분(00:00) 표시
            this.time = `${String(date.getHours() % 12 || 12).padStart(2, '0')}:${String(
                date.getMinutes()
            ).padStart(2, '0')}`
            
        }
    },
}
</script>

<style scoped>

@import "https://unpkg.com/98.css";

.footer {
    width: 100%;
    height: 40px;
    padding: 0;
    background-color: #C0C0C0;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-start-btn, .footer-time-div {
    height: 80%;
    padding: 0 5px;
    margin: 0 3px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.footer-start-p {
    margin: 0;
    font-size: medium;
    font-weight: bolder;
}

.footer-time-p {
    margin: 0;
    font-size: small;
}

</style>