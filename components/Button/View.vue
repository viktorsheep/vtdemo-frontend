<template>
  <n-button
    type="info"
    size="small"
    :tertiary="true"
    @click="handleDelete"
  >
    <n-icon :component="Eye" />
  </n-button>
</template>

<script setup>
// import
import { useNotification } from "naive-ui";
import { Eye } from "@vicons/ionicons5";

// props
const props = defineProps({
  id: Number,
  model: String,
});

// constants
const notification = useNotification();
const crudStore = useCrudStore();
</script>
