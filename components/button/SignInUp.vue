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
    <a :href="props.attribute.link">
      <Button class="font-roboto hover:cursor-pointer" :variant="props.variant" size="lg">{{ props.attribute.text }}</Button>
    </a>
  </div>
</template>

<style>

</style>
