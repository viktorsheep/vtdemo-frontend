<template>
  <n-button
    type="error"
    size="small"
    :tertiary="true"
    @click="handleDelete"
  >
    <n-icon :component="TrashBin" />
  </n-button>
</template>

<script setup>
// import
import { useNotification } from "naive-ui";
import { TrashBin } from "@vicons/ionicons5";

// emits
const emits = defineEmits(['deleted'])

// props
const props = defineProps({
  id: Number,
  model: String,
  store: Object
});

// constants
const notification = useNotification();
const crudStore = useCrudStore();

// method
const handleDelete = async () => {
  const url = `${props.model}/${props.id}/delete`;
  const { data, error } = await crudStore.deleteData(url, props.id);

  if (error.value) {
    notification["error"]({
      title: `Error: ${error.value.statusCode}`,
      content: error.value.data.message,
      duration: 3500,
      keepAliveOnHover: true,
    });
  } else {
    emits("deleted")
    props.store.all()
    notification["success"]({
      title: `Delete successfully.`,
      duration: 1500,
      keepAliveOnHover: true,
    });
  }
};
</script>
