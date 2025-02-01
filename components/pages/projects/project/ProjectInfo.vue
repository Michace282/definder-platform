<template>
  <div class="project-info">
    <div class="project-info__container">
      <div class="project-info__head">
        <SectionTitle header-tag="h3" class="project-info__title">
          <template #default>
            {{ project.name }}
          </template>

          <template #append>
            <div
              v-clipboard:copy="linkToCurrentProject"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
              class="project-info__share"
            >
              <svg><use href="#icon-share" /></svg>
            </div>
          </template>
        </SectionTitle>
      </div>

      <div class="project-info__additional additional">
        <div class="additional__category additional__item">
          <span class="additional__category-text">
            {{ $t('PROJECT_INFO.CATEGORY') }}:
          </span>
          {{ $t(getCategory(project.category).textCode) }}
        </div>

        <div
          v-if="$auth.loggedIn && project.telegramGroup"
          v-click-block="checkTelegramAvailability"
          class="additional__telegram additional__item additional__link"
        >
          <a
            :href="
              project.canSeeTelegramGroup ? project.telegramGroup : '#telegram'
            "
            target="_blank"
          >
            <BaseHoverText>
              <!-- <span> {{ formattedUrl(project.telegramGroup) }} </span>-->
              <span> {{ $t('PROJECT_INFO.WORKSPACE') }} </span>

              <template #left-icon>
                <svg class="additional__item-icon">
                  <use href="#icon-telegram" />
                </svg>
              </template>
            </BaseHoverText>
          </a>
        </div>

        <div
          v-if="$auth.loggedIn && project.webSite"
          class="additional__site additional__item additional__link"
        >
          <a
            :href="project.webSite"
            class="additional__item-link"
            target="_blank"
          >
            <BaseHoverText component="div" color="black">
              <div class="additional__item-text">
                {{ formattedUrl(project.webSite) }}
              </div>

              <template #left-icon>
                <svg class="additional__item-icon">
                  <use href="#icon-link" />
                </svg>
              </template>
            </BaseHoverText>
          </a>
        </div>

        <div
          v-if="$auth.loggedIn && project.address"
          class="additional__address additional__item"
        >
          <VPopover>
            <BaseHoverText
              class="additional__item-container"
              color="no-hover-black"
            >
              <div class="additional__item-text">
                {{ project.address }}
              </div>

              <template #left-icon>
                <svg class="additional__item-icon">
                  <use href="#icon-address" />
                </svg>
              </template>
            </BaseHoverText>

            <template #popover>
              <div class="big-popover">
                {{ project.address }}
              </div>
            </template>
          </VPopover>
        </div>

        <div
          v-if="$auth.loggedIn && project.companyName"
          class="additional__building additional__item"
        >
          <VPopover>
            <BaseHoverText
              class="additional__item-container"
              color="no-hover-black"
            >
              <div class="additional__item-text">
                {{ project.companyName }}
              </div>

              <template #left-icon>
                <svg class="additional__item-icon">
                  <use href="#icon-building" />
                </svg>
              </template>
            </BaseHoverText>

            <template #popover>
              <div class="big-popover">
                {{ project.companyName }}
              </div>
            </template>
          </VPopover>
        </div>
      </div>

      <div class="project-info__content content">
        <div class="content__slider slider">
          <ProjectImages
            :project-images="project.projectImages"
            class="slider__images"
          >
            <template #status>
              <div
                v-if="project.status"
                :class="{ [`content__project-status_${project.status}`]: true }"
                class="content__project-status"
              >
                {{ statusText }}
              </div>
            </template>
          </ProjectImages>
        </div>

        <div class="content__description content__description_desktop">
          <BaseTabs
            v-model="selectedTab"
            :items="tabs"
            :get-option-key="(item) => item.title"
            :compare="(left, right) => left.title === right.title"
            no-empty
            class="content__description-head"
          >
            <template #option="{ item }">
              <div class="content__description-title">{{ item.title }}</div>
            </template>
          </BaseTabs>

          <div
            v-for="item in tabs"
            :key="item.title"
            class="content__description-body"
            :style="selectedTab.title !== item.title ? 'display: none;' : null"
          >
            <div
              v-if="item.text"
              class="content__description-text"
              v-html="item.text"
            ></div>

            <div
              v-else-if="item.documents && item.documents.length"
              class="content__description-documents documents"
            >
              <ul class="documents__list">
                <li
                  v-for="item in item.documents"
                  :key="item.id"
                  class="documents__item"
                >
                  <BaseHoverText color="black">
                    <a
                      target="_blank"
                      :href="item.file"
                      class="documents__item-link"
                    >
                      {{ item.fileName }}
                    </a>

                    <template #left-icon>
                      <img
                        class="documents__item-icon"
                        :src="getDocumentIcon(item.documentType)"
                        alt="document icon"
                      />
                    </template>
                  </BaseHoverText>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content__description content__description_mobile">
          <BaseAccordion v-model="selectedTab.id" :tabs="tabs">
            <template #content="{ content }">
              <div
                v-if="content.text"
                class="content__description-text"
                v-html="content.text"
              ></div>

              <div
                v-else-if="content.documents && content.documents.length"
                class="content__description-documents documents"
              >
                <ul class="documents__list">
                  <li
                    v-for="item in content.documents"
                    :key="item.id"
                    class="documents__item"
                  >
                    <BaseHoverText color="black">
                      <a
                        target="_blank"
                        :href="item.file"
                        class="documents__item-link"
                      >
                        {{ item.fileName }}
                      </a>

                      <template #left-icon>
                        <img
                          class="documents__item-icon"
                          :src="getDocumentIcon(item.documentType)"
                          alt="document icon"
                        />
                      </template>
                    </BaseHoverText>
                  </li>
                </ul>
              </div>
            </template>
          </BaseAccordion>
        </div>

        <div class="content__transaction">
          <!-- {{ project.status }} -->
          <ProjectVoting
            v-if="project.status == 'reservation' || project.status == 'voting'"
            :status="status"
            :status-text="statusText"
            :currencies="currencies"
            :project-data="project"
          />
          <ProjectInvesting
            v-if="project.status == 'financing'"
            :status="status"
            :status-text="statusText"
            :currencies="currencies"
            :project-data="project"
          />
          <div class="link-invest__wrapper">
            <a
              href="https://telegra.ph/Get-Ready-New-Features-and-Guides-Coming-to-Definder-07-03-3"
              class="link-invest"
              >How to invest?</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import BaseTabs from '~/components/base/BaseTabs'
