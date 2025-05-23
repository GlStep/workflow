export default defineNuxtRouteMiddleware(async () => {
  const session = await authClient.useSession()

  if (!session) {
    return navigateTo('/auth/sign-in')
  }
})
