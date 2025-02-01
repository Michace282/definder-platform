<template>
  <div class="owner-page">
    <div class="owner-page__container">
      <div class="owner-page__content">
        <div class="owner-page__tabs">
          <BaseTabs
            v-if="selectTab && item"
            v-model="selectedTab"
            :items="tabs"
            :compare="(left, right) => left.id === right.id"
            class="pages-tabs"
            no-empty
          >
            <template #option="{ item }" v-if="item">
              {{ $t(item.text) }}
            </template>
          </BaseTabs>

          <BaseDropdown
            v-if="selectedTab"
            v-model="selectedTab"
            :options="tabs"
            :get-option-label="(item) => $t(item.text)"
            class="pages-dropdown"
            max-width-by-container
            arrow-to-end
            full-width
          >
            <div class="pages-dropdown__title">
              {{ $t(selectedTab.text) }}
            </div>
          </BaseDropdown>
        </div>

        <NuxtChild />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTabs from '~/components/base/BaseTabs'
import BaseDropdown from '~/components/base/BaseDropdown'

import { Tabs } from '~/pkg/configs/profile'

export default {
  name: 'ProfileParentPage',

  components: {
    BaseTabs,
    BaseDropdown,
  },

  layout: 'Wrapper',
  middleware: 'auth-required',
  headerTheme: 'light',
  scrollToTop: true,

  asyncData({ route }) {
    let selectedTab = null

    const [routeName] = route.name.split('___')
    for (const item of Tabs) {
      if (routeName === item.id) {
        selectedTab = item
        break
      }
    }
    return {
      selectedTab,
    }
  },

  data() {
    return {
      selectedTab: null,
    }
  },

  computed: {
    tabs() {
      return Tabs
    },
  },

  watch: {
    selectedTab() {
      this.selectTab(this.selectedTab)
    },

    $route() {
      let selectedTab = null

      const [routeName] = this.$route.name.split('___')
      for (const item of Tabs) {
        if (routeName === item.id) {
          selectedTab = item
          break
        }
      }

      if (selectedTab !== null) {
        this.selectedTab = selectedTab
      }
    },
  },

  methods: {
    async selectTab(tab) {
      const link = this.localePath(tab.link)
      await this.$router.push(link)
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/pages/profile/profile';
</style>
