<template>
    <Carousel v-bind="config" style="width: 450px;">
        <Slide v-for="(img,index) in cinema.storeSubPhotoDtos" :key="index">

        <img :src="img.photo" class="ph">
        </Slide>

        <template #addons>
        <Navigation />
        </template>
    </Carousel>
</template>
    
<script setup>
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';
    import { defineProps} from 'vue';
    const props=defineProps(["cinema"]);
    const config = {
    itemsToShow: 2.5,
    wrapAround: true,
    };
</script>
    
<style scoped>
    .ph{
        height: 110px;
        width: 150px;
    }
</style>