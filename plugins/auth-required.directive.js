import Vue from 'vue'

function handleClick(event, { i18n, $auth, $toast }) {
  if ($auth.loggedIn) {
    return
  }

  const message = 'AUTH.AUTHORIZATION_REQUIRED'
  $toast.error(i18n.t(message))

  event.stopImmediatePropagation()
  event.preventDefault()
}

export default defineNuxtMiddleware((context) => {
  Vue.directive('auth-required', {
    inserted(el) {
      const handler = (event) => handleClick(event, context)
      el.addEventListener('click', handler, true)
    },
  })
}
