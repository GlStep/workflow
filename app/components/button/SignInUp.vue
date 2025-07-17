<script lang="ts" setup>
const props = defineProps<{
  attribute: {
    text: string
    link?: string
  }
  variant: 'default' | 'secondary'
}>()
</script>

<template>
  <div>
    <NuxtLink :to="props.attribute.link" prefetch-on="interaction">
      <Button class="font-roboto hover:cursor-pointer" :variant="props.variant" size="lg">
        {{ props.attribute.text }}
      </Button>
    </NuxtLink>
  </div>
</template>

<style>

</style>
