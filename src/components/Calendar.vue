<template>
  <div class="short-calendar" v-if="isShorted">
    <img class="calendar-icon" src="@/assets/calendar-icon.png">
    <p class="date">{{formatedDate}}</p>
  </div>
  <div class="full-calendar" v-else></div>
</template>

<script lang="ts">import { BehaviorSubject } from 'rxjs';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "Calendar",
  created()
  {
  },
  props: {
    isShorted: {
      default: true,
      type: Boolean
    },
    selectedDate$: {
      required: true,
      type: Object as PropType<BehaviorSubject<Date | undefined>>,
    }
  },
  computed: {
    formatedDate(): string{
      const date = this.selectedDate$?.value;

      return `${date?.getDate()}.${date?.getMonth()}.${date?.getFullYear()}`;
    }
  }
})
</script>

<style lang="scss" scoped>
.short-calendar {
  width: min-content;
  height: calc(32 * var(--shpx));
  background: #E4E4E4;
  border: 1px solid #C1C1C1;
  border-radius: 15px;
  padding-inline: calc(20 * var(--swpx));
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(16 * var(--swpx));

  .calendar-icon {
    width: calc(20 * var(--swpx));
  }

  .date {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #595959;
  }
}
</style>