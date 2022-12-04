<template>
  <div class="container">
    <div class="marker" :class="color"></div>
    <h4 class="font">{{ idPairName?.name ?? "" }}</h4>
  </div>
</template>

<script lang="ts">
import { IDropDownListOption } from '@/interfaces/IDropDownListOption';
import { IIdPairName } from '@/interfaces/IIdPairName';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "MarkerTextOption",
  props: {
    idPairName: {
      type: Object as PropType<IIdPairName>
    }
  },
  computed: {
    color(): string
    {
      if (!this.idPairName)
      {
        return "";
      }
      if (this.idPairName.id === "1")
      {
        return "red";
      }
      if (this.idPairName.id === "2")
      {
        return "yellow";
      }
      return "blue";
    }
  },
  methods: {
  }

});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;

  .marker {
    width: calc(32 * var(--swpx));
    height: calc(14 * var(--shpx));
    border-radius: calc(7.5 * var(--swpx));
    margin-right: calc(8 * var(--swpx));
    justify-self: flex-start;

    &.red {
      background-color: $red;
    }

    &.yellow {
      background-color: $yellow;
    }

    &.blue {
      background-color: $light-blue;
    }
  }

  .font {
    justify-self: flex-start;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: #595959;
  }
}
</style>