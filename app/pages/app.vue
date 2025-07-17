<script lang="ts" setup>
import { authClient } from '#imports'

definePageMeta({
  middleware: ['auth'],
  layout: 'app-default',
})

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo('/auth/sign-in')
      },
    },
  })
}

const { data: session } = await authClient.getSession()
</script>

<!-- List of stuff, which needs to be done for the application -->
<!-- TODO: create a sidebar, just a first and simple version (will be more complex later) -->
<!-- TODO: create schema, which fits has user information, such as workspaces,groups, etc. -->
<!-- TODO: extend the sidebar with the added information -->

<template>
  <div>
    <button v-if="session" @click="signOut">
      Sign Out
    </button>
  </div>
</template>

<style>

</style>
