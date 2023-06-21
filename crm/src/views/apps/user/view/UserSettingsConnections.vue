<script setup lang="ts">
import asana from '@/assets/images/icons/brands/asana.png'
import behance from '@/assets/images/icons/brands/behance.png'
import dribbble from '@/assets/images/icons/brands/dribbble.png'
import facebook from '@/assets/images/icons/brands/facebook.png'
import github from '@/assets/images/icons/brands/github.png'
import google from '@/assets/images/icons/brands/google.png'
import intagram from '@/assets/images/icons/brands/instagram.png'
import mailchimp from '@/assets/images/icons/brands/mailchimp.png'
import slack from '@/assets/images/icons/brands/slack.png'
import twitter from '@/assets/images/icons/brands/twitter.png'

const props = defineProps({
  userData: {}
})


const connectedAccounts = ref([
  {
    logo: google,
    name: 'Google',
    subtitle: 'Calendar and contacts',
    connected: false,
  },
  {
    logo: slack,
    name: 'Slack',
    subtitle: 'Communication',
    connected: false,
  },
  {
    logo: github,
    name: 'GitHub',
    subtitle: 'Manage your Git repositories',
    connected: false,
  },
  {
    logo: mailchimp,
    name: 'MailChimp',
    subtitle: 'Email marketing service',
    connected: false,
  },
  {
    logo: asana,
    name: 'Asana',
    subtitle: 'Task management',
    connected: false,
  },

])

const valueConnection = (name) =>{
  let qr= (props.userData.plan?.connections || []).filter(c=> c.name==name);
  return qr[0]?.connected || false
} 

for (var i = 0; i < connectedAccounts.value.length; i++) {
  connectedAccounts.value[i].connected=valueConnection(connectedAccounts.value[i].name);
}


const socialAccounts = ref([
  {
    logo: facebook,
    name: 'Facebook',
    connected: false,
  },
  {
    logo: twitter,
    name: 'Twitter',
    links: { username: '@Pixinvent', link: 'https://twitter.com/Pixinvents' },
    connected: true,
  },
  {
    logo: intagram,
    name: 'Instagram',
    links: { username: '@Pixinvent', link: 'https://www.instagram.com/pixinvents/' },
    connected: true,
  },
  {
    logo: dribbble,
    name: 'Dribbble',
    connected: false,

  },
  {
    logo: behance,
    name: 'Behance',
    connected: false,
  },
])

interface Emit { 
   (e: 'updateLead', value: any): void
 }

const emit = defineEmits<Emit>()

//metodo para emitir el tipo de evento para la actualización de las props.
const updateLead = ()=>{
  if( Array.isArray(props.userData.plan)) props.userData.plan={};
  props.userData.plan.connections = connectedAccounts.value

  console.log(props.userData.plan)

  emit('updateLead', props.userData)
}

</script>

<template>
  <VRow>
    <!-- 👉 Connected Accounts -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Connected Accounts">
        <VCardText>
          <p class="mt-n4 mb-6 text-sm">
            Display content from your connected accounts on your site
          </p>
          <VList class="card-list">
          <!--props.userData.plan.connections-->  <!--iteraba sobre connectedAccounts-->
            <VListItem
              v-for="item in connectedAccounts" 
              :key="item.logo"
              :title="item.name"
            >
              <template #prepend>
                <VAvatar start>
                  <VImg
                    :src="item.logo"
                    height="30"
                  />
                </VAvatar>
              </template>

              <VListItemSubtitle class="text-xs">
                {{ item.subtitle }}
              </VListItemSubtitle>

              <template #append>
                <VListItemAction>
                  <VSwitch
                    v-model="item.connected"
                    @change="updateLead"
                    density="compact"
                    class="me-1"
                  />
                </VListItemAction>
              </template>
            </VListItem>
          </VList>
        </VCardText>
        <div>
        </div>
      </VCard>
    </VCol>

    <!-- 👉 Social Accounts -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Social Accounts">
        <VCardText>
          <p class="mt-n4 mb-6 text-sm">
            Display content from social accounts on your site
          </p>
          <VList class="card-list">
          <!--conectar el v-for con el connections que se enviara por props-->
            <VListItem
              v-for="item in socialAccounts"
              :key="item.logo"
              :title="item.name"
            >
              <template #prepend>
                <VAvatar start>
                  <VImg
                    :src="item.logo"
                    height="30"
                  />
                </VAvatar>
              </template>

              <VListItemSubtitle
                v-if="item.links?.link"
                tag="a"
                :href="item.links?.link"
                style="opacity: 1;"
              >
                {{ item.links?.username }}
              </VListItemSubtitle>

              <VListItemSubtitle
                v-else
                class="text-xs"
              >
                Not Connected
              </VListItemSubtitle>

              <template #append>
                <VListItemAction>
                  <VBtn
                    icon
                    variant="tonal"
                    size="x-small"
                    :color="item.connected ? 'error' : 'secondary'"
                    class="rounded"
                  >
                    <VIcon
                      size="20"
                      :icon="item.connected ? 'tabler-trash' : 'tabler-link' "
                    />
                  </VBtn>
                </VListItemAction>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
