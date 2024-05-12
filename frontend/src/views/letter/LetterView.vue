<script setup>
import { reactive, onUnmounted, ref } from "vue";
import { useModal, Modal } from "@/components/useModal";
import axios from 'axios'

const setModal = useModal({
  sendLetter: 4,
});

let modalVisible = reactive({});

modalVisible = setModal("sendLetter", false);

function showSend() {
  //TODO 나중에 로그인 후 삭제@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  localStorage.setItem("accessToken", "Bearer eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAwMSIsImlhdCI6MTcxNTQ5MDM0NSwiZXhwIjoxNzMzNDkwMzQ1LCJyb2xlcyI6IlJPTEVfVVNFUiJ9.NEgW3sxiMUilhYyFa_gFd469OrsRQHxKhy9W7ryYlos");

  modalVisible = setModal("sendLetter", true);

  if (inputs.value.ordinal == null) {
    console.log("asdf");
    getOridnal();
  }
}

function showWriteView() {
  const queryParams = new URLSearchParams({
    headers: {
          Authorization: window.localStorage.getItem("accessToken"),
      },
    ordinal: inputs.value.ordinal,
    region: inputs.value.region,
    ban: inputs.value.ban,
    names: inputs.value.names.name,
    upk: inputs.value.names.memberId //userPk
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

//서버통신
async function serverGetCommunication(url) {
  // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
  await axios.get(
    url, 
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        withCredentials: true, // default
        Accept: "application/json",
        // Authorization: 'Bearer eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNzE1NDQ5MzI2LCJleHAiOjE3MTU0NTExMjYsInJvbGVzIjoiUk9MRV9VU0VSIn0.vbQkrwetQ5b__DE2arDoeox4AcfME3EyycIBPlNEQ3s'
      }
    }
  )
  .then(function (response) {
    valueList.value = response.data
  })
  .catch(function (error) {
    alert("통신 실패: " + error)
    console.log(error);
  });
}

async function getOridnal() {
  try {
    //(1)서버통신
    await serverGetCommunication('http://localhost:8092/groupInfo');
    
    //(2)서버통신x
    // valueList.value = [10, 11];
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
    //(1)서버통신
    await serverGetCommunication('http://localhost:8092/groupInfo?ordinal=' + inputs.value.ordinal);
    
    //(2)서버통신x
    // valueList.value = ["구미", "서울", "부울경", "광주", "대전"];
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
    //(1)서버통신
    await serverGetCommunication('http://localhost:8092/groupInfo?ordinal=' + inputs.value.ordinal + "&region=" + inputs.value.region);
    
    //(2)서버통신x
    // valueList.value = ["1", "2", "3", "4", "5", "6"];

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
    
    //(1)서버통신
    let groupInfoId = 0;
    await axios.get(
      'http://localhost:8092/groupInfo?ordinal=' + inputs.value.ordinal + "&region=" + inputs.value.region + "&ban=" + inputs.value.ban, 
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          withCredentials: true, // default
          Accept: "application/json",
          // Authorization: 'Bearer eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNzE1NDQ5MzI2LCJleHAiOjE3MTU0NTExMjYsInJvbGVzIjoiUk9MRV9VU0VSIn0.vbQkrwetQ5b__DE2arDoeox4AcfME3EyycIBPlNEQ3s'
        }
      }
    )
    .then(function (response) {
      groupInfoId = response.data
      console.log(groupInfoId)
    })
    .catch(function (error) {
      alert("통신 실패: " + error)
      console.log(error);
    });

    await axios.get(
      'http://localhost:8092/member?groupInfoId=' + groupInfoId, 
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          withCredentials: true, // default
          Accept: "application/json",
        }
      }
    )
    .then(function (response) {
      valueList.value = response.data
      console.log(valueList.value)
    })
    .catch(function (error) {
      alert("통신 실패: " + error)
      console.log(error);
    });
    
    // valueList.value = []
    //(2)서버통신x
    // valueList.value = [
    //   "강인수",
    //   "김재웅강사님",
    //   "김민종",
    //   "김의근",
    //   "남궁효림",
    //   "이지언",
    //   "이예찬",
    //   "이예림",
    //   "이예림페어",
    //   "나는 이예림",
    //   "이은영 프로님",
    //   "조민기",
    //   "주효림",
    //   "프론트왕",
    //   "백엔드",
    //   "스프링",
    //   "비타민",
    //   "마루❤",
    //   "강아지🐷",
    //   "고양이",
    //   "vue.js",
    //   "공부인",
    //   "안녕",
    //   "제발",
    //   "스크롤",
    //   "생겨라", ];

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