<template>
  <div class="fund-page">
    <div class="fund-page__container">
      <!--
      <div class="fund-page__form">
        <StakingForm mode="create" />
      </div>
      <InvestorCalculator /> -->
    </div>
  </div>
</template>

<script>
// import StakingForm from '~/components/general/Staking/StakingForm'
// import InvestorCalculator from '~/components/pages/staking/investorCalculator/InvestorCalculator'

export default {
  name: 'StakingPage',

  components: {
    // StakingForm,
    // InvestorCalculator,
  },

  layout: 'Wrapper',
  headerTheme: 'light',
  middleware: 'auth-required',
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/fund/index';
</style>
