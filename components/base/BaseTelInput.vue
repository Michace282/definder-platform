<template>
  <BaseField
    v-bind="$attrs"
    :label-active="labelActive"
    :disabled="disabled"
    :class="{ input_disabled: disabled }"
    class="input"
    v-on="$listeners"
  >
    <div class="input__content" :class="{ input__content_disabled: disabled }">
      <VueTelInput
        v-model="model"
        :mode="mode"
        :input-options="inputOptions"
        :dropdown-options="dropdownOptions"
        @input="onInput"
      />
    </div>
  </BaseField>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import BaseField from '~/components/base/BaseField'

export default {
  components: {
    VueTelInput,
    BaseField,
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
      country: 'UA',
      defaultCountry: 'UA',
      mode: 'international',
      inputOptions: {
        showDialCode: true,
        type: 'tel',
        maxlength: 25,
        autocomplete: 'on',
      },
      dropdownOptions: {
        showSearchBox: true,
        showDialCodeInList: true,
        showFlags: true,
      },
    }
    // https://iamstevendao.github.io/vue-tel-input/documentation/props.html
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },

    labelActive() {
      const isValueEmpty = this.model.toString().length === 0
      return !isValueEmpty || this.focused
    },
  },

  methods: {
    onFocus() {
      this.focused = true
    },

    onBlur() {
      this.focused = false
    },

    onInput(number, phoneObject) {
      this.$emit('inputObject', phoneObject)
    },
  },
}
</script>

<style>
@import 'vue-tel-input/dist/vue-tel-input.css';
</style>

<style lang="scss">
@import '~assets/scss/base/base-tel-input-global';
</style>

<style lang="scss" scoped>
@import '~assets/scss/base/base-tel-input';
</style>
