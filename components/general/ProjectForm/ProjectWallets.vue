<template>
  <div class="project-wallets">
    <transition-group
      tag="div"
      name="project-wallets"
      class="project-wallets__list"
    >
      <div
        v-for="(item, index) in wallets"
        :key="item.id"
        class="project-wallets__item"
      >
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('PROFILE.TAB_PERSONAL_INFO_COIN')"
          :rules="{
            required: true,
            unique: {
              array: wallets,
              reduce: (itm) => itm.name,
              getOption: (itm) => itm.currency && itm.currency.name,
            },
          }"
          class="project-wallets__coin"
          tag="div"
        >
          <BaseSelect
            :value="item.currency"
            :placeholder="
              index === 0 ? $t('PROFILE.TAB_PERSONAL_INFO_COIN') : null
            "
            :options="currencies"
            :get-option-label="(itm) => itm.name"
            :reduce="(itm) => itm"
            :clearable="false"
            :disabled="disabled || item.isActive"
            :error="errors[0]"
            label="name"
            @input="inputCoinWalletCurrency(item, $event)"
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('PROFILE.TAB_PERSONAL_INFO_WALLET_NUMBER')"
          :rules="{
            required: true,
            regexp: item.currency && item.currency.regex,
          }"
          class="project-wallets__number"
          tag="div"
        >
          <BaseInput
            :value="item.name"
            :label="
              index === 0 ? $t('PROFILE.TAB_PERSONAL_INFO_WALLET_NUMBER') : null
            "
            :disabled="disabled || item.isActive"
            :popover-content="disabled || item.isActive"
            :error="errors[0]"
            @input="inputCoinWalletName(item, $event)"
          />
        </ValidationProvider>

        <div class="project-wallets__delete">
          <svg
            v-if="index !== 0 && !item.isActive"
            class="project-wallets__delete-btn"
            @click="deleteCoinWallet(item)"
          >
            <svg><use href="#icon-trash" /></svg>
          </svg>
        </div>
      </div>
    </transition-group>

    <BaseHoverText class="project-wallets__add" @click="addCoinWallet">
      {{ $t('PROFILE.TAB_PERSONAL_INFO_ADD_WALLET_NUMBER') }}

      <template #left-icon>
        <svg class="project-wallets__add-icon">
          <use href="#icon-plus" />
        </svg>
      </template>
    </BaseHoverText>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

import BaseSelect from '~/components/base/BaseSelect'
import BaseInput from '~/components/base/BaseInput'
import BaseHoverText from '~/components/base/BaseHoverText'

export default {
  name: 'ProjectWallets',

  components: {
    ValidationProvider,
    BaseSelect,
    BaseInput,
    BaseHoverText,
  },

  props: {
    wallets: {
      type: Array,
      default: () => [],
    },

    currencies: {
      type: Array,
      default: () => [],
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    addCoinWallet() {
      this.$emit('add-coin-wallet')
    },

    inputCoinWalletCurrency(item, currency) {
      this.$emit('update-coin-wallet', item, 'currency', currency)
    },

    inputCoinWalletName(item, value) {
      this.$emit('update-coin-wallet', item, 'name', value)
    },

    deleteCoinWallet(item) {
      this.$emit('delete-coin-wallet', item)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/project-wallets';
</style>
