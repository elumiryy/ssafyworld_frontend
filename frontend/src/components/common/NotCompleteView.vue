<template>
  <div class="notComplete" :style="notCompleteStyles">
      아직 준비중인 기능입니다..
      <br>
      빠른 시일 내에 개발하겠습니다 
      <br>
      - 개발자 -
  </div>
</template>
<script>
export default {
props: {
  elem: {
    type: Object
  }
},
computed: {
  notCompleteStyles() {
    return {
      left: this.elem,
    };
  }
}
};
</script>
<style scoped>
  .notComplete {
      width: 200px;
      height: 60px;
      background-color: #B8BCB8;
      border: 2px outset #DADADA;
      box-shadow: 1px 1px 0 black;
      z-index: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      /* left: -20px; */
      /* left: 자바스크립트 코드에서 작성함!! 건드리지 말기!!! */

      /* position: absolute; */
      /* position: relative;
      
      display: flex;
      flex-direction: row;
      justify-content: space-between; */
  }
</style>