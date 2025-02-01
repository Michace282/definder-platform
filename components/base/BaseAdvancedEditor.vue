<template>
  <BaseField v-bind="$attrs" v-on="$listeners">
    <TinyEditor
      :value="localValue"
      :init="options"
      :disabled="disabled"
      :api-key="apiKey"
      @input="updateLocalValue"
    />
  </BaseField>
</template>

<script>
import TinyEditor from '@tinymce/tinymce-vue'
import BaseField from '~/components/base/BaseField'
import { debounce } from '~/pkg/utils/functions'

export default {
  components: {
    BaseField,
    TinyEditor,
  },

  props: {
    value: {
      type: [String, Number],
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    image: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localValue: this.value,
    }
  },

  computed: {
    apiKey() {
      return process.env.TINYMCE_API_KEY
    },

    options() {
      return {
        height: 250,
        menubar: false,
        plugins: [
          'advlist autolink lists link charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table code help wordcount link table',
        ],
        toolbar:
          `undo redo | formatselect | bold italic link ${this.additionalToolbars} | ` +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist table',
      }
    },

    additionalToolbars() {
      if (this.image) {
        return 'image'
      }

      return ''
    },
  },

  watch: {
    value(val) {
      if (val === this.localValue) {
        return
      }

      this.localValue = val
    },
  },

  methods: {
    updateLocalValue(val) {
      this.localValue = val
      this.lazyUpdate(val)
    },

    lazyUpdate: debounce(function (val) {
      if (val === this.value) {
        this.localValue = val
        return
      }

      const formattedLocalValue = this.formatText(val)
      this.localValue = formattedLocalValue
      if (formattedLocalValue === this.value) {
        return
      }

      this.$emit('input', formattedLocalValue)
    }, 100),

    formatText(val) {
      let output = this.replace(val, /<img.*?>/, '')
      output = this.replace(output, /<svg.*?>/, '')
      output = this.replace(output, /<video.*?>/, '')

      return output
    },

    replace(val, regexp, replaceValue) {
      let output = val

      for (let i = output.search(regexp); i !== -1; i = output.search(regexp)) {
        output = output.replace(regexp, replaceValue)
      }

      return output
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/base/base-advanced-editor.global';
</style>
