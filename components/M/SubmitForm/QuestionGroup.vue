<script
  lang="ts"
  setup
>
  const p = defineProps({
    questionGroup: {
      type: Object,
      default: {
        name: ''
      }
    },

    langPref: {
      type: String,
      default: "eng"
    },

    answers: {
      type: Array,
      default: []
    },

    completeSubmission: {
      type: Boolean,
      defeault: false
    },

    brigadeUpdated: {
      type: Number,
      default: null
    },

    districtUpdated: {
      type: Number,
      default: null
    }
  })

  const emits = defineEmits([
    'valueUpdate',
    'clearedValue',
  ])

  const sortedQ = computed(() => {
    const xx = JSON.parse(JSON.stringify(p.questionGroup.questions))
    return xx.sort((a: any, b: any) => parseInt(a.sort_order) - parseInt(b.sort_order))
  })

  const handleEmit = (value: any) => {
    emits('valueUpdate', value)
  }

  const m = {
    handle: {
      emit: {
        valueUpdate: (value: any) => {
          emits('valueUpdate', value)
        },

        brigade: {
          update: () => {

          },

          complete: () => {

          }
        },

        district: {
          update: () => {

          },

          complete: () => {

          }
        }
      }
    }
  }
</script>

<template>
  <!-- TODO: use name accordingly via language preference -->
  <!-- <div :id="p.questionGroup.id"> -->
  <n-list
    :id="`/submit-form/anchor-${p.questionGroup.id}`"
    bordered
  >
    <template #header>
      <h3>
        <n-text type="info">
          {{ p.questionGroup.name }}
        </n-text>
      </h3>
    </template>
    <div>
      <MSubmitFormQuestion
        v-for="q in sortedQ"
        :question="q"
        :lang-pref="p.langPref"
        :answers="p.answers"
        :complete-submission="p.completeSubmission"
        :brigade-updated="p.brigadeUpdated"
        :district-updated="p.districtUpdated"
        @value-update="handleEmit"
        @cleared-value="$emit('clearedValue')"
      />
    </div>
  </n-list>
  <!-- </div> -->
</template>
