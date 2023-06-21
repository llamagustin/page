<script lang="ts" setup>
const router = useRouter()

import PerfectScrollbar from 'perfect-scrollbar';
import { ref, watch,computed } from "vue";
import {storeToRefs } from 'pinia';
import {useAcademyStore} from './useAcademyStore';
import listEvents from "@/@fake-db/events.json";
import questionFirst from "./QuestionFirst.json";
import questionSecond from "./QuestionSecond.json";
import questionThird from "./QuestionThird.json";
// import questionFourth from "./QuestionFourth.json";
import medal from "./medal.vue"

const store = useAcademyStore()

const {Questions,panel}= storeToRefs(store);

const check_error = {
  data: "tabler-alert-circle",
  color: "error",
};
const check_valid = {
  data: "mdi-checkbox-marked-circle",
  color: "success",
};

function isCompleted(data) {
  for (let answer in data) {
    if (data[answer] === null) {
      return false; // si una respuesta no tiene datos, retornar falso
    }
  }
  return true; // si todas las respuestas tienen datos, retornar verdadero
}

const getAnswers = (q,a)=>{
  let answers=[]
  q.forEach((el,index)=>{
    let answer = q[`answer${index + 1}`]
    if(answer)
      answers.push({q:el.text,  a:answer})
  })
  return answers
}


// const answersFourth = computed(()=>{
//   let answers=[]
//   questionFourth.forEach((el,index)=>{
//     let answer = Questions.value.fourthEvent[`answer${index + 1}`]
//     if(answer)
//       answers.push({q:el.text,  a:answer})
//   })
//   return answers
// })

const answersThird = computed(()=>{
  let answers=[]
  questionThird.forEach((el,index)=>{
    let answer = Questions.value.thirdEvent[`answer${index + 1}`]
    if(answer)
      answers.push({q:el.text,  a:answer})
  })
  return answers
})



const answersSecond = computed(()=>{
  let answers=[]
  questionSecond.forEach((el,index)=>{
    let answer = Questions.value.secondEvent[`answer${index + 1}`]
    if(answer)
      answers.push({q:el.text,  a:answer})
  })
  
  return answers
})


const answersFirst = computed(()=>{
  let respuestas= Questions.value.firstEvent;
  let answers=[]
  questionFirst.forEach((el,index)=>{
    let answer = respuestas[`answer${index + 1}`]
    if(answer)
      answers.push({q:el.text,  a:answer})
  })
  
  return answers
})


