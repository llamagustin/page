<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import type { Email, EmailFilter, EmailLabel } from '@/@fake-db/types'
import ComposeDialog from '@/views/apps/email/ComposeDialog.vue'
import EmailLeftSidebarContent from '@/views/apps/email/EmailLeftSidebarContent.vue'
import EmailView from '@/views/apps/email/EmailView.vue'
import type { MoveEmailToAction } from '@/views/apps/email/useEmail'
import { useEmail } from '@/views/apps/email/useEmail'
import { useEmailStore } from '@/views/apps/email/useEmailStore'
import { useResponsiveLeftSidebar } from '@core/composable/useResponsiveSidebar'
import { formatDateToMonthShort } from '@core/utils/formatters'
import { useAccountListStore } from '@/views/apps/account/useAccountListStore'

import { avatarText } from '@core/utils/formatters'

// Socket.io Connection/Client
import { io } from "socket.io-client";
const socket = io("https://api.aythen.com")

// Composables
const route = useRoute()
const store = useEmailStore()
const accountStore = useAccountListStore()
const { isLeftSidebarOpen } = useResponsiveLeftSidebar()
let flexible = '';

const userData= JSON.parse(localStorage.userData);

socket.on('email-received', (email) => {
  if(email[0]?.to?.email.includes(userData.email)) {
    fetchEmails();
  }
})

const {
  labels,
  resolveLabelColor,
  emailMoveToFolderActions,
  shallShowMoveToActionFor,
  moveSelectedEmailTo,
} = useEmail()

// Compose dialog
const isComposeDialogVisible = ref(false)

// Ref
const q = ref('')

const leadsAssigned=ref([]);

// ------------------------------------------------
// Email Selection
// ------------------------------------------------
const selectedEmails = ref<Email['id'][]>([])

const toggleSelectedEmail = (emailId: Email['id']) => {
  const emailIndex = selectedEmails.value.indexOf(emailId)
  if (emailIndex === -1)
    selectedEmails.value.push(emailId)
  else selectedEmails.value.splice(emailIndex, 1)
}

const selectAllEmailCheckbox = computed(
  () => store.emails.length && store.emails.length === selectedEmails.value.length,
)

const isSelectAllEmailCheckboxIndeterminate = computed(
  () =>
    Boolean(selectedEmails.value.length)
    && store.emails.length !== selectedEmails.value.length,
)

const selectAllCheckboxUpdate = () => {
  selectedEmails.value = !selectAllEmailCheckbox.value
    ? store.emails.map(email => email.id)
    : []
}

// Email View
const openedEmail = ref<Email | null>(null)

const emailViewMeta = computed(() => {
  const returnValue = {
    hasNextEmail: false,
    hasPreviousEmail: false,
  }

  if (openedEmail.value) {
    const openedEmailIndex = store.emails.findIndex(
      e => e.id === (openedEmail.value as Email).id,
    )

    returnValue.hasNextEmail = !!store.emails[openedEmailIndex + 1]
    returnValue.hasPreviousEmail = !!store.emails[openedEmailIndex - 1]
  }

  return returnValue
})



// Fetch emails
const fetchEmails = async () => {
  selectedEmails.value = []
  
  var abilities = JSON.parse(localStorage.getItem('userAbilities'))
  var hasManage = abilities?.action == 'manage' ? 'manage' : false


  
  let filters={
    q: q.value,
    filter: route.params.filter as EmailFilter ,
    label: route.params.label as EmailLabel || '',
    id: userData.id,
    isDeleted: false,
    role: hasManage//userData.role
  };
  
  if(filters.filter == undefined && filters.label== undefined) {
    filters.filter='inbox'
    filters.label=''
  }
  await store.fetchEmails(filters)
}

/*
  ℹ️ You can optimize it so it doesn't fetch emails on each action.
    Currently, if you just star the email, two API calls will get fired.
      1. star the email
      2. Fetch all latest emails

    You can limit this to single API call by:
      - making API to star the email
      - modify the state (set that email's isStarred property to true/false)
        in the store instead of making API for fetching emails

  😊 For simplicity of the code and possible of modification, we kept it simple.
*/
const handleActionClick = async (
  action: 'trash' | 'unread' | 'read' | 'spam' | 'star' | 'unstar',
  emailIds: Email['id'][] = selectedEmails.value,
) => {
  
  if (!emailIds.length) return; 
    
  if (action === 'trash')
    await store.updateEmails(emailIds, { isDeleted: true, folder:'trash' })
  else if (action === 'spam')
    await store.updateEmails(emailIds, { folder: 'spam' })
  else if (action === 'inbox')
    await store.updateEmails(emailIds, { folder: 'inbox' })
  else if (action === 'unread')
   await  store.updateEmails(emailIds, { isRead: false })
  else if (action === 'read')
    await store.updateEmails(emailIds, { isRead: true })
  else if (action === 'star')
   await  store.updateEmails(emailIds, { isStarred: true })
  else if (action === 'unstar')
    await store.updateEmails(emailIds, { isStarred: false })

  await fetchEmails()
}

