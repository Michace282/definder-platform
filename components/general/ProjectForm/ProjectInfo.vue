<template>
  <div class="project-info">
    <div class="project-name">
      <div class="project-name__panel">
        <div class="project-name__title">
          {{ $t('PROJECT.PROJECT_NAME') }}
        </div>

        <BaseTabs
          v-if="!hideLanguages && selectedLang"
          v-model="selectedLang"
          :items="names"
          :get-option-key="(item) => item.code"
          :compare="(left, right) => left.code === right.code"
          no-empty
          class="project-name__languages"
        >
          <template #option="{ item }">
            <div class="project-name__languages-item">
              {{ $t(item.text) }}
            </div>
          </template>
        </BaseTabs>
      </div>

      <ValidationProvider
        v-for="item in names"
        v-slot="{ errors }"
        :key="item.code"
        :rules="{
          min: 3,
          max: 240,
          nameRequired: !hasAnyName,
        }"
        :name="`${$t('PROJECT.PROJECT_NAME')} ${$t(item.text)}`"
        :style="selectedLang.code !== item.code ? 'display: none;' : null"
        class="project-name__block"
        tag="div"
      >
        <BaseInput
          :value="item.value"
          :disabled="disabled"
          :error="errors[0]"
          class="project-name__input"
          @input="updateName(item, $event)"
        />
      </ValidationProvider>
    </div>

    <ValidationProvider
      v-slot="{ errors }"
      class="project-info__goal"
      tag="div"
      rules="required|numeric"
      :name="$t('PROJECT.GOAL').toLowerCase()"
    >
      <BaseInput
        v-model="goalData"
        :label="$t('PROJECT.GOAL')"
        :disabled="disabled"
        currency-mask
        class="project-info__goal-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="project-info__address"
      tag="div"
      rules="required|min:3|max:240"
      :name="$t('PROJECT.ADDRESS').toLowerCase()"
    >
      <BaseInput
        v-model="addressData"
        :label="$t('PROJECT.ADDRESS')"
        :disabled="disabled"
        class="project-info__address-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="project-info__website"
      tag="div"
      rules="website|max:200"
      :name="$t('PROJECT.WEBSITE').toLowerCase()"
    >
      <BaseInput
        v-model="websiteData"
        :label="$t('PROJECT.WEBSITE')"
        :disabled="disabled"
        class="project-info__website-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="project-info__telegram"
      tag="div"
      rules="website"
      :name="$t('PROJECT.TELEGRAM_GROUP').toLowerCase()"
    >
      <BaseInput
        v-model="telegramGroupData"
        :label="$t('PROJECT.TELEGRAM_GROUP')"
        :disabled="disabled"
        class="project-info__telegram-input"
        :error="errors[0]"
      />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import BaseTabs from '~/components/base/BaseTabs'
import BaseInput from '~/components/base/BaseInput'

export default {
  name: 'ProjectInfo',

  components: {
    ValidationProvider,
    BaseTabs,
    BaseInput,
  },

  props: {
    names: {
      type: Array,
      default: () => [],
    },

    goal: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      default: null,
    },

    website: {
      type: String,
      default: null,
    },

    telegramGroup: {
      type: String,
      default: null,
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
      selectedLang: null,
    }
  },

  setup() {
    if (this.names.length === 0) {
      return
    }

    const index = this.names.findIndex((item) => item.value)
    this.selectedLang = this.names[index !== -1 ? index : 0]
  },

  computed: {
    goalData: {
      get() {
        return this.goal
      },
      set(value) {
        this.$emit('update:goal', value)
      },
    },

    addressData: {
      get() {
        return this.address
      },
      set(value) {
        this.$emit('update:address', value)
      },
    },

    websiteData: {
      get() {
        return this.website
      },
      set(value) {
        this.$emit('update:website', value)
      },
    },

    telegramGroupData: {
      get() {
        return this.telegramGroup
      },
      set(value) {
        this.$emit('update:telegram-group', value)
      },
    },

    hasAnyName() {
      for (const lang of this.names) {
        if (lang.value) {
          return true
        }
      }

      return false
    },
  },

  methods: {
    updateName(item, value) {
      this.$emit('update-name', item, value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/project-info';
</style>
