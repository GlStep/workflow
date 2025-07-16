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

  if (pathSegments[1] === 'workspaces' && pathSegments[2]) {
    const workspaceId = pathSegments[2]
    const workspace = workspaceStore.getWorkspaceById(workspaceId)

    if (workspace) {
      items.push({
        label: workspace.name,
        to: `/app/workspaces/${workspaceId}`,
      })
    }
  }
  else if (pathSegments[1] === 'projects' && pathSegments[2]) {
    const projectId = pathSegments[2]
    const project = projectStore.getProjectById(projectId)

    if (project) {
      items.push({
        label: project.name,
        to: `/app/projects/${projectId}`,
      })
    }
  }

  return items
})
</script>

<template>
  <div>
    <Breadcrumb>
      <BreadcrumbList>
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink v-if="index < breadcrumbs.length - 1" :href="crumb.to">
              {{ crumb.label }}
            </BreadcrumbLink>
            <BreadcrumbPage v-else>
              {{ crumb.label }}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" class="hidden md:block" />
        </template>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>

<style>

</style>