// fetch emails on search & route change
watch([q, () => route.params.filter, () => route.params.label], fetchEmails, {
  immediate: true,
})

// Reset opened email (close email view) when route is changed
watch([() => route.params.filter, () => route.params.label], () => {
  openedEmail.value = null
})

// Email actions
const handleMoveMailsTo = async (action: MoveEmailToAction) => {
  await moveSelectedEmailTo(action, selectedEmails.value)
  await fetchEmails()
}

const updateLabel = async (label: Email['labels'][number]) => {
  await store.updateEmailLabels(selectedEmails.value, label)
  await fetchEmails()
}

// Email view
const changeOpenedEmail = (dir: 'previous' | 'next') => {
  if (!openedEmail.value) return

  const openedEmailIndex = store.emails.findIndex(
    e => e.id === (openedEmail.value as Email).id,
  )

  const newEmailIndex = dir === 'previous' ? openedEmailIndex - 1 : openedEmailIndex + 1

  openedEmail.value = store.emails[newEmailIndex]
}

const openEmail = (email: Email) => {
  openedEmail.value = email

  handleActionClick('read', [email.id])
}

const refreshOpenedEmail = async () => {
  await fetchEmails()

  if (openedEmail.value) {
    openedEmail.value = store.emails.find(
      e => e.id === (openedEmail.value as Email).id,
    ) as Email
  }
}

const to = ref([])
onMounted(() => {
  const query_to = route.query.to;
  
  if(query_to){
    // accountStore.fetchByEmail(to).then(result => {
    accountStore.fetchLeads(userData.id, {
      q: query_to
    }).then( result => {
      console.log('r by email', query_to, result)
      if(result.length > 0){
        to.value = [result[0]]
        leadsAssigned.value = [result[0]]
        console.log('assigned', leadsAssigned.value)
        isComposeDialogVisible.value = true
      }
    })
  }else{
    accountStore.fetchLeads(userData.id, {
      verify: true
    }).then(res => {
        leadsAssigned.value = res
    }).catch(err => {
      console.log(err)
    })
  }

})

const eventEmail = async (data)=>{
  isComposeDialogVisible.value = true;
  // console.log('eventEmail parent:', data)
}


const toggleComposeDialog = () => {
  isComposeDialogVisible.value = !isComposeDialogVisible.value;
  
  flexible = 'flex-important';
}


//

</script>

