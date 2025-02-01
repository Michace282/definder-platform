<template>
  <div class="index-page">
    <div class="index-page__container">
      <div id="projects" ref="projects" class="index-page__section">
        <ProjectsList
          :status="ProjectsStatuses[2]"
          :page-title="'Marketplace'"
          :projects-info="projectsInfo"
          :category="selectedCategory"
          @fetch-info="fetchProjectsInfo"
        />
      </div>

      <div class="index-page__section">
        <ContacSection />
      </div>
      <!-- <div class="index-page__section">
        <DonationSection />
      </div> -->

      <!--      <div class="index-page__section">-->
      <!--        <FullCompanies :companies="companies" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { CompaniesList, WaysToJoinList } from '~/pkg/configs/main'
import {
  ProjectsCategoriesEnum,
  ProjectsStatuses,
} from '~/pkg/configs/projects'
// import ShortCompanies from '~/components/pages/index/ShortCompanies/ShortCompanies'
import ProjectsList from '~/components/pages/projects/ProjectsList'
// import DonationSection from '~/components/pages/index/DonationSection/DonationSection'
// import WaysToJoin from '~/components/pages/index/WaysToJoin/WaysToJoin'
// import FullCompanies from '~/components/pages/index/FullCompanies/FullCompanies'
import ContacSection from '~/components/pages/index/ContacSection/ContacSection'

export default {
  name: 'IndexPage',

  components: {
    ProjectsList,
    ContacSection,
    // ShortCompanies,
    // DonationSection,
    // WaysToJoin,
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

    const category = route.query.category
      ? ProjectsCategoriesEnum[route.query.category]
      : null

    let projectsInfo = {}
    try {
      const requestData = {
        status: 'financing',
      }
      if (category) {
        requestData.category = category.code
      }
      projectsInfo = await $api.projects.getProjects(requestData)
    } catch (e) {}

    return {
      projectsInfo,
      selectedCategory: category,
    }
  },

  data() {
    return {
      projectsInfo: null,
      ProjectsStatuses,
      selectedCategory: null,
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
