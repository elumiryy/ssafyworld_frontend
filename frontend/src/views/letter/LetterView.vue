<script setup>
    import { reactive, onUnmounted, ref } from 'vue';
    import { useModal, Modal } from '@/components/useModal';
  
    const setModal = useModal({
      sendLetter: 4
    });

    let modalVisible = reactive({});

    modalVisible = setModal('sendLetter', false);

    function showSend() {
      modalVisible = setModal('sendLetter', true);

      if (inputs.value.ordinal == null) {
        console.log("asdf")
        getOridnal()
      } 
    }

    function showWriteView() {
        const queryParams = new URLSearchParams({ 
          ordinal: inputs.value.ordinal,
          region: inputs.value.region,
          ban: inputs.value.ban,
          names: inputs.value.names  
        }).toString();
        window.open(`/letterWrite?${queryParams}`, "_blank", "width=550, height=400, left=550, top=250");
    }
    
    function clicked(item) {
      if (types.value == 'ordinal') {
        inputs.value.ordinal = item
      } else if (types.value == 'region') {
        inputs.value.region = item
      } else if (types.value == 'ban') {
        inputs.value.ban = item
      } else if (types.value == 'names') {
        inputs.value.names = item
        showWriteView();
      }
      console.log("@@@" + inputs.value)

      if (inputs.value.ordinal == null) {
        getOridnal()
      } else if (inputs.value.region == null){
        getRegion()
      } else if (inputs.value.ban == null) {
        getBan()
      } else {
        getNames()
      }
    }

    async function getOridnal() {
        try {
            // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
            valueList.value =  [10, 11]
            imageType.value = 'folder'
            types.value = 'ordinal'
 
            const module = await import('@/views/letter/FolderView.vue')

            // 불러온 컴포넌트를 변수에 할당
            dynamicComponent= ref(module.default);
        } catch (error) {
            console.error(error);
        }
    }

    async function getRegion() {
        try {
            // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
            valueList.value =  ["구미", "서울", "부울경", "광주", "대전"]
            imageType.value = 'folder'
            types.value = 'region'
            
            // 컴포넌트 강제 재생성을 위해 key 갱신
            componentKey.value++;
        } catch (error) {
            console.error(error);
        }
    }

    async function getBan() {
        try {
            // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
            valueList.value =  ["1", "2", "3", "4", "5", "6"]

            //서버에서 받는 코드
            // await fetch('http://localhost:3000/ban')
            //   .then(res => res.json())
            //   .then(data => valueList.value = data)
            //   .catch(err => console.log(err.message))

            imageType.value = 'folder'
            types.value = 'ban'
            
            // 컴포넌트 강제 재생성을 위해 key 갱신
            componentKey.value++;
        } catch (error) {
            console.error(error);
        }
    }

    async function getNames() {
        try {
          // import() 함수를 사용하여 동적으로 컴포넌트를 불러옵니다
          valueList.value =  ["주효림", "김민종", "이지언", "이예찬"]
          imageType.value = 'message'
          types.value = 'names'
          
          //컴포넌트 강제 재생성을 위해 key 갱신
          componentKey.value++;
      } catch (error) {
          console.error(error);
      }
    }
  
    function okfnSend() {
        modalVisible = setModal('sendLetter', false);
    }

    onUnmounted(() => {
      inputs.value = []
      valueList.value =  []
    })

    // 동적으로 불러올 컴포넌트를 저장할 변수
    let dynamicComponent = ref(null);

    const inputs = ref([])
    const valueList = ref([])
    const imageType = ref('folder')
    const types = ref('ordinal');
    const componentKey = ref(0);
  </script>
    
  <template>
    <div>
      <div @click="showSend">
        <h3>편지쓰러 가기</h3>
      </div>

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
            <component :is="dynamicComponent" 
                       :folderName="valueList" 
                       :imageType="imageType" 
                       @clicked="clicked"
                       :key="componentKey"/>
        </div>
      </Modal>
    
    </div>


  </template>
    