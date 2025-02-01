import Vue from 'vue'

export default defineNuxtMiddleware((context) => {
  Vue.directive('click-block', {
    inserted(el, binding) {
      el.addEventListener('click', binding.value, true)
    },
  })
}
