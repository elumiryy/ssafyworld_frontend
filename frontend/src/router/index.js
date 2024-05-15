import {createRouter, createWebHistory} from "vue-router";
import axios from 'axios';

import MainView from '@/views/MainView.vue'
import SignupView from '@/views/member/SignupView.vue'
import SignupViewQA from '@/views/member/SignupViewQA.vue'
import LoginView from '@/views/member/LoginView.vue'
import FolderView from '@/views/letter/FolderView.vue'
import ChatView from '@/views/chat/ChatView.vue'
import ChatRoomView from '@/views/chat/ChatRoom.vue'
import MypageView from '@/views/member/MypageView.vue'
import LetterView from '@/views/letter/LetterView.vue'
import ReceivedLetterView from '@/views/letter/ReceivedLetterView.vue'
import LoadingComponent from '@/components/rollingpaper/LoadingComponent.vue'
import BlackView from '@/views/BlackView.vue'

const routes = [
  {
    path: '/',
    redirect: '/ssafyworld' 
  },
  {
    path:"/ssafyworld",
    name: "MainView",
    component: MainView
  },
  {
    path:"/signup",
    name: "SignupView",
    component: SignupView
  },
  {
    path:"/signupqa",
    name: "SignupViewQA",
    component: SignupViewQA
  },
  {
    path:"/login",
    name: "LoginView",
    component: LoginView
  },
  {
    path:"/folders",
    name: "FolderView",
    component: FolderView
  },
{    path:"/chat",
    name: "ChatView",
    component: ChatView
  },
  {
    path:'/chatroom',
    name:"chatroom",
    component : ChatRoomView
  },
  {
    path:"/mypage",
    name: "MypageView",
    component: MypageView
  },
  {
    path:"/letterWrite",
    name: "LetterWriteView",
    component: () => import('@/views/letter/LetterWriteView.vue')
  },
  {
    path:"/LetterView",
    name: "LetterView",
    component: LetterView
  },
  {
    path:"/loading",
    name: "LoadingComponent",
    component: LoadingComponent
  },
  {
    path: '/ReceivedLetter',
    name: 'ReceivedLetterView',
    component: ReceivedLetterView,
  },
  {
    path: '/black',
    name: 'BlackView',
    component: BlackView,
  },
  {
    path: '/:catchAll(.*)', //다른 라우터 전부 catch
    redirect: '/ssafyworld' 
  }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
      const httpStatus = error.response.status;
      const customCode = error.response.data.code;
        if (httpStatus === 401) {

            if(customCode === 'AUTH-001') {
              alert('세션이 만료되었습니다. 다시 로그인해주세요.')
              localStorage.removeItem('accessToken');
              router.push({name : 'LoginView'});
            } else {
              router.push({ name : "BlackView"})
            }            
        } else if (httpStatus === 403) {

          alert('접근 권한이 존재하지 않습니다.')
          router.push({ name : "MainView"})

        } else if(httpStatus === 400) {

          if(customCode === 'LETTER-007') {
            alert(`아직 편지를 볼 수 없어요!! : 2024년 5월 24일까지 기다려주세요!!`)
          }
        } else if(httpStatus === '404') {
            alert('페이지를 찾을 수 없어요 ㅠㅠ');
        } else {
          console.log("500에러는 개발자의 눈물....")
        }
        return Promise.reject(error);
    }
);


router.beforeEach(async (to, from, next) => {
  const openRoutes = ["LoginView", "SignupView", "SignupViewQA","BlackView"];

  if (!openRoutes.includes(to.name)) {
    let isAuthenticated = false;

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        await axios.get('/token', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        isAuthenticated = true; 
      } catch (error) {
        isAuthenticated = false; 
      }
    }

    if (!isAuthenticated) {
      return next({name:'LoginView'});
    }
  }

  next();
});


export {router}