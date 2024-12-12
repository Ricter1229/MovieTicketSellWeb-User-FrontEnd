<template>
    <section class="mainSection">
        <h1 v-if="display" >{{ orderCondition ? "付款完成" : "訂單完成，請盡快付款" }}</h1>
        <!-- <div v-if="data">訂單編號{{data.data.order.merchantTradeNo}}</div>
        <div v-if="data" v-for="(detail,index) in data.data.order.memberBuyTicketDetailBeans">
            <div >電影名{{data.data.movieName}}</div>
            <div>電影票日期{{data.data.movieReleasedDate}}</div>
            <div>影城{{data.data.storeName}}</div>
            <div>廳{{data.data.order.memberBuyTicketDetailBeans[index].auditoriumScheduleId}}</div>
            <div>座位{{data.data.order.memberBuyTicketDetailBeans[index].seat}}</div>
            
        </div> -->
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div v-if="data" class="accordion-item" v-for="(detail,index) in data.data.order.memberBuyTicketDetailBeans">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+index" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    訂單編號: {{data.data.order.merchantTradeNo}}  #{{index+1}}
                </button>
                </h2>
                <div :id='"collapseOne"+index' class="accordion-collapse collapse">
                <div class="accordion-body">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">單筆訂單詳細:</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr>
                            <th scope="row">電影名</th>                                     
                            <td>{{data.data.movieName}}</td>
                            </tr>
                            <tr>
                            <th scope="row">電影票日期</th>
                            <td>{{data.data.movieReleasedDate}}</td>
                            </tr>
                            <tr>
                            <th scope="row">影城</th>
                            <td>{{data.data.storeName}}</td>
                            </tr>
                            <tr>
                            <th scope="row">影廳</th>
                            <td>{{data.data.order.memberBuyTicketDetailBeans[index].auditoriumScheduleId}}</td>
                            </tr>
                            <tr>
                            <th scope="row">座位</th>
                            <td>{{data.data.order.memberBuyTicketDetailBeans[index].seat}}</td>
                            </tr>
                            <tr>
                            <th scope="row">訂單成立時間</th>
                            <td>{{data.data.order.timeBuying}}</td>
                            </tr>
                            <tr v-if="data.data.order.paymentDate!=null&&data.data.order.paymentDate!=''">
                            <th scope="row" >付款時間</th>
                            <td>{{data.data.order.paymentDate}}</td>
                            </tr>
                            
                        </tbody>
                        </table>
    
                </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>
import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import useBookingStore from '@/stores/bookingStore';

// const bookingStore = useBookingStore()
// const { changeOrderStatus } = useMemberBuyTicketOrderAPI()
// const requestChangeOrderStatus = {
//     "orderId": bookingStore.orderId,
//     "status": "CANCELED"
// }
const id=ref();
const data=ref();
const display=ref(false);
const orderCondition=ref(false);
onMounted(function(){
    const route = useRoute();
    id.value= route.params.id;
    callFindById(id.value);
    setTimeout(()=>{
        console.log("data.value.data.order.rtnCode",data.value.data.order.rtnCode);

        if(data.value.data.order.rtnCode===1){
            orderCondition.value=true;
        }else{
            orderCondition.value=false;
        }
        display.value=true;
    },500);

    });

    async function callFindById(id) {
            console.log("callFindById",id);
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            try {
                const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
                data.value=response.data;
                console.log("data.value",data.value);
                setTimeout(function() {
                    Swal.close();
                }, 500);
            } catch(error) {
                console.log("error", error);
                Swal.fire({
                    icon: "error", //success, error, warning, info, question,,,,
                    title: "查詢失敗:"+ error.message,
                });
            }
        }

</script>

<style scoped>
    h1{
      margin-top: 30px;  
      margin-bottom: 50px;
    }
    .mainSection{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .accordion{
        width: 700px;
    }
</style>