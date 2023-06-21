<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

import instance from "axios";
instance.defaults.baseURL = "https://api.aythen.com"

const showApi = ref(false)

const dataApi = ref({
    title: 'FIFA Soccer',
    brand: 'ELECTRONIC ARTS',
    rating: 4.5,
    reviews: 4,
    downloads: 10,
    pegi: '3',
    about: '231e'
})

const modalLargeOpen = ref(false)
const dataApiRandom = ref([])

const generateRandomApi = () => {
  
    console.log('Random')
  
    instance.get('/api/random').then( (result) => {
        dataApiRandom.value = result.data
        
    })
      
    
}


const generateApi = (slug) => {
  
  
    showApi.value = false
    generateRandomApi()
    
    instance.get('/api/' + slug).then( (result) => {
        Object.assign(dataApi.value, result.data)
        
        console.log('slug', 'https://api.aythen.com/api/' + slug,result.data)
        showApi.value = true
    })
}


generateApi('google-document')


</script>
<template>
<Section
      overflown
      :style="{ marginTop: '0px' }"
      class="section-content section is-overflown px-2 pt-0"
    >
    
    <div v-if="!showApi">
        Esta aplicación está cargando..
    </div>
    <div v-if="showApi" class="api-container vulk-docs">
     <div class="container-left">
       <div class="box-container"> 
         <div class="titles-container">
              <img class="title-image" src="https://randompicturegenerator.com/img/car-generator/g55938cab3ca5e1d6a85a240c8d3a1c3a732aca43a41b7b3cce22c49d27d96615d3fd1d16170172bff6920861c0e851cb_640.jpg"/>
               <div class="titles">
                  <h1>{{dataApi.title}}</h1>
                  <h2>{{dataApi.brand}}</h2>
                 <span>In-app purchases</span>
               </div>
          </div>
     <div class="below-titles">
      <div>
          <h2>{{dataApi.rating}}&star;</h2>
          <p>{{dataApi.reviews}} reviews&reg;</p>
      </div>
      <div>
          <h2>{{dataApi.downloads}} M+</h2>
          <p>Downloads</p>
      </div>
      <div>
          <h2>{{dataApi.pegi}}</h2>
          <p>PEGI 3&reg;</p>
      </div>
      </div>
     </div>
     <div class="buttons-container">
        <div v-for="(api, index) in dataApiRandom">
            <button 
            :key="index" class="btn-item"
            @click="generateApi(api.slug)">
                {{api.title}}
            </button>
        </div>
     </div>
     <div class="paragraphs-container">
        <span>
             <h2>About this game</h2>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725q.013-.425.313-.725L16.15 13H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.15L13.3 8.15q-.3-.3-.3-.713q0-.412.3-.712t.713-.3q.412 0 .712.3L19.3 11.3q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-4.6 4.6q-.275.275-.687.275q-.413 0-.713-.3Z"/></svg>
        </span>
        <p>{{dataApi.about}}</p>
        <p>Crea un Ultimate Team™ con tus estrellas del fútbol favoritas y empieza hoy tu camino hasta la FIFA World Cup™ en EA SPORTS™ FIFA Mobile.</p>
        <br />
        <p>¡Ya está aquí la nueva temporada 2023! ¡Esta actualización incluye jugadores, equipaciones, clubes y ligas actualizadas para reflejar la temporada de fútbol 22/23 del mundo real! Incluye a más de 15 000 futbolistas auténticos con talentos de clase...</p>
        <br />
        <h2>Updated on</h2>
        <p>Jan 17, 2023</p>
     </div>
    </div>
    <div class="container-right">
        <span>
             <h2>Data safety</h2>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725q.013-.425.313-.725L16.15 13H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.15L13.3 8.15q-.3-.3-.3-.713q0-.412.3-.712t.713-.3q.412 0 .712.3L19.3 11.3q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-4.6 4.6q-.275.275-.687.275q-.413 0-.713-.3Z"/></svg>
        </span>
             <div class="container-texts">
                  <p>El primer paso de la seguridad es comprender cómo los desarrolladores recopilan y comparten tus datos. Las prácticas de privacidad y seguridad de datos pueden variar en función del uso de la app, la región y la edad. El desarrollador proporcionó esta información y podría actualizarla con el tiempo.</p>
                  <div class="container-info">
                      <div class="container-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588T6 15q-1.25 0-2.125-.875T3 12q0-1.25.875-2.125T6 9q.575 0 1.1.213t.95.587l7.05-4.1q-.05-.15-.075-.337T15 5q0-1.25.875-2.125T18 2q1.25 0 2.125.875T21 5q0 1.25-.875 2.125T18 8q-.575 0-1.1-.212t-.95-.588L8.9 11.3q.05.15.075.338T9 12q0 .175-.025.363T8.9 12.7l7.05 4.1q.425-.375.95-.587T18 16q1.25 0 2.125.875T21 19q0 1.25-.875 2.125T18 22Zm0-16q.425 0 .713-.288T19 5q0-.425-.288-.713T18 4q-.425 0-.713.288T17 5q0 .425.288.713T18 6ZM6 13q.425 0 .713-.288T7 12q0-.425-.288-.713T6 11q-.425 0-.713.288T5 12q0 .425.288.713T6 13Zm12 7q.425 0 .713-.288T19 19q0-.425-.288-.713T18 18q-.425 0-.713.288T17 19q0 .425.288.713T18 20Zm0-15ZM6 12Zm12 7Z"/></svg>  
                        <div> 
                           <p>Esta app podría compartir estos tipos de datos con terceros</p>
                          <p>Ubicación, Información personal y 2 más</p>
                        </div>
                      </div>
                      
                      <div class="container-item">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 20H6.5q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.313 3.188T18.5 20H13v-7.15l1.6 1.55L16 13l-4-4l-4 4l1.4 1.4l1.6-1.55V20Z"/></svg>
                          <div>
                              <p>Es posible que esta app recopile estos tipos de datos</p>
                              <p>Ubicación, Información personal y 4 más</p>
                          </div>
                      </div>
                      
                      <div class="container-item">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 384 512"><path fill="currentColor" d="M192 0q-52 0-90 38t-38 90v64q-27 0-45.5 18.5T0 256v192q0 27 18.5 45.5T64 512h256q27 0 45.5-18.5T384 448V256q0-27-18.5-45.5T320 192v-64q0-52-38-90T192 0zm149 256v192q0 21-21 21H64q-21 0-21-21V256q0-21 21-21h256q21 0 21 21zm-234-64v-64q0-35 25-60t60-25t60 25t25 60v64H107zm85 64q-27 0-45.5 18.5T128 320q0 20 12 36.5t31 23.5v25q0 22 21 22t21-22v-25q43-15 43-60q0-27-18.5-45.5T192 256zm0 85q-21 0-21-21t21-21t21 21t-21 21z"/></svg>
                          <div>
                              <p>Los datos están encriptados en tránsito</p>
                          </div>
                      </div>
                      
                      <div class="container-item">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>                       
                          <div>
                              <p>Puedes solicitar que se borren los datos</p>
                          </div>
                      </div>
                      <div class="container-edit-details">
                        <a href="#">See Details</a>
                        <Button @click="modalLargeOpen = true" color="primary" :long="1" outlined raised>Edit</Button>
                      </div>
                  </div>
                  
                  <Modal title="Large Modal" :open="modalLargeOpen" size="large" actions="center" noscroll @close="modalLargeOpen = false" >
                     <template #content>
                           <h1>Modal</h1>
                     </template>
                     <template #action>
                       <Button color="primary" :long="2" raised>Confirm</Button>
                     </template>
                  </Modal>

             </div>
        <div class="buttons-container">
                 <div>
                     <button class="btn-item">#1 top for E0 sports</button>
                 </div>
                 <div>
                     <button class="btn-item">Sports</button>
                 </div>
                 <div>
                     <button class="btn-item">Soccer</button>
                 </div>
                 <div>
                     <button class="btn-item">Casual</button>
                 </div>
                 <div>
                     <button class="btn-item">Multiplayer</button>
                 </div>
                 <div>
                     <button class="btn-item">Competitive multiplayer</button>
                 </div>
                 <div>
                     <button class="btn-item">Single player</button>
                 </div>
                 <div>
                     <button class="btn-item">Realistic</button>
                 </div>
         </div>    
      </div>
   </div>
