<template>
    <select v-if="regionDto" name="" id="" class="sl" :value="regionFilter" @change="dochange($event.target.value)">
        <option v-if="regions.length==0&&regionDto" :value="regionDto" >{{regionDto.region}}</option>
        <option v-if="regions.length!=0"  :value="region.regionNum" v-for="region in regions">{{ region.region }}</option>
    </select>
    <select name="" id="" class="sl"  :value="id" @change="cinemaChange($event.target.value)">
        <!-- <option :value="id" v-if="cinemas.length==0">{{cinemaName}}</option> -->
        <option :value="cinema.storeId" v-if="cinemas.length!=0" v-for="cinema in cinemas">{{cinema.name}}</option>
    </select>
    <!-- <div @click="a">dis</div> -->
</template>
    
<script setup>
    import axios from 'axios';
    import axiosInstance from '@/utils/axiosInstance';
    import Swal from 'sweetalert2';
    import { ref,onMounted,defineProps, watch,defineEmits } from 'vue';
    const regionFilter=ref(1);
    const regions=ref([]);
    const id=ref();
    const cinemas=ref([
        
    ]);
    const cinema=ref({});
    const props=defineProps(["regionDto","cinemaName","cinemaId"]);
    const emits=defineEmits(["update"]);
    // function a(){
    //     console.log("id.value",id.value);
    //     console.log("props.cinemaName",props.cinemaName);
    //     console.log("regionFilter.value",regionFilter.value);
    // }
    onMounted(()=>{
        callFindRegion();
        
    })
    watch(()=>props.regionDto,()=>{
        regionChoose(props.regionDto.regionNum);
    })
    watch(()=>props.cinemaId,()=>{
        id.value=props.cinemaId;
    })

    function dochange(regionNum){
        regionChoose(regionNum);
        callFind();
    }
    function cinemaChange(selectId){
        id.value=selectId;
        callFindById(id.value);
        // console.log("cinema",cinema);
        // console.log("cinema.value",cinema.value);
        
    }

    async function callFindRegion() {
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            axiosInstance.get("/store/regions/findall").then(function(response) {

                regions.value=response.data.list;
                setTimeout(function() {
                    Swal.close();
                }, 500);
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }
        async function callFindById(id) {
            // console.log("callFindById",id);
            // Swal.fire({
            //     title: "Loading.....",
            //     showConfirmButton: false,
            //     allowOutsideClick: false,
            // });
            try {
                const response = await axiosInstance.post(`/store/regions/find/${id}`);
                // console.log("response.data.dto",response.data.dto);
                cinema.value=response.data.dto;
                // console.log("cinema.value",cinema.value);
                // setTimeout(function() {
                //     Swal.close();
                // }, 500);
        //         console.log("執行");
        // console.log("cinema",Object.entries(cinema.value));
        // console.log("cinema.value",cinema.value);
        emits("update",cinema);
            } catch(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            }
        }

        function regionChoose(regionNum){
        // console.log("數字");
        // console.log(regionNum);
        regionFilter.value=regionNum;
        // console.log("regionFilter.value",regionFilter.value);
        callFind();
    }
    

        async function callFind() {
            if(regionFilter.value===""){
                regionFilter.value=null;
            }
            let request={
                regionFilter:regionFilter.value,
            }

            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            axiosInstance.post("/store/regions/find", request).then(function(response) {

                // console.log("response.data.count", response.data.count);
                // console.log("request.regionFilter", request.regionFilter);
                // console.log("response.data.list", response.data.list);
                // console.log("cinemas.value",cinemas.value);
                cinemas.value=response.data.list;
                setTimeout(function() {
                    
                    Swal.close();
                }, 500);
            }).catch(function(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            });
        }
</script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .sl{
        width:300px;
        height: 24px;
        margin-bottom: 10px;
    }
</style>