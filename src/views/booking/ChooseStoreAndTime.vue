<template>
    <div>
        <div>選取影城</div>
        <!-- 影城列表 -->
        <div class="store-list">
            <button v-for="store in stores" :key="store.storeId" @click="clickStore(store)"
                :class="['store-button', selectedStore === store.storeId ? 'active' : '']">
                {{ store.name }}
            </button>
        </div>

        <!-- 日期和排片信息 -->
        <div v-if="schedules.length > 0">
            <div class="date-list">
                <button v-for="date in uniqueDates" :key="date" @click="selectDate(date)"
                    :class="['date-button', selectedDate === date ? 'active' : '']">
                    {{ formatDate(date) }} <br />
                    {{ getWeekday(date) }}
                </button>
            </div>

            <!-- 時間段按廳分组 -->
            <div class="schedule-container">
                <div v-for="(auditoriumSchedules, auditorium) in groupedSchedulesByAuditorium" :key="auditorium"
                    class="auditorium-schedule">
                    <div class="auditorium-name">{{ auditorium }}</div>
                    <div class="time-slot-list">
                        <button v-for="(schedule, index) in auditoriumSchedules" :key="schedule.timeSlots"
                            class="time-slot-button" @click.prevent="clickTimeSlots(schedule.timeSlots, index)">
                            {{ schedule.timeSlots }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue';
import axiosInstance from '@/utils/axiosInstance';
import useBookingStore from '@/stores/bookingStore';
import router from '@/router/router';

const stores = ref([]);
const schedules = ref([]);
const selectedStore = ref(null);
const selectedDate = ref(null);

const props = defineProps({
    id: {
        type: String, // 接收的类型
        required: true,
    },
    photo: {
        type: String,
        required: true,
        default: '',
    },
    movieName: {
        type: String,
        default: '未命名電影', // 默认值为提示文字
        required: true,
    },
});

// 获取影城列表
const getStore = async () => {
    try {
        const response = await axiosInstance.get(`/api/movie/${props.id}/stores`);
        stores.value = response.data.data;
    } catch (error) {
        console.error('Failed to fetch stores:', error);
    }
};

// 点击影城后获取其排片
const clickStore = async (store) => {
    const bookingStore = useBookingStore()

    try {
        const request = {
            storeId: store.storeId,
            movieId: props.id
        }
        console.log(request);

        selectedStore.value = store.storeId;
        const response = await axiosInstance.post('/store/schedules', request);
        schedules.value = response.data.data;
        if (schedules.value.length > 0) {
            // 默认选择第一个日期
            selectedDate.value = schedules.value[0].date;
        }
        console.log(schedules.value[0]);

        bookingStore?.setStoreId(store.storeId)
        bookingStore?.setStoreName(store.name)
        bookingStore.setMainPhoto(props.photo)
        bookingStore.setMovieName(props.movieName)
        bookingStore.setMovieId(props.id)
        console.log(bookingStore);
        
    } catch (error) {
        console.error('Failed to fetch schedules:', error);
    }
};

const clickTimeSlots = async (timeslot, index) => {
    const bookingStore = useBookingStore()

    bookingStore.setAuditoriumScheduleId(schedules.value[index].auditoriumScheduleId)
    bookingStore.setDate(selectedDate.value)
    bookingStore.setTimeslot(timeslot)
    
    await router.push({ name: 'booking-link' })
}

// 获取去重的日期
const uniqueDates = computed(() => {
    const dates = schedules.value.map((schedule) => schedule.date);
    return [...new Set(dates)];
});

// 选择日期
const selectDate = (date) => {
    selectedDate.value = date;
};

// 按廳分组的排片信息
const groupedSchedulesByAuditorium = computed(() => {
    const filteredSchedules = schedules.value.filter(
        (schedule) => schedule.date === selectedDate.value
    );

    return filteredSchedules.reduce((group, schedule) => {
        const auditoriumName = schedule.auditoriumName;
        if (!group[auditoriumName]) {
            group[auditoriumName] = [];
        }
        group[auditoriumName].push(schedule);
        return group;
    }, {});
});

// 格式化日期为 YYYY-MM-DD
const formatDate = (date) => date.split(' ')[0]; // 假设 date 为 'YYYY-MM-DD HH:mm:ss'

// 获取日期对应的星期
const getWeekday = (date) => {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const day = new Date(date).getDay();
    return weekdays[day];
};

// 初始加载影城
onMounted(() => {
    if (props?.id) {
        getStore();
    }
});
</script>



<style scoped>
.store-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.store-button {
    padding: 10px 20px;
    border: 1px solid #6a0dad;
    background-color: white;
    color: #6a0dad;
    cursor: pointer;
    transition: all 0.3s ease;
}

.store-button.active {
    background-color: #6a0dad;
    color: white;
}

.date-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.date-button {
    padding: 10px;
    border: 1px solid #6a0dad;
    background-color: white;
    color: #6a0dad;
    cursor: pointer;
    transition: all 0.3s ease;
}

.date-button.active {
    background-color: #6a0dad;
    color: white;
}

.schedule-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.auditorium-schedule {
    border: 1px solid #6a0dad;
    padding: 10px;
    border-radius: 5px;
}

.auditorium-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
    color: #6a0dad;
}

.time-slot-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.time-slot-button {
    padding: 5px 10px;
    border: 1px solid #6a0dad;
    background-color: white;
    color: #6a0dad;
    cursor: pointer;
    transition: all 0.3s ease;
}

.time-slot-button:hover {
    background-color: #6a0dad;
    color: white;
}
</style>
