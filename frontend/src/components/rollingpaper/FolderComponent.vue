<template>
  <div style="margin: 0; width: 55px;">
    <div style="display: flex; justify-content: center;">
      <img src="@/assets/windowsIcon/directory_closed-4.png" style="width: calc(100% - 20px); padding: 0 10px;" />
    </div>
    <div style="display: flex; justify-content: center; width: 100%;">
      <p style="width: calc(100% + 10px); text-align: center; margin: 0; font-size: 13px; word-wrap: break-word; padding: 0 5px;">
        {{ folderName }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    folderName: {
      type: String,
      default: 'folderName'
    }
  }
}
</script>

<style>
  /* 필요한 경우 스타일링 추가 */
</style>
