export const useCrudStore = defineStore("modelData", () => {
  const modelData = ref<Array<object>>([]);
  const total = ref();
  const pageCount = ref();
  const currentPage = ref(1);
  const currentPageSize = ref(10);
  const config = useRuntimeConfig()

  async function fetch(url: string) {
    const { data, error } = await useApiFetch(url) as Record<string, any>;

    if (error?.value) {
      console.log(error);
      showError({
        statusCode: error.value.statusCode
      })
    }

    if (data?.value) {
      if (data.value.current_page > data.value.last_page) {
        const newUrl = url.replace(
          `page=${data.value.current_page}`,
          `page=${data.value.last_page}`
        );
        const res = await useApiFetch(newUrl) as Record<string, any>;
        modelData.value = res.data.value.data as Array<object>;
        total.value = res.data.value.total;
        pageCount.value = res.data.value.last_page;
        currentPage.value = res.data.value.current_page;
        currentPageSize.value = res.data.value.per_page;

        return res.data.value;
      }

      modelData.value = data.value.data as Array<object>;
      total.value = data.value.total;
      pageCount.value = data.value.last_page;
      currentPage.value = data.value.current_page;
      currentPageSize.value = data.value.per_page;
    }
  }

  async function add(url: string, payload: Object, push: Boolean = true) {
    const fetchData = await useApiFetch(url, {
      method: "POST",
      body: payload,
    });

    if (fetchData.data.value && push === true) {
      modelData.value.push(fetchData.data.value as Object);
    }


    return fetchData;
  }

  async function edit(url: string, payload: Object) {
    const fetchData = await useApiFetch(url, {
      method: "PUT",
      body: payload,
    });

    return fetchData;
  }

  async function deleteData(url: string, id: String) {
    const fetchData = await useApiFetch(url, {
      method: "DELETE",
    });

    if (!fetchData.error.value) {
      const index = modelData.value
        .map((a: Record<string, any>) => {
          return a.id;
        })
        .indexOf(id);
      modelData.value.splice(index, 1);
    }

    return fetchData;
  }

  return {
    modelData,
    total,
    pageCount,
    currentPage,
    currentPageSize,
    fetch,
    add,
    edit,
    deleteData,
  };
});
