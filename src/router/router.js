import { createRouter, createWebHistory } from "vue-router"

import MainPage from "@/views/main_page/MainPage.vue"
import NotFound from "@/views/NotFound.vue";
import Forbidden from "@/views/Forbidden.vue";

// user
import Register from "@/views/secure/Register.vue";
import Login from "@/views/secure/Login.vue";
import User from "@/views/user/User.vue";
import ResetPassword from "@/views/secure/ResetPassword.vue";
import Admin from "@/views/admin/Admin.vue";

// movie
import Movie from "@/views/pages/Movie.vue";
import MovieFront from "@/views/pages/MovieFront.vue";
import OneMovie from "@/views/pages/OneMovie.vue";

// store
import CinemaOuter from '../views/cinemaout/CinemaOuter.vue'
import CinemaInner from '../views/cinemain/CinemaInner.vue'
// booking
import BookingIndex from "@/views/booking/BookingIndex.vue"

// temp
import TempMoney from "@/views/TempMoney.vue"
import TheWelcome from '../components/TheWelcome.vue'

const routes = [
// temp
    { path: "/money", name: "temp-money-link", component: TempMoney },
    { path: "/test", name: "test-link", component: TheWelcome },

// main page
    { path: "/", name: "main-page-link", component: MainPage },

// user
    { path: "/:pathMatch(.*)", name: "notfound-link", component: NotFound },
    { path: "/403", name: "forbidden-link", component: Forbidden },

    { path: "/secure/register", name: "register-link", component: Register },
    { path: "/secure/login", name: "login-link", component: Login },
    { path: "/user", name: "user-link", component: User },
    { path: '/secure/reset-password', name: 'reset-password', component: ResetPassword },

// movie
    { name:"movie-link" , path:"/movie" , component: Movie},
    { name:"moviefront-link" , path:"/moviefront" , component: MovieFront},
    { name:"onemovie-link" , path:"/onemovie/:id" , component: OneMovie ,props: true},

// store
    {name:"cinema-outer-link",path:'/cinemas/all',component:CinemaOuter},
    {name:"cinema-inner-link",path:'/cinemas/all/:id',component:CinemaInner},


// booking
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
    { path: "/admin", name: "admin-link", component: Admin },
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})
