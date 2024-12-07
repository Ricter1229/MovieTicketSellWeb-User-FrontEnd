<template>
    <nav ref="navbarRef" class="navbar navbar-expand-lg">
        <div class="container">
            <RouterLink to="/" class="navbar-brand" @click="()=>bookingStore.resetStore()">CinemaVerse</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
    
                    <li v-if="!usersStore.isLogin" class="nav-item">
                        <RouterLink to="/secure/login" class="nav-link" aria-current="page" >登入</RouterLink>
                    </li>
                    <li v-if="!usersStore.isLogin" class="nav-item">
                        <RouterLink to="/secure/register" class="nav-link" aria-current="page" >註冊</RouterLink>
                    </li>

                    <li v-if="usersStore.account == 'sa'" class="nav-item" v-show="usersStore.isLogin">
                        <RouterLink to="/admin" class="nav-link" aria-current="page" >管理</RouterLink>
                    </li>
                    <li class="nav-item" v-show="usersStore.isLogin">
                        <RouterLink to="/user" class="nav-link" aria-current="page" >用戶</RouterLink>
                    </li>
                    <li v-if="usersStore.isLogin" class="nav-item">
                        <button @click="logout" class="nav-link btn btn-link">登出</button>
                    </li>

                    <li class="nav-item dropdown" >
                        <span class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                role="button" aria-expanded="false">
                            電影管理
                        </span>
                        <ul class="dropdown-menu">
                            <li><RouterLink class="dropdown-item" to="/movie">電影</RouterLink></li>
                            <li><RouterLink class="dropdown-item" to="/moviefront">電影前端暫放用</RouterLink></li>
                            <!-- <li><RouterLink class="dropdown-item" to="/onemovie">單一電影前端暫放用</RouterLink></li> -->
                        </ul>
                    </li>

<!-- temp test -->
                    <li class="nav-item">
                        <RouterLink to="/test-userticket" class="nav-link" aria-current="page" >測試user ticket</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/cinemas/all" class="nav-link" aria-current="page" >影城一覽</RouterLink>
                    </li>

<!-- temp test -->
                    <li class="nav-item">
                        <RouterLink to="/test" class="nav-link" aria-current="page" >測試store</RouterLink>
                    </li>

                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fas fa-ticket-alt me-2"></i>服務</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fas fa-envelope me-2"></i>聯絡我們</a>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import useBookingStore from '@/stores/bookingStore';
    const bookingStore = useBookingStore()
    import useUsersStore from '@/store/users.js';
    const usersStore = useUsersStore();

    const logout = () => {
        usersStore.logout();
        alert("您已成功登出。");
        router.push({ name: "home-link" });
    };
    import { onMounted, ref } from 'vue';
    const navbarRef = ref(null); 
    const emits = defineEmits(["updateHeight"])
    onMounted(() => {
        const navbarHeight = navbarRef.value.offsetHeight;
        emits('updateHeight', navbarHeight); 
    });
</script>

<style scoped>
    .navbar {
        
        background-color: rgba(0, 0, 0, 0.8) !important;
        backdrop-filter: blur(10px);
        position: fixed;
        width: 100%;
        z-index: 1000;
        padding: 1rem 0;
        transition: all 0.3s ease;
    }

    .navbar-brand {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(45deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .navbar .nav-link {
        color: white !important;
        padding: 0.5rem 1.2rem !important;
        margin: 0 0.3rem;
        font-size: 1.1em;
        transition: all 0.3s ease;
        border-radius: 25px;
    }

    .navbar .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
</style>