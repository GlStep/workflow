<script lang="ts" setup>
import { authClient } from '#imports'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '~/components/ui/breadcrumb'

definePageMeta({
  middleware: ['auth'],
})

const user = useUserStore()
await callOnce(user.fetch)

async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo('/auth/sign-in')
      },
    },
  })
}

const { data: session } = await authClient.getSession()
</script>

<!-- List of stuff, which needs to be done for the application -->
<!-- TODO: create a sidebar, just a first and simple version (will be more complex later) -->
<!-- TODO: create schema, which fits has user information, such as workspaces,groups, etc. -->
<!-- TODO: extend the sidebar with the added information -->

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
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
        </header>
        <ClientOnly>
          <button v-if="session" @click="signOut">
            Sign Out
          </button>
          <div>
            <pre>
              {{ session?.user }}
            </pre>
            <pre>
              {{ useWorkspaceStore().workspaces }}
            </pre>
          </div>
        </ClientOnly>
        <pre>
          {{ useWorkspaceStore().workspaces }}
        </pre>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style>

</style>
