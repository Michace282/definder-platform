<template>
  <div class="project-page">
    <div class="project-page__container">
      <ProjectInfo
        :project-data="projectData"
        :currencies="currencies"
        :tabs="tabs"
      />
    </div>
    <ProjectBanner />
  </div>
</template>

<script>
import ProjectInfo from '~/components/pages/projects/project/ProjectInfo'
import ProjectBanner from '~/components/pages/projects/project/ProjectBanner'

export default {
  name: 'ProjectPage',

  components: {
    ProjectInfo,
    ProjectBanner,
  },

  layout: 'Wrapper',

  headerTheme: 'light',

  async asyncData({ $api, route, error }) {
    const id = route.params.id
    let projectData = null
    try {
      projectData = await $api.projects.getById({ id })
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, messageCode: 'pageNotFound' })
    }

    let currencies = []
    try {
      currencies = await $api.wallets.getCurrencies()
    } catch (e) {
      console.error(e)
    }

    // projectData.reservationDntWallet = null
    // projectData.liquidityPoolDntWallet = null
    projectData.canSeeTelegramGroup = true

    return {
      projectData,
      currencies,
    }
  },

  data() {
    return {
      projectData: null,
      descriptions: '',
      currencies: null,
    }
  },

  computed: {
    projectId() {
      return this.$route.params.id
    },

    tabs() {
      if (this.$auth.loggedIn) {
        return [
          {
            id: 1,
            title: this.$t('PROJECT_INFO.DESCRIPTION'),
            text: this.projectData.description,
          },

          {
            id: 2,
            title: this.$t('PROJECT_INFO.DOCUMENTS'),
            documents: this.projectData.projectDocuments || 'file',
          },
        ]
      } else {
        return [
          {
            id: 1,
            title: this.$t('PROJECT_INFO.DESCRIPTION'),
            text: this.projectData.description,
          },
        ]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/index';
</style>
