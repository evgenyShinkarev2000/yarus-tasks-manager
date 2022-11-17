<template>
  <section class="center-x">
    <div class="controls-container controls">
      <div class="left">
        <DropDownList :options="projectOptions" :default-index="0"></DropDownList>
        <DropDownList :options="taskContractorOptions" :default-index="0"></DropDownList>
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


export default defineComponent({
  name: "Controls",
  data() {
    return {
      services,
      projectOptions: [] as IIdPairName[],
      taskContractorOptions: [{id:"1", name:"Только мои"}, {id:"2", name:"Все задачи"}] as IIdPairName[]
    };
  },
  components: { DropDownList },
  mounted(){
    services.resourceManager.getProjects().then((data) => {
      this.projectOptions = data;
    });
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
    