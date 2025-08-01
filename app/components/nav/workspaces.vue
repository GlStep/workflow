<script lang="ts" setup>
import type { Component } from 'vue'
import { Building, ChevronsUpDown, Frame, Plus, User } from 'lucide-vue-next'
import { useSidebar } from '@/components/ui/sidebar'

const props = defineProps<{
  workspaces: {
    name: string
    logo?: Component
    plan: string
  }[]
}>()

const defaultTeam = {
  name: 'No Workspace',
  logo: Frame,
  plan: 'Free',
}

// Handle team logos and cases, where no such logo is provided
function getLogo(workspace: { logo?: Component, name: string }): Component {
  if (workspace.logo) {
    return workspace.logo
  }

  if (workspace.name.toLowerCase().includes('personal')) {
    return User
  }

  return Building
}

const isMobile = useSidebar()
const activeWorkspace = ref(props.workspaces.length > 0 ? props.workspaces[0] : defaultTeam)
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <component :is="getLogo(activeWorkspace!)" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ activeWorkspace!.name }}
              </span>
              <span class="truncate text-xs">{{ activeWorkspace!.plan }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Teams
          </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="(workspace, index) in workspaces"
            :key="workspace.name"
            class="gap-2 p-2"
            @click="activeWorkspace = workspace"
          >
            <div class="flex size-6 items-center justify-center rounded-sm border">
              <component :is="getLogo(activeWorkspace!)" class="size-4 shrink-0" />
            </div>
            {{ workspace.name }}
            <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">
              Add workspace
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style>

</style>
