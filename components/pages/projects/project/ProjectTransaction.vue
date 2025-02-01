<template>
  <div class="project-transaction">
    <div class="project-transaction__container">
      <div class="project-transaction__top-info top-info">
        <div v-if="status" class="top-info__item top-info__status">
          <span class="project-transaction__bold-text">
            {{ $t('PROJECT_INFO.STATUS') }}:
          </span>
          <span class="top-info__status-margin">
            {{ statusText }}
          </span>
        </div>

        <div v-if="isFinancingStatus" class="top-info__item top-info__round">
          <div class="top-info__round-divider"></div>

          <span class="project-transaction__bold-text">
            {{ projectData.currentRound.nameFrontend }}
          </span>
        </div>

        <div
          v-if="$auth.loggedIn && isFinancingStatus"
          class="top-info__item top-info__calculator"
          @click="openCalculator"
        >
          <BaseHoverText>
            <span> {{ $t('PROJECT_INFO.INVESTOR_CALCULATOR') }} </span>

            <template #left-icon>
              <div class="top-info__calculator-icon">
                <svg><use href="#icon-calculator" /></svg>
              </div>
            </template>
          </BaseHoverText>
        </div>
      </div>

      <div class="project-transaction__divider"></div>

      <ProjectTransactionProgress
        v-if="isReservationStatus"
        :round-data="projectData.reservationData"
        :goal="projectData.goal"
        :date-start="projectData.reservationDateStart"
        :date-end="projectData.reservationDateEnd"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
      />

      <ProjectTransactionProgress
        v-if="isFinancingStatus"
        :round-data="projectData.overallData"
        :goal="projectData.goal"
        :date-start="projectData.financingDateStart"
        :date-end="projectData.financingDateEnd"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
      />

      <ProjectTransactionProgress
        v-if="isFinancingStatus"
        :round-name="projectData.currentRound.nameFrontend"
        :round-data="projectData.currentRoundData"
        :goal="projectData.currentRound.goal"
        :date-start="projectData.currentRound.dateStart"
        :date-end="projectData.currentRound.dateEnd"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
        :is-confirmed="isConfirmed"
        color="green"
      />

      <ProjectTransactionProgress
        v-if="isCompletedStatus"
        :round-data="projectData.overallData"
        :goal="projectData.goal"
        :date-start="projectData.completedDate"
        :date-end="projectData.investmentReturnDate"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
      />

      <div
        v-if="$auth.loggedIn && !isCompletedStatus"
        class="project-transaction__wallets-wrapper"
      >
        <div
          v-if="!isReservationStatus"
          class="project-transaction__buy-dnt buy-dnt"
        >
          <BaseButton
            v-if="showBuyDntBtn"
            class="buy-dnt__main-btn"
            color="blue"
            @click="hideBuyDntBtn"
          >
            {{ $t('PROJECT_INFO.BUY_DNT_FOR_DONATION') }}
          </BaseButton>

          <div v-if="!showBuyDntBtn" class="buy-dnt__btns">
            <a
              class="buy-dnt__btn"
              target="_blank"
              href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x2456493e757fDeedF569781F053998A72adfad03"
            >
              <BaseButton color="blue">
                {{ $t('PROJECT_INFO.DEX') }}
              </BaseButton>
            </a>

            <a
              class="buy-dnt__btn"
              target="_blank"
              href="https://whitebit.com/ua/trade/DNT-USDT?tab=balances"
            >
              <BaseButton color="blue">
                {{ $t('PROJECT_INFO.CEX') }}
              </BaseButton>
            </a>
          </div>
        </div>
        <div
          v-if="isReservationStatus"
          class="project-transaction__wallets wallets"
        >
          <ProjectTransactionWallet
            v-if="projectData.reservationDntWallet"
            :project-data="projectData"
            :wallet-data="projectData.reservationDntWallet"
            :project-id="projectData.id"
            :is-reservation-status="isReservationStatus"
            :is-financing-status="isFinancingStatus"
            :is-completed-status="isCompletedStatus"
            type="platform"
            is-dnt
          />
        </div>

        <client-only v-else-if="isFinancingStatus">
          <BaseAccordion
            v-if="
              (projectData.reservationDntWallet &&
                projectData.liquidityPoolDntWallet) ||
              (projectData.coinWallets && projectData.coinWallets.length)
            "
            v-model="selectedTabId"
            :tabs="tabs"
            :refresh.sync="refreshAccordion"
            class="project-transaction__wallets wallets"
            multi-choose
            opened
          >
            <template #content="{ content }">
              <template v-for="wallet in financingWallets">
                <!--:is-reservation-status="wallet.id === 'donation'"-->
                <ProjectTransactionWallet
                  v-if="content.id === wallet.id"
                  :key="wallet.id"
                  :project-data="projectData"
                  :wallet-data="wallet"
                  :project-id="projectData.id"
                  :repeat-donation="isFinancingStatus"
                  :is-reservation-status="wallet.id === 'donation'"
                  :is-financing-status="wallet.id !== 'donation'"
                  :is-completed-status="isCompletedStatus"
                  :type="
                    wallet.id === 'donation' || wallet.id === 'dnt'
                      ? 'platform'
                      : 'project'
                  "
                  :is-dnt="isNaN(Number(wallet.id))"
                  no-label
                  @errorTrigger="errorTrigger(true, wallet.id)"
                />
              </template>
            </template>
          </BaseAccordion>
          <template v-else>
            <ProjectTransactionWallet
              v-if="projectData.reservationDntWallet"
              :project-data="projectData"
              :wallet-data="projectData.reservationDntWallet"
              :project-id="projectData.id"
              :is-reservation-status="true"
              :is-financing-status="false"
              :is-completed-status="false"
              :is-confirmed="isConfirmed"
              type="platform"
              is-dnt
            />

            <ProjectTransactionWallet
              v-if="projectData.liquidityPoolDntWallet"
              :project-data="projectData"
              :wallet-data="projectData.liquidityPoolDntWallet"
              :project-id="projectData.id"
              :is-reservation-status="isReservationStatus"
              :is-financing-status="isFinancingStatus"
              :is-completed-status="isCompletedStatus"
              :is-confirmed="isConfirmed"
              type="platform"
              is-dnt
            />
          </template>
        </client-only>

        <transition name="fade">
          <div
            v-if="
              isFinancingStatus &&
              ((projectData.coinWallets && projectData.coinWallets.length) ||
                projectData.liquidityPoolDntWallet) &&
              !isConfirmed
            "
            class="wallets__accept"
          >
            <div class="wallets__accept-container">
              <div class="wallets__accept-terms terms">
                <div class="terms__container">
                  <div class="terms__title">
                    {{ $t('PROJECT_INFO.ACCEPT_TITLE') }}
                  </div>
                  <div class="terms__content">
                    {{ $t('PROJECT_INFO.ACCEPT_TEXT_1') }}
                  </div>
                  <div class="terms__content">
                    {{ $t('PROJECT_INFO.ACCEPT_TEXT_2') }}
                  </div>

                  <ul class="terms__list">
                    <li class="terms__list-item">
                      {{ $t('PROJECT_INFO.ACCEPT_TERM_1') }}
                    </li>
                    <li class="terms__list-item">
                      {{ $t('PROJECT_INFO.ACCEPT_TERM_2') }}
                    </li>
                    <li class="terms__list-item">
                      {{ $t('PROJECT_INFO.ACCEPT_TERM_3') }}
                    </li>
                  </ul>

                  <div class="terms__content">
                    {{ $t('PROJECT_INFO.ACCEPT_TEXT_3') }}
                  </div>
                  <div class="terms__content">
                    {{ $t('PROJECT_INFO.ACCEPT_TEXT_4') }}
                  </div>
                  <div class="terms__content">
                    {{ $t('PROJECT_INFO.ACCEPT_TEXT_5') }}
                  </div>

                  <div class="terms__link">
                    <BaseLink
                      to="/docs/investment_terms_and_conditions.pdf"
                      target="_blank"
                      color="white"
                    >
                      {{ $t('PROJECT_INFO.ACCEPT_LINK') }}
                    </BaseLink>
                  </div>
                </div>
              </div>
            </div>
            <ValidationObserver
              ref="observer"
              class="wallets__accept-request"
              tag="form"
              @submit.prevent="confirmTerms"
            >
              <div class="wallets__accept-request-wrapper">
                <ValidationProvider
                  v-slot="{ errors }"
                  class="wallets__accept-checkbox"
                  tag="div"
                  :rules="{ required: { allowFalse: false } }"
                  :name="$t('PROJECT_INFO.ACCEPT').toLowerCase()"
                >
                  <BaseCheckbox
                    v-model="acceptTermsModel"
                    class="wallets__accept-checkbox-component"
                    :error="errors[0]"
                  >
                    {{ $t('PROJECT_INFO.ACCEPT') }}
                  </BaseCheckbox>
                </ValidationProvider>

                <BaseButton
                  class="wallets__accept-btn"
                  component="button"
                  form-type="submit"
                  type="filled"
                  size="lg"
                  color="blue"
                >
                  {{ $t('PROJECT_INFO.SAVE') }}
                </BaseButton>
              </div>
            </ValidationObserver>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import BaseHoverText from '~/components/base/BaseHoverText'
