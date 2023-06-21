<script setup lang="ts">
  import Notifications from '@core/components/Notifications.vue'
  import { useAlerts } from '@/shared/composables/useAlerts'
  import { ref, onMounted } from 'vue'
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
  import { avatarText } from '@core/utils/formatters'
  import { useIntersectionObserver } from '@vueuse/core'
  
  import Debug from "@/shared/utils/debugger";
  
  const auth = JSON.parse(window.localStorage.userData);
  
  const { fetchAlerts, updateAlert } = useAlerts();
  const alertList = ref([]);
  const pages = ref(1);
  const currentPage = ref(0);
  
  async function loadData(page = 1) {
    const data = await fetchAlerts({
      perPage: 20,
      currentPage: page,
      user_id: auth.id
    });
    
    pages.value = data.countPages;
    alertList.value.push(...data.data)
  }
  
  // 👉 POINTER
  const pointer = ref(null);
  
  useIntersectionObserver(pointer,([{ isIntersecting }]) => {
      if (isIntersecting && currentPage.value < pages.value) {
        currentPage.value += 1;
        loadData(currentPage.value)
      }
    },
  )
  
  async function markAsRead(notification) {
    try {
      let seen = !notification.seen;
      await updateAlert(notification.id, { seen });
      notification.seen = seen;
    } catch (e) {
      console.error('Error');
    }
  }
</script>

<template>
  <VRow justify="center">
    <VCol cols="12" sm="12" md="5">
      <v-card title="Notifications">
        <template #text>
          <PerfectScrollbar>
            <template v-if="alertList.length">
              <VList :lines="false" class="py-0">
                <VListItem
                  class="mb-1"
                  v-for="notification in alertList"
                  :key="notification.id"
                  :title="notification.title"
                  :subtitle="notification.subtitle"
                  min-height="66px"
                  link
                  :class="{ 'bg-light-primary': !notification.seen }"
                  @click="!notification.seen ? markAsRead(notification) : ''"
                >
                  <template #prepend>
                    <VListItemAction start>
                      <VAvatar :color="notification.color || 'primary'" :image="notification.img || undefined" :icon="notification.icon || undefined" size="40" variant="tonal">
                        {{ avatarText(notification.title) }}
                      </VAvatar>
                    </VListItemAction>
                  </template>
                  <template v-slot:subtitle="{ subtitle }">
                    <span class="text-caption" v-text="notification.description"></span>
                  </template>
                </VListItem>
                <template >
                  <VDivider />
                </template>
              </VList>
            </template>
            <div v-else class="text-center">
              <v-icon icon="tabler-bell-off" size="42" class="mb-1" />
              <p class="mb-0">No hay notificaciones.</p>
            </div>
            <div ref="pointer"></div>
          </PerfectScrollbar>
        </template>
      </v-card>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.ps {
  height: 100%;
  max-height: 70vh;
}
</style>
