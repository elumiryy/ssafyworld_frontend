<template>
  <div class="output-content" v-html="formattedContent"></div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedContent() {
      return this.content ? this.content.replace(/\n/g, '<br>') : '';
    }
  }
}
</script>

<style scoped>
.output-content {
  width: 100%; /* 예시로 너비를 100px로 설정 */
  max-width: 630px;
  white-space: pre-wrap;
  word-wrap: break-word; /* 글자가 너비를 초과할 때 줄 바꿈 */
}
</style>
