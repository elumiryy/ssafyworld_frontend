<template>
  <div style="display: inline-block">
    <div class="grid-container">
      <div class="grid-item" v-for="(item, index) in items" :key="index" style="border: none">
        <FolderComponent :folderName="item"></FolderComponent>
      </div>
    </div>
  </div>

</template>

<script>
import FolderComponent from '@/components/rollingpaper/FolderComponent.vue';

export default {    
  name: 'FolderView',
  components: {
    FolderComponent,
  },
  data() {
    return {
      //@TODO axios로 받아와야함
      items: ["1반", "2반", "3반", "4반", "5반", "6반", "7반", "8반", "9반", "10반", "11반"]
    };
  },
}
</script>

<style>
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
</style>