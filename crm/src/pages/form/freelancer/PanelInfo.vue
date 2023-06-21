<script lang="ts" setup>
import iae from "@/@fake-db/data/iae.json";
import { defineProps } from "vue";
import { avatarText } from "@core/utils/formatters";


import { isID } from "@/shared/utils/id";

interface Props {
  applicant: any;
  panelActive: number;
  //subvencion: string;
  
  setActivePanel: (step: number) => void;
  data:any;
}


const props = defineProps<Props>();
//const panel = ref(1);

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

const isEmpty = (str: string) => str.length === 0;


const steps = reactive([
  {
    id: 1,
    title: "Datos Personales",
    text: `Datos necesarios para el registro de aythen.`,
    key: "applicant",
    icon: check_error,
    label: [],
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


function findCategoryByValue(categoryValue: number | string) {
  if (!categoryValue) return null;
  const data = iae.find((value) => value.value == categoryValue);
  return data;
}

function handleChange(active: number) {
  console.log('active',active)
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

const tools = ref(JSON.parse(localStorage.dataTools || '[]'))

function getImage(tag) {
  const image = tools.value.find(item => item.tag == tag)?.image;
  return image
  // `/src/assets/images/app/${}.png`
}

const dataUbigeo=computed(()=>{
  let profile=props.data;
  let qr=[
      {title:"Zona Horaria",value:profile.timezone},
      {title:"País",value:profile.address.country},
      {title:"Ciudad",value:profile.address.city},
      {title:"Codigo Postal",value:profile.address.postalCode},
      {title:"Dirección",value:profile.address.line},
    ];
  
 return {
    id:5,
    title: "Direccion ",
    text: `Datos de experiencia, para el registro de aythen.`,
    key: "experience",
    icon: check_error,
    label:qr.filter((el) => el.value && el.value !== "" && el.value !==", , , "),
    data:props.data
  }
})

const dataExperience = computed(()=>{
  
  return {
    id:3,
    title: "Experiencia Laboral ",
    text: `Datos de experiencia, para el registro de aythen.`,
    key: "experience",
    icon: check_error,
    label:props.data.experiences
  }
})

const dataSkills = computed(()=>{
  return {
    id:4,
    title: "Habilidades",
    text: `Datos de Habilidades, para el registro de aythen.`,
    key: "skills",
    icon: check_error,
    label: props.data.skills
  }
})

const dataStudy = computed(()=>{
  
  
  return {
    id:2,
    title: "Estudios Realizados",
    text: `Datos de estudios, para el registro de aythen.`,
    key: "applicant",
    icon: check_error,
    label:props.data.academies
  }
})

const dataProfile = computed(()=>{
  let profile=props.data;
  let qr  = [
    {title:"Nombres", value:profile.name.name},
    {title:"Primer Apellido",value:profile.name.firstSurname},
    {title:"Segundo Apellido",value:profile.name.secondSurname},
    {title:"Portafolio",value:profile.profile},
    {title:"Idioma",value:profile.language},
    {title:"Zona Horaria",value:profile.timezone},
    {title:"Categoria",value:profile.category},
    {title:"Sub Categoria",value:profile.subcategory},
    {title:"Sobre mí",value:profile.about},
    {title:"Rango Salarial",value:profile.salary},
    {title:"Dirección",value:`${profile.address.line}, ${profile.address.country}, ${profile.address.city}, ${profile.address.postalCode}`},
    ]
    
    qr={
      id: 1,
      title: "Datos Personales",
      text: `Datos necesarios para el registro de aythen.`,
      key: "applicant",
      icon: check_error,
      label: qr.filter((el) => el.value && el.value !== "" && el.value !==", , , "),
    }

  return qr
})

</script>
<!--userData-->
<template>
  <div class="ml-auto mt-6" :style="{ maxWidth: '450px' }">
    <VExpansionPanels v-model="props.panelActive">
      <VExpansionPanel @click="handleChange(0)" >
        <VExpansionPanelTitle disable-icon-rotate>
          <span class="text-body-2 font-bold text-uppercase">{{dataProfile.title}}</span>
          <template v-if="false" #actions>
            <VIcon :icon="dataProfile.icon.data" :color="dataProfile.icon.color" />
          </template>
        </VExpansionPanelTitle>
        
        <VExpansionPanelText>
          <p class="text text-body-2">{{ dataProfile.text }}</p>
          <div class="grid-label mb-3">
            <template v-for="item in dataProfile.label" >
                <strong class="text__content"> {{ item.title }}: </strong>
                <p  class="text__content"> {{ item.value  }} </p>
            </template>
          </div>
        </VExpansionPanelText>

      </VExpansionPanel>
      
      <VExpansionPanel @click="handleChange(0)" >
        <VExpansionPanelTitle disable-icon-rotate>
          <span class="text-body-2 font-bold text-uppercase">{{dataUbigeo.title}}</span>
          <template  v-if="false" #actions>
            <VIcon :icon="dataUbigeo.icon.data" :color="dataUbigeo.icon.color" />
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <div class="grid-label mb-3">
            <template v-for="item in dataUbigeo.label" >
                <strong class="text__content"> {{ item.title }}: </strong>
                <p  class="text__content"> {{ item.value  }} </p>
            </template>
          </div>
        </VExpansionPanelText>
        
      </VExpansionPanel>

      
      <VExpansionPanel @click="handleChange(1)">
        <VExpansionPanelTitle disable-icon-rotate>
          <span class="text-body-2 font-bold text-uppercase">{{dataStudy.title}}</span>
          <template  v-if="false" #actions>
            <VIcon :icon="dataStudy.icon.data" :color="dataStudy.icon.color" />
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <template  v-for="(academy,index) in dataStudy.label">
            <div class="grid-label mb-3" :class="[index > 0 && 'border-up']"  >
              <strong class="text__content"> Institución:  </strong>
              <p  class="text__content"> {{ academy.institution  }} </p>
            </div>
            <div class="grid-label mb-3" >
              <strong class="text__content"> Grado:  </strong>
              <p  class="text__content"> {{ academy.degree  }} </p>
            </div>
            <div class="grid-label mb-3" >
              <div>
                <strong class="text__content"> Ingreso:  </strong>
                <p  class="text__content"> {{ academy.startDate  }} </p>
              </div>
              <div>
                <strong class="text__content"> Egreso:  </strong>
                <p  class="text__content"> {{ academy.endDate  }} </p>
              </div>
            </div>
          </template>
        </VExpansionPanelText>

      </VExpansionPanel>
      
      <VExpansionPanel @click="handleChange(2)">        
        <VExpansionPanelTitle disable-icon-rotate>
          <span class="text-body-2 font-bold text-uppercase">{{dataExperience.title}}</span>
          <template  v-if="false" #actions>
            <VIcon :icon="dataExperience.icon.data" :color="dataExperience.icon.color" />
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <template  v-for="(experience,index) in dataExperience.label">
            <div class="grid-label mb-3" :class="[index > 0 && 'border-up']"  >
              <strong class="text__content"> Empresa:  </strong>
              <p  class="text__content"> {{ experience.company  }} </p>
            </div>
            <div class="grid-label mb-3" >
              <strong class="text__content"> Cargo:  </strong>
              <p  class="text__content"> {{ experience.position  }} </p>
            </div>
            <div class="grid-label mb-3" >
              <strong class="text__content"> Descrición:  </strong>
              <p  class="text__content"> {{ experience.description  }} </p>
            </div>
            <div class="grid-label mb-3" >
              <div >
                <strong class="text__content"> Ingreso:  </strong>
                <p  class="text__content"> {{ experience.startDate  }} </p>
              </div>
              <div >
                <strong class="text__content"> Egreso:  </strong>
                <p  class="text__content"> {{ experience.endDate  }} </p>
              </div>
            </div>
          </template>
        </VExpansionPanelText>
      </VExpansionPanel>

      <VExpansionPanel @click="handleChange(3)">
        <VExpansionPanelTitle disable-icon-rotate>
          <span class="text-body-2 font-bold text-uppercase">{{dataSkills.title}}</span>
          <template  v-if="false" #actions>
            <VIcon :icon="dataSkills.icon.data" :color="dataSkills.icon.color" />
          </template>
        </VExpansionPanelTitle>
        
        <VExpansionPanelText class="mb-4">
          <div v-for="(skills,key) in dataSkills.label">
            {{key}}
            <div>
              <VChip class="pa-2" color="color" text-color="white" v-for="skill in skills">{{skill}}</VChip>
            </div>
          </div>
        </VExpansionPanelText>

      </VExpansionPanel>
      

    </VExpansionPanels>
  </div>
</template>

<style lang="scss">
.border-up {
  border-top:1px solid #ccc ;
  padding-top: 7px;
}
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
