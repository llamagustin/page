<script lang="ts" setup>
import iae from "@/@fake-db/data/iae.json";
import { defineProps } from "vue";
import { avatarText } from "@core/utils/formatters";
import { useRouter } from "vue-router";

import { isID } from "@/shared/utils/id";

interface Props {
  applicant: any;
  panelActive: number;
  subvencion: string;
  questionsAnswered: number;
  setActivePanel: (step: number) => void;
}

const router = useRouter();
const props = defineProps<Props>();
const panel = ref(1);

const check_error = {
  data: "tabler-alert-circle",
  color: "error",
};

const progressBar = computed(() => {
  return props.questionsAnswered * 7.6923076923076925;
});

const check_valid = {
  data: "mdi-checkbox-marked-circle",
  color: "success",
};

const steps = reactive([
  {
    id: 1,
    title: "Datos del solicitante",
    text: `Datos necesarios para el registro de aythen.`,
    key: "applicant",
    icon: check_error,
    label: [
      {
        icon: check_error,
        title: "Nombre y Apellidos",
        value: "name",
      },
      {
        icon: check_error,
        title: "Primer Apellido",
        value: "firstSurname",
      },
      {
        icon: check_error,
        title: "Segundo Apellido",
        value: "secondSurname",
      },
      {
        icon: check_error,
        title: "Otorgante",
        value: "grantor",
      },
      {
        icon: check_error,
        title: "IAE",
        value: "category",
      },
      {
        icon: check_error,
        title: "NIF",
        value: "nif",
      },
      {
        icon: check_error,
        title: "Razón Social",
        value: "company",
      },
      {
        icon: check_error,
        title: "Email",
        value: "email",
      },
      {
        icon: check_error,
        title: "Teléfono",
        value: "phone",
      },
    ],
  },
  {
    id: 2,
    title: "Dirección del solicitante",
    text: `Datos de ubicación para el registro de aythen.`,
    key: "applicant",
    icon: check_error,
    label: [
      {
        icon: check_error,
        title: "País",
        value: "address_country",
      },
      {
        icon: check_error,
        title: "Provincia",
        value: "address_province",
      },
      {
        icon: check_error,
        title: "Ciudad",
        value: "address_city",
      },
      {
        icon: check_error,
        title: "Postal code",
        value: "address_zip",
      },
      {
        icon: check_error,
        title: "Dirección completa",
        value: "address_line",
      },
    ],
  },
  {
    id: 3,
    title: "Subvención",
    text: ``,
    key: "subvencion",
    icon: check_error,
    label: [
      {
        icon: check_error,
        title: "Razón social",
        value: "company",
      },
    ],
  },
]);

const isEmpty = (str: string) => str.length === 0;

function validateApplicantData() {
  let data = props.applicant;
  let validations = [
    isEmpty(data.name),
    isEmpty(data.firstSurname),
    isEmpty(data.secondSurname),
    isEmpty(data.category ?? ""),
    // isEmpty(data.company),
    !isID(data.nif),
    isEmpty(data.dial_phone),
    isEmpty(data.email),
  ];
  
  // console.log('val', isID(data.nif), 'dkd', validations)
  steps[0].icon = check_error;
  if (validations.includes(true)) return;
  steps[0].icon = check_valid;
}

function validateLocationApplicant() {
  let data = props.applicant;
  let validations = [
    !Boolean(data.address_province),
    !Boolean(data.address_city),
    !Boolean(data.address_zip),
    !Boolean(data.address_line),
  ];
  steps[1].icon = check_error;
  if (validations.includes(true)) return;
  steps[1].icon = check_valid;
}



function validateSubvencion() {
  let data = props.applicant;
  
  steps[2].icon = check_error;
  if (data.subvencion == "with") {
    if (props.questionsAnswered != 13) return;
    steps[2].icon = check_valid;
  } else {
    let validations = [
      data.acceptTermsAndConditions,
      // data.card.verified,
    ];
    if (validations.includes(false)) return;
    steps[2].icon = check_valid;
  }
}

watch(props, () => {
  validateApplicantData();
  validateLocationApplicant();
  validateSubvencion();
});

validateApplicantData();
validateLocationApplicant();
validateSubvencion();


//
function findCategoryByValue(categoryValue: number | string) {
  if (!categoryValue) return null;
  const data = iae.find((value) => value.value == categoryValue);
  return data;
}

function handleChange(active: number) {
  props.setActivePanel(active);
}


const totalTax = ref(0.00)
const totalBenefits = ref(0.00)


 
const totalPay = computed(() => {
  const total = Object.values(props.acquiredServices)
  .reduce((acc, item) => acc + item.costo,0)
  return total
})

const Auth = ref({});
onMounted(() => {
  Auth.value = JSON.parse(localStorage.getItem('userData'))
})

function goToLogin() {
  router.push('/login')
}

const tools = ref(JSON.parse(localStorage.dataTools || '[]'))

