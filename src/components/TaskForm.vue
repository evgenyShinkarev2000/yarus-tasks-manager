<template></template>

<script lang="ts">import { TaskFormAppearance } from '@/types/TaskFormAppearance';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "TaskForm",
  props:{
    taskId:{
      type: String,
    },
    appearance:{
      type: String as PropType<TaskFormAppearance>,
    }
  },
  
})
</script>

<style lang="scss" scoped></style>


