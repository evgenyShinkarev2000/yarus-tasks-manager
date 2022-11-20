<template>
  <section class="center-x">
    <div class="controls-container controls">
      <div class="left">
        <DropDownList :options="projectOptions" :default-index="0" :switch-handler="projectSwitchHandler"></DropDownList>
        <DropDownList :options="taskContractorOptions" :default-index="0" :switch-handler="contractorSwitchHandler"></DropDownList>
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
import { IIdPairName } from '@/interfaces/IIdPairName';
import { ITaskShort } from '@/interfaces/ITaskShort';


export default defineComponent({
  name: "Controls",
  data() {
    return {
      services,
      projectOptions: [] as IIdPairName[],
      taskContractorOptions: [
        {id:"onlyCurrentUser", name:"Только мои"},
         {id:"allTasks", name:"Все задачи"}
        ] as IIdPairName[],
      projectFilterSetter: services.resourceManager.taskFilter.getFilterSetter$(),
      contractorFilterSetter: services.resourceManager.taskFilter.getFilterSetter$()
    };
  },
  components: { DropDownList },
  mounted(){
    services.resourceManager.getProjects().then((data) => {
      this.projectOptions = data;
    });
    
  },
  methods: {
    projectSwitchHandler(val: IIdPairName): void{
      this.projectFilterSetter.next((elementToValid: ITaskShort) => {
          return elementToValid.projectId === val.id;
      });
    },
    contractorSwitchHandler(val: IIdPairName): void{
      this.contractorFilterSetter.next((elementToFilter: ITaskShort) => {
        if (val.id === "onlyCurrentUser"){
          return elementToFilter.contractorId === this.services.resourceManager.currentUserId;
        }

        return true;
      });
    }
  }
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
    