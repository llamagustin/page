<script setup lang="ts">
import aeIcon from '@/assets/images/icons/payments/ae-icon.png'
import mastercardIcon from '@/assets/images/icons/payments/mastercard-icon.png'
import visaIcon from '@/assets/images/icons/payments/visa-icon.png'

interface Status {
  Verified: string
  Rejected: string
  Pending: string
}

interface Transition {
  cardImg: string
  lastDigit: string
  cardType: string
  sentDate: string
  status: keyof Status
  trend: string
}




  interface Props {
    data: {}
  }

  const props = defineProps<Props>();


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
