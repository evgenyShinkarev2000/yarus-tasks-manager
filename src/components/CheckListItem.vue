<template>
  <div class="check-list-item">
    <input type="checkbox" :checked="checkListItem?.isClosed" v-if="mode === 'lock'" @click.prevent="">
    <input type="checkbox" :checked="checkListItem?.isClosed" v-else @click="switchChecked">
    <span class="font">{{ checkListItem?.name }}</span>
    <img class="close-circle" src="@/assets/close-cirlce.png" v-if="mode === 'edit'" @click="remove">
  </div>
</template>

<script lang="ts">
import { ICheckedListItem } from '@/interfaces/ICheckedListItem';
import { CheckItemMode } from '@/types/CheckItemMode';
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
    },
    mode: {
      type: String as PropType<CheckItemMode>
    }
  },
  methods:{
    remove(): void{
      this.$emit("remove");
    },
    switchChecked(): void{
      if (!this.checkListItem){
        return;
      }
      this.$emit("switchChecked");
    }
  },
})
</script>

<style lang="scss" scoped>
.check-list-item{
  display: flex;
  justify-items: flex-start;
  gap: 12px;
  align-items: center;
  input{
    
  }

  .close-circle{
    height: calc(24 * var(--swpx));
    margin-left: -8px;
  }
  .font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));
}

.placeholder-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));

  color: #ACACAC;
}

.general-font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: calc(16 * var(--swpx));
  line-height: calc(20 * var(--swpx));
}

.input{
    width: calc(250 * var(--swpx));
    height: calc(32 * var(--shpx));
    background-color: #FDFDFD;
    border: 1px solid #BFC4C8;
    border-radius: 7px;
    padding-inline: calc(20 * var(--swpx));
  }

input::placeholder,
textarea::placeholder {
  @extend .placeholder-font;
}

}

</style>