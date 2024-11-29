import { createRouter , createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Movie from "@/views/pages/Movie.vue";
import MovieFront from "@/views/pages/MovieFront.vue";
import OneMovie from "@/views/pages/OneMovie.vue";

const routes = [
    {name:"home-link" , path:"/" , component: Home},
    {name:"movie-link" , path:"/movie" , component: Movie},
    {name:"moviefront-link" , path:"/moviefront" , component: MovieFront},
    {name:"onemovie-link" , path:"/onemovie/:id" , component: OneMovie ,props: true},
]

export default createRouter({
    history: createWebHistory(),//process.env.BASE_URL
    routes: routes,
})