<script setup lang="ts">
  /*global localStorage*/
  import {ref,watch,onMounted} from 'vue'

  
  const cookies=ref({status:null})
  const modalOpen = ref(true)
  const panel = ref()
  
  watch(cookies.value,val=>{
    localStorage.setItem("acceptCookies",val.status)
  })
  
  onMounted(()=>{
    let status= localStorage.getItem("acceptCookies")
    if(status!== null){
      cookies.value.status=status==="true"
    } else
      modalOpen.value=true
  })
  
  let accordionItems = [
        {
          title: "Cómo usamos estas cookies",
          content: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
          expanded: false 
        },
        {
          title: "Si permites el uso de estas cookies",
          content: "This is the second item's accordion body. It is collapsed by default.",
          expanded: false 
        },
        {
          title: "Si no permites el uso de estas cookies",
          content: "This is the second item's accordion body. It is collapsed by default.",
          expanded: false 
        }

        
      ]
    
    let accordionItems2=[
      {title:"Controles de tu cuenta de Aythen"},
      {title:"Más información sobre la publicidad en internet"},
      {title:"Controlar las cookies mediante la configuracion del navegador"},
      ]
  
</script>
<template>
  <div>
    
    <div v-if="cookies.status==null" >
    
      <Modal title="Aythen" :open="modalOpen" size="large" actions="center" noscroll @close="modalOpen = false" >
        <template #content>
          <div class="m-2 p-2">
            <Title tag="h3" :size="5" class="title">¿Permitir el uso de cookies de Aythen en este navegador?</Title>
            <p class="paragraph rem-80 has-text-justified">
              <p class="is-justified">
                Usamos cookies y tecnologías similares para proporcionar y mejorar el contenido en los <b>Productos de Aythen</b>. También las utilizamos para ofrecer una experiencia más segura. A este fin, empleamos información que recibimos de cookies dentro y fuera de <b>Aythen</b>, y para mejorar los <b>Productos de Aythen</b> para las personas que tienen una cuenta.
              </p>
              
              <ul class="pl-4 py-2" style="list-style-type: disc;">
                <li><b>Cookies necesarias:</b> son imprescindibles para usar los <b>Productos de Aythen</b> y son necesarias para que nuestros sitios funcionen de la manera prevista.</li>
                <li><b>Cookies de otras empresas: </b>utilizamos estas cookies para mostrarte anuncios fuera de los <b>Productos de Aythen</b> y proporcionar funciones, como mapas y viedeos, en los <b>Productos de Aythen</b>. Esta cookies son opcionales.</li>
              </ul>
              
              Tú decides qué cookies opcionales utilizamos. Obtén más información sobre las cookies y cómo las utilizamos, y revisa o cambia tus preferencias cuando quieras en nuestra Política de cookies.
            </p>
            <hr />
            <Title tag="h3" :size="5">Información sobre las cookies</Title>
            
            <div class="columns">
              <div class="column is-6">
                <div class="card px-4 py-5">
                  <div>
                    <img class="ml-5" src="https://via.placeholder.com/200x175">
                  </div>
                  
                  <div class="mt-3">
                    <span class="title is-size-6">¿Qué son las Cookies?</span>
                  </div>
                  <div class="mt-3">
                    <Button size="" class="button btn-info">Más Información</Button>
                  </div>
                </div>
              </div>
              
              <div class="column is-6">
                <div class="card px-4 py-5">
                  <div class="m-auto">
                    <img class="ml-5"  src="https://via.placeholder.com/200x175">
                  </div>
                  <div class="mt-3">
                    <span class="title is-size-6">¿Por qué usamos las Cookies?</span>
                  </div>
                  <div class="mt-3">
                    <Button size="" class="button btn-info">Más Información</Button>
                  </div>
                </div>
                
              </div>
            </div>
            
            <div class="columns">
              <div class="column is-6">
                <div class="card px-4 py-5">
                  <div>
                    <img class="ml-5" src="https://via.placeholder.com/200x175">
                  </div>
                  
                  <div class="mt-3">
                    <span class="title is-size-6">¿Qué son los Productos de Aythen?</span>
                  </div>
                  <div class="mt-3">
                    <Button size="" class="button btn-info">Más Información</Button>
                  </div>
                </div>
              </div>
              
              <div class="column is-6">
                <div class="card px-4 py-5">
                  <div class="m-auto">
                    <img class="ml-5"  src="https://via.placeholder.com/200x175">
                  </div>
                  <div class="mt-3">
                    <span class="title is-size-6">Tus preferencias de cookies</span>
                  </div>
                  <div class="mt-3">
                    <Button size="" class="button btn-info">Más Información</Button>
                  </div>
                </div>
                
              </div>
            </div>
            
            <hr />
            
            <Title tag="h3" :size="5">Cookies de otras empresas</Title>
            <p class="paragraph rem-80 has-text-justified">Usamos cookies de otras empresas para mostrarte anuncios fuera de nuestros productos y proporcionar funciones, como mapas, servicios de pago y videos.</p>
            
            <p>
               <div class="accordion" id="accordionExample">
                <div class="accordion-item" v-for="(item, index) in accordionItems" :key="index">
                  <h2 class="accordion-header" :id="'heading' + index">
                    <button class="accordion-button" type="button" @click="item.expanded=!item.expanded" :aria-expanded="item.expanded" :aria-controls="'collapse' + index">
                      {{ item.title }}
                    </button>
                  </h2>
                  
                </div>
              </div>
              
            </p>
            
            <hr />
            <Title tag="h3" :size="5">Otras maneras de controlar la información</Title>
            <p>
              
               <div class="accordion" id="accordionExample">
                <div class="accordion-item" v-for="(item, index) in accordionItems2" :key="index">
                  <h2 class="accordion-header" :id="'heading' + index">
                    <button class="accordion-button" type="button" @click="item.expanded=!item.expanded" :aria-expanded="item.expanded" :aria-controls="'collapse' + index">
                      {{ item.title }}
                    </button>
                  </h2>
                  
                </div>
              </div>
              
              
              
            </p>

            
          </div>
          
          
        </template>
        <template #action>
          <div class="pt-3">
            <Button @click="cookies.status=false" >Rechazar las Cookies</Button>          
            <Button color="primary" @click="cookies.status=true"  raised>Acceptar las Cookies</Button>
          </div>
        </template>
      </Modal>
      
    </div>

    <div v-if="cookies.status==false" class="container mb-6 mt-3" >
      <Card class="fixed-bottom" style="background-color:#f7f7f7" shape="squared">
        <div class="columns">
          <div class="column is-10">
            <p class="paragraph rem-80 has-text-justified">
              Este sitio web almacena datos, tales como cookies, para garantizar el funcionamiento basico del sitio, asi como marketing, personalizacion y
              analisis. puedes cambiar la configuracion en cualquier momento, o aceptar la configuracion predeterminada. puede cerrar este banner para
              continuar con solo las cookies esenciales Politica de cookies
            </p>
          </div>
          <div class="column">
            <Button color="primary" @click="cookies.status=true"  >Acceptar</Button>
          </div>
        </div>
      </Card>
    </div>
    
    
  </div>
</template>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';

.btn-info {
  width: 100%;
  border-radius: 0px;
  background-color: lightgray;
  
}
.paragraph b {
  color:#779;
}
  
</style>