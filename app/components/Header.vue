<script lang="ts" setup>
const headerLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]
</script>

<template>
  <div class="relative inline-flex h-30 w-full items-center justify-between self-stretch rounded-2xl px-20 py-2">
    <div class="inline-flex h-full w-full max-w-6xl items-center justify-between rounded-2xl bg-zinc-200 px-24">
      <div class="inline-flex items-center justify-center gap-20">
        <LogoBase />
        <ContainerLink :links="headerLinks" />
      </div>
      <ContainerSignInUp />
    </div>
  </div>
</template>

<style>

</style>
