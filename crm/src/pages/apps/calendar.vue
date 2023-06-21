<script setup lang="ts">
import '@fullcalendar/core/vdom' // solves problem with Vite
// Local imports
import CalendarActivityTimeline from '@/views/apps/calendar/CalendarActivityTimeline.vue'
import FullCalendar from '@fullcalendar/vue3'
import { blankEvent, useCalendar } from '@/views/apps/calendar/useCalendar'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import { useResponsiveLeftSidebar } from '@core/composable/useResponsiveSidebar'
import { requiredValidator } from '@validators'
import UserEventHandler from '@/views/apps/user/list/UserEventHandler.vue'
import { computed, ref, watch, onMounted} from "vue"
import { useUser } from '@/views/apps/user/useUser'
import MiniMoment from "@/shared/utils/MiniMoment";

// 👉 Store
const store = useCalendarStore()
const { updateUser }  = useUser()

// 👉 Event
const event = ref({...blankEvent})
const isUserHandlerSidebarActive = ref(false)

watch(isUserHandlerSidebarActive, val => {
  if (!val) {
    event.value = initialEvent()
  }
})

const { isLeftSidebarOpen } = useResponsiveLeftSidebar()
// 👉 useCalendar
const {
  refCalendar,
  calendarOptions,
  addEvent,
  updateEvent,
  removeEvent,
  jumpToDate,
  refetchEvents
} = useCalendar(event, isUserHandlerSidebarActive, isLeftSidebarOpen);
// SECTION Sidebar
// 👉 Check all
const checkAll = computed({
  /*
    GET: Return boolean `true` => if length of options matches length of selected filters => Length matches when all events are selected
    SET: If value is `true` => then add all available options in selected filters => Select All
    Else if => all filters are selected (by checking length of both array) => Empty Selected array  => Deselect All
  */
  get: () => store.selectedCalendars.length === store.availableCalendars.length,
  set: val => {
    if (val)
      store.selectedCalendars = store.availableCalendars.map(i => i.label)
    else if (store.selectedCalendars.length === store.availableCalendars.length)
      store.selectedCalendars = []
  },
})

// 'c82c5d22-68f8-49ae-a464-e3aadb8383cd'

onMounted(() => {
  getAuthData()
});

watch(() => store.filterPriority, () => {
  refetchEvents()
})

const filtersPriority = computed(() => {
  return [
    {color: 'success',label: 'todos'},
    ...store.availableCalendars,
  ]
})

const Auth = ref({});
function getAuthData() {
  try {
    const data = JSON.parse(window.localStorage.getItem('userData'));
    Auth.value = data;
  } catch (e) {
    console.log("Your Navigator no support LocalStorage");
  }
}

function openMenuModal() {
  store.leadId = null;
  store.priority = 'medium';
  isUserHandlerSidebarActive.value = true;
}

function initialEvent() {
  const now = MiniMoment.createFormatToCalendar(new Date());
  const latter = MiniMoment.addAnHour(new Date());
  
  return {
    title: "",
    start: now,
    end: latter,
    allDay: false,
    lead_id: null,
    extendedProps: {
      calendar: undefined,
      guests: [],
      location: "",
      description: "",
    },
  }
}

const extractEventDataFromEventApi = (eventApi) => {
  // @ts-expect-error EventApi has extendProps type Dictionary (Record<string, any>) and we have fully typed extended props => Type conflict
  const {
    id,
    title,
    start,
    end,
    extendedProps: {
      calendar,
      guests,
      location,
      description
    },
    lead_id,
    priority,
    allDay
  } = eventApi
  return {
    id,
    title,
    start,
    end,
    lead_id,
    priority,
    extendedProps: {
      calendar,
      guests,
      location,
      description,
    },
    allDay,
  }
}

function handleOpenEvent(event) {
  const { user, ...allData } = event;
  const currentEvent = extractEventDataFromEventApi(allData);
  store.leadId = currentEvent.lead_id;
  store.priority = currentEvent.priority;
  event.value = currentEvent;
  // isUserHandlerSidebarActive.value = true;
}
</script>

<template>
  <div>
    <VCard>
      <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
      <VLayout style="z-index: 0;">
        <!-- 👉 Navigation drawer -->
        <VNavigationDrawer
          v-model="isLeftSidebarOpen"
          width="292"
          absolute
          touchless
          location="start"
          class="calendar-add-event-drawer custom-scroll"
          intersect
          :temporary="$vuetify.display.mdAndDown"
        >
          <div style="margin: 1.4rem;">
            <VRow>
              <VCol cols="3">
                <VBtn
                  class="text-center"
                  block
                  @click="openMenuModal">
                  <VIcon icon="tabler-plus"/>
                </VBtn>
              </VCol>
              <!-- 👉 Status -->
              <VCol cols="9">
                <VSelect
                  v-model="store.filterPriority"
                  label="Priority"
                  :items="filtersPriority"
                  :item-title="item => item.label"
                  :item-value="item => item.label"
                  class="text-capitalize"
                >
                  <template #selection="{ item }">
                    <div
                      class="align-center text-capitalize"
                      :class="event.extendedProps.calendar ? 'd-flex' : ''"
                    >
                      <VBadge
                        :color="item.raw.color"
                        inline
                        dot
                        class="pa-1"
                      />
                      <span>{{ item.raw.label }}</span>
                    </div>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
          </div>
          <VDivider />
          <div>
            <p class="font-weight-bold mb-0 pa-2 text-primary">Menu</p>
            <CalendarActivityTimeline 
              @open-event-from-list="handleOpenEvent"
            />
          </div>
        </VNavigationDrawer>

        <VMain>
          <VCard flat>
            <FullCalendar
              ref="refCalendar"
              :options="calendarOptions"
            />
          </VCard>
        </VMain>
      </VLayout>
    </VCard>
    <UserEventHandler
      type-form="event"
      v-model:isDrawerOpen="isUserHandlerSidebarActive"
      :event="event"
      :user="Auth"
      @add-event="addEvent"
      @update-event="updateEvent"
      @remove-event="removeEvent"
      @update-user="updateUser"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/libs/full-calendar";

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

.calendar-add-event-drawer {
  &.v-navigation-drawer {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }
}

.calendar-date-picker {
  display: none;

  +.flatpickr-input {
    +.flatpickr-calendar.inline {
      border: none;
      box-shadow: none;

      .flatpickr-months {
        border-block-end: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}
</style>
