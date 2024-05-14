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
import BlueScreenView from '@/views/error/BlueScreen.vue'

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
  {
    path: '/blue',
    name: 'BlueScreen',
    component: BlueScreenView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach(async (to, from, next) => {
  const openRoutes = ["LoginView", "SignupView", "SignupViewQA"];

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
      return next({ name: 'LoginView' });
    }
  }

  next();
});

export {router}