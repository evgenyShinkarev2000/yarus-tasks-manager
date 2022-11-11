<template>
  <div class="page">
    <div class="header">
    <MainHeader></MainHeader>
  </div>
  <div class="content">
    <RouterView></RouterView>
  </div>
  </div>
</template>
<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "WorkPlacePage",
  created() {
  },
  computed: {},
  components: { MainHeader }
})
</script>
<style lang="scss" scoped>

.page{
  background-color: $light-grey;
  height: 96vh;
  display: flex;
  flex-direction: column;

  .header{
    
  }
  .content{
    flex-grow: 1;
    justify-self: stretch;
  }
}

</style>