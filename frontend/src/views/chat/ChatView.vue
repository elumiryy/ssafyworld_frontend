<template>
    <div class="signup">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">채팅방 입장</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>

            <div class="window-body">
                <img src="@/assets/windows-wizard.png" alt=""> 
                <div class="user-info-div">
                    <h3>채팅방 정보</h3>
                    <h4>입장할 채팅방을 입력해주세요.</h4>
                    <br>
                    <form>
                        <div class="user-info-form">
                            <div>
                                <label for="ordinal">기수</label>
                                <select v-model="selectOrdinal">
                                    <option v-for="ordinal in ordinals" :value="ordinal" :key="ordinal">{{ordinal}}</option>
                                </select>
                            </div>

                            <div>
                                <label for="region">지역</label>
                                <select v-model="selectRegion">
                                    <option :value="region" v-for="region in regions" :key="region">{{region}}</option>
                                </select>
                            </div>

                            <div>
                                <label for="ban">반</label>
                                <select v-model="selectBan">
                                    <option :value="ban" v-for="ban in bans" :key="ban">{{ban}}</option>
                                </select>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        
            <div class="signup-hr">
                <hr />
            </div>

            <div class="page-btn-div">
                <button v-on:click="finish">완료</button>
                <button v-on:click="cancel">취소</button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        const ordinals = [11];
        const regions = ['구미', '광주','대전','부산','서울'];
        const bans = [1,2,3,4,5,6,7,8,9,10];

        const selectOrdinal = '선택해주세요';
        const selectRegion = '선택해주세요';
        const selectBan = '선택해주세요';

        return {
            ordinals,regions,bans, selectOrdinal,selectRegion,selectBan
        }
    },
    methods: {
        cancel() {
            this.$router.push('/')
        },
        finish() {
            console.log(this.selectOrdinal, this.selectRegion, this.selectBan);
            this.getChatRoomId();
        },
        setOrdinal(event) {
            this.selectOrdinal = event.target.value;
        },
        setRegion(event) {
            this.selectRegion = event.target.value;
        },
        setBan(event) {
            this.selectBan = event.target.value;
        },
        async getChatRoomId() {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if(accessToken !== null) {
                    const response = await axios.get(
                        `/groupInfo?ordinal=${this.selectOrdinal}&region=${this.selectRegion}&ban=${this.selectBan}`,
                        {
                            headers : {
                                Authorization : `Bearer ${accessToken}`,
                            }
                        }
                    );

                    if(response.code !== 404) {
                        const chatRoomId = response.data;

                        this.$router.push(`/chatroom?chatRoomId=${chatRoomId}`);
                    } else {
                        console.error("fail");
                    }

                } else {
                    console.error("accessToken is null ");
                }
            } catch(error) {
                console.log('can not find chatroom : ' + error);
            }
        },
        async enterChatRoom() {

        },
    }
}

</script>

<style scoped>
    .signup {
        height: 100vh;
        background-color: #000060;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .window {
        width: 900px; 
        height: 600px;
        padding-bottom: 10px;
        border: 1px solid white;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .window-body {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .window-body > img {
        width: 250px;
        border: 2px solid black;
    }

    .title-bar-text {
        font-size: medium;
        padding: 0 10px;
    }

    .page-btn-div {
        display: flex;
        justify-content: flex-end;
    }

    .page-btn-div > button {
        color: black;
    }

    .user-info-div {
        width: 60%;
    }
    
    .user-info-form > div {
        height: 50px;
    }

    .user-info-form > div > label {
        width: 80px;
        padding: 5px 10px;
        font-size: large;
        font-weight: bold;
    }

    .user-info-form > div > input, select, option {
        width: 300px;
        height: 30px;
        font-size: medium;
    }

    .window-body, .signup-hr, .page-btn-div {
        padding: 0 10px;
    }
</style>