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
  white-space: pre-wrap; /* Enable line breaks */
  overflow-y: auto; /* Enable vertical scrolling */
}
</style>
