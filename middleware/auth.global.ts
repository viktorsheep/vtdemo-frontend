export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (!auth.isLoggedIn && to.path !== '/') { return navigateTo('/', { replace: true }) }
})
