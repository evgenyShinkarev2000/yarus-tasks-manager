<template>
  <div class="wrapper">
    <Controls></Controls>
    <div class="main">
      <div class="scroll-button left">
        <img src="@/assets/arrow-icon.png">
      </div>
      <div class="columns">
        <Column v-for:="i of taskStatuses" :status="i"></Column>
      </div>
      <div class="scroll-button right">
        <img class="rotate-180" src="@/assets/arrow-icon.png">
      </div>
    </div>
  </div>

  <!-- <img class="mock-img" src="@/assets/tasks.png"> -->
</template>
  
<script lang="ts">
import { IIdPairName } from '@/interfaces/IIdPairName';
import { services } from '@/main';
import { defineComponent } from 'vue';
import Column from './Column.vue';
import Controls from './Controls.vue';

export default defineComponent({
  name: "TasksPage",
  components: { Controls, Column },
  data(){
    return {
      taskStatuses: [] as IIdPairName[],
      services
    }
  },
  created(){
    this.services.resourceManager.initTasks();
    services.resourceManager.getStatuses().then((data: IIdPairName[]) => {
      this.taskStatuses = data;
    });
  },
  mounted() {
    
  },
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$prevent-shadow-cut: 10;

.wrapper {
  padding-block: calc(20 * var(--shpx));
  padding-inline: calc(20 * var(--swpx));
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: min-content auto;
  row-gap: calc((20 - $prevent-shadow-cut) * var(--shpx));

  .main {
    display: grid;
    justify-self: center;
    grid-template-columns: min-content calc(($main-container-width + 22) * var(--swpx)) min-content; // чтобы добавить padding и не резать тень
    column-gap: calc(11 * var(--swpx));

    .left {
      grid-column: 1;
    }

    .columns {
      grid-column: 2;
      padding-block: calc(10 * var(--shpx));
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding-inline: calc(11 * var(--swpx));
    }

    .right {
      grid-column: 3;
    }
  }
}


.scroll-button {
  width: calc(44 * var(--swpx));
  border-radius: 13px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  margin-top: calc(10 * var(--shpx));
  margin-bottom: calc(30 * var(--shpx));
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: calc(22 * var(--swpx));
  }
}

.mock-img {
  width: calc(1920 * var(--swpx));
}

.rotate-180 {
  transform: rotate(180deg);
} 
</style>
  