<template>
    <LMap :zoom="zoom" :center="center" class="map" style="height: 400px;">
        <!-- 地图瓦片层 -->
        <LTileLayer :url="url" :attribution="attribution" />

        <!-- 标记示例 -->
        <LMarker :lat-lng="[25.033235377481294, 121.56316582851451]">
            <LPopup>台北信義店</LPopup>
        </LMarker>
    </LMap>
</template>
    
<script setup>
    // Vue-leaflet 组件
    import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

    // 地图的基本设置
    const zoom = 17; // 缩放级别
    const center = [25.033235377481294, 121.56316582851451]; // 地图中心（纬度，经度）

    // OpenStreetMap 瓦片服务
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
</script>
    
<style scoped>

    .map{

        margin-top: 60px;
        background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .map_mark{
        font-size: 40px;
    }
</style>