<template>
  <div class="project-card">
    <div class="project-card__border2" />

    <NuxtLink :to="linkToProject" class="project-card__container2">
      <div class="project-card__title">{{ title }}</div>
      <div v-if="$auth.loggedIn" class="project-card__address">
        <div class="project-card__address-icon">
          <svg><use href="#icon-address-main" /></svg>
        </div>

        <div class="project-card__address-name">{{ address }}</div>
      </div>
      <div
        v-if="status == 'financing'"
        class="amount"
        :style="{ color: '#5A5A5A' || 'auto' }"
      >
        {{ showAmount(project.contractRaised) }}
      </div>
      <BaseProgress
        v-if="status == 'financing'"
        :value="progress"
        :height="'9px'"
        style="margin-bottom: 14px"
        class="round-info__progress-bar"
      />

      <table
        v-if="status == 'reservation'"
        style="font-size: 12px; margin-bottom: 20px"
      >
        <tr>
          <td style="width: 55px" valign="middle">In favor</td>
          <td valign="middle">
            <BaseProgress
              v-if="status == 'reservation'"
              :value="progressVoteUp"
              :height="'9px'"
              style="margin-bottom: 4px; margin-top: 4px"
              class="round-info__progress-bar"
            />
          </td>
        </tr>
        <tr>
          <td valign="middle">Against</td>
          <td>
            <BaseProgress
              v-if="status == 'reservation'"
              :value="progressVoteDown"
              :height="'9px'"
              :color="'red'"
              style="margin-bottom: 4px; margin-top: 4px"
              class="round-info__progress-bar"
            />
          </td>
        </tr>
      </table>

      <div class="project-image">
        <div class="project-image__container">
          <BaseImage class="project-image__image" :src="image" />
        </div>

        <div
          v-if="status"
          :class="{ [`project-image__status_${status}`]: true }"
          class="project-image__status"
        >
          {{ statusText }}
        </div>
      </div>

      <div class="project-info">
        <div class="project-info__item">
          <div class="project-info__title">Total Raise</div>
          <div class="project-info__value">
            {{ showAmount(project.contractAmountMinTarget) }}
          </div>
        </div>
        <div class="project-info__decimetre" />

        <div class="project-info__item">
          <div class="project-info__title">Period</div>
          <div class="project-info__value">
            {{ projectPeriod[0] }}
            <span>{{ projectPeriod[1] }}</span>
          </div>
        </div>

        <div class="project-info__decimetre" />

        <div v-if="roi !== null" class="project-info__item">
          <div class="project-info__title">ROI</div>
          <div class="project-info__value">{{ roi }} %</div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import BaseImage from '~/components/base/BaseImage'
import { ProjectsStatusesEnum } from '~/pkg/configs/projects'
import BaseProgress from '~/components/base/BaseProgress'

export default {
  name: 'ProjectCard2',

  components: {
    BaseProgress,
    BaseImage,
  },

  props: {
    project: {
      type: Object,
      default: null,
    },
    projectId: {
      type: [Number, String],
      default: null,
    },

    title: {
      required: true,
      type: String,
    },

    address: {
      required: true,
      type: String,
    },

    image: {
      required: true,
      type: String,
    },

    status: {
      type: String,
      default: null,
    },

    equityRaise: {
      required: true,
      type: [Number, String],
    },

    roi: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      statuses: ProjectsStatusesEnum,
    }
  },

  computed: {
    projectPeriod() {
      return [this.project.contractReturnTermDays / 30, 'Months']
    },
    progressVoteUp() {
      return (this.project.countPointsUp * 100) / this.project.countPoints
    },
    progressVoteDown() {
      return (this.project.countPointsDown * 100) / this.project.countPoints
    },
    progress() {
      // if (new Date(this.dateStart).getDate() - new Date().getDate() === 0) {
      //   return 0
      // }

      //  return this.totalDays - this.daysGone > 0
      //  ? (this.daysGone * 100) / this.totalDays
      //  : 100
      return (
        (this.project.contractRaised * 100) /
        this.project.contractAmountMinTarget
      )
    },
    statusText() {
      return this.$t(this.getStatus(this.status).textCode)
    },

    formattedEquityRaise() {
      return this.$numFormatter.formatToThousand(this.equityRaise)
    },

    linkToProject() {
      return this.localePath({
        name: 'projects-id',
        params: { id: this.projectId },
      })
    },
  },

  methods: {
    showAmount(value) {
      console.log(value)
      console.log(this.decimals)
      return '$' + new Intl.NumberFormat('ru-RU').format(value).toString()
    },
    getStatus(code) {
      const status = Object.values(this.statuses).find(
        (item) => item.code === code
      )

      return status || this.statuses.unknown
    },
  },
}
</script>

<style lang="scss" scoped>
.amount {
  margin-bottom: 10px;
  font-size: 24px;
  color: #0000ff;
  font-weight: 500;
}

@import '~assets/scss/cards/project-card';
</style>
