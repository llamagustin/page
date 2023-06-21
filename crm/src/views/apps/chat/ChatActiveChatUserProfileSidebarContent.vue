<script lang="ts" setup>
import { useChatStore } from "@/views/apps/chat/useChatStore";
import { avatarText } from "@core/utils/formatters";
import { defineEmits } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { useChat } from "./useChat";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const store = useChatStore();

const { resolveAvatarBadgeVariant } = useChat();
</script>

<template>
  <template v-if="store.activeChat">
    <!-- Close Button -->
    <div
      class="pt-2 me-2"
      :class="$vuetify.locale.isRtl ? 'text-left' : 'text-right'"
    >
      <VBtn
        variant="text"
        color="default"
        icon
        size="small"
        @click="$emit('close')"
      >
        <VIcon size="24" icon="tabler-x" class="text-medium-emphasis" />
      </VBtn>
    </div>

    <!-- User Avatar + Name + Role -->
    <div class="text-center px-6">
      <VBadge
        location="bottom right"
        offset-x="7"
        offset-y="4"
        bordered
        :color="resolveAvatarBadgeVariant(store.activeChat.contact?.status)"
        class="chat-user-profile-badge mb-5"
      >
        <VAvatar
          size="80"
          class="bg-surface"
          variant="tonal"
          :class="`text-${resolveAvatarBadgeVariant(
            store.activeChat.contact?.status
          )}`"
        >
          <VImg
            v-if="store.activeChat.contact?.avatar"
            :src="store.activeChat.contact?.avatar"
          />
          <span v-else class="text-3xl">{{
            avatarText(store.activeChat?.contact?.name?.name)
          }}</span>
        </VAvatar>
      </VBadge>
      <h2 class="mb-1 font-weight-medium text-high-emphasis text-base">
        {{ store.activeChat?.contact?.fullName }}
      </h2>
      <p class="text-capitalize text-sm text-medium-emphasis">
        {{ store.activeChat?.contact?.role }}
      </p>
    </div>

    <!-- User Data -->
    <PerfectScrollbar
      class="ps-chat-user-profile-sidebar-content text-medium-emphasis pb-5 px-5"
      :options="{ wheelPropagation: false }"
    >
      <!-- About -->
      <div class="my-8">
        <span for="textarea-user-about" class="text-sm text-disabled"
          >ABOUT</span
        >
        <p class="mt-2">
          {{ store.activeChat.contact?.about || 'No hay descripción' }}
        </p>
      </div>

      <!-- Personal Information -->
      <div class="mb-8">
        <span class="d-block text-sm text-disabled mb-3">
          INFORMACIÓN PERSONAL
        </span>
        <div class="d-flex align-center">
          <VIcon class="me-2" icon="tabler-mail" size="22" />
          <span> {{ store.activeChat.contact?.email  || '-' }} </span>
        </div>
        <div class="d-flex align-center my-3">
          <VIcon class="me-2" icon="tabler-phone" size="22" />
          <span>{{ store.activeChat.contact?.phone  || '-' }}</span>
        </div>
        <div class="d-flex align-center">
          <VIcon class="me-2" icon="tabler-home" size="22" />
          <span>
            {{ store.activeChat.contact?.address?.country || '-' }},
            {{ store.activeChat.contact?.address?.province || '-' }},
            {{ store.activeChat.contact?.address?.city || '-' }},
            {{ store.activeChat.contact?.address?.zip || '-' }},
            {{ store.activeChat.contact?.address?.line  || '-' }}
          </span>
        </div>
      </div>

      <!-- Options -->
      <!--
      <div>
        <span class="d-block text-sm text-disabled mb-3">OPCIONES</span>
        <div class="d-flex align-center">
          <VIcon class="me-2" icon="tabler-bookmark" size="22" />
          <span>Añade un Tag</span>
        </div>
        <div class="d-flex align-center my-3">
          <VIcon class="me-2" icon="tabler-star" size="22" />
          <span>Contactos Importantes</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon class="me-2" icon="tabler-photo" size="22" />
          <span>Redes</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon class="me-2" icon="tabler-trash" size="22" />
          <span>Eliminar Contacto</span>
        </div>
        <div class="d-flex align-center">
          <VIcon class="me-2 ms-1" size="18" icon="tabler-ban" />
          <span>Bloquear Contacto</span>
        </div>
      </div>
      -->
    </PerfectScrollbar>
  </template>
</template>
