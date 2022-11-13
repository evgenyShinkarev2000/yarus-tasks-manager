<template>
  <div class="host">
    <div class="label" @click="switchState">
      <div class="current-name" :class="isDefault ? 'drop-down-label-1-font' : 'drop-down-item-1-font'">{{selectedName}}</div>
      <img src="@/assets/arrow-icon.png" :class="isDropped ? 'rotate' : ''">
    </div>
    <div class="options drop-down-item-1-font" v-show="isDropped" ref="options">
      <div class="option" @click="switchDefault" ref="default">По умолчанию</div>
      <div class="option" @click="switchSelected" v-for:="optionVM of optionsVM" :key="optionVM.key">{{ optionVM.option }}
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { services } from '@/main';

export default defineComponent({
  name: 'DropDownList',
  props: {
    placeHolder: {
      type: String
    },
    options: {
      type: Array as PropType<Array<string>>
    }
  },
  mounted(){
    this.switchDefault();
  },
  computed: {
    optionsVM(): Array<{ option: string, key: string }> {
      return this.options?.map((o: string) => {
        return { option: o, key: Symbol().toString() }
      }) ?? [];
    }
  },
  methods: {
    switchState(): void {
      this.isDropped = !this.isDropped;
    },
    switchSelected(e: Event): void{
      const target = e.target as Element;
      this.selectedName = target.innerHTML;
      this.handleSelectedClass(target);
      this.isDefault = false;
    },
    switchDefault(): void{
      this.selectedName = this.placeHolder ?? "";
      const el = this.$refs.default as Element;
      this.handleSelectedClass(el);
      this.isDefault = true;
    },
    handleSelectedClass(el: Element): void{
      const options = this.$refs.options as Element;
      options.querySelector(".selected")?.classList.remove("selected");
      el.classList.add("selected");
    }
  },
  data() {
    return {
      isDropped: false,
      isDefault: true,
      selectedName: ""
    }
  },
});
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
      &:hover{
        background-color: $light-grey;
        opacity: 0.3s;
      }
      &.selected{
        color: $light-blue;
      }
    }
  }
}
</style>
    