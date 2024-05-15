<template>
  <div id="folderView">

    <!-- 사용자가 한 명이라도 있을 때 -->
    <div v-if="items" class="grid-container" style="margin: 10px">
      <div class="grid-item" v-for="(item, index) in items" :key="index" style="border: none; padding: 10px">
        <div class="button-like" @click="onClick(item)">
          <div v-if="item.memberId == null"> <!-- 기수, 지역, 반 출력 -->
            <FolderComponent :folderName="fullName(item)" :imageType="imageType"></FolderComponent>
          </div>
          <div v-else> <!-- 사용자 이름 출력 -->
            <FolderComponent :folderName="fullName(item.name)" :imageType="imageType"></FolderComponent>
          </div>
        </div>
      </div>
    </div>

    <!-- 사용자가 한 명도 없을 때 -->
    <div v-else class="noOne">
      아직 등록된 사용자가 없어요 
    </div>

  </div>

</template>

<script>
import FolderComponent from '@/components/rollingpaper/FolderComponent.vue';

export default {    
  name: 'FolderView',
  props: {
    imageType: {
      type: String,
      default: 'folder'
    },
    folderName: {
      type: Object
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  components: {
    FolderComponent,
  },
  data() {
    return {
      //@TODO axios로 받아와야함
      // items: ["1반", "2반", "3반", "4반", "5반", "6반", "7반", "8반", "9반", "10반", "11반"]
      items: this.folderName
    };
  },
  methods: {
    onClick(item) {
      this.$emit('clicked', item);
    },
    fullName(folderName) {
      return folderName + this.suffix
    }
  }
}
</script>

<style scoped>
#folderView {
  display: inline-block;
  width: 100%; 
  height: 300px; 
  overflow-y:auto; 
  max-height: 400px;

}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.grid-item {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

/* 반응형 레이아웃 설정 */
@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.button-like {
  display: inline-block;
  /* padding: 10px 20px; */
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.noOne {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* 부모 요소의 너비를 화면 전체로 설정 */
    height: 90%; /* 부모 요소의 높이를 화면 전체 높이로 설정 */
}
</style>