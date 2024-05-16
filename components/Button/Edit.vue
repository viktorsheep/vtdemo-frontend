<template>
  <n-button type="warning" size="small" :tertiary="true" @click="handleMounted">
    <n-icon :component="EditFilled" />
  </n-button>
  <n-drawer v-model:show="showDrawer" :default-width="500" resizable>
    <n-drawer-content>
      <template #header> Edit </template>
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
          :style="{ display: field.key === 'password' ? 'none' : 'block' }"
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
            :label-field="field.labelField ? field.labelField : 'name'"
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
              @change="
                (e) => {
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
              @change="
                (e) => {
                  handleAudioSelect(e, field.key);
                }
              "
            />
          </div>

          <!-- Date -->
          <div v-if="field.type === 'date'">
            <n-date-picker
              v-model:value="fields[field.key]"
              v-model:formatted-value="fields[field.key]"
              value-format="yyyy-MM-dd"
              input-readonly="true"
              style="width: 100%"
            />
          </div>

          <!-- Password -->
          <n-input
            v-if="field.type === 'password'"
            type="password"
            show-password-on="mousedown"
            clearable
            v-model:value="fields[field.key]"
            :placeholder="`Input ${field.name}`"
          />

          <!-- Default -->
          <n-input
            v-if="field.type === undefined || field.type === ''"
            clearable
            v-model:value="fields[field.key]"
            :placeholder="`Input ${field.name}`"
          />
        </n-form-item>

        <n-form-item style="float: right">
          <n-button @click="handleEdit">
            <n-icon :component="EditFilled" :size="16" />
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

// props
const props = defineProps({
  formFields: Object,
  formFieldsArray: Array,
  formRules: Object,
  url: String,
  fileInclude: Boolean,
  addClick: Function,
});

const emits = defineEmits(["edited"]);

// constants
const notification = useNotification();
const crudStore = useCrudStore();
const showDrawer = ref(false);
const fields = ref(JSON.parse(JSON.stringify(props.formFields)));
const url = ref(props.url);
const rules = props.formRules;
const fieldsArray = ref(JSON.parse(JSON.stringify(props.formFieldsArray)));
const formRef = ref(null);
const checkFileInclude = ref(props.fileInclude);
const key = ref(0);

const d = reactive({
  visibility: {
    drawer: false,
  },
});
// watch
// watch(
//   () => props.formFields,
//   (n, o) => {
//     fields.value = ref(JSON.parse(JSON.stringify(props.formFields)));
//   },
//   {
//     deep: true,
//   }
// );
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
const handleMounted = () => {
  showDrawer.value = true;
  fieldsArray.value.map((field) => {
    if (field.type === "multi_tags") {
      return (fields.value[field.key] = fields.value[field.key].map(
        (f) => f.id
      ));
    }
  });
};

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
const handleEdit = (event) => {
  event.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let response = null;

      // Check whether to use formData or not
      if (checkFileInclude.value === false) {
        response = await crudStore.edit(url.value, fields.value);
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

        response = await crudStore.edit(url.value, formData);
      }

      if (response.data.value) {
        notification["success"]({
          title: `Edit successfully.`,
          duration: 2500,
          keepAliveOnHover: true,
        });
        d.visibility.drawer = false;
        showDrawer.value = false;
        emits("edited", response.data.value);
      }
      if (response.error.value) {
        notification["error"]({
          title: `Error: ${error.value.statusCode}`,
          content: error.value.data.message,
          duration: 3500,
          keepAliveOnHover: true,
        });
      }

      d.visibility.drawer = false;
    }
    props.addClick();
    key.value++;
  });
};
</script>
