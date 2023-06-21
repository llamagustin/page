<script setup lang="ts">

import landing from '/@src/texts/tool/web/landing.json'
import {ref, watch} from 'vue'
import { useDarkmode } from '/@src/stores/darkmode'

const props = defineProps<{
  showSlide: [],
  showText: boolean
}>()

const slide = ref(props.showSlide)

watch(props, val =>{
  slide.value = val.showSlide
  console.log(props.showText)
})

const darkmode = useDarkmode()

</script>

<template>
  <Section overflown :style="{ marginTop: '0px' }" class="section-container section is-overflown pt-0" >
    <div class="templatelist-container"> <!--class="template right columns is-10" si saco el template del interior del contenedor poner la clase-->
      <div v-for="land in slide" class="template-container is-flex-direction-column-reverse columns is-5 is-justify-content-flex-end">
        <div v-if="props.showText" class="content-container column is-7 is-flex-grow-1">
          <a href="/blocks" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 40 40"><path fill="currentColor" d="M15.269 28.146a.498.498 0 0 1-.36-.153L7.55 20.362a.498.498 0 0 1 0-.693l7.391-7.662a.5.5 0 1 1 .72.693l-7.056 7.315l7.024 7.284a.5.5 0 0 1-.36.847z"/><path fill="currentColor" d="M32.09 20.516H7.91a.5.5 0 0 1 0-1h24.18a.5.5 0 0 1 0 1z"/></svg>
            Atras</a>
          <h1 class="templatename">{{land.templatename}}</h1> 
          <br>
          <p class="templatedesc">{{land.description}}</p>
          <br>
          <li class="templatecat">{{land.category}}</li>
          <hr />
          <h2 class="utilities-title">Utilities</h2>
          <div class="utilities-container">
              <li>{{land.utilities.util1}}</li>
              <li>{{land.utilities.util2}}</li>
              <li>{{land.utilities.util3}}</li>
          </div>
        </div>
        <div class="image-container column is-8 is-flex-grow-1">
           <img v-if="!darkmode.isDark" :class="props.showText ? 'image-item' : 'image-item image--size'" :src="land.screenshotlight"/>
           <img v-else class="props.showText ? 'image-item' : 'image-item image--size'" :src="land.screenshotdark"/>
         </div>
      </div>
    <br />
  </div>
</section>
</template>    

<style type="scss" scoped>

.back-button{
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: var(--primary);
  font-weight: 500;
}
.section{
  &.is-overflown{
    height: calc(100vh - 140px);
    overflow: hidden;
    margin-right: 0px;
    width: 100%;
    padding-right: 0px;
    
    .templatelist-container::-webkit-scrollbar .section-container::-webkit-scrollbar  {
          display: none; 
      }
  }
}
  .templatelist-container {
    width: calc(158% - 300px);
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 70px);
  }
.template{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    padding-top: 50px;
}
.template-container{
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.template-container div h1{
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
}
.template-container div h2{
    font-weight: 1.5rem;
    font-weight: bold;
}
.image-item{
    object-fit: cover;
    width: 100%;
    height: 300px;
    background-size: cover;
    object-position: top;
    border-radius: 1rem;
    box-shadow: -5px 12px 10px rgba(0,0,0,.5);
    margin-left: 20px;
}
.image-item:hover{
  transform: translateY(-5px);
  box-shadow: -5px 12px 8px #0400ff26;
  transition:  transform ease-in-out 1s;
}
.image--size{
    height: 500px;
}
.utilities-title{
  font-size: 1.5rem;
}
.utilities-container{
  margin-top: 8px;
  display: grid;
  row-gap: 10px;
  margin-bottom: 20px;
  text-align: justify;
}
.templatedesc{
  text-align: justify;
}
.is-dark .templatedesc{
  color: var(--white-smoke);
}
.is-dark .templatecat{
  color: var(--white-smoke);  
}
.is-dark .utilities-title{
  color: var(--white-smoke);  
}
.is-dark .utilities-container{
  color: var(--white-smoke);  
}
@media only screen and (max-width: 1226px){
  .section{
  &.is-overflown{
    height: calc(90vh - 30px);
  }
}
   .templatelist-container {
    width: calc(100% - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(90vh - 30px);
  }
  .template-container{
    display: flex;
    flex-direction: column-reverse; 
    width: 100%;
  }
 .image-item{
    object-fit: cover;
    width: 700px;
    height: 300px;
    background-size: cover;
    object-position: top;
} 
.image--size{
    height: 500px;
}
.templatelist-container {
    width: calc(158% - 300px);
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 70px);
  }
  .image-container{
   width: 90%; 
  }
  .content-container{
    width: 85%;
  }
  .template-container div h1{
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
}
}
@media only screen and (max-width: 500px){
  .image-container{
   width: 100%; 
  }
  .content-container{
    width: 100%;
  }
  .template-container div h1{
    font-size: 1.5rem;
}
}
</style>