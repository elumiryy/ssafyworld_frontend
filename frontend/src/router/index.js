import {createRouter, createWebHistory} from "vue-router";
import MainView from '@/views/MainView.vue'
import SignupView from '@/views/member/SignupView.vue'
import SignupViewQA from '@/views/member/SignupViewQA.vue'
import LoginView from '@/views/member/LoginView.vue'
import ChatView from '@/views/chat/ChatView.vue'
import ChatRoomView from '@/views/chat/ChatRoom.vue'
import MypageView from '@/views/member/MypageView.vue'

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
    path:"/chat",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export {router}