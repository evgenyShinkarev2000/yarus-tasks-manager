<template>
  <select ref="selectRef">
    <option value="defaultOption" selected hidden>{{ placeHolder }}</option>
    <option @click.prevent="selectDefault" >По умолчанию</option>
    <option v-for="option of options" :key="<string>option">{{ option }}</option>
  </select>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import { services } from '@/main';

export default defineComponent({
  name: 'DropDownList',
  props: {
    placeHolder: {
      type: String
    },
    options: {
      type: Array
    }
  },
  methods: {
    selectDefault(): void{
      (this.$refs.selectRef as HTMLSelectElement).value = "defaultOption";
    }
  },
  data() {
    return {
    }
  },
});
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
    