function getImage(tag) {
  const image = tools.value.find(item => item.tag == tag)?.image;
  return image
  // `/src/assets/images/app/${}.png`
}
</script>
<!--userData-->
<template>
  <div class="ml-auto" :style="{ maxWidth: '400px' }">
    
    <button v-if="Auth" @click="goToLogin" class="aythen_user_information mb-4">
      <figure>
        <VAvatar
          size="40"
          variant="tonal"
          :color="Auth.avatar ? '' : 'success'"
        >
          <VImg
            v-if="Auth.avatar"
            :src="Auth.avatar"
            :alt="Auth.fullName"
          />
          <span v-else class="font-weight-bold">{{ avatarText(Auth.fullName) }}</span>
        </VAvatar>
        <!--<img src="/src/assets/images/www/logo.svg" width="40" />-->
      </figure>
      
      <div class="text-sm-caption text-start">
        <p>
          <strong class="d-block text-data">{{ Auth.fullName }}</strong>
        </p>
        <p>
          <strong class="d-block text-data">{{ Auth.email }}</strong>
        </p>  
      </div>
    </button>
    <VExpansionPanels v-model="props.panelActive">
      <VExpansionPanel
        v-for="(step, index) in steps"
        :key="index"
        @click="handleChange(index)"
        disabled
        class="cursor-pointer"
      >
        <VExpansionPanelTitle disable-icon-rotate>
          <span class="text-body-2 font-bold text-uppercase">{{
            step.title
          }}</span>
          <template #actions>
            <VIcon :icon="step.icon.data" :color="step.icon.color" />
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <p class="text text-body-2">
            {{ step.text }}
          </p>
          
          <div class="grid-label">
            
            <div v-for="item in step.label" :key="item.value">
              <div v-if="item.value.length > 0">
                <template v-if="step.key == 'applicant'">
                  <template
                    v-if="
                      item.value != 'category' && props[step.key]?.[item.value]
                    "
                  >
                    <strong class="text__content"> {{ item.title }}: </strong>
                    <p
                      v-if="item.value == 'address_province'"
                      class="text__content"
                    >
                      {{ props[step.key]?.nameProvince || "-" }}
                    </p>
                    <p
                      v-else-if="item.value == 'address_city'"
                      class="text__content"
                    >
                      {{ props[step.key]?.nameCity || "-" }}
                    </p>
                    <p v-else class="text__content">
                      {{ props[step.key]?.[item.value] || "-" }}
                    </p>
                  </template>
                  <template
                    v-else-if="
                      item.value == 'category' &&
                      findCategoryByValue(props[step.key]?.[item.value])
                    "
                  >
                    <strong class="text__content"> {{ item.title }}: </strong>
                    <p class="text__content">
                      {{
                        findCategoryByValue(
                          props[step.key]?.[item.value]
                        )?.title
                      }}
                    </p>
                  </template>
                  <template
                    v-else-if="
                      item.value == 'Grantor' &&
                      findGrantorByValue(props[step.key]?.[item.value])
                    "
                  >
                    <strong class="text__content"> {{ item.title }}: </strong>
                    <p class="text__content">
                      {{
                        findGrantorByValue(
                          props[step.key]?.[item.value]
                        )?.title
                      }}
                    </p>
                  </template>
                </template>
                <template v-else-if="step.key == 'subvencion'">
                  <div
                    class="progress_questions"
                  >
                    <p class="text-body-2">Preguntas respondidas</p>
                    <VProgressLinear v-model="progressBar" rounded height="25">
                      <strong style="color: #000000">
                        {{ props.questionsAnswered }} / 13
                      </strong>
                    </VProgressLinear>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>
  </div>
</template>

<style lang="scss">
.grid-label {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em 1em;
  
  &:has(.credit__card, .progress_questions, .cite_date, .services) {
    grid-template-columns: 1fr;
  }
}

.text__content {
  font-size: 15px;
  font-family: "Public sans";
  line-height: 1;
}

.text {
  margin-top: -12px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.content__service {
  text-align: left;
  margin: 4px;
  border: 1px solid rgb(224, 224, 224);
  /*box-shadow: 0 0 2px hsl(0 0% 72%);*/
  padding: 4px;
  padding-block: 16px;
  padding-inline: 8px;
  border-radius: 7px;
  line-height: 1.2;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  &__title {
    font-size: 14px;
    /*color: var(--primary-blue);*/
    text-transform: uppercase;
  }
}

.text-c-primary {
  color: hsl(236 81% 71%);
}

.ff-public-sans {
  font-family: "Public Sans", sans-serif;
}

.credit__card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  &-item {
    line-height: 1.2;
    margin-block-end: 4px;
  }
}
.v-progress-linear__determinate {
  background: #000fff !important;
}

.aythen_avatar {
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.text-data {
  text-indent: 1em;
}

.aythen_user_information {
  inline-size: 100%;
  padding: 10px;
  background: #fff;
  border-radius: 0.4em;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  transition: scale 200ms;
  &:hover {
    scale: 1.03;
  }
}
</style>
