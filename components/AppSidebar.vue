<script setup lang="ts">
import type { SidebarProps } from '~/components/ui/sidebar'
import { BookOpen, Bot, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal } from 'lucide-vue-next'
import { useProjectStore } from '~/stores/project'
import { useUserStore } from '~/stores/user'
import { useWorkspaceStore } from '~/stores/workspace'

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
console.log(isAuthenticated)

// Transform workspaces into a format expected by NavTeam
const teams = computed(() => {
  return workspaceStore.workspaces.map(workspace => ({
    name: workspace.name,
    logo: Frame, // TODO: Create ability to upload custom logos, or choose from a set of icons
    plan: 'Free', // TODO: Handle plans properly in the workspacesand in the database
  }))
})

const data = {
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  teams: [
    {
      name: 'Design Engineering',
      logo: Frame,
      plan: 'Pro',
    },
    {
      name: 'Sales & Marketing',
      logo: PieChart,
      plan: 'Enterprise',
    },
  ],
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
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <ClientOnly>
        <NavTeam :teams="isAuthenticated ? teams : []" />
      </ClientOnly>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
