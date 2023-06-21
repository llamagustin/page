<script setup lang="ts">
import { textPlans, textA } from '/@src/texts/grant'
import { ref, watch, computed, onMounted } from 'vue'

export interface PricingPlanPrice {
  monthly: number
  yearly: number
}

export interface PricingPlanBenefit {
  id: number
  content: string
}

export interface PricingPlanFeature {
  id: number
  content: string
}

export interface PricingPlan {
  id: number
  icon: string
  title: string
  subtitle: string
  price: PricingPlanPrice
  benefits: PricingPlanBenefit[]
  features: PricingPlanFeature[]
}

export interface PricingPlanProps {
  services: PricingPlan[]
}


const seeMore= ref(false)
const visibleSeeMore=ref(false)
const kitDigital=ref({ web:false })
const props = defineProps<PricingPlanProps>()
const activeSection = ref(0)
const cart = ref({})
const billing = ref([])
const plansTag=ref([])

var size = ''

var sizes = {
  'xlarge': 'X-Large',
  'large': 'Large',
  'medium': 'Medium',
  'small': 'Small',
}


const typeFilter = ref('starter')


const price = computed(()=>{
  let kart=cart.value;
  let rs={ unit: 0, cent: '00' } 
  
  plansTag.value.forEach(p=>{
    rs.unit += kart[p]?.cost || 0
  })
  
  return rs
}) 



const services=ref([...props.services])
const selectedService = ref({...props.services[0]})
let iconColor = ref('')
const selectService = (service) => {
  iconColor.value = service.iconColor
  
  kitDigital.value[service.tag]= !kitDigital.value[service.tag];
  
  selectedService.value=service;
  
  /*
  if(kitDigital.value[service.tag])
   // cart.value[service.tag]=true
  else 
   //  cart.value[service.tag]=false
  */
  localStorage.cart= JSON.stringify(cart.value);
  localStorage.kitDigital= JSON.stringify(kitDigital.value);
}

const Benefits=computed(()=>{
  let plans = [];
  let filter=typeFilter.value || 'starter'
  let benefits=selectedService.value ;
  
 
  benefits.allBenefits.forEach(b=>{
    let txt = b[filter]
    if(txt=='SI' ) plans.push({ title: b.content, active:true });
    else if(txt=='NO' ) plans.push({ title: b.content, active:false });
    else plans.push({ title: b.content +", " + txt, active:true });
  })
  
  plans=plans.sort(function(a, b) { return a.active === b.active ? 0 : a.active ? -1 : 1; })
 
  return plans
  
  
})

const allBenefits= ref({})
const isAnnual = ref([])

const prices = computed(()=>{
  let yearly=isAnnual.value.length>0
  let plan= typeFilter.value;
  let rs={yearly:yearly,plan:plan}
  
  for (var i = 0; i < props.services.length; i++) {
    let service =  props.services[i]
    if(service.tag){
      let precio = yearly ? service.cost[plan] : service.cost[plan]/12
      rs[service.tag]=Math.ceil(precio)
    }
  }
  
  return rs
})

const getService=val=>{
  if(services.value.length == 0) return {}
  
  let service=services.value.filter(s=>s.tag=val)[0];
  let meses = isAnnual.value.length>0  ? 1 : 12
  let {starter, profesional,startup}= service.cost
  
  return {
    starter: Math.ceil(starter/meses),
    profesional:Math.ceil(profesional/meses),
    startup:Math.ceil(startup/meses)
  }
}

const grandCalculator=ref([])
const totalUsers=ref(0)

const Calculator = computed(()=>{
  let plan= typeFilter.value;
  let meses = isAnnual.value.length>0 ? 1 : 12;
  let recargo = isAnnual.value.length>0 ? 1 : 1.1
  
  let total=totalUsers.value;
  
  let cost = total >= 10 ? 300 : (total >= 5 ? 400 : 500) 
    
  const activeServices = props.services.filter(s=> cart.value[s.tag]).map(s=>{
    //let cost = s.cost[plan];
    
    return { id:s.tag, color:s.iconColor,total,  title:s.title, cost: Math.ceil(( (cost * total ) * recargo) / meses) }
  })
  

  let size=seeMore.value ? activeServices.length : 1
  
  visibleSeeMore.value= activeServices.length>1
  
  grandCalculator.value=activeServices
  
  return activeServices.slice(0,size)
})

