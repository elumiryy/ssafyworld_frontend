import {createRouter, createWebHistory} from "vue-router";
import MainView from '@/views/MainView.vue'
import SignupView from '@/views/member/SignupView.vue'
import SignupViewQA from '@/views/member/SignupViewQA.vue'

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export {router}