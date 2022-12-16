<template>
  <div class="relative">
    <div class="head" @click="switchShowOptions" ref="head">
      <slot name="option" :id-pair-name="selectedOption?.idPairName"></slot>
      <img class="icon" :class="isShowOptions ? 'rotate-180' : ''" src="@/assets/drop-down-icon.png">
    </div>
    <div class="options" v-if="isShowOptions" ref="options">
      <div class="option" :class="option.isSelected ? 'selected' : ''" v-for="option of options"
        :option="option" :key="option.index" @click="switchSelected(option.index)">
        <slot name="option" :id-pair-name="option.idPairName"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IDropDownListOption } from '@/interfaces/IDropDownListOption';
import { services } from '@/main';
import { DropDownListProvider, IDropDownListItem } from '@/view-models/DropDownListProvider';
import { Subscription } from 'rxjs';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "DropDownListV2",
  props: {
    listProvider: {
      type: Object as PropType<DropDownListProvider<any>>
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  created() {
    if (!this.listProvider) {
      throw new Error();
    }
    
    this.subscriptions.push(
      this.listProvider.items$.subscribe(items => {
        this.options = items;
      })
    );
    this.subscriptions.push(
      this.listProvider.selected$.subscribe(selected => {
        this.selectedOption = selected;
      })
    );

    document.addEventListener("click", this.closeAtClickOutside);
  },
  unmounted() {
    this.subscriptions.forEach(s => s.unsubscribe());
    document.removeEventListener("click", this.closeAtClickOutside);
  },
  data() {
    return {
      options: [] as ReadonlyArray<IDropDownListOption>,
      subscriptions: [] as Subscription[],
      isShowOptions: false,
      selectedOption: {} as IDropDownListItem<any> | null,
    };
  },
  methods: {
    closeAtClickOutside(mouseEvent: MouseEvent): void {
      if (!this.isShowOptions) {
        return;
      }
      const head = this.$refs.head as HTMLElement;
      const options = this.$refs.options as HTMLElement;
      if (!head || !options) {
        return;
      }
      if (!wasClickInside(head, mouseEvent) && !wasClickInside(options, mouseEvent)) {
        this.isShowOptions = false;
      }
    },
    switchSelected(index: number): void {
      this.listProvider?.changeSelected(index);
    },
    hideOptions(): void {
      this.isShowOptions = false;
    },
    showOptions(): void {
      this.isShowOptions = true;
    },
    switchShowOptions(): void {
      this.isShowOptions = !this.isShowOptions;
    }
  }
});

function wasClickInside(element: HTMLElement, mouseEvent: MouseEvent): boolean {
  const position = element.getBoundingClientRect();
  return position.left <= mouseEvent.clientX
    && position.right >= mouseEvent.clientX
    && position.top <= mouseEvent.clientY
    && position.bottom >= mouseEvent.clientY;
}
</script>

<style lang="scss" scoped>
@import "@/styles/scrollbar.scss";

.relative {
  position: relative;

  .head {
    box-sizing: border-box;
    width: calc(308 * var(--swpx));
    height: calc(32 * var(--shpx));
    background: #E4E4E4;
    border: 1px solid #C1C1C1;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding-inline: calc(15 * var(--swpx));

    .icon {
      width: calc(16 * var(--swpx));
    }
  }

  .options {
    @extend .tasks-scrollbar;
    width: calc(308 * var(--swpx));
    box-sizing: border-box;
    height: min-content;
    max-height: calc(5 * 32 * var(--shpx));
    position: absolute;
    top: calc(36 * var(--shpx));
    background: #FCFCFC;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    z-index: 10;

    .option {
      height: calc(32 * var(--shpx));
      padding-left: calc(16 * var(--swpx));
      display: flex;
      align-items: center;

      &.selected {
        background: #EFF0F1;
      }

      &:hover {
        background: #EFF0F1;
      }
    }
  }
}

.font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #595959;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>