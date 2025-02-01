<template>
  <DefaultLayout>
    <div class="login-layout">
      <transition name="login-layout-background-fade">
        <div v-if="loaded" class="login-layout__background">
          <div
            v-for="item in backgroundFigures"
            :key="item"
            :class="item"
            class="background-figure"
          >
            <div class="background-figure__img">
              <img
                src="/images/sources/login-background-figure.svg"
                alt="background-figure"
              />
            </div>

            <div class="background-figure__border">
              <img
                src="/images/sources/login-background-figure-border.svg"
                alt="background-figure"
              />
            </div>
          </div>
        </div>
      </transition>

      <div class="login-layout__container">
        <Nuxt />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '~/layouts/Default'

export default {
  name: 'LoginLayout',

  components: {
    DefaultLayout,
  },

  data() {
    return {
      loaded: false,
    }
  },

  computed: {
    backgroundFigures() {
      return ['background-figure_bottom-left', 'background-figure_top-right']
    },
  },

  mounted() {
    this.$nextTick(() => this.load())
  },

  methods: {
    load() {
      this.loaded = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/layouts/login';
</style>
