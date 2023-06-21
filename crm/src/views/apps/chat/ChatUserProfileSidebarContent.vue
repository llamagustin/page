<script lang="ts" setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useChat } from './useChat'
import { useChatStore } from '@/views/apps/chat/useChatStore'
import { avatarText } from '@core/utils/formatters'

const emit = defineEmits<{
  (e: 'close'): void
}>()

// composables
const store = useChatStore()
const { resolveAvatarBadgeVariant } = useChat()

const userStatusRadioOptions = [
  { title: 'Online', value: 'online', color: 'success' },
  { title: 'Away', value: 'away', color: 'warning' },
  { title: 'Do not disturb', value: 'busy', color: 'error' },
  { title: 'Offline', value: 'offline', color: 'secondary' },
]


const getNameUser = (name) => {
  if(name.name){
    return name.name + ' ' + name.firstSurname + ' ' + name.firstSurname
  }else{
    return 'NEW LEAD'
  }
}
</script>

<template>
  <template v-if="store.profileUser">
    <!-- Close Button -->
    <div class="pt-2 me-2 text-end">
      <VBtn
        variant="text"
        color="default"
        icon
        size="small"
        @click="$emit('close')"
      >
        <VIcon
          size="24"
          class="text-medium-emphasis"
          icon="tabler-x"
        />
      </VBtn>
    </div>

    <!-- User Avatar + Name + Role -->
    <!--<div class="text-center px-6">-->
    <!--  <VBadge-->
    <!--    location="bottom right"-->
    <!--    offset-x="7"-->
    <!--    offset-y="4"-->
    <!--    bordered-->
    <!--    :color="resolveAvatarBadgeVariant(store.profileUser.status)"-->
    <!--    class="chat-user-profile-badge mb-5"-->
    <!--  >-->
    <!--    <VAvatar-->
    <!--      size="84"-->
    <!--      variant="tonal"-->
    <!--      :class="`text-${resolveAvatarBadgeVariant(store.profileUser.status)}`"-->
    <!--    >-->
    <!--      <VImg-->
    <!--          v-if="props.user.avatar"-->
    <!--          :src="props.user.avatar"-->
    <!--          :alt="user.fullName"-->
    <!--        />-->
    <!--        <span v-else>{{ avatarText(user.name?.name || '?') }}</span>-->
    <!--    </VAvatar>-->
    <!--  </VBadge>-->
    <!--  <h2 class="mb-1 text-high-emphasis font-weight-medium text-base">-->
    <!--    {{getNameUser(user.name)}}-->
    <!--  </h2>-->
    <!--  <p class="text-capitalize text-medium-emphasis text-sm">-->
    <!--    {{ store.auth.phone }}-->
    <!--  </p>-->
    <!--</div>-->

    <!-- User Data -->
    <PerfectScrollbar
      class="ps-chat-user-profile-sidebar-content pb-5 px-5"
      :options="{ wheelPropagation: false }"
    >
      <!-- About -->

      <div class="my-5 text-medium-emphasis">
        <span class="text-sm text-disabled">
          ABOUT
        </span>
        <p>
          {{ store.auth?.about  || 'No hay descripción' }}
        </p>
      </div>
      
      <!-- Status -->
      <!--
      <div class="mb-5">
        <span class="text-sm text-disabled">ESTATUS</span>
        <VRadioGroup
          v-model="store.profileUser.status"
          class="mt-1"
        >
          <VRadio
            v-for="radioOption in userStatusRadioOptions"
            :key="radioOption.title"
            :label="radioOption.title"
            :value="radioOption.value"
            :color="radioOption.color"
          />
        </VRadioGroup>
      </div>
      -->

      <!-- Settings -->
      <div class="mb-8">
        <span class="d-block text-sm text-disabled mb-3">
          INFORMACIÓN PERSONAL
        </span>
        <div class="d-flex align-center">
          <VIcon class="me-2" icon="tabler-mail" size="22" />
          <span> {{ store.auth?.email  || '-' }} </span>
        </div>
        <div class="d-flex align-center my-3">
          <VIcon class="me-2" icon="tabler-phone" size="22" />
          <span>{{ store.auth?.phone  || '-' }}</span>
        </div>
        <div class="d-flex align-center">
          <VIcon class="me-2" icon="tabler-home" size="22" />
          <span>
            {{ store.auth?.address?.line  || '-' }}
          </span>
        </div>
      </div>
      
      <!--
      <div class="text-medium-emphasis">
        <span class="text-sm text-disabled">CONFIGURACIÓN</span>
        <div class="d-flex align-center my-3">
          <VIcon
            class="me-2"
            icon="tabler-circle-check"
            size="22"
          />
          <span>Verificación de Dos Pasos</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon
            class="me-2"
            icon="tabler-bell"
            size="22"
          />
          <span>Notificación</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon
            class="me-2"
            icon="tabler-user"
            size="22"
          />
          <span>Invita Contactos</span>
        </div>
        <div class="d-flex align-center">
          <VIcon
            class="me-2"
            icon="tabler-trash"
            size="22"
          />
          <span>Eliminar Cuenta</span>
        </div>
      </div>
      -->

      <!-- Logout Button -->
      <VBtn
        color="primary"
        class="mt-11"
        @click="$emit('close')"
      >
        Salir
      </VBtn>
    </PerfectScrollbar>
  </template>
</template>
