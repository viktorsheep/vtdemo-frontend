<template>
  <n-pagination
    size="medium"
    remote
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="pageCount"
    show-size-picker
    :page-sizes="[1, 3, 10, 50, 100]"
    :on-update:page="handlePageChange"
    :on-update:page-size="handleSizeChange"
    style="float: right; margin-top: 10px"
  >
    <template #prefix> Total {{ model }}: {{ total }}. </template>
  </n-pagination>
</template>
<script setup>
// props
const props = defineProps({
  currentPage: Number,
  currentPageSize: Number,
  dataPageCount: Number,
  totalData: Number,
  pageModel: String,
  pageChange: Function,
  sizeChange: Function,
});

// constants
const page = ref(props.currentPage);
const pageSize = ref(props.currentPageSize);
const pageCount = ref(props.dataPageCount);
const total = ref(props.totalData);
const model = ref(props.pageModel);

// watch
watch(
  () => props.currentPage,
  (n) => {
    page.value = n;
  }
);
watch(
  () => props.currentPageSize,
  (n) => {
    pageSize.value = n;
  }
);
watch(
  () => props.dataPageCount,
  (n) => {
    pageCount.value = n;
  }
);
watch(
  () => props.totalData,
  (n) => {
    total.value = n;
  }
);

// methods
const handlePageChange = (page) => {
  props.pageChange(page);
};

const handleSizeChange = (size) => {
  props.sizeChange(size);
};
</script>
