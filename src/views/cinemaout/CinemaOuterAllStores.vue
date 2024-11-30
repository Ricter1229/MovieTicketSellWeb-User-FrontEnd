<template>
    <section  class="topwrap">
        <section class="regionwrap">
            <!-- <div class="region"><a href="">北部</a></div>
            <div class="region"><a href="">中部</a></div>
            <div class="region"><a href="">南部</a></div> -->
            <CinemaRegion></CinemaRegion>
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
        <CinemaOneStore></CinemaOneStore>
    </section>
</template>
    
<script setup>
    import CinemaRegion from './CinemaRegion.vue'
    import CinemaOneStore from './CinemaOneStore.vue'
</script>
    
<style scoped>
    a{
        display: block;
    }
    .topwrap{
        display: flex;
        justify-content: center;
    }
    .regionwrap{
        position: absolute;
        display: flex;
        top: -20px;
        
    }
    
    

</style>