<template>
  <BaseField
    v-bind="$attrs"
    :label-active="labelActive"
    class="input"
    v-on="$listeners"
  >
    <textarea
      v-model="model"
      :class="{ [`resize-${resize}`]: true }"
      class="input__field"
      @focus="onFocus"
      @blur="onBlur"
    />
  </BaseField>
</template>

<script>
import BaseField from '~/components/base/BaseField'

export default {
  name: 'BaseTextarea',

  components: {
    BaseField,
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },

    resize: {
      type: String,
      default: 'vertical',
      validator(val) {
        return ['none', 'horizontal', 'vertical', 'both'].includes(val)
      },
    },
  },

  data() {
    return {
      focused: false,
    }
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
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
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/_base-textarea';
</style>