watch(typeFilter,val=>{
  localStorage.typeFilter=val
})

watch(isAnnual, val=> { 
  localStorage.yearly=JSON.stringify(val)
})

onMounted(()=>{
  
  cart.value=JSON.parse(localStorage.cart || "{}");
  kitDigital.value=JSON.parse(localStorage.kitDigital || "{}")
  isAnnual.value= localStorage.yearly?.length > 2 ? ['Yearly'] : []
  typeFilter.value = localStorage.typeFilter || "starter"
})



const GrandTotal=computed(()=>{
  let kart=grandCalculator.value
  
  if(Array.isArray(kart)){
    let total = grandCalculator.value.reduce((acc, item) => acc + item.cost, 0)
    
    let yearly =isAnnual.value.length>0
    if(yearly){ total=total - (total * 0.1) }
    
    total= 1.21 * total
    
    
    return total.toFixed(2)
  } else 
    return 0.00
})

const users=ref({web: 0,seo: 0,office: 0,ecommerce: 0,crm: 0,social: 0})

const digitalKit=computed(()=>{
  let rs={}
  let lista=Object.keys(users.value);
  let total=0

  lista.forEach(el=>{
    rs[el] = users.value[el]>0
    cart.value[el]=users.value[el]>0
    let cant=parseInt(users.value[el]) || 0
    total+= (cant > 0 ? cant : 0)
  })
  
  totalUsers.value=total;
  return rs
  
})

const handleClick = val=>{
  users.value[val]=(users.value[val] || 0) + 1
}

const handleClickRemove = val=>{
  let value=users.value[val] || 0;
  if(value>0)
    users.value[val]=(users.value[val] || 0) - 1
}

</script>

