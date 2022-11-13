<template>
  <div class="host"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TaskCard"
})
</script>

<style lang="scss" scoped>
.host{
  height: calc(106 * var(--shpx));
  width: 100%;
  background-color: $white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
}
</style>