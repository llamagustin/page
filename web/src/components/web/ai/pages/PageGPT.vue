<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import { useGPT } from '../useGPT'
  import { boxedTestimonials } from '/@src/components/web/ai/testimonials.ts'
  import { usePageInformation } from "/@src/components/web/ai/pages/usePageInformation"
  import trendGPT from '/@src/components/web/ai/trendGPT.vue'
  // import componentGPT from '/@src/components/web/ai/componentGPT.vue'

  const { randomPrompt } = usePageInformation();
  const {
    category,
    subcategory,
    dateTime,
    title,

    trendsGPT,
    itemsGPT,
    dataGPT,
    business
  } = useGPT()

  const options = ref([{
    value: 'Hamburger',
    label: 'Hamburger',
  }])


  const chatGPT = ref([{
    text: `Click Try This Prompt Now, or type your question in the chatbox below, 
                      to start our conversation.`,
  }, {
    text: `Click Try This Prompt Now, or type your question in the chatbox below, 
                      to start our conversation.`
  }])

  interface Emits {
    (e: 'changePage', value): void;
  }
  const emit = defineEmits < Emits > ()
</script>
  
  
  <template>
    <div>
          <Title :size="2">{{ randomPrompt?.title }}</Title>
          <p class="-mt-4">
            {{ randomPrompt?.input }}
          </p>
          <div class="mt-2 flex" style="gap: 4px">
            <div v-for="item in randomPrompt?.category">
              <Tag :label="item" outlined></Tag>
            </div>
            <span class="ml-4">
              + more trends
            </span>
          </div>
          <hr />
          <div class="flex" :style="{gap: '12px'}">
            <div class="gpt-logo">
              <img src="https://flowgpt.com/icons/chatgpt.png" />
            </div>
            <Card class="p-2 -mt-4">
              <p>
                Hi! This is ChatGPT. This is a fully integrated ChatGPT Playground. 
                Click Try This Prompt Now, or type your question in the chatbox below, 
                to start our conversation.
              </p>
              <Button>
                <span class="mr-2">
                  Try This Prompt Now
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </Button>
            </Card>
          </div>
          <div>
            <div class="mt-10" v-for="(chat, index) in chatGPT">
                <div class="flex" :style="{gap: '12px'}">
                  <div class="gpt-logo">
                    <img src="https://flowgpt.com/icons/chatgpt.png" />
                  </div>
                  <Card class="p-2 -mt-4">
                    <p>
                      {{chat.text}}
                    </p>
                  </Card>
                </div>
            </div>
          </div>
          <hr />
          <div class="mb-4">
            <VTextarea v-model="textareaValue" placeholder="Write something..." />
          </div>
          <div>
              <Button class="ml-auto">
                <span class="mr-2">
                  Enviar
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </Button>
          </div>
          <hr />
          <div>
              <div>
                <Title :size="4">
                  Opiniones de prompt
                </Title>
                <p class="-mt-4">
                  Tienes un 89% de éxito con este prompt según la experiencia de usuario y
                  de nuestra comunidad. Úsala y potencia tu red empresarial GPT.
                </p>
              </div>
              <div class="mt-4 flex" :style="{gap: '20px'}">
                <div  v-for="(items, index) in ['', '']">
                  <!--<componentGPT @click="emit('changePage', 4)"/>-->
                </div>
              </div>
          </div>
          <hr />
          <div class="mobile-hidden">
              <div>
                <Title :size="4">
                  Opiniones de la comunidad
                </Title>
                <p class="-mt-4">
                  Pregunta o resuelve tus dudas en la comunidad de <b>agentes verificados</b>
                  ellos te ayudarán a resolver cualquier pregunta que tengas sobre Aythen
                </p>
              </div>
              <div class="-mt-4">
                 <ServicesTestimonial :testimonials="boxedTestimonials" squared />
              </div>
          </div>
      </div>
  </template>
  
  
  <style lang="scss" scoped>
  
  </style>