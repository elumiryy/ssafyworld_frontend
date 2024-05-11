<template>
  <div class="loading">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text" style="font-size: 12px">
          RollingPaper.exe - {{ percent }}% 완료됨
        </div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>

      <div class="window-body">
        <div class="animation-area">
          <img id="earth" src="@/assets/loadingImg/earth.png" alt="" />
          <div class="paper-plane">
            <img src="@/assets/loadingImg/letter.png" alt="" />
          </div>
          <img
            v-if="remainingTime > 0"
            id="file"
            src="@/assets/loadingImg/file.png"
            alt=""
          />
          <img
            v-else
            id="filled-file"
            src="@/assets/loadingImg/filled-file.png"
            alt=""
          />
        </div>

        <div class="content1">
          전송 :<br />
          RollingPaper.txt(download.ssafy.com)
        </div>

        <div id="progressBarContainer" class="progress-bar-container"></div>

        <div class="remain-area">
          <span>남은 시간 :</span>
          <span v-if="remainingTime <= 0" class="remain-time">전송 완료</span>
          <span v-else class="remain-time">{{ remainingTime }}초</span>
        </div>

        <div class="transfer-area">
          <span>전송 위치 :</span>
          <span class="location"
            >{{ ordinal }}기:\{{ region }}:\{{ ban }}반:\{{ names }}</span
          >
        </div>

        <div class="transfer-speed">
          <span>전송 속도 :</span>
          <span class="speed">54.1KB/초</span>
        </div>

        <div class="close-checkbox">
          <input type="checkbox" id="terminate" />
          <label for="terminate" style="font-size: 15px"
            >전송이 완료되면 대화 상자를 닫음(<u>C</u>)</label
          >
        </div>

        <div class="close-button">
          <button>받은 편지함</button>
          <button>편지 확인하기</button>
          <button @click="closeWindow">창 닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  font-size: 15px;
}

.loading {
  background-color: #c3c2c3;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.window {
  height: 100%;
}

.animation-area {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#earth {
  margin-left: 1%;
}

#file {
  margin-right: 30%;
}

#filled-file {
  margin-right: 30%;
}

.remain-area {
  margin-top: 2%;
  width: 100%;
}

.transfer-area {
  margin-top: 1%;
}

.transfer-speed {
  margin-top: 1%;
}

.remain-time {
  margin-left: 50%;
}

.location {
  margin-left: 25%;
}

.speed {
  margin-left: 25%;
}

.close-checkbox {
  margin-top: 1%;
}

.close-button {
  text-align: right;
  margin-top: 1%;
}

.close-button > button {
  margin-right: 2%;
}

.paper-plane {
  position: absolute;
  left: 0;
  animation: fly 2s linear forwards 2;
}

@keyframes fly {
  0% {
    left: 5%;
    transform: translateX(5%);
  }

  100% {
    left: 64%;
    transform: translateX(-64%);
  }
}

.progress-bar-container {
  width: 80%;
  height: 20px;
  background-color: #bfbfbf;
  position: relative;
  box-shadow: 2px 1px 3px 1px inset;
  margin-top: 2%;
}

/deep/ .progress-block {
  width: 9px;
  height: 15px;
  background-color: #00007f;
  position: absolute;
  margin-top: 3px;
  margin-right: 2px;
  margin-left: 2px;
}
</style>

<script>
import { ref, onMounted } from "vue";

const TOTAL_TIME = 4000;

export default {
  setup() {
    const url = new URL(window.location.href);
    // URLSearchParams 객체를 사용하여 쿼리 파라미터 접근
    const params = new URLSearchParams(url.search);

    // 특정 쿼리 파라미터 값 읽기
    const ordinal = ref(params.get("ordinal"));
    const region = ref(params.get("region"));
    const ban = ref(params.get("ban"));
    const names = ref(params.get("names"));

    const totalTime = TOTAL_TIME;
    const remainingTime = ref(TOTAL_TIME / 1000);
    const timer = ref(null);
    const percent = ref(0);

    const fillProgressBar = (duration) => {
      const container = document.getElementById("progressBarContainer");
      const containerWidth = container.offsetWidth;
      const blockWidthIncludingMargin = 11;
      const numberOfBlocksToFill = Math.floor(
        containerWidth / blockWidthIncludingMargin
      );
      let currentBlocks = 0;
      const intervalTime = duration / numberOfBlocksToFill;

      const interval = setInterval(() => {
        if (currentBlocks >= numberOfBlocksToFill) {
          clearInterval(interval);
          return;
        }
        const block = document.createElement("div");
        block.className = "progress-block";
        block.style.left = `${currentBlocks * blockWidthIncludingMargin}px`;
        container.appendChild(block);
        currentBlocks++;
      }, intervalTime);
    };

    const startTimer = () => {
      timer.value = setInterval(() => {
        if (remainingTime.value <= 0) {
          clearInterval(timer.value);
          return;
        }
        remainingTime.value -= 1; // 1초씩 감소
      }, 1000); // 1초마다 갱신
    };

    const increasePercent = () => {
      const interval = TOTAL_TIME; // 4초
      const step = 1; // 증가하는 값
      const totalTime = 100; // 총 시간
      const incrementTime = interval / totalTime;

      let currentValue = 0;
      const timer = setInterval(() => {
        currentValue += step;
        if (currentValue > 100) {
          clearInterval(timer);
        } else {
          percent.value = currentValue;
        }
      }, incrementTime);
    };

    const closeWindow = () => {
      window.close();
    };

    onMounted(() => {
      fillProgressBar(TOTAL_TIME);
      startTimer();
      increasePercent();

      const paperPlaneElement = document.querySelector(".paper-plane img");
      setTimeout(() => {
        paperPlaneElement.style.display = "none";
      }, TOTAL_TIME);
    });

    return {
      ordinal,
      region,
      ban,
      names,
      totalTime,
      remainingTime,
      percent,
      closeWindow,
    };
  },
};
</script>
