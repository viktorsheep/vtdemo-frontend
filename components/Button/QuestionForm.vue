<template>
  <n-button
    :type="props.isEdit ? 'warning' : 'success'"
    size="medium"
    :tertiary="true"
    @click="handleButtonClick"
  >
    <n-icon :component="props.isEdit ? EditFilled : AddCircle" />
  </n-button>
  <n-drawer
    v-model:show="showDrawer"
    :default-width="1000"
    resizable
  >
    <n-drawer-content>
      <template #header> Add </template>
      <n-form
        :key="key"
        ref="formRef"
        :label-width="80"
        :model="fields"
        :rules="rules"
        size="medium"
      >
        <!-- question_group_id -->

        <!-- Sort Order -->
        <n-form-item
          label="Order"
          path="sort_order"
        >
          <n-input
            clearable
            v-model:value="fields.sort_order"
            placeholder="Input Sort Order"
          />
        </n-form-item>

        <!-- Question Sagaw Karen -->
        <n-form-item
          label="Question in Sagaw Karen"
          path="question_text_sagaw_karen"
        >
          <n-input
            clearable
            v-model:value="fields.question_text_sagaw_karen"
            placeholder="Input Question Text in Sagaw Karen"
          />
        </n-form-item>

        <!-- Question Pwo Karen -->
        <n-form-item
          label="Question in Pwo Karen"
          path="question_text_pwo_karen"
        >
          <n-input
            clearable
            v-model:value="fields.question_text_pwo_karen"
            placeholder="Input Question Text in Pwo Karen"
          />
        </n-form-item>

        <!-- Question English -->
        <n-form-item
          label="Question in English"
          path="question_text_english"
        >
          <n-input
            clearable
            v-model:value="fields.question_text_eng"
            placeholder="Input Question Text"
          />
        </n-form-item>

        <!-- Question Burmese -->
        <n-form-item
          label="Question in Burmese"
          path="question_text_burmese"
        >
          <n-input
            clearable
            v-model:value="fields.question_text_burmese"
            placeholder="Input Question Text"
          />
        </n-form-item>

        <!-- helper text -->
        <n-form-item
          label="Description"
          path="helper_text"
        >
          <n-input
            clearable
            v-model:value="fields.helper_text"
            placeholder="Input description for question"
          />
        </n-form-item>

        <!-- helper text Sagaw -->
        <n-form-item
          label="Description in Sagaw Karen"
          path="helper_text_sagaw_karen"
        >
          <n-input
            clearable
            v-model:value="fields.helper_text_sagaw_karen"
            placeholder="Input description for question in Sagaw Karen"
          />
        </n-form-item>

        <!-- helper text Pwo -->
        <n-form-item
          label="Description in Pwo Karen"
          path="helper_text_pwo_karen"
        >
          <n-input
            clearable
            v-model:value="fields.helper_text_pwo_karen"
            placeholder="Input description for question in Pwo Karen"
          />
        </n-form-item>

        <!-- helper text burmese -->
        <n-form-item
          label="Description in Burmese"
          path="helper_text_burmese"
        >
          <n-input
            clearable
            v-model:value="fields.helper_text_burmese"
            placeholder="Input description for question in Burmese"
          />
        </n-form-item>

        <!-- placeholder -->
        <n-form-item
          label="Placeholder"
          path="placeholder"
        >
          <n-input
            clearable
            v-model:value="fields.placeholder"
            placeholder="Input placeholder"
          />
        </n-form-item>

        <!-- placeholder Sagaw -->
        <n-form-item
          label="Placeholder in Sagaw Karen"
          path="placeholder_sagaw_karen"
        >
          <n-input
            clearable
            v-model:value="fields.placeholder_sagaw_karen"
            placeholder="Input placeholder in Sagaw Karen"
          />
        </n-form-item>

        <!-- placeholder Pwo -->
        <n-form-item
          label="Placeholder in Pwo Karen"
          path="placeholder_pwo_karen"
        >
          <n-input
            clearable
            v-model:value="fields.placeholder_pwo_karen"
            placeholder="Input placeholder in Pwo Karen"
          />
        </n-form-item>

        <!-- placeholder Burmese -->
        <n-form-item
          label="Placeholder in Burmese"
          path="placeholder_burmese"
        >
          <n-input
            clearable
            v-model:value="fields.placeholder_burmese"
            placeholder="Input placeholder in Burmese"
          />
        </n-form-item>

        <!-- purpose_id -->
        <n-form-item
          label="Purpose of question"
          path="purpose_id"
        >
          <n-select
            label-field="name"
            value-field="id"
            v-model:value="fields.purpose_id"
            :options="purposesStore.purposes"
            placeholder="Select purpose"
          />
        </n-form-item>

        <!-- question_type_id -->
        <n-form-item
          label="Question Type"
          path="question_type_id"
        >
          <n-select
            label-field="name"
            value-field="id"
            v-model:value="fields.question_type_id"
            :options="questionTypesStore.types"
            placeholder="Select question types"
          />
        </n-form-item>

        <!-- predefined_qas -->
        <n-form-item
          v-if="fields.question_type_id === 1 || fields.question_type_id === 2"
          label="Predefined QAs"
          path="predefined_qas"
        >
          <n-dynamic-input
            v-model:value="fields.predefined_qas"
            :min="0"
            :on-create="handleDynamicFormCreate"
          >
            <template #default="{ value }">
              <div style="display: flex; align-items: center; width: 100%">
                <n-input
                  clearable
                  v-model:value="value.question_text"
                  placeholder="English"
                />
                <n-input
                  clearable
                  v-model:value="value.question_text_sagaw_karen"
                  placeholder="Sagaw Karen"
                />
                <n-input
                  clearable
                  v-model:value="value.question_text_pwo_karen"
                  placeholder="Pwo Karen"
                />
                <n-input
                  clearable
                  v-model:value="value.question_text_burmese"
                  placeholder="Burmese"
                />
              </div>
            </template>
          </n-dynamic-input>
        </n-form-item>

        <!-- parent_id -->
        <n-form-item
          label="Parent question"
          path="parent_id"
        >
          <n-select
            label-field="question_text_burmese"
            value-field="id"
            v-model:value="fields.parent_id"
            :options="questionsStore.questions"
            placeholder="Select parent question"
            clearable
            @update:value="getPredefinedQas"
          />
        </n-form-item>

        <!-- predefined_qa_id -->
        <n-form-item
          v-if="predefined_qa_visible === true"
          label="Predefined question/answer"
          path="predefined_qa_id"
        >
          <n-select
            label-field="question_text"
            value-field="id"
            v-model:value="fields.predefined_qa_id"
            :options="predefinedQasStore.qas"
            clearable
            placeholder="Select predefined question/answer"
          />
        </n-form-item>

        <!-- is_mandatory -->
        <n-form-item
          label="Is mandatory"
          path="is_mandatory"
        >
          <n-switch
            v-model:value="fields.is_mandatory"
            :round="false"
          >
            <template #checked> Yes </template>
            <template #unchecked> No </template>
          </n-switch>
        </n-form-item>

        <!-- button -->
        <n-form-item style="float: right">
          <n-button @click="(event) => {
        props.isEdit ? handleEdit(event) : handleAdd(event);
      }
      ">
            <n-icon
              :component="AddCircle"
              :size="16"
            />
          </n-button>
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
// import
import { useNotification, useMessage } from "naive-ui";
import { EditFilled } from "@vicons/material";
import {
  AddCircle,
  BagAddOutline as AddIcon,
  BagRemoveOutline as RemoveIcon,
  ChevronUpCircleOutline as UpIcon,
  ChevronDownCircleOutline as DownIcon,
} from "@vicons/ionicons5";

