<template>
    <div id="carouselExampleCaptions" class="carousel slide adv" data-bs-ride="carousel" data-bs-pause="hover"  data-bs-interval="5000">
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
    </div>
</template>
    
<script setup>
    
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