</Section>
</template>

<style lang="css" scoped>
.section{
  &.is-overflown{
    height: calc(100vh - 70px);
    overflow: hidden;
    margin-right: 0px;
    width: 100%;
    padding-right: 0px;
    
    .is-container{
      height: 100%;
      width: 100%;
      margin-right: 0px;
    }
    
    .section-content::-webkit-scrollbar .api-container::-webkit-scrollbar {
          display: none; 
          overlfow: hidden;
      }
      .section-content{
          overflow: hidden;
      }
  }
}
  .api-container {
    width: calc(138% - 300px);
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 70px);
  }

.api-container{
    display: flex;
    column-gap: 20px;
}
   .container-left{
      display: flex;
      flex-direction: column;
      flex-grow: 5;
      padding: 5px;
      flex-shrink: 1;
      margin: 0 auto;
      width: 100%;
   }
   .box-container{
       margin-top: 20px;
       padding: 20px;
       background-color: var(--primary);
       /*height: 220px;*/
       display: flex;
       flex-direction: column;
   }
   .title-image{
       width: 100px;
       height: 100px; 
       border-radius: 15px;
       object-fit: cover;
   }
   .titles-container{
       display: flex;
       gap: 20px
   }
   .titles h1{
       font-size: 2rem;
       color: #fff;
       font-weight: 500;
   }
   .titles h2{
       font-size: 1rem;
       color: #00a173;
   }
   .titles span{
       font-size: 1rem;
       color: var(--white);
   }

   .below-titles{
       margin-top: 30px;
       display: flex;
       gap: 20px;
   }
   .below-titles div{
      padding-right: 10px;
      border-right: 1px solid rgb(95,99,104);
      text-align: center;
      color: #fff;
   }
   .below-titles div p{
       color: rgb(95,99,104);
   }
   .paragraphs-container{
       margin-top: 20px;
   }
   .paragraphs-container span{
        display: flex;
        text-align: center;
        gap: 5px;
   }
   .is-dark .paragraphs-container span{
       color: var(--white-smoke);
   }
   .is-dark .paragraphs-container p{
       color: var(--white-smoke);
   }
   
   .paragraphs-container h2{
       font-weight: bold; 
       font-size: 1.2rem;
   }
    .is-dark .paragraphs-container h2{
       color: var(--white-smoke);
   }
   .paragraphs-container svg {
       font-size: 1.2rem;
       align-self: center;
   }
    .is-dark .paragraphs-container svg{
       color: var(--white-smoke);
   }
   .container-right{
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
       width: 100%;
       margin: 50px 0px 0px 20px;
   }
   .container-right span{
       display: flex;
       column-gap: 15px;
       align-items: center;
       text-align: justify;
   }
   .is-dark .container-right span{
        color: var(--white-smoke);
   }
   .container-right span h2{
       font-size: 1.4rem;
       font-weight: 600;
   }
   .is-dark .container-right span h2{
       color: var(--white-smoke);
   }
   .is-dark .container-texts p{
       color: var(--white-smoke);
   }
   .container-info{
       margin: 10px;
       margin-top: 20px;
       border: 1px solid rgb(218,220,224);
       border-radius: 8px;
       padding: 15px;
       display: grid;
       justify-items: start;
       row-gap: 20px;
       grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
   }
   .container-edit-details{
     display: flex;
     align-items: center;
   }
   .container-info .container-edit-details a{
       flex-wrap: wrap;
       color: #01875f;
       font-weight: bold;
       margin-left: 10px;
   }
   .container-item {
       display: flex;
       column-gap: 15px;
       justify-content: center;
       align-items: center;
   }
   .is-dark .container-item p{
       color: var(--white-smoke);
   }
   .container-item svg{
       font-size: 1rem;
   }
   .is-dark .container-item svg{
       color: var(--white-smoke);
   }
   .buttons-container{
       margin-top: 20px;
       display: flex;
       flex-wrap: wrap;
       gap: 12px;
   }
   .btn-item{
       outline: none;
       border: 2px solid rgb(218,220,224);
       border-radius: 1rem;
       font-size: 1rem;
       padding: 5px 7px;
   }
   .btn-item:hover{
       background-color: rgb(218,220,224);
   }

   .container-edit-details{
     display: flex;
     gap: 20px;
   }

   @media screen and (max-width: 1215px){
     .api-container {
          width: calc(148% - 300px);
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 70px);
          flex-direction: column;
    }
    .container-info{
       margin-top: 30px;
    }
    .container-right{
      margin: 0px;
      margin: 30px 0px 20px 0px;
    }
    .titles h1{
       font-size: 1.5rem;
       color: #fff;
       font-weight: 500;
   }
   }
   @media screen and (max-width: 1025px){
    .container-right{
      display: grid;
      grid-template-columns: repeat(1, minmax(200px, 1fr));
      width: 85%;
      margin: 50px 0px 20px 0px;
    }
    .container-left{
        margin: 0px;
        width: 85%;
    }
    .container-info{
        gap: 20px;
    }
   }
   
</style>