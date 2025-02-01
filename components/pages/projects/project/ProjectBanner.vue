<template>
  <div class="project-banner">
    <div class="project-banner__container">
      <SectionTitle header-tag="h3" class="project-banner__title">
        {{ $t('PROJECT_INFO.FINANCE_YOUR_PROJECT') }}
      </SectionTitle>
      <FundProjectBtn class="project-banner__btn" />
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import FundProjectBtn from '~/components/general/FundProjectBtn'

export default {
  name: 'ProjectBanner',

  components: {
    SectionTitle,
    FundProjectBtn,
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-banner';
</style>
