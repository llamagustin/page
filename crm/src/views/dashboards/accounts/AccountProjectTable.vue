<script setup lang="ts">
  import { useCall } from "@/views/apps/chat/useCall.ts";
  import { avatarText } from "@core/utils/formatters";
    
  const searchQuery = ref('')  
    
  interface Status {
    Verified: string
    Rejected: string
    Pending: string
  }

  interface Call {
    cardImg: string
    lastDigit: string
    cardType: string
    sentDate: string
    status: keyof Status
    trend: string
  }

  interface Props {
    data?: {}
  }

  const props = defineProps<Props>();
  
  const {
    fetchCalls,
    calls,
    paginationData,
    currentPage,
    totalPage
  } = useCall()
onMounted(() => {
  console.log(calls);
});

  // fetchCalls().then( result => {
  //   console.log('r', result)
  // })

  // const lastTransitions: Transition[] = [
  //   {
  //     cardImg: visaIcon,
  //     lastDigit: '*4230',
  //     cardType: 'Credit',
  //     sentDate: '17 Mar 2022',
  //     status: 'Verified',
  //     trend: '+$1,678',
  //   },
  //   {
  //     cardImg: mastercardIcon,
  //     lastDigit: '*5578',
  //     cardType: 'Credit',
  //     sentDate: '12 Feb 2022',
  //     status: 'Rejected',
  //     trend: '-$839',
  //   },
  //   {
  //     cardImg: aeIcon,
  //     lastDigit: '*4567',
  //     cardType: 'Credit',
  //     sentDate: '28 Feb 2022',
  //     status: 'Verified',
  //     trend: '+$435',
  //   },
  // ]
  
  const resolveStatus: Status = {
    Verified: 'success',
    Rejected: 'error',
    Pending: 'secondary',
  }
  
  function convertMinutesToHours(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainderMinutes = minutes % 60;
  
    if (hours === 0) {
      return `${remainderMinutes}min`;
    } else if (remainderMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainderMinutes}min`;
    }
  }
  const filteredCalls = computed(() => {
    console.log(searchQuery.value)
    if (!searchQuery.value) {
    return calls.value; // Sin consulta de búsqueda, retorna todos los elementos
    } else {
      const query = searchQuery.value.toLowerCase(); // Convertir la consulta a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas
    return calls.value.filter((call) => {
      // Filtrar los elementos de la tabla según la consulta de búsqueda
      // Aquí puedes personalizar la lógica según tus necesidades
      // Por ejemplo, buscar por nombre de reseller o cualquier otro campo relevante
      return call.account.fullName.toLowerCase().includes(query);
    });
  }
});


</script>

<template>
  <VCard title="LLamadas recientes">
    <VCol>
      <VTextField 
        v-model="searchQuery" 
        
        placeholder="Buscar reseller " 
        density="compact" />
      </VCol>
    <VDivider />
    <VTable class="text-no-wrap" style="overflow: auto;">
      <thead>
        <tr>
          <th class="font-weight-semibold">
            Reseller
          </th>
          <th class="font-weight-semibold">
            Fecha
          </th>
          <th class="font-weight-semibold">
            Segundos
          </th>
          <th class="font-weight-semibold">
            Nota
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="call in calls">
          <td class="text-caption">
            <!--{{ call }}-->
            <!--Something-->

            <div class="d-flex align-center" v-if="call.account">
              <div class="me-3">
                <VAvatar variant="tonal" color="primary" size="35" class="text-caption">
                  <VImg v-if="call.account.avatar" :src="call.account.avatar" />
                  <span v-else>{{ avatarText(call.account.fullName) }}</span>
                </VAvatar>
                <!--<VImg :src="call.cardImg" width="50" />-->
              </div>
              <div>
                <p class="text-medium-emphasis font-weight-semibold mb-0"
                  style="line-height: 1;">
                  {{ call.account.fullName }} <br />
                  <span class="text-disabled"> {{ call.account.email }}</span>
                  <!--{{ call.lastDigit }}-->
                  <!--{{ call.cardType }}-->
                </p>
              </div>
            </div>
            <div class="d-flex align-center gap-3" v-else>
              <VAvatar variant="tonal" color="secondary" size="35" class="text-caption">
                <span>{{ avatarText('Unknown') }}</span>
              </VAvatar>
              <div>
                <p class="text-medium-emphasis font-weight-semibold mb-0">
                  Unknown
                </p>
              </div>
            </div>
          </td>
          <td class="text-caption">
            <p class="text-medium-emphasis font-weight-semibold mb-0">
              Sent
            </p>
            <span class="text-sm opacity-100 text-disabled">{{ call.calls[0].date }}</span>
          </td>
          <td class="text-caption">
            <VChip label :color="resolveStatus[call.status]">
              {{ call.calls[0].call_duration }}
            </VChip>
          </td>
          <td class="text-caption">
            <span class="font-weight-medium text-medium-emphasis">{{ call.trend }}</span>
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />
    <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>
      <VPagination v-model="currentPage" size="small" :total-visible="5" :length="totalPage" />
    </VCardText>
  </VCard>
</template>
