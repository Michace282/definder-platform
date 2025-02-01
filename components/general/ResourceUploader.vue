<template>
  <div
    v-click-block="handleClick"
    :class="{ 'resource-uploader_disabled': disabled }"
    class="resource-uploader"
  >
    <div class="resource-uploader__container">
      <div v-if="title" class="resource-uploader__title">
        {{ title }}
      </div>

      <div
        v-if="$scopedSlots['content']"
        :class="{ 'resource-uploader__content_no-margin': noContentMargin }"
        class="resource-uploader__content"
      >
        <slot name="content" />
      </div>

      <div class="resource-uploader__upload">
        <BaseFileInput
          ref="fileInput"
          v-model="model"
          v-bind="$attrs"
          multiple
          class="resource-input"
          :class="{ error: error }"
          :error="error"
        >
          <div class="resource-input__content">
            <div class="resource-input__upload">
              <BaseHoverText>
                <span class="resource-input__upload-text">
                  {{ uploadText }}
                </span>

                <template #left-icon>
                  <svg class="resource-input__upload-icon">
                    <use href="#icon-plus" />
                  </svg>
                </template>
              </BaseHoverText>
            </div>

            <div class="resource-input__hint">
              <slot name="hint">
                {{ uploadHint }}
              </slot>
            </div>

            <span v-if="error" class="resource-input__error">{{ error }}</span>
          </div>
        </BaseFileInput>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFileInput from '~/components/base/BaseFileInput'
import BaseHoverText from '~/components/base/BaseHoverText'

export default {
  name: 'ResourceUploader',

  components: {
    BaseFileInput,
    BaseHoverText,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },

    title: {
      type: String,
      default: null,
    },

    uploadText: {
      type: String,
      default: null,
    },

    uploadHint: {
      type: String,
      default: null,
    },

    noContentMargin: {
      type: Boolean,
      default: false,
    },

    max: {
      type: [Number, String],
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: null,
    },
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
  },

  methods: {
    open() {
      this.$refs.fileInput.open()
    },

    handleClick(event) {
      if (!this.disabled) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/resource-uploader';
</style>
