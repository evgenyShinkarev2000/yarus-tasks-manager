<!-- <template>
  <div @click="clickHandler" class="modal-window">
    <div class="card tasks-scrollbar" ref=cardRef>
    </div>
  </div>
</template> -->

<script lang="ts">import { App, Component, defineComponent, h, resolveComponent, resolveDynamicComponent, VNode} from 'vue';
import { services } from '@/main';
import { Subscription } from 'rxjs';
import FullTaskViwer from './FullTaskViwer.vue';
import TaskCard from './TaskCard.vue';
import TaskForm from './TaskForm.vue';

export default defineComponent({
  name: "ModalTemplate",
  render(){
    const modalWindowClasses = ["modal-window"];
    if (!this.innerVNode){
      modalWindowClasses.push("hidden");
    }
    return h("div", {onClick: this.clickHandler, class: modalWindowClasses.join(" ")},h(
      "div", {class: "card tasks-scrollbar", ref: "cardRef"}, this.innerVNode));
  },
  data(){
    return {
      subsciptions: [] as Subscription[],
      innerVNode: undefined as VNode | undefined,
    }
  },
  created(){
    this.subsciptions
    .push(services.modalWindow.showComponent$
    .subscribe((vNode: VNode) => this.showComponent(vNode)));

    this.subsciptions
    .push(services.modalWindow.closeSignal$.subscribe(() => this.closeComponent()));
  },
  unmounted(){
    this.subsciptions.forEach(s => s.unsubscribe);
  },
  methods:{
    clickHandler(clickElent: MouseEvent): void{
      const card = this.$refs.cardRef as HTMLElement;
      if(!card){
        return;
      }
      if(clickElent.clientX < card.offsetLeft
      || clickElent.clientX > card.offsetLeft + card.offsetWidth
      || clickElent.clientY < card.offsetTop
      || clickElent.clientY > card.offsetTop + card.offsetHeight){
        services.modalWindow.closeSignal$.next();
      }
    },
    showComponent(vNode: VNode): void{
      this.innerVNode = vNode;
    },
    closeComponent(): void{
      this.innerVNode = undefined;
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
      overflow-x: hidden;
      box-sizing: border-box;
    }
  
  }
  .hidden{
    display: none;
  }
</style>