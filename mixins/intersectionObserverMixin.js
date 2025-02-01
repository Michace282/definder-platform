export default {
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    addIntersectionObserver(refName) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible = true
              observer.unobserve(entry.target)
            }
          })
        },
        { root: null, threshold: 0.1 }
      )
      observer.observe(this.$refs[refName])
    },
  },
  mounted() {
    this.addIntersectionObserver('container')
  },
}
