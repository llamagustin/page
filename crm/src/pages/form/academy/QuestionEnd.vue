<script setup lang="ts">
import ButtonStep from "@/shared/components/DumbComponents/ButtonStep.vue";
import axios from "@axios"
import moment from "moment"
import { useRouter } from "vue-router"
import { useAcademyStore } from "./useAcademyStore";

interface Props {
  updateLastStep: (step: number) => void;
}

const { updateLastStep } = defineProps<Props>();
onMounted(() => {
  updateLastStep(5);
});

const store = useAcademyStore()
const router = useRouter()

const email = ref('')
const userId = ref(null)
const isValid = ref(false)
const isValidated = ref(false)

async function handleClick() {
  isValidated.value = false
  if(isValid.value) {
    axios.put('/account/'+ userId.value, {
      academyQuestions: store.academyQuestions,
      academyCompletedAt: moment().format('Y-MM-DD'),
      id: userId.value
    })
      .then(() => {
        router.push("/login")
      })
  } else if(email.value) {
    isValid.value = false
    axios.get('/account/get-by-email/' + email.value)
      .then(({ data }) => {
        if(data != 404) {
          userId.value = data.id
          email.value = data.email
          isValid.value = true
        }
        isValidated.value = true
      })
  }
}
</script>

<template>
  <div class="text-center">
    <svg class="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
      <circle class="text-indigo-100" cx="32" cy="32" r="32" />
      <path class="text-indigo-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
    </svg>
    <!--<div class="text-lg mb-6">-->
    <!--  Gracias por formar parte de nuestro proyecto. Nuestros valores son flexibilidad y eficacia. -->
    <!--  Para cualquier duda nos tendrás disponibles tanto por correo como Whatsapp.-->
    <!--</div>-->
    <h1 class="text-3xl text-slate-800 font-bold mb-8">
      Encantada de tenerte, bienvenid@ a Aythen 🙌
    </h1>
    <p>Para terminar vamos a sincronizar tus respuestas con tu cuenta, para ello necesitamos validar tu email</p>
    <VCol cols="12" sm="12" md="8" class="ma-auto">
      <label class="block text-sm font-medium" for="email">
        Email <span class="text-rose-500">*</span>
      </label>
      <input
        v-model="email"
        id="email"
        class="form-input"
        type="text"
        spellcheck="false"
      />
      <em v-if="isValid" class="text-success text-sm-caption">Email validado.</em>
    </VCol>
    
    <VCol cols="12" sm="12" class="ma-auto" v-if="isValidated && !isValid">
      <em class="text-error text-sm-caption">El Email ingresado no se ha encontrado.</em>
    </VCol>
    
    <ButtonStep typeArrow="right" other-text hiddenArrow 
      @click="handleClick">
      {{ isValid ? 'Terminar y guardar' : 'Validar email'}}
    </ButtonStep>
  </div>
</template>