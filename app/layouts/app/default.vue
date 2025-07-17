<script lang="ts" setup>
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <AppBreadcrumb />
          </div>
        </header>
        <slot />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style>

</style>
