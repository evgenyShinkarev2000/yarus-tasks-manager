<template>
  <div class="page">
    <div class="header">
    <MainHeader></MainHeader>
  </div>
  <div class="content">
    <router-view />
  </div>
  </div>
  <ModalTemplate></ModalTemplate>
</template>
<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import ModalTemplate from '@/components/ModalTemplate.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "WorkPlacePage",
  created() {
  },
  computed: {},
  components: { MainHeader, ModalTemplate }
})
</script>
<style lang="scss" scoped>

.page{
  background-color: $light-grey;
  max-height: 100vh;
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: min-content auto;

  .header{
    grid-row: 1;
    grid-column: 1;
  }
  .content{
    grid-row: 2;
    grid-column: 1;
  }
}

</style>