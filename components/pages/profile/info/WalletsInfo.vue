<template>
  <div :class="{ 'wallets-info_disabled': disabled }" class="wallets-info">
    <div class="wallets-info__container">
      <SectionTitle header-tag="h4" class="wallets-info__title">
        {{ $t('PROFILE.TAB_PERSONAL_INFO_WALLETS_INFO') }}
      </SectionTitle>

      <div class="wallet-caution">
        <svg class="wallet-caution__icon">
          <use href="#icon-info" />
        </svg>

        <div class="wallet-caution__text">
          {{ $t('PROFILE.TAB_PERSONAL_INFO_DNT_WALLET_CAUTION') }}
        </div>
      </div>

      <div class="public-keys">
        <div class="public-keys__input">
          <BaseInput
            v-model="metamaskWalletData"
            :label="$t('PROFILE.TAB_PERSONAL_INFO_METAMASK_WALLET')"
            disabled
            copy
            class="public-keys__input-component"
          />
        </div>

        <div class="public-keys__input">
          <BaseInput
            v-model="trustWalletData"
            :label="$t('PROFILE.TAB_PERSONAL_INFO_TRUST_WALLET')"
            disabled
            copy
            class="public-keys__input-component"
          />
        </div>

        <!--        <div-->
        <!--          v-for="(item, index) in visibleCoinWallets"-->
        <!--          :key="item.id"-->
        <!--          class="public-keys__input"-->
        <!--        >-->
        <!--          <BaseInput-->
        <!--            :value="item.name"-->
        <!--            :label="getWalletPlaceholder(index, item)"-->
        <!--            :disabled="disabled"-->
        <!--            @input="inputCoinWalletName(item, $event)"-->
        <!--          />-->
        <!--        </div>-->
      </div>

      <!--      <div class="dnt-wallet">-->
      <!--        <ValidationProvider-->
      <!--          v-slot="{ errors }"-->
      <!--          rules="dntwallet"-->
      <!--          class="dnt-wallet__input"-->
      <!--          tag="div"-->
      <!--          :name="$t('PROFILE.TAB_PERSONAL_INFO_DNT_WALLET').toLowerCase()"-->
      <!--        >-->
      <!--          <BaseInput-->
      <!--            v-model="dntWalletData"-->
      <!--            :label="dntWalletLabel"-->
      <!--            :disabled="disabled"-->
      <!--            :error="errors[0]"-->
      <!--            class="dnt-wallet__input-component"-->
      <!--          />-->
      <!--        </ValidationProvider>-->
      <!--      </div>-->

      <!--      <div class="other-wallets wallets-info__other-wallets">-->
      <!--        <transition-group-->
      <!--          tag="div"-->
      <!--          :name="!disableAnimations ? 'other-wallets' : null"-->
      <!--          class="other-wallets__list"-->
      <!--          @before-leave="onBeforeCoinWalletLeave"-->
      <!--          @after-leave="onAfterCoinWalletLeave"-->
      <!--        >-->
      <!--          <div-->
      <!--            v-for="(item, index) in visibleCoinWallets"-->
      <!--            :key="item.id"-->
      <!--            class="other-wallets__item"-->
      <!--          >-->
      <!--            &lt;!&ndash;                unique: {&ndash;&gt;-->
      <!--            &lt;!&ndash;                  array: visibleCoinWallets,&ndash;&gt;-->
      <!--            &lt;!&ndash;                  reduce: (itm) => itm,&ndash;&gt;-->
      <!--            &lt;!&ndash;                  getOption: (itm) => itm.currency,&ndash;&gt;-->
      <!--            &lt;!&ndash;                },&ndash;&gt;-->
      <!--            <ValidationProvider-->
      <!--              v-slot="{ errors }"-->
      <!--              :rules="{}"-->
      <!--              class="other-wallets__coin"-->
      <!--              tag="div"-->
      <!--              :name="`${$t('PROFILE.TAB_PERSONAL_INFO_COIN').toLowerCase()} ${-->
      <!--                index + 1-->
      <!--              }`"-->
      <!--            >-->
      <!--              <BaseSelect-->
      <!--                :value="item.currency"-->
      <!--                :placeholder="getCoinPlaceholder(index, item)"-->
      <!--                :options="currencies"-->
      <!--                :reduce="(itm) => itm.name"-->
      <!--                :clearable="false"-->
      <!--                :disabled="disabled"-->
      <!--                :error="errors[0]"-->
      <!--                label="name"-->
      <!--                @input="inputCoinWalletCurrency(item, $event)"-->
      <!--              />-->
      <!--            </ValidationProvider>-->

      <!--            <ValidationProvider-->
      <!--              v-slot="{ errors }"-->
      <!--              :name="`${$t(-->
      <!--                'PROFILE.TAB_PERSONAL_INFO_WALLET_NUMBER'-->
      <!--              ).toLowerCase()} ${index + 1}`"-->
      <!--              :rules="{-->
      <!--                required: !!item.currency,-->
      <!--                regexp: getRegex(item),-->
      <!--              }"-->
      <!--              class="other-wallets__number"-->
      <!--              tag="div"-->
      <!--            >-->
      <!--              <BaseInput-->
      <!--                :value="item.name"-->
      <!--                :label="getWalletPlaceholder(index, item)"-->
      <!--                :disabled="disabled"-->
      <!--                :error="errors[0]"-->
      <!--                @input="inputCoinWalletName(item, $event)"-->
      <!--              />-->
      <!--            </ValidationProvider>-->

      <!--            <div class="other-wallets__delete">-->
      <!--              <svg-->
      <!--                v-if="canShowDeleteButton(index, item)"-->
      <!--                class="other-wallets__delete-btn"-->
      <!--                @click="deleteCoinWallet(item)"-->
      <!--              >-->
      <!--                <svg><use href="#icon-trash" /></svg>-->
      <!--              </svg>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </transition-group>-->

      <!--        <BaseHoverText class="other-wallets__add" @click="addCoinWallet">-->
      <!--          {{ $t('PROFILE.TAB_PERSONAL_INFO_ADD_WALLET_NUMBER') }}-->

      <!--          <template #left-icon>-->
      <!--            <svg class="other-wallets__add-icon">-->
      <!--              <use href="#icon-plus" />-->
      <!--            </svg>-->
      <!--          </template>-->
      <!--        </BaseHoverText>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
// import { ValidationProvider } from 'vee-validate'

import SectionTitle from '~/components/general/SectionTitle'
import BaseInput from '~/components/base/BaseInput'
// import BaseSelect from '~/components/base/BaseSelect'
// import BaseHoverText from '~/components/base/BaseHoverText'

export default {
  name: 'WalletsInfo',

  components: {
    // ValidationProvider,
    SectionTitle,
    BaseInput,
    // BaseSelect,
    // BaseHoverText,
  },

  props: {
    metamaskWallet: {
      type: String,
      default: null,
    },

    trustWallet: {
      type: String,
      default: null,
    },

    /**
     *  @example coinWallets: [
     *    {
     *      id: 0,
     *      name: "string",
     *      currency: "string",
     *      isUpdate: false,
     *      isDelete: false,
     *    },
     *  ]
     */
    coinWallets: {
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

    disableAnimations: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      deletingItemsCount: 0,
      originalDeletingItemId: null,
    }
  },

  computed: {
    visibleCoinWallets() {
      return this.coinWallets.filter((item) => !item.isDelete)
    },

    metamaskWalletData: {
      get() {
        return this.metamaskWallet
      },
      set(value) {
        this.$emit('update:metamask-wallet', value)
      },
    },

    trustWalletData: {
      get() {
        return this.trustWallet
      },
      set(value) {
        this.$emit('update:trust-wallet', value)
      },
    },

    // dntWalletLabel() {
    //   return this.$auth.user.dntWallet?.name
    //     ? this.$t('PROFILE.TAB_PERSONAL_INFO_DNT_WALLET')
    //     : this.$t('PROFILE.TAB_PERSONAL_INFO_DNT_WALLET_EMPTY')
    // },
  },

  methods: {
    getCoinPlaceholder(index, item) {
      const isValidIndex = index === 0
      const isNotOnDeletion =
        this.deletingItemsCount === 0 ||
        (this.originalDeletingItemId === null &&
          this.originalDeletingItemId !== item.id)

      return isValidIndex && isNotOnDeletion
        ? this.$t('PROFILE.TAB_PERSONAL_INFO_COIN')
        : null
    },

    getWalletPlaceholder(index, item) {
      const isValidIndex = index === 0
      const isNotOnDeletion =
        this.deletingItemsCount === 0 ||
        (this.originalDeletingItemId === null &&
          this.originalDeletingItemId !== item.id)

      return isValidIndex && isNotOnDeletion
        ? this.$t('PROFILE.TAB_PERSONAL_INFO_OTHER_WALLET')
        : null
    },

    canShowDeleteButton(index, item) {
      return index !== 0 || item.currency || item.name
    },

    addCoinWallet() {
      this.$emit('add-coin-wallet')
    },

    inputCoinWalletCurrency(item, value) {
      this.$emit('update-coin-wallet', item, 'currency', value)
    },

    inputCoinWalletName(item, value) {
      this.$emit('update-coin-wallet', item, 'name', value)
    },

    deleteCoinWallet(item) {
      if (this.visibleCoinWallets[0]?.id === item.id) {
        this.originalDeletingItemId = item.id
      }
      this.$emit('delete-coin-wallet', item)
    },

    onBeforeCoinWalletLeave() {
      this.deletingItemsCount++
    },

    onAfterCoinWalletLeave() {
      this.originalDeletingItemId = null
      this.deletingItemsCount--
    },

    getRegex(item) {
      return this.currencies.find((itm) => itm.name === item.currency)?.regex
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/profile/info/wallets-info';
</style>
