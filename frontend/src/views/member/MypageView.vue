<template>
  <div class="mypage" v-if="isOpenMypage">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">내 정보</div>
        <div class="title-bar-controls">
          <button aria-label="Help"></button>
          <button aria-label="Close" @click="closeMypage"></button>
        </div>
      </div>
      <div class="window-body">
        <div>
          <menu role="tablist">
            <li role="tab" :aria-selected="isSelectedMyInfo" @click="tabMyInfo()">내 정보</li>
            <li role="tab" :aria-selected="isSelectedMyInfoModify" @click="tabMyInfoModify()">내 정보 수정</li>
          </menu>
        </div>
        <div class="window" role="tabpanel">
          <MyInfo v-if="isSelectedMyInfo" />
          <MyInfoModify v-if="isSelectedMyInfoModify" @closeMypage="closeMypage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyInfo from '@/components/member/MyInfo.vue'
import MyInfoModify from '@/components/member/MyInfoModify.vue'
import { defineProps, defineEmits, ref } from "vue";

defineProps({
    isOpenMypage: Boolean,
});

const emit = defineEmits(["closeMypage"]);

const closeMypage = () => {
  emit("closeMypage");
};

const isSelectedMyInfo = ref(true);
const isSelectedMyInfoModify = ref(false);

function tabMyInfo() {
  isSelectedMyInfo.value = true;
  isSelectedMyInfoModify.value = false;
}

function tabMyInfoModify() {
  isSelectedMyInfo.value = false;
  isSelectedMyInfoModify.value = true;
}
</script>


<style scoped>
    .mypage {
        background-color: #C3C2C3;
        width: 550px;
        height: 350px;
        position: relative;
        z-index: 1;
    }

    .window {
        height: 100%;
    }

    .window-body {
        height: 60%;
    }

    .window-body > .window {
        height: 100%;
        padding: 20px 0;
        display: flex;
        justify-content: center;
    }

    .window-body li {
        padding: 5px;
        cursor : default;
    }

    .page-btn-div {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
    }

    .cancel-btn {
        margin-left: 5px;
    }
</style>