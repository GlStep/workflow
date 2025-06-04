<script setup lang="ts">
import { Home, Settings } from 'lucide-vue-next'

const items = [{
  title: 'Home',
  url: '#',
  icon: Home,
}, {
  title: 'Settings',
  url: '#',
  icon: Settings,
}]

const data = {
  user: {
    name: 'John Doe',
    email: 'test@test.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
}
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
