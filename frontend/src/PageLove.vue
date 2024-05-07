<script setup>
    import { reactive, onUnmounted } from 'vue';
    import { useModal, Modal } from './components/useModal';
  
    const setModal = useModal({
      m2: 3,
    });

    let modalVisible = reactive({});
    modalVisible = setModal('m2', true);
    setTimeout(() => {
      modalVisible = setModal('m2', true);
    }, 1000)


    function show2() {
      modalVisible = setModal('m2', true);
      console.log("asdffsafsafd")
    }
  
    function okfn() {
      // setTimeout(() => {
      //   }, 1000)
        modalVisible = setModal('m2', false);
    }

    onUnmounted(() => {
    })
    
  </script>
    
  <template>
    <div @click="show2">show2</div>

    <Modal name="m2" 
      v-model:visible="modalVisible"
      :animation="true"
      :closable="false"
      :draggable= "true"

      :okButton="{
        onclick: okfn,
        loading: true
      }"
      >
        <div>
          <h3>편지쓰기입니다~</h3>
          <div>
            hihi
          </div>
        </div>
    </Modal>

  </template>
    