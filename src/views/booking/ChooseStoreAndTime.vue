<template>
    <div>
        <div>選取影城</div>
        <!-- 影城列表 -->
        <div class="store-list">
            <button
                v-for="store in stores"
                :key="store.storeId"
                @click="clickStore(store.storeId)"
                :class="['store-button', selectedStore === store.storeId ? 'active' : '']"
            >
                {{ store.name }}
            </button>
        </div>

        <!-- 日期和排片信息 -->
        <div v-if="schedules.length > 0">
            <div class="date-list">
                <button
                    v-for="date in uniqueDates"
                    :key="date"
                    @click="selectDate(date)"
                    :class="['date-button', selectedDate === date ? 'active' : '']"
                >
                    {{ formatDate(date) }} <br />
                    {{ getWeekday(date) }}
                </button>
            </div>

            <!-- 時間段與版本 -->
            <div class="schedule-list" v-for="version in uniqueVersions" :key="version">
                <div class="version-title">{{ version }}</div>
                <div class="time-slot-list">
                    <button
                        v-for="schedule in filteredSchedulesByVersion(version)"
                        :key="schedule.timeSlots"
                        class="time-slot-button"
                    >
                        {{ schedule.timeSlots }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue';
import axiosInstance from '@/utils/axiosInstance';
import useBookingStore from '@/stores/bookingStore';

const bookingStore = useBookingStore()
const stores = ref([]);
const schedules = ref([]);
const selectedStore = ref(null);
const selectedDate = ref(null);

const props = defineProps({
    id: {
        type: String, // 接收的类型
        required: true, // 必须传递
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
const clickStore = async (storeId) => {
    try {
        selectedStore.value = storeId;
        const response = await axiosInstance.get(`/store/${storeId}/schedules`);
        schedules.value = response.data.data;
        if (schedules.value.length > 0) {
            // 默认选择第一个日期
            selectedDate.value = schedules.value[0].date;
        }
    } catch (error) {
        console.error('Failed to fetch schedules:', error);
    }
};

// 获取去重的日期
const uniqueDates = computed(() => {
    const dates = schedules.value.map((schedule) => schedule.date);
    return [...new Set(dates)];
});

// 获取去重的版本
const uniqueVersions = computed(() => {
    const versions = schedules.value
        .filter((schedule) => schedule.date === selectedDate.value)
        .map((schedule) => schedule.version);
    return [...new Set(versions)];
});

// 按版本筛选时间段
const filteredSchedulesByVersion = (version) => {
    return schedules.value.filter(
        (schedule) =>
            schedule.date === selectedDate.value && schedule.version === version
    );
};

// 选择日期
const selectDate = (date) => {
    selectedDate.value = date;
};

// 格式化日期为 YYYY-MM-DD
const formatDate = (date) => {
    return date.split(' ')[0]; // 假设 date 为 'YYYY-MM-DD HH:mm:ss'
};

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
    padding: 10px 15px;
    border: 1px solid #800080;
    background-color: #fff;
    color: #800080;
    cursor: pointer;
    transition: background-color 0.3s;
}

.store-button.active {
    background-color: #800080;
    color: #fff;
}

.date-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.date-button {
    padding: 10px 15px;
    border: 1px solid #800080;
    background-color: #fff;
    color: #800080;
    cursor: pointer;
    transition: background-color 0.3s;
}

.date-button.active {
    background-color: #800080;
    color: #fff;
}

.schedule-list {
    margin-bottom: 20px;
}

.version-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #800080;
}

.time-slot-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.time-slot-button {
    padding: 10px 15px;
    border: 1px solid #800080;
    background-color: #fff;
    color: #800080;
    cursor: pointer;
    transition: background-color 0.3s;
}

.time-slot-button:hover {
    background-color: #800080;
    color: #fff;
}
</style>
