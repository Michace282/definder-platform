<template>
  <div class="index-page">
    <div class="index-page__container">
      <MainSection />

      <!--      <div class="index-page__section">-->
      <!--        <ShortCompanies :companies="companies" />-->
      <!--      </div>-->

      <div id="projects" ref="projects" class="index-page__section">
        <InvestmentProjects
          :projects-info="projectsInfo"
          @fetch-info="fetchProjectsInfo"
        />
      </div>

      <div id="how-it-works" class="index-page__section">
        <HowItWorks />
      </div>

      <div id="liquid-pool" class="index-page__section liquidity-pool">
        <LiquidityPool />
      </div>

      <!-- eee -->
      <!--
      <div class="index-page__section">
        <DaoVotingSystem />
      </div>
      -->

      <div class="index-page__section">
        <SmallMediumEnterprises />
      </div>

      <div class="index-page__section liquidity-pool">
        <Mobility />
      </div>
      <div class="index-page__section">
        <DefinderOffer />
      </div>

      <!--      <div class="index-page__section">-->
      <!--        <FullCompanies :companies="companies" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { CompaniesList, WaysToJoinList } from '~/pkg/configs/main'
import MainSection from '~/components/pages/index/MainSection'
// import ShortCompanies from '~/components/pages/index/ShortCompanies/ShortCompanies'
import InvestmentProjects from '~/components/pages/index/InvestmentProjects/InvestmentProjects'
import HowItWorks from '~/components/pages/index/HowItWorks/HowItWorks'
import LiquidityPool from '~/components/pages/index/LiquidityPool/LiquidityPool'
import SmallMediumEnterprises from '~/components/pages/index/SmallMediumEnterprises/SmallMediumEnterprises'
import Mobility from '~/components/pages/index/Mobility/Mobility'
import DefinderOffer from '~/components/pages/index/DefinderOffer/DefinderOffer'

// import DonationSection from '~/components/pages/index/DonationSection/DonationSection'
// import FullCompanies from '~/components/pages/index/FullCompanies/FullCompanies'
// import DaoVotingSystem from '~/components/pages/index/DaoVotingSystem'

export default {
  name: 'IndexPage',

  components: {
    MainSection,
    // ShortCompanies,
    InvestmentProjects,
    HowItWorks,
    LiquidityPool,
    // DonationSection,
    SmallMediumEnterprises,
    Mobility,
    DefinderOffer,
    // DaoVotingSystem,
    // FullCompanies,
  },

  layout: 'Wrapper',

  async asyncData({ route, redirect, localePath, $api }) {
    const verificationKey = route.query.key
    if (verificationKey) {
      try {
        await $api.registration.verifyEmail({ key: verificationKey })

        await redirect(
          localePath({
            name: 'auth-login',
            query: { accountActivated: true },
          })
        )
        return
      } catch (e) {}
    }

    const uid = route.query.uid
    const token = route.query.token
    if (uid && token) {
      const name = 'auth-forgot-password-confirm'
      const query = { uid, token }
      await redirect(localePath({ name, query }))
      return
    }

    let projectsInfo = {}
    try {
      projectsInfo = await $api.projects.getProjects({ status: 'financing' })
    } catch (e) {}

    return {
      projectsInfo,
    }
  },

  data() {
    return {
      projectsInfo: null,
    }
  },

  computed: {
    companies() {
      return CompaniesList
    },

    waysToJoin() {
      return WaysToJoinList
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
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/index';
</style>
