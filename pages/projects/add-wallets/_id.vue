<template>
  <div class="add-wallets">
    <div class="add-wallets__container">
      <ProjectForm
        :project="project"
        :currencies="currencies"
        mode="add-wallets"
        class="add-wallets__form"
      />
    </div>
  </div>
</template>

<script>
import ProjectForm from '~/components/general/ProjectForm/ProjectForm'

export default {
  name: 'AddWalletsPage',

  components: {
    ProjectForm,
  },

  layout: 'Wrapper',
  middleware: 'auth-required',
  headerTheme: 'light',

  async asyncData({ route, error, $api }) {
    let project = null
    try {
      project = await $api.projects.getById({ id: route.params.id })
    } catch {
      error({ statusCode: 404, messageCode: 'pageNotFound' })
      return
    }

    if (project.coinWallets?.length > 0) {
      const notActivated = project.coinWallets.find((item) => !item.isActive)
      if (!notActivated) {
        error({ statusCode: 404, messageCode: 'pageNotFound' })
        return
      }
    }

    let currencies = []
    try {
      currencies = await $api.wallets.getCurrencies()
    } catch {}

    return {
      project,
      currencies,
    }
  },

  data() {
    return {
      project: null,
      currencies: [],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/add-wallets/id';
</style>
