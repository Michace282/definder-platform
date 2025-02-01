<template>
  <div class="my-projects">
    <div class="my-projects__container">
      <SectionTitle header-tag="h4" class="my-projects__title">
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
          class="my-projects__table"
        />
      </BaseScrollLoader>
    </div>
  </div>
</template>

<script>
import { MyProjectTableHeaders } from '~/pkg/configs/profile'

import SectionTitle from '~/components/general/SectionTitle'
import BaseScrollLoader from '~/components/base/BaseScrollLoader'
import ProjectsTable from '~/components/pages/profile/ProjectsTable'

const pageSize = 15

const formatItemsCallback = (item) => {
  const reservation = item.status === 'reservation'
  const financing = item.status === 'financing'
  const completed = item.status === 'completed'

  let readyToInvest
  let futureInvestors
  let round
  let invested
  let investors
  let walletNumber
  let canAddWallet

  if (reservation) {
    readyToInvest = item.reservationData.sum || ''
    futureInvestors = item.reservationData.investorsCount || ''
  } else if (financing) {
    invested = item.overallData.sum || ''
    investors = item.overallData.investorsCount || ''
    round = item?.currentRound?.nameFrontendNumber
    walletNumber = item.coinWallets
    canAddWallet = item.canAddWallet

    readyToInvest = item.reservationData.sum || ''
    futureInvestors = item.reservationData.investorsCount || ''
  } else if (completed) {
    invested = item.overallData.sum || ''
    investors = item.overallData.investorsCount || ''

    readyToInvest = item.reservationData.sum || ''
    futureInvestors = item.reservationData.investorsCount || ''
  } else {
    readyToInvest = ''
    futureInvestors = ''
    invested = ''
    investors = ''
    round = ''
    walletNumber = ''
  }

  return {
    id: item.id,
    projectId: item.id,
    name: item.name,
    goal: item.goal,
    readyToInvest,
    futureInvestors,
    telegram: item.telegramGroup,
    category: item.category,
    status: item.status,
    canAddWallet,
    round,
    invested,
    investors,
    returnDate: item.investmentReturnDate,
    walletNumber,
  }
}

export default {
  name: 'MyProjectsPage',

  components: {
    SectionTitle,
    BaseScrollLoader,
    ProjectsTable,
  },

  async asyncData({ $auth, $api }) {
    let res = null

    const data = {
      id: $auth.user.id,
      pageSize,
    }
    try {
      res = await $api.projects.getUserProjectList(data)
    } catch (e) {}

    let items = res?.results
    const currentPage = res?.currentPage
    const totalPages = res?.totalPages
    const totalRecords = res?.totalRecords

    if (items?.length) {
      items = items.map(formatItemsCallback)
    }

    return {
      items,
      currentPage,
      totalPages,
      totalRecords,
    }
  },

  data() {
    return {
      headers: MyProjectTableHeaders,
      items: [],
      currentPage: 0,
      totalPages: 0,
      totalRecords: 0,
    }
  },

  computed: {
    title() {
      return this.$t('PROFILE.TAB_MY_PROJECTS_TITLE')
    },

    isItemsOver() {
      return this.totalPages <= this.currentPage
    },
  },

  methods: {
    async loadMoreItems(preCallback, afterCallback) {
      const data = {
        id: this.$auth.user.id,
        page: ++this.currentPage,
        pageSize,
      }
      try {
        const investmentsInfo = await this.$api.projects.getUserProjectList(
          data
        )

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
@import '~assets/scss/pages/profile/my-projects/index';
</style>
