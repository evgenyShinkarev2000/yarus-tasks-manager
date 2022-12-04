<template>
  <TaskForm v-if="isOpenEdit" :task="task" :appearance="'existed'"></TaskForm>
  <div class="rows" v-if="isLoaded && !isOpenEdit">
    <div class="flex-line">
      <span class="h3-font" v-if="task.title">{{ task.title }}</span>
      <span class="secondary-font undefined-color" v-else>Не указан</span>
    </div>
    <div class="flex-line">
      <span class="title-font">Проект</span>
      <span class="item-font" v-if="task.projectName">{{ task.projectName }}</span>
      <span class="secondary-font undefined-color" v-else>Не указан</span>
    </div>
    <div class="flex-line">
      <span class="title-font">Исполнитель</span>
      <span class="item-font" v-if="task.contractorName || task.contractorSurname">{{ task.contractorSurname }}
        {{ task.contractorName }}</span>
      <span class="secondary-font undefined-color" v-else>Не указан</span>
    </div>
    <div class="flex-line">
      <span class="title-font">Приоритет</span>
      <div class="flex-line small-gap" v-if="task.priorityName">
        <div class="marker" :class="markerColor"></div>
        <span class="item-font">{{ task.priorityName }}</span>
      </div>
      <span class="secondary-font undefined-color" v-else>Не указан</span>
    </div>
    <div class="flex-line">
      <span class="title-font">Статус</span>
      <span class="item-font" v-if="task.statusName">{{ task.statusName }}</span>
      <span class="secondary-font undefined-color" v-else>Не указан</span>
    </div>
    <div class="flex-block">
      <span class="title-font">Описание</span>
      <div class="description">
        <span class="secondary-font" v-if="task.description?.trim()">{{ task.description }}</span>
        <span class="secondary-font undefined-color" v-else>Не указано</span>
      </div>
    </div>
    <div class="flex-line">
      <span class="title-font">Факт. время выполнения</span>
      <span class="item-font" v-if="task.actualTime">{{ task.actualTime }}</span>
      <span class="secondary-font undefined-color" v-else>Не указано</span>
    </div>
    <div class="flex-line">
      <span class="title-font">Срок выполнения</span>
      <span class="item-font" v-if="task.deadline">{{ task.deadline.dateStringOnly }}</span>
      <span class="secondary-font undefined-color" v-else>Не указан</span>
    </div>
    <div class="flex-block">
      <span class="title-font">Этапы</span>
      <div class="flex-block small-gap" v-if="task.checkList && task.checkList.length > 0">
        <CheckList :items$="checkListItems$" :mode="'lock'"></CheckList>
      </div>
      <span class="secondary-font undefined-color" v-else>Нет Этапов</span>
    </div>
    <div class="buttons">
      <button class="button edit" @click="openEdit">Редактировать</button>
      <button class="button close" @click="closeClick">Закрыть</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ICheckedListItem } from '@/interfaces/ICheckedListItem';
import { ITaskFull } from '@/interfaces/ITaskFull';
import { services } from '@/main';
import { BehaviorSubject, Subscription } from 'rxjs';
import { defineComponent } from 'vue';
import Calendar from './Calendar.vue';
import CheckList from './CheckList.vue';
import CheckListItemView from './CheckListItem.vue';
import TaskForm from './TaskForm.vue';

export default defineComponent({
  name: "FullTaskViewer",
  props: {
    taskId: {
      type: String,
    }
  },
  created() {
    if (!this.taskId) {
      throw new Error();
    }
    this.subsciptions.push(
      services.resourceManager.getFullTaskById(this.taskId).subscribe(task => {
        this.task = task;
        this.isLoaded = true;
      }));
  },
  unmounted() {
    this.subsciptions.forEach(s => s.unsubscribe());
  },
  computed: {
    markerColor(): string {
      if (this.task?.priorityId === "1") {
        return "red";
      }
      else if (this.task?.priorityId === "2") {
        return "yellow";
      }
      return "blue";
    },
    checkListItems$(): BehaviorSubject<ICheckedListItem[]>{
      const stream$ = new BehaviorSubject<ICheckedListItem[]>(this.task.checkList);
      stream$.complete();

      return stream$;
    }
  },
  data() {
    return {
      isLoaded: false,
      task: {} as ITaskFull,
      subsciptions: [] as Subscription[],
      isOpenEdit: false,
    };
  },
  methods:{
    closeClick(): void{
      services.modalWindow.closeSignal$.next();
    },
    openEdit(): void{
      this.isOpenEdit = true;
    }
  },
  components: { CheckListItemView, TaskForm, CheckList, Calendar }
})
</script>

<style lang="scss" scoped>
@import "@/styles/modal-button.scss";

.rows {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: calc(12 * var(--shpx));
  flex-grow: 1;

  .flex-line {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }

  .flex-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;
  }
}

.buttons {
  display: flex;
  justify-self: stretch;
  gap: 5px;
  justify-content: space-between;
  .button {
    @extend .modal-button;

    &.edit {
      background-color: $light-blue;
    }

    &.close {
      background-color: #D5D6D7;
    }
  }
}

.small-gap {
  gap: 8px !important;
}

.description {
  min-height: calc(64 * var(--shpx));
}

.undefined-color {
  color: #AFAFAF;
}

.title-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));
}

.item-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));
}

.secondary-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));
}
</style>