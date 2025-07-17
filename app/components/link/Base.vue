<script lang="ts" setup>
const props = defineProps(['path'])
</script>

<template>
  <div class="font-roboto relative justify-center items-center text-center text-xs font-normal hover:text-gray-700">
    <a :href="props.path">
      <slot />
    </a>
  </div>
</template>

<style>

</style>
