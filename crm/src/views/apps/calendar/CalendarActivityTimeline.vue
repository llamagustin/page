<script setup lang="ts">
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import MiniMoment from "@/shared/utils/MiniMoment"
import ImgDefaultAvatar from "@/assets/images/avatars/default-avatar.jpg"
import { defineEmits } from 'vue'

interface Emits {
  (e: 'openEventFromList', value): void;
}

const emit = defineEmits<Emits>()

const calendarStore = useCalendarStore();
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#ED6B6C'
    case 'medium': return '#FFAC5C'
    default: return '#B4B5B9'
  }
}

const getUserData = (userId: string) => {
  if(!userId && !calendarStore.users.length) return '-'
  const user = calendarStore.users.find(user => user.id === userId)
  return 'Found';
}

function openEventFromList(event) {
  emit('openEventFromList', event)
}

</script>

<template>
  <VCard :style="{boxShadow: 'none'}">
    <VCardText class="pt-2 px-1 ">
      <VTimeline
        v-if="calendarStore.allEvents.length"
        side="end"
        align="start"
        truncate-line="both"
        density="compact"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="item in calendarStore.allEvents"
          :key="item.id"
          :dot-color="getPriorityColor(item.priority)"
          size="x-small"
          class="time-line-custom"
        >
          <div class="d-flex justify-space-between gap-2">
            <h6 class="text-subtitle-2 font-weight-semibold">
              <!-- event-title @click="openEventFromList(item)" -->
              {{ item.title }}
            </h6>
          </div>
          <div class="d-flex align-center">
            <VAvatar
              :image="item?.user?.avatar || ImgDefaultAvatar"
              class="me-3"
            />
            <div class="text-sm">
              <span class="text-primary">Lead</span>
              <p class="mb-0 name-client">{{ item?.user?.fullName }}</p>
            </div>
          </div>
           <p class="mb-0" v-if="!item.allDay">
            <span class="mb-2 font-weight-bold text-sm-caption mr-2">
              {{ MiniMoment.formatDateWithHour(item.start) }}
            </span>
          </p>
          <p v-else>
            <span class="mb-2 font-weight-bold text-sm-caption mr-2">
              {{ MiniMoment.formatDateWithoutHour(item.start) }}
            </span>
            <span 
              class="mb-2 font-weight-bold text-sm-caption">
              <VChip
                color="primary"
                size="x-small"
                variant="elevated">
                All Day
              </VChip>
            </span>
          </p>
        </VTimelineItem>
      </VTimeline>
      <template v-else>
          <VCol cols="12">
            <p class="mb-0 text-center">
              <VIcon 
                icon="mdi-calendar-badge-outline" 
                size="50" 
                color="secondary"
                class="mb-4"
              />
              <br />
              <span class="text-secondary  font-10">Sin eventos</span>
            </p>
          </VCol>
        </template>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
  .v-timeline-item__body {
    padding-inline-start: 10px !important;
  }
  
  .event-title {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  
  .time-line-custom {
    .event-title {
      line-height: 1.15 !important;
    }
    .name-client {
      line-height: 1 !important;
    }
  }
</style>