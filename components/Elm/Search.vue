<template>
  <n-input-group>
    <n-input
      v-model:value="searchKey"
      clearable
      :placeholder="u.dict.translate('search', 'name', s.lang.currentLang)"
      :on-change="handleSearch"
      :style="{ width: '70%' }"
    >
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
    <n-select
      :style="{ width: '30%' }"
      v-model:value="defaultBy"
      :options="by"
    />
  </n-input-group>
</template>
<script setup>
// import
import { Search } from "@vicons/ionicons5";

// props
const props = defineProps({
  searchKey: String,
  searchBy: Array,
  defaultSearchBy: String,
  model: String,
  currentPage: Number,
  pageSize: Number,
  sort: Array,
  search: Function,
  filters: Object,
});

const u = {
  dict: useDict()
}

const s = {
  lang: useLanguagesStore()
}

// constants
const crudStore = useCrudStore();
const searchKey = ref(props.searchKey);
const by = ref(props.searchBy);
const defaultBy = ref(props.defaultSearchBy);
const model = ref(props.model);
const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);
const sort = ref(props.sort);
const filtersRef = ref(props.filters);

// watch
watch(
  () => props.sort,
  (n, o) => {
    sort.value = props.sort;
  },
  {
    deep: true,
  }
);
watch(
  () => props.filters,
  (n, o) => {
    filtersRef.value = props.filters;
  },
  {
    deep: true,
  }
);

// methods
const handleSearch = async (key) => {
  const encodeFilters = JSON.stringify(filtersRef.value);
  const url = `${model.value}/browse?page=${currentPage.value}&per_page=${
    pageSize.value
  }&search=${key}&search_by=${defaultBy.value}&sort=${JSON.stringify(
    sort.value
  )}&filters=${encodeFilters}`;
  const res = await crudStore.fetch(url);
  props.search(key);
};
</script>
