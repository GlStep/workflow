<script lang="ts" setup>
import { authClient } from '#imports'

const userInformation = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const registerForm = computed(() => [
  { $cmp: 'FormKit', props: {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    validation: 'required',
  } },
  {
    $formkit: 'text',
    name: 'lastName',
    label: 'Last Name',
    validation: 'required|length:2,30',
  },
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
  {
    $formkit: 'password',
    name: 'passwordConfirm',
    label: 'Confirm Password',
    validation: 'required|same:password',
  },
])

async function HandleRegisterUser() {
  await authClient.signUp.email({
    email: userInformation.value.email,
    password: userInformation.value.password,
    name: `${userInformation.value.firstName} ${userInformation.value.lastName}`.toUpperCase().replaceAll(' ', '-'),
    callbackURL: '/app',
  })
}
</script>

<template>
  <div>
    <p>Sign Up</p>
    <FormKit id="register-form" v-model="userInformation" type="form" @submit="HandleRegisterUser">
      <FormKitSchema :schema="registerForm" />
      <button type="submit">
        Submit
      </button>
      Back to registration options
    </FormKit>
  </div>
</template>

<style>

</style>
