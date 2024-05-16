<script
  lang="ts"
  setup
>
  import { ConstructionRound } from "@vicons/material";
  const props = defineProps({
    name: {
      type: String,
      default: 'Page'
    }
  })

  const u = {
    dict: useDict(),
  }

  const s = {
    lang: useLanguagesStore()
  }
</script>

<template>
  <n-result
    :title="u.dict.translate('under_construction', 'name', s.lang.currentLang)"
    :description="`${props.name} ${u.dict.translate('page_is_still_under_construction', 'name', s.lang.currentLang)}`"
    style="margin-top: 50px;"
  >
    <template #icon>
      <n-text type="warning">
        <n-icon
          :component="ConstructionRound"
          :size="70"
        />
      </n-text>
    </template>
  </n-result>
</template>
