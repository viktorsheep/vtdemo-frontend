<script
  lang="ts"
  setup
>

  const u = {
    dict: useDict()
  }

  const s = {
    lang: useLanguagesStore()
  }
</script>

<template>
  <n-alert
    :title="u.dict.translate('danger_zone', 'name', s.lang.currentLang)"
    type="error"
  >
    {{ u.dict.translate('please_be_cautious_the_system_might_break_according_to_your_changes', 'name',
      s.lang.currentLang) }}
  </n-alert>
</template>
