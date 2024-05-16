<template>
  <n-config-provider
    :theme="darkModeStore.theme.darkMode ? darkTheme : lightTheme"
    :theme-overrides="darkModeStore.theme.darkMode ? darkThemeOverrides : lightThemeOverrides"
  >
    <n-loading-bar-provider>
      <n-layout class="wrap">
        <slot />
      </n-layout>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, darkTheme, lightTheme } from "naive-ui";
const darkModeStore = useDarkModeStore();

const darkBg = '#17171B'
const darkBg2 = '#1B1C23'
const darkThemeOverrides = {
  common: {
    fontFamily: "'Exo2-Regular', sans-serif",
    fontSize: "14px",
    primaryColor: '#00b1f2',
    primaryColorHover: '#4acbf9',
    primaryColorPressed: '#008fc4',
    primaryColorSuppl: '#0085b6',
    bodyColor: darkBg2,
    baseColor: darkBg,
    tableColor: darkBg2,
    cardColor: darkBg2,
  },
  loadingBar: {
    colorLoading: '#00b1f2'
  }
};

const lightThemeOverrides = {
  common: {
    fontFamily: "'Exo2-Regular', sans-serif",
    fontSize: "14px",
    primaryColor: '#00b1f2',
    primaryColorHover: '#4acbf9',
    // primaryColorPressed: '#008fc4',
    // primaryColorSuppl: '#0085b6',
    // bodyColor: '#030f14',
    // baseColor: '#030f14',
    // tableColor: '#030f14',
    // cardColor: '#030f14',
  },
  loadingBar: {
    colorLoading: '#00b1f2'
  }
};
</script>

<style
  lang="scss"
  scoped
>
  .wrap {
    padding-top: calc(50vh - 170px);
    margin: 0px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
