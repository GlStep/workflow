<script lang="ts" setup>
const props = defineProps<{
  attribute: {
    text: string
    link?: string
  }
  variant: 'dark' | 'light'
}>()
</script>

<template>
  <div v-if="props.variant === 'dark'">
    <a :href="props.attribute.link">
      <button
        class="bg-black inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-2 outline-1 outline-black hover:cursor-pointer"
      >
        <div class="text-white font-roboto text-center">{{ props.attribute.text }}</div>
      </button>
    </a>
  </div>
  <div v-else-if="props.variant === 'light'">
    <a :href="props.attribute.link">
      <button
        class="bg-white inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-2 outline-1 outline-black hover:cursor-pointer"
      >
        <div class="text-black font-roboto text-center">{{ props.attribute.text }}</div>
      </button>
    </a>
  </div>
</template>

<style>

</style>
