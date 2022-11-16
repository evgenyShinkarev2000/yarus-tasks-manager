<template>
  <div class="page">
    <div class="container">
      <h1 class="h1-font"><span class="deep-blue">Ярус.</span><span class="light-blue">Планировщик</span></h1>
      <div class="form">
        <router-view />
      </div>
    </div>
  </div>

</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import { services } from '@/main';

export default defineComponent({
  name: 'AuthPage',
  data() {
    return {
      services
    }
  }
});
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-columns: auto;
  justify-content: center;

  .container {
    margin-top: 22vh;
    width: calc(488 * var(--swpx));


    h1 {
      text-align: left;
      padding-left: calc(28 * var(--swpx));
      margin-bottom: calc(18 * var(--shpx));
      .deep-blue {
        color: $deep-blue;
      }

      .light-blue {
        color: $light-blue;
      }
    }

    .form {
      height: min-content;
      background: rgba(225, 225, 225, 0.6);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
      border-radius: calc(24 * var(--swpx));
      padding-inline: calc(24 * var(--swpx));
      padding-block: calc(24 * var(--shpx));
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
    