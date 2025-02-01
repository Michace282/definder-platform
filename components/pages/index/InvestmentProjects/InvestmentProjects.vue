<template>
  <section class="investment-projects">
    <div class="investment-projects__container">
      <SectionTitle header-tag="h3" class="investment-projects__title">
        {{ $t('MAIN_PAGE.INVESTMENT_SECTION_TITLE') }}
      </SectionTitle>

      <div class="projects-filters">
        <div class="projects-filters__left">
          <BaseTabs
            v-model="selectedCategory"
            :items="categories"
            :get-option-key="(item) => item.code"
            class="projects-filters__risk"
            @input="changeCategory"
          >
            <template #option="{ item }">
              {{ $t(item.textCode) }}
            </template>
          </BaseTabs>
        </div>

        <div class="projects-filters__right">
          <div class="projects-filters__status status-filter">
            <div class="status-filter__title">{{ $t('GENERAL.STATUS') }}:</div>

            <BaseDropdown
              v-model="selectedStatus"
              :options="statuses"
              :get-option-key="(item) => item.code"
              class="status-filter__select"
              dark
              right
              xs-left
              @input="changeStatus"
            >
              <div class="status-filter__select-title">
                {{ $t(selectedStatus.textCode) }}
              </div>

              <template #option="{ option }">
                <div class="status-filter__select-option">
                  {{ $t(option.textCode) }}
                </div>
              </template>
            </BaseDropdown>
          </div>
        </div>
      </div>

      <div ref="container" class="projects-list">
        <div
          v-if="!projectsInfo.results || !projectsInfo.results.length"
          class="projects-list_empty"
        >
          <div class="projects-list_empty__icon">
            <img src="/images/sources/icon-sorry.svg" />
          </div>

          <div class="projects-list_empty__text">
            {{ $t('MAIN_PAGE.INVESTMENT_SECTION_EMPTY') }}
          </div>
        </div>

        <template v-else>
          <div
            v-for="(item, index) in projectsInfo.results"
            :key="item.id"
            class="projects-list__item bounceInLeft"
            :class="isVisible ? 'animation' : 'animatable'"
            :style="{ animationDelay: index * 0.6 + 's' }"
          >
            <ProjectCard
              :project="item"
              :project-id="item.id"
              :title="item.name"
              :address="item.address"
              :image="item.projectImages.imageCompressed"
              :status="item.status"
              :equity-raise="item.goal"
              :roi="item.roiPercent"
              :delay="index * 0.6"
            />
          </div>
        </template>
      </div>

      <div class="investment-projects__pagination">
        <NuxtLink
          v-if="isShowAllProjectsButton"
          class="investment-projects__pagination__show-all"
          color="white"
          :to="linkToMarketplacePage"
        >
          <div>All projects</div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import { ProjectsCategories, ProjectsStatuses } from '~/pkg/configs/projects'

import BaseDropdown from '~/components/base/BaseDropdown'
import BaseTabs from '~/components/base/BaseTabs'
import ProjectCard from '~/components/cards/ProjectCard'
import SectionTitle from '~/components/general/SectionTitle'
import intersectionObserverMixin from '~/mixins/intersectionObserverMixin'
// TODO: remove all pafinations variablse
const startPage = 1

export default {
  name: 'InvestmentProjects',

  components: {
    BaseDropdown,
    BaseTabs,
    ProjectCard,
    SectionTitle,
  },
  mixins: [intersectionObserverMixin],

  props: {
    projectsInfo: {
      type: Object,
      default: () => ({
        currentPage: 0,
        results: [],
        totalPages: 0,
        totalRecords: 0,
      }),
    },
  },

  data() {
    return {
      selectedCategory: null,
      selectedStatus: ProjectsStatuses[2],
      currentPage: startPage,
      pageSize: 6,
    }
  },

  computed: {
    categories() {
      return ProjectsCategories
    },

    statuses() {
      return ProjectsStatuses
    },

    isShowAllProjectsButton() {
      return (
        this.selectedStatus.code !== ProjectsStatuses[0].code ||
        this.selectedCategory !== null
      )
    },

    linkToMarketplacePage() {
      return this.localePath({ name: 'marketplace' })
    },
  },

  mounted() {},

  methods: {
    async changeStatus() {
      this.currentPage = startPage
      await this.fetchInfo()
    },

    async changeCategory() {
      this.currentPage = startPage
      await this.fetchInfo()
    },

    async changePage() {
      await this.fetchInfo()
    },

    async showAllProject() {
      this.currentPage = startPage
      this.selectedCategory = null
      this.selectedStatus = ProjectsStatuses[0]
      await this.fetchInfo()
    },

    fetchInfo() {
      this.$emit('fetch-info', {
        category: this.selectedCategory
          ? this.selectedCategory.code
          : undefined,
        status: this.selectedStatus.code || undefined,
        page: this.currentPage,
        pageSize: this.pageSize,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/investment-projects/investment-projects';
@import '~assets/scss/base/base-animation';
</style>
