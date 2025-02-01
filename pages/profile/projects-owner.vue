<template>
  <div class="my-projects">
    <div class="my-projects__container">
      <SectionTitle header-tag="h4" class="my-projects__title">
        Withdraws
      </SectionTitle>

      <ProjectsOwnerWithdraws :items="projectsInfo.results" />
    </div>
  </div>
</template>

<script>
import { MyProjectTableHeaders } from '~/pkg/configs/profile'

import SectionTitle from '~/components/general/SectionTitle'

import ProjectsOwnerWithdraws from '~/components/pages/profile/projectsOwner/Withdraws'

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
    ProjectsOwnerWithdraws,
    SectionTitle,
  },

  async asyncData({ route, redirect, localePath, $api }) {
    let projectsInfo = {}
    try {
      projectsInfo = await $api.projects.getProjects({
        status: 'financing',
      })
    } catch (e) {}

    console.log('projectsInfo:', projectsInfo)
    return {
      projectsInfo,
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
    async fetchProjectsInfo(requestData) {
      try {
        this.projectsInfo = await this.$api.projects.getProjects(requestData)

        this.$refs.projects.scrollIntoView(true)
      } catch (e) {
        this.projectsInfo = {}
      }
    },
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
