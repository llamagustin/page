<script setup lang="ts">
import { ref } from 'vue'

import FooterA from '/@src/components/web/ai/home/FooterA.vue'

import ModalBusiness from '/@src/components/web/ai/modal/ModalBusiness.vue'

const servicesInfo = ref([
    {
      icon: 'ph:pencil',
      iconColor: '#0000ff',
      title: 'WEB',
      content: `Preséntate y edita tu web`,
      to: '/ai/web',
    },
    {
      icon: 'ph:storefront',
      iconColor: '#13d33b',
      title: 'SHOP',
      content: `Vende productos y servicios`,
      to: '/ai/shop',
    },
    {
      icon: 'ph:funnel',
      iconColor: '#fff343',
      title: 'SEO',
      content: `Posicionamiento avanzado`,
      to: '/ai/seo',
    },
    {
      icon: 'ph:chat-circle',
      iconColor: '#d21643',
      title: 'RRSS',
      content: `Gestión, monitorización y análisis`,
      to: '/ai/rrss',
    },
    {
      icon: 'ph:headset',
      iconColor: '#d216ff',
      title: 'OFFICE',
      content: `Teletrabaja desde donde quieras`,
      to: '/ai/office',
    },{
      icon: 'ph:users',
      iconColor: '#ffa726',
      title: 'CRM',
      content: `Organiza y gestiona tus clientes`,
      to: '/ai/crm',
    },
  ])
  


const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: 'fa:facebook',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'fa:twitter',
  },
  {
    name: 'Linkedin',
    url: 'https://linkedin.com',
    icon: 'fa:linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'fa:github',
  },
]




//
const modalBaseOpen = ref(false)

const iniPage = ref(0)


const prevPage = () => {
  iniPage.value -= 1
  
  
  // console.log('prev page', data.value)
  // data.value[iniPage.value] = true
}

const nextPage = () => {
  iniPage.value += 1
  // data.value.fill(false)
  // data.value[iniPage.value] = true
}
</script>

<template>
  <div class="content-container">
      
        <div class="services-container">
          <h1>Aythen, ¿Qué quieres mejorar ahora?</h1>
         <div class="iconinfo-container" >
          <div class="icon_logo"
               v-for="(link, index) in servicesInfo"
               :key="index">
              <!--<Button href="/ai/profile">-->
              <!--    heuduhehuueuhd-->
              <!--</Button>-->
               <Button v-preload-link :href="link.to">
                   <div
                     class="logo"
                     :style="{background: link.iconColor}">
                     <i class="iconify icon-service" :data-icon="link.icon" />
                   </div>
                   <div>
                       <b>
                         {{ link.title }}
                       </b>
                   </div>
               </Button>
          </div>
        </div>
        <div>
          <!--router.push({ name: 'settings', params: { slug } })-->
          <Button 
            :to="{name: 'ai-slug', params: { slug: 'settings' }}"
            class="buttonProfile">
            Administrar perfiles
          </Button>
        </div>
      </div>
    <FooterA 
      bubbles="true"
      curved="true"
      :social-links="socialLinks" />
  </div>
  
  <!--Modal-->
  <Modal 
    :open="modalBaseOpen" 
    actions="between" 
    @close="modalBaseOpen = false"
    size="big"
    noclose="true"
    noscroll >
    <template #content>
       <ModalBusiness :page="iniPage"/>
    </template>
    <template #action>
        <Button 
          @click="prevPage"
          :long="2" 
          raised>
          Atrás
        </Button>
        <Button 
          @click="nextPage"
          :long="2" 
          raised>
          Confirm
        </Button>
    </template>
  </Modal>
  
  
</template>


<style lang="scss" scoped>
.icon_logo{
  display: flex;
  
  a{
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    align-items: center;
    min-height: 150px;
  }
  
  .logo{
    width: 90px;
    height: 90px;
    min-height: 90px !important;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    
    i{
      width: 38px;
    }
  }
}

.content-container{
  /*background-color: rgba(0,0,0,.9);*/
  min-height: 100vh;
}
.services-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 140px;
  gap: 30px;
}
.services-container h1{
  text-align: center;
  font-size: 2.5rem;
}
.is-dark{
  .services-container h1{
     color: #fff;
  }   
}
.iconinfo-container{
  display: flex;
  height: 180px;
  width: 100%;
  gap: 30px;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
}
.iconinfo-container ul:hover{
  filter: blur(0.7px);
}
.iconinfo-container b{
   text-align: center;
   /*color: #fff;*/
}

.is-dark{
  .iconinfo-container b{
    color: #fff;  
  } 
}

.buttonProfile{
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 24px 40px;
    
    &:is-dark{
      background: red !important;
    }
    
}

.is-dark{
    .buttonProfile{
      color: #fff;
      background-color: transparent;
      border-color: #ffffff !important;
    }
  }
 /*stylelint-disable */


/*@media (prefers-color-scheme: dark) {*/
/*  .buttonProfile{*/
/*      color: #fff;*/
/*      background-color: transparent;*/
/*      border-color: #ffffff !important;*/
/*    }*/
/*}*/


/* stylelint-disable */
.card {
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
    .text-right{
      text-align: right;
    }
    
    .card__content {
      padding: 16px;
    }
    
    .card__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    
    .card__subtitle {
      font-size: 18px;
      margin-bottom: 16px;
    }
    
    .card__text {
      font-size: 16px;
    }
}

/*IPad Air*/
@media only screen and (min-device-width: 820px) and (max-device-height: 1180px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
  
}

/*IPad pro*/
@media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
  
}

/* stylelint-enable */
@media only screen and (max-width: 990px) {
  .services-container{
    padding-top: 60px;  
  }
  
  .iconinfo-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: auto;
    gap: 20px;
    /*padding-top: 80px;*/
  }
}

@media only screen and (max-width: 900px) {
  h1{
    display: none;
  }
  
  .iconinfo-container{
    grid-template-columns: 1fr 1fr;
    padding: 0px 30px;
  }
    
}
</style>
