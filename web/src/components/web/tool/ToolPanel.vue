<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import feature from './feature.vue'
import axios from 'axios'


import type { BaseFeature } from '/@src/types'

import { services } from '/@src/texts/services'

const typePlan = ref('starter')

export interface AppSectionShapesProps {
  type: object
  image?: string
  darkImage?: string
  imageWidth?: string
  imageHeight?: string
  inverted?: boolean
  blob?: boolean
  color?: string
}

const props = withDefaults(defineProps<AppSectionShapesProps>(), {
  imageWidth: '1200',
  imageHeight: '882',
  inverted: false,
  blob: false,
  type: 'web',
  color: undefined
})



var data = {}

switch (props.type) {
  case 'web': data = services[0]; break;
  case 'ecommerce': data = services[1]; break;
  case 'seo+sem': data = services[2]; break;
  case 'rrss': data = services[3]; break;
  case 'office': data = services[4]; break;
  case 'crm': data = services[5]; break;
}

const service = data
const blobClasses = computed(() => [props.color && `is-${props.color}`])
const breakpoints = {700: { itemsToShow: 3 }}

const colorPlan=computed(()=>{
  return `is-green`
})

const benefits = computed(()=>{
  let newBenefits=[]
  let filter=typePlan.value
  
    data.allBenefits.forEach(b=>{
    let txt = b[filter]
    if(txt=='SI' ) newBenefits.push({ title: b.content, active:true });
    else if(txt=='NO' ) newBenefits.push({ title: b.content, active:false });
    else newBenefits.push({ title: b.content +", " + txt, active:true });
  })
  
  newBenefits=newBenefits.sort((a, b) => a.title.localeCompare(b.title))
  
  return newBenefits
})

const filteredcheckbenefits = computed(()=>{
  return benefits.value.filter(item=>{
      return item.active == true
  })
})

const filteredcirclebenefits = computed(()=>{
  return benefits.value.filter(item=>{
    return item.active == false
  })
})
// console.log(filteredcirclebenefits.value)


// function ellipsise(data,max){
//   let newText = '';
//   if(data.length>20){
//     newText = data.slice(0,20) + '...';
//   }else{
//     newText=data;
//   }
//   return newText;
// }

const features=computed(()=>{
  return {}
})

</script>

