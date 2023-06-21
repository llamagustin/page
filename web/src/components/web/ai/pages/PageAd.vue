<script setup lang="ts">
import {  services } from '/@src/texts/services/flow'
  
import { ref, defineEmits } from 'vue'

import componentGPT from '/@src/components/web/ai/componentGPT.vue'
import trendGPT from '/@src/components/web/ai/trendGPT.vue'

import { cardTeam } from '/@src/data/services/team'



const dataGPT = ref([{
  title: 'web'
},{
title: ''   
},{
title: ''   
},{
title: ''   
}])


// import trendGPT from '/@src/components/web/ai/trendGPT.vue'


const servicesInfo = ref([
    {
      icon: 'ph:pencil',
      iconColor: '#0000ff',
      title: 'WEB',
      content: `Preséntate y edita tu web`,
      to: '/ai/flow',
    },
    {
      icon: 'ph:storefront',
      iconColor: '#13d33b',
      title: 'SHOP',
      content: `Vende productos y servicios`,
      to: '/ai/flow',
    },
    {
      icon: 'ph:funnel',
      iconColor: '#fff343',
      title: 'SEO',
      content: `Posicionamiento avanzado`,
      to: '/ai/flow',
    },
    {
      icon: 'ph:chat-circle',
      iconColor: '#d21643',
      title: 'RRSS',
      content: `Gestión, monitorización y análisis`,
      to: '/ai/flow',
    },
    {
      icon: 'ph:headset',
      iconColor: '#d216ff',
      title: 'OFFICE',
      content: `Teletrabaja desde donde quieras`,
      to: '/ai/flow',
    },{
      icon: 'ph:users',
      iconColor: '#ffa726',
      title: 'CRM',
      content: `Organiza y gestiona tus clientes`,
      to: '/ai/flow',
    },
  ])


console.log('Render')

interface Emits {
  (e: 'changePage', value): void;
}

const emit = defineEmits<Emits>()
</script>


      
<template>
  <div>

    <Card shape="squared">
      <h1>Hola como esats</h1>
      <div class="flex" :style="{gap: '8px'}">
        <AvatarSimple 
         picture="https://dummyimage.com/150x150" 
         size="medium" 
         squared="true"
         badge="/@src/assets/icons/flags/united-states-of-america.svg" />
         <div>
          <Title 
            class="mb-0" weight="semi" :size="4">
            Business Relacionado
          </Title>
          <div>
            Business creado 
            Categoria
          </div>
         </div>
      </div>
      <hr />
      <div>
        <div class="columns">
          <div class="column is-6 pb-0">
            <Field>
              <FieldLabel label="Propietario"></FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Search any prompt?" />
              </Control>
            </Field>
          </div>
          <div class="column is-6 pb-0">
            <Field>
              <FieldLabel label="Propietario"></FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Search any prompt?" />
              </Control>
            </Field>
          </div>
        </div>
        <div>
          <Field>
            <FieldLabel label="Descripción"></FieldLabel>
            <Control>
              <VTextarea v-model="textareaValue" :resize="false" placeholder="Write something..." />
            </Control>
          </Field>
        </div>
        <div class="mt-2 flex">
          <Button 
            @click="emit('changePage', 0)"
            color="danger" 
            outlined>
            <span class="mr-2">
              Cancelar Edited
            </span>
          </Button>
          <Button color="primary" class="ml-auto" outlined>
            <span class="mr-2">
              Try This Prompt Now
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </Button>
        </div>
      </div>
    </Card>
    <Card shape="squared" class="mt-4">
      <div class="flex" :style="{gap: '8px'}">
        <div v-for="(item, index) in ['', '']">
          <trendGPT />
        </div>
      </div>
    </Card>
    <Card shape="squared" class="mt-4">
      <div>
        <div>
          <Title class="mb-0" :size="5">
            Lorem ipsum
          </Title>
          <p class="paragraph mb-4">
            Lorem ipsum folo tet
          </p>
        </div>
        <div class="services-stats">
          <div class="service-stats" v-for="(link, index) in servicesInfo">
              <div
                class="service-logo"
                :style="{background: link.iconColor}">
                <i class="iconify service-icon" :data-icon="link.icon" />
              </div>
              <b class="service-title">
                    {{ link.title }}
              </b>
          </div>
        </div>
        <div>
          <p>
            Estadistica un poco sobre los 6 servicios:
          </p>
        </div>
      </div>
    </Card>
    
    <Card shape="squared" class="mt-4">
      <div>
        <Title class="mb-0" :size="5">
          Tasks activos
        </Title>
        <p class="paragraph mb-4">
          Lorem ipsum folo tet
        </p>
      </div>
    </Card>
    <Card shape="squared" class="mt-4">
      <div>
        <Title class="mb-0" :size="5">
          Freelancers activos
        </Title>
        <p class="paragraph mb-4">
          Lorem ipsum folo tet
        </p>
      </div>
      <div>
        <FreelancerBlock :items="cardTeam" squared animated />
      </div>
    </Card>
    
  </div>
</template>



<style lang="scss" scoped>

.carousel{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }



  .tags{
    display: flex;
    gap: 20px;
    margin: 10px 0px;
    
    small{
      line-height: 24px;
      font-size: 16px;
      padding: 4px 20px;
    }
  }
  
  .left{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .gpt{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

  }
  
  .icon-prompts{
    width: 24px;
    min-width: 24px;
    height: 24px;
  }


.flow-business{
  .logo{
    width: 70px;
    height: 70px;
    border-radius: 6px;
  }
}


.tag-service{
  display: flex;
  gap: 8px;
  text-transform: uppercase;
  
  .icon-box{
    width: 20px;
    height: 20px;
    min-width: 20px;
    justify-content: center;
  }
}




.services-stats{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    padding: 0px 20px;
    
  .service-stats{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 6px;
      color: #fff;
      
      .service-logo{
        width: 50px;
        height: 50px;
        min-height: 50px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        
      }
      .service-icon{
         width: 34px;
        height: 34px;
      }
      .service-title{
        font-size: 14px;
      }
  }
}
</style>