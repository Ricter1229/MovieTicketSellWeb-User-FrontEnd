<template>
    <LMap :zoom="zoom" :center="center" class="map" style="height: 400px;">
        <!-- 地图瓦片层 -->
        <LTileLayer v-model:url="url" :attribution="attribution" />

        <!-- 标记示例 -->
        <LMarker :lat-lng="cinemaMap.position" v-if="cinemaMap.name">
            <LPopup>{{cinemaMap.name}}</LPopup>
        </LMarker>
    </LMap>

</template>
    
<script setup>
    // Vue-leaflet 组件
    import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
    import 'leaflet/dist/leaflet.css';
    import { defineProps,ref,watch} from "vue";
    import { icon, Marker } from 'leaflet';
    import "leaflet/dist/images/marker-shadow.png";
    
    
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const props=defineProps(["cinemaMap"]);

    const zoom = 19; // 缩放级别
    const center = ref([0,0]); // 地图中心（纬度，经度）


    function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 平滑滚动
  });
}
    watch(
  () => props.cinemaMap, // 监听的目标
  (newValue) => {
    // 在此处理变化逻辑

    setTimeout(() => {
      center.value =[props.cinemaMap.position[0],props.cinemaMap.position[1]];
}, 300);
scrollToTop();
  },
  { deep: true }
)


    // OpenStreetMap 瓦片服务
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

 


</script>
    
<style scoped>

    .map{

        margin-top: 60px;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .map_mark{
        font-size: 40px;
    }
</style>