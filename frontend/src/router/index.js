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

const routes = [
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach(async  (to,from) => {
  if(to.name !== "LoginView") {
    let isAuthentication = false;

    const setAuthentication = (flag) => {
      isAuthentication = flag;
    }
  
    const accessToken = localStorage.getItem('accessToken');
    to,from;
  
    await axios.get(
      '/token',
      {
        headers : {
          Authorization : `Bearer ${accessToken}`
        }
      }
    )
    .then(() => setAuthentication(true))
    .catch(() => setAuthentication(false))
  
    if(!isAuthentication) {
      return {name : 'LoginView'}
    }
  } 
})

export {router}