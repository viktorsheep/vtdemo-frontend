<template>
  <n-tooltip
    trigger="hover"
    placement="right"
  >
    <template #trigger>
      <n-button @click="clearSorter">
        <n-icon :component="CloseCircleOutline" />
      </n-button>
    </template>

    Clear sort
  </n-tooltip>
</template>

<script setup>
import { CloseCircleOutline } from "@vicons/ionicons5";
// props
const props = defineProps({
  clear: Function,
});

// method
const clearSorter = () => {
  props.clear();
};
</script>
