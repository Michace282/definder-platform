<template>
  <div class="progress">
    <div class="progress__container" :style="{ height: height || '5px' }">
      <div class="progress__line_gray"></div>
      <div
        :style="`width: ${currentProgress}%;`"
        :class="color ? 'progress__line_' + color : 'progress__line_colored'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseProgress',

  props: {
    color: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      currentProgress: 0,
      intervalId: null,
    }
  },

  mounted() {
    this.startProgress()
  },

  beforeDestroy() {
    clearInterval(this.intervalId)
  },

  methods: {
    startProgress() {
      const delayInMilliseconds = this.delay * 1000 + 500
      setTimeout(() => {
        this.animateProgress(this.value)
      }, delayInMilliseconds)
    },

    animateProgress(targetValue) {
      const intervalDuration = 100

      clearInterval(this.intervalId)
      this.intervalId = setInterval(() => {
        if (this.currentProgress < targetValue) {
          this.currentProgress += targetValue / 20
        } else {
          clearInterval(this.intervalId)
          this.currentProgress = targetValue
        }
      }, intervalDuration)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-progress';
</style>
