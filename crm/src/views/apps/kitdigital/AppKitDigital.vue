<script setup lang="ts">
//import {tools} from '../.././@fake-db/tools.ts';

//const emit = defineEmits(['changeboe']);


interface Emit {
   (e: 'changeTool', value:any): void
   (e: 'selected', value:string): void
 }

const emit = defineEmits<Emit>()

interface Columns {
  selected: string
  tools: any
  xs?: number | string
  sm?: number | string
  md?: string | number
  lg?: string | number
  xl?: string | number
}

const props = defineProps<Columns>()

const _selected = ref()

//const tools = ref(props.tools)
//console.log('s', tools.value)


const annualMonthlyPlanPriceToggler = ref(true)

const features = []
const tool = ref({}) //{...tools[5]}



const changeInfo = (tag) =>{
  const data = props.tools.find(item => item.tag === tag)
  tool.value = data;
  
  _selected.value = tag
  props.selected = tag
};



watch(_selected ,val => {
  console.log('e', val)
  changeInfo(val)
  emit('selected', val)
});



changeInfo('crm')


function setPriceMonth(price) {
  let newPrice = Number(price);
  return Math.ceil(Number(newPrice / 11));
}
function handleChange(e) {
  console.log(e)
  emit('update:selected', e.target.value)
}
</script>

