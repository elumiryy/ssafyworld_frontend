<template>
  <div style="margin: 0; padding: 0, width: 100%">
    <div style="display: flex; justify-content: center;">
      <!-- <img :src="getImageSource" style="width: calc(100% - 20px); padding: 0;" /> -->
      <img :src="getImageSource" style="width: 30%; padding: 0;" />
    </div>
    <div style="display: flex; justify-content: center; width: 100%;">
      <p style="width: calc(100%); text-align: center; margin: 0; font-size: 13px; word-wrap: break-word; padding: 0 5px;">
        {{ folderName }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageType: {
      type: String,
      default: 'folder'
    },
    folderName: {
      type: String,
      default: 'folderName'
    }
  },
  computed: {
    getImageSource() {
      //imageType이 folder이면 folder모양 이미지, 그 외는 편지모양 이미지 출력
      return this.imageType === 'folder' ?
             require('@/assets/windowsIcon/directory_closed-4.png') : 
             require('@/assets/windowsIcon/message_envelope_open.png');
    }
  },
  // methods: { //부모에게 데이터 전달
  //   clickHandler() {
  //     this.$emit('click', "value");
  //   },
  // }
}
</script>

<style>
  /* 필요한 경우 스타일링 추가 */
</style>
