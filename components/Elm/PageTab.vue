<template>
  <n-tabs
    type="card"
    animated
    placement="top"
    size="large"
  >
    <template #prefix> Artists </template>
    <n-tab-pane
      name="list"
      :tab="renderIcon(ViewListRound)"
    >
      <ElmDataTable
        :tableColumns="columns"
        :tableData="data"
        :sorterChange="handleSorterChange"
      />
      <ElmPagination />
    </n-tab-pane>
    <n-tab-pane
      name="add"
      :tab="renderIcon(PlaylistAddRound)"
    >
      <ElmAddForm />
    </n-tab-pane>
  </n-tabs>
</template>
<script setup>

</script>
