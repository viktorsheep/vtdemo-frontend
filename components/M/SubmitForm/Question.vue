<script
  lang="ts"
  setup
>
  interface Answer {
    answer_value: number[],
    id: number,
    parent_id: number,
    qtype: string
  }

  const p = defineProps({
    question: {
      type: Object,
      default: () => {
        return {
          name: ''
        }
      }
    },

    langPref: {
      type: String,
      default: 'eng'
    },

    answers: {
      type: Array,
      default: [] as Answer[]
    },

    completeSubmission: {
      type: Boolean,
      default: false
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

  const u = {
    token: useCookie('XSRF-TOKEN'),
    reqHeaders: useRequestHeaders(["cookie"]),
    dict: useDict()
  }

  const s = {
    purposes: usePurposesStore(),
    q: {
      types: useQuestionTypesStore()
    },
    lang: useLanguagesStore(),
    brigades: useBrigadesStore(),
    districts: useDistrictsStore(),
    townships: useTownshipsStore()
  }

  const d = reactive({
    value: null as any,
    fmtValue: null as any,
    profilePicturePath: null as any,
    townshipList: [] as any
  })

  const m = {
    qt: (tid: number) => {
      return s.q.types.types.find((t: any) => { return t.id === tid })
    },

    render() {
      return h('span', {}, ['asdfasd'])
    },

    emitEvent() {
      if (d.value === null) { return }

      let qtype = null

      switch (p.question.question_type_id) {
        case 1:
          qtype = 'radio'
          break

        case 2:
          qtype = 'checkbox'
          break

        case 3:
          qtype = 'textarea'
          break

        case 4:
          qtype = 'text'
          break

        case 5:
          qtype = 'date'
          break

        case 6:
          qtype = 'dropdown'
          break

        case 7:
          qtype = 'survey_area'
          break

        case 8:
          qtype = 'brigade'
          break

        case 9:
          qtype = 'district'
          break

        case 10:
          qtype = 'township'
          break

        case 11:
          qtype = 'title'
          break

        case 12:
          qtype = 'image'
          break

        default:
          break
      }

      emits('valueUpdate', {
        'answer_value': d.value,
        'id': p.question.id,
        'qtype': qtype,
        'parent_id': p.question.parent_id,
        'brigadeChange': p.question.question_type_id === 8 ? true : false,
        'districtChange': p.question.question_type_id === 9 ? true : false
      })
    },

    checkVisibility() {
      let flag = true
      const q = p.question
      const a = p.answers

      if (q.parent_id !== null) {
        flag = false

        const answer = a.find((a: any) => a.id === q.parent_id) as Answer

        if (typeof answer !== 'undefined') {
          if (answer.qtype === 'checkbox') {
            flag = answer.answer_value.includes(q.predefined_qa_id)
          } else {
            flag = answer.answer_value === q.predefined_qa_id ? true : false
          }
        }
      }

      return flag
    },

    handle: {
      profileUpload(img: any) {
        d.value = JSON.parse((img.event?.target as XMLHttpRequest).response).original
        m.emitEvent()
      }
    }
  }

  watch(() => p.answers, (n, o) => {
    const a = p.answers.find((a: any) => a.id === p.question.parent_id) as Answer
    if (typeof a !== 'undefined') {
      if (a.qtype === 'checkbox') {
        if (!a.answer_value.includes(p.question.predefined_qa_id)) {
          d.value = null
        }
      } else {
        if (a.answer_value !== p.question.predefined_qa_id) {
          d.value = null
        }
      }
    }
  })

  watch(() => p.completeSubmission, (n) => {
    if (n) {
      d.value = null
      emits('clearedValue')
    }
  })

  watch(() => p.districtUpdated, (n) => {
    if (p.question.question_type_id === 10) {
      if (n !== null) {
        d.townshipList = s.townships.townships
          .filter((t: any) => t.district_id === n)
          .map((t: any) => {
            return {
              label: t.name,
              value: t.id
            }
          })
      }
    }
  })
</script>

<template>
  <n-list-item v-if="m.checkVisibility()">
    <n-space
      justify="space-between"
      style="display: none;"
    >
      <n-popover
        trigger="click"
        raw
        :show-arrow="false"
        placement="right"
      >
        <template #trigger>
          <n-button
            type="success"
            quaternary
          >
            Fields
          </n-button>
        </template>

        <n-card
          size="small"
          style="width: 500px;"
        >
          <n-scrollbar style="max-height: 500px;">
            <div v-for="g, q in p.question">
              <n-text
                code
                type="warning"
              >
                {{ q }}
              </n-text>
              :
              <n-text code>
                {{ g }}
              </n-text>
            </div>
          </n-scrollbar>
        </n-card>
      </n-popover>
    </n-space>

    <n-grid
      cols="4"
      x-gap="20"
    >
      <n-gi span="1">
        <div style="text-align: right;">
          <n-text
            v-if="p.question.question_type_id === 11"
            depth="1"
          >
            <strong>
              {{ p.question['question_text_' + p.langPref] }}
            </strong>
          </n-text>
          <n-text v-else>
            {{ p.question['question_text_' + p.langPref] }}
          </n-text>

          <n-text
            type="error"
            v-if="p.question.is_mandatory"
          >
            *
          </n-text>

          <div>
            <n-text type="info">
              {{ p.question['helper_text' + (p.langPref === 'eng' ? '' : '_' + p.langPref)] }}
            </n-text>
          </div>

        </div>
      </n-gi>
      <n-gi :span="p.question.question_type_id === 11 ? 0 : 3">

        <!-- RADIO -->
        <div v-if="p.question.question_type_id === 1">

          <n-radio-group
            v-model:value="d.value"
            name="radiogroup"
            :on-update:checked="m.emitEvent()"
          >
            <n-grid :cols="1">
              <n-gi
                v-for="qas in p.question.predefined_qas"
                style="margin-bottom: 20px;"
              >
                <n-radio
                  :key="qas.id"
                  :value="qas.id"
                  :label="qas['question_text' + (p.langPref === 'eng' ? '' : '_' + p.langPref)]"
                />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </div> <!-- e.o RADIO -->

        <!-- CHECKBOX -->
        <div v-if="p.question.question_type_id === 2">
          <n-checkbox-group
            v-model:value="d.value"
            @update:value="m.emitEvent()"
          >
            <n-grid :cols="1">
              <n-gi
                v-for="qas in p.question.predefined_qas"
                style="margin-bottom: 20px;"
              >
                <n-checkbox
                  :value="qas.id"
                  :label="qas['question_text' + (p.langPref === 'eng' ? '' : '_' + p.langPref)]"
                />
              </n-gi>
            </n-grid>
          </n-checkbox-group>
        </div> <!-- e.o CHECKBOX -->

        <!-- TEXTAREA -->
        <div v-if="p.question.question_type_id === 3">
          <n-input
            v-model:value="d.value"
            type="textarea"
            :placeholder="p.question['placeholder_' + p.langPref]"
            @input="m.emitEvent()"
          />
        </div> <!-- e.o TEXTAREA -->

        <!-- TEXT -->
        <div v-if="p.question.question_type_id === 4">
          <n-input
            v-model:value="d.value"
            type="text"
            :placeholder="p.question['placeholder_' + p.langPref]"
            @input="m.emitEvent()"
          />
        </div> <!-- e.o TEXT -->

        <!-- DATE -->
        <div v-if="p.question.question_type_id === 5">
          <n-date-picker
            v-model:value="d.value"
            v-model:formatted-value="d.value"
            value-format="dd-MM-yyyy"
            :input-readonly="true"
            style="width: 100%;"
            @update:value="m.emitEvent()"
          />
        </div> <!-- e.o DATE -->

        <!-- BRIGADE -->
        <div v-if="p.question.question_type_id === 8">
          <n-radio-group
            v-model:value="d.value"
            name="brigade_radiogroup"
            :on-update:checked="m.emitEvent()"
          >
            <n-grid :cols="1">
              <n-gi
                v-for="b in s.brigades.brigades"
                style="margin-bottom: 20px;"
              >
                <n-radio
                  :key="b.id"
                  :value="b.id"
                  :label="b.name"
                />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </div> <!-- e.o BRIGADE -->

        <!-- DISTRICT -->
        <div v-if="p.question.question_type_id === 9">
          <n-radio-group
            v-model:value="d.value"
            name="district_radiogroup"
            :on-update:checked="m.emitEvent()"
          >
            <n-grid :cols="1">
              <n-gi
                v-for="b in s.districts.districts"
                style="margin-bottom: 20px;"
              >
                <n-radio
                  :key="b.id"
                  :value="b.id"
                  :label="b.name"
                />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </div> <!-- e.o DISTRICT -->

        <!-- TOWNSHIP -->
        <div v-if="p.question.question_type_id === 10">
          <n-select
            v-model:value="d.value"
            filterable
            :disabled="d.townshipList.length === 0 ? true : false"
            :placeholder="p.question['placeholder_' + p.langPref]"
            :options="d.townshipList"
            :on-update:checked="m.emitEvent()"
          />

        </div> <!-- e.o TOWNSHIP -->

        <!-- UPLOAD -->
        <div v-if="p.question.question_type_id === 12">
          <n-upload
            action="http://localhost:8000/api/files/add"
            :headers="{
    'X-XSRF-TOKEN': u.token.value as string,
    ...u.reqHeaders
  }"
            :data="{
    'folder': 'profile'
  }
    "
            :multiple="false"
            :with-credentials="true"
            :on-finish="m.handle.profileUpload"
            :show-preview-button="true"
            list-type="image"
            :show-remove-button="false"
          >
            <n-button>{{ u.dict.translate('upload_file', 'name', s.lang.currentLang) }}</n-button>
          </n-upload>
        </div> <!-- e.o UPLOAD -->
      </n-gi>
    </n-grid>
  </n-list-item>
</template>