// props
const props = defineProps({
  data: Object,
  isEdit: Boolean,
});

// constants
const key = 0;
const route = useRoute();
const notification = useNotification();
const crudStore = useCrudStore();
const purposesStore = usePurposesStore();
const questionTypesStore = useQuestionTypesStore();
const questionsStore = useQuestionsStore();
const predefinedQasStore = usePredefinedQasStore();
const showDrawer = ref(false);
const predefined_qa_visible = ref(false);
const formRef = ref(null);
const fields = ref({
  sort_order: null,
  question_text_sagaw_karen: null,
  question_text_pwo_karen: null,
  question_text_eng: null,
  question_text_burmese: null,
  parent_id: null,
  question_group_id: route.params.id,
  helper_text: null,
  helper_text_sagaw_karen: null,
  helper_text_pwo_karen: null,
  helper_text_burmese: null,
  placeholder: null,
  placeholder_sagaw_karen: null,
  placeholder_pwo_karen: null,
  placeholder_burmese: null,
  is_mandatory: 0,
  question_type_id: null,
  purpose_id: null,
  predefined_qa_id: null,
  predefined_qas: [],
});

const rules = {
  question_text_burmese: [
    {
      required: true,
      message: "Please input question",
      trigger: "blur",
    },
  ],
};

// methods
const handleDynamicFormCreate = () => {
  return {
    id: 0,
    question_text: null,
    question_text_sagaw_karen: null,
    question_text_pwo_karen: null,
    question_text_burmese: null,
  };
};

const getPredefinedQas = async () => {
  await predefinedQasStore.byQuestionId(
    `questions/nested-questions/${fields.value.parent_id}/get`
  );
  predefined_qa_visible.value = true;
};

const handleButtonClick = () => {
  showDrawer.value = true;
  if (props.data?.predefined_qas) {
    props.data.predefined_qas = props.data.predefined_qas.map((qa) => {
      return {
        id: qa.id,
        question_text: qa.question_text,
        question_text_sagaw_karen: qa.question_text_sagaw_karen,
        question_text_pwo_karen: qa.question_text_pwo_karen,
        question_text_burmese: qa.question_text_burmese,
      };
    });
    fields.value = props.data;
    getPredefinedQas();
  }
};

const handleAdd = (event) => {
  event.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const response = await crudStore.add(`questions/add`, fields);
      if (response.data.value) {
        notification["success"]({
          title: `Create successfully.`,
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
      if (response.error.value) {
        notification["error"]({
          title: `Error: ${error.value.statusCode}`,
          content: error.value.data.message,
          duration: 3500,
          keepAliveOnHover: true,
        });
      }
    }
  });
};

const handleEdit = (event) => {
  event.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const response = await crudStore.edit(
        `questions/${props.data.id}/edit`,
        fields
      );
      if (response.data.value) {
        notification["success"]({
          title: `Edit successfully.`,
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
      if (response.error.value) {
        notification["error"]({
          title: `Error: ${error.value.statusCode}`,
          content: error.value.data.message,
          duration: 3500,
          keepAliveOnHover: true,
        });
      }
    }
  });
};
</script>
