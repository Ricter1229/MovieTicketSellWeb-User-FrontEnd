<template>
    <div>
      <Navigationbar></Navigationbar>
    </div>
    <RouterView></RouterView>
</template>

<script setup>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap/dist/js/bootstrap.bundle.min.js"
  import Navigationbar from "./views/Navigationbar.vue";

</script>
  
<style>
  
</style>