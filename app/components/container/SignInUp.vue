<script lang="ts" setup>

</script>

<template>
  <div class="inline-flex items-center justify-center gap-7">
    <ButtonSignInUp
      :attribute="{ text: 'Sign In', link: '/auth/sign-in' }" variant="secondary"
    />
    <ButtonSignInUp
      :attribute="{ text: 'Get started', link: '/auth/sign-up' }" variant="default"
    />
  </div>
</template>

<style>

</style>
