<template>
  <div :class="{ pagination_hidden: !isLoaded }" class="pagination">
    <div class="pagination__container">
      <BaseButton
        v-if="canDisplayLeftArrow"
        class="pagination__item pagination__item-arrow"
        color="white"
        type="no-border"
        @click="prevPage"
      >
        <div class="pagination__item-content">
          <svg><use href="#icon-arrow-left" /></svg>
        </div>
      </BaseButton>

      <BaseButton
        v-if="canDisplayFirstPage"
        class="pagination__item"
        color="white"
        @click="setPage(firstPage)"
      >
        <div class="pagination__item-content">{{ firstPage }}</div>
      </BaseButton>

      <div
        v-if="canDisplayLeftDots"
        class="pagination__item pagination__item-dots"
      >
        ...
      </div>

      <BaseButton
        v-for="(item, index) in visiblePages"
        :key="index"
        :color="item === currentPage ? 'blue' : 'white'"
        :active="item === currentPage"
        class="pagination__item"
        @click="setPage(item)"
      >
        <div class="pagination__item-content">{{ item }}</div>
      </BaseButton>

      <div
        v-if="canDisplayRightDots"
        class="pagination__item pagination__item-dots"
      >
        ...
      </div>

      <BaseButton
        v-if="canDisplayLastPage"
        class="pagination__item"
        color="white"
        @click="setPage(totalPages)"
      >
        <div class="pagination__item-content">{{ totalPages }}</div>
      </BaseButton>

      <BaseButton
        v-if="canDisplayRightArrow"
        class="pagination__item pagination__item-arrow"
        color="white"
        type="no-border"
        @click="nextPage"
      >
        <div class="pagination__item-content">
          <svg><use href="#icon-arrow-right" /></svg>
        </div>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'BasePagination',

  components: {
    BaseButton,
  },

  props: {
    value: {
      type: [Number, String],
      default: 0,
    },

    total: {
      type: [Number, String],
      default: 0,
    },
  },

  data() {
    return {
      initialPagesPerView: 7,
      pagesPerView: 0,
      firstPage: 1,

      isLoaded: false,
      resizeCallback: null,
    }
  },

  computed: {
    currentPage: {
      get() {
        return Number(this.value)
      },
      set(value) {
        this.$emit('input', value)
      },
    },

    visiblePages() {
      return this.getVisiblePages()
    },

    pagesShift() {
      return this.getPagesShift()
    },

    totalPages() {
      return Number(this.total)
    },

    canDisplayLeftArrow() {
      return this.currentPage > this.firstPage
    },

    canDisplayFirstPage() {
      return (
        this.totalPages > this.pagesPerView &&
        this.pagesShift.start > this.firstPage
      )
    },

    canDisplayLeftDots() {
      return (
        this.totalPages > this.pagesPerView &&
        this.pagesShift.start > this.firstPage
      )
    },

    canDisplayRightDots() {
      return (
        this.totalPages > this.pagesPerView &&
        this.pagesShift.end < this.totalPages
      )
    },

    canDisplayLastPage() {
      return (
        this.totalPages > this.pagesPerView &&
        this.pagesShift.end < this.totalPages
      )
    },

    canDisplayRightArrow() {
      return this.currentPage < this.totalPages
    },
  },

  mounted() {
    this.initPages()
  },

  beforeDestroy() {
    this.destroyPages()
  },

  methods: {
    initPages() {
      this.$nextTick(() => {
        this.isLoaded = true
        this.calcPagesPerView()

        this.resizeCallback = () => this.calcPagesPerView()
        window.addEventListener('resize', this.resizeCallback)
      })
    },

    destroyPages() {
      const callback = this.resizeCallback
      this.$nextTick(() => {
        window.removeEventListener('resize', callback)
      })
    },

    calcPagesPerView() {
      const width = window.innerWidth
      if (width > 1499) {
        this.pagesPerView = this.initialPagesPerView
      } else if (width > 575) {
        this.pagesPerView =
          this.initialPagesPerView < 5 ? this.initialPagesPerView : 5
      } else {
        this.pagesPerView =
          this.initialPagesPerView < 3 ? this.initialPagesPerView : 3
      }
    },

    prevPage() {
      this.currentPage -= 1
    },

    setPage(page) {
      this.currentPage = page
    },

    nextPage() {
      this.currentPage += 1
    },

    getVisiblePages() {
      const output = []
      for (let i = this.pagesShift.start; i <= this.pagesShift.end; i++) {
        output.push(i)
      }

      return output
    },

    getPagesShift() {
      const shift = Math.floor(this.pagesPerView / 2)
      let start
      let end

      if (this.totalPages <= this.pagesPerView + 4) {
        start = 1
        end = this.totalPages
      } else if (this.currentPage <= this.totalPages - this.currentPage) {
        let additionalShift = -1
        if (this.currentPage - this.pagesPerView <= 1) {
          start = 1
          additionalShift = 1
        } else {
          start = this.currentPage - shift >= 1 ? this.currentPage - shift : 1
        }

        const startWithShift = start + this.pagesPerView + additionalShift
        const isStartWithShiftValid = startWithShift <= this.totalPages
        end = isStartWithShiftValid ? startWithShift : this.totalPages
      } else {
        let additionalShift = 1
        if (this.currentPage + this.pagesPerView >= this.totalPages) {
          end = this.totalPages
          additionalShift = -1
        } else {
          end =
            this.currentPage + shift <= this.totalPages
              ? this.currentPage + shift
              : this.totalPages
        }

        const endWithShift = end - this.pagesPerView + additionalShift
        const isEndWithShiftValid = endWithShift >= 1
        start = isEndWithShiftValid ? endWithShift : 1
      }

      return { start, end }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-pagination';
</style>