<template >
  <div >
    <Section class="app-section"  color="grey" >
      <div class="shape-1 shape" :class="blobClasses"></div>
      <div class="shape-2 shape" :class="blobClasses"></div>
                    
      <div class="columns is-multiline pt-6">
        <div class="container">
          <div class="is-relative block mx-auto">
            <div class="full-circle-1 text-success">
              <Circle />
            </div>
            <div class="full-circle-2 text-primary">
              <Circle />
            </div>
            <div class="full-circle-3 text-yellow">
              <Circle />
            </div>
            <div class="half-circle-1 text-info">
              <HalfCircle />
            </div>
            
            
              <div class="">
                <div class="columns">
                  <div class="column is-5">
                    <Card class="p-0 is-dark-white">
                      <div class="grid-col-2fr">
                      <div v-for="(boe, index) in service.boe " class="bottom-line column w-full" :class="[index > 0 && (index % 2 > 0) && 'right-line']">
                        <span class="boe-title is-size-6" ><b :class="colorPlan"> {{boe.title}}</b></span>
                        <br />
                        <div class="boe-texts-container">
                           <div class="boe-content is-size-7" >{{boe.content}}</div>
                        </div>
                      </div>
                      </div>
                    </Card>
                  </div>
                
                  <div class="column is-6">
                      <div class="mb-5 is-12">
                        <Card class="is-dark-white">
                            <div class="columns mb-0">
                              <div class="column">
                                <div class="flex">
        
                              <div class="ml-2">
                                  <h3 class="is-dark-grey subtitle-text" :class="blobClasses"> {{ service.subtitle }}</h3>
                                  <h2 class="tool-title mt-2" style="font-size:1.5em"> {{ service.title }} </h2>
                              </div>
                            </div>
                              </div>
                              <div class="is-flex justify-end pt-3 pr-3">
                                <Button :href="'https://reseller.aythen.com/form/lead'" class="mr-3 btn-blob" style="border-radius:25px;min-width:120px;" :class="blobClasses">
                                  Adquirir
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 fill-current" height="20" width="20"><path d="M4.583 16.667 3.333 15.417 12.833 5.917H7.5V4.167H15.833V12.5H14.083V7.167Z"></path></svg>
                                </Button>
                                <Button style="min-height:30px;border:none;font-size:1.2em;" :class="blobClasses" :href="service.toPDF" target="_blank"  >
                                  <i class="iconify" data-icon="ph:file-pdf" />
                                </Button> 
                              </div>
                            </div>
                            
                            
                            
                                <!--div v-if="false" class="flex items-center justify-end gap-2">
                                  <div class="plan-container tabs is-toggle">
                                    <ul class="plan-header-btns">
                                      <li :class="[typePlan==='starter' && 'is-active']" ><a @click="typePlan='starter'" :class="blobClasses">STARTER</a></li>
                                      <li :class="[typePlan==='profesional' && 'is-active']"><a @click="typePlan='profesional'" :class="blobClasses">PROFESIONAL</a></li>
                                      <li :class="[typePlan==='startup' && 'is-active']"><a @click="typePlan='startup'" :class="blobClasses">STARTUP</a></li>
                                    </ul>
                                  </div>
                                </div -->
                              
                            <div class="pl-2 -mt-2 flex">
                              <div class="is-flex items-center gap-2">
                                <Icon icon="material-symbols:star" class="gold-star" />
                                <Icon icon="material-symbols:star" class="gold-star" />
                                <Icon icon="material-symbols:star" class="gold-star" />
                                <Icon icon="material-symbols:star" class="gold-star" />
                                <Icon icon="material-symbols:star" class="gold-star" />
                              </div>
                              <p class="ml-2 mt-2" style="font-weight:600;font-size:12px;">Calificación de 5 estrellas por <span class="subtitle-text" :class="blobClasses">Aythen</span></p>
                            </div>
                          <div class="my-3"> 
                            <span class="text-container mx-2 ">{{ service.resume }} </span> 
                          </div>
                        </Card>
                      </div>
                      <card>
                        <div class="pt-2 pl-0 py-0 pb-2" style="justify-content:center;">
                          <div class="columns mt-1 pl-2 is-multiline feature-list listo" style="padding-bottom:0px;gap:5px;justify-content:center;display:grid;grid-template-columns:1fr 1fr 1fr;margin-bottom:0px;">
                            <!--features-->
                              <div  class="column py-0 my-0 is-12 feature-list-item" v-for="b in service.features">
                                <div class="dot feature-dot" :class="blobClasses" width="15px" height="15px">
                                   <div class="dot-inner feature-dot-inner" :class="blobClasses" width="11px" height="11px">
                                       <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather feature-icon" width=".2em" height=".2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:check" data-v-7623e932=""><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"></path></svg>
                                   </div>
                                 </div>
                                <span class="is-size-7 ml-2 is-feature" style="font-size:11px !important;"> {{b.content}}</span>
                              </div>
                              
                            <!--Benefits-->
                              <div class="column py-1 my-0 is-12 feature-list-item" :class="[b.active && 'is-feature']"  v-for="b in filteredcheckbenefits">
                                <!--<i v-if="b.active"  class="iconify" data-icon="feather:check-circle"></i>-->
                                <div class="dot feature-dot" v-if="b.active" :class="blobClasses" width="15px" height="15px">
                                   <div class="dot-inner feature-dot-inner" :class="blobClasses" width="11px" height="11px">
                                       <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather feature-icon" width=".2em" height=".2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:check" data-v-7623e932=""><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"></path></svg>
                                   </div>
                                 </div>
                                <span class="is-size-7 ml-2 " :class="[b.active && `is-feature`]" style="font-size:11px !important;"> {{b.title}}</span>
                              </div>
                            
                            <!--Disables -->
                              <div class="column py-1 my-0 is-12 feature-list-item" :class="[b.active && 'is-feature']"  v-for="b in filteredcirclebenefits">
                                
                                <!--<i v-if="!b.active" class="iconify" data-icon="feather:x-circle"></i>-->
                                  <div class="dot feature-dot feature-icon-disabled" v-if="!b.active" width="15px" height="15px">
                                     <div class="dot-inner feature-dot-inner feature-icon-disabled" width="11px" height="11px">
                                         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather feature-icon" width=".2em" height=".2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:check" data-v-7623e932=""><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"></path></svg>
                                     </div>
                                   </div>
                                  <span class="is-size-7 ml-2" :class="[b.active && `is-feature`]" style="font-size:11px !important;"> {{b.title}}</span>
                              </div>
                          </div>
                          
                          <!--div>
                            {{features}}
                          </div-->
                          
                        </div>
                      </card>
                </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
  </Section>
  <Section 
    :style="{marginTop: '-160px', marginBottom: '-40px'}"
    color="grey" wave="wave-2" shape-color="white"></Section>
  </div>
  
