import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Forbidden from "@/views/Forbidden.vue";
import Register from "@/views/secure/Register.vue";
import Login from "@/views/secure/Login.vue";
import User from "@/views/user/User.vue";
import ResetPassword from "@/views/secure/ResetPassword.vue";
import Admin from "@/views/admin/Admin.vue";

const routes = [
    { path: "/", name: "home-link", component: Home },
    { path: "/:pathMatch(.*)", name: "notfound-link", component: NotFound },
    { path: "/403", name: "forbidden-link", component: Forbidden },

    { path: "/secure/register", name: "register-link", component: Register },
    { path: "/secure/login", name: "login-link", component: Login },
    { path: "/user", name: "user-link", component: User },
    { path: '/secure/reset-password', name: 'reset-password', component: ResetPassword },

    { path: "/admin", name: "admin-link", component: Admin },
];

export default createRouter({
    history: createWebHistory(),
    routes: routes
});
