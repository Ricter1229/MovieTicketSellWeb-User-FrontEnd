<template>
  
    <div class="container">

        <div class="modal" ref="refExampleModal" tabindex="-1" id="insertModal0" data-bs-backdrop="static">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">檔案上傳</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <!-- 內容 -->
                        <form action="/somewhere/to/upload" enctype="multipart/form-data">
                            <section class="main_top">
                                <section class="left">
                                    <!-- <img src="@/assets/images/1.jpg" alt="" class="mainImg">
                                    <input type="file" name="" id="" class="mainChoo"> -->
                                    <CinemaPhotoSet :cinema="cinema" @update-main-photo="receiveData"></CinemaPhotoSet>
                                    
                                </section>
                                <section class="middle">
                                    <!-- <div class="bar ">
                                        <label for="" class="lb">影城名稱:</label><input type="text" placeholder="影城名稱" class="enterbar">
                                    </div>
                                    <div class="bar">
                                        <label for="" class="lb ">影城區域:</label><input type="text" placeholder="影城區域" class="enterbar">
                                    </div>
                                    <div class="bar">
                                        <label for="" class="lb">影城地址:</label><input type="text" placeholder="影城地址" class="enterbar">
                                    </div>
                                    <div class="bar">
                                        <label for="" class="lb">連絡電話:</label><input type="text" placeholder="連絡電話" class="enterbar">
                                    </div>
                                    -->
                                    <ChinemaInforInsert :cinema="cinema" @update-cinema="receiveData"></ChinemaInforInsert>
                                </section>
                                <section class="right">
                                    <textarea name="" id="" cols="30" rows="10" class="textBar" v-model="receiveCinema.introduce"></textarea>
                                </section>
                            </section>

                        
                            
                                <!-- <label for="" class="lb">其他圖片:</label><input type="file" placeholder="其他圖片" class="enterbar">
                        -->

                              <!-- 文件选择器 -->
                            <div class="bar">
                                <label for="" class="lb">其他圖片:</label><input type="file" ref="fileInput" accept="image/gif, image/jpeg, image/png" multiple @change="handleFileChange" />
                            </div>

                            <section class="photos">
                              
                                <CinemaSubsInsert :photos="receiveCinema.photos" @remove-image="removeImage"></CinemaSubsInsert>
                            </section>

                            <section class="allAuditorium">
                        
                                <!-- <section class="auditorium">
                                    <section class="oneAud">
                                        <label for="">廳名稱: </label>

                                        <input type="text">
                                    </section>
                                    <input type="file" name="" id=""  class="auditoriumSeat">
                                    <section class="btns">
                                        <button class="edit">edit</button>
                                        <button class="delete">delete</button>
                                    </section>
                                </section>

                                <section class="auditorium">
                                    <section class="oneAud">
                                        <label for="">廳名稱: </label>

                                        <input type="text">
                                    </section>
                                    <input type="file" name="" id=""  class="auditoriumSeat">
                                    <section class="btns">
                                        <button class="edit">edit</button>
                                        <button class="delete">delete</button>
                                    </section>
                                </section> -->
                                <!-- <button  class="addBtn">➕</button> -->
                                <CinemaAuditoriumInsert :key="cinemaAuditoriumKey" :cinema="cinema" @update-auditorium="receiveData"></CinemaAuditoriumInsert>
                            </section>

                            
                            <!-- test -->
                                <!-- <div>{{ receiveCinema.name }}</div>
                                <div>{{ receiveCinema.region }}</div>
                                <div>{{ receiveCinema.address }}</div>
                                <div>{{ receiveCinema.phoneNo }}</div>
                                <div>{{ receiveCinema.introduce }}</div>
                                <div v-for="img in receiveCinema.photos">{{ img.url }}</div> -->
                                <div @click="infor">顯示</div>
                            <!-- test -->
                        </form>
                        
                    <!--  -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="doclick1" v-show="isShowInsertButton">新增</button>
                        <button type="button" class="btn btn-primary" @click="doclick2" v-show="!isShowInsertButton">修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
    
<script setup>
    import CinemaPhotoSet from './CinemaPhotoSet.vue';
    import ChinemaInforInsert from './ChinemaInforInsert.vue';
    import CinemaSubsInsert from './CinemaSubsInsert.vue'
    import CinemaAuditoriumInsert from './CinemaAuditoriumInsert.vue';
    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted,defineProps,nextTick,watch } from 'vue';
    const fileInput = ref(null);
    const props = defineProps(["cinema", "isShowInsertButton"]);
    
    // 控制 CinemaAuditoriumInsert 的 key
const cinemaAuditoriumKey = ref(0);

