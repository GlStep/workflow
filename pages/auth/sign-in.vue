<script lang="ts" setup>
import { authClient, useForm } from '#imports'

import { z } from 'zod'

interface Props {
  redirectUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  redirectUrl: '/app',
})

const signinForm = ref({
  email: '',
  password: '',
})

const signinFormSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8),
}))

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: signinFormSchema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  signinForm.value = values

  // TODO: Handle the case when user is logged in and when there is an error in login
  try {
    await handleUserSignin()
  }
  catch (error) {
    console.error('Signin failed:', error)
  }
})

async function handleUserSignin() {
  await authClient.signIn.email({
    email: signinForm.value.email,
    password: signinForm.value.password,
    callbackURL: props.redirectUrl,
    fetchOptions: {
      onError(context) {
        console.error('Error during login:', context.error)
      },
    },
  })
}

async function signIn() {
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: props.redirectUrl,
    fetchOptions: {
      onError(context) {
        console.error('Error during GitHub login:', context.error)
      },
    },
  })
}
</script>

<template>
  <div>
    Login
    <form @submit="onSubmit">
      <input v-model="email" type="email" v-bind="emailAttrs" class="outline">
      <div>{{ errors.email }}</div>

      <input v-model="password" type="password" v-bind="passwordAttrs" class="outline">
      <div>{{ errors.password }}</div>

      <button type="submit">
        Submit
      </button>
    </form>
    <button @click="signIn">
      Use GitHub
    </button>
  </div>
</template>

<style>

</style>
