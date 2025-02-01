<template>
  <div class="project-calculator">
    <div class="project-calculator__container">
      <SectionTitle header-tag="h3" class="project-calculator__title">
        {{ $t('PROJECT_INFO.CALCULATOR_TITLE') }}
      </SectionTitle>

      <div class="project-calculator__item item project-calculator__invest">
        <div class="item__calculation">
          <div class="item__divider item__input">
            <BaseInput
              v-model="investValue"
              currency-mask
              :label="$t('PROJECT_INFO.HOW_MUCH_INVEST')"
              class="item__input-component"
            />
          </div>

          <div class="item__divider item__select">
            <BaseSelect
              v-model="currency"
              :placeholder="$t('PROJECT_INFO.CURRENCY')"
              :options="currencies"
              :reduce="(itm) => itm.name"
              label="name"
              :clearable="false"
              class="other-wallets__coin"
            />
          </div>

          <div class="item__divider item__info item__risk">
            <div class="item__info-head">{{ $t('PROJECT_INFO.RISK') }}</div>
            <div class="item__info-body">
              {{ riskPercent }}
            </div>
          </div>

          <div v-if="currencyValue" class="item__divider item__coin">
            <div class="item__info-head">{{ currencyValue.coins }}</div>
            <div class="item__info-body">
              {{ currencyValue.rate }}
            </div>
          </div>
        </div>

        <div class="item__result">
          {{ $t('PROJECT_INFO.LIQUIDITY_POOL') }} {{ $t('PROJECT_INFO.DNT') }}
          <span class="item__result_marks"> = </span>
          <span class="item__bold-text item__result_flex">
            {{ calcInvest }}
          </span>
        </div>
      </div>

      <div class="project-calculator__item project-calculator__return">
        <div class="item__calculation">
          <div class="item__divider item__text item__text_bold">
            {{ $t('PROJECT_INFO.RETURN_INVESTMENT') }}
          </div>
          <div class="item__divider item__roi-percentage">
            <div class="item__info-head">
              {{ $t('PROJECT_INFO.ROI_PERCENTAGE') }}
            </div>
            <div class="item__info-body">
              {{ roiPercent }}
            </div>
          </div>
        </div>

        <div class="item__result">
          <div class="item__result_flex">
            {{ $t('PROJECT_INFO.BUSD') }} {{ $t('PROJECT_INFO.RETURN') }}
            <span class="item__bold-text m-l">
              {{ calcReturn }}
            </span>
          </div>

          <span class="item__result_marks"> + </span>

          <div class="item__result_flex">
            {{ $t('PROJECT_INFO.DNT') }} {{ $t('PROJECT_INFO.RETURN') }}
            <span class="item__bold-text m-l">
              {{ calcInvest }}
            </span>
          </div>
        </div>
      </div>

      <!--      <SectionTitle header-tag="h5" class="project-calculator__title second">-->
      <!--        {{ $t('PROJECT_INFO.HOW_TO_INVEST') }}-->
      <!--      </SectionTitle>-->

      <!--      <div class="project-calculator__info">-->
      <!--        {{ $t('PROJECT_INFO.HOW_TO_INVEST_TEXT') }}-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SectionTitle from '~/components/general/SectionTitle'
import BaseInput from '~/components/base/BaseInput'
import BaseSelect from '~/components/base/BaseSelect'

export default {
  name: 'ProjectCalculator',

  components: {
    SectionTitle,
    BaseInput,
    BaseSelect,
  },

  props: {
    modalId: {
      type: Number,
      default: null,
    },

    projectData: {
      type: Object,
      default: () => ({}),
    },

    currencies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      investValue: null,
      currency: null,
    }
  },

  mounted() {
    this.currency = this.EXCHANGE_RATE.exchangeCoin
  },

  computed: {
    ...mapGetters('base', ['EXCHANGE_RATE']),

    riskPercent() {
      let riskLevel = ''
      if (this.projectData.category === 'low_risk') {
        riskLevel = this.$t('PROJECT.LOW_RISK')
      } else if (this.projectData.category === 'high_risk') {
        riskLevel = this.$t('PROJECT.HIGH_RISK')
      }
      const riskPercent = this.projectData.liquidityPoolPercent || 0

      return `${riskLevel} (${riskPercent}%)`
    },

    currencyValue() {
      if (!this.EXCHANGE_RATE) {
        return null
      }

      const exchangeRate = this.EXCHANGE_RATE.exchangeRate
      const localCoin = this.EXCHANGE_RATE.localCoin
      const exchangeCoin = this.EXCHANGE_RATE.exchangeCoin

      const rates = [
        {
          exchangeCoin,
          coins: `${localCoin}/${exchangeCoin}`,
          rate: exchangeRate,
        },
      ]

      const rate = rates.find((item) => item.exchangeCoin === this.currency)

      return rate
    },

    roiPercent() {
      return `${this.projectData.roiPercent || 0}%`
    },

    calcInvest() {
      let invest =
        (this.investValue *
          this.currencyValue?.rate *
          this.projectData.liquidityPoolPercent) /
        100

      if (isNaN(invest)) {
        return '~'
      }
      if (invest % 10 !== 0) {
        invest = invest.toFixed(1)
      }

      return invest
    },

    calcReturn() {
      let invest =
        +(this.investValue || 0) +
        (this.investValue * this.projectData.roiPercent) / 100

      if (isNaN(invest)) {
        return '~'
      }

      if (invest % 10 !== 0) {
        invest = invest.toFixed(1)
      }

      return invest
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/modal-content/project-calculator';
</style>
