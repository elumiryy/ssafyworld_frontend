<template>
  <div id="folderView" style="display: inline-block;">
    <div class="grid-container">
      <div class="grid-item" v-for="(item, index) in items" :key="index" style="border: none">
        <div class="button-like" @click="onClick(item)">
          <FolderComponent :folderName="fullName(item)" :imageType="imageType"></FolderComponent>
        </div>
      </div>
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
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>