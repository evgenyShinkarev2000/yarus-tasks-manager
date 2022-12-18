<template>
  <CheckListItem v-for="item, index of items$?.value" :check-list-item="item" :key="index" :mode="mode" @remove="removeItem(index)">
  </CheckListItem>
  <div class="add" v-if="mode === 'edit'">
    <input class="input general-font" placeholder="Навзание этапа" ref="input">
    <img class="add-btn" src="@/assets/add-plus.png" @click="addItem">
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
      type: Object as PropType<BehaviorSubject<Array<ICheckedListItem>>>
    },
    mode: {
      type: String as PropType<CheckItemMode>
    },
  },
  data()
  {
    return {
      subscriptions: [] as Subscription[],
    }
  },
  methods: {
    removeItem(index: number)
    {
      this.items$?.value.splice(index, 1);
      this.items$?.next(this.items$?.value);
    },
    addItem(): void{
      const input = this.$refs.input as HTMLInputElement;
      const items = this.items$!.value;
      const checkListItem: ICheckedListItem = {isClosed: false, name: input.value};
      this.items$?.next(this.items$.value.concat(checkListItem));
      input.value = "";
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