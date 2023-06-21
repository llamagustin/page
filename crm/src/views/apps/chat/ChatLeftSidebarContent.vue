<script lang="ts" setup>
import type { ChatContact as TypeChatContact } from "@/@fake-db/types";
import ChatContact from "@/views/apps/chat/ChatContact.vue";
import { avatarText } from "@core/utils/formatters";
import { useChatStore } from "@/views/apps/chat/useChatStore";
import { defineEmits, defineProps } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { useChat } from "./useChat";

const props = defineProps<{
  search: string;
  isDrawerOpen: boolean;
  contacts?: any;
}>();


const emit = defineEmits<{
  (e: "openChatOfContact", user): void;
  (e: "showUserProfile"): void;
  (e: "close"): void;
  (e: "onSearchContact", search: string): void;
}>();

const { resolveAvatarBadgeVariant } = useChat();

const store = useChatStore();

let timer;
const search = ref("");
function handleSearch(newValue: string) {
  clearTimeout(timer)
  timer = setTimeout(() => {
    search.value = newValue;
    emit("onSearchContact", search.value);
  }, 1000)
}

function openFromChat(contactId) {
  if(!contactId) return;
  const contact = store.contacts.find(item => item.id == contactId);
  emit('openChatOfContact', contact);
}
</script>

<template>
  <!-- 👉 Chat list header -->
  <div v-if="store.profileUser" class="chat-list-header">
    <!--
    <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      :color="resolveAvatarBadgeVariant(store.profileUser.status)"
      bordered
    >
      <VAvatar
        size="38"
        class="cursor-pointer"
        variant="tonal"
        color="success"
        @click="$emit('showUserProfile')"
      >
        <span> {{ avatarText(store.auth?.fullName) }} Sn </span>
      </VAvatar>
    </VBadge>
    -->
    <VTextField
      v-model="search"
      density="compact"
      placeholder="Search..."
      class="me-1 chat-list-search"
      @update:model-value="handleSearch"
    >
      <!-- @update:search="handleSearch" -->
      <template #prepend-inner>
        <VIcon size="22" icon="tabler-search" />
      </template>
    </VTextField>

    <VBtn
      v-if="$vuetify.display.smAndDown"
      variant="text"
      color="default"
      icon
      size="small"
      @click="$emit('close')"
    >
      <VIcon size="24" icon="mdi-close" class="text-medium-emphasis" />
    </VBtn>
  </div>
  <VDivider />

  <PerfectScrollbar
    tag="ul"
    class="chat-contacts-list px-3"
    :options="{ wheelPropagation: false }"
  >
    <li>
      <span
        class="chat-contact-header d-block text-primary text-xl font-weight-medium"
      >
        Chats
      </span>
      <template v-if="store.chats?.length">
        <ChatContact
          v-for="contact in store.chats"
          :key="`chat-${contact.id}`"
          :user="contact"
          is-chat-contact
          @click="openFromChat(contact.user_id)"
        />
      </template>
      <span
        v-else
        class="no-chat-items-text text-disabled"
      >
        No se ha encontrado chats
      </span>
    </li>
    <li>
      <span
        class="chat-contact-header d-block text-primary text-xl font-weight-medium"
        >Contacts</span
      >
      <ChatContact
        v-if="store.contacts?.length"
        v-for="contact in store.contacts"
        :key="`chat-${contact.id}`"
        :user="contact"
        @click="$emit('openChatOfContact', contact)"
      />
      <span
        v-else
        class="no-chat-items-text text-disabled"
        >No se han encontrado contactos</span
      >
     </li>
  </PerfectScrollbar>
</template>

<style lang="scss">
.chat-contacts-list {
  --chat-content-spacing-x: 12px;

  padding-block-end: 0.75rem;

  .chat-contact-header {
    margin-block-end: 1rem;
    margin-block-start: 1.25rem;
  }

  .chat-contact-header,
  .no-chat-items-text {
    margin-inline: var(--chat-content-spacing-x);
  }
}
</style>
