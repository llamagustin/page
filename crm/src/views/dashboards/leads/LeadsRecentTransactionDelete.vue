<script setup lang="ts">

interface Status {
  Verified: string
  Rejected: string
  Pending: string
}



interface Props {
  data?: object
}

const props = withDefaults(defineProps<Props>(), {
  data: []
})




const resolveStatus: Status = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'secondary',
}
</script>

<template>
  <VCard title="Transacción reciente">
    <VDivider />
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th class="font-weight-semibold">
            CARD
          </th>
          <th class="font-weight-semibold">
            DATE
          </th>
          <th class="font-weight-semibold">
            STATUS
          </th>
          <th class="font-weight-semibold">
            TREND
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="transition in props.data"
          :key="transition.lastDigit"
        >
          <td style="padding-block: 0.61rem;">
            <div class="d-flex align-center">
              <div class="me-3">
                <VImg
                  :src="transition.cardImg"
                  width="50"
                />
              </div>
              <div>
                <p class="text-medium-emphasis font-weight-semibold text-base mb-0">
                  {{ transition.lastDigit }}
                </p>
                <p class="text-sm mb-0 opacity-100 text-disabled">
                  {{ transition.cardType }}
                </p>
              </div>
            </div>
          </td>
          <td style="padding-block: 0.61rem;">
            <p class="text-medium-emphasis font-weight-semibold text-base mb-0">
              Sent
            </p>
            <span class="text-sm opacity-100 text-disabled">{{ transition.sentDate }}</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <VChip
              label
              :color="resolveStatus[transition.status]"
            >
              {{ transition.status }}
            </VChip>
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="font-weight-medium text-medium-emphasis text-base">{{ transition.trend }}</span>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
