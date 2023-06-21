<script setup lang="ts">
import {ref} from 'vue'
import flag from '/@src/assets/icons/flag.vue'


const langSelected = ref(0);
const emit = defineEmits(['updateFlag'])

const countries = [
    { country: 'es', lang:"Español" },
    { country: 'en', lang:"English" },
    { country: 'ca', lang:"Catalán" },
    { country: 'eu', lang:"Vasco" },
    { country: 'gl', lang:"Gallego" },
    { country: 'pt', lang:"Portugués" }
]

const handleClick = (i)=>{
    langSelected.value = i
    emit('updateFlag', i)
}
</script>


<template>
<div class="language-Container">
    <div class="lang-container">
      <div class="flagcountry-container" style="cursor:pointer;"  @click="$i18n.locale=country.country; handleClick(i)"  v-for="(country, i) in countries">
          <div style="display:table">
              <div class="country-container"> 
                  <div><flag :lang="country.country" /></div>
                  <div><span style="width:100px !important">{{country.lang}}</span></div>
              </div>
          </div>
      </div>
    </div>     
</div>
    
</template>

<style lang="scss" scoped>
   .language-Container{
       display: flex; 
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
   .flags-container{
       display: flex;
       gap: 4px; 
   }
   .text-container{
      display: flex;
      gap: 4px;
      align-items: center;
   }
   .lang-container{
       display: block;
       width: 100%;
       /* 
       display: grid;
       grid-template-columns: repeat(5, 1fr);
       grid-template-rows: repeat(5, 20px);
       */
       background-color: var(--navbar-bg-color-solid);
       text-align: center;
   }
   .flagcountry-container{
       border-top: 2px solid rgba(0, 0, 0, .1);
       border-bottom: 2px solid rgba(0, 0, 0, .1);
   }
   .flagcountry-container:hover{
       background-color: rgba(0, 0, 0, .1);
       transition: background .2s ease-in-out;
   }
   .country-container{
       display: flex;
       column-gap: 20px;
   }
   .flagcountry-container:first-child{
       margin-bottom: 9px;
   }
   li {
       text-decoration: none;
       list-style: none;
       cursor: pointer;
   }

</style>