<template>
  <div>
    
    <div class="side-pricing">
      <div class="plans-wrapper">
      <div class="plans-wrapper-inner">
        <div class="rows">
          
          <!--component price-->
            
            <div  v-if="Object.values(cart).includes(true)" class=" plan-price ml-2 ">
         
            <div class="planoption-container border-container pb-2">
              <div class="vermas-container is-flex ">
                <a v-if="visibleSeeMore" class="link has-text-centered ml-auto" @click="seeMore=!seeMore">ver más</a>
              </div>
              <div class="yearmonth-container justify-content-end"> 
              
              <div>
                <b class="mantain">{{$t('month')}} </b>
              </div>   
              <NinjaToggle v-model="isAnnual" value="Yearly"  />
                <b>{{$t('year')}}</b>
              <div />
              
              </div>  
              
            </div>
            <div class="mt-3 texts-container border-container">
              <div v-for="d in Calculator"  class="flex">
                <div class="is-8"><b>{{d.title}}</b></div>
                <div class="is-4"><b> {{d.cost}}.00</b></div>
              </div>
              
            </div>
            
            <div class="flex texts-container border-container">
                <div class="is-8"><b>{{$t('tax')}}</b></div>
                <div class="is-4"><b>+ {{ (grandCalculator.reduce((acc, item) => acc + item.cost, 0) * 0.21).toFixed(2) }}</b></div>
            </div>
            
            <div v-if="isAnnual.length>0" class="flex" style="color:green">
                <div class="is-8"><b>Descuento</b></div>
                <div class="is-4"><b>- {{grandCalculator.reduce((acc, item) => acc + item.cost, 0) * 0.10}}.00</b></div>
            </div>
            
            
            <div class="flex texts-container">
              <div class="info">
                  <b class="title">
                    {{$t('total')}}
                  </b>
         
              </div>
              <div>
                <div class="price mt-3">
                  <span class="currency is-symbol">€ </span>
                  <span class="is-unit texts-container"> {{ GrandTotal }} </span>
                </div>
              </div>
            </div>
          </div>
          
        
          <div class="row pt-8">
            <div class="columns is-multiline is-10">
              <div v-for="(service, index) in props.services"
                :key="index"
                class="column plan  is-5-desktop is-full  is-10-tablet ml-5 p-2 "
                :class="[digitalKit[service.tag]  && 'is-active']"
                
                @keydown.space.prevent="() => (activeSection = index)"
              >
              <div  class="description">
                <div class="flex">
                  <div>
                     <IconService :color="service.iconColor">
                        <i class="iconify icon-service" :data-icon="service.icon" />
                        
                      </IconService>

                  </div>
                  <div class="texts-container ml-2">
                    <div class="columns is-12">
                      <div class="column is-8">
                      <h3 class="is-dark-grey "> {{ service.subtitle }} </h3>
                      </div>
                      
                      <div class="is-4 column px-0 pr-2">
                      <input v-model="users[service.tag]" class="px-0 py-0 control" style="width:30px; display:none"  type="number"  />
                      <div class="field has-addons  ">
                        <button  type="button" class="button btn-add " :style="{'background-color':'red'}"
                        :class="[!digitalKit[service.tag]  && 'is-hidden']"
                        @click="handleClickRemove(service.tag)"
                        >-</button>
                        <button class="btn-add button ml-2" :style="{'background-color':service.iconColor}"
                          type="button" @click="handleClick(service.tag)" >+</button>
                      </div>
                      </div>
                    </div>
                      
                      <h2 v-if="false" class="tool-title" > {{ service.title }} </h2>
                      <div>
                        <p>{{ service.resume }} </p>
                        
                      </div>  
                      
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          </div>
          <div class="row pb-10 pt-8">
            <GrantCaseStudy  background="/assets/demo/img/bg/1.jpeg" >
              <GrantSideSection
                :subtitle="$t('grant_textA_subtitle')"
                :title="$t('grant_textA_title')"
                :content="$t('grant_textA_content')"
                image="/assets/illustrations/features/feature-3.png"
                :cta="$t('grant_textA_cte')"
                inverted
                :to="$t('grant_textA_to')"
              />
            </GrantCaseStudy>
          </div>
        </div>
          
        </div>
      </div>
      <div class="plan-details">
        <img class="girl" src="/assets/illustrations/pricing/sitting-girl.svg" alt="Pricing plan illustration" />
        
        <div  v-for="(service, index) in props.services" :key="index" class="plan-details-inner" 
          :class="[activeSection === index && 'is-active']" >
          
          <div class="inner">
            <h3>{{$t('benefits')}}</h3>
            <div class="feature-list">
              <div v-for="(benefit, b) in Benefits" :key="b" class="feature-list-item" :class="[benefit.active && 'is-feature']" >
                <div :style="{background: iconColor}" class="dot ">
                  <div :style="{background: iconColor}" class="dot-inner">
                
                    <i class="iconify" data-icon="feather:check"></i>
                  </div>
                </div>
                <span>{{ benefit.title }}</span>
              </div>
              
            </div>
          </div>
          <div class="inner">
            <h3>{{$t('features')}}</h3>
            <div class="feature-list is-last">
              <div >
                  <div 
                    v-for="(feature, f) in selectedService.features"
                    :key="f"
                    class="feature-list-item is-feature"
                  >
                    <div :style="{background: iconColor}" class="dot">
                      <div  :style="{background: iconColor}" class="dot-inner">
                        <i class="iconify" data-icon="feather:check"></i>
                      </div>
                      
                    </div>
                    <span>{{ feature.content }}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-wrap pt-5">
          <Button
            color="primary"
            :href="textPlans.link"
            target="_blank"
            elevated
            bold
            fullwidth
          >
            {{$t('button')}}
          </Button>
        </div>
      </div>
     
    </div>
  </div>
</template>

<style lang="scss" scoped>
:global(.pricing-container) {
  overflow-x: visible !important;
}

.btn-add {
  font-font-family: arial;
  color:white; 
  font-weight:700; 
  border:1px solid #ccc;
  height:25px;
  width:25px;
  padding: 0px;
  border-radius:5px;
  
}
.tabs.is-toggle li.is-active a {
      background: #0000ff !important;
      border-color:#0000ff;
    }

