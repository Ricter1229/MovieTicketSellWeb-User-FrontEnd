<template>
    <section class="onecinema">
                
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
    </section>
</template>
    
<script setup lang='ts'>
    
</script>
    
<style scoped>
    .onecinema{
        
        display: flex;
        margin-bottom: 20px;
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
        flex: 2 1 700px;
    }

    p{
        margin-bottom: 10px;
    }
</style>