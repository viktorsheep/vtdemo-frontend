<script
  lang="ts"
  setup
>
  import { ArrowDropDownRound, ArrowDropUpRound } from '@vicons/material';

  const u = {
    dict: useDict()
  }

  const s = {
    auth: useAuthStore(),
    lang: useLanguagesStore()
  }


  const d = reactive({
    visibility: {
      submitterInfo: true
    }
  })
</script>

<template>
  <n-card>
    <n-space
      vertical
      :size="10"
    >
      <n-flex justify="space-between">
        <span><strong>{{ u.dict.translate('submitter_information', 'name', s.lang.currentLang) }}</strong></span>

        <n-button
          quaternary
          circle
          size="small"
          @click="d.visibility.submitterInfo = !d.visibility.submitterInfo"
        >
          <n-icon
            :component="d.visibility.submitterInfo ? ArrowDropUpRound : ArrowDropDownRound"
            :size="24"
          />
        </n-button>
      </n-flex>

      <n-collapse-transition :show="d.visibility.submitterInfo">
        <n-descriptions label-placement="left">

          <n-descriptions-item :label="u.dict.translate('name', 'name', s.lang.currentLang)">
            {{ s.auth.user?.name }}
          </n-descriptions-item>
          <n-descriptions-item :label="u.dict.translate('user_code', 'name', s.lang.currentLang)">
            {{ s.auth.user?.user_code }}
          </n-descriptions-item>

          <n-descriptions-item :label="u.dict.translate('user_group', 'name', s.lang.currentLang)">
            {{ s.auth.user?.user_group_id === null ? 'N/A' : s.auth.user?.user_group_id }}
          </n-descriptions-item>
        </n-descriptions>
      </n-collapse-transition>
    </n-space>
  </n-card>
</template>
