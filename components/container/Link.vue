<script lang="ts" setup>
interface Links {
  name: string
  path: string
}

const props = defineProps<{
  links: Links[]
}>()
</script>

<template>
  <div class="inline-flex items-center justify-center gap-7 py-2">
    <div v-for="(link, index) in props.links" :key="index">
      <LinkBase :path="link.path">
        {{ link.name }}
      </LinkBase>
    </div>
  </div>
</template>

<style>

</style>
