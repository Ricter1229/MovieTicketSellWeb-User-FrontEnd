import { defineStore } from "pinia";
import { reactive } from "vue";

const useBookingStore = defineStore("bookingStore", {
  state: () => ({
    memberId: 1, // 用户 ID
    movieId: 1, // 电影 ID
    storeId: null, // 影城 ID
    timeslot: null, // 场次时间
    selectedSeats: [], // 已选择的座位
    selectedTickets: reactive([]), // 已选择的票种
    totalAmount: 0, // 总金额
    auditoriumScheduleId: 1, // 影厅排期 ID
    orderId: 0, // 订单 ID
  }),

  getters: {
    // 获取已选择的座位总数
    totalSelectedSeats: (state) => state.selectedSeats.length,

    // 是否选择了任何座位
    hasSelectedSeats: (state) => state.selectedSeats.length > 0,

    // 是否已设置影厅排期 ID
    hasAuditoriumSchedule: (state) => state.auditoriumScheduleId !== null,

    // 获取用户基本信息
    memberInfo: (state) => ({
      memberId: state.memberId,
      totalAmount: state.totalAmount,
    }),
  },

  actions: {
    // 设置用户 ID
    setMemberId(id) {
      this.memberId = id;
    },

    // 设置电影 ID
    setMovieId(id) {
      this.movieId = id;
    },

    // 设置影城 ID
    setStoreId(id) {
      this.storeId = id;
    },

    // 设置场次时间
    setTimeslot(slot) {
      this.timeslot = slot;
    },

    // 添加已选择的座位
    addSelectedSeat(seat) {
      if (!this.selectedSeats.includes(seat)) {
        this.selectedSeats.push(seat);
      }
    },

    // 移除已选择的座位
    removeSelectedSeat(seat) {
      this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
    },

    // 清空已选择的座位
    clearSelectedSeats() {
      this.selectedSeats = [];
    },

    // 设置总金额
    setTotalAmount(amount) {
      this.totalAmount = amount;
    },

    // 设置影厅排期 ID
    setAuditoriumScheduleId(id) {
      this.auditoriumScheduleId = id;
    },

    // 设置订单 ID
    setOrderId(id) {
      this.orderId = id;
    },
  },
});

export default useBookingStore;
