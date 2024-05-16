<script
  lang="ts"
  setup
>
  import { NButton, NIcon } from 'naive-ui';
  import { AddCircleRound, EditRound } from '@vicons/material';
  import ButtonDelete from "@/components/Button/Delete.vue";

  const u = {
    router: useRouter()
  }

  // stores
  const s = {
    contact: useContactStore()
  }

  // data
  const d = reactive({
    columns: [
      {
        title: "Name",
        key: "name",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Nick Name",
        key: "nickname",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Location",
        key: "location",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Gender",
        key: "gender",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Age",
        key: "age",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Baptism Date",
        key: "baptism_date",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Current Prayer Request",
        key: "current_prayer_request",
        sorter: false,
        sortOrder: false,
      },
      {
        title: "Edit",
        key: "edit",
        width: 80,
        render(row: any) {
          return h(NButton, {
            type: 'warning',
            size: 'small',
            tertiary: true,
            onClick() {
              u.router.push(`/contacts/save?id=${row.id}`);
            },
          }, {
            default: () => h(NIcon, {
              type: 'warning',
              component: EditRound
            })
          });
        },
      },
      {
        title: "Delete",
        key: "delete",
        width: 80,
        render(row: any) {
          return h(ButtonDelete, {
            model: d.model,
            id: row.id,
            store: s.contact
          });
        },
      },
    ] as any,
    model: ref('contacts')
  })

  s.contact.all()

  s.contact.$onAction(({ name, after }) => {
    after((result) => {
      switch (name) {
        case 'all':
          // d.columns
          break

        default:
          break
      }
    })
  })

</script>

<template>
  <n-space
    :size="10"
    vertical
  >
    <div>
      <n-flex justify="end">
        <n-button
          type="success"
          secondary
          @click="navigateTo('contacts/save')"
        >
          <n-icon :component="AddCircleRound" /> &nbsp;
          Add Contacts
        </n-button>
      </n-flex>
    </div>

    <div>
      <n-data-table
        :columns="d.columns"
        :data="s.contact.contacts"
      />
    </div>
  </n-space>
</template>

<style
  lang="scss"
  scoped
></style>
