<template>
    
    
        <section class="onecinema" v-for="(cinema,index) in cinemas" :key="index" >
            <!-- <section> -->

                <section class="cinema" @click="doclick(index)">
                    <img :src="cinema.mainPhoto" alt="" class="cinemaimg">
                        
                    <div class="cinemaword">
                        <p>{{cinema.name}}</p>
                        <p>影城地址:{{cinema.address}}</p>
                        <p>聯絡方式:{{cinema.phoneNo}}</p>
                    </div>
    
                </section>    
                <button @click="search(cinema)"> 
                    查看
                </button>
            <!-- </section> -->
        </section>

        <!-- <section class="onecinema">
                
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
    
</template>
    
<script setup>
    import { defineProps,defineEmits } from 'vue';
    import Swal from 'sweetalert2';
    import { useRouter } from 'vue-router';
    const emits = defineEmits(["nowStore"]);
    const props=defineProps(["cinemas"]);
    const router = useRouter();
    function doclick(index) {
        emits("nowStore",index);
    }
    function search(cinema){
        Swal.fire({
                title: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        setTimeout(function() {
            router.push(`/cinemas/all/${cinema.storeId}`);
                Swal.close();
            }, 500);
        

    }
</script>
    
<style scoped>
    .onecinema{
        display: flex;
        margin-bottom: 20px;
        padding: 10px;
    }
    .cinema{
        
        display: flex;
    }
    button{
 
    }
    .cinema:hover{
        background-color: rgb(202, 202, 202);
        
    }
    .cinemaimg{
        background-color: blue;
        flex: 1 1 350px;
        
        height: 220px;
        width: 330px;
    }
    .cinemaword{
        padding-top: 50px;
        padding-left: 60px;
        width: 400px;
        flex: 2 1 700px;
    }

    p{
        margin-bottom: 10px;
    }
    
   
    

</style>