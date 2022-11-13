<template>
  <div class="column">
    <div class="title h2-font"> Статус </div>
    <div class="cards">
      <div class="card" v-for:="i of [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10 , 11]" :key="i">
        <TaskCard></TaskCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">import { defineComponent } from 'vue';
import TaskCard from './TaskCard.vue';

export default defineComponent({
  name: "Column",
  components: { TaskCard }
})
</script>

<style lang="scss" scoped>
.column {
  height: calc(880 * var(--shpx)); // не работате скролл без фиксированной высоты. 
  display: flex;
  flex-direction: column;
  background-color: $grey-1;
  box-shadow: 0px 0px 7.5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: calc(300 * var(--swpx));

  .title {
    padding-top: calc(12 * var(--shpx));
    height: calc(36 * var(--shpx));
    margin-bottom: calc(10 * var(--shpx)); // либо тень образается, либо статус
  }

  .cards {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: calc(10 * var(--shpx));
    box-sizing: border-box;
    padding-bottom: calc(10 * var(--shpx));
    padding-inline: 8px;
    overflow-y: auto;
  }
}
</style>