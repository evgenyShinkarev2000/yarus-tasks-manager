<template>
  <div class="form">
    <div class="h3-font">Невозможно завершить задачу</div>
    <div class="line" v-if="!fullTask.actualTime || fullTask.actualTime <= 0"><span class="h4-font">
      Не указано временя выполнения</span>
    <ExecutionTime :container="actualTimeContainer"></ExecutionTime></div>
    
    <span class="h4-font" v-if="!isSourceTaskStagesComplete">Нужно закрыть все этапы</span>
    <CheckList :mode="'check'" :items$="checkList$"></CheckList>
    <div class="center">
      <button class="modal-button accept-btn" :class="isTaskCopyComplete ? '' : 'disable'" @click="acceptClick">Завершить</button>
    </div>
  </div>

</template>

<script lang="ts">
import { ICheckedListItem } from '@/interfaces/ICheckedListItem';
import { ITaskFull } from '@/interfaces/ITaskFull';
import { services } from '@/main';
import { TaskFull } from '@/view-models/TaskVM';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { defineComponent, PropType } from 'vue';
import CheckList from './CheckList.vue';
import ExecutionTime from './ExecutionTime.vue';

export default defineComponent({
  name: "ErrorCloseTask",
  props: {
    fullTask: {
      type: Object as PropType<ITaskFull>,
      required: true,
    }
  },
  created(){
    this.subscriptions.push(this.checkList$.subscribe(updatedCheckList => {
      this.isTaskCopyStagesComplete = this.checkStagesComplete(updatedCheckList);
    }));
  },
  computed: {
    isSourceTaskStagesComplete(): boolean
    {
      return this.checkStagesComplete(this.fullTask.checkList);
    },
    isTaskCopyComplete(): boolean{
      return this.isTaskCopyStagesComplete && this.actualTimeContainer.value > 0;
    }
  },
  data()
  {
    const fullTaskCopy = new TaskFull(this.fullTask).getCopy();
    return {
      checkList$: new BehaviorSubject(fullTaskCopy.checkList),
      fullTaskCopy,
      actualTimeContainer: {value: fullTaskCopy.actualTime},
      subscriptions: [] as Subscription[],
      isTaskCopyStagesComplete: false,
    }
  },
  methods:{
    checkStagesComplete(items: ICheckedListItem[]): boolean{
      for (const item of items)
      {
        if (!item.isClosed)
        {
          return false;
        }
      }
      return true;
    },
    acceptClick(): void{
      if (!this.isTaskCopyComplete){
        return;
      }
      this.fullTaskCopy.checkList = this.checkList$.value;
      this.fullTaskCopy.actualTime = this.actualTimeContainer.value;
      services.resourceManager.putTask(this.fullTask, this.fullTaskCopy).pipe(first()).subscribe();
      services.modalWindow.closeSignal$.next();
    },
  },
  components: { CheckList, ExecutionTime }
})
</script>

<style lang="scss" scoped>
@import "@/styles/modal-button.scss";
.form {
  display: flex;
  flex-direction: column;
  gap: calc(8 * var(--shpx));
  flex: 1 1 auto;
  .line{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .accept-btn{
    background-color: $light-blue;
    &.disable{
      opacity: 0.65;
    }
  }
}
</style>