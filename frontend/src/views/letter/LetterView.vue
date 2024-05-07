<script setup>
    import { reactive, onUnmounted, ref, onMounted } from 'vue';
    import { useModal, Modal } from '@/components/useModal';
  
    const setModal = useModal({
      m2: 3,
      sendLetter: 4
    });

    let modalVisible = reactive({});

    modalVisible = setModal('m2', false);
    modalVisible = setModal('sendLetter', false);


    function show2() {
      modalVisible = setModal('m2', true);
      console.log("asdffsafsafd")
    }
  
    function okfn() {
        modalVisible = setModal('m2', false);
    }

    function showSend() {
      modalVisible = setModal('sendLetter', true);
      modalVisible = setModal('m2', false);
      console.log("asdffsafsafd")
    }
  
    function okfnSend() {
        modalVisible = setModal('sendLetter', false);
    }

    onUnmounted(() => {
    })

// 동적으로 불러올 컴포넌트를 저장할 변수
    let dynamicComponent = ref(null);

    // 클릭 이벤트 핸들러
    onMounted(async () => {
        try {
            // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
            const module = await import('@/views/letter/FolderView.vue');

            // 불러온 컴포넌트를 변수에 할당
            dynamicComponent.value = module.default;
        } catch (error) {
            console.error(error);
        }
    });
  </script>
    
  <template>
    <div @click="show2">모달띄우깅</div>

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
          <button @click="showSend">편지쓰기!</button>
          <div>
            hihi
          </div>
        </div>
    </Modal>

    <Modal name="sendLetter" 
      v-model:visible="modalVisible"
      :animation="true"
      :closable="false"
      :draggable= "true"

      :okButton="{
        onclick: okfnSend,
        loading: true
      }"
      >
        <div>
            <component :is="dynamicComponent" />
        </div>
    </Modal>

  </template>
    