<template>
  <n-notification-provider>
    <NuxtLayout>
      <n-loading-bar-provider>
        <n-message-provider>
          <n-modal-provider>
            <n-dialog-provider>
              <NuxtPage />
            </n-dialog-provider>
          </n-modal-provider>
        </n-message-provider>
      </n-loading-bar-provider>
      <!-- <n-theme-editor /> -->
    </NuxtLayout>
  </n-notification-provider>
</template>
