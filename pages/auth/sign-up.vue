<script lang="ts" setup>
import { authClient, useForm } from '#imports'
import { z } from 'zod'

interface Props {
  redirectUrl?: string
}
const props = withDefaults(defineProps<Props>(), {
  redirectUrl: '/app',
})

const userInformation = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const signinFormSchema = toTypedSchema(z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
}))

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: signinFormSchema,
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

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
    <p>Sign Up</p>
    <form @submit="onSubmit">
      <input v-model="firstName" type="text" v-bind="firstNameAttrs" class="outline">
      <div>{{ errors.firstName }}</div>

      <input v-model="lastName" type="text" v-bind="lastNameAttrs" class="outline">
      <div>{{ errors.lastName }}</div>

      <input v-model="email" type="email" v-bind="emailAttrs" class="outline">
      <div>{{ errors.email }}</div>

      <input v-model="password" type="password" v-bind="passwordAttrs" class="outline">
      <div>{{ errors.password }}</div>

      <input v-model="passwordConfirm" type="password" v-bind="passwordConfirmAttrs" class="outline">
      <div>{{ errors.passwordConfirm }}</div>

      <button type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<style>

</style>
