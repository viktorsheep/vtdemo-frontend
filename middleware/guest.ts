export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (auth.isLoggedIn && to.path !== 'splash') {
    return navigateTo('/splash', { replace: true })
  }
})