<template>
  <!-- 👉 Title and subtitle -->
  <div class="text-center">
    <h4 class="text-h4 pricing-title mb-4">
      Plan de Pago
    </h4>
    <p class="mb-0">
      Todos los planos incluyen herramientas avanzadas y características para mejorar tu producto.
    </p>
    <p>Elige el plan que mejor se adapta a tus necesidades.</p>
  </div>

  <!-- 👉 Annual and monthly price toggler -->

  <div class="d-flex align-center justify-center my-10">
    
    <VCol
      cols="4"
    >
      <VSelect
        v-model="_selected"
        label="Seleccionar Servicio"
        clearable
        clear-icon="tabler-x"
        single-line
        :items="tools"
        item-title="title"
        item-value="tag"
        class="me-2"
      />
    </VCol>
    <VLabel
      for="pricing-plan-toggle"
      class="me-2"
    >
      Mensual
    </VLabel>

    <div class="position-relative">
      <VSwitch
        id="pricing-plan-toggle"
        v-model="annualMonthlyPlanPriceToggler"
        label="Anual"
      />

      <div class="save-upto-chip position-absolute align-center d-none d-md-flex gap-1">
        <VIcon
          icon="tabler-corner-left-down"
          class="flip-in-rtl"
        />
        <VChip
          label
          color="primary"
        >
          Ahorre hasta un 10%
        </VChip>
      </div>
    </div>
  </div>

  <!-- SECTION pricing plans -->
  <VRow v-if="_selected">
    <VCol
      cols="12"
    >
    <VTable class="text-no-wrap border rounded">
            <!-- 👉 Table head -->
            <thead>
              <tr v-if="tool.cost">
                
                <th
                  scope="col"
                  class="py-4"
                >
                  <h6 class="text-sm font-weight-semibold mb-1">
                    {{tool.title}}
                  </h6>
                  <span class="font-weight-regular text-sm text-disabled">
                    {{tool.resume}}
                  </span>
                </th>

                <th
                  scope="col"
                  class="text-center py-4"
                >
                  <h6 class="text-sm font-weight-semibold mb-1">
                    Starter Pack
                  </h6>
                  
                  <span class="text-disabled font-weight-regular text-sm">
                    €{{ annualMonthlyPlanPriceToggler ? tool.cost.starter + '/AÑO' : setPriceMonth(tool.cost.starter) + '/MES' }} 
                  </span>
                </th>

                <th
                  scope="col"
                  class="text-center py-4"
                >
                  <h6 class="text-sm font-weight-semibold mb-1">
                    Profesional Pack
                  </h6>

                  <span class="text-disabled font-weight-regular text-sm">
                    €{{ annualMonthlyPlanPriceToggler ? tool.cost.profesional + '/AÑO' : setPriceMonth(tool.cost.profesional) + '/MES' }}
                  </span>
                </th>

                <th
                  scope="col"
                  class="text-center py-4"
                >
                  <h6 class="text-sm font-weight-semibold mb-1">
                    Enterprise
                  </h6>
                  <span class="text-disabled font-weight-regular text-sm">
                    €{{ annualMonthlyPlanPriceToggler ? tool.cost.startup + '/AÑO'  : setPriceMonth(tool.cost.startup) + '/MES' }}
                  </span>
                </th>
              </tr>
            </thead>

            <!-- 👉 Table Body -->
            <tbody>
              <tr
                v-for="feature in tool.features"
                :key="feature.id"
              >
                <td>{{ feature.content }}</td>
                <td class="text-center">
                  <VChip
                    pill
                    size="30"
                    class="pa-1"
                    color="primary"
                  >
                    <VIcon
                      size="15"
                      icon="tabler-check"
                    />
                  </VChip>
                </td>

                <td class="text-center">
                  <VChip
                    pill
                    size="30"
                    class="pa-1"
                    color="primary"
                  >
                    <VIcon
                      size="15"
                      icon="tabler-check"
                    />
                  </VChip>
                </td>

                <td class="text-center">
                  <VChip
                    pill
                    size="30"
                    class="pa-1"
                    color="primary"
                  >
                    <VIcon
                      size="15"
                      icon="tabler-check"
                    />
                  </VChip>
                </td>
              </tr>
              <tr
                v-for="benefit in tool.allBenefits"
                :key="benefit.id"
              >
                <td>{{ benefit.content }}</td>
                <td class="text-center">
                  <VChip
                    v-if="benefit.starter ==='SI' || benefit.starter === 'NO' "
                    pill
                    size="30"
                    class="pa-1"
                    :color="benefit.starter === 'SI' ? 'primary' : 'secondary'"
                  >
                    <VIcon
                      size="15"
                      :icon="benefit.starter === 'SI' ? 'tabler-check' : 'tabler-x'"
                    />
                  </VChip>
                  <div v-else>{{ benefit.starter }}</div>
                </td>

                <td class="text-center">
                   <VChip
                    v-if="benefit.profesional ==='SI' || benefit.profesional === 'NO' "
                    pill
                    size="30"
                    class="pa-1"
                    :color="benefit.profesional === 'SI' ? 'primary' : 'secondary'"
                  >
                    <VIcon
                      size="15"
                      :icon="benefit.profesional === 'SI' ? 'tabler-check' : 'tabler-x'"
                    />
                  </VChip>
                  <div v-else>{{ benefit.profesional }}</div>
                  
                </td>

                <td class="text-center">
                  <VChip
                    v-if="benefit.startup ==='SI' || benefit.startup === 'NO' "
                    pill
                    size="30"
                    class="pa-1"
                    :color="benefit.startup === 'SI' ? 'primary' : 'secondary'"
                  >
                    <VIcon
                      size="15"
                      :icon="benefit.startup === 'SI' ? 'tabler-check' : 'tabler-x'"
                    />
                  </VChip>
                  <div v-else>{{ benefit.startup }}</div>
                </td>
              </tr>
            </tbody>

            <!-- 👉 Table footer -->
            <tfoot>
              <tr>
                <td class="py-4">
                  Almacenamiento de datos durante 365 días
                </td>

                <td class="text-center py-4">
                  <VBtn variant="tonal">
                    CURRENT PLAN
                  </VBtn>
                </td>
                <td class="text-center py-4">
                  <VBtn>
                    UPGRATE
                  </VBtn>
                </td>
                <td class="text-center py-4">
                  <VBtn variant="tonal">
                    UPGRATE
                  </VBtn>
                </td>
              </tr>
            </tfoot>
          </VTable>
    </VCol>
  </VRow>
  <!-- !SECTION  -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.save-upto-chip {
  inset-block-start: -1.5rem;
  inset-inline-end: -7rem;
}
</style>
