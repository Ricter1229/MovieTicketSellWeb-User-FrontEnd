<template>
    <Carousel v-bind="config" style="width: 450px;">
        <Slide v-for="(img,index) in imgs" :key="index">

        <img :src="img.src" class="ph">
        </Slide>

        <template #addons>
        <Navigation />
        </template>
    </Carousel>
</template>
    
<script setup>
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import { ref } from 'vue';

    const config = {
    itemsToShow: 2.5,
    wrapAround: true,
    };
    const imgs = ref([
        { src: new URL('@/assets/images/北1.jpg', import.meta.url).href, alt: "" },
        { src: new URL('@/assets/images/北2.jpg', import.meta.url).href, alt: "" },
        { src: new URL('@/assets/images/北3.jpg', import.meta.url).href, alt: "" },
        { src: new URL('@/assets/images/北3.jpg', import.meta.url).href, alt: "" },
        { src: new URL('@/assets/images/北3.jpg', import.meta.url).href, alt: "" },
        { src: new URL('@/assets/images/北3.jpg', import.meta.url).href, alt: "" },

    ]);
</script>
    
<style scoped>
    .ph{
        height: 110px;
        width: 150px;
    }
</style>