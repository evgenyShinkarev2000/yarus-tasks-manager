<template>
  <h4 class="font">{{ idPairName?.name ?? "" }}</h4>
</template>

<script lang="ts">
import { IDropDownListOption } from '@/interfaces/IDropDownListOption';
import { IIdPairName } from '@/interfaces/IIdPairName';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "OnlyTextOption",
  props: {
    idPairName: {
      type: Object as PropType<IIdPairName>
    },
    isDisabled:{
      default: false,
      type: Boolean,
    }
  },
  computed: {
  },
  methods: {
  }

});
</script>

<style lang="scss" scoped>
.font {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #595959;
}
</style>