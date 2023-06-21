<script setup lang="ts">
const shortcuts = [
  {
    icon: 'tabler-smart-home',
    title: 'Sandbox',
    subtitle: 'Eventos y alertas',
    to: { name: 'apps-calendar' },
  },
  {
    icon: 'tabler-mail',
    title: 'Agenda',
    subtitle: 'Administrar usuarios',
    to: { name: 'apps-email' },
  },
  {
    icon: 'tabler-file',
    title: 'Workspace',
    subtitle: 'Resumen de cuenta',
    to: { name: 'dashboard-leads' },
  },
  {
    icon: 'mdi-help-circle-outline',
    title: 'Ayuda',
    subtitle: 'FAQs & Artículos',
    to: { name: 'faq' },
  },
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
