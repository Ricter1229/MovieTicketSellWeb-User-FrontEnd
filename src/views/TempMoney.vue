<template>
    <div class="green">
        <h1>我是臨時結帳頁面</h1>
        <div class="d-flex">
            <RouterLink :to="{ name: 'check-choose-deatil-link' }" class=" btn btn-info">上一頁</RouterLink>
            <button @click="changeOrderStatus" class="ms-auto btn btn-info">結帳成功</button>
        </div>
    </div>
    <!-- <div v-html="returnData.data.netSection"></div> -->
     <div>{{ returnData.value }}</div>
     <div v-if="returnData.data" v-html="returnData.data.netSection"></div>
    <div @click="a">顯示</div>
    
    <!-- <div>
    <div v-html="formHtml"></div>
  </div> -->
</template>

<script setup>
    import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
    import router from '@/router/router';
    import useBookingStore from '@/stores/bookingStore';
    import axiosInstance from '@/utils/axiosInstance';
    import Swal from 'sweetalert2';
    import {ref,onMounted} from 'vue';


// 在組件掛載後手動提交表單
onMounted(() => {
    setTimeout(function() {
    const form = document.getElementById('allPayAPIForm');
      if (form) {
        form.submit();
      }
                }, 1500);
});
    /////////////////////////////////////////////
    const bookingStore = useBookingStore();
    const returnData=ref({});
    function a(){
        console.log("returnData.value.data",returnData.value.data);  
        console.log("returnData.value.data.netSection",returnData.value.data.netSection);
        // console.log("green",green);
        const allPayAPIForm=document.querySelector('.allPayAPIForm');
        console.log("allPayAPIForm",allPayAPIForm);  
        allPayAPIForm.submit();
    }
    
    const changeOrderStatus = async () => {
        const request = {
            "orderId": bookingStore.orderId,
            "status": "PAID"
        };
        console.log("132",request);
        Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        try {
            const response = await axiosInstance.put("/api/orders/status", request);
            returnData.value = response.data;
            console.log("returnData.value.data",returnData.value.data);
            console.log("response.data",response.data);
                const green=document.querySelector(".green");
                console.log("green",green);
                setTimeout(function() {
                    green.innerHTML=returnData.value.data.netSection;
                    Swal.close();
                }, 500);
            }catch(error) {
                console.error("Error while set order paid", error);
                Swal.fire({
                    icon: "error",
                    title: "購買票券失敗",
                    text: error.message || "未知錯誤",
                });
            }
        
            // router.push({ name: 'ticket-detail-link' }); // 成功后跳转
    }
</script>

<style scoped>

</style>