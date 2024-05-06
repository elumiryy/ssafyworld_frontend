import {createRouter, createWebHistory} from "vue-router";
import MainView from '@/views/MainView.vue'
import SignupView from '@/views/member/SignupView.vue'
import SignupViewQA from '@/views/member/SignupViewQA.vue'
import LoginView from '@/views/member/LoginView.vue'
import FolderView from '@/views/letter/FolderView.vue'

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export {router}