<template>
  <div class="field">
    <div class="input">
      <div class="img-container">
        <img v-if:="appearanceSetting.leftIconName" :src="require(`@/assets/${appearanceSetting.leftIconName}`)">
      </div>
      <input :class="isDirty ? 'dirty input-2-font' : 'move-down input-secondary-2-font'"
        :type="appearanceSetting.inputType" :placeholder="appearanceSetting.placeHolder" ref="input"
        @input="inputChange">
    </div>
    <div class="errors">
      <span class="error" v-for="error of validationErrors">{{ error }}</span>
    </div>
  </div>

</template>

<script lang="ts">import { defineComponent, PropType } from 'vue';
import { FormFieldAppearance } from '@/types/FormFieldAppearance';
import { IFieldValidator } from '@/interfaces/IFiledValidator';
import { emptyStatement } from '@babel/types';
import { Empty as Required } from '@/view-models/FieldValidators';
import { IFormFieldValidState } from '@/interfaces/IFormFieldValidState';
import { BehaviorSubject } from 'rxjs';
interface IAppearanceSettings {
  inputType: string,
  leftIconName?: string,
  validators: IFieldValidator[],
  placeHolder?: string,
}
const appearanceSettingSelector: { [key in FormFieldAppearance]: IAppearanceSettings } = {
  text: {
    inputType: "text",
    validators: []
  },
  login: {
    inputType: "text",
    leftIconName: "person-secondary-icon.png",
    validators: [new Required()],
    placeHolder: "Логин"
  },
  password: {
    inputType: "password",
    leftIconName: "lock-secondary-icon.png",
    validators: [new Required()],
    placeHolder: "Пароль"
  }
}
export default defineComponent({
  name: "FormField",
  props: {
    appearance: {
      type: String as PropType<FormFieldAppearance>,
      default: "text"
    },
    inputContainer: {
      type: Object as PropType<{input: string}>,
      default: {input: ""}
    },
  },
  computed: {
    appearanceSetting(): IAppearanceSettings {
      return appearanceSettingSelector[this.appearance];
    },
  },
  data() {
    return {
      isDirty: false,
      validationErrors: [],
      id: Symbol()
    }
  },
  mounted() {
    this.$emit("input-valid-change", { id: this.id, isValid: false } as IFormFieldValidState);
  },
  methods: {
    inputChange(e: Event): void {
      const input = e.target as HTMLInputElement;
      this.inputContainer.input = input.value;
      this.isDirty = input.value.length > 0;
      this.appearanceSetting.validators.forEach((validator: IFieldValidator) => validator.validate(input.value));
      //@ts-ignore
      this.validationErrors = this.appearanceSetting.validators
        .filter((validator: IFieldValidator) => validator.isError)
        .map((validator: IFieldValidator) => validator.errorText);
      const isValid = this.validationErrors.length === 0;
      this.$emit("input-valid-change", { id: this.id, isValid: isValid } as IFormFieldValidState);
    }
  }
})
</script>

<style lang="scss" scoped>
.field {
  min-height: calc(60 * var(--shpx));
  display: flex;
  flex-direction: column;
  padding-inline: calc(16 * var(--swpx));
  padding-top: calc(14 * var(--shpx));
  padding-bottom: calc(4 * var(--shpx));

  box-sizing: border-box;
  border: 1px solid $grey-2;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: $white;

  .input {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: min-content;
    gap: calc(16 * var(--swpx));

    .img-container {
      width: calc(24 * var(--swpx));
      height: calc(24 * var(--shpx));
      display: flex;

      img {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }

    input {
      border: none;
      outline: none;
      box-sizing: border-box;
      border-bottom: 1px solid transparent;

      &.dirty {
        border-bottom-color: $grey-2;
      }

      &.move-down {
        position: relative;
        top: calc(4 * var(--shpx));
      }
    }
  }

  .errors {
    margin-top: calc(4 * var(--shpx));
    color: $red;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>