<template>
  <section class="center-x">
    <div class="controls-container controls">
      <div class="left">
        <DropDownList :place-holder="'Все проекты'" :options="['1', '2', '3']"></DropDownList>
        <DropDownList :place-holder="'Мои задачи'" :options="['1', '2', '3']"></DropDownList>
      </div>
      <div class="right">
        <button class="create-btn button-font-1">Создать новую задачу</button>
      </div>
    </div>
  </section>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import { services } from '@/main';
import DropDownList from './DropDownList.vue';

export default defineComponent({
  name: "Controls",
  data() {
    return {
      services
    };
  },
  components: { DropDownList }
});
</script>
    
<style scoped lang="scss">
  .controls{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $span-gap-2;
    .left{
      display: flex;
      justify-content: space-between;
      gap: $span-gap-1;
      width: calc(628 * var(--swpx));
    }
    .right{
      .create-btn{
        border-radius: calc(32 * var(--swpx));
        background-color: $light-blue;
        width: calc($column-width * var(--swpx));
        height: calc(48 * var(--shpx));
      }
    }
  }
</style>
    