</template>

<style lang="scss" scoped>
.boe-title b{
  display: inline-flex;
  min-width: 177px;
  width: 177px;
}
.boe-texts-container{
  overflow: hidden;
}
.boe-content{
  min-width: 130px;
   width: 170px;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2; /* number of lines to show */
   max-height: 1*1;       /* fallback */
   font-size: 1.2rem;
   transition: transform 0.3s, opacity 0.3s;
}
.gold-star{
  color:#fa1;
  font-size:15px;
}
.fill-current{
  fill:currentColor;
}
.gap-2{
  gap:10px;
}
.is-right .button{
  padding-left:.5em;
  padding-right:.5em;
}
.is-dark-grey .button{
  padding-left:.58em;
  padding-right:.58em;
}
.btn-blob{
  color:#fff;
  &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}
}
.is-dark-grey .button{
  color:#fff;
  &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}
}
.subtitle-text{
  &.is-blue{ color: #0000ff !important; }
        &.is-green{ color: #13d33b !important; }
        &.is-yellow{ color: #ffd843 !important; }
        &.is-red{ color: #d21643 !important; }
        &.is-orange{ color: #ffa726 !important;}
        &.is-violet{ color: #d216ff !important;}
}
.items-center{
  align-items:center;
}
.justify-center{
  justify-content:center;
}
.justify-between{
  justify-content:space-between !important;
}
.justify-end{
  justify-content:flex-end !important;
}
.plan-header-btns{
  justify-content:center;
}
.plan-container li{
  width: 90px;
  font-size: 12px;
}
.is-feature{
  color: rgb(0, 0, 255); /*#17610f !important */;
}
.dash-line{
  border-top: 1.6px dashed #888;
}

.right-line{
  border-left:1px solid #3332;
}
.bottom-line{
  border-bottom:1px solid #3332;
}
.bottom-line:last-child{
  border-bottom:1px solid #3330;
}
.bottom-line:nth-child(7){
  border-bottom:1px solid #3330;
}

html.is-dark .right-line{
  border-left:1px solid #e5e5e522;
}
html.is-dark .bottom-line{
  border-bottom:1px solid #e5e5e522;
}
html.is-dark .bottom-line:last-child{
  border-bottom:1px solid #e5e5e500;
}
html.is-dark .bottom-line:nth-child(7){
  border-bottom:1px solid #e5e5e500;
}
.nowrap{
  flex-wrap:nowrap;
}
/*.bottom-line:last-child{*/
/*  border-bottom: none;*/
/*}*/
/*.bottom-line:nth-child(7){*/
/*  border-bottom: none;*/
/*}*/
/*.bottom-line:nth-child(3){*/
/*  border-right: none;*/
/*}*/
/*.bottom-line:nth-child(6){*/
/*  border-right: none;*/
/*}*/

.grid-col-1fr{
  display:grid;
  grid-template-columns:1fr;
}
.grid-col-2fr{
  display:grid;
  grid-template-columns:1fr 1fr;
}
.grid-col-3fr{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
}
.is-right {
  margin: 0px 0px 20px auto;
}
.feature-list {
  padding-bottom: 2rem;

  &.is-last {
    padding-bottom: 0;
  }

  .feature-list-item {
    display: flex;
    align-items: center;
    height: 20px;

    /*&:not(:last-child) {*/
    /*  margin-bottom: 0.75rem;*/
    /*}*/

    &.is-feature {
      .dot {
        background: var(--success-light-28);

        .dot-inner {
          background: var(--success);
        }
      }
    }

    .dot {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background: var(--primary-light-40);
      margin-right: 0.75rem;
      
      &.is-blue{ background: #5656ff !important; }
      &.is-green{ background: #c1f3cc !important; }
      &.is-yellow{ background: #f7e06f !important; }
      &.is-red{ background: #fb3060 !important; }
      &.is-orange{ background: #ffc46d !important;}
      &.is-violet{ background: #e26bff !important;}

      .dot-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background: var(--primary-light-28);
        
        &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}

        .iconify {
          height: 14px;
          width: 14px;
          color: var(--white);
          stroke-width: 3px;
        }
      }
    }

    span {
      display: block;
      font-size: 0.95rem;
      font-family: var(--font);
      color: var(--light-text);
      
      overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 1; /* number of lines to show */
      
    }
    
    .feature-dot{
      width:15px;
      height:15px;
      min-width: 15px;
      margin-right:0px;
    }
    .feature-dot-inner{
      width:11px !important;
      height:11px !important;
    }
    .feature-icon{
      width:11px;
      height:11px;
    }
    .feature-icon-disabled{
      color:#eee;
    }
  }
}

.tabs.is-toggle li.is-active .is-blue{
      background: #0000ff !important;
      border-color:#0000ff;
    }
    .tabs.is-toggle li.is-active .is-green{
      background: #13d33b !important;
      border-color:#13d33b;
    }
    .tabs.is-toggle li.is-active .is-red{
      background: #d21643 !important;
      border-color:#d21643;
    }
    .tabs.is-toggle li.is-active .is-yellow{
      background: #ffd843 !important;
      border-color:#ffd843;
    }
    .tabs.is-toggle li.is-active .is-orange{
      background: #ffa726 !important;
      border-color:#ffa726;
    }
    .tabs.is-toggle li.is-active .is-violet{
      background: #d216ff !important;
      border-color:#d216ff;
    }
.tabs.is-toggle a{
  border-color:#dbdbdb33;
}
.tabs a:hover{
  background-color:#dbdbdb33;
  color:#444;
}
html.is-dark .tabs.is-toggle a:hover{
  background-color:#dbdbdb33;
  color:#fff;
}



.icon-service{
    width: 26px;
    height: 26px;
}
  

.columns {
  position: relative;
  z-index: 2;

  .half-circle-1 {
    position: absolute;
    bottom: 45%;
    left: -25%;
    transform: scale(0.8);
  }

  .full-circle-1 {
    position: absolute;
    top: 30%;
    left: -10%;
    transform: scale(2);
    z-index: 3;
  }

  .full-circle-2 {
    position: absolute;
    top: -5%;
    right: -2%;
    transform: scale(2);
    z-index: 1;
  }

  .full-circle-3 {
    position: absolute;
    top: 50%;
    right: -15%;
    transform: scale(1.2);
    z-index: 1;
  }
}

.app-mockup {
  position: relative;
  border-radius: 1.5rem;
  border: 1px solid var(--border);
  box-shadow: var(--light-box-shadow);
  overflow: hidden;
  
  img{
    width: 100%;
    height: 100%;
    margin: 0px;
  }
  
  .button-pdf{
    justify-content: space-between;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    padding: 0px 20px;
    position: absolute;
    bottom: 10px;
    width: 90%;
    margin-left: 5%;
    color: #fff;
    border: none;
    min-height: 38px;
    
    svg{
      width: 20px;
      height: 20px;
    }
    
    &.is-blue{
        background: #0000ff !important;
    }
    
    &.is-green{
        background: #13d33b !important;
    }
    
    &.is-yellow{
        background: #f7e06f !important;
    }
    
    &.is-red{
        background: #d21643 !important;
    }
    
    &.is-orange{
      background: #ffa726 !important;
    }
    
    &.is-violet{
      background: #d216ff !important;
    }
  }
}

.app-section {
  .tool-title{
    font-size: 24px;
    line-height: 20px;
    font-weight: bold;
  }

  .shape-1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 350px;
    width: 350px;
    border-radius: 50%;
    background: #d9d9ff;
    z-index: -1;
    
    &.is-blue{
          background: #0000ff !important;
          opacity: 0.2;
    }
    
    &.is-green{
        background: #13d33b !important;
        opacity: 0.2;
    }
    
    &.is-yellow{
        background: #f7e06f !important;
        opacity: 0.2;
    }
    
    &.is-red{
        background: #d21643 !important;
        opacity: 0.2;
    }
    
    &.is-orange{
      background: #ffa726 !important;
      opacity: 0.2;
    }
    
    &.is-violet{
      background: #d216ff !important;
      opacity: 0.2;
    }
  }
  
  .shape-2 {
    position: absolute;
    -bottom: 10%;
    right: 0;
    height: 350px;
    width: 350px;
    border-radius: 50%;
    background: #d9d9ff;
    z-index: 0;
    
    &.is-blue{
      background: #0000ff !important;
      opacity: 0.2;
    }
    
    &.is-green{
        background: #13d33b !important;
        opacity: 0.2;
    }
    
    &.is-yellow{
        background: #f7e06f !important;
        opacity: 0.2;
    }
    
    &.is-red{
        background: #d21643 !important;
        opacity: 0.2;
    }
    
    &.is-orange{
      background: #ffa726 !important;
      opacity: 0.2;
    }
    
    &.is-violet{
      background: #d216ff !important;
      opacity: 0.2;
    }
  }

  .media {
    .media-content {
      overflow: hidden;

      .subtitle {
        color: var(--medium-text);
      }
    }
  }
}


.tool-features{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.is-dark {
  .app-mockup {
    border: none;
  }
  
  .is-dark-white{
    color: #fff !important;
  }
  
  .is-dark-grey{
    color: #747990 !important;
  }
}


.carousel{
  &.is-blue{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #0000ff !important;
    }
  }
    
  &.is-green{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #13d33b !important;
    }
  }
    
  &.is-yellow{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #f7e06f !important;
    }
  }
    
  &.is-red{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #d21643 !important;
    }
  }
    
  &.is-orange{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #ffa726 !important;
    }
  }
    
  &.is-violet{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #d216ff !important;
    }
  }
}

@media only screen and (max-width: 767px) {
  .app-section {
    .app-mockup {
      border-radius: 0.65rem;
    }

    .shape-1,
    .shape-2 {
      height: 150px;
      width: 150px;
    }

    .shape-1 {
      left: -80px;
    }

    .columns {
      .full-circle-1,
      .full-circle-2,
      .full-circle-3,
      .half-circle-1 {
        transform: scale(0.7);
      }

      .full-circle-1 {
        left: -7%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

  .app-section {
    .shape-1,
    .shape-2 {
      height: 250px;
      width: 250px;
    }

    .shape-1 {
      left: -100px;
    }

    .shape-2 {
      right: -100px;
    }
  }
}
@media only screen and (max-width: 1024px){
  .boe-content{
   width: 150px;
}
}
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
 
  .app-section {
    .shape-1,
    .shape-2 {
      height: 250px;
      width: 250px;
    }

    .shape-1 {
      left: -100px;
    }

    .shape-2 {
      right: -100px;
    }
  }
}



@media screen and (max-width: 767px) {
  .xs-mt-4 {margin-top: 20px;}
  .xs-ml-0{margin-left: 0px;}
}

</style>
