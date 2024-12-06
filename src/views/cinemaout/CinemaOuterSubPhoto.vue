<template>
    <img v-if="props.cinemas.length!=0" :src="cinema.photo" alt="" class="cphoto" v-for="cinema in props.cinemas[props.nowSubPhoto].storeSubPhotoDtos">
    <!-- <div @click="a">顯示</div> -->
</template>
    
<script setup>
    import { defineProps } from 'vue';
    const props=defineProps(["cinemas","nowSubPhoto"]);
    // function a(){
    //     console.log("cinemas.storeSubPhotoDtos");
    //     console.log(props.cinemas[1].storeSubPhotoDtos);
    // }
</script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .cphoto{
        height: 180px;
        width: 250px;
        margin: 20px 5px 20px 5px;
    }

    
</style>