<template>
  <section class="center-x">
    <div class="controls-container controls">
      <div class="left">
        <DropDownList :options="projectOptionsWithAll" :default-index="0" :switch-handler="projectSwitchHandler">
        </DropDownList>
        <DropDownList :options="taskContractorOptions" :default-index="0" :switch-handler="contractorSwitchHandler">
        </DropDownList>
      </div>
      <div class="right">
        <button class="create-btn button-font-1" @click="createTaskClick">Создать новую задачу
        </button>
      </div>
    </div>
    <!-- <ModalTemplate v-if="isCreateTask">
      <TaskForm :task="{ projectId: selectedProject.id }" :appearance="'new'">
      </TaskForm>
    </ModalTemplate> -->
  </section>
</template>
    
<script lang="ts">
import { createApp, defineComponent, h } from 'vue';
import { services } from '@/main';
import DropDownList from './DropDownList.vue';
import { IIdPairName } from '@/interfaces/IIdPairName';
import { ITaskShort } from '@/interfaces/ITaskShort';
import ModalTemplate from './ModalTemplate.vue';
import TaskForm from './TaskForm.vue';
import { Subscription } from 'rxjs';
import { ITaskFull } from '@/interfaces/ITaskFull';
import FullTaskViwer from './FullTaskViwer.vue';


export default defineComponent({
  name: "Controls",
  created()
  {
    this.subscriptions.push(
      services.modalWindow.closeSignal$.subscribe(s =>
      {
        this.isCreateTask = false;
      })
    );
  },
  unmounted()
  {
    this.subscriptions.forEach(s => s.unsubscribe());
  },
  data()
  {
    return {
      services,
      projectOptions: [] as IIdPairName[],
      taskContractorOptions: [
        { id: "onlyCurrentUser", name: "Только мои" },
        { id: "allTasks", name: "Все задачи" }
      ] as IIdPairName[],
      projectFilterSetter: services.resourceManager.taskFilter.getFilterSetter(),
      contractorFilterSetter: services.resourceManager.taskFilter.getFilterSetter(),
      allProjectOption: { id: "allProjectsOption", name: "Все проекты" } as IIdPairName,
      isCreateTask: false,
      subscriptions: [] as Subscription[],
      selectedProject: {} as IIdPairName, // нужен только для создания задачи
    };
  },
  computed: {
    projectOptionsWithAll(): IIdPairName[]
    {
      return [this.allProjectOption].concat(this.projectOptions);
    }
  },
  components: { DropDownList, ModalTemplate, TaskForm },
  mounted()
  {
    services.resourceManager.getProjects().then((data) =>
    {
      this.projectOptions = data;
    });

  },
  methods: {
    projectSwitchHandler(val: IIdPairName): void
    {
      if (val.id !== "allProjectsOption")
      {
        this.selectedProject = val;
      }
      this.projectFilterSetter((elementToValid: ITaskShort) =>
      {
        if (val.id === "allProjectsOption")
        {
          return true;
        }

        return elementToValid.projectId === val.id;
      });
    },
    contractorSwitchHandler(val: IIdPairName): void
    {
      this.contractorFilterSetter((elementToFilter: ITaskShort) =>
      {
        if (val.id === "onlyCurrentUser")
        {
          return elementToFilter.contractorId === this.services.resourceManager.currentUser.id;
        }

        return true;
      });
    },
    createTaskClick(): void
    {
      services.modalWindow.showComponent$
      .next(h(TaskForm, {task:{ projectId: this.selectedProject.id } as ITaskFull, appearance:"new"}));
    },
  }
});
</script>
    
<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $span-gap-2;

  .left {
    display: flex;
    justify-content: space-between;
    gap: $span-gap-1;
    width: calc(628 * var(--swpx));
  }

  .right {
    .create-btn {
      border-radius: calc(32 * var(--swpx));
      background-color: $light-blue;
      width: calc($column-width * var(--swpx));
      height: calc(48 * var(--shpx));
    }
  }
}
</style>
    