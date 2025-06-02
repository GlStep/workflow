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
</script>

<template>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup />
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <NuxtLink class="hover:cursor-pointer">
            <SidebarMenuButton as-child>
              {{ item.title }}
            </SidebarMenuButton>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarGroupContent>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>