import ProjectTransactionProgress from '~/components/pages/projects/project/ProjectTransactionProgress'
import ProjectTransactionWallet from '~/components/pages/projects/project/ProjectTransactionWallet'
import BaseCheckbox from '~/components/base/BaseCheckbox'
import BaseButton from '~/components/base/BaseButton'
import BaseAccordion from '~/components/base/BaseAccordion'
import BaseLink from '~/components/base/BaseLink'

export default {
  name: 'ProjectTransaction',

  components: {
    BaseHoverText,
    ProjectTransactionProgress,
    ProjectTransactionWallet,
    BaseCheckbox,
    ValidationObserver,
    ValidationProvider,
    BaseButton,
    BaseAccordion,
    BaseLink,
  },

  props: {
    projectData: {
      type: Object,
      default: () => ({}),
    },

    status: {
      type: String,
      default: null,
    },

    statusText: {
      type: String,
      default: null,
    },

    currencies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isConfirmed: true,
      acceptTermsModel: false,
      selectedTabId: {},
      refreshAccordion: [],

      showBuyDntBtn: true,
    }
  },

  computed: {
    isReservationStatus() {
      return this.status.toLocaleLowerCase() === 'reservation'
    },
    isFinancingStatus() {
      return this.status.toLocaleLowerCase() === 'financing'
    },
    isCompletedStatus() {
      return this.status.toLocaleLowerCase() === 'completed'
    },

    tabs() {
      const coinWallets = this.financingWallets.filter((item) => item.isActive)

      return coinWallets.map((item, index) => {
        let title
        if (item.id === 'dnt') {
          title = this.$t('PROJECT_INFO.DNT_WALLET')
        } else if (item.id === 'donation') {
          title = this.$t('PROJECT_INFO.DONATION_WALLET')
        } else {
          title = `${this.$t('PROJECT_INFO.BUSD_WALLET')} ${item.currency}`
        }

        return {
          id: item.id,
          title,
        }
      })
    },

    financingWallets() {
      const wallets = this.projectData.coinWallets?.length
        ? [...this.projectData.coinWallets]
        : []

      const liqWallet = {
        ...this.projectData.liquidityPoolDntWallet,
        id: 'dnt',
      }
      if (this.projectData.liquidityPoolDntWallet) {
        wallets.splice(0, 0, liqWallet)
      }

      const donationWallet = {
        ...this.projectData.reservationDntWallet,
        id: 'donation',
      }
      if (this.projectData.reservationDntWallet) {
        wallets.splice(0, 0, donationWallet)
      }

      return wallets
    },
  },

  mounted() {
    this.selectTabId()
    this.isTermsConfirmed()
  },

  methods: {
    selectTabId() {
      if (this.financingWallets && this.financingWallets.length) {
        this.selectedTabId = this.financingWallets[0].id
      }
    },

    async isTermsConfirmed() {
      if (!this.$auth.loggedIn || !this.isFinancingStatus) {
        return
      }

      try {
        const confirmation = await this.$api.projects.isConfirmedTerms({
          id: this.projectData.id,
        })

        this.isConfirmed = confirmation.isConfirmed
      } catch {}
    },

    openCalculator() {
      const currencies = this.currencies

      this.$modal.open({
        component: 'ProjectCalculator',
        options: {
          projectData: this.projectData,
          currencies,
        },
      })
    },

    async confirmTerms() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      try {
        await this.$api.projects.confirmTerms({
          id: this.projectData.id,
        })

        this.isConfirmed = true

        this.$toast.success(this.$t('TOAST.CONFIRM_TERMS_SUCCESS'))
      } catch (e) {
        console.error(e)
        this.$toast.error(this.$t('TOAST.CONFIRM_TERMS_ERROR'))
      }
    },

    errorTrigger(val, id) {
      this.refreshAccordion.push({
        id,
        invalid: val,
      })
    },

    hideBuyDntBtn() {
      this.showBuyDntBtn = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-transaction';
</style>
