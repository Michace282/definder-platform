<template>
  <NuxtLink
    :to="linkToMainPage"
    :class="[`logo-block_${color}`]"
    class="logo-block"
  >
    <div class="logo-block__logo">
      <svg><use href="#icon-df" /></svg>
    </div>

    <div class="logo-block__name">DF Platform</div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'BaseLogo',

  props: {
    color: {
      type: String,
      default: 'white',
    },
  },

  computed: {
    linkToMainPage() {
      return this.localePath({ name: 'index' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables/base';
@import '~assets/scss/variables/colors';

.logo-block {
  display: flex;
  align-items: center;
  line-height: 100%;
  height: 100%;
  font-size: 20px;
  transition: color $transition-duration ease, fill $transition-duration ease;

  &_white {
    color: $white;
    fill: $white;
  }

  &_black {
    color: $black-100;
    fill: $black-100;
  }

  &__logo {
    display: flex;
    font-size: 1.3em;
    align-items: center;
    margin-bottom: 3px;

    svg {
      height: 23px;
      width: 16px;
    }
  }

  &__name {
    margin-left: 5px;
    font-weight: 500;
  }
}
</style>
