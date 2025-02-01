<template>
  <div class="investments-page">
    <div class="investments-page__container">
      <SectionTitle header-tag="h4" class="investments-page__title">
        {{ title }}
      </SectionTitle>

      <BaseScrollLoader
        ref="container"
        :is-bottom-over="isItemsOver"
        :offset="250"
        :threshold="0"
        class="investments-page__wrapper"
        @load-bottom="loadMoreItems"
      >
        <ProjectsTable
          :title="title"
          :headers="headers"
          :items="items"
          class="investments-page__table"
        />
      </BaseScrollLoader>
    </div>
  </div>
</template>

<script>
import { InvestmentsTableHeaders } from '~/pkg/configs/profile'

import SectionTitle from '~/components/general/SectionTitle'
import BaseScrollLoader from '~/components/base/BaseScrollLoader'
import ProjectsTable from '~/components/pages/profile/ProjectsTable'

const pageSize = 15

const formatItemsCallback = (item) => {
  const investment = item.type === 'investment'
  const liquidityPool = item.type === 'liquidity pool'
  const completed = item.project.status === 'completed'

  let myInvestment
  let liqPool
  let investmentLink
  let liqPoolLink

  if (investment) {
    myInvestment = item.amount || ''
    investmentLink = item.link
  } else if (liquidityPool) {
    liqPool = item.amount || ''
    liqPoolLink = item.link
  } else {
    myInvestment = ''
    liqPool = ''
    investmentLink = ''
    liqPoolLink = ''
  }

  return {
    id: item.id,
    projectId: item.project.id,
    name: item.project.name,
    goal: item.project.goal,
    telegram: item.project.telegramGroup,
    category: item.project.category,
    status: item.project.status,
    round: completed ? '' : item.projectRound.nameFrontendNumber,
    myInvestment,
    liqPool,
    investmentLink,
    liqPoolLink,
    returnDate: item.project.investmentReturnDate,
  }
}

export default {
  name: 'InvestmentsProjectsPage',

  components: {
    SectionTitle,
    BaseScrollLoader,
    ProjectsTable,
  },

  async asyncData({ $auth, $api }) {
    let investmentsInfo = {}
    let items = []
    let currentPage = 0
    let totalPages = 0
    let totalRecords = 0

    const data = {
      id: $auth.user.id,
      pageSize,
    }
    try {
      investmentsInfo = await $api.transaction.getFinancing(data)

      items = investmentsInfo.results
      currentPage = investmentsInfo.currentPage
      totalPages = investmentsInfo.totalPages
      totalRecords = investmentsInfo.totalRecords
    } catch (e) {}

    if (items.length) {
      items = items.map(formatItemsCallback)
    }

    return {
      investmentsInfo,
      items,
      currentPage,
      totalPages,
      totalRecords,
    }
  },

  data() {
    return {
      investmentsInfo: null,
      headers: InvestmentsTableHeaders,
      items: [],
      currentPage: 0,
      totalPages: 0,
      totalRecords: 0,
    }
  },

  computed: {
    title() {
      return this.$t('PROFILE.TABLE_HEAD_MY_INVESTMENT')
    },

    isItemsOver() {
      return this.totalPages <= this.currentPage
    },
  },

  mounted() {},

  methods: {
    async loadMoreItems(preCallback, afterCallback) {
      const data = {
        id: this.$auth.user.id,
        page: ++this.currentPage,
        pageSize,
      }
      try {
        const investmentsInfo = await this.$api.transaction.getFinancing(data)

        const items = investmentsInfo.results
        this.currentPage = investmentsInfo.currentPage
        this.totalPages = investmentsInfo.totalPages
        this.totalRecords = investmentsInfo.totalRecords

        if (items.length) {
          if (preCallback) {
            preCallback()
          }

          this.items = [...this.items, ...items.map(formatItemsCallback)]

          if (afterCallback) {
            afterCallback()
          }
        }
      } catch (e) {}
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/pages/profile/investments/index';
</style>
