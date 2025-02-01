<template>
  <BaseTable
    v-if="items && items.length"
    :headers="headers"
    :get-header-key="(head) => head.code"
    :items="items"
    :get-item-key="(item) => item.id"
    class="projects-table"
  >
    <template #table-th="{ head }">
      <div class="head">
        {{ $t(head.name) }}
      </div>
    </template>

    <template #table-td="{ head, item }">
      <div :class="head.class" class="column">
        <template v-if="head.code === 'name'">
          <div v-if="isModerationStatus(item)" class="cell-not-link">
            {{ item[head.code] }}
          </div>
          <BaseLink v-else :to="getPathToProject(item)" class="cell-name">
            {{ item[head.code] }}
          </BaseLink>
        </template>

        <template
          v-else-if="
            head.code === 'goal' ||
            head.code === 'readyToInvest' ||
            head.code === 'futureInvestors' ||
            head.code === 'specifiedInvestment' ||
            head.code === 'myInvestment' ||
            head.code === 'invested' ||
            head.code === 'liqPool'
          "
        >
          <div class="cell-goal">
            {{ formatToThousand(item[head.code]) }}
          </div>
        </template>

        <template v-else-if="head.code === 'telegram' && item[head.code]">
          <a :href="item[head.code]" target="_blank">
            <BaseHoverText class="cell-telegram">
              <span>{{ $t('PROJECT_INFO.WORKSPACE') }}</span>

              <template #left-icon>
                <svg class="cell-telegram__icon">
                  <use href="#icon-telegram" />
                </svg>
              </template>
            </BaseHoverText>
          </a>
        </template>

        <template v-else-if="head.code === 'category'">
          <div class="cell-category">
            {{ $t(getCategory(item[head.code]).textCode) }}
          </div>
        </template>

        <template v-else-if="head.code === 'status'">
          <div
            :class="{ [`cell-status_${item[head.code]}`]: true }"
            class="cell-status"
          >
            {{ $t(getStatus(item[head.code]).textCode) }}
          </div>
        </template>

        <template v-else-if="head.code === 'returnDate'">
          <div class="cell-goal">
            {{ formatDate(item[head.code]) }}
          </div>
        </template>

        <template v-else-if="showWalletButton(head, item)">
          <div class="cell-wallet-number">
            <template v-if="!item.canAddWallet">
              <!--                v-for="wallet in item[head.code]"-->
              <div class="cell-wallet-number__wallet">
                <!--                {{ wallet }}-->
                {{ item[head.code] && item[head.code][0] }}
              </div>
            </template>

            <BaseButton
              v-else
              color="blue"
              class="cell-wallet-number__btn"
              @click="addWalletNumber(item)"
            >
              {{ $t('PROFILE.ADD') }}
            </BaseButton>
          </div>
        </template>

        <template v-else>
          {{ item[head.code] }}
        </template>
      </div>
    </template>
  </BaseTable>

  <div v-else class="project-empty-table">
    <div class="project-empty-table__icon">
      <img src="/images/sources/icon-sorry.svg" />
    </div>

    <div class="project-empty-table__text">
      {{ $t('PROFILE.TAB_EMPTY', { title: title }) }}
    </div>
  </div>
</template>

<script>
import {
  ProjectsCategoriesEnum,
  ProjectsStatusesEnum,
} from '~/pkg/configs/projects'

import BaseTable from '~/components/base/BaseTable'
import BaseLink from '~/components/base/BaseLink'
import BaseHoverText from '~/components/base/BaseHoverText'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'ProjectsTable',

  components: {
    BaseTable,
    BaseLink,
    BaseHoverText,
    BaseButton,
  },

  props: {
    title: {
      type: String,
      default: null,
    },

    headers: {
      type: Array,
      default: () => [],
    },

    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      categories: ProjectsCategoriesEnum,
      statuses: ProjectsStatusesEnum,
    }
  },

  methods: {
    getPathToProject(item) {
      return this.localePath({
        name: 'projects-id',
        params: { id: item.projectId },
      })
    },

    getStatus(code) {
      const status = Object.values(this.statuses).find(
        (item) => item.code === code
      )

      return status || this.statuses.unknown
    },

    getCategory(code) {
      const category = Object.values(this.categories).find(
        (item) => item.code === code
      )

      return category || this.categories.unknown
    },

    formatToThousand(num) {
      return this.$numFormatter.formatToThousand(num)
    },
    formatDate(date) {
      if (!date) {
        return ''
      }
      return this.$date.formatToShort(date)
    },

    showWalletButton(head, item) {
      return head.code === 'walletNumber' && this.isFinancing(item)
    },

    isModerationStatus(item) {
      return item.status === 'moderation'
    },
    isReservationStatus(item) {
      return item.status === 'reservation'
    },
    isFinancing(item) {
      return item.status === 'financing'
    },

    async addWalletNumber(item) {
      await this.$router.push(
        this.localePath({
          name: 'projects-add-wallets-id',
          params: { id: item.id },
        })
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/profile/projects-table';
</style>
