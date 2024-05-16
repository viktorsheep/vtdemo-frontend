<template>
  <n-config-provider
    :theme="s.darkMode.theme.darkMode ? darkTheme : lightTheme"
    :theme-overrides="s.darkMode.theme.darkMode ? darkThemeOverrides : lightThemeOverrides"
  >
    <n-space vertical>
      <n-layout>
        <n-layout-header
          bordered
          class="header"
        >
          <n-grid
            cols="2"
            item-responsive
          >
            <n-grid-item>
              <div class="header-left">
                <n-text type="primary">VENTURE</n-text>
              </div>
            </n-grid-item>

            <n-grid-item>
              <IncludesHeader />
            </n-grid-item>
          </n-grid>
        </n-layout-header>

        <!-- LAYOUT -->
        <n-layout
          has-sider
          class="my-body"
        >
          <IncludesNavigation />
          <n-layout class="wrap-content">
            <n-scrollbar style="max-height: calc(100vh - 111px)">
              <n-layout-content class="page-content">
                <slot />
              </n-layout-content>
              <n-back-top
                :right="10"
                :bottom="60"
              />
            </n-scrollbar>
            <!-- e.o CONTENT -->

            <!-- FOOTER -->
            <n-layout-footer
              bordered
              class="footer"
            >
              <n-text depth="3">
                <!-- {{ u.dict.translate('footer', 'name', s.lang.currentLang) }} -->
                Copyright Venture Records &copy; 2024. All rights reserved.
                <!-- rights reserved. -->
              </n-text>
            </n-layout-footer>
            <!-- e.o FOOTER -->
          </n-layout>
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script setup>
  import { darkTheme, lightTheme, useNotification } from "naive-ui";

  // const u = {
    // dict: useDict(),
    // notification: useNotification()
  // }

  const s = {
    // lang: useLanguagesStore(),
    // notification: useNotificationStore(),
    // conversation: useConversationsStore()
    darkMode: useDarkModeStore()
  }
  // const darkModeStore = useDarkModeStore();

  import "assets/css/fonts.css";

  // constants
  const darkBg = '#17171B'
  const darkBg2 = '#1B1C23'
  const darkThemeOverrides = {
    common: {
      fontFamily: "'Exo2-Regular', sans-serif",
      fontSize: "14px",
      primaryColor: '#17badf',
      primaryColorHover: '#4acbf9',
      primaryColorPressed: '#008fc4',
      primaryColorSuppl: '#0085b6',
      bodyColor: darkBg,
      baseColor: darkBg,
      tableColor: darkBg2,
      cardColor: darkBg2,
    },
  };

  const lightThemeOverrides = {
    common: {
      fontFamily: "'Exo2-Regular', sans-serif",
      fontSize: "14px",
      primaryColor: '#17badf',
      primaryColorHover: '#4acbf9',
      // primaryColorPressed: '#008fc4',
      // primaryColorSuppl: '#0085b6',
      // bodyColor: '#030f14',
      // baseColor: '#030f14',
      // tableColor: '#030f14',
      // cardColor: '#030f14',
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  body {
    font-family: "Exo2-Regular", sans-serif;
  }

  .header {
    &-right {
      padding: 0px;
      padding-right: 20px;
      margin: 0px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 60px;
    }

    &-left {
      padding: 0px;
      padding-left: 20px;
      margin: 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 60px;
      font-size: 20px;
      font-weight: 900;
    }
  }

  .footer {
    padding: 0px;
    margin: 0px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navigation-menu {
    color: red;
  }

  .my-body {
    padding: 0px;
    margin: 0px;
    height: calc(100vh - 61px);

    .navigation {
      .navigation-menu {
        color: red;
      }
    }
  }

  .wrap-content {
    height: calc(100vh - 61px);
  }

  .page-content {
    padding: 10px;
    padding-right: 13px;
    margin: 0px;
  }
</style>
