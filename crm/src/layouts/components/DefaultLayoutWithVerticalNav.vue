<script lang="ts" setup>
  import navItems from '@/navigation/vertical'
  import { useThemeConfig } from '@core/composable/useThemeConfig'
  import { computed } from 'vue';
  // Components
  import Footer from '@/layouts/components/Footer.vue'
  import NavBarI18n from '@/layouts/components/NavBarI18n.vue'
  import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
  import NavbarShortcuts from '@/layouts/components/NavbarShortcuts.vue'
  import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
  import UserProfile from '@/layouts/components/UserProfile.vue'
  import NavSearchBar from '@/layouts/components/NavSearchBar.vue'
  import MenuDashboard from '@/navigation/vertical/menu-dashboard'
  // import { useAccount } from '@/views/apps/account/useAccount'
  import { useRoute } from 'vue-router';
  // @layouts plugin
  import { VerticalNavLayout } from '@layouts'
  import { useAlerts } from "@/shared/composables/useAlerts"
  const { alerts } = useAlerts();
  
  const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
  const { width: windowWidth } = useWindowSize()
  
  // const { fetchNotifications } = useAccount()
  // fetchNotifications().then(result => {
  //   console.log('notifications')
  // })

  // const barNotification = ref(true)
  
  const route = useRoute();
  const pathname = computed(() => route.path);
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <VBtn v-if="isLessThanOverlayNavBreakpoint(windowWidth)" icon variant="text" color="default" class="ms-n3" size="small" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="tabler-menu-2" size="24" />
        </VBtn>
        <NavSearchBar trigger-btn-class="ms-lg-n3" />
        <VSpacer />
        <!--<NavBarI18n /> -->
        <NavbarThemeSwitcher />
        <NavbarShortcuts />
        <NavBarNotifications v-if="alerts.length" class="me-2" />
        <UserProfile />
      </div>
    </template>

    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    </RouterView>

    <template #menu-dashboard>
      <ul class="ps nav-items">
        <li v-for="item in MenuDashboard" :key="item.title" :class="{ 'nav-link': item?.to, 'nav-section-title': !item?.to  }">
          <template v-if="item?.to">
            <RouterLink :to="item.to" class="text-sm">
              <span :class="['nav__link', { 'bg-primary': item.to == pathname }]" :style="{ color: item.to == pathname ? 'white !important' : 'inherit' }">
                {{ item.title }}
              </span>
            </RouterLink>  
          </template>
          <template v-else>
            <span class="text-sm-caption text-secondary user-select-none text-uppercase">
              {{ item.title }}
            </span>
          </template>
        </li>
      </ul>
    </template>
    
    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </VerticalNavLayout>
</template>

<style>
  .nav__link {
    display: block;
    padding-block: .5em;
    border-radius: .3em;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)) !important;
    
    &:hover {
      background-color: rgb(var(--v-theme-primary)) !important;
      color: rgb(var(--v-theme-on-primary)) !important;
    }
  }
</style>