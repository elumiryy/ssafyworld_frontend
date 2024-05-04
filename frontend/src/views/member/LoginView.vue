
<template>
    <div class="login">
        <img class="background-img" src="@/assets/loginImg/login-background-2.png" alt="login-background-img">
        <img class="logo-img" src="@/assets/loginImg/ssafyworld-logo.png" alt="ssafyworld-logo-img">
        <button class="google-login-btn" @click="login">구글 로그인</button>
    </div>
</template>

<script>
import { googleSdkLoaded } from "vue3-google-login";
import axios from "axios";

export default {
 data() {
    return {
      userDetails: null
    };
  },
  name: "YourComponent",
  methods: {
    login() {
      googleSdkLoaded(google => {
        google.accounts.oauth2
          .initCodeClient({
            client_id:process.env.VUE_APP_CLIENT_ID,
            scope: "email profile",
            redirect_uri: "http://localhost:8080/auth/callback",
            callback: response => {
              if (response.code) {
                this.sendCodeToBackend(response.code);
              }
            }
          })
          .requestCode();
      });
    },
    async sendCodeToBackend(code) {
      try {
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            code,
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            redirect_uri: "postmessage",
            grant_type: "authorization_code"
          }
        );

        const accessToken = response.data.access_token;

        // Fetch user details using the access token
        const userResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const sub = userResponse.data.sub
        const provider = 'google'

        const serverResponse = await axios.post(
            "/member/login",
            {
                sub,
                provider
            }
        );

        if(serverResponse.code === 404) {
            //route code
            console.log(serverResponse.data);
        } else {
            const jwt = serverResponse.data;
            localStorage.setItem("accessToken", jwt);
        }

      } catch (error) {
        console.error("Token exchange failed:", error.response.data);
      }
    }
  }
};
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