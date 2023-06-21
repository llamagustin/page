<script lang="ts" setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useDisplay } from 'vuetify'
import ChatActiveChatUserProfileSidebarContent from '@/views/apps/chat/ChatActiveChatUserProfileSidebarContent.vue'
import ChatLeftSidebarContent from '@/views/apps/chat/ChatLeftSidebarContent.vue'
import ChatLog from '@/views/apps/chat/ChatLog.vue'
import { useChat } from '@/views/apps/chat/useChat'
import { useChatStore } from '@/views/apps/chat/useChatStore'
import { useResponsiveLeftSidebar } from '@core/composable/useResponsiveSidebar'
import { avatarText } from '@core/utils/formatters'
import { io } from "socket.io-client";

const MAIN_PHONE_NUMBER = '+34 631 83 13 83';

const socket = io(window.location.origin, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "my-custom-header"
  }
})

// socket.on("connect", () => {
//   console.log("Conectado al servidor Socket.io");
// });


socket.on('received-message', (data) => {
  if(data) {
    const index = store.chats.findIndex(chat => chat.user_id == data.user);
    if(index > -1)store.chats[index].messages.push(data)
    if(store.activeChat?.user_id == data.user) {
      store.activeChat.messages.push(data)
      scrollToBottomInChatLog()
    }
  }
})

// socket.emit("mensaje", "Hola, servidor Socket.io");

const userData = JSON.parse(localStorage.getItem('userData')) || {};

// composables
const vuetifyDisplays = useDisplay()
const store = useChatStore()


const { isLeftSidebarOpen } = useResponsiveLeftSidebar(vuetifyDisplays.smAndDown)
const { resolveAvatarBadgeVariant } = useChat()

// Perfect scrollbar
const chatLogPS = ref()

const scrollToBottomInChatLog = () => {
  const scrollEl = chatLogPS.value.$el || chatLogPS.value

  scrollEl.scrollTop = scrollEl.scrollHeight
}

// Search query
const q = ref('')
var timeSearch

const onSearchContact = (val) => {
  clearTimeout(timeSearch)
  timeSearch = setTimeout(async function(){
    // await store.fetchChatsAndContacts(userData.id, val)
    q.value = val
  }, 500);
}

watch(q, val => {
  // console.log('ini chat', store)
  // console.log('eemei', userData.id)
  store.fetchChats(userData.id, val)
}, { immediate: true })





// Open Sidebar in smAndDown when "start conversation" is clicked
const startConversation = () => {
  if (vuetifyDisplays.mdAndUp.value)
    return
  isLeftSidebarOpen.value = true
}

// Chat message
const msg = ref('')

const sendMessage = async () => {
  if (!msg.value?.trim())
    return
    
  await store.sendMsg(userData, store.activeChat.contact, msg.value)

  // Reset message input
  msg.value = ''

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog()
  })
}

const openChatOfContact = async (user) => {
  // console.log('a')
  // console.log({ user })
  await store.getChat(user)

  // Reset message input
  msg.value = ''

  // Set unseenMsgs to 0
  // const contact = store.chats.find(c => c.id === userId)
  // if (contact)
    // contact.chat.unseenMsgs = 0
    
    //console.log('c', contact)

  // if smAndDown =>  Close Chat & Contacts left sidebar
  if (vuetifyDisplays.smAndDown.value){
    isLeftSidebarOpen.value = false
  }

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog()
  })
}




// User profile sidebar
const isUserProfileSidebarOpen = ref(false)

// Active chat user profile sidebar
const isActiveChatUserProfileSidebarOpen = ref(false)

// file input
const refInputEl = ref<HTMLElement>()




//
const getNameUser = (name) => {
  if(name.name){
    return name.name + ' ' + name?.firstSurname || '' + ' ' + name?.firstSurname || ''
  }else{
    return 'NEW LEAD'
  }
}

</script>

