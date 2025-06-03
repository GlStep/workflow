<script setup lang="ts">
import { DropdownMenu, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { useSidebar } from '~/components/ui/sidebar'

const props = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SidebarMenuButton>
            <Avatar>
              <AvatarImage :src="user.avatar" :alt="user.name">
                <AvatarFallback>IM</AvatarFallback>
              </AvatarImage>
            </Avatar>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style scoped>

</style>
