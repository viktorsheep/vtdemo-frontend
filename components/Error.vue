<template>
  <n-result
    :status="status"
    :title="title"
    :description="description"
  >
    <template #footer>
      <n-button @click="handleError">Back to Home</n-button>
    </template>
  </n-result>
</template>
<script
  setup
  lang="ts"
>
  const props = defineProps({
    error: {
      type: Object,
      default: {
        statusCode: ''
      }
    },
  });
  const status = ref();
  const title = ref();
  const description = ref();
  const errors = ref([
    {
      status: "404",
      title: "404 Not Found",
      description: "You know life is always ridiculous.",
    },
    {
      status: "403",
      title: "403 Forbidden",
      description: "Some of the doors are always close to you.",
    },
    {
      status: "418",
      title: "418 I'm a Teapot",
      description: "In Chinese, teapot is a kind of 'Beiju', which means 'tragedy'.",
    },
    {
      status: "500",
      title: "500 Server Error",
      description: "Server error may prove that you need hiring more developers.",
    },
  ]);

  onMounted(() => {
    checkStatus();
  });

  const checkStatus = () => {
    const error = errors.value.find((e) => e.status === props.error.statusCode.toString());
    status.value = error ? error.status : "error";
    title.value = error ? error.title : "Error";
    description.value = error ? error.description : "It's red";

    console.log(error)
  };

  const handleError = () => {
    clearError({ redirect: "/" });
  };
</script>
