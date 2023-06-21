<script setup lang="ts">
import { ref, watch, onMounted  } from 'vue'
import type { Nft } from '/@src/types'
import { useFreelancerListStore } from '/@src/components/web/freelancer/useFreelancerListStore.ts'
const Store=useFreelancerListStore();

export interface NftDetailsProps {
  nft: Nft,
  profile: {}
  
}
const props = defineProps<NftDetailsProps>()

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const currentSeconds = ref(0)
const currentMinutes = ref(0)
const currentHours = ref(0)
const currentDays = ref(0)

//This commented block is used to get the auction end date from props
//const event = `${props.content.auctionEnd} 00:00:00`
//const countDown = new Date(event).getTime()

//This generates a random countdown adding a random number of days to a now date
const randomDays = Math.floor(Math.random() * 11)
const countDown = new Date(
  Date.now() + randomDays * (3600 * 1000 * 24)
).getTime()

const x = setInterval(() => {
  const now = new Date().getTime()
  const distance = countDown - now

  currentDays.value = Math.floor(distance / day)
  currentHours.value = Math.floor((distance % day) / hour)
  currentMinutes.value = Math.floor((distance % hour) / minute)
  currentSeconds.value = Math.floor((distance % minute) / second)

  //do something later when date is reached
  if (distance < 0) {
    //do something later when date is reached

    clearInterval(x)
  }
  //seconds
}, 0)

/*
let showbid = ref(false)
const handleShow = ()=>{
    showbid.value = !showbid.value
}
*/



let formContractInfo = ref({
 user_id: (props.profile) ? props.profile?.id : '',  
 user_data: {
   avatar: (props.profile) ? props.profile?.avatar : '',
   fullname: (props.profile) ? props.profile?.fullname: '',  
 },  
 data: {},   
 description: '',
 picked: '',
 tarifa: 0,
 hourlyrate: '',
 selectedcurrency: '',
 weeklimit: 0,
 title: '', 
})



let newbid = ref([])
const modalLargeOpen = ref(false)

onMounted(()=>{
   Store.getAllTasks().then(res=>{
     
     newbid.value = res.data
     
   }).catch(e=>console.log(e))
   //Store.getSingleTask("82abd933-c551-4bbc-9d07-2e241914a940").then(res=>console.log(res.data))
})

const updateBidData = ref(false)

watch(updateBidData,()=>{
          Store.getAllTasks().then(result=>{
          newbid.value = result.data
          }).catch(e=>console.log(e))
})

const handleSubmit = ()=>{
  if(props.profile){
          
          const newUserData = {
            avatar: props.profile?.avatar,
            fullname: props.profile?.fullname  
           }
     const { hourlyrate } = formContractInfo.value
     let newContractInfo = JSON.parse(JSON.stringify({...formContractInfo.value, hourlyrate: parseInt(hourlyrate), user_id: props.profile?.id, user_data: newUserData}))
     console.log("formContractInfo", newContractInfo)
  
   Store.postTask(newContractInfo).then(res=>{
      updateBidData.value = !updateBidData.value
   }).catch(e=>console.log(e))
  
  } 
}
const searchText = ref('')
const filteredbid = ()=>{
    const filtered = newbid.value.filter((bid)=>bid.user_id == props.profile.id)
    return filtered || []
}

let filteredSearchList =ref(undefined)

const handleSearchClick = ()=>{
     const newSearchList = filteredbid()
      const resultFiltered = newSearchList.filter(item=>item.title.toLowerCase().includes(searchText.value.toLowerCase()))
      filteredSearchList.value = JSON.parse(JSON.stringify(resultFiltered))    
      console.log(filteredSearchList)
}

</script>

