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

const { handleSubmit } = useForm({
  validationSchema: signinFormSchema,
})

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
    <CardHeader>
      <CardTitle class="font-poppins">
        Sign In
      </CardTitle>
      <CardDescription>Sign in using your E-Mail and password</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>E-Mail</FormLabel>
            <FormControl>
              <Input type="email" placeholder="example@example.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <Button type="submit" class="hover:cursor-pointer">
          Sign In
        </Button>
      </form>
      <Button class="hover:cursor-pointer" @click="signIn">
        Use GitHub
      </Button>
    </Cardcontent>
  </div>
</template>

<style>

</style>
