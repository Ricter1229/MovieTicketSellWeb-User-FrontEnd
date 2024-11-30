import { createRouter, createWebHistory } from "vue-router"
import MainPage from "@/views/main_page/MainPage.vue"
import BookingIndex from "@/views/booking/BookingIndex.vue"


import NotFound from "@/views/NotFound.vue";
import Forbidden from "@/views/Forbidden.vue";
import Register from "@/views/secure/Register.vue";
import Login from "@/views/secure/Login.vue";
import ResetPassword from "@/views/secure/ResetPassword.vue";

import Movie from "@/views/pages/Movie.vue";
import MovieFront from "@/views/pages/MovieFront.vue";
import OneMovie from "@/views/pages/OneMovie.vue";

// temp
import TempMoney from "@/views/TempMoney.vue"

const routes = [
// user
    // { path: "/", name: "home-link", component: Home },
    { path: "/:pathMatch(.*)", name: "notfound-link", component: NotFound },
    { path: "/403", name: "forbidden-link", component: Forbidden },

    { path: "/secure/register", name: "register-link", component: Register },
    { path: "/secure/login", name: "login-link", component: Login },
    { path: '/secure/reset-password', name: 'reset-password', component: ResetPassword },

// movie
    { name:"movie-link" , path:"/movie" , component: Movie},
    { name:"moviefront-link" , path:"/moviefront" , component: MovieFront},
    { name:"onemovie-link" , path:"/onemovie/:id" , component: OneMovie ,props: true},


// booking
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

// temp 
    { path: "/money", name: "temp-money-link", component: TempMoney },
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})
