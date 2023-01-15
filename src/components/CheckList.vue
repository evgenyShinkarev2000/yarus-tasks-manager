<template>
  <CheckListItem 
  v-for="item, index of items$?.value" 
  :check-list-item="item" 
  :key="index" :mode="mode"
   @remove="removeItem(index)"
   @switchChecked="switchChecked(index)">
  </CheckListItem>
  <div class="add" v-if="canAddItem">
    <input class="input general-font" placeholder="Навзание этапа" ref="input" @input="inputHandler">
    <img class="add-btn" :class="isInputValid ? '' : 'disable'" src="@/assets/add-plus.png" @click="addItem">
  </div>
</template>

<script lang="ts">
import { ICheckedListItem } from '@/interfaces/ICheckedListItem';
import { CheckItemMode } from '@/types/CheckItemMode';
import { BehaviorSubject, Subscription } from 'rxjs';
import { defineComponent, PropType } from 'vue';
import CheckListItem from './CheckListItem.vue';

export default defineComponent({
  name: "CheckList",
  created()
  {
    if (!this.items$)
    {
      throw new Error();
    }
  },
  props: {
    items$: {
      type: Object as PropType<BehaviorSubject<ICheckedListItem[]>>,
      required: true,
    },
    mode: {
      type: String as PropType<CheckItemMode>
    },
  },
  data()
  {
    return {
      subscriptions: [] as Subscription[],
      isInputValid: false,
    }
  },
  computed: {
    canAddItem(): boolean{
      return this.mode === "edit" || this.mode === "init";
    }
  },
  methods: {
    inputHandler(e: Event): void{
      this.isInputValid = (e.target as HTMLInputElement).value?.trim().length > 0;
    },
    removeItem(index: number): void
    {
      this.items$?.value.splice(index, 1);
      this.items$?.next(this.items$?.value);
    },
    addItem(): void{
      if (!this.isInputValid){
        return;
      }
      const input = this.$refs.input as HTMLInputElement;
      const items = this.items$!.value;
      const checkListItem: ICheckedListItem = {isClosed: false, name: input.value};
      this.items$?.next(this.items$.value.concat(checkListItem));
      input.value = "";
    },
    switchChecked(index: number): void{
      const checkedItem = this.items$?.value[index];
      checkedItem!.isClosed = !checkedItem?.isClosed; 
      this.items$?.next(this.items$.value);
    }
  },
  components: { CheckListItem }
})
</script>

<style lang="scss" scoped>
.add {
  .input {
    width: calc(250 * var(--swpx));
    height: calc(32 * var(--shpx));
    background-color: #FDFDFD;
    border: 1px solid #BFC4C8;
    border-radius: 7px;
    padding-inline: calc(20 * var(--swpx));
  }

  .add-btn {
    width: calc(12 * var(--swpx));
    margin-left: calc(8 * var(--swpx));
    &.disable{
      opacity: 0.6;
    }
  }
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

input::placeholder,
textarea::placeholder {
  @extend .placeholder-font;
}
</style>