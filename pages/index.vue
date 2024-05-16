<script
  lang="ts"
  setup
>
  import { FormRules, useMessage } from 'naive-ui';

  definePageMeta({
    middleware: "guest",
    layout: 'auth-layout',
  })

  type Credentials = {
    username: string,
    password: string,
  }

  const formRef = ref(null);

  // uses
  const u = {
    message: useMessage()
  }

  // stores
  const s = {
    auth: useAuthStore()
  }

  // data
  const d = reactive({
    model: {
      username: '',
      password: ''
    } as Credentials,

    rules: {
      username: [
        {
          required: true,
          message: 'Please input your username.',
          trigger: ['input', 'blur']
        }
      ],

      password: [
        {
          required: true,
          message: 'Please input your password.',
          trigger: ['input', 'blur']
        }
      ]
    } as FormRules
  })

  // methods
  const m = {
    handle: {
      submit: async (e: any) => {
        if (s.auth.isLoggedIn) {
          return navigateTo("/splash", { replace: true });
        }
        e.preventDefault();
        formRef.value?.validate(async (errors: any) => {
          if (!errors) {
            const { error } = await s.auth.login(d.model);
            if (!error.value) {
              return navigateTo("/contacts", { replace: true });
            }
          } else {
            u.message.error("Please input your credentials.");
          }
        });
      }
    }
  }
</script>

<template>

  <h2 style="text-align: center;">VENTURE</h2>

  <n-card size="medium">
    <n-space :size="10">
      <n-form
        ref="formRef"
        :model="d.model"
        :rules="d.rules"
        :show-label="false"
      >
        <n-form-item path="username">
          <n-input
            v-model:value="d.model.username"
            @keydown.enter.prevent
            placeholder="Username"
          />
        </n-form-item>

        <n-form-item path="password">
          <n-input
            v-model:value="d.model.password"
            @keydown.enter.prevent
            type="password"
            show-password-on="mousedown"
            placeholder="Password"
          />
        </n-form-item>

        <div style="text-align: center;">
          <n-button
            type="primary"
            @click="m.handle.submit"
          >
            Login
          </n-button>
        </div>
      </n-form>
    </n-space>
  </n-card>
</template>

<style
  lang="scss"
  scoped
></style>
