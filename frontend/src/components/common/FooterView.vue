<template>
    <div>
        <!-- <SettingView v-if="isSettingVisible" /> -->

        <div id="footer">
            <!-- <button class="footer-start-btn" v-on:click="startBtnClick"> -->
            <div class="footer-left">
                <button class="footer-start-btn" @click="$emit('openStartModal')">
                    <img src="@/assets/windowsIcon/windows.png" alt="windows-icon-img" width="30" height="30">
                    <p class="footer-start-p">시작</p>
                </button>
                <div class="footer-icons">
                    <hr>
                    <div style="display: flex; align-items: center;">
                        <button class="footerBtn" @click="$emit('open-not-complete-modal')">
                            <img src="@/assets/windowsIcon/desktop-1.png" alt="windows-icon-img" width="25" height="25" style="padding: 0">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete-modal')">
                            <img src="@/assets/windowsIcon/clean_drive-4.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete-modal')">
                            <img src="@/assets/windowsIcon/msie1-2.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete-modal')">
                            <img src="@/assets/windowsIcon/console_prompt-0.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete-modal')">
                            <img src="@/assets/windowsIcon/game_mine_1-0.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete-modal')">
                            <img src="@/assets/windowsIcon/game_freecell-1.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="footer-right">
                <div class="footer-icons">
                    <hr>
                    <div>
                        <button class="footerBtn" @click="$emit('open-not-complete2-modal')">
                            <img src="@/assets/windowsIcon/font_bitmap-0.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete2-modal')">
                            <img src="@/assets/windowsIcon/printer_question-4.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                        <button class="footerBtn" @click="$emit('open-not-complete2-modal')">
                            <img src="@/assets/windowsIcon/loudspeaker_rays-0.png" alt="windows-icon-img" width="25" height="25">
                        </button>
                    </div>
                    <hr>
                </div>
                <button class="footer-time-div" @click="$emit('openTimeModal', year, month, day, dayWeek)">
                    <p class="footer-time-p">{{ampm}}</p>
                    <p class="footer-time-p">{{time}}</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import SettingView from '@/components/common/SettingView.vue'

export default {
    name: 'FooterView',
    // components: {
    //     SettingView
    // },
    data() {
        return {
            year: '',
            month: '',
            day: '',
            dayWeek: '',
            ampm: '',
            time: '',
            // isSettingVisible: false
        };
    },
    created() {
        setInterval(() => this.getNow(), 1000)
    },
    methods: {
        getNow() {
            const date = new Date()

            this.year = date.getFullYear()
            this.month = ('0' + (date.getMonth() + 1)).slice(-2)
            this.day = ('0' + date.getDate()).slice(-2)
            this.dayWeek = date.getDay()

            // 오전, 오후 표시
            this.ampm = date.getHours() >= 12 ? '오후' : '오전'

            // 시분(00:00) 표시
            this.time = `${String(date.getHours() % 12 || 12).padStart(2, '0')}:${String(
                date.getMinutes()
            ).padStart(2, '0')}`  
        }
    },
};
</script>

<style scoped>
    @import "https://unpkg.com/98.css";

    .footerBtn {
        all: unset; /* 외부 스타일시트 다 무시 */
        padding:0; margin: 0; min-width: 25px; max-height: 25px; height: 25; width: 25;
        text-shadow: none;
    }

    #footer {
        width: 100%;
        height: 40px;
        padding: 0;
        background-color: #C0C0C0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-left, .footer-right {
        display: flex;
    }

    .footer-icons {
        display: flex;
        flex-direction: row;
    }

    .footer-icons > hr {
        margin: 0 10px;
        padding: 0 1px;
    }

    .footer-icons > div {
        display: flex;
        align-items: center;
    }

    .footer-icons img {
        padding: 0 3px;
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

    .footer-time-div {
        padding: 6px 0;
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

    .text-decorate {
        display: none;
    }

</style>