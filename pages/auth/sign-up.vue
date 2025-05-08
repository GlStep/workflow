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

const userInformation = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

// TODO: Better zod schema, e.g. password confirmation, etc. with zod.refine()
const signinFormSchema = toTypedSchema(z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
}))

const { handleSubmit } = useForm({
  validationSchema: signinFormSchema,
})

const onSubmit = handleSubmit(async (values) => {
  userInformation.value = values

  await HandleRegisterUser()
})

async function HandleRegisterUser() {
  await authClient.signUp.email({
    email: userInformation.value.email,
    password: userInformation.value.password,
    name: `${userInformation.value.firstName} ${userInformation.value.lastName}`.toUpperCase().replaceAll(' ', '-'),
    callbackURL: props.redirectUrl,
    fetchOptions: {
      onError(context) {
        console.error('Error during registration:', context.error)
      },
      onSuccess: () => { navigateTo('/app') },
    },
  })
}
</script>

<template>
  <div>
    <CardHeader>
      <CardTitle>
        Sign Up
      </CardTitle>
      <CardDescription>
        Sign up using your E-Mail and a password
      </CardDescription>
    </CardHeader>
    <!--    TODO: More consistent card layout, same as sign-in.vue -->
    <!--    TODO: Create better form error messages -->
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="First Name" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Last Name" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>E-Mail</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your-email@example.com" v-bind="componentField" />
            </FormControl>
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
        <FormField v-slot="{ componentField }" name="passwordConfirm">
          <FormItem>
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="repeat your password" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </CardContent>
  </div>
</template>

<style>

</style>
