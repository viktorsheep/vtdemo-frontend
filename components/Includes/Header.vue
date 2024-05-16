<script
  lang="ts"
  setup
>
  import { RefreshCircle } from "@vicons/ionicons5";
  const router = useRoute();

  watch(
    () => router.path,
    (n, o) => {
      setName();
    }
  );

  // uses
  const u = {
  }

  // stores
  const s = {
  }

  const pageName = reactive({
    name: "",
  });

  const setName = () => {
    const pn = router.path.split("/"); // page names
    const lastN: any = typeof pn.at(-1) !== "undefined" ? pn.at(-1) : 0;
    const secondLastN: any = pn.at(-2);
    pageName.name = isNaN(lastN)
      ? lastN.replaceAll("-", " ")
      : secondLastN.replaceAll("-", " ");

    let formattedName = isNaN(lastN) ? lastN.replaceAll('-', '_') : secondLastN.replaceAll('-', '_')

    pageName.name = formattedName
  };

  setName();
</script>

<template>
  <div class="page-name">
    <n-text depty="1">
      {{ pageName.name }}
    </n-text>
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .page-name {
    height: 60px;
    line-height: 60px;
    text-align: right;
    padding-right: 10px;
    /* opacity: 0.4; */
    font-size: 16px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1.05px;
  }
</style>