<template>
  <VLayout class="chat-app-layout bg-surface">
    <!-- 👉 user profile sidebar -->
    <!--
    <VNavigationDrawer
      v-model="isUserProfileSidebarOpen"
      temporary
      touchless
      absolute
      class="user-profile-sidebar"
      location="start"
      width="370"
    >
      <ChatUserProfileSidebarContent @close="isUserProfileSidebarOpen = false" />
    </VNavigationDrawer>
    -->

    <!-- 👉 Active Chat sidebar -->
    <VNavigationDrawer
      v-model="isActiveChatUserProfileSidebarOpen"
      width="374"
      absolute
      temporary
      location="end"
      touchless
      class="active-chat-user-profile-sidebar"
    >
      <ChatActiveChatUserProfileSidebarContent @close="isActiveChatUserProfileSidebarOpen = false" />
    </VNavigationDrawer>



    <!-- 👉 Left sidebar   -->
    
    <VNavigationDrawer
      v-model="isLeftSidebarOpen"
      absolute
      touchless
      location="start"
      width="370"
      :temporary="$vuetify.display.smAndDown"
      class="chat-list-sidebar"
      :permanent="$vuetify.display.mdAndUp"
    >
      <ChatLeftSidebarContent
        v-model:isDrawerOpen="isLeftSidebarOpen"
        v-model:search="q"
        @on-search-contact="onSearchContact"
        @open-chat-of-contact="openChatOfContact"
        @show-user-profile="isUserProfileSidebarOpen = true"
        @close="isLeftSidebarOpen = false"
      />
    </VNavigationDrawer>

    <!-- 👉 Chat content -->
    <VMain class="chat-content-container" style="max-height: calc(100vh - 200px); min-height: calc(100vh - 200px)">
      <!---->
      <!-- 👉 Right content: Active Chat -->
      <div
        v-if="store.activeChat"
        class="d-flex flex-column h-100"
      >
        <!-- 👉 Active chat header -->
        <div class="active-chat-header d-flex align-center text-medium-emphasis">
          <!-- Sidebar toggler -->
          <VBtn
            variant="text"
            color="default"
            icon
            size="small"
            class="d-md-none me-3"
            @click="isLeftSidebarOpen = true"
          >
            <VIcon
              size="24"
              icon="tabler-menu-2"
            />
          </VBtn>

          <!-- avatar -->
          <div
            class="d-flex align-center cursor-pointer"
            @click="isActiveChatUserProfileSidebarOpen = true"
          >
            <VBadge
              dot
              location="bottom right"
              offset-x="3"
              offset-y="3"
              :color="resolveAvatarBadgeVariant(store.activeChat.contact?.status)"
              bordered
            >
              <VAvatar
                size="40"
                variant="tonal"
                :color="resolveAvatarBadgeVariant(store.activeChat.contact?.status)"
                class="cursor-pointer"
              >
                <VImg
                  v-if="store.activeChat.contact?.avatar"
                  :src="store.activeChat.contact?.avatar"
                  :alt="store.activeChat.contact?.fullName"
                />
                <span v-else>{{ avatarText(store.activeChat.contact?.name?.name || '?') }}</span>
              </VAvatar>
            </VBadge>
            <div class="flex-grow-1 ms-4 overflow-hidden">
              <h6 class="text-base font-weight-regular">
                {{ getNameUser(store.activeChat.contact?.name) }}
              </h6>
              <span class="d-block text-sm text-truncate text-disabled">{{ store.activeChat.contact?.phone }}</span>
            </div>
          </div>

          <VSpacer />

          <!-- Header right content -->
          <div class="d-sm-flex align-center d-none">
            <!--
            <VBtn
              variant="text"
              color="default"
              icon
              size="small"
            >
              <VIcon
                size="22"
                icon="tabler-phone"
              />
            </VBtn>
            -->
            
            <VBtn
              v-if="false"
              variant="text"
              color="default"
              icon
              size="small"
            >
              <VIcon
                size="22"
                icon="tabler-video"
              />
            </VBtn>
            <VBtn
              v-if="false"
              variant="text"
              color="default"
              icon
              size="small"
            >
              <VIcon
                size="22"
                icon="tabler-search"
              />
            </VBtn>
          </div>

          <VBtn
            v-if="false"
            variant="text"
            color="default"
            icon
            size="small"
          >
            <VIcon
              size="22"
              icon="tabler-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem
                  v-for="(item, index) in ['View Contact', 'Mute Notifications', 'Block Contact', 'Clear Chat', 'Report']"
                  :key="index"
                  :value="index"
                >
                  <VListItemTitle>{{ item }}</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>

        <VDivider />

        <!-- Chat log -->
        <PerfectScrollbar
          ref="chatLogPS"
          tag="ul"
          :options="{ wheelPropagation: false }"
          class="flex-grow-1"
        >
          
          <ChatLog />
        </PerfectScrollbar>

        <!-- Message form -->
        <VForm
          class="chat-log-message-form mb-5 mx-5"
          @submit.prevent="sendMessage"
        >
          <VTextField
            :key="store.activeChat.contact?.id"
            v-model="msg"
            variant="solo"
            class="chat-message-input"
            placeholder="Type your message..."
            density="default"
            autofocus
          >
            <template #append-inner>
              <VBtn
                v-if="false"
                icon
                size="small"
                variant="text"
                color="default"
              >
                <VIcon
                  size="22"
                  icon="tabler-microphone"
                />
              </VBtn>

              <VBtn
                icon
                size="small"
                variant="text"
                color="default"
                class="me-4"
                @click="refInputEl?.click()"
              >
                <VIcon
                  size="22"
                  icon="tabler-link"
                />
              </VBtn>

              <VBtn @click="sendMessage">
                Send
              </VBtn>
            </template>
          </VTextField>

          <input
            ref="refInputEl"
            type="file"
            name="file"
            accept=".jpeg,.png,.jpg,GIF"
            hidden
          >
        </VForm>
      </div>

      <!-- 👉 Start conversation -->
      <div
        v-else
        class="d-flex h-100 align-center justify-center flex-column"
      >
        <VAvatar
          size="109"
          class="elevation-3 mb-6 bg-surface"
        >
          <VIcon
            size="50"
            class="rounded-0 text-high-emphasis"
            icon="tabler-message"
          />
        </VAvatar>
        <p
          class="mb-0 px-6 py-3 font-weight-medium text-lg elevation-3 rounded-xl text-high-emphasis bg-surface text-center"
          :class="[{ 'cursor-pointer': $vuetify.display.smAndDown }]"
          style="line-height: 1"
          @click="startConversation"
        >
          <!--Start Conversation <br />-->
          <span class="text-disabled text-sm">Inicia una conversación <br /> escribiendo un mensaje al número <br />
            <a target="_blank" :href="`https://api.whatsapp.com/send?phone=${MAIN_PHONE_NUMBER.replaceAll(' ', '').replace('+','')}`" class="text-disabled">{{ MAIN_PHONE_NUMBER }}</a>
          </span>
        </p>
      </div>
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
@use "@layouts/styles/mixins" as layoutsMixins;

