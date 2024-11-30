<template>
    
            <div class="preview-item" v-for="(photo, index) in props.photos" :key="index">
                <img :src="photo.url" alt="Uploaded Image" class="subImg" />
                <button @click.prevent="$emit('remove-image',index)" class="remove-btn">Remove</button>
            </div>
    <div @click="test">圖片測試</div>
</template>
    
<script setup>
import { defineProps } from 'vue';

// 接收父组件传递的属性
const props=defineProps(['photos']);

function test(){
    // console.log(image);
    console.log(props.photos);
}
</script>
    
<style scoped>
    .subImg{
        height: 170px;
        width:  250px;
        margin-bottom: 20px;
        margin-right: 20px;
    }
    .preview-item{
        position: relative;
    }
    .remove-btn{
        position: absolute;
        right: 30px;
        top:10px;
    }
</style>