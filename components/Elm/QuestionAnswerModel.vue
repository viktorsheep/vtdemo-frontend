<script
  lang="ts"
  setup
>
  import { RadioButtonUncheckedRound } from '@vicons/material';

  const p = defineProps({
    visibility: {
      type: Boolean,
      default: false
    },

    questions: {
      type: Array,
      default: []
    },

    answers: {
      type: Array,
      default: []
    }
  })

  const m = {
    checkAnswerExist: (qid: number) => {
      const gg = p.answers.find((a: any) => a.id === qid)
    }
  }
</script>

<template>
  <n-modal
    v-model:show="p.visibility"
    transform-origin="center"
    :mask-closable="false"
  >
    <n-card
      style="width: 1000px;"
      title="Review & Submit"
    >
      <n-scrollbar style="max-height: calc(100vh - 200px);">
        <div
          v-for="qg in questions as any"
          style="margin-bottom: 20px;"
        >
          <h3>{{ qg.name }}</h3>

          <div
            v-for="q in qg.questions"
            style="margin-bottom: 20px;"
          >
            <n-grid cols="4">
              <n-gi span="1">
                {{ q.question_text_eng }}
              </n-gi>

              <n-gi span="3">

                <!-- RADIO -->
                <div v-if="q.question_type_id === 1">
                  <span
                    v-for="qas in q.predefined_qas"
                    style="display: inline-block; padding-right: 10px;"
                  >
                    <n-icon :component="RadioButtonUncheckedRound" />
                    {{ qas.question_text }}
                  </span>
                </div>

                <!-- CHECKBOX -->
                <div v-if="q.question_type_id === 2">
                </div>

                <!-- TEXT AREA -->
                <div v-if="q.question_type_id === 3">
                </div>

                <!-- TEXT -->
                <div v-if="q.question_type_id === 4">
                </div>

                <!-- DATE -->
                <div v-if="q.question_type_id === 5">
                </div>

                <!-- TITLE -->
                <div v-if="q.question_type_id === 11">
                </div>

                <!-- UPLOAD -->
                <div v-if="q.question_type_id === 12">
                  jj
                </div>
              </n-gi>
            </n-grid>
          </div>

        </div>
      </n-scrollbar>

      <template #footer>
        <n-flex justify="end">
          <n-button
            type="default"
            @click="$emit('toggleVisibility')"
          >Close</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>