li.is-active {
  background-color: #0f0 !important;
}
.panel{
  margin-top:0px;
  padding-top: 0px;
}

.plan-price{
  max-width: 100%;
  
  border-radius: 1rem;
  padding-top: 0px;
  border: 1px solid var(--plan-border-color);
  padding: 15px;
  margin-right: 20px;
  .border-container{
  border-bottom: 1px solid var(--plan-border-color);
  text-decoration: none;
  
}


.planoption-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  width: 100%;
  flex: 1;
}
.yearmonth-container{
  display: flex;
  align-items: center;
  justify-content: space-between; 
  column-gap: 20px;
}
.link{
  font-size: 1rem;
  background-color: var(--primary);
  color: #fff;
  border-radius: 30px;
  padding: 3px 8px;
  margin-top: 5px;
  width: 75px;
}
.link:hover{
  box-shadow: 0px 0px 1px var(--primary);
}

  .flex{
    justify-content: space-between;
    align-items: baseline;
  }
  
  .info{
    .title{
      width: 100%;
      float: left;
      margin: 0px;
      font-size: 25px;
    }
    .subtitle{
      
    }
  }
  
  
  
  .price{
    .is-unit{
      font-size: 24px;
    }
    .is-cent{
      font-size: 12px;
    }
    .is-dot{
      font-size: 40px;
      margin-right: -10px;
      margin-left: -10px;
    }
    
    .currency{
      &.is-symbol{
        font-size: 20px;
        font-weight: bold;
        color: #000fff;
      }
      
      &.is-label{
        font-size: 20px;
      }
    }
  }
  
  .mantain{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    text-transform: uppercase;
    font-size: 18px;
    
    .price{
      .is-symbol{
        color: red;
        font-size: 12px !important;
      }
      .is-dot{
        font-size: 22px;
        margin-left: -4px;
        margin-right: -4px;
      }
      .is-unit{
        font-size: 22px !important;
      }
    }
  }
}



.billing-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;

  .ninja-toggle {
    position: relative;
    transform: scale(1.25);
  }

  .text {
    position: absolute;
    min-width: 225px;
    top: -50px;
    right: -230px;
  }
}

