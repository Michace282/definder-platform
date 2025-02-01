<template>
  <div class="project-description">
    <div class="project-description__panel">
      <div class="project-description__title">
        {{ $t('PROJECT.DESCRIPTION') }}
      </div>

      <BaseTabs
        v-if="!hideLanguages && selectedLang"
        v-model="selectedLang"
        :items="descriptions"
        :get-option-key="(item) => item.code"
        :compare="(left, right) => left.code === right.code"
        no-empty
        class="project-description__languages"
      >
        <template #option="{ item }">
          <div class="project-description__languages-item">
            {{ $t(item.text) }}
          </div>
        </template>
      </BaseTabs>
    </div>

    <ValidationProvider
      v-for="item in descriptions"
      v-slot="{ errors }"
      :key="item.code"
      :style="selectedLang.code !== item.code ? 'display: none;' : null"
      :name="$t(item.text)"
      :rules="{ descriptionRequired: !hasAnyDescription }"
      tag="div"
      class="project-description__description"
    >
      <BaseAdvancedEditor
        :value="item.value"
        :disabled="disabled"
        :error="errors[0]"
        class="project-description__editor"
        @input="updateDescription(item, $event)"
      />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import BaseAdvancedEditor from '~/components/base/BaseAdvancedEditor'
import BaseTabs from '~/components/base/BaseTabs'

export default {
  name: 'ProjectDescription',

  components: {
    ValidationProvider,
    BaseAdvancedEditor,
    BaseTabs,
  },

  props: {
    descriptions: {
      type: Array,
      default: () => [],
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    hideLanguages: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedLang: this.descriptions[0],
    }
  },

  computed: {
    hasAnyDescription() {
      for (const lang of this.descriptions) {
        if (lang.value) {
          return true
        }
      }

      return false
    },
  },

  methods: {
    updateDescription(item, value) {
      this.$emit('update-description', item, value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/project-description';
</style>
