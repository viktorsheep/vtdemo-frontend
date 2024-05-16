<script
  lang="ts"
  setup
>
  // imports
  import {
    DashboardFilled,
    AssistantRound,
    ReportFilled,
    AdminPanelSettingsRound,
    PeopleAltRound,
    DisplaySettingsRound,
    CategoryRound,
    GroupsRound,
    TranslateRound,
    RoomPreferencesRound,
    CreateNewFolderRound,
    InsertChartRound,
    PersonRound,
    SettingsRound
  } from "@vicons/material";
  import { NIcon } from "naive-ui";
  import {
    Person,
    Location,
    LogOut,
    DocumentText,
    ChatbubbleEllipses,
    Map,
  } from "@vicons/ionicons5";
  import { h } from "vue";

  // uses
  const u = {
    router: useRouter(),
    route: useRoute(),
  }; // e.o uses

  // stores
  const s = {
    auth: useAuthStore(),
  }; // e.o stores

  // data
  const d = reactive({
    selectedMenuKey: "",
  }); // e.o data

  // computeds
  const menuOptions = computed(() => {
    return {
      nav: [
        {
          label: 'Contacts',
          key: "contacts",
          icon: m.helpers.renderIcon(PersonRound),
        },
        {
          label: 'Groups',
          key: "groups",
          icon: m.helpers.renderIcon(GroupsRound),
        },
        {
          label: "Metrics",
          key: "metrics",
          icon: m.helpers.renderIcon(InsertChartRound),
        },
        {
          label: "Settings",
          key: "settings",
          icon: m.helpers.renderIcon(SettingsRound),
        },
      ],
      logout: [
        {
          label: "Logout",
          key: "logout",
          icon: m.helpers.renderIcon(LogOut, true),
        },
      ],
    };
  }); // e.o computeds

  // methods
  const m = {
    renderIcon:
      (icon: any, flipped = false) =>
        () =>
          h(NIcon, null, {
            default: () =>
              h(icon, { style: { transform: flipped ? "scaleX(-1)" : "none" } }),
          }),

    click: {
      nav(n: any) {
        u.router.push({ path: `/${n}` });
      },
      async logout() {
        await s.auth.logout()
      },
    },

    helpers: {
      renderIcon:
        (icon: any, flipped = false) =>
          () =>
            h(NIcon, null, {
              default: () =>
                h(icon, { style: { transform: flipped ? "scaleX(-1)" : "none" } }),
            }),

      checkIfCurrentPage: () => {
        const formattedRoute = u.route.path
          .replace("/", "")
          .split("/")
          .splice(0, 2)
          .join("/");
        d.selectedMenuKey =
          d.selectedMenuKey === u.route.path.replace("/", "")
            ? d.selectedMenuKey
            : formattedRoute;
      },
    },
  }; // e.o methods

  // watchers
  watch(
    () => u.route.path,
    (n, o) => {
      m.helpers.checkIfCurrentPage();
    }
  );
  // e.o watchers

  // init
  m.helpers.checkIfCurrentPage();
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="200"
    :native-scrollbar="false"
    class="navigation"
  >
    <n-scrollbar style="max-height: calc(100vh - 107px)">
      <n-menu
        v-model:value="d.selectedMenuKey"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions.nav"
        class="navigation-menu"
        @update:value="m.click.nav"
      />
    </n-scrollbar>

    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions.logout"
      style="position: absolute; bottom: 0px; width: 100%"
      class="navigation-menu"
      @update:value="m.click.logout"
    />
  </n-layout-sider>
</template>
