<script lang="ts" setup>
import { authClient, useForm } from '#imports'

import { z } from 'zod'

interface Props {
  redirectUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  redirectUrl: '/app',
})

definePageMeta({
  layout: 'auth-default',
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
    <form @submit="onSubmit">
      <Input v-model="email" type="email" v-bind="emailAttrs" class="outline" />
      <div>{{ errors.email }}</div>

      <Input v-model="password" type="password" v-bind="passwordAttrs" class="outline" />
      <div>{{ errors.password }}</div>

      <Button type="submit" class="hover:cursor-pointer">
        Submit
      </Button>
    </form>
    <Button class="hover:cursor-pointer" @click="signIn">
      Use GitHub
    </Button>
  </div>
</template>

<style>

</style>
