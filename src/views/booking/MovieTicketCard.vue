<template>
    <div class="d-flex align-items-start card-container">
        <!-- 圖片區 -->
        <div class="card-img-top">
            <img 
                class="movie-photo" 
                alt="SAO" 
                src="../../assets/images/SAO.jpg" 
            >
        </div>
        <!-- 文字區 -->
        <div class="card-details ms-3">
            <div class="movie-title fw-bold">{{ bookingStore.movieName }}</div>
            <div class="movie-location text-muted">台北大安店</div>
            <div class="movie-date text-muted">{{ bookingStore.timeslot }}</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '@/utils/axiosInstance';
import useBookingStore from '@/stores/bookingStore';
const bookingStore = useBookingStore()

const init = async () => {
    try {
        const response = await axiosInstance.get("api/movie/movies/" + bookingStore.movieId)
        bookingStore.setMovieName = response.data.list[0].chineseName
    } catch(err) {
        console.log(err);
    }
}

onMounted(()=>{
    init()
})
</script>

<style scoped>
.card-container {
    max-width: 500px; /* 限制整體卡片的寬度 */
    padding: 10px;
    border: 1px solid #ddd; /* 添加邊框 */
    border-radius: 8px; /* 圓角效果 */
    background-color: #f9f9f9; /* 淡灰背景 */
}

.card-img-top {
    object-fit: cover; /* 使圖片不失真地填充 */
    max-width: 40%; /*確保圖片不超出容器*/
    align-content: center;
}

.card-img-top img {
    object-fit: cover; /* 使圖片不失真地填充 */
    width: auto; /* 固定圖片寬度 */
    height: 200px; /* 固定圖片高度 */
    border-radius: 8px; /* 圖片圓角效果 */
}

.card-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.movie-title {
    font-size: 30px; /* 文字大小 */
}

.movie-location,
.movie-date {
    font-size: 20px;
    margin-top: 5px; /* 每行間距 */
}
</style>