// Variables
$chat-app-header-height: 68px;

// Placeholders
%chat-header {
  display: flex;
  align-items: center;
  min-block-size: $chat-app-header-height;
  padding-inline: 1rem;
}

.chat-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include elevation.elevation(vuetify.$card-elevation);

  $sel-chat-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-chat-app-layout);
    }
  }

  .active-chat-user-profile-sidebar,
  .user-profile-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }

  .chat-list-header,
  .active-chat-header {
    @extend %chat-header;
  }

  .chat-list-search {
    .v-field__outline__start {
      flex-basis: 20px !important;
      border-radius: 28px 0 0 28px !important;
    }

    .v-field__outline__end {
      border-radius: 0 28px 28px 0 !important;
    }

    @include layoutsMixins.rtl {
      .v-field__outline__start {
        flex-basis: 20px !important;
        border-radius: 0 28px 28px 0 !important;
      }

      .v-field__outline__end {
        border-radius: 28px 0 0 28px !important;
      }
    }
  }

  .chat-list-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }
}

.chat-content-container {
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));

  // Adjust the padding so text field height stays 48px
  .chat-message-input {
    .v-field__append-inner {
      align-items: center;
      padding-block-start: 0;
    }
  }
}

.chat-user-profile-badge {
  .v-badge__badge {
    /* stylelint-disable liberty/use-logical-spec */
    min-width: 12px !important;
    height: 0.75rem;
    /* stylelint-enable liberty/use-logical-spec */
  }
}
</style>
