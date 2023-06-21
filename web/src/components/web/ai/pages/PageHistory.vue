<script setup lang="ts">
import { ref, defineEmits, onMounted, onUnmounted } from 'vue'
import { services } from '/@src/texts/ai/flow'
import { usePageInformation } from "/@src/components/web/ai/pages/usePageInformation"

const _services = services.map(c => ({
  label: c.title,
  value: c.title.toLowerCase()
}));

interface Emits {
  (e: 'changePage', value): void;
}
const emit = defineEmits<Emits>()

const { storePrompt, formPrompt, listPromps } = usePageInformation();

const prompts = ref([{
  tool: {
    iconColor: '#000fff',
    icon: '',
    name: 'web'
  },
  title: '',
  subcategory: '',
  date: ''
}])

const categories = ref("");

function handleSubmit() {
  formPrompt.value.category = categories.value.split(",").map(c => c.toLowerCase().trim()).filter(c => String(c).length);
  storePrompt();
  categories.value = "";
  emit('changePage', 3);
}

function getService(key) {
  return services.find(c => c.title.toLowerCase() == key)
}

</script>


<template>
  <Container>
  <div class="px-2">
    <Card class="p-4">
      <Title tag="h2" class="mb-2">
        Crear un nuevo prompt
      </Title>
      <hr class="mt-0"/>
      <Subtitle tag="h3" class="mb-0">
        Pregunta todo lo que necesites en la red de Aythen GPT
      </Subtitle>
      <p class="mt-2 paragraph">
        Aythen te ayuda a crear y mantener tu historial de recursos de intelgiencia 
        además de compartir en nuestra comunidad de desarrollades y servicios conectados
        a través de las nuevas tecnologías
      </p>
      <div class="columns mt-2 mb-0">
        <Field class="column is-4">
          <FieldLabel label="Selecciona un servicio"></FieldLabel>
          <Control>
            <VSelect v-model="formPrompt.service" :options="_services" />
          </Control>
        </Field>
        <Field class="column is-8">
          <FieldLabel label="Escríbe un título"></FieldLabel>
          <Control>
            <VInput v-model="formPrompt.title" placeholder="Complete" />
          </Control>
        </Field>
      </div>
      <div class="columns mb-0">
        <Field class="column is-12">
          <FieldLabel label="Escríbe una(s) categorías"></FieldLabel>
          <Control>
            <VInput v-model="categories" placeholder="Complete" />
          </Control>
          <small><em>Separe las categorias por ( <b>,</b> )</em></small>
        </Field>
      </div>
      <div>
        <FieldLabel label="Escribe el prompt semilla"></FieldLabel>
        <Field>
          <VTextarea v-model="formPrompt.input" placeholder="Complete" />
        </Field>
        <hr />
        <div class="mt-2 flex">
          <Button 
            @click="emit('changePage', 3)"
            color="danger" 
            outlined>
            <span class="mr-2">
              Cancelar
            </span>
          </Button>
          <Button color="primary" class="ml-auto" outlined @click="handleSubmit">
            <span class="mr-2">
              Guardar
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </Button>
        </div>
      </div>
    </Card>
    <div class="mt-10 columns" style="overflow: auto;  scroll-behavior: smooth; scroll-snap-type: x mandatory;" ref="scrollContainer">
      <div 
        v-for="(prompt, key) in listPromps"
        :key="key"
        class="card-prompt column is-12"
        style="scroll-snap-align: start;">
        <!--is-offset-2-->
        <!--<div class="card-line"></div>-->
        <Card class="card-prompt">
          <div class="card-buttons">
            <Button href="/ai/profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28">
                <path d="M6.65263 14.0304C6.29251 13.6703 6.29251 13.0864 6.65263 12.7263C7.01276 12.3662 7.59663 12.3662 7.95676 12.7263L11.6602 16.4297L19.438 8.65183C19.7981 8.29171 20.382 8.29171 20.7421 8.65183C21.1023 9.01195 21.1023 9.59583 20.7421 9.95596L12.3667 18.3314C11.9762 18.7219 11.343 18.7219 10.9525 18.3314L6.65263 14.0304Z" fill="currentColor" />
                <path clip-rule="evenodd" d="M14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1ZM3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14Z" fill="currentColor" fill-rule="evenodd" />
              </svg>
            </Button>
            <Button href="/ai/profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" version="1.1" fill="currentColor">
                <title>Cancel</title>
                <path d="M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM16 6c-5.522 0-10 4.478-10 10s4.478 10 10 10c5.523 0 10-4.478 10-10s-4.477-10-10-10zM20.537 19.535l-1.014 1.014c-0.186 0.186-0.488 0.186-0.675 0l-2.87-2.87-2.87 2.87c-0.187 0.186-0.488 0.186-0.675 0l-1.014-1.014c-0.186-0.186-0.186-0.488 0-0.675l2.871-2.869-2.871-2.87c-0.186-0.187-0.186-0.489 0-0.676l1.014-1.013c0.187-0.187 0.488-0.187 0.675 0l2.87 2.87 2.87-2.87c0.187-0.187 0.489-0.187 0.675 0l1.014 1.013c0.186 0.187 0.186 0.489 0 0.676l-2.871 2.87 2.871 2.869c0.186 0.187 0.186 0.49 0 0.675z" />
              </svg>
            </Button>
            <Button href="/ai/profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Button>
          </div>
          <div class="card-header">
            <!--<div class="card-avatar">-->
            <!--  <img src="" />--->
            <!--  Avatar-->
            <!--</div>-->
            <div>
              <div class="card-header-top">
                <div class="card-tool has-text-centered">
                  <IconService
                    :color="getService(prompt.service)?.iconColor"
                    size="small"
                    class="m-auto"
                  >
                    <i
                      class="iconify"
                      :data-icon="getService(prompt.service).icon"
                    ></i>
                  </IconService>
                  <small class="small">{{getService(prompt.service)?.title}}</small>
                </div>
                <span class="card-title" style="padding-inline: 1em 4em;">
                  {{prompt?.title}}
                </span>
              </div>
              <hr class="mt-3 mb-3"/>
              <div class="card-subcategory mb-3">
                <!--{{prompt?.subcategory ?? 'Subcategria'}}-->
                <span class="medium-text mr-3">Categorias:</span>
                <Tag v-for="item in prompt.category" color="primary" class="mr-1 mb-1" :label="item"></Tag>
                <!--<span class="card-date"></span>-->
              </div>
            </div>
          </div>
          <div class="card-prompt">
            <div class="input mb-4">
              <strong class="mr-1 is-inline-block" style="width: 48px">Input: </strong>{{ prompt.input }}
            </div>
            <div class="input">
              <strong class="mr-1 is-inline-block" style="width: 48px">Output: </strong> {{ prompt.output }}
            </div>
            <!--{{prompt.history}}-->
              
          </div>
        </Card>
      </div>
    </div>
  </div>
  </Container>
</template>

<style lang="scss" scoped>



.card-prompt{
  position: relative;
}

.card-prompt :deep(.card-content) {
  padding: 1.2em !important;
}

.card-line{
  width: 4px;
  height: 100px;
  background: red;
  position: absolute;
  left: -10px;
}

.card-prompt{
  
}

.card-buttons{
  position: absolute;
  top: 0px;
  right: 0px;
  
  .button{
    padding: 4px;
    min-height: 10px;
  }
  
  svg{
    width: 12px;
    height: 12px;
  }
}

.card-header{
  display: flex;
  box-shadow: none;
}

.card-avatar{
   width: 60px;
   height: 60px;
   border-radius: 10px;
   /*background: #fff000;*/
   border: 1px solid inherit;
}

.card-header-top{
  display: flex;
}

.card-tool,
.medium-text{
  color: var(--light-text);
}

.card-title{
  color: var(--medium-text);
}

.card-subcategory{
  
}

.card-date{
  
}

.card-prompt{
  .input{
    align-items: flex-start;
    height: auto;
    padding-block: 1em;
    font-size: 13px;
  }
  
  .output{
    
  }
}

  
</style>