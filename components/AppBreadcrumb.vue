<script lang="ts" setup>
const route = useRoute()
const workspaceStore = useWorkspaceStore()
const projectStore = useProjectStore()

const breadcrumbs = computed(() => {
  const items = []

  items.push({
    label: 'Dashboard',
    to: '/app',
  })

  const pathSegments = route.path.split('/').filter(Boolean)

  // if (pathSegments[1] === 'workspaces')
})
</script>

<template>
  <div>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink href="#">
            Testing
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Testing 2</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>

<style>

</style>
