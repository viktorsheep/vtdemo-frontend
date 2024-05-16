<template>
  <n-tooltip trigger="hover" placement="left">
    <template #trigger>
      <n-button
        type="success"
        size="medium"
        :tertiary="true"
        @click="d.visibility.drawer = true"
      >
        <n-icon :component="AddCircle" />
      </n-button>
    </template>

    {{ tooltipText === "" ? "Add" : tooltipText }}
  </n-tooltip>

  <n-drawer v-model:show="d.visibility.drawer" :default-width="500" resizable>
    <n-drawer-content>
      <template #header> Add </template>
      <n-scrollbar style="max-height: calc(100vh - 50px)">
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
            <n-button @click="handleAdd" type="success" secondary>
              <n-icon :component="AddCircle" :size="16" />
            </n-button>
          </n-form-item>
        </n-form>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
// import
import { useNotification } from "naive-ui";
import { AddCircle } from "@vicons/ionicons5";
import cryptoJs from "crypto-js";

// props
const props = defineProps({
  formFields: Object,
  formFieldsArray: Array,
  formRules: Object,
  url: String,
  addClick: Function,
  fileInclude: Boolean,
  tooltipText: {
    type: String,
    default: "",
  },
});

// constants
const notification = useNotification();
const crudStore = useCrudStore();
let showDrawer = ref(false);
const fields = ref(props.formFields);
const url = ref(props.url);
const rules = props.formRules;
const fieldsArray = props.formFieldsArray;
const formRef = ref(null);
const checkFileInclude = ref(props.fileInclude);
const key = ref(0);

const d = reactive({
  visibility: {
    drawer: false,
  },
});

const emits = defineEmits(["added"]);

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

const handleAdd = (event) => {
  event.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let response = null;

      const currentDate = new Date();

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[currentDate.getMonth()];
      const dayOfMonth = ("0" + currentDate.getDate()).slice(-2);
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayName = dayNames[currentDate.getDay()];

      const date =
        "PPPFC" +
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        currentDate.getDate().toString().padStart(2, "0") +
        "|" +
        currentDate.getHours().toString().padStart(2, "0") +
        ":" +
        currentDate.getMinutes().toString().padStart(2, "0") +
        ":" +
        currentDate.getSeconds().toString().padStart(2, "0") +
        dayName +
        month +
        dayOfMonth;

      fields.value.pin_number = cryptoJs.AES.encrypt(
        fields.value.pin_number,
        date
      ).toString();

      fields.value.pin_creation_date = date;

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
          title: `Created successfully.`,
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

      d.visibility.drawer = false;
      emits("added", response.data.value);
    }
    props.addClick();
    key.value++;
  });
};

crudStore.$onAction(({ name, after }) => {
  after((result) => {
    switch (name) {
      case "add":
        // d.visibility.drawer = false
        break;

      default:
        break;
    }
  });
});
</script>
