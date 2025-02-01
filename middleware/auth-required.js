export default defineNuxtMiddleware((context) => {
  const { store, route, localePath, redirect, $auth } = context
  // If the user is not authenticated
  if (!$auth.loggedIn) {
    return redirect(
      localePath({
        name: 'auth-login',
        query: { redirect: encodeURI(route.fullPath) },
      })
    )
  }

  store.commit('auth/TOGGLE_PAGE_PUBLICITY', false)
}
