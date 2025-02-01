<template>
  <div class="fund-page">
    <div class="fund-page__container">
      <ProjectForm mode="create" class="fund-page__form" />
    </div>
  </div>
</template>

<script>
import ProjectForm from '~/components/general/ProjectForm/ProjectForm'

export default {
  name: 'FundProjectPage',

  components: {
    ProjectForm,
  },

  layout: 'Wrapper',
  headerTheme: 'light',
  middleware: 'auth-required',
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/fund/index';
</style>
