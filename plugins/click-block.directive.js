import Vue from 'vue'

export default function (context) {
  Vue.directive('click-block', {
    inserted(el, binding) {
      el.addEventListener('click', binding.value, true)
    },
  })
}