import BaseAccordion from '~/components/base/BaseAccordion'
import ProjectImages from '~/components/pages/projects/project/ProjectImages'
import BaseHoverText from '~/components/base/BaseHoverText'
// import ProjectTransaction from '~/components/pages/projects/project/ProjectTransaction'
import ProjectVoting from '~/components/pages/projects/project/ProjectVoting'
import ProjectInvesting from '~/components/pages/projects/project/ProjectInvesting'

import {
  ProjectDescriptionLanguages,
  ProjectsCategoriesEnum,
  ProjectsStatusesEnum,
} from '~/pkg/configs/projects'

export default {
  name: 'ProjectInfo',

  components: {
    SectionTitle,
    ProjectImages,
    BaseTabs,
    BaseAccordion,
    BaseHoverText,
    ProjectVoting,
    ProjectInvesting,
    // ProjectTransaction,
  },

  props: {
    projectData: {
      type: Object,
      default: () => ({}),
    },

    tabs: {
      type: Array,
      default: () => [],
    },

    currencies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      categories: ProjectsCategoriesEnum,
      statuses: ProjectsStatusesEnum,
      descriptions: '',
      selectedTab: this.tabs[0],
    }
  },

  setup() {
    const descriptions = []
    for (const lang of ProjectDescriptionLanguages) {
      descriptions.push({
        code: lang.code,
        text: lang.text,
        value: '',
      })
    }

    this.descriptions = descriptions
  },

  computed: {
    project() {
      return this.projectData || {}
    },

    status() {
      return this.project.status
    },

    statusText() {
      return this.$t(this.getStatus(this.status).textCode)
    },

    linkToCurrentProject() {
      if (this.$isServer) {
        return ''
      }

      return document.location?.toString()
    },
  },

  mounted() {},

  methods: {
    checkTelegramAvailability(event) {
      if (this.project.canSeeTelegramGroup) {
        return
      }

      this.$modal.open({
        component: 'ConfirmAction',
        options: {
          title: this.$t('PROJECT_INFO.TELEGRAM_MODAL_TITLE'),
          text: this.$t('PROJECT_INFO.TELEGRAM_MODAL_TEXT'),
          confirmText: this.$t('PROJECT_INFO.TELEGRAM_MODAL_CONFIRM'),
          noCancel: true,
        },
      })

      event.stopPropagation()
      event.preventDefault()
    },

    // updateDescription(source, value) {
    //   const findingCallback = (item) => item.code === source.code
    //   const index = this.descriptions.findIndex(findingCallback)
    //   if (index === -1) {
    //     return
    //   }
    //
    //   const updatedLand = { ...source, value }
    //
    //   this.$set(this.descriptions, index, updatedLand)
    // },
    getStatus(code) {
      const status = Object.values(this.statuses).find(
        (item) => item.code === code
      )

      return status || this.statuses.unknown
    },

    getCategory(code) {
      const category = Object.values(this.categories).find(
        (item) => item.code === code
      )

      return category || this.categories.unknown
    },

    getDocumentIcon(ext) {
      if (ext === 'pdf') {
        return '/images/sources/icon-pdf.svg'
      } else if (ext === 'png') {
        return '/images/sources/icon-png.svg'
      } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'image') {
        return '/images/sources/icon-jpg.svg'
      }

      return ''
    },

    formattedUrl(url) {
      if (!url) {
        return ''
      }

      return url.split('/')[2]
    },

    onCopySuccess() {
      this.$toast.success(this.$t('PROJECT_INFO.LINK_COPIED'))
    },

    onCopyError() {
      this.$toast.error(this.$t('TOAST.COPY_ERROR'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-info';

.link-invest {
  text-decoration: underline;
  color: #4646d3;
  &__wrapper {
    position: relative;
    text-align: center;
    padding-top: 14px;
  }
  &:hover {
    text-decoration: none;
    color: blue;
  }
}
</style>
