<template>
  <div class="mock"></div>
   <h2>параметры <h6>{{ $route.params.projects }} {{ $route.params.onlyMyTasks }}</h6>
    </h2>
    <img src="@/assets/tasks.png">
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TasksPage',

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mock{
  height: 20px;
  background-color: $light-grey;
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
}
</style>
  