<script setup lang="ts">
import { useEmailStore } from '@/views/apps/email/useEmailStore'

interface Props {
  userData: {  role:string }
  counters: {  }
}
const props = defineProps<Props>()
const store = useEmailStore()

const emit = defineEmits<{
  (e: 'toggleComposeDialogVisibility'): void
}>()

var folders = [
  {
    id:'inbox',
    title: 'Buzon',
    prependIcon: 'tabler-mail',
    to: { 
      name: 'apps-email-filter',
      params: {filter:'inbox'}
    },
  },
  {
    id:'sent',
    title: 'Enviar',
    prependIcon: 'tabler-send',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'sent' },
    },
  },
  {
    id:'draft',
    title: 'Borrador',
    prependIcon: 'tabler-pencil',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'draft' },
    },
  },
  {
    id:'starred',
    title: 'Favoritos',
    prependIcon: 'tabler-star',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'starred' },
    },
  },
  {
    id:'spam',
    title: 'Spam',
    prependIcon: 'tabler-help',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'spam' },
    },
  },
  {
    id:'trash',
    title: 'Eliminados',
    prependIcon: 'tabler-trash',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'trash' },
    },
  }
  
]

if(props.userData.role=="admin"){
  folders.push({
    title: 'Verify',
    prependIcon: 'tabler-checks',
    to: {
      name: 'apps-email-filter',
      params: { filter: 'verify' },
    },
  })
}

const labels = [
  {
    title: 'Personal',
    color: 'success',
    to: {
      name: 'apps-email-label',
      params: { label: 'personal' },
    },
  },
  {
    title: 'Company',
    color: 'primary',
    to: {
      name: 'apps-email-label',
      params: { label: 'company' },
    },
  },
  {
    title: 'Important',
    color: 'warning',
    to: {
      name: 'apps-email-label',
      params: { label: 'important' },
    },
  },
  {
    title: 'Private',
    color: 'error',
    to: {
      name: 'apps-email-label',
      params: { label: 'private' },
    },
  },
]

function createMail() {
  store.typeAction = 'create';
  emit('toggleComposeDialogVisibility')
}
</script>

<template>
  
    <!-- 👉 Compose -->
    <div class="pa-4">
      <VBtn block @click="createMail" >
        Redactar Nuevo
      </VBtn>
    </div>
  
    <!-- 👉 Folders -->
    <ul class="email-filters-labels div-container">
      <RouterLink
        v-for="folder in folders"
        :key="folder.title"
        v-slot="{ isActive, href, navigate }"
        class="d-flex items-center cursor-pointer"
        :to="folder.to"
        custom
      >
        <li
          v-bind="$attrs"
          :href="href"
          :class="isActive && 'email-filter-active text-primary'"
          class="cursor-pointer"
          @click="navigate"
        >
          <VIcon
            :icon="folder.prependIcon"
            class="me-3"
            size="20"
          />
          <span class="me-5" > {{ folder.title }} </span>
          <VBadge 
            v-show="props.counters[folder.id]>0"
            color="success"
            inline
            :content="props.counters[folder.id]"
          />
        </li>
      </RouterLink>
  
      <!-- 👉 Labels -->
      <li class="text-xs d-block text-uppercase text-disabled mt-1">
        LABELS
      </li>
      <RouterLink
        v-for="label in labels"
        :key="label.title"
        v-slot="{ isActive, href, navigate }"
        class="d-flex items-center"
        :to="label.to"
        custom
      >
        <li
          v-bind="$attrs"
          :href="href"
          :class="isActive && 'email-label-active text-primary'"
          class="cursor-pointer"
          @click="navigate"
        >
          
          <VBadge
            inline
            dot
            :color="label.color"
            class="me-4"
          />
          <span>{{ label.title }}</span>
        </li>
      </RouterLink>
    </ul>
  
</template>

<style lang="scss">
.div-container {
  min-height: 430px;
  
}
.email-filters-labels {
  > li {
    position: relative;
    margin-block-end: 4px;
    padding-block: 3px;
    padding-inline: 16px;
  }

  .email-filter-active,
  .email-label-active {
    &::after {
      position: absolute;
      background: currentcolor;
      block-size: 100%;
      content: "";
      inline-size: 3px;
      inset-block-start: 0;
      inset-inline-start: 0;
    }
  }
}
</style>
