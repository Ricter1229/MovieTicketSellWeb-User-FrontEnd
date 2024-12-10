<template>
    <div id="carouselExampleCaptions" class="carousel slide adv" data-bs-ride="carousel" data-bs-pause="hover"  data-bs-interval="5000">
        <div class="carousel-indicators">
            <button
            v-for="(adPhoto, index) in StoreAdsPhotoDtos"
            :key="'indicator-' + index"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : null"
            :aria-label="'Slide ' + (index + 1)"
        ></button>
        </div>
        <div class="carousel-inner adv">
            <div v-for="(adPhoto, index) in StoreAdsPhotoDtos" :key="adPhoto.sortId" :class="['carousel-item', { active: index === 0 }]">
                <img :src="adPhoto.photo" class="d-block w-100" alt="Carousel Image">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
    
<script setup>
import { onMounted, ref,watch } from 'vue';
     import Swal from 'sweetalert2';
     import axios from 'axios';
     onMounted(()=>{
    callFind();
    console.log("StoreAdsPhotoDtos",StoreAdsPhotoDtos);
  })
  const StoreAdsPhotoDtos = ref([]);
  onMounted(()=>{
    callFind();
    console.log("StoreAdsPhotoDtos",StoreAdsPhotoDtos);
  })
  async function callFind() {

Swal.fire({
    title: "Loading.....",
    showConfirmButton: false,
    allowOutsideClick: false,
});

axios.get("http://localhost:8080/storeads/allads").then(function(response) {

    console.log("response.data.success", response.data.success);
    if(response.data.success){
        StoreAdsPhotoDtos.value=response.data.list;
        setTimeout(function() {
            console.log(response.data.list)
            console.log("StoreAdsPhotoDtos.value111", StoreAdsPhotoDtos.value);
            Swal.close();
        }, 800);
    }
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
    .carousel-inner .carousel-item {
        transition: -webkit-transform 1s ease-in-out;
        transition: transform 1s ease-in-out;
        transition: transform 1s ease-in-out, -webkit-transform 1s ease-in-out;
    }

    .carousel-item img {
        object-fit: fill; 
        height: 650px; 
        width: 100%;
    }
    .carousel-item {
        margin-right: -100%;
    }
</style>