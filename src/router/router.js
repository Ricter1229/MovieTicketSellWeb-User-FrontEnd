import { createRouter, createWebHistory } from "vue-router"
import MainPage from "@/views/main_page/MainPage.vue"
import BookingIndex from "@/views/booking/BookingIndex.vue"

// temp
import TempMoney from "@/views/TempMoney.vue"

const routes = [
    { path: "/", name: "main-page-link", component: MainPage },
    { path: "/movie", name: "movie-link", component: () => import('@/views/booking/choose_store_and_time/JustTempForBooking.vue') },
    { 
        path: "/booking", name: "booking-link", component: BookingIndex,
        children: [
            {
                path: "choose-ticket",
                name: "choose-ticket-link",
                component: () => import('@/views/booking/ChooseTicket.vue'), 
            },
            {
                path: "choose-seat",
                name: "choose-seat-link",
                component: () => import('@/views/booking/ChooseSeat.vue'), 
            },
            {
                path: "check-choose-deatil",
                name: "check-choose-deatil-link",
                component: () => import('@/views/booking/ShowChooseDetail.vue'), 
            },
            {
                path: "ticket-detail",
                name: "ticket-detail-link",
                component: () => import('@/views/booking/TicketDetail.vue'), 
            },
        ]
    },


    { path: "/money", name: "temp-money-link", component: TempMoney },
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})