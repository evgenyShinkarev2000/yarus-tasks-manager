<template>
  <div class="host" ref="head">
    <div class="label" @click="switchState">
      <div class="current-name drop-down-label-1-font" v-if:="selectedIndex < 0">{{ placeHolder }}</div>
      <div class="current-name drop-down-item-1-font" v-if:="selectedIndex >= 0">{{ optionsVM[selectedIndex]?.option }}
      </div>
      <img src="@/assets/arrow-icon.png" :class="isDropped ? 'rotate' : ''">
    </div>
    <div class="options drop-down-item-1-font" v-show="isDropped" ref="options">

      <div class="option" :class="optionVM.isSelected ? 'selected' : ''" @click="switchSelected(index)"
        v-for:="optionVM, index of optionsVM" :key="optionVM.key">{{ optionVM.option }}
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, Prop, PropType, watch } from 'vue';
import { services } from '@/main';
import { IIdPairName } from '@/interfaces/IIdPairName';
import { ReactiveFilter } from '@/view-models/ReactiveFilter';
import { Subject, Subscriber } from 'rxjs';

export default defineComponent({
  name: 'DropDownList',
  props: {
    placeHolder: {
      type: String
    },
    options: {
      type: Array as PropType<Array<IIdPairName>>,
      required: true
    },
    defaultIndex: {
      type: Number as PropType<number | undefined>
    },
    switchHandler: {
      type: Function as PropType<(newValue: IIdPairName) => void>
    }
  },
  beforeCreate() {
    // console.log("optionVm");`
    // console.log(this.optionsVM);
    // console.log("option");
    // console.log(this.options);
    // console.log("selectedIndex");
    // console.log(this.selectedIndex);
  },
  mounted() {
    this.selectedIndex = this.defaultIndex ?? -1;
    this.switchSelected(this.selectedIndex);
    watch(() => this.options, (oldVal, newVal) => {
      this.switchSelected(this.selectedIndex);
    });
    document.addEventListener("click", this.closeAtClickOutside);
    // console.log("optionVm");
    // console.log(this.optionsVM);
  },
  unmounted() {
      document.removeEventListener("click", this.closeAtClickOutside);
  },
  computed: {
    optionsVM(): Array<{ option: string, key: string, isSelected: boolean }> {
      return this.options?.map((idPairName: IIdPairName, index: number) => {
        return { option: idPairName.name, key: idPairName.id, isSelected: this.selectedIndex === index }
      }) ?? [];
    }
  },
  methods: {
    switchState(): void {
      this.isDropped = !this.isDropped;
    },
    switchSelected(index: number): void {
      this.selectedIndex = index;
      const currentOption = this.options[this.selectedIndex];
      if (this.switchHandler && currentOption) {
        this.switchHandler(currentOption);
      }
    },
    closeAtClickOutside(mouseEvent: MouseEvent): void{
      const options = this.$refs.options as HTMLElement;
      const head = this.$refs.head as HTMLElement;
      if (!wasClickInside(options, mouseEvent) && !wasClickInside(head, mouseEvent)){
        this.isDropped = false;
      }
    },
  },
  data() {
    return {
      isDropped: false,
      selectedIndex: -1
    }
  },
});

function wasClickInside(element: HTMLElement, mouseEvent: MouseEvent): boolean{
  const position = element.getBoundingClientRect();
  return position.left <= mouseEvent.clientX
    && position.right >= mouseEvent.clientX
    && position.top <= mouseEvent.clientY
    && position.bottom >= mouseEvent.clientY;
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.host {
  position: relative;

  .label {
    width: calc(300 * var(--swpx));
    height: calc(48 * var(--shpx));
    box-sizing: border-box;
    background-color: $white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    padding-inline: calc(18 * var(--swpx));
    display: flex;
    justify-content: space-between;
    align-items: center;

    .current-name {}

    img {
      width: calc(13 * var(--swpx));
      transform: rotate(270deg);

      &.rotate {
        transform: rotate(90deg);
      }
    }
  }

  .options {
    position: absolute;
    top: calc(56 * var(--shpx));
    width: min-content;
    max-height: calc(48 * 5 * var(--shpx));
    display: flex;
    flex-direction: column;
    background-color: $white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    border-radius: 15px;

    .option {
      width: calc(300 * var(--swpx));
      height: calc(48 * var(--shpx));
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-inline: calc(18 * var(--swpx));
      box-sizing: border-box;

      &:hover {
        background-color: $light-grey;
        opacity: 0.3s;
      }

      &.selected {
        color: $light-blue;
      }
    }
  }
}
</style>
    