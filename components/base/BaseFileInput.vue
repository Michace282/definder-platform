<template>
  <label class="file-input">
    <span class="file-input__container">
      <slot />

      <input
        ref="fileInput"
        :accept="accept"
        :multiple="multiple"
        type="file"
        class="file-input__input"
        @input="onInput"
      />
    </span>
  </label>
</template>

<script>
let idCounter = 0

export default {
  name: 'BaseFileInput',

  props: {
    value: {
      default: null,
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    accept: {
      type: String,
      default: '',
    },

    preloadedFiles: {
      type: Array,
      default: () => [],
    },

    max: {
      type: [Number, String],
      default: null,
    },

    maxSize: {
      type: [Number, String],
      default: null,
    },

    error: {
      type: String,
      default: null,
    },
  },

  computed: {
    fileInput() {
      return this.$refs.fileInput
    },

    selectedFiles() {
      const preloaded =
        this.multiple && this.preloadedFiles ? this.preloadedFiles.length : 0

      const current =
        this.multiple && this.value ? this.value.length : this.value ? 1 : 0

      return preloaded + current
    },

    acceptedTypes() {
      const trimmed = this.accept.replaceAll(' ', '')
      return trimmed.length > 0 ? trimmed.split(',') : []
    },

    invalid() {
      return !!this.error
    },
  },

  watch: {
    invalid(val) {
      this.$emit('errorTrigger', val)
    },
  },

  methods: {
    onInput() {
      const arr = [...this.fileInput.files]
      const files = this.max ? arr.slice(0, this.max - this.selectedFiles) : arr

      this.addIds(files)

      let check = true

      if (this.multiple) {
        for (let i = 0; i < files.length; i++) {
          if (!this.tryLoadFile(files[i])) {
            check = false
            break
          }
        }
      } else {
        const file = files[0]
        check = this.tryLoadFile(file)
      }

      if (check) {
        const currentFiles = this.value && this.multiple ? [...this.value] : []
        const entries = this.multiple ? [...currentFiles, ...files] : files[0]
        this.loadFile(entries)
        this.fileInput.value = ''
      }
    },

    addIds(files) {
      for (const file of files) {
        file.id = idCounter++
      }
    },

    tryLoadFile(file) {
      if (!this.checkFileType(file)) {
        this.$emit('type-error')
        return false
      } else if (!this.checkFileSize(file)) {
        this.$emit('size-error')
        return false
      } else {
        return true
      }
    },

    checkFileType(file) {
      if (this.acceptedTypes.length === 0) {
        return true
      }

      for (const type of this.acceptedTypes) {
        const dot = '.'
        if (type.includes(dot)) {
          const extension = `.${type.split(dot)[1]}`
          const lastIndex = file.name.lastIndexOf(extension)

          if (lastIndex === file.name.length - extension.length) {
            return true
          }
        }

        const slash = '/'
        if (type.includes(slash)) {
          const [ruleFormat, ruleType] = type.split('/')
          const [fileFormat, fileType] = file.type.split('/')

          const any = '*'

          const isFormatValid = ruleFormat === any || ruleFormat === fileFormat
          const isTypeValid = ruleType === any || ruleType === fileType

          if (isFormatValid && isTypeValid) {
            return true
          }
        }
      }

      return false
    },

    checkFileSize(file) {
      return this.maxSize === null || file.size <= this.maxSize
    },

    loadFile(file) {
      this.$emit('input', file)
    },

    open() {
      this.$refs.fileInput.click()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-file-input';
</style>