//
const logout = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('accessToken')

  router.push('/login').then(() => {
    localStorage.removeItem('userAbilities')
    ability.update(initialAbility)
  })
}
</script>
<template>
  <div class="ml-auto" :style="{ maxWidth: '500px' }">
    <div>
      <button @click="logout" class="btn-logout">
        Logout
      </button>
    </div>
    <VExpansionPanels v-model="panel">
      <VExpansionPanel>
        <VExpansionPanelTitle disable-icon-rotate>
          <medal :color=" isCompleted(Questions.firstEvent) ? 'blue' : '#f88'" />
          <span class="text-body-2 font-bold text-uppercase">
            {{ listEvents[0].title }} 
          </span>
          <template #actions>
            {{ questionFirst.length }} preguntas
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <div ref="scrollableArea" style="max-height:340px; overflow:hidden; overflow-y:auto; ">
            <p class="text text-body-2 mt-2" :key="index" v-for="answer in answersFirst" >
              <span style="line-height: 1" class="d-block font-weight-bold" >{{ answer.q }} </span>
              <p class="pt-2">{{answer.a}}</p>
            </p>
          </div>
        </VExpansionPanelText>
      </VExpansionPanel>
      
      <VExpansionPanel>
        <VExpansionPanelTitle disable-icon-rotate>
          <medal :color="isCompleted(Questions.secondEvent) ? 'blue' : '#f88'" />
          <span class="text-body-2 font-bold text-uppercase">
            
            {{ listEvents[1].title }}
          </span>
          <template #actions>
            {{ questionSecond.length }} preguntas
            <!--<VIcon :icon="step.icon.data" :color="step.icon.color" />-->
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <div style="max-height:330px; overflow:hidden; overflow-y:auto; scrollbar-width:2px;">
            <p class="text text-body-2 mt-2" :key="index" v-for="answer in answersSecond" >
              <span style="line-height: 1" class="d-block font-weight-bold" >{{ answer.q }} </span>
              <p class="pt-2">{{answer.a}}</p>
            </p>
          </div>
        </VExpansionPanelText>
      </VExpansionPanel>
      <VExpansionPanel>
        <VExpansionPanelTitle disable-icon-rotate>
          <medal :color="isCompleted(Questions.thirdEvent) ? 'blue' : '#f88'" />
          <span class="text-body-2 font-bold text-uppercase">
            {{ listEvents[2].title }}
          </span>
          <template #actions>
            {{ questionThird.length }} preguntas
            <!--<VIcon :icon="step.icon.data" :color="step.icon.color" />-->
          </template>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <div style="max-height:330px; overflow:hidden; overflow-y:auto; scrollbar-width:2px;">
            <p class="text text-body-2 mt-2" :key="index" v-for="answer in answersThird" >
              <span style="line-height: 1" class="d-block font-weight-bold" >{{ answer.q }} </span>
              <p class="pt-2">{{answer.a}}</p>
            </p>
          </div>
        </VExpansionPanelText>
      </VExpansionPanel>
      <!--<VExpansionPanel>-->
      <!--  <VExpansionPanelTitle disable-icon-rotate>-->
      <!--    <medal :color="isCompleted(Questions.fourthEvent) ? 'blue' : '#f88'" />-->
      <!--    <span class="text-body-2 font-bold text-uppercase">-->
      <!--      {{ listEvents[3].title }}-->
      <!--    </span>-->
      <!--    <template #actions>-->
      <!--      {{ questionFourth.length }} preguntas-->
            <!--<VIcon :icon="step.icon.data" :color="step.icon.color" />-->
      <!--    </template>-->
      <!--  </VExpansionPanelTitle>-->
      <!--  <VExpansionPanelText>-->
      <!--    <div style="max-height:340px; overflow:hidden; overflow-y:auto; scrollbar-width:2px;">-->
      <!--      <p class="text text-body-2 mt-2" :key="index" v-for="answer in answersFourth" >-->
      <!--        <span style="line-height: 1" class="d-block font-weight-bold" >{{ answer.q }} </span>-->
      <!--        <p class="pt-2">{{answer.a}}</p>-->
      <!--      </p>-->
      <!--    </div>-->
      <!--  </VExpansionPanelText>-->
      <!--</VExpansionPanel>-->
    </VExpansionPanels>
  </div>
</template>

<style lang="scss">
.btn-logout{
    float: right;
    background: #fff0;
    color: #ffffff;
    border: 1px solid #fff;
    margin-left: auto;
    margin-bottom: 10px;
    padding: 2px 12px;
    border-radius: 4px;
    line-height: 30px;
    
    &:hover{
      background: #ffffff40;
    }
}

.grid-label {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em 1em;
  
  &:has(.credit__card, .progress_questions, .cite_date, .services) {
    grid-template-columns: 1fr;
  }
}

.text__content {
  font-size: 15px;
  font-family: "Public sans";
  line-height: 1;
}

.text {
  margin-top: -12px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.content__service {
  margin: 4px;
  border: 1px solid rgb(224, 224, 224);
  /*box-shadow: 0 0 2px hsl(0 0% 72%);*/
  padding: 4px;
  padding-block: 16px;
  padding-inline: 8px;
  border-radius: 7px;
  line-height: 1.2;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  &__title {
    font-size: 14px;
    /*color: var(--primary-blue);*/
    text-transform: uppercase;
  }
}

.text-c-primary {
  color: hsl(236 81% 71%);
}

.ff-public-sans {
  font-family: "Public Sans", sans-serif;
}

.credit__card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  &-item {
    line-height: 1.2;
    margin-block-end: 4px;
  }
}
.v-progress-linear__determinate {
  background: var(--primary-blue);
}
</style>
