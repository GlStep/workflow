<script lang="ts" setup>

</script>

<template>
  <div class="inline-flex items-center justify-center gap-7">
    <ButtonSignInUp
      :attribute="{ text: 'Sign In', link: '/auth/sign-in' }" variant="light"
    />
    <ButtonSignInUp
      :attribute="{ text: 'Sign Up', link: '/auth/sign-up' }" variant="dark"
    />
  </div>
</template>

<style>

</style>
