<script setup lang="ts">
import {  services } from '/@src/texts/ai/flow'
  
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


// import componentGPT from './componentGPT.vue'
// import trendGPT from './trendGPT.vue'
import MenuBusiness from '/@src/components/web/ai/menu/MenuBusiness.vue'
import MenuGPT from '/@src/components/web/ai/menu/MenuGPT.vue'

import PageAd from '/@src/components/web/ai/pages/PageAd.vue'
import PagePrompts from '/@src/components/web/ai/pages/PagePrompts.vue'
import PageHistory from '/@src/components/web/ai/pages/PageHistory.vue'
import PageSettings from '/@src/components/web/ai/pages/PageSettings.vue'



const route = useRoute()
const router = useRouter()

const path = ref(route.params.slug as string)

const showPage = ref([
  false, //history
  false, //settings
  false, //ad
  false, //prompts h
  false, //gpt
])

if(path.value == 'history'){
  showPage.value
}


var index = 3
switch (path.value) {
  case 'history': index = 0; break;
  case 'settings': index = 1; break;
  case 'ad': index = 2; break;
  case 'prompts': index = 3; break;
  case 'gpt': index = 4; break;
}

showPage.value[index] = true





const dataGPT = ref([{
  title: 'web'
},{
title: ''   
},{
title: ''   
},{
title: ''   
}])



const changePage = (index) => {
  showPage.value.fill(false)
  showPage.value[index] = true
  console.log({ index })
  if(index == 0 || index == 2 || index == 3){
    changeMenu(0)
  }else if(index == 1 || index == 4){
    changeMenu(1)
  }
}

///////
const showMenu = ref([
  true,
  false
])

const changeMenu = (index) => {
  showMenu.value.fill(false)
  showMenu.value[index] = true
}

// const service = ref({
//     icon: 'ph:pencil',
//     iconColor: '#0000ff',
//     title: 'Web',
//     to: '/tool/web'
// })
</script>

<template>
  <Section>
    <Container>
      <div class="container-flow">
        <div class="left">
          <MenuBusiness v-if="showMenu[0]" @change-page="changePage" :show-page="showPage"/>
          <MenuGPT v-if="showMenu[1]"  @change-page="changePage"  />
        </div>
        <div class="right">
          <PageHistory v-if="showPage[0]" @change-page="changePage"/>
          <PageSettings v-if="showPage[1]" @change-page="changePage"/>
          <PageAd v-if="showPage[2]" @change-page="changePage"/>
          <PagePrompts v-if="showPage[3]" @change-page="changePage"/>
          <PageGPT v-if="showPage[4]" @change-page="changePage"/>
          <!--<PageAD v-if="showPage[5]" @change-page="changePage"/>-->
        </div>
      </div>
    </Container>
  </Section>
</template>



<style lang="scss" scoped>
  .container-flow{
    margin-top: 20px;
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 20px;
    height: calc(100vh - 90px);
    
    .button{
      min-height: 20px;
      padding: 10px;
    }
  }
  
  .left{
    /*height: 100px;*/
    position: relative;
    /*display: flex;*/
    flex-direction: column;
    /*gap: 20px;*/
  }
  
  .left{
    overflow-y: scroll;
  }
  
  .right{
    overflow-y:scroll;
  }
  
  .left::-webkit-scrollbar {display: none;}
  .right::-webkit-scrollbar {display: none;}
  
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

@media only screen and (max-width: 800px) {
  .container-flow{
     display: flex;
     flex-direction: column;
     height: auto; 
  }
}
</style>