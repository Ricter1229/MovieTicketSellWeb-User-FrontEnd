<template>
    <h3>首頁 {{ usersStore.email }}</h3>

</template>
    
<script setup>
    import useUsersStore from '@/store/users.js';
    const usersStore = useUsersStore();

</script>
    
<style>
    
</style>