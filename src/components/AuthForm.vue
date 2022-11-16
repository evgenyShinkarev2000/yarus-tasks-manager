<template>
  <form @submit.prevent="">
    <FormFiled :appearance="'login'" @input-valid-change="inputValidChange"></FormFiled>
    <FormFiled :appearance="'password'" @input-valid-change="inputValidChange"></FormFiled>
    <button class="h2-font" :class="isDisabled ? 'disabled' : 'enabled'" @click.prevent="submitButtonClick">Войти</button>
  </form>
</template>

<script lang="ts">
import { IFieldValidator } from '@/interfaces/IFiledValidator';
import { IFormFieldValidState } from '@/interfaces/IFormFieldValidState';
import { services } from '@/main';
import { defineComponent } from 'vue';
import FormFiled from './FormFiled.vue';

export default defineComponent({
  name: "AuthForm",
  components: { FormFiled },
  methods: {
    inputValidChange(validState: IFormFieldValidState){
      const index = this.fieldsValidState.findIndex((e: IFormFieldValidState) => e.id === validState.id)
      if ( index < 0){
        //@ts-ignore
        this.fieldsValidState.push(validState);
      }
      else{
        //@ts-ignore
        this.fieldsValidState[index] = validState;
      }

      if( this.fieldsValidState.findIndex((e: IFormFieldValidState) => e.isValid === false) >= 0){
        this.isDisabled = true;
      }
      else{
        this.isDisabled = false;
      }

    },
    submitButtonClick(){
      if (this.isDisabled){
        return;
      }

      services.permissionService.authenticate("123", "123");
      this.$router.push({name: 'workPlace'});
    }
  },
  data(){
    return{
      isDisabled: true,
      fieldsValidState: []
    }
  }
})
</script>

<style lang="scss" scoped>
form{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: calc(28 * var(--shpx));
}
button {
  width: 100%;
  height: calc(60 * var(--shpx));
  background-color: $light-blue;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: $white !important;
  &.disabled{
    opacity: 0.6;
  }
}
</style>