<template>
  <CheckListItem v-for="item of items$?.value" :check-list-item="item" :key="item.id" :mode="mode" @remove="removeItem(item.id)">
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
    removeItem(id: string)
    {
      this.items$?.next(this.items$.value.filter(i => i.id !== id));
    },
    addItem(): void{
      const input = this.$refs.input as HTMLInputElement;
      const items = this.items$!.value;
      const id = items.length > 0 ? items[items.length - 1].id + Math.random().toString() : Math.random().toString();
      const checkListItem: ICheckedListItem = {id, isClosed: false, name: input.value};
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