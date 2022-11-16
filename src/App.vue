<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

function UnlockScaling(): void{
  const appElement = document.querySelector("#app");
      if (!appElement){
        return;
      }
      const htmlAppElement = appElement as HTMLElement;
      const solvedWidth = getComputedStyle(appElement).getPropertyValue("--swpx");
      const solvedHeight = getComputedStyle(appElement).getPropertyValue("--shpx");
      htmlAppElement.style.setProperty("--swpx", (window.innerWidth / 1920).toString() + "px");
      htmlAppElement.style.setProperty("--shpx", (window.innerHeight / 1080).toString() + "px");
}

 export default defineComponent({
    name: "App",
    mounted(){
      UnlockScaling();
    }
  })
</script>

<style lang="scss">
@import '@/styles/spx.scss';
@import '@/styles/remove-default.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $white;
}



a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
