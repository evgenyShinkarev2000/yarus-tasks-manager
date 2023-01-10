<template>
  <div class="column">
    <div class="title h2-font"> {{status?.name}} </div>
    <div class="cards tasks-scrollbar" @drop="drop" @dragover.prevent="dragOver" @dragend="dragEnd">
      <div class="card" v-for:="task of filteredByStatusTasks" :key="task.id" @dragstart="dragStart(task, $event)" draggable="true">
        <TaskCard :short-task="task"></TaskCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IIdPairName } from '@/interfaces/IIdPairName';
import { ITaskFull } from '@/interfaces/ITaskFull';
import { ITaskShort } from '@/interfaces/ITaskShort';
import { services } from '@/main';
import { catchError, first, map, of, switchMap, take } from 'rxjs';
import { defineComponent, h, PropType } from 'vue';
import ErrorCloseTask from './ErrorCloseTask.vue';
import TaskCard from './TaskCard.vue';

export default defineComponent({
  name: "Column",
  components: { TaskCard },
  props:{
    status: {
      type: Object as PropType<IIdPairName>,
    }
  },
  data(){
    return {
      services,
      tasksCards: [] as ITaskShort[]
    }
  },
  computed:{
    filteredByStatusTasks(): ITaskShort[]{
      if(!this.status){
        return [];
      }

      const filtered = this.tasksCards.filter(task => task.statusId === this.status!.id);
      filtered.sort((a, b) => {
        if(a.priorityId < b.priorityId){
          return 1;
        } else if(a.priorityId < b.priorityId){
          return -1;
        }
        
        if(a.deadline.date > b.deadline.date){
          return 1;
        } else if(a.deadline.date < b.deadline.date){
          return -1;
        }

        if(a.title > b.title){
          return 1;
        } else if (a.title < b.title){
          return -1;
        }

        return 0;
      });

      return filtered;
    }
  },
  mounted(){
    this.services.resourceManager.taskFilter.filteredElements$.subscribe(tasks => {
      this.tasksCards = tasks;
      this.$forceUpdate();
    })
  },
  methods:{
    dragStart(task: ITaskShort, e: DragEvent){
      e.dataTransfer!.setData("task", JSON.stringify(task));
    },
    drop(e: DragEvent){
      const taskString = e.dataTransfer!.getData("task");
      const task = JSON.parse(taskString) as ITaskShort;
      if (!task || task.statusId === this.status?.id){
        return;
      }
      this.changeTaskStatus(task);
    },
    dragOver(e: DragEvent){
    },
    changeTaskStatus(task: ITaskShort): void{
      services.resourceManager
      .getFullTaskById(task.projectId, task.id).pipe(
        first(),
        switchMap(fullTask => {
          fullTask.statusId = this.status!.id;
          
          if (!this.canChangeStatus(fullTask)){
            this.showErrorWindow(fullTask);
            throw "stop"
          }
          return services.resourceManager.putTask(fullTask, fullTask);
        }),
        first()
        ).subscribe({
          next: (udpatedFullTask: ITaskFull) => {
        },
          error: (e: any) => {
            debugger;
          }});
    },
    canChangeStatus(fullTask: ITaskFull): boolean{
      const completeStatusId = "2";
      if (fullTask.statusId !== completeStatusId){
        return true;
      }
      if(!fullTask.actualTime || fullTask.actualTime <= 0){
        return false;
      }
      for(const item of fullTask.checkList){
        if (!item.isClosed){
          return false;
        }
      }

      return true;
    },
    showErrorWindow(fullTask: ITaskFull): void{
      services.modalWindow.showComponent$.next(h(ErrorCloseTask, {fullTask}));
    }
  }
})
</script>

<style lang="scss" scoped>
.column {
  height: calc(880 * var(--shpx)); // не работат скролл без фиксированной высоты. 
  display: flex;
  flex-direction: column;
  background-color: $grey-1;
  box-shadow: 0px 0px 7.5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: calc(300 * var(--swpx));
  box-sizing: border-box;

  .title {
    padding-top: calc(12 * var(--shpx));
    height: calc(36 * var(--shpx));
    margin-bottom: calc(10 * var(--shpx)); // либо тень образается, либо статус
    text-align: center;
  }

  .cards {
    flex-grow: 1;
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