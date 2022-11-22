<template>
  <div @click="clickHandler" class="modal-window">
    <div class="card tasks-scrollbar" ref=cardRef>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">import { defineComponent } from 'vue';
import { services } from '@/main';

export default defineComponent({
  name: "ModalTemplate",
  data(){
    return {
    }
  },
  methods:{
    clickHandler(clickElent: MouseEvent): void{
      const card = this.$refs.cardRef as HTMLElement;
      if(clickElent.clientX < card.offsetLeft
      || clickElent.clientX > card.offsetLeft + card.offsetWidth
      || clickElent.clientY < card.offsetTop
      || clickElent.clientY > card.offsetTop + card.offsetHeight){
        services.modalWindow.closeSignal$.next();
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .modal-window{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $modal-window-background;
    z-index: 10;
    padding-top: 13vh;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    .card{
      width: calc(596 * var(--swpx));
      height: fit-content;
      max-height: calc(792 * var(--shpx));
      min-height: calc(520 * var(--shpx));
      padding-block: calc(32 * var(--shpx));
      padding-inline: calc(32 * var(--swpx));
      background-color: $grey-0-9;
      border-radius: calc(15 * var(--swpx));
      display: flex;
      justify-content: stretch;
      align-items: stretch;
      overflow-y: auto;
      box-sizing: border-box;
    }
  
  }
</style>