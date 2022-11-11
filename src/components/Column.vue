<template>
  <div class="column">
    <div class="title"></div>
    <div class="content">
      <div class="cards"></div>
      <div class="scrol"></div>
    </div>
  </div>
</template>

<script lang="ts">import { defineComponent } from 'vue';

export default defineComponent({
  name: "Column"
})
</script>

<style lang="scss" scoped>
 .column{
  width: calc($column-width * var(--swpx));
  min-width: calc($column-width * var(--swpx));
  height: 100%;
  background-color: $grey-1;
  box-shadow: 0px 0px 7.5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
 }
</style>