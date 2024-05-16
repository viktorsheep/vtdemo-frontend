<template>
  <n-form
    :key="key"
    ref="formRef"
    :label-width="80"
    :model="fields"
    :rules="rules"
    size="medium"
  >
    <n-form-item
      v-for="(field, index) in fieldsArray"
      :label="field.name"
      :path="field.key"
    >
      <!-- Textarea -->
      <n-input
        v-if="field.type === 'textarea'"
        clearable
        :placeholder="`Input ${field.name}`"
        type="textarea"
        v-model:value="fields[field.key]"
        :autosize="{
      minRows: 5,
      maxRows: 15,
    }"
      />
      <!-- Foreign / single select -->
      <n-select
        v-if="field.type === 'foreign'"
        label-field="name"
        value-field="id"
        v-model:value="fields[field.key]"
        :options="field.options"
        :placeholder="`Select ${field.name}`"
      />
      <!-- Foreign / multi tags -->
      <n-select
        v-if="field.type === 'multi_tags'"
        label-field="name"
        value-field="id"
        multiple
        v-model:value="fields[field.key]"
        :options="field.options"
        :placeholder="`Select ${field.name}`"
      />
      <!-- Boolean -->
      <n-switch
        v-if="field.type === 'boolean'"
        v-model:value="fields[field.key]"
        :round="false"
      >
        <template #checked> {{ field.check }} </template>
        <template #unchecked> {{ field.uncheck }} </template>
      </n-switch>
      <!-- Image -->
      <div v-if="field.type === 'image'">
        <input
          type="file"
          id="image"
          ref="image"
          name="image"
          accept="image/png, image/jpeg"
          @change="(e) => {
        handleImageSelect(e, field.key);
      }
      "
        />
      </div>
      <!-- Audio -->
      <div v-if="field.type === 'audio'">
        <input
          type="file"
          id="audio"
          ref="audio"
          name="audio"
          accept="audio/mpeg, audio/wav, audio/ogg"
          @change="(e) => {
        handleAudioSelect(e, field.key);
      }
      "
        />
      </div>
      <!-- Default -->
      <n-input
        v-if="field.type === undefined || field.type === ''"
        clearable
        v-model:value="fields[field.key]"
        :placeholder="`Input ${field.name}`"
      />
    </n-form-item>
    <n-form-item style="float: right">
      <n-button @click="handleAddClick">
        <n-icon
          :component="AddCircle"
          :size="16"
        />
      </n-button>
    </n-form-item>
  </n-form>
</template>
<script setup>
//import
import { useNotification } from "naive-ui";
import { AddCircle } from "@vicons/ionicons5";
import { CloudUploadOutlined } from "@vicons/material";

// props
const props = defineProps({
  formFields: Object,
  formFieldsArray: Array,
  formRules: Object,
  url: String,
  addClick: Function,
  fileInclude: Boolean,
});

// constants
const notification = useNotification();
const crudStore = useCrudStore();
const fields = ref(props.formFields);
const url = ref(props.url);
const rules = props.formRules;
const fieldsArray = props.formFieldsArray;
const formRef = ref(null);
const checkFileInclude = ref(props.fileInclude);
const key = ref(0);

// watch
watch(
  () => props.formFields,
  (n, o) => {
    fields.value = props.formFields;
  },
  {
    deep: true,
  }
);
watch(
  () => props.fileInclude,
  (n, o) => {
    checkFileInclude.value = props.fileInclude;
  },
  {
    deep: true,
  }
);

// method
const handleImageSelect = (event, field) => {
  const fileInput = event.target;
  const file = fileInput.files[0];
  fields.value[field] = file;
};
const handleAudioSelect = (event, field) => {
  const fileInput = event.target;
  const file = fileInput.files[0];
  fields.value[field] = file;
};
const handleAddClick = (event) => {
  event.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let response = null;

      // Check whether to use formData or not
      if (checkFileInclude.value === false) {
        response = await crudStore.add(url.value, fields.value);
      } else {
        const formData = new FormData();
        for (const key in fields.value) {
          if (fields.value.hasOwnProperty(key)) {
            // Check if type of proxy field is array
            if (Array.isArray(fields.value[key])) {
              fields.value[key].forEach((value, index) => {
                formData.append(`${key}[${index}]`, value);
              });
            } else {
              formData.append(key, fields.value[key]);
            }
          }
        }

        response = await crudStore.add(url.value, formData);
      }

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
    props.addClick();
    key.value++;
  });
};
</script>
