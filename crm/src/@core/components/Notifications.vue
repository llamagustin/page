<script lang="ts" setup>
import type { Anchor } from 'vuetify/lib/components'
import { avatarText } from '@core/utils/formatters'
import type { Notification } from '@layouts/types'
import { ref ,computed } from 'vue'
import { useAlerts } from "@/shared/composables/useAlerts"
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  notifications: Notification[]
  badgeProps?: unknown
  location?: Anchor
}

const props = withDefaults(defineProps<Props>(), {
  location: 'bottom end',
  badgeProps: undefined,
})

defineEmits<{
  (e: 'click:readAllNotifications'): void
}>()


const { updateAlert } = useAlerts();
const unreadNotifications = computed(() => props.notifications.filter(c => !c.seen).length)


async function markAsRead(notification) {
  try {
    let seen = !notification.seen;
    await updateAlert(notification.id, { seen });
    notification.seen = seen;
  } catch (e) {
    console.error('Error');
  }
}

function handleClick() {
  console.log('Read')
}
</script>

<template>
  <VBadge
    :model-value="!!props.badgeProps"
    v-bind="props.badgeProps"
  >
    <VBtn
      icon
      variant="text"
      color="default"
      size="small"
      title="Actions"
    >
      <VBadge :model-value="!!notifications.length" color="error" :content="unreadNotifications">
        <VIcon icon="tabler-bell" size="24" />
      </VBadge>
      
      <VMenu activator="parent" width="380px" :location="props.location" offset="14px">
        <VList class="py-0">
          <!-- 👉 Header -->
          <VListItem title="Notifications" class="notification-section" height="48px">
            <template #append>
              <VChip v-if="unreadNotifications" color="primary" size="small">
                {{ unreadNotifications }} New
              </VChip>
            </template>
          </VListItem>
          <VDivider />
          
          <!-- 👉 Notifications list -->
          <template
            v-for="notification in notifications"
            :key="notification.title"
          >
            <VListItem
              :title="notification.title"
              :subtitle="notification.subtitle"
              link
              lines="one"
              min-height="66px"
              :class="{ 'bg-light-primary': !notification.seen }"
              @click="markAsRead(notification)"
            >
              <!--@click="!notification.seen ? markAsRead(notification) : ''"-->
              <!-- Slot: Prepend -->
              <!-- Handles Avatar: Image, Icon, Text -->
              <template #prepend>
                <VListItemAction start>
                  <VAvatar
                    :color="notification.color || 'primary'"
                    :image="notification.img || undefined"
                    :icon="notification.icon || undefined"
                    size="40"
                    variant="tonal"
                  >
                    {{ avatarText(notification.title) }}
                  </VAvatar>
                </VListItemAction>
              </template>
              <!-- Slot: Append -->
              <template v-slot:subtitle="{ subtitle }">
                <!--<div v-html="subtitle"></div>-->
                <span class="text-caption nofity-description" v-text="notification.description"></span>
                <!--something-->
              </template>
              <!--<template #append>-->
              <!--  <small class="whitespace-no-wrap text-medium-emphasis">{{ notification.time }}</small>-->
              <!--</template>-->
            </VListItem>
            <VDivider />
          </template>
          
          
          <!-- 👉 Footer -->
          <VListItem class="notification-section">
            <VBtn block to="/apps/account/notifications">
              READ ALL NOTIFICATIONS
            </VBtn>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </VBadge>
</template>

<style lang="scss">
.notification-section {
  padding: 14px !important;
}
.nofity-description {
  max-height: 3em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  line-height: 1;
}
</style>
