<template>
  <div class="index-page">
    <div class="index-page__container">
      <div id="projects" ref="projects" class="index-page__section">
        <ProjectsList
          :status="ProjectsStatuses[1]"
          :page-title="'DAO Voting System'"
          :projects-info="projectsInfo"
          @fetch-info="fetchProjectsInfo"
        />
      </div>

      <div class="index-page__section">
        <HowItWorksDAO />
      </div>
    </div>
  </div>
</template>

<script>
import { CompaniesList, WaysToJoinList } from '~/pkg/configs/main'
import { ProjectsStatuses } from '~/pkg/configs/projects'
import ProjectsList from '~/components/pages/projects/ProjectsList'
import HowItWorksDAO from '~/components/pages/dao/HowItWorksDAO/HowItWorksDAO'

export default {
  name: 'IndexPage',

  components: {
    ProjectsList,
    HowItWorksDAO,
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
      projectsInfo = await $api.projects.getProjects({
        status: 'reservation',
      })
    } catch (e) {}

    return {
      projectsInfo,
    }
  },

  data() {
    return {
      projectsInfo: null,
      ProjectsStatuses,
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
