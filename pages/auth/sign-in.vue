<script lang="ts" setup>
import { authClient } from '#imports'

interface Props {
  redirectUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  redirectUrl: '/app',
})

const loginForm = ref({
  email: '',
  password: '',
})

const loginFormSchema = computed(() => [
  {
    $formkit: 'text',
    name: 'email',
    label: 'Email',
    validation: 'required|email',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    validation: 'required|length:5,16',
  },
])

async function handleUserLogin() {
  await authClient.signIn.email({
    email: loginForm.value.email,
    password: loginForm.value.password,
    callbackURL: props.redirectUrl,
    fetchOptions: {
      onError(context) {
        console.error('Error during login:', context.error)
      },
    },
  })
}
</script>

<template>
  <div>
    Login
    <FormKit
      id="login-form" v-slot="{ state: { valid } }"
      v-model="loginForm" type="form" :actions="false" @submit="handleUserLogin"
    >
      <FormKitSchema :schema="loginFormSchema" />
      <button class="w-full" type="submit" :disabled="!valid">
        Sign in
      </button>
    </FormKit>
  </div>
</template>

<style>

</style>
