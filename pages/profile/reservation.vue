<template>
  <div class="reservation-page">
    <div class="reservation-page__container">
      <SectionTitle header-tag="h4" class="reservation-page__title">
        {{ title }}
      </SectionTitle>

      <BaseScrollLoader
        ref="container"
        :is-bottom-over="isItemsOver"
        :offset="250"
        :threshold="0"
        class="reservation-page__wrapper"
        @load-bottom="loadMoreItems"
      >
        <ProjectsTable
          :title="title"
          :headers="headers"
          :items="items"
          class="reservation-page__table"
        />
      </BaseScrollLoader>
    </div>
  </div>
</template>

<script>
import { ReservationTableHeaders } from '~/pkg/configs/profile'

import SectionTitle from '~/components/general/SectionTitle'
import BaseScrollLoader from '~/components/base/BaseScrollLoader'
import ProjectsTable from '~/components/pages/profile/ProjectsTable'

const pageSize = 15

const formatItemsCallback = (item) => {
  return {
    id: item.id,
    projectId: item.project.id,
    name: item.project.name,
    goal: item.project.goal,
    readyToInvest: item.readyToInvest,
    futureInvestors: item.futureInvestors,
    telegram: item.project.telegramGroup,
    category: item.project.category,
    status: item.type,
    myTransaction: item.link,
    specifiedInvestment: item.amount,
  }
}

export default {
  name: 'ReservationProjectsPage',

  components: {
    SectionTitle,
    BaseScrollLoader,
    ProjectsTable,
  },

  async asyncData({ $auth, $api }) {
    let reservationInfo = {}
    let items = []
    let currentPage = 0
    let totalPages = 0
    let totalRecords = 0

    const data = {
      id: $auth.user.id,
      pageSize,
    }
    try {
      reservationInfo = await $api.transaction.getReserved(data)

      items = reservationInfo.results
      currentPage = reservationInfo.currentPage
      totalPages = reservationInfo.totalPages
      totalRecords = reservationInfo.totalRecords
    } catch (e) {}

    if (items.length) {
      items = items.map(formatItemsCallback)
    }

    return {
      reservationInfo,
      items,
      currentPage,
      totalPages,
      totalRecords,
    }
  },

  data() {
    return {
      reservationInfo: null,
      headers: ReservationTableHeaders,
      items: [],
      currentPage: 0,
      totalPages: 0,
      totalRecords: 0,
    }
  },

  computed: {
    title() {
      return this.$t('PROFILE.TAB_RESERVATION_TITLE')
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
        const investmentsInfo = await this.$api.transaction.getReserved(data)

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
@import '~assets/scss/pages/profile/reservation/index';
</style>