<template>
  <VLayout class="email-app-layout">
    <VNavigationDrawer
      v-model="isLeftSidebarOpen"
      absolute
      touchless
      location="start"
      :temporary="$vuetify.display.mdAndDown"
    >
      
      <EmailLeftSidebarContent
        :userData="userData"
        :counters="store.emailsMeta"
        @toggle-compose-dialog-visibility="toggleComposeDialog()" />
      
    </VNavigationDrawer>
    <EmailView
      :folder="route.params.filter"
      :email="openedEmail"
      :email-meta="emailViewMeta"
      @eventMail="eventEmail"
      @refresh="refreshOpenedEmail"
      @navigated="changeOpenedEmail"
      @close="openedEmail = null"
      @remove="handleActionClick('trash', openedEmail ? [openedEmail.id] : [])"
      @read="handleActionClick('read', openedEmail ? [openedEmail.id] : [])"
      @unread="handleActionClick('unread', openedEmail ? [openedEmail.id] : [])"
      @star="handleActionClick('star', openedEmail ? [openedEmail.id] : [])"
      @unstar="handleActionClick('unstar', openedEmail ? [openedEmail.id] : [])"
    />
    <VMain>
      <VCard
        flat
        class="h-100 d-flex flex-column"
      >
        <div class="d-flex align-center">
          <VBtn
            variant="text"
            color="default"
            icon
            size="small"
            class="d-lg-none ms-3"
            @click="isLeftSidebarOpen = true"
          >
            <VIcon
              size="24"
              icon="tabler-menu-2"
            />
          </VBtn>
          <!-- 👉 Search -->
          <VTextField
            v-model="q"
            density="default"
            class="email-search px-1 flex-grow-1"
            prepend-inner-icon="tabler-search"
            placeholder="Buscar correo"
          />
        </div>

        <VDivider />

        <!-- 👉 Action bar -->
        <div class="py-2 px-5 d-flex items-center">
          <!-- TODO: Make checkbox primary on indeterminate state -->
          <VCheckbox
            :model-value="selectAllEmailCheckbox"
            :indeterminate="isSelectAllEmailCheckboxIndeterminate"
            @update:model-value="selectAllCheckboxUpdate"
          />

          <div
            class="w-100 d-flex items-center action-bar-actions"
            :style="{
              visibility:
                isSelectAllEmailCheckboxIndeterminate || selectAllEmailCheckbox
                  ? undefined
                  : 'hidden',
            }"
          >
            <!-- Trash -->
            <VBtn
              v-show="$route.params.filter !== 'trashed'"
              variant="text"
              color="default"
              icon
              size="small"
              @click="handleActionClick('trash')"
            >
              <VIcon
                size="22"
                icon="tabler-trash"
              />
            </VBtn>

            <!-- Mark unread -->
            <VBtn
              variant="text"
              color="default"
              icon
              size="small"
              @click="handleActionClick('unread')"
            >
              
              <VIcon size="22" icon="tabler-mail" />
            </VBtn>

            <!-- Move to folder -->
            <VBtn
              variant="text"
              color="default"
              icon
              size="small"
            >
              <VIcon
                size="22"
                icon="tabler-folder"
              />
              <VMenu activator="parent">
                <VList density="compact">
                  <template
                    v-for="moveTo in emailMoveToFolderActions"
                    :key="moveTo.title"
                  >
                    <VListItem
                      :class="shallShowMoveToActionFor(moveTo.action) ? 'd-flex' : 'd-none'"
                      href="#"
                      class="items-center"
                      @click="handleMoveMailsTo(moveTo.action)"
                    >
                      <template #prepend>
                        <VIcon
                          :icon="moveTo.icon"
                          class="me-2"
                          size="20"
                        />
                      </template>
                      <VListItemTitle class="text-capitalize">
                        {{ moveTo.action }}
                      </VListItemTitle>
                    </VListItem>
                  </template>
                </VList>
              </VMenu>
            </VBtn>

            <!-- Update labels -->
            <VBtn variant="text" color="default" icon size="small" >
              <VIcon
                size="22"
                icon="tabler-tag"
              />
              <VMenu activator="parent">
                <VList density="compact">
                  <VListItem
                    v-for="label in labels"
                    :key="label.title"
                    href="#"
                    @click="updateLabel(label.title)"
                  >
                    <template #prepend>
                      <VBadge inline :color="resolveLabelColor(label.title)" dot />
                    </template>
                    <VListItemTitle class="ms-2 text-capitalize">
                      {{ label.title }}
                    </VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </div>
          <VSpacer />
          <VBtn variant="text" color="default" icon size="small" @click="fetchEmails" >
            <VIcon size="22" icon="tabler-reload" />
          </VBtn>
          <!-- 
          <VBtn variant="text" color="default" icon size="small" >
            <VIcon size="22" icon="tabler-dots-vertical" />
          </VBtn>
          -->
        </div>
        <VDivider />

        <!-- 👉 Emails list -->
        <PerfectScrollbar
          tag="ul"
          :options="{ wheelPropagation: false }"
          class="email-list"
        >
          <li
            v-for="email in store.emails"
            v-show="store.emails.length"
            :key="email.id"
            class="email-item d-flex align-center py-2 px-5 cursor-pointer"
            :class="[{ 'email-read': !email.isRead }]"
            @click="openEmail(email)"
          >
            <VCheckbox
              :model-value="selectedEmails.includes(email.id)"
              class="flex-shrink-0"
              @update:model-value="toggleSelectedEmail(email.id)"
              @click.stop
            />
            <VBtn
              variant="text"
              icon
              size="small"
              class="me-2"
              :color="email.isStarred ? 'warning' : 'default'"
              @click.stop="
                handleActionClick(email.isStarred ? 'unstar' : 'star', [email.id])
              "
            >
              <VIcon
                size="22"
                icon="tabler-star"
              />
            </VBtn>
            <VAvatar variant="tonal"  class="me-3" size="38">
              <VImg v-if="email.from.avatar" :src="email.from.avatar" />
              <span v-else>{{ avatarText(email.from.name) }}</span>
            </VAvatar>
            <div>
              <div class="d-flex gap-2">
                <h6 class="text-body-1 font-weight-medium d-flex gap-2 text-high-emphasis">
                  {{ email.from.name }}
                  <div v-if="email.from?.email">
                    &lt;{{ email.from.email }}&gt;
                  </div>
                </h6>
              </div>
              <span class="truncate">
                {{ email.subject }} 
                &nbsp; - &nbsp;
                {{ email.to[0] }}
              </span>
            </div>
            <VSpacer />
            <div class="email-meta">
              <VBadge v-for="label in email.labels" :key="label" inline :color="resolveLabelColor(label)" dot />
              <small class="text-disabled ms-2">{{ formatDateToMonthShort(email.time) }}</small>
            </div>

            <!-- 👉 Email actions -->
            <div class="email-actions d-none">
                <div v-if="email.folder === 'spam' || email.folder === 'trash'">
                  <VBtn
                    variant="text" color="default" icon size="small"
                    @click.stop="handleActionClick('inbox', [email.id])"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>   <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>   <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path></svg>
                  </VBtn> 
                </div>
                <div v-else>
                  <VBtn 
                    variant="text" color="default" icon size="small" 
                    @click.stop="handleActionClick('trash', [email.id])" >
                    <VIcon size="22" icon="tabler-trash" />
                  </VBtn>
                  <VBtn 
                    v-if="email.isRead"
                    variant="text"
                    :title="`Marcar como leído`"
                    color="default" icon size="small"
                    @click.stop="handleActionClick('unread', [email.id])">
                    <VIcon size="22" icon="tabler-mail-opened" />
                  </VBtn>
                  <VBtn 
                    v-if="!email.isRead"
                    variant="text"
                    :title="`Marcar como leído`"
                    color="default" icon size="small"
                    @click.stop="handleActionClick('read', [email.id])">
                    <VIcon size="22" icon="tabler-mail" />
                  </VBtn>
                  <VBtn
                    variant="text" color="default" icon size="small"
                    @click.stop="handleActionClick('spam', [email.id])"
                  >
                    <VIcon size="22" icon="tabler-alert-octagon" />
                  </VBtn>
                </div>
            </div>
          </li>
          <li
            v-show="!store.emails.length"
            class="py-4 px-5 text-center"
          >
            <span class="text-high-emphasis">BANDEJA VACÍA</span>
          </li>
        </PerfectScrollbar>
      </VCard>
      <ComposeDialog 
        :email="openedEmail"
        :class="flexible"
        :to="to"
        :leads="leadsAssigned"
        :userData="userData"
        v-show="isComposeDialogVisible"
        @close="isComposeDialogVisible = false"
      />
      <!--<ComposeDialog -->
      <!--  :style="'display:none;'"-->
      <!--  :email="openedEmail"-->
      <!--  :leads="leadsAssigned"-->
      <!--  :userData="userData"-->
      <!--  v-if="!isComposeDialogVisible"-->
      <!--  @close="isComposeDialogVisible = false"-->
      <!--/>-->
    </VMain>
  </VLayout>
