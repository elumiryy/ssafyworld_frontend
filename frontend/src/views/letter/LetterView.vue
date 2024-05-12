<script setup>
import { reactive, onUnmounted, ref } from "vue";
import { useModal, Modal } from "@/components/useModal";

const setModal = useModal({
  sendLetter: 4,
});

let modalVisible = reactive({});

modalVisible = setModal("sendLetter", false);

function showSend() {
  modalVisible = setModal("sendLetter", true);

  if (inputs.value.ordinal == null) {
    console.log("asdf");
    getOridnal();
  }
}

function showWriteView() {
  const queryParams = new URLSearchParams({
    ordinal: inputs.value.ordinal,
    region: inputs.value.region,
    ban: inputs.value.ban,
    names: inputs.value.names,
  }).toString();
  window.open(
    `/letterWrite?${queryParams}`,
    "_blank",
    "width=550, height=400, left=550, top=250"
  );
}

function clicked(item) {
  if (types.value == "ordinal") {
    inputs.value.ordinal = item;
  } else if (types.value == "region") {
    inputs.value.region = item;
  } else if (types.value == "ban") {
    inputs.value.ban = item;
  } else if (types.value == "names") {
    inputs.value.names = item;
    showWriteView();
  }
  tmpQueue.value = [];

  if (inputs.value.ordinal == null) {
    getOridnal();
  } else if (inputs.value.region == null) {
    getRegion();
  } else if (inputs.value.ban == null) {
    getBan();
  } else {
    getNames();
  }
}

async function getOridnal() {
  try {
    // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
    valueList.value = [10, 11];
    imageType.value = "folder";
    types.value = "ordinal";
    suffix.value = "기";

    const module = await import("@/views/letter/FolderView.vue");

    // 불러온 컴포넌트를 변수에 할당
    dynamicComponent = ref(module.default);

    // 컴포넌트 강제 재생성을 위해 key 갱신
    componentKey.value++;
  } catch (error) {
    console.error(error);
  }
}

async function getRegion() {
  try {
    // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
    valueList.value = ["구미", "서울", "부울경", "광주", "대전"];
    imageType.value = "folder";
    types.value = "region";
    suffix.value = "";

    // 컴포넌트 강제 재생성을 위해 key 갱신
    componentKey.value++;
  } catch (error) {
    console.error(error);
  }
}

async function getBan() {
  try {
    // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
    valueList.value = ["1", "2", "3", "4", "5", "6"];

    //서버에서 받는 코드
    // await fetch('http://localhost:3000/ban')
    //   .then(res => res.json())
    //   .then(data => valueList.value = data)
    //   .catch(err => console.log(err.message))

    imageType.value = "folder";
    types.value = "ban";
    suffix.value = "반";

    // 컴포넌트 강제 재생성을 위해 key 갱신
    componentKey.value++;
  } catch (error) {
    console.error(error);
  }
}

async function getNames() {
  try {
    // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
    valueList.value = [
      "강인수",
      "김재웅강사님",
      "김민종",
      "김의근",
      "남궁효림",
      "이지언",
      "이예찬",
      "이예림",
      "이예림페어",
      "나는 이예림",
      "이은영 프로님",
      "조민기",
      "주효림",
      "프론트왕",
      "백엔드",
      "스프링",
      "비타민",
      "마루❤",
      "강아지🐷",
      "고양이",
      "vue.js",
      "공부인",
      "안녕",
      "제발",
      "스크롤",
      "생겨라",
    ];
    imageType.value = "message";
    types.value = "names";
    suffix.value = "";

    //컴포넌트 강제 재생성을 위해 key 갱신
    componentKey.value++;
  } catch (error) {
    console.error(error);
  }
}

function okfnSend() {
  modalVisible = setModal("sendLetter", false);
  inputs.value = []
}

function goBack() {
  if (inputs.value.ban != null) {
    tmpQueue.value.ban = inputs.value.ban;
    inputs.value.ban = null;
    getBan();
  } else if (inputs.value.region != null) {
    tmpQueue.value.region = inputs.value.region;
    inputs.value.region = null;
    getRegion();
  } else if (inputs.value.ordinal != null) {
    tmpQueue.value.ordinal = inputs.value.ordinal;
    inputs.value.ordinal = null;
    getOridnal();
  }
}

const tmpQueue = ref([]);

function goForward() {
  // console.log("forward")
  if (inputs.value.ordinal == null) {
    if (tmpQueue.value.ordinal != null) {
      inputs.value.ordinal = tmpQueue.value.ordinal;
      tmpQueue.value.ordinal = null;
      getRegion();
    }
  } else if (inputs.value.region == null) {
    if (tmpQueue.value.region != null) {
      inputs.value.region = tmpQueue.value.region;
      tmpQueue.value.region = null;
      getBan();
    }
  } else if (inputs.value.ban == null) {
    if (tmpQueue.value.ban != null) {
      inputs.value.ban = tmpQueue.value.ban;
      tmpQueue.value.ban = null;
      getNames();
    }
  }
}

onUnmounted(() => {
  inputs.value = [];
  valueList.value = [];
});

// 동적으로 불러올 컴포넌트를 저장할 변수
let dynamicComponent = ref(null);

const inputs = ref([]); //유저정보
const valueList = ref([]); //필요한 값
const imageType = ref("folder");
const types = ref("ordinal");
const componentKey = ref(0);
const suffix = ref("");
</script>

<template>
  <div>
    <div @click="showSend">
      <img
        src="@/assets/windowsIcon/directory_closed-4.png"
        alt="windows-icon-img"
        width="50"
        height="50"
      />
    </div>
    <Modal
      name="sendLetter"
      v-model:visible="modalVisible"
      :animation="true"
      :closable="false"
      :draggable="true"
      :closeButton="{
        onclick: okfnSend,
        loading: true,
      }"
      :userInfo="inputs"
      @goBack="goBack"
      @goForward="goForward"
    >
      <div>
        <component
          :is="dynamicComponent"
          :folderName="valueList"
          :imageType="imageType"
          @clicked="clicked"
          :suffix="suffix"
          :key="componentKey"
        />
      </div>
    </Modal>
  </div>
</template>