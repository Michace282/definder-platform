<template>
  <VPopover
    :is="wrapperComponent"
    :disabled="!model"
    :class="{ 'field-wrapper_hover': popoverContent && model }"
    class="field-wrapper"
  >
    <BaseField
      v-bind="$attrs"
      :label-active="labelActive"
      :tooltip="tooltip"
      :disabled="disabled"
      :class="{ input_disabled: disabled }"
      class="input"
      v-on="$listeners"
      @errorTrigger="errorTrigger"
    >
      <div class="input__content">
        <input
          :placeholder="placeholder"
          v-model="model"
          :type="inputType"
          :readonly="disabled"
          class="input__field"
          @focus="onFocus"
          @blur="onBlur"
          @keyup="onKeyup"
        />

        <div v-if="canShowControls" class="input__controls" @click.stop.prevent>
          <div
            v-if="isPasswordType"
            :class="{ 'eye-icon_active': isPasswordVisible }"
            class="input__controls-item eye-icon"
            @click="togglePasswordVisibility"
          >
            <div class="eye-icon__container">
              <svg><use href="#icon-eye" /></svg>

              <div class="eye-icon__cross">
                <div class="eye-icon__line eye-icon__line-top" />
                <div class="eye-icon__line eye-icon__line-middle" />
              </div>
            </div>
          </div>

          <div
            v-if="copy"
            v-clipboard:copy="model"
            v-clipboard:success="onCopySuccess"
            v-clipboard:error="onCopyError"
            class="input__controls-item copy-icon"
          >
            <div class="copy-icon__container">
              <svg><use href="#icon-copy" /></svg>
            </div>
          </div>
        </div>
      </div>
    </BaseField>

    <template v-if="popoverContent" #popover>
      <div class="field-wrapper__popover">
        {{ model }}
      </div>
    </template>
  </VPopover>
</template>

<script>
import BaseField from '~/components/base/BaseField'

export default {
  name: 'BaseInput',

  components: {
    BaseField,
  },

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    tooltip: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    copy: {
      type: Boolean,
      default: false,
    },

    currencyMask: {
      type: Boolean,
      default: false,
    },

    popoverContent: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
      isPasswordVisible: false,
    }
  },

  computed: {
    model: {
      get() {
        if (this.currencyMask) {
          return this.$numFormatter.formatToThousand(this.value)
        }

        return this.value
      },
      set(value) {
        if (this.currencyMask) {
          const res = value.toString().replaceAll(' ', '')
          this.$emit('input', res)
          return
        }

        this.$emit('input', value)
      },
    },

    labelActive() {
      if (!this.model) {
        return false
      }

      const isValueEmpty = this.model.toString().length === 0
      return !isValueEmpty || this.focused
    },

    canShowControls() {
      return this.isPasswordType || this.copy
    },

    isPasswordType() {
      return this.type === 'password'
    },

    inputType() {
      if (this.isPasswordType) {
        if (this.isPasswordVisible !== true) {
          return 'password'
        }

        return 'text'
      }

      return this.type
    },

    wrapperComponent() {
      return this.popoverContent ? 'VPopover' : 'div'
    },
  },

  methods: {
    onFocus() {
      this.focused = true
    },

    onBlur() {
      this.focused = false
      this.$emit('blur', this.model) // Эмитировать событие blur с текущим значением model
    },
    onKeyup(event) {
      this.$emit('keyup', event) // Эмитировать событие keyup с текущим событием
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },

    onCopySuccess() {
      this.$toast.success(this.$t('TOAST.COPY_SUCCESS'))
    },

    onCopyError() {
      this.$toast.error(this.$t('TOAST.COPY_ERROR'))
    },

    errorTrigger(val) {
      this.$emit('errorTrigger', val)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/_base-input';
</style>
