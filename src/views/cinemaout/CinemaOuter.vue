<template>

    <!-- <div id="carouselExampleCaptions" class="carousel slide adv" data-bs-ride="carousel" data-bs-pause="hover"  data-bs-interval="5000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner adv">
            <div class="carousel-item active">
                <img src="@/assets/images/homepage_20241106003.jpg" class="d-block w-100" alt="...">
                
            </div>
            <div class="carousel-item">
                <img src="@/assets/images/1.jpg" class="d-block w-100" alt="...">
                
            </div>
            <div class="carousel-item">
                <img src="@/assets/images/photos2.jpg" class="d-block w-100" alt="...">
                
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
    </div> -->

    <CinemaOuterAds></CinemaOuterAds>

    <main>
        <section class="photos">
            <!-- <img src="@/assets/images/1.jpg" alt="" class="cphoto">
            <img src="@/assets/images/photos2.jpg" alt="" class="cphoto"> -->
            <CinemaOuterSubPhoto :cinemas="cinemas" :nowSubPhoto="nowSubPhoto"></CinemaOuterSubPhoto>
        </section>
        <hr>
        <section class="cinemas">
            <section  class="topwrap">
                <section class="regionwrap">
                    <div class="region" v-for="region in regions" @click="regionChoose(region.regionNum)"><a @click.prevent="">{{region.region}}</a></div>
  
                    <!-- <CinemaRegion></CinemaRegion> -->
                </section>
            </section>
                <section class="cinemawrap">
                <!-- <section class="onecinema">
                        
                    <img src="@/assets/images/北1.jpg" alt="" class="cinemaimg">
                        
                    <div class="cinemaword">
                        <p>aaa店</p>
                        <p>影城地址：台北市信義區松壽路20號</p>
                        <p>聯絡方式:1234567890</p>
                    </div>
                </section>

                <section class="onecinema">
                        
                    <img src="@/assets/images/北2.jpg" alt="" class="cinemaimg">
                    
                    <div class="cinemaword">
                        <p>aaa店</p>
                        <p>影城地址：台北市信義區松壽路20號</p>
                        <p>聯絡方式:1234567890</p>
                    </div>
                </section>
                
                <section class="onecinema">   
                    <img src="@/assets/images/北3.jpg" alt="" class="cinemaimg">
                
                    <div class="cinemaword">
                        <p>aaa店</p>
                        <p>影城地址：台北市信義區松壽路20號</p>
                        <p>聯絡方式:1234567890</p>
                    </div>
                </section> -->
            </section> 
            <CinemaOuterAllStores :cinemas="cinemas" @nowStore="setNowStore"></CinemaOuterAllStores>
        </section>
    </main>
    <!-- <div @click="display">顯示</div> -->
</template>
    
<script setup>
    import CinemaOuterAds from "./CinemaOuterAds.vue"
    import CinemaOuterSubPhoto from './CinemaOuterSubPhoto.vue'
    import CinemaOuterAllStores from './CinemaOuterAllStores.vue'
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import { ref,onMounted } from 'vue';
    const cinemas=ref([
        
    ]);
    const nowSubPhoto=ref(0);
    // const cinema=ref({
    // });
    const regionFilter=ref(1);
    const regions=ref([]);

    onMounted(function(){
        callFindRegion();
        callFind();
        console.log(Object.entries(regions.value));
    });
    function setNowStore(index){

        Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
                
                
            setTimeout(function() {
                Swal.close();
                nowSubPhoto.value=index;
            }
        , 500);
        console.log("nowSubPhoto.value");
        console.log(nowSubPhoto.value);
    }
    function regionChoose(regionNum){
        console.log("數字");
        console.log(regionNum);
        regionFilter.value=regionNum;
        console.log("regionFilter.value",regionFilter.value);
        callFind();
    }
    // function display(){
    //     console.log(Object.entries(cinemas.value));
    // }

    async function callFindRegion() {
            Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            axios.get("http://localhost:8080/store/regions/findall").then(function(response) {

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
            axios.post("http://localhost:8080/store/regions/find", request).then(function(response) {

                console.log("response.data.count", response.data.count);
                console.log("request.regionFilter", request.regionFilter);
                console.log("response.data.list", response.data.list);
                console.log("cinemas.value",cinemas.value);
                setTimeout(function() {
                    cinemas.value=response.data.list;
                    
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
    main{
        display: flex;
        position: relative;
    }
    .photos{
        background-color: rgb(179, 179, 179);
        flex: 1 1 100px;
        height: auto;
        /* width: 100px; */
        margin: 80px 60px 10px 300px;

        text-align: center;
        padding-top:30px ;
    }
    hr{
        border: 3px dashed rgb(53, 51, 51);
    }
    .cinemas{
        position: relative;
        flex: 2 1 350px;
        margin:100px 300px 20px 40px;
        border: 4px solid gray;
        border-radius: 25px;
        padding: 80px 40px 40px 40px;
    }
    
    a{
        display: block;
        text-decoration: none;
        color: black;
        display: block;
    }
    a:hover{
        cursor:pointer;
    }
    .topwrap{
        display: flex;
        justify-content: center;
    }
    .region{
        border: 3px solid gray;
        width: 150px;
        height: 40px;
        border-radius: 25px;
        margin-left: 20px;
        background: white;
        text-align: center;
        vertical-align: middle;
        line-height: 35px;
    }
    .regionwrap{
        position: absolute;
        display: flex;
        top: -20px;
        
    }
</style>