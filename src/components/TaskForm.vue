<template>
  <div class="form">
    <div class="flex-inline">
      <h3 class="h3-font">{{ appearance === "new" ? "Создание задачи" : "Редактирование задачи" }}</h3>
    </div>
    <div class="flex-inline">
      <input class="text-input name general-font" :class="isTitleValid ? '' : 'invalid'" 
      type="text" placeholder="Введите название задачи" v-model="taskCopy.title" @input="titleHandler">
    </div>
    <div class="flex-inline space">
      <h4 class="h4-font">Проект</h4>
      <DropDownListV2 :list-provider="projectsProvider">
        <template #option="{ idPairName }">
          <OnlyTextOption :id-pair-name="idPairName"></OnlyTextOption>
        </template>
      </DropDownListV2>
    </div>
    <div class="flex-inline space">
      <h4 class="h4-font">Исполнитель</h4>
      <DropDownListV2 :list-provider="contractorsProvider" :is-disabled="true">
        <template #option="{ idPairName }">
          <OnlyTextOption :id-pair-name="idPairName"></OnlyTextOption>
        </template>
      </DropDownListV2>
    </div>
    <div class="flex-inline space">
      <h4 class="h4-font">Приоритет</h4>
      <DropDownListV2 :list-provider="prioritiesProvider">
        <template #option="{ idPairName }">
          <MarkerTextOption :id-pair-name="idPairName"></MarkerTextOption>
        </template>
      </DropDownListV2>
    </div>
    <div class="flex-block">
      <h4 class="h4-font">Дополнительно</h4>
      <textarea class="text-input description general-font"
        placeholder="Здесь можно ввести краткое описание задачи" v-model="taskCopy.description"></textarea>
    </div>
    <div class="flex-inline space">
      <h4 class="h4-font">Срок выполнения</h4>
      <Calendar :selected-date$="deadLine$" :is-shorted-prop="true"></Calendar>
    </div>
    <div class="flex-inline space">
      <h4 class="h4-font">Факт. время выполнения</h4>
      <ExecutionTime :container="actualTimeContainer"></ExecutionTime>
    </div>
    <div class="flex-block small-gap-block">
      <h4 class="h4-font">Этапы</h4>
      <CheckList :items$="checkListItems$" :mode="appearance === 'new' ? 'init' : 'edit'"></CheckList>
    </div>
    <div class="flex-inline">
      <button class="modal-button submit" :class="isFormValid ? '' : 'disable'" @click="confirmClick" :key="1">Подтвердить</button>
      <button class="modal-button cansel" @click="cancelClick" :key="2">Отмена</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ITaskFull } from '@/interfaces/ITaskFull';
import { TaskFormAppearance } from '@/types/TaskFormAppearance';
import { defineComponent, PropType } from 'vue';
import DropDownListV2 from '@/components/DropDownListV2/DropDownListV2.vue';
import OnlyTextOption from './DropDownListV2/OnlyTextOption.vue';
import { DropDownListProvider } from '@/view-models/DropDownListProvider';
import { services } from '@/main';
import { BehaviorSubject, first, Observable, Subject, Subscription, take } from 'rxjs';
import { IIdPairName } from '@/interfaces/IIdPairName';
import { IUser } from '@/interfaces/IUser';
import MarkerTextOption from './DropDownListV2/MarkerTextOption.vue';
import CheckList from './CheckList.vue';
import { ICheckedListItem } from '@/interfaces/ICheckedListItem';
import Calendar from './Calendar.vue';
import { TaskFull } from '@/view-models/TaskVM';
import {DateVM} from '@/view-models/DateVM';
import ExecutionTime from './ExecutionTime.vue';

