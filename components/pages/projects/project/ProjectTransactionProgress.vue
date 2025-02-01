<template>
  <div
    class="project-transaction__round-info round-info"
    :class="{
      [`round-info_background-${color}`]: true,
      'round-info_remove-margin': isRemoveMargin,
      'round-info_remove-padding': isRemovePadding,
    }"
  >
    <div v-if="roundName" class="round-info__round-name">
      {{ roundName }}
    </div>

    <div class="round-info__raised">
      <div class="round-info__raised-of">
        {{ $t('PROJECT_INFO.RAISED_OF') }}
        <span
          class="round-info__raised-of_nowrap project-transaction__bold-text"
        >
          {{ formattedNum(goal) }}
        </span>
      </div>
      <div class="round-info__raised-goal">
        {{ formattedNum(roundData.sum) }}
      </div>
    </div>

    <div v-if="!isReservationStatus" class="round-info__funded">
      <div class="round-info__caption">
        {{ $t('PROJECT_INFO.FUNDED') }}
      </div>
      <div class="round-info__caption-data">{{ fundedPercent }}%</div>
    </div>

    <div class="round-info__investors">
      <div class="round-info__caption">
        {{ $t('PROJECT_INFO.INVESTORS') }}
      </div>
      <div class="round-info__caption-data">
        {{ roundData.investorsCount }}
      </div>
    </div>

    <div class="round-info__progress">
      <BaseProgress :value="progress" class="round-info__progress-bar" />
      <div class="round-info__progress-frames">
        <div v-if="!isCompletedStatus" class="round-info__progress-text">
          {{ formattedDateStart }}
        </div>
        <div
          class="round-info__progress-text"
          :class="{ right: isCompletedStatus }"
        >
          {{ formattedDateEnd }}
        </div>
      </div>
    </div>

    <div class="round-info__terms">
      <span class="project-transaction__bold-text">
        {{ $t('PROJECT_INFO.TERMS') }}:
      </span>
      {{ totalDays }}
      {{ $t('PROJECT_INFO.DAY') }}
    </div>

    <div class="round-info__days-to-go">
      {{ daysToGO }}
      {{ $t('PROJECT_INFO.DAYS_TO_GO') }}
    </div>
  </div>
</template>

<script>
import BaseProgress from '~/components/base/BaseProgress'

export default {
  name: 'ProjectTransactionProgress',

  components: {
    BaseProgress,
  },

  props: {
    roundData: {
      type: Object,
      default: () => ({}),
    },

    goal: {
      type: Number,
      default: null,
    },

    roundName: {
      type: String,
      default: null,
    },

    dateStart: {
      type: [String, Date],
      default: null,
    },

    dateEnd: {
      type: [String, Date],
      default: null,
    },

    color: {
      type: String,
      default: null,
    },

    isReservationStatus: {
      type: Boolean,
      default: false,
    },

    isFinancingStatus: {
      type: Boolean,
      default: false,
    },

    isCompletedStatus: {
      type: Boolean,
      default: false,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      //
    }
  },

  computed: {
    isRemovePadding() {
      return (
        (this.isReservationStatus && !this.$auth.loggedIn) ||
        this.isCompletedStatus
      )
    },
    isRemoveMargin() {
      return (
        (this.isFinancingStatus && !this.$auth.loggedIn) || !this.isConfirmed
      )
    },

    fundedPercent() {
      return Math.ceil((this.roundData.sum * 100) / this.goal)
    },

    totalDays() {
      const total = this.calcDaysDiff(this.dateStart, this.dateEnd)
      return total
    },

    daysGone() {
      const checkedDate =
        new Date(this.dateEnd).getTime() - new Date().getTime() > 0

      const currentDay = checkedDate ? new Date() : this.dateEnd
      const daysGone = this.calcDaysDiff(this.dateStart, currentDay)
      return daysGone
    },

    daysToGO() {
      return this.totalDays - this.daysGone > 0
        ? this.totalDays - this.daysGone
        : 0
    },

    progress() {
      // if (new Date(this.dateStart).getDate() - new Date().getDate() === 0) {
      //   return 0
      // }

      return this.totalDays - this.daysGone > 0
        ? (this.daysGone * 100) / this.totalDays
        : 100
    },

    formattedDateStart() {
      return this.$date.formatToShort(this.dateStart)
    },

    formattedDateEnd() {
      return this.$date.formatToShort(this.dateEnd)
    },
  },

  methods: {
    calcDaysDiff(start, end) {
      const dateStart = new Date(start)
      const dateEnd = new Date(end)
      const timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime())
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return diffDays
    },

    formattedNum(num) {
      return this.$numFormatter.formatToThousand(num) || 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-transaction';
</style>
