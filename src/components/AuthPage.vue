<template>
  <button @click="services.permissionService.authenticate('123', '123')">войти</button>
    <img src="@/assets/login.png">
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { services } from '@/main';
  
  export default defineComponent({
    name: 'AuthPage',
    data(){
      return{
        services
      }
    }
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    img{
        width: 100%;
        height: 100%;
    }
  </style>
  