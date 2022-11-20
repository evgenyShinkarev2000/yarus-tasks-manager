<template>
  <div class="host">
    <div class="right">
      <div class="marker" :class="markerColor"></div>
    </div>
    <div class="left">
      <div class="label h4-font">{{shortTask?.title}}.</div>
      <div class="date-row secondary-row">
        <img src="@/assets/calendar-icon.png">
        <span>{{shortTask?.deadline.dateStringOnly}}</span>
      </div>
      <div class="person-row secondary-row">
        <img src="@/assets/person-icon.png">
        <span>{{shortTask?.contractorSurname}} {{shortTask?.contractorName}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ITaskShort } from '@/interfaces/ITaskShort';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "TaskCard",
  data() {
    return {
      
    }
  },
  computed: {
    markerColor(): string{
      if (this.shortTask?.priorityId === "1"){
        return "red";
      } else if(this.shortTask?.priorityId === "2"){
        return "yellow";
      }

      return "blue";
    }
  },
  props:{
    shortTask: {
      type: Object as PropType<ITaskShort>
    }
  },
  created(){
  }
})
</script>

<style lang="scss" scoped>
.host {
  height: calc(106 * var(--shpx));
  width: 100%;
  background-color: $white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  box-sizing: border-box;
  padding-inline: calc(12 * var(--shpx));
  padding-block: calc(12 * var(--swpx));
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: auto;
  column-gap: $span-gap-1;

  .left {
    grid-row: 1;
    grid-column: 1;
    display: grid;
    align-content: space-between;
    grid-template-rows: auto min-content min-content;

    .label {
      grid-row: 1;
      text-align: left;
    }

    .secondary-row {
      @extend .secondary-2-font;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: calc(6 * var(--shpx));

      img {
        width: calc(16 * var(--swpx));
        height: calc(16 * var(--shpx));
      }

      &.date-row {
        grid-row: 2;
      }

      &.person-row {
        grid-row: 3;
      }
    }


  }

  .right {
    grid-row: 1;
    grid-column: 2;

    .marker {
      width: calc(32 * var(--swpx));
      height: calc(14 * var(--shpx));
      border-radius: 7.5px;

      &.blue {
        background-color: $light-blue;
      }

      &.yellow {
        background-color: $yellow;
      }

      &.red {
        background-color: $red;
      }
    }
  }
}
</style>