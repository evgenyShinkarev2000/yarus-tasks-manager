<template>
  <div class="short-calendar" v-if="isShorted" @click="isShorted = !isShorted">
    <img class="calendar-icon" src="@/assets/calendar-icon.png">
    <p class="date">{{ formatedDate }}</p>
  </div>
  <div class="full-calendar" v-else ref="fullCalendar">
    <v-calendar :attributes="attributes" @dayclick="setDate"/>
  </div>
</template>

<script lang="ts">import { BehaviorSubject } from 'rxjs';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "Calendar",
  created()
  {
    document.addEventListener("click", this.collapseAtClickOutside)
  },
  unmounted(){
    document.removeEventListener("click", this.collapseAtClickOutside);
  },
  props: {
    isShortedProp: {
      default: true,
      type: Boolean
    },
    selectedDate$: {
      required: true,
      type: Object as PropType<BehaviorSubject<Date | undefined>>,
    }
  },
  computed: {
    formatedDate(): string
    {
      const date = this.selectedDate$?.value;

      return `${date?.getDate()}.${date?.getMonth()}.${date?.getFullYear()}`;
    },
    attributes(): any[]
    {
      const nowDateAttribute = { dates: new Date(), highlight: true, id: 1 };
      const deadLine = { dates: this.selectedDate$.value, highlight: "red", id: 2 };
      return [nowDateAttribute, deadLine];
    }
  },
  data()
  {
    return {
      isShorted: this.isShortedProp,
    }
  },
  methods: {
    setDate(date: any){
      this.selectedDate$.next(date.date);
    },
    collapseAtClickOutside(mouseEvent: MouseEvent): void{
      if (this.isShorted){
        return;
      }
      const fullCalendar = this.$refs.fullCalendar as HTMLElement;
      if (!wasClickInside(fullCalendar, mouseEvent)){
        this.isShorted = true;
      }
    }
  }
})

function wasClickInside(element: HTMLElement, mouseEvent: MouseEvent): boolean {
  const position = element.getBoundingClientRect();
  return position.left <= mouseEvent.clientX
    && position.right >= mouseEvent.clientX
    && position.top <= mouseEvent.clientY
    && position.bottom >= mouseEvent.clientY;
}
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