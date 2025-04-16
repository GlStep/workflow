<script lang="ts" setup>
import { authClient } from '#imports'

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo('/auth/sign-in')
      },
    },
  })
}
</script>

<template>
  <div>
    App
    <button @click="signOut">
      Sign Out
    </button>
  </div>
</template>

<style>

</style>