<template>
  <!--pre>
    {{filteredbid()}}
  </pre-->
  <div class="nft-details-wrapper">
    <div class="nft-details-inner">
      <div class="columns">
        <!--div class="column is-6">
          <div class="nft-preview-holder">
            <img :src="props.nft.preview" :alt="props.nft.name" />
          </div>
        </div-->
        <div class="column is-6">
          <div class="nft-info">
            <div class="nft-info-head">
              <Title tag="h2" :size="4" weight="bold" narrow>
                <span>{{ props.nft.name }}</span>
              </Title>
              <div class="actions">
                <RouterLink to="/nft-list" class="action">
                  <i-ic-baseline-arrow-back />
                </RouterLink>
                <button class="action">
                  <i-ph-heart-duotone />
                </button>
              </div>
            </div>
            <div class="nft-info-price">
              <span class="eth-price text-gradient">
                {{ props.nft.initialBid.eth }} ETH
              </span>
              <span class="paragraph px-1">·</span>
              <span class="dollar-price">
                (${{ props.nft.initialBid.dollar }})
              </span>
              <span class="paragraph px-1">·</span>
              <span class="collection-rank">
                1 of {{ props.nft.collection.items }}
              </span>
            </div>
            <!--div class="nft-info-description">
              <p class="paragraph rem-95">{{ props.nft.description }}</p>
            </div-->
            <!--div class="nft-info-links">
              <RouterLink to="/" class="nft-info-link">
                <span>Creator</span>
                <div class="nft-info-link-inner">
                  <AvatarSimple :picture="props.nft.seller.picture" />
                  <span>{{ props.nft.seller.name }}</span>
                </div>
              </RouterLink>
              <RouterLink to="/" class="nft-info-link">
                <span>Collection</span>
                <div class="nft-info-link-inner">
                  <AvatarSimple :picture="props.nft.collection.picture" />
                  <span>{{ props.nft.collection.name }}</span>
                </div>
              </RouterLink>
            </div-->
           <div class="elementscontainer">
             <div class="elementcontainer__titles">
              <h2>Contacta al Freelancer</h2>
              <h2> acerca de tu trabajo</h2>
             </div>
              <div class="elementscontainer__inputs">
                <label for="">Nombre del proyecto</label>
                <input v-model="formContractInfo.title" class="input-item" type="text" placeholder="proyect for birghtdock llc"/>
                
                  <span>Enviar un mensaje privado</span>
                  <textarea v-model="formContractInfo.description" class="textarea-input" placeholder="add multiple lines"></textarea>
              </div>
               <div class="elementscontainer__inputs">
                  <div class="radioinput-container">
                  <label for="">Tipo de trabajo</label>
                    <div class="radio-container">
                     <input type="radio" id="fixedprice" required value="fixedprice" v-model="formContractInfo.picked"/>
                     <label for="fixedprice">Fixed Price</label>
                    </div>
                    <div class="radio-container">
                     <input type="radio" id="hourlyrate" required  value="hourlyrate" v-model="formContractInfo.picked"/>
                     <label for="hourlyrate">Hourly Rate</label>
                    </div>
                  </div>
               </div>
              <div class="hourlyrate" v-if="formContractInfo.picked == 'hourlyrate'">
                 <h2>Hourly rate</h2>   
               <div class="hourlyrate-container">
                 <label for="rangeSlider" class="sliderValue">
                         {{ `€ ${formContractInfo.hourlyrate}`}}
                 </label>
                 <input type="range" id="rangeSlider" v-model="formContractInfo.hourlyrate" min="6" max="12" step="1"/>
               </div>
              </div>
               <div class="elementscontainer__inputs">
                <div class="inputselect">
                    <label v-if="formContractInfo.picked == 'fixedprice'">Tarifa por hora</label>
                 <div class="inputselect-container">
                    <input class="input-item" type="number" min="1" max="100" placeholder="€ 95 por hora" v-if="formContractInfo.picked == 'fixedprice'" v-model="formContractInfo.tarifa"/>
                     
                     <select class="select" v-model="formContractInfo.selectedcurrency">
                        <option disabled value="">select one</option>
                        <option selected>EUR</option>
                        <option>DOLLAR</option>
                     </select>
                 </div>
                </div>
                <div>
                  <label class="input-label">Límite de seguimiento semanal</label>
                  <input v-model="formContractInfo.weeklimit" class="input-item" type="number" name=""/>
                </div>
                <button :disabled="!props.profile.id" @click="handleSubmit" class="btn-contract" type="submit">Contratar BrightDock</button>
               </div>
            </div>
          <div class="nft-info-tabs">
              <div class="nft-info-tabs-inner">
                <Tabs
                  selected="bids"
                  :tabs="[
                    { label: 'Bids', value: 'bids' },
                    { label: 'Comments', value: 'comments' },
                  ]"
                >
                  <template #tab="{ activeValue }">
                    <div v-if="activeValue === 'bids'">
                      <div class="active-bids">
                        <div
                          v-for="(bider, index) in filteredbid()?.slice(0,3)"
                          :key="index"
                          class="active-bid"
                        >
                          <AvatarSimple :picture="bider.user_data.avatar" />
                          <div class="meta">
                            <span>{{bider.title }}</span>
                            <span>{{ bider.createdAt }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="activeValue === 'comments'">
                      <div
                          v-for="(bider, index) in filteredbid()?.slice(0,3)"
                          :key="index"
                          class="active-bid">
                        <div v-if="bider.description">
                           <h2>{{bider.description}}</h2>
                        </div>
                        <div v-else>
                          <div class="py-4">
                            <PlaceholderSection
                              title="No Comments"
                              subtitle="Looks like there are no comments on this item for now."
                            >
                              <template #image>
                                <i-ph-chat-circle-dots-duotone
                                  class="text-primary rem-175"
                                />
                              </template>
                            </PlaceholderSection>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </Tabs>
              </div>
            </div>
             <div class="columns is-centered">
              <Button @click="modalLargeOpen = true" class="mr-2" color="primary" :long="2" outlined raised>Ver mas</Button>
            </div>
        <Modal title="Info" :open="modalLargeOpen" size="large" actions="center" noscroll @close="modalLargeOpen = false">
          <template #content>
            <div class="nft-info-tabs">
          
            <div class="mb-5 is-flex is-align-items-center">
              <input v-model="searchText" id="search" class="p-1" type="text" name=""/>
              <button @click="handleSearchClick"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/></svg></button>
            </div>
             
              <div class="nft-info-tabs-inner">
                <Tabs
                  selected="bids"
                  :tabs="[
                    { label: 'Bids', value: 'bids' },
                    { label: 'Comments', value: 'comments' },
                  ]"
                >
                  <template #tab="{ activeValue }">
                    <div v-if="activeValue === 'bids'">
                      <div class="active-bids">
                        <div
                          v-for="(bider, index) in (filteredSearchList?.length > 0) ? filteredSearchList: filteredbid()"
                          :key="index"
                          class="active-bid is-flex is-align-items-center pb-5 is-justify-content-space-around"
                        >
                           <AvatarSimple size="medium" :picture="bider.user_data.avatar" />
                          <div class="is-flex is-flex-direction-column">
                            <span class="has-text-weight-bold">{{bider.user_data.fullname }}</span>
                            <span class="has-text-weight-bold">{{bider.title }}</span>
                            <span>{{ bider.createdAt }}</span>
                          </div>
                          <div class="is-flex is-flex-direction-column">
                            <div class="is-flex pr-5">
                                <span class="has-text-weight-bold">Limite semanal:</span>
                                <span>&nbsp;{{bider.weeklimit}}</span>
                            </div>
                            <div class="is-flex">
                                <span class="has-text-weight-bold">{{bider.picked == 'hourlyrate' ? 'Pago por hora:' : 'Tarifa fija:'}}</span>
                                <span>&nbsp;{{bider.picked == 'hourlyrate' ? `${(bider.hourlyrate == null) ? 0 : bider.hourlyrate} ${bider.selectedcurrency}` : `${bider.tarifa} ${bider.selectedcurrency}`}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--div class="current-bid">
                        <div class="highest-bid">
                          <span class="small-label">Highest bid</span>
                          <span class="highest-bid-value">
                            <span class="highest-bid-eth text-gradient">
                              {{ props.nft.currentBid.eth }} ETH
                            </span>
                            <span class="highest-bid-dollar">
                              (${{ props.nft.currentBid.dollar }})
                            </span>
                          </span>
                        </div>
                        <div class="bid-countdown">
                          <span class="small-label">Auction ends in:</span>
                          <div class="auction-timer">
                            <div class="timer-block">
                              <span>{{ currentDays }}</span>
                              <span>days</span>
                            </div>
                            <div class="timer-block is-separator">:</div>
                            <div class="timer-block">
                              <span>{{ currentHours }}</span>
                              <span>hours</span>
                            </div>
                            <div class="timer-block is-separator">:</div>
                            <div class="timer-block">
                              <span>{{ currentMinutes }}</span>
                              <span>min</span>
                            </div>
                            <div class="timer-block is-separator">:</div>
                            <div class="timer-block">
                              <span>{{ currentSeconds }}</span>
                              <span>sec</span>
                            </div>
                          </div>
                        </div>
                      </div-->
                    </div>
                    <div v-else-if="activeValue === 'comments'">
                      <div
                          v-for="(bider, index) in (filteredSearchList?.length > 0) ? filteredSearchList: filteredbid()"
                          :key="index"
                          class="active-bid">
                        <div v-if="bider.description">
                           <strong>{{bider.title.toUpperCase()}}: {{bider.picked == 'hourlyrate' ? `${(bider.hourlyrate == null) ? 0 : bider.hourlyrate} ${bider.selectedcurrency}` : `${bider.tarifa} ${bider.selectedcurrency}`}}</strong>
                           <h2 class="light">{{bider.description}}</h2>
                        </div>
                        <div v-if="filteredbid().length == 0">
                          <div class="py-4">
                            <PlaceholderSection
                              title="No Comments"
                              subtitle="Looks like there are no comments on this item for now."
                            >
                              <template #image>
                                <i-ph-chat-circle-dots-duotone
                                  class="text-primary rem-175"
                                />
                              </template>
                            </PlaceholderSection>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </Tabs>
              </div>
            </div>
        </template>
   </Modal>
            <div class="nft-info-action">
              <!--Buttons>
                <Button @click="handleShow" color="primary" raised bold>Pre-Optin</Button>
                <Button>Place a Bid</Button>
              </Buttons-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.elementscontainer{
  margin: 0 auto;
  padding: 10px;
  background-color: rgba(0,0,0,.8);
  width: 90%;
  margin-bottom: 30px;
  border-radius: 5px;
}
.elementcontainer__titles{
    width: 100%;
    color: var(--white);
    font-weight: 500;
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
}
.elementscontainer__inputs{
  color: var(--white);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
.inputselect{
  margin-top: 10px;
}
.elementscontainer__inputs .input-label{
  font-size: 12px;
}
.input-item{
  width: 100%;
  padding: 7px;
  border-radius: 5px;
}

.textarea-input{
  height: 100px;
  width: 100%;
  border-radius: 5px;
}
.radioinput-container{
  margin-top: 10px;
}
.radioinput-container .radio-container{
  display: flex;
  column-gap: 10px;
}
.inputselect-container{
  display: flex;
  column-gap: 10px;
}
.elementscontainer__inputs .btn-contract{
  width: 100%;
  padding: 20px;
  color: var(--white);
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background-color: var(--primary);
  cursor: pointer;
}
.inputselect-container .select{
  border-radius: 5px;
}
.inputselect-container .input-item{
  width: 60%;
}
.hourlyrate{
  color: var(--white);
}
.hourlyrate-container{
  display: flex;
  column-gap: 20px;
}
.is-dark .elementscontainer{
  background-color: var(--card-bg-color);
}
.nft-details-wrapper {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.nft-preview-holder {
  position: sticky;
  top: 110px;

  img {
    display: block;
    width: 100%;
    border-radius: 0.85rem;
  }
}

.nft-info {
  background: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: 1rem;
  max-width: 480px;
  margin-left: auto;
  transition: box-shadow 0.3s;

  .nft-info-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.75rem 1.75rem 0;

    .action {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      background: var(--wrap-bg-color);
      border: 1px solid var(--wrap-border-color);
      height: 36px;
      width: 36px;
      border-radius: 50%;
      margin-left: 0.5rem;
      color: var(--primary);
      cursor: pointer;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: var(--spread-shadow);
      }
    }
  }

  .nft-info-price {
    padding: 1rem 1.75rem;
    font-family: var(--font);

    .eth-price {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .dollar-price,
    .collection-rank {
      font-size: 0.9rem;
      color: var(--light-text);
    }
  }

  .nft-info-description {
    padding: 0 1.75rem;
  }

  .nft-info-links {
    display: flex;
    align-items: center;
    padding: 2rem 1.75rem;

    .nft-info-link {
      flex: 1 1 0;

      > span {
        font-family: var(--font);
        font-size: 0.85rem;
        color: var(--light-text);
      }

      .nft-info-link-inner {
        display: flex;
        align-items: center;

        > span {
          color: var(--title-color);
          font-weight: 500;
          font-size: 0.9rem;
          font-family: var(--font);
          margin-left: 0.5rem;
        }
      }
    }
  }

  .nft-info-tabs {
    padding: 0 1.75rem 1.75rem;

    .nft-info-tabs-inner {
      background: var(--wrap-muted-color);
      border-radius: 0.85rem;
      padding: 1rem;

      :deep(.tabs) {
        font-size: 0.9rem;
      }

      .active-bids {
        .active-bid {
          display: flex;
          align-items: center;

          .meta {
            margin-left: 0.5rem;

            span {
              display: block;
              font-family: var(--font);

              &:first-child {
                font-size: 0.9rem;
                color: var(--title-color);
                font-weight: 500;
              }

              &:nth-child(2) {
                font-size: 0.8rem;
                color: var(--light-text);
              }
            }
          }

          &:not(:last-child) {
            margin-bottom: 0.75rem;
          }
        }
      }

      .current-bid {
        display: flex;
        background: var(--card-bg-color);
        border-radius: 0.75rem;
        margin-top: 1.5rem;
        font-family: var(--font);
        box-shadow: var(--light-box-shadow);

        .small-label {
          font-size: 0.85rem;
          color: var(--light-text);
        }

        .highest-bid {
          flex: 1 1 0;
          border-right: 1px solid var(--card-border-color);
          padding: 1rem;
          font-family: var(--font);

          .highest-bid-value {
            display: block;

            .highest-bid-eth,
            .highest-bid-dollar {
              display: block;
            }

            .highest-bid-eth {
              font-weight: 700;
              font-size: 1.25rem;
            }

            .highest-bid-dollar {
              color: var(--medium-text);
              font-size: 0.9rem;
            }
          }
        }

        .bid-countdown {
          flex: 1 1 0;
          padding: 1rem;

          .auction-timer {
            display: flex;

            .timer-block {
              text-align: center;

              span {
                display: block;
                font-family: var(--font);

                &:first-child {
                  font-size: 1.1rem;
                  font-weight: 500;
                  color: var(--title-color);
                }

                &:nth-child(2) {
                  font-size: 0.7rem;
                  color: var(--light-text);
                }
              }

              &:not(.is-separator) {
                flex: 1 1 0;
              }
            }
          }
        }
      }
    }
  }

  .nft-info-action {
    padding: 0 1.75rem 1.75rem;

    :deep(.button) {
      flex: 1 1 0;
    }
  }

  &:hover {
    box-shadow: var(--spread-shadow);
  }
}

@media (max-width: 767px) {
  .nft-info {
    .nft-info-head {
      flex-direction: column-reverse;
      align-items: flex-start;
      padding: 1.25rem 1.25rem 0;

      .actions {
        margin-left: auto;
      }

      .action {
        margin: 0 0.25rem 0.75rem;
      }
    }

    .nft-info-price,
    .nft-info-description,
    .nft-info-links,
    .nft-info-tabs,
    .nft-info-action {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    .nft-info-tabs {
      .nft-info-tabs-inner .current-bid {
        flex-direction: column;

        .highest-bid {
          border-right: none;
          border-bottom: 1px solid var(--card-border-color);
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .nft-info {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  .nft-preview-holder {
    img {
      width: 100%;
    }
  }
}
.is-dark{
  .nft-info .nft-info-price .dollar-price{
  color: var(--white-smoke);
}
 .nft-info .collection-rank{
   color: var(--white);
 } 
 .nft-info .nft-info-links .nft-info-link > span{
    color: var(--white-smoke);
 }
 .nft-info .nft-info-tabs .nft-info-tabs-inner .active-bids .active-bid .meta span{
    color: var(--white-smoke);
 }
 .tabs-inner .tabs a{
    color: var(--white-smoke);
 }
.nft-info .nft-info-tabs .nft-info-tabs-inner .current-bid .small-label{
    color: var(--white-smoke);
}
.nft-info .nft-info-tabs .nft-info-tabs-inner .current-bid .highest-bid .highest-bid-value .highest-bid-dollar{
    color: var(--white-smoke);
}
.nft-info .nft-info-tabs .nft-info-tabs-inner .current-bid .bid-countdown .auction-timer .timer-block span{
    color: var(--white-smoke);
}
} 

</style>
