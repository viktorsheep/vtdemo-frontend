<template>
  <n-spin :show="d.loading.datatable">
    <n-data-table
      ref="table"
      :loading="loading"
      :row-key="(row) => row.id"
      :columns="columns"
      :data="data"
      :max-height="renderMaxHeight"
      @update:sorter="handleSorterChange"
      @update:filters="handleFiltersChange"
      size="large"
    />
  </n-spin>

  <ElmPagination
    :currentPage="currentPage"
    :currentPageSize="pageSize"
    :dataPageCount="crudStore.pageCount"
    :totalData="crudStore.total"
    :pageModel="model"
    :pageChange="handlePageChange"
    :sizeChange="handleSizeChange"
  />
</template>

<script setup>
// import
import { watch } from "vue";

// props
const props = defineProps({
  tableColumns: Array,
  tableData: Array,
  tableLoading: Boolean,
  clearSort: Boolean,
  model: String,
  currentPage: Number,
  pageSize: Number,
  sort: Array,
  defaultSearchBy: String,
  searchKey: String,
  sortCleared: Function,
  setFilters: Function,
});

// constants
const crudStore = useCrudStore();
const renderMaxHeight = ref(window.innerHeight - 340);
const data = ref(props.tableData);
const columns = ref(props.tableColumns);
const loading = ref(props.tableLoading);
const sort = ref(props.sort);
const defaultSearchBy = ref(props.defaultSearchBy);
const searchKey = ref(props.searchKey);
const model = ref(props.model);
const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);
const clearSort = ref(props.clearSort);
const filtersRef = ref({});

// watch
watch(
  () => props.tableData,
  (n, o) => {
    data.value = props.tableData;
  },
  {
    deep: true,
  }
);

watch(
  () => props.clearSort,
  (n, o) => {
    clearSort.value = props.clearSort;
    clearSorter();
  },
  {
    deep: true,
  }
);

const d = reactive({
  loading: {
    datatable: false
  }
})

// method
const handleSorterChange = async (sorter) => {
  const encodeFilters = JSON.stringify(filtersRef.value);

  if (!sorter) {
    return;
  }
  const sortColumn = columns.value.find((c) => c.key === sorter.columnKey);

  const check = sort.value.find((s) => s.key === sorter.columnKey);
  if (!check) {
    sort.value.push({
      key: sorter.columnKey,
      order: sorter.order === "descend" ? "desc" : "asc",
    });
  } else {
    sorter.order === "descend"
      ? (sort.value[sort.value.indexOf(check)] = {
          key: sorter.columnKey,
          order: "desc",
        })
      : sorter.order === "ascend"
      ? (sort.value[sort.value.indexOf(check)] = {
          key: sorter.columnKey,
          order: "asc",
        })
      : sort.value.splice(sort.value.indexOf(check), 1);
  }

  const encodeSort = JSON.stringify(sort.value);
  const url = `${model.value}/browse?page=${currentPage.value}&per_page=${pageSize.value}&search=${searchKey.value}&search_by=${defaultSearchBy.value}&sort=${encodeSort}&filters=${encodeFilters}`;
  d.loading.datatable = true
  await crudStore.fetch(url);
  data.value = crudStore.modelData;
  d.loading.datatable = false
  sortColumn.sortOrder = !sorter ? false : sorter.order;
};

const clearSorter = async () => {
  sort.value = [];
  const encodeFilters = JSON.stringify(filtersRef.value);
  const encodeSort = JSON.stringify(sort.value);
  d.loading.datatable = true
  const url = `${model.value}/browse?page=${currentPage.value}&per_page=${pageSize.value}&search=${searchKey.value}&search_by=${defaultSearchBy.value}&sort=${encodeSort}&filters=${encodeFilters}`;
  await crudStore.fetch(url);
  data.value = crudStore.modelData;
  d.loading.datatable = false

  columns.value.map((c) => {
    if (c.sortOrder) {
      c.sortOrder = false;
    }
  });
  props.sortCleared();
};

const handleFiltersChange = async (filters) => {
  filtersRef.value = filters;
  const keys = Object.keys(filters);
  keys.forEach((key) => {
    const index = columns.value.findIndex((obj) => obj.key === key);
    columns.value[index].filterOptionValues = filters[key];
  });

  const encodeSort = JSON.stringify(sort.value);
  const encodeFilters = JSON.stringify(filters);
  const url = `${model.value}/browse?page=${currentPage.value}&per_page=${pageSize.value}&search=${searchKey.value}&search_by=${defaultSearchBy.value}&sort=${encodeSort}&filters=${encodeFilters}`;
  d.loading.datatable = true
  await crudStore.fetch(url);
  data.value = crudStore.modelData;
  d.loading.datatable = false
  props.setFilters(filters);
};

const handlePageChange = async (page) => {
  currentPage.value = page;
  const encodeFilters = JSON.stringify(filtersRef.value);
  const url = `${model.value}/browse?page=${page}&per_page=${
    pageSize.value
  }&search=${searchKey.value}&search_by=${defaultSearchBy.value}&sort=${JSON.stringify(
    sort.value
  )}&filters=${encodeFilters}`;
  d.loading.datatable = true
  await crudStore.fetch(url);
  data.value = crudStore.modelData;
  d.loading.datatable = false
};

const handleSizeChange = async (size) => {
  pageSize.value = size;
  const encodeFilters = JSON.stringify(filtersRef.value);
  const url = `${model.value}/browse?page=${
    currentPage.value
  }&per_page=${size}&search=${searchKey.value}&search_by=${
    defaultSearchBy.value
  }&sort=${JSON.stringify(sort.value)}&filters=${encodeFilters}`;
  d.loading.datatable = true
  const res = await crudStore.fetch(url);
  currentPage.value = res?.current_page;
  data.value = crudStore.modelData;
  d.loading.datatable = false
};
</script>