export default defineComponent({
  name: "TaskForm",
  created()
  {
    this.subscriptions.push(
      services.resourceManager.projects$.subscribe(projects =>
      {
        this.projectsProvider.setItems(projects);
        const projectTask = this.projectsProvider.findItemById(this.taskCopy?.projectId);
        if (!projectTask && this.taskCopy?.projectId)
        {
          throw new Error("В задаче id проекта к которому нет доступа");
        }
        this.projectsProvider.changeSelected(projectTask?.index ?? 0);
      })
    );

    this.subscriptions.push(
      this.projectsProvider.selected$.subscribe(selectedProjectOption =>
      {
        if (!selectedProjectOption)
        {
          this.contractorsProvider.setItems();
        } else
        {
          services.resourceManager.getContractorsByProject$(selectedProjectOption.item.id).pipe(
            take(1),
          ).subscribe(contractors =>
          {
            this.contractorsProvider.setItems(contractors);
            const contractorTask = this.contractorsProvider.findItemById(this.taskCopy?.contractorId) 
              ?? this.contractorsProvider.findItemById(services.resourceManager.currentUser.id);
            if (!contractorTask && this.taskCopy?.contractorId)
            {
              throw new Error("В задаче id исполнителя, которого не существует");
            }
            this.contractorsProvider.changeSelected(contractorTask?.index ?? 0);
          });
        }
      })
    );

    this.subscriptions.push(
      services.resourceManager.priorities$.subscribe(priorities =>
      {
        this.prioritiesProvider.setItems(priorities);
        const priorityTask = this.prioritiesProvider.findItemById(this.taskCopy?.priorityId);
        if (!priorityTask && this.taskCopy?.priorityId)
        {
          throw new Error("Неизвестный приоритет задачи");
        }
        this.prioritiesProvider.changeSelected(priorityTask?.index ?? 0);
      })
    );
    this.streams.push(this.checkListItems$);
    this.streams.push(this.deadLine$);
  },
  unmounted()
  {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.streams.forEach(s => s.complete());
  },
  props: {
    task: {
      type: Object as PropType<ITaskFull>,
    },
    appearance: {
      type: String as PropType<TaskFormAppearance>,
    }
  },
  data()
  {
    const taskCopy = new TaskFull(this.task!).getCopy();
    return {
      taskCopy,
      projectsProvider: new DropDownListProvider<IIdPairName>(idPairName => idPairName),
      contractorsProvider: new DropDownListProvider((user: IUser) => {
        return {
          name:`${user.surname} ${user.name}`,
          id: user.id,
        }
      }),
      actualTimeContainer: {value: taskCopy.actualTime},
      prioritiesProvider: new DropDownListProvider<IIdPairName>(idPairName => idPairName),
      checkListItems$: new BehaviorSubject<ICheckedListItem[]>(taskCopy?.checkList ?? []),
      deadLine$: new BehaviorSubject<Date | undefined>(taskCopy?.deadline.date),
      streams: [] as Subject<any>[],
      subscriptions: [] as Subscription[],
      isTitleValid: taskCopy.title?.trim().length > 0,
    }
  },
  computed:{
    isFormValid(): boolean{
      return this.isTitleValid;
    }
  },
  methods: {
    confirmClick(): void
    {
      if (!this.isFormValid){
        return;
      }
      this.taskCopy.checkList = this.checkListItems$.value;
      this.taskCopy.deadline = new DateVM(this.deadLine$.value);
      this.taskCopy.projectId = this.projectsProvider.selected!.item.id;
      this.taskCopy.projectName = this.projectsProvider.selected!.item.name;
      this.taskCopy.priorityId = this.prioritiesProvider.selected!.item.id;
      this.taskCopy.priorityName = this.prioritiesProvider.selected!.item.name;
      this.taskCopy.contractorId = this.contractorsProvider.selected!.item.id;
      this.taskCopy.contractorName = this.contractorsProvider.selected!.item.name;
      this.taskCopy.contractorSurname = this.contractorsProvider.selected!.item.surname;
      this.taskCopy.actualTime = this.actualTimeContainer.value;
      if (this.appearance === 'new'){
        services.resourceManager.addTask(this.taskCopy).pipe(first()).subscribe({
          next: () => {
            services.modalWindow.closeSignal$.next();
          },
          error: () => {
            alert("Ошибка");
          },
        });
      }
      else if (this.appearance === 'existed'){
        services.resourceManager.putTask(this.task as ITaskFull, this.taskCopy).pipe(first()).subscribe({
          next: () => services.modalWindow.closeSignal$.next(),
          error: () => alert("Ошибка"),
        });
      }
    },
    cancelClick(): void
    {
      services.modalWindow.closeSignal$.next();
    },
    titleHandler(e: Event): void{
      const input = e.target as HTMLInputElement;
      this.isTitleValid = input?.value?.trim().length > 0;
    }
  },

  components: { DropDownListV2, OnlyTextOption, MarkerTextOption, CheckList, Calendar, ExecutionTime }
});
</script>

<style lang="scss" scoped>
@import "@/styles/modal-button.scss";

.form {
  flex-grow: 1;
  display: grid;
  grid-auto-rows: min-content;
  align-items: start;
  gap: calc(16 * var(--shpx));

  .text-input {
    background: #FDFDFD;
    border: 1px solid #BFC4C8;
    border-radius: 7px;
    padding-inline: calc(20 * var(--swpx));
    display: flex;
    flex-grow: 1;
  }

  .name {
    height: calc(44 * var(--shpx));
  }

  .description {
    height: calc(120 * var(--shpx));
    align-self: stretch;
    resize: vertical;
  }

  .item-font {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    font-family: 'Montserrat';
    color: #595959;
  }
}

.flex-inline {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: calc(28 * var(--swpx));
}

.flex-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: calc(12 * var(--shpx));
}

.small-gap-block{
  gap: calc(6 * var(--shpx));
}

.space {
  justify-content: space-between;
}

.placeholder-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #ACACAC;
}

.general-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
}

input::placeholder,
textarea::placeholder {
  @extend .placeholder-font;
}

.invalid{
  border: 1px solid $red !important;
}
.disable{
  opacity: 0.6;
}
</style>