</template>

<route lang="yaml">
meta:
  layoutWrapperClasses: layout-content-height-fixed
</route>

<style lang="scss">
@use "@/styles/variables/_vuetify.scss";
@use "@core/scss/base/_mixins.scss";
@use "vuetify/lib/styles/tools/elevation" as elevation;

// ℹ️ Remove border. Using variant plain cause UI issue, caret isn't align in center
.email-search {
  .v-field__outline {
    display: none;
  }
}

.email-app-layout {
  height: calc(100vh - 200px);
  border-radius: vuetify.$card-border-radius;

  @include elevation.elevation(vuetify.$card-elevation);

  $sel-email-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-email-app-layout);
    }
  }
}

.email-list {
  white-space: nowrap;
  max-height:640px;

  .email-item {
    transition: all 0.2s ease-in-out;
    will-change: transform, box-shadow;

    &.email-read {
      background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
    }

    & + .email-item {
      border-block-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }

  .email-item:hover {
    transform: translateY(-2px);

    @include elevation.elevation(3);

    .email-actions {
      display: block !important;
    }

    .email-meta {
      display: none;
    }

    + .email-item {
      border-color: transparent;
    }
  }
}

.email-compose-dialog {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 0;
  min-inline-size: 100%;

  @media only screen and (min-width: 800px) {
    min-inline-size: 712px;
  }
}
</style>

