<template>
  <div class="index-page">
    <div class="index-page__container">
      <div style="padding: 40px; text-align: center">
        <div style="width: 140px; margin-left: auto; margin-right: auto">
          <BaseLogo class="login-form__logo-component" color="black" />
        </div>

        <div style="font-size: 45px; margin-bottom: 70px">Coming soon</div>
        <img src="~assets/icons/confirmed_big.png" />
        <div style="font-size: 32px; height: 38px; vertical-align: middle">
          Follow the updates on our
          <a style="color: #0000ff; fill: #0000ff" href="#"
            >Telegram
            <svg
              class="additional__item-icon"
              style="
                margin-bottom: -5px;
                display: inline;
                height: 32px;
                width: 32px;
              "
            >
              <use href="#icon-telegram" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FullCompanies from '~/components/pages/index/FullCompanies/FullCompanies'

import BaseLogo from '~/components/base/BaseLogo'

export default {
  name: 'IndexPage',

  components: {
    BaseLogo,
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
      projectsInfo = await $api.projects.getProjects()
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

  computed: {},

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
