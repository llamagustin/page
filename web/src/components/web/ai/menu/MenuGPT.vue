<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import { services } from '/@src/texts/ai/flow'
  import { features } from '/@src/data/services/features'
  import { cardTeam } from '/@src/data/services/team'
  import { usePageInformation } from "/@src/components/web/ai/pages/usePageInformation"
  const { tools } = usePageInformation();
  const options = ref([{
    value: 'Hamburger',
    label: 'Hamburger',
  }])

  interface Emits {
    (e: 'changePage', value): void;
  }

  const emit = defineEmits<Emits>();
</script>
  
  
  <template>
    <Card rounded="small">
      <div>
        <Card class="p-2">
          <div class="flex items-center" :style="{alignItems: 'center'}">
            <Title :size="4" class="mb-0">
              Soluciones Digitales
            </Title>
            <div class="ml-auto button-header flex" :style="{gap: '10px'}">
              <Button @click="emit('changePage', 3)" class="mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-left">
                  <polyline points="9 10 4 15 9 20" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </svg>
              </Button>
              <Button @click="emit('changePage', 1)" class="mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </Button>
            </div>
          </div>
          <hr class="my-2" />
          <div class="mt-4 info">
            <Tag class="primary mr-1 mb-2 is-inline-block">
              <div class="tag-info">
                <div>
                  20
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                works
              </div>
            </Tag>
            <Tag class="primary mr-1 mb-2 is-inline-block">
              <div class="tag-info">
                <div>
                  10
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-merge">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M6 21V9a9 9 0 0 0 9 9" />
                  </svg>
                </div>
                projects
              </div>
            </Tag>
            <Tag class="primary mr-1 mb-2 is-inline-block">
              <div class="tag-info">
                <div>
                  10
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                freelancers
              </div>
            </Tag>
            <Tag class="primary mr-1 mb-2 is-inline-block">
              <div class="tag-info">
                <div>
                  4
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                trabajos
              </div>
            </Tag>
            <Tag class="primary mr-1 mb-2 is-inline-block">
              <div class="tag-info">
                <div>
                  2
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                call
              </div>
            </Tag>
          </div>
          <div class="mt-2">
            <p>
              Pero el misno contenido
              que tenga aolgo como de repetir o poner en trenfd y en trrend vamos a poner un botton de eliminar.
            </p>
          </div>
          <div class="mt-4">
            <Field>
              <FieldLabel label="Select Category"></FieldLabel>
              <Control>
                <VSelect v-model="selectOneValue" :options="options" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Choose an option"></FieldLabel>
              <Control>
                <VSelect v-model="selectOneValue" :options="options" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Choose an option"></FieldLabel>
              <Control>
                <VSelect v-model="selectOneValue" :options="options" />
              </Control>
            </Field>
            <div class="flex" :style="{gap: '6px'}">
              <Field class="is-6">
                <FieldLabel label="Date Time"></FieldLabel>
                <Control>
                  <VInput v-model="inputOneValue" placeholder="John Doe" />
                </Control>
              </Field>
              <Field class="is-6">
                <FieldLabel label="Enter Title"></FieldLabel>
                <Control>
                  <VInput v-model="inputOneValue" placeholder="John Doe" />
                </Control>
              </Field>
            </div>
            <hr />
            <div>
              <small>
                freelancers que van a tener y organizar equipo
                nombre
                about
                skills
                experience
                category
                subcategory
              </small>
              <ul class="flex" :style="{gap: '8px'}">
                <li class="mt-2" v-for="(slide, index) in services" :key="index">
                  <RouterLink :to="slide.to" class="box-carousel-box flex items-center" :style="{gap: '8px'}">
                    <div class="box-inner">
                      <IconService :color="slide.iconColor" size="small">
                        <i class="iconify" :data-icon="slide.icon"></i>
                      </IconService>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      <div class="mobile-hidden">
        <hr />
        <div>
            <div>
              <Title :size="4">
                Aythen Plataforma
              </Title>
              <p class="-mt-4">
                Obtén el máximo potencial con tu cuenta premium para obtener todos 
                los prompts que necesites
              </p>
            </div>
            <!--tools-->
            <div class="mt-2">
              <ServicesGPT :features="tools" :limit="6" size="small" horizontal  animated />
            </div>
        </div>
        <hr />
        <div>
          <FreelancerBlock :items="cardTeam" squared animated />
        </div>
      </div>
    </Card>
  </template>
  
  
  <style lang="scss" scoped>
  .button-header{
    .button{
      
      height: 38px;
      width: 38px;
      min-height: 38px;
      padding: 5px;
    }
  }
  </style>