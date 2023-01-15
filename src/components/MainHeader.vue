<template>
  <header>
    <div class="main-header-container">
      <div class="left">
        <h1 class="h1-font">
          <span class="deep-blue">Ярус.</span><span class="light-blue">Планировщик</span>
        </h1>
        <nav>
          <RouterLink class="tasks link1-font" :to="{ name: 'tasks' }"><span class="link-label">Все задачи</span></RouterLink>
        </nav>
      </div>
      <div class="right">
        <div class="user-name">
          <span class="secondary1-font">{{services.resourceManager.currentUser.name}}</span>
        </div>
        <div @click="exit()" class="exit">
          <span class="h3-font">Выход</span>
          <img src="@/assets/exit-icon.png" class="exit-img">
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { services } from '@/main';
export default defineComponent({
  name: 'MainHeader',
  data(){
    return{
      services,
    }
  },
  created() {
  },
  computed: {

  },
  methods:{
    exit(): void{
      services.permissionService.exit();
      this.$router.push({name: 'login'});
      window.location.reload();
    }
  }
})
</script>
<style lang="scss" scoped>
header {
  height: calc(60 * var(--shpx));
  display: flex;
  justify-content: center;
  background-color: $white;

  .main-header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $span-gap-2;

    .left {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: $span-gap-1;
      flex-basis: calc(570 * var(--swpx));

      h1 {
        .deep-blue {
          color: $deep-blue;
        }

        .light-blue {
          color: $light-blue;
        }
        margin-bottom: calc(10 * var(--shpx));
      }

      nav {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .tasks {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          box-sizing: border-box;
          border-bottom: calc(4 * var(--shpx)) solid $light-blue;
          .link-label{
            margin-bottom: calc(10 * var(--shpx));
          }
        }
      }
    }

    .right {
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: flex-end;
      gap: calc(40 * var(--swpx));
      .user-name{
        margin-bottom: calc(10 * var(--swpx));
      }
      .exit{
        box-sizing: border-box;
        margin-bottom: calc(10 * var(--swpx));
        cursor: pointer;
        
        .exit-img{
          margin-left: calc(5 * var(--swpx));
          width: calc(20 * var(--swpx));
          height: calc(20 * var(--shpx));
          margin-bottom: calc(-1 * var(--shpx));
        }
      }
    }
  }
}
</style>