function resetCinemaAuditorium() {
  cinemaAuditoriumKey.value++; // 修改 key，触发子组件重建
}
    onMounted(() => {
        nextTick(() => {
            if (!fileInput.value) {
                console.error("fileInput reference is not initialized.");
            }
            modal.value = new bootstrap.Modal(refExampleModal.value);
        });
        const modalElement = refExampleModal.value;
        if (modalElement) {
            modalElement.addEventListener('hide.bs.modal', () => {
                // 清空文件輸入框的值
                if (fileInput.value) {
                    fileInput.value.value = '';
                }
                // 清空文件的數據
                receiveCinema.value.photos = [];
                receiveCinema.value={};
                resetCinemaAuditorium();
            });
         
        }
    });
    // 存储图片信息
    const receiveCinema=ref({
    name: "",
    region: "",
    address: "",
    phoneNo: "",
    introduce: "",
    photos: [],
    mainPhoto:"",
    // auditoriumName: '',
    // seat: {},
    });
 

    // 監聽 props.cinema 的變化
    watch(
    () => props.cinema, // 監聽目標
    (newCinema) => {
        receiveCinema.value = Object.assign(receiveCinema.value, newCinema); // 賦值
    },
    { immediate: true } // 初始化時立即執行一次
    );

    const receiveData=(newData)=>{
        console.log('B 組件接收到來自 C 的更新數據：', newData);
        console.log(typeof(newData));
        Object.assign(receiveCinema.value, newData);
        console.log('cinema obj資訊');
        console.log(JSON.stringify(receiveCinema.value, null, 2));
    }
    
   


    function infor(){
        // console.log(props.cinema);
        console.log(JSON.stringify(receiveCinema.value, null, 2));
        // console.log(receiveCinema.photos);
        // console.log(typeof(receiveCinema.photos));
    }
    


    // 处理文件上传
    function handleFileChange(event) {
        const files = Array.from(event.target.files); // 获取多个文件
        const imagesBase64 = [];
        if(files.length!=0){

            files.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
            // const base64String = e.target.result; // 取得 Base64 字符串
            
                imagesBase64.push({
                    url: e.target.result, // Base64 編碼
                    file, // 原始文件
                });
                console.log(imagesBase64);
                // 更新到 receiveCinema
                // Object.assign(receiveCinema.value.photos, imagesBase64);
                receiveCinema.value.photos = [...imagesBase64];
                console.log(receiveCinema.value.photos);
            };
                
            });
        }
        
    }

    // 删除图片
    function removeImage(index) {
        receiveCinema.value.photos.splice(index, 1);
        // 重建文件列表
    const dataTransfer = new DataTransfer();
    receiveCinema.value.photos.forEach((image) => {
        dataTransfer.items.add(image.file);
    });

    // 更新文件输入框的文件列表
    fileInput.value.files = dataTransfer.files;
    }

    // 模拟提交表单
    function handleUpload() {
        console.log('Submit form logic here');
    }


    const emits = defineEmits(["insert", "update"]);
    
    function doclick1() {
        emits("insert");
        hideModal();
    }
    function doclick2() {
        emits("update");
        hideModal();
    }

    
    //modal顯示邏輯
    const refExampleModal = ref(null);
    const modal = ref(null);

    function showModal() {
        modal.value.show();
    }
    function hideModal() {
        modal.value.hide();
    }
    defineExpose({
        showModal, hideModal,
    });
</script>
    
<style scoped>

    .main_top{
        margin-top: 10px;
        display: flex;
        padding: 30px 30px 30px 30px;
    }

    .left{
            flex:1 1 200px ;
            text-align: center;
            padding: 20px 0px 10px 0px;
            margin-right: 20px;
    }
    .middle{
        flex: 1.5 1 370px;
        display: flex;
        /* flex-direction: column;
        align-items: center; */
        flex-wrap: wrap;
        padding: 10px 20px 20px 0px;
    }
    .right{
        flex: 0.8 1 300px;
        padding: 20px 20px 10px 00px;
    }
    .allAuditorium{
        margin: 40px 0px 40px 130px;
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
    }



    .photos{
        display: flex;
        flex-wrap: wrap;
        margin: 30px 0px 0px 180px;
        border: 2px dotted gray;
        padding: 20px 0px 20px 20px;
        float: left;
        width: 840px;
        height:  auto;
    }

    .textBar{
        height: 250px;
        width:  400px;
    }
    .lb{
        font-size: 16px;
        line-height: 16px;
        vertical-align: middle;
        margin-right: 20px;
    }
   .bar{
    text-align: center;
   }
    .enterbar{
        width: 240px;
        height: 30px;
    }
</style>