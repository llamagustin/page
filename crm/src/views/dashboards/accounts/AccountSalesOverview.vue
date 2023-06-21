<script setup lang="ts">
interface Props {
  data: data
}

const props = defineProps<Props>()

</script>


<template>
  <VCard v-if="data">
    <VCardText>
      <div class="d-flex align-center justify-space-between">
        <span class="text-sm text-disabled">
          Agentes Digitales
        </span>
        <span class="text-success"></span>
      </div>
      <h5 class="text-h5">
        {{data.stats}}
      </h5>
    </VCardText>

    <VCardText>
      <VRow no-gutters>
        <VCol v-if="data.sell" cols="5">
          <div class="d-flex align-center mb-3">
            <VAvatar
              color="success"
              variant="tonal"
              :size="30"
              rounded
              class="me-2"
            >
              <VIcon
                size="18"
                icon="tabler-user"
              />
            </VAvatar>
          </div>
          <h6 class="text-h6">
            {{data.sell?.data}}
          </h6>
          <span class="text-sm text-disabled">{{data.sell?.total}}</span>
        </VCol>

        <VCol cols="2">
          <div class="d-flex flex-column align-center justify-center h-100">
            <VDivider
              vertical
              class="mx-auto"
            />

            <div class="pa-1">
              <VChip size="20">
                <span class="text-xs pa-1">VS</span>
              </VChip>
            </div>

            <VDivider
              vertical
              class="mx-auto"
            />
          </div>
        </VCol>

        <VCol
          v-if="data.pendent"
          cols="5"
          class="text-end"
        >
          <div class="d-flex align-center justify-end mb-3">
            <VAvatar
              color="error"
              variant="tonal"
              :size="30"
              rounded
            >
              <VIcon
                size="18"
                icon="tabler-user"
              />
            </VAvatar>
          </div>
          <h6 class="text-h6">
            {{data.pendent?.data}}
          </h6>
          <span class="text-sm text-disabled">{{data.pendent?.total}}</span>
        </VCol>
      </VRow>

      <div class="mt-6">
        <VProgressLinear
          model-value="80"
          height="8"
          color="success"
          rounded
        />
      </div>
    </VCardText>
  </VCard>
</template>
