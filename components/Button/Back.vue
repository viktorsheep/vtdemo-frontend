<script
  lang="ts"
  setup
>
  const router = useRouter()

</script>

<template>
  <n-button
    type="primary"
    secondary
    @click="router.back()"
  >
    Back
  </n-button>
</template>

<style
  lang="scss"
  scoped
></style>
