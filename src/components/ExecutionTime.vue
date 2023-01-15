<template>
  <div class="container">
    <input class="input font" @input="inputHandler" :value="container.value ?? 0" ref="inputRef"><span class="font">ч.</span>
  </div>
</template>

<script lang="ts">import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "ExecutionTime",
  props:{
    container:{
      type: Object as PropType<{value: number}>,
      default: {value: 0},
    }
  },
  methods:{
    inputHandler(e: Event): void{
      const input = this.$refs.inputRef as HTMLInputElement;
      const reg = /[^\d]/;
      const numbers = input.value.replace(reg, "");
      const value = numbers.length > 0 ? parseInt(numbers) : 0;
      input.value = value.toString();
      this.container.value = value;
    }
  }
})
</script>

<style lang="scss" scoped>
.container{
  width: min-content;
  height: calc(32 * var(--shpx));
  background: #E4E4E4;
  border: 1px solid #C1C1C1;
  border-radius: 15px;
  padding-inline: calc(20 * var(--swpx));
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(4 * var(--swpx));
  .input {
    background-color: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    display: flex; 
    width: calc(30 * var(--swpx));   
    text-align: right;
  }
  
}
.font{
  font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    font-family: 'Montserrat';
    color: #595959;
}
</style>