<template>
  <div class="host" @click="isModalShow = true">
    <div class="top">
      <div class="label h4-font">{{ shortTask?.title }}.</div>
      <div class="marker-line" :class="markerColor"></div>
    </div>
    <div class="bottom">
      <div class="project-row secondary-row">
        <img src="@/assets/project-icon.png">
        <span>{{ shortTask?.projectName }}</span>
      </div>
      <div class="date-row secondary-row">
        <img src="@/assets/calendar-icon.png">
        <span>{{ shortTask?.deadline.dateStringOnly }}</span>
      </div>
      <div class="person-row secondary-row">
        <img src="@/assets/person-icon.png">
        <span>{{ shortTask?.contractorSurname }} {{ shortTask?.contractorName }}</span>
      </div>
    </div>
  </div>
  <ModalTemplate v-if="isModalShow">
    <FullTaskViwer :task-id="shortTask?.id"></FullTaskViwer>
  </ModalTemplate>
</template>

<script lang="ts">
import { ITaskShort } from '@/interfaces/ITaskShort';
import { defineComponent, PropType } from 'vue';
import ModalTemplate from './ModalTemplate.vue';
import FullTaskViwer from './FullTaskViwer.vue';
import { services } from '@/main';
import { Subscription } from 'rxjs';

export default defineComponent({
  name: "TaskCard",
  data()
  {
    return {
      isModalShow: false,
      subscription: [] as Subscription[],
    };
  },
  computed: {
    markerColor(): string
    {
      if (this.shortTask?.priorityId === "1")
      {
        return "red";
      }
      else if (this.shortTask?.priorityId === "2")
      {
        return "yellow";
      }
      return "blue";
    }
  },
  props: {
    shortTask: {
      type: Object as PropType<ITaskShort>
    }
  },
  created()
  {
    this.subscription.push(services.modalWindow.closeSignal$.subscribe(() =>
    {
      this.isModalShow = false;
    }));
  },
  unmounted()
  {
    this.subscription.forEach(s => s.unsubscribe());
  },
  components: { FullTaskViwer, ModalTemplate }
})
</script>

<style lang="scss" scoped>
.host {
  // height: calc(106 * var(--shpx));
  height: min-content;
  width: 100%;
  background-color: $white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  box-sizing: border-box;
  padding-inline: calc(12 * var(--shpx));
  padding-block: calc(10 * var(--swpx));
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  row-gap: calc(6 * var(--shpx));

  .top {
    display: flex;
    flex-direction: column;
    gap: calc(4 * var(--shpx));
    .marker-line{
      width: 100%;
      height: calc(2 * var(--shpx));
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: calc(4 * var(--shpx));
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
    }

  }
}
</style>