<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { BookOpen, Bot, Frame, LifeBuoy, PieChart, Send, Settings2, SquareTerminal } from 'lucide-vue-next'
import { useProjectStore } from '~~/stores/project'
import { useUserStore } from '~~/stores/user'
import { useWorkspaceStore } from '~~/stores/workspace'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
})

const userStore = useUserStore()
const projectStore = useProjectStore()
const workspaceStore = useWorkspaceStore()

// Fetch user data and workspaces on mount
onMounted(async () => {
  await userStore.fetch()

  if (userStore.name) {
    await workspaceStore.fetchWorkspaces()
  }

  if (workspaceStore.currentWorkspace) {
    await projectStore.fetchProjectsByWorkspace(workspaceStore.currentWorkspace.id)
  }
  else {
    if (workspaceStore.workspaces[0]) {
      await projectStore.fetchProjectsByWorkspace(workspaceStore.workspaces[0].id)
    }
  }
})

// Reactive user data, which will be updated, when the store changes
const user = computed(() => {
  return {
    name: userStore.name || 'Guest',
    email: userStore.email,
    image: userStore.image,
  }
})

// Reactive auth state
const isAuthenticated = computed(() => !!userStore.name)

// Transform workspaces into a format expected by NavTeam
const workspaces = computed(() => {
  return workspaceStore.workspaces.map(workspace => ({
    name: workspace.name,
    logo: Frame, // TODO: Create ability to upload custom logos, or choose from a set of icons
    plan: 'Free', // TODO: Handle plans properly in the workspacesand in the database
  }))
})

const projects = computed(() => {
  return projectStore.projects.map(project => ({
    name: project.name,
    url: '#', // TODO: Set proper URL for the project (in the schema) and handle links
    icon: PieChart, // TODO: Set custom icon
  }))
})

const data = {
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
}
</script>

<!-- TODO: Get every piece of props to properly use the properties defined in the database schema -->
<!-- TODO: Use a unified layout for all the processes inside the app -->
<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <NavWorkspaces :workspaces="isAuthenticated ? workspaces : []" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="projects" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
  </Sidebar>
</template>
