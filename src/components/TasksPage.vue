<template>
  <main class="backround-grey paddings">
    <div class="controls">
      <Controls></Controls>
    </div>
    <section class="wrapper">
      <div class="left scroll-button">
        <img class="arrow" src="@/assets/arrow-icon.png">
      </div>
      <div class="center">
        <div class="main-container">
          <Column class="column" v-for="i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="i"></Column>
        </div>
      </div>
      <div class="right scroll-button">
        <img class="arrow rotate-180" src="@/assets/arrow-icon.png">
      </div>
    </section>

  </main>
  <!-- <img class="mock-img" src="@/assets/tasks.png"> -->
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Column from './Column.vue';
import Controls from './Controls.vue';

export default defineComponent({
  name: "TasksPage",
  components: { Controls, Column }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
main {
  height: 100%;
  padding: calc(20 * var(--swpx));
  background-color: $light-grey;
  display: flex;
  flex-direction: column;
  align-items: center;

  .controls {
    margin-bottom: calc(20 * var(--swpx));
  }

  .wrapper {
    justify-self: center;
    display: grid;
    width: fit-content;
    height: 100%;
    grid-template-columns: calc(44 * var(--swpx)) auto calc(44 * car(--swpx));
    grid-template-rows: 100%;

    .left {
      grid-column: 1;
    }

    .center {
      grid-column: 2;
      padding-inline: calc(22 * var(--swpx));
      overflow-x: hidden;
      
      .main-container{
        height: 100%;
        overflow: visible;
        display: flex;
        justify-content: space-between;
        gap: calc(28 * var(--swpx));
      }

      .column {

      }
    }

    .right {
      grid-column: 3;
    }
  }
}

.scroll-button {
  width: calc(44 * var(--swpx));
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  background-color: rgba($white, 0.4);
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.25);
}

.arrow {
  width: calc(22 * var(--swpx));
}

.mock-img {
  width: calc(1920 * var(--swpx));
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
  