<template>
  <BaseField
    :label="placeholder"
    :label-active="labelActive"
    :error="error"
    class="base-select"
    v-on="$listeners"
  >
    <VSelect
      ref="select"
      v-model="selected"
      :label="label"
      :options="options"
      :searchable="searchable"
      :calculate-position="withPopper"
      :get-option-key="getOptionKey"
      :clearable="clearable"
      :reduce="reduce"
      :disabled="disabled"
      :get-option-label="getOptionLabel"
      :loading="loading"
      :filterable="filterable"
      class="base-select__input"
      autocomplete="nope"
      append-to-body
      @search:focus="onFocus"
      @search:blur="onBlur"
      @search="onSearch"
      @open="onOpen"
      @close="onClose"
    >
      <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #selected-option="item">
        <slot name="selected-option">
          <div class="option">
            {{ getOptionLabel(item) }}
          </div>
        </slot>
      </template>

      <template #open-indicator="{ attributes: attrs }">
        <div class="base-select__arrow" @click.stop.prevent>
          <svg v-bind="attrs"><use href="#icon-arrow-down" /></svg>
        </div>
      </template>
    </VSelect>
  </BaseField>
</template>

<script>
import { createPopper } from '@popperjs/core'
import VSelect from 'vue-select'
import BaseField from './BaseField.vue'

export default {
  components: {
    BaseField,
    VSelect,
  },

  props: {
    value: {
      type: [String, Number, Object, Array],
      default: () => {},
    },

    options: {
      type: [Object, Array],
      default: () => {},
    },

    getOptionKey: {
      type: Function,
      default: (option) => {
        if (typeof option === 'object' && option.id) {
          return option.id
        } else {
          try {
            return JSON.stringify(option)
          } catch (e) {
            return null
          }
        }
      },
    },

    getOptionLabel: {
      type: Function,
      default(option) {
        if (typeof option === 'object') {
          if (!option[this.label]) {
            return ''
          }
          return option[this.label]
        }
        return option
      },
    },

    placeholder: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    searchable: {
      type: Boolean,
      default: true,
    },

    clearable: {
      type: Boolean,
      default: true,
    },

    reduce: {
      type: Function,
      default: (item) => item,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    filterable: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: null,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // selected: '',
      placement: 'bottom',
      focused: false,
      attributes: {
        ref: 'openIndicator',
        role: 'presentation',
        class: 'vs__open-indicator',
      },

      Deselect: {
        render: (createElement) =>
          createElement('i', { class: ['iconfont', 'iconfont-arrow-down'] }),
      },
    }
  },

  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },

    labelActive() {
      if (!this.selected) {
        return null
      }

      const isValueEmpty = this.selected.toString().length === 0
      return (this.focused && this.searchable) || !isValueEmpty
    },
  },

  watch: {
    value(val) {
      if (val !== null && val !== undefined) {
        this.selected = val
      }
      if (val === null) {
        this.selected = ''
      }
    },
  },

  mounted() {
    this.disableBubblingOnActions()
  },

  methods: {
    onFocus() {
      this.focused = true
    },

    onBlur() {
      this.focused = false
    },

    onSearch(...options) {
      this.$emit('search', ...options)
    },

    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width
      dropdownList.classList.add('append-to-body')
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            },
          },
        ],
      })
      return () => popper.destroy()
    },

    disableBubblingOnActions() {
      this.$refs.select.$el
        .querySelector('.vs__actions')
        .addEventListener('click', (event) => {
          event.preventDefault()
        })
    },

    onOpen() {
      this.$emit('open')
    },

    onClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/dist/vue-select.css';
@import '~assets/scss/base/base-select';
</style>