.side-pricing {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  

  .plans-wrapper {
    -position: sticky;
    top: 5px;
    flex-grow: 2;

    .plans-wrapper-inner {
      width: 100%;
      height: 100%;
      display: flex;
      will-change: opacity;
      flex-direction: row;
    }
  }

  .plans {
    position: sticky;
    width: 100%;
    max-width: 100%;
    margin-right: 60px;
    border-radius: 6px;
    flex-direction: column;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 20px;
  }

  .plan {
    border: 1px solid var(--plan-border-color);
    background: var(--plan-bg-color);
    display: flex;
    align-items: center;
    padding: 20px 20px;
    border-radius: 0.75rem;
    align-content: center;
    position: relative;
    margin-bottom: 0.75rem;
    margin-right:1rem;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    cursor: pointer;

    &:not(.is-active):hover {
      box-shadow: var(--light-box-shadow);
    }

    &.is-active {
      
      border-color: var(--primary);
      box-shadow: var(--light-box-shadow);

      img {
        filter: grayscale(0);
        opacity: 1;
      }
    }

    img {
      display: block;
      width: 100%;
      max-width: 60px;
      margin-right: 1rem;
      filter: grayscale(1);
      opacity: 0.6;
      transition: opacity 0.3s, filter 0.3s;
    }

    .description {
      h3 {
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--plan-heading-color);
      }

      p {
        font-size: 0.95rem;
        font-family: var(--font);
        /*color: var(--light-text);*/
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
      }
      
      .tool-title{
        display: flex;
      }
      
      .price {

        span {
          font-family: var(--font);
          font-weight: 600;
          font-size: 30px;
          color: var(--plan-heading-color);
          position: absolute;
          top: 10px;
          right: 14px;
  
          &::before {
            content: '€';
          }
        }
  
        small {
          font-family: var(--font);
          color: var(--light-text);
        }
      }
    }

    
  }

  .plan-details {
    position: relative;
    min-width: 380px;
    padding: 2.5rem;
    border-radius: 1rem;
    border: 1px solid var(--plan-border-color);
    background: var(--plan-bg-color);
    
    .button-filter{
      button{
        min-height: 30px;  
      }
      
      .is-active{
        color: #fff !important;
        
        &.is-starter{
          background: #cd7f32 !important;
        }
        
        &.is-profesional{
          background: #e3e4e5 !important;
        }
        
        &.is-startup{
          background: #ffbf00 !important;
        }
      }
    }

    .plan-details-inner {
      display: none;

      &.is-active {
        display: block;
      }
    }

    .girl {
      position: absolute;
      top: -158px;
      right: -28px;
      width: 130px;
    }

    .inner {
      + .inner {
        padding-top: 2rem;
        border-top: 1.6px dashed var(--plan-border-color);
      }

      h3 {
        font-size: 1.1rem;
        font-family: var(--font-alt);
        font-weight: 600;
        color: var(--plan-heading-color);
        margin-bottom: 1.5rem;
      }

      .feature-list {
        padding-bottom: 2rem;

        &.is-last {
          padding-bottom: 0;
        }

        .feature-list-item {
          display: flex;
          align-items: center;

          &:not(:last-child) {
            margin-bottom: 0.75rem;
          }

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
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: var(--primary-light-40);
            margin-right: 0.75rem;

            .dot-inner {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 14px;
              width: 14px;
              border-radius: 50%;
              background: var(--primary-light-28);

              .iconify {
                height: 12px;
                width: 12px;
                color: var(--white);
                stroke-width: 3px;
              }
            }
          }

          span {
            display: block;
            font-size: 0.95rem;
            font-family: var(--font);
          /*color: var(--light-text);*/
          }
        }
      }
    }
  }
}
.plan-container ul li a{
  border: 1px solid rgba(219,219,219,.4);
}
.is-dark {
  .plan-price{
  color: var(--white-smoke);
  }
  b{
    color: var(--white-smoke);
  }
  .border-container{
         border-bottom: 1px solid var(--plan-border-color);
   }
}

.is-dark {
  .plan-container ul li a{
   color: var(--white-smoke);
 }
 .plan-container ul li a:hover{
   color: #000;
 }
 .feature-list .feature-list-item span{
   color: var(--white-smoke);
 }
 .texts-container div{
   color: var(--white-smoke);
 }
}
@media only screen and (max-width: 500px){
  .side-pricing .plan-price {
   padding: 20px
}
.texts-container{
    padding: 10px 0
  }
  
}
@media only screen and (max-width: 767px) {
  .plan-price {
    padding: 20px;
    width: 100%;
    .texts-container{
      padding: 10px 0;
    }
}

.plan-price .info .title{
  font-size: 20px;
}
.plan-price .yearmonth-container{
  font-size: 13px;
}
.plan-price .mantain{
    font-size: 13px;
}
  .billing-toggle{
    display: none !important;  
  }
  
  .pricing-container {
    overflow-x: hidden !important;

    .side-pricing {
      flex-direction: column;

      .plans-wrapper {
        width: 100%;

        .plans-wrapper-inner {
          .plans {
            margin-right: 0;

            .plan {
              flex-direction: column;
              align-items: flex-start;

              img {
                margin-bottom: 1rem;
              }

              .price {
                margin-left: 0;
              }
            }
          }
        }
      }

      .plan-details {
        min-width: 100%;
        margin-top: 5rem;
      }
    }
  }
}
@media screen and (min-width: 767px){
   .plan-price .texts-container{
    padding: 10px 0;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .pricing-container {
    .side-pricing {
      .plans-wrapper {
        .plans-wrapper-inner {
          .plans {
            margin-right: 30px;

            .plan {
              flex-direction: column;
              align-items: flex-start;

              img {
                margin-bottom: 1rem;
              }

              .price {
                margin-left: 0;
              }
            }
          }
        }
      }

      .plan-details {
        min-width: 340px;
      }
    }
  }

 
}

</style>
