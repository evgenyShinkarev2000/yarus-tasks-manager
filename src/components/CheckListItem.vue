<template>
  <div class="check-list-item">
    <input type="checkbox" :checked="checkListItem?.isClosed">
    <span class="font">{{ checkListItem?.name }}</span>
  </div>
</template>

<script lang="ts">
import { ICheckedListItem } from '@/interfaces/ICheckedListItem';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "CheckListItem",
  data() {
    return {

    }
  },
  props: {
    checkListItem: {
      type: Object as PropType<ICheckedListItem>
    }
  },
  methods:{
    closeClick(): void{
      this.$emit("closeClick");
    }
  },
})
</script>

<style lang="scss" scoped>
.check-list-item{
  display: flex;
  justify-items: flex-start;
  gap: 12px;
  input{
    
  }
  .font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));
}
}

</style>