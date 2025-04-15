<script lang="ts" setup>

</script>

<template>
  <div class="inline-flex items-center justify-center gap-7">
    <ButtonSignInUp
      :attribute="{ text: 'Sign In', link: '/login' }" variant="light"
    />
    <ButtonSignInUp
      :attribute="{ text: 'Sign Up', link: '/login' }" variant="dark"
    />
  </div>
</template>

<style>

</style>
