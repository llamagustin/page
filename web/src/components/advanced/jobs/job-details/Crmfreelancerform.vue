<script setup lang="ts">
 import Markdown from 'vue3-markdown-it'
import type { Job } from '/@src/types'

//_____________________________________________________
import { ref, onMounted, onServerPrefetch, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getNft } from '/@src/utils/api/nft'
import { socialLinks } from '/@src/data/services/advanced/social'
import { Nft } from '/@src/types'
import { useFreelancerListStore } from '/@src/components/web/jobs/useFreelancerListStore.ts'

const Store=useFreelancerListStore();
 

export interface JobDetailsProps {
  job: Job,
  profile:{address:{}}
}

const props = withDefaults(defineProps<JobDetailsProps>(),{profile:{address:{}}})

const newProfile = ref({})
const newJob = ref({})
const modalLargeOpen = ref(false)

  
const profileInfo = ref({
  id: newProfile.value.id,
  about: '',
  profile: '',
  academies: { institution: '', degree: '', startDate: '', endDate: ''},
  experiences: {company: '', position: '', description: '', startDate: '', endDate: ''},
  skills: {programs: '', otherskills: '', programmingLanguages: '', frameworks: '', databases: ''}
})

const skillSeleccionada = ref({})
const academyExpSelected = ref({academySelected: 0, expSelected: 0})


 const newSkills = ref([])


onMounted(()=>{
  newProfile.value = JSON.parse(JSON.stringify(props.profile))
  newJob.value = props.job
  profileInfo.value.id = newProfile.value.id
  newSkills.value = Object.keys(JSON.parse(JSON.stringify(props.profile.skills))) 
})

//let profilecategory = props.profile.category.toLowerCase()
//let profilesubcategory = props.profile.subcategory.toLowerCase()
/*
const newCategory = computed(()=>{
  if(props.profile.category){
    return props.profile.category.toLowerCase()
  }
})
const newSubcategory = computed(()=>{
  if(props.profile.subcategory){
    return props.profile.subcategory.toLowerCase()
  }
})



const newCategory = computed(()=>{

  if(props.profile.category){
    return props.profile.category.toLowerCase()
  }
})

const newSubcategory = computed(()=>{
  if(props.profile.subcategory){
    return props.profile.subcategory.toLowerCase()
  }
})

  const handleSaveFreelancer = async ()=>{
       if(profileInfo.value.about != '') newProfile.value.about = profileInfo.value.about
       if(profileInfo.value.profile != '') newProfile.value.profile = profileInfo.value.profile
       
       if((profileInfo.value.academies.institution || profileInfo.value.academies.degree || profileInfo.value.academies.startDate || profileInfo.value.academies.endDate) != ''){
         
              const obj = profileInfo.value.academies
              
               for (let key in obj) {
                   if (obj[key] === '') {
                         delete obj[key];
                      }
                  }
                  
            if (academyExpSelected.value.academySelected !== -1) {
                   newProfile.value.academies[academyExpSelected.value.academySelected] = {...newProfile.value.academies[academyExpSelected.value.academySelected],...obj}
                   
            } else {
                  newProfile.value.academies[academyExpSelected.value.academySelected] = {...newProfile.value.academies[academyExpSelected.value.academySelected],...obj}
          }
       }
      
      if((profileInfo.value.experiences.company || profileInfo.value.experiences.position || profileInfo.value.experiences.description) != ''){
        
             const obj = profileInfo.value.experiences
              
               for (let key in obj) {
                   if (obj[key] === '') {
                         delete obj[key];
                      }
                  }
                  
            if (academyExpSelected.value.expSelected !== -1) {
              newProfile.value.experiences[academyExpSelected.value.expSelected] = {...newProfile.value.experiences[academyExpSelected.value.expSelected],...obj};
            } else {
                newProfile.value.experiences[academyExpSelected.value.expSelected] = {...newProfile.value.experiences[academyExpSelected.value.expSelected],...obj};
          }
      }
    
  if(profileInfo.value.skills.programmingLanguages?.toLowerCase() != ''){
    
         const newProgrammingLanguages = [...newProfile.value.skills["Programming Languages"] || ''] 
            
            if (skillSeleccionada.value.programmingLanguageSelected !== -1) {
                 newProgrammingLanguages[skillSeleccionada.value.programmingLanguageSelected] = profileInfo.value.skills.programmingLanguages;
                 newProfile.value.skills["Programming Languages"] = newProgrammingLanguages
            } else {
             newProgrammingLanguages.push(profileInfo.value.skills.programmingLanguages);
             newProfile.value.skills["Programming Languages"] = newProgrammingLanguages
          }
  }
          

    if(profileInfo.value.skills.databases?.toLowerCase() != ''){
      
        const newDatabaseList = [...newProfile.value.skills.Databases || ''] 
            
            if (skillSeleccionada.value.databaseSelected !== -1) {
                 newDatabaseList[skillSeleccionada.value.databaseSelected] = profileInfo.value.skills.databases;
                 newProfile.value.skills.Databases = newDatabaseList
            } else {
             newDatabaseList.push(profileInfo.value.skills.databases);
             newProfile.value.skills.Databases = newDatabaseList
          }
    }
          
  if(profileInfo.value.skills.frameworks?.toLowerCase() != ''){
    
        const newFrameworkList = [...newProfile.value.skills.Frameworks || ''] 
      
            if (skillSeleccionada.value.frameworkSelected !== -1) {
                 newFrameworkList[skillSeleccionada.value.frameworkSelected] = profileInfo.value.skills.frameworks;
                 newProfile.value.skills.Frameworks = newFrameworkList
            } else {
             newFrameworkList.push(profileInfo.value.skills.frameworks);
             newProfile.value.skills.Frameworks = newFrameworkList
          }
  }

  if(profileInfo.value.skills.programs?.toLowerCase() != ''){
    
        const newProgramList = [...newProfile?.value?.skills?.Programs || ''] 
      
            if (skillSeleccionada.value.skillProgramSelected !== -1) {
                 newProgramList[skillSeleccionada.value.skillProgramSelected] = profileInfo.value.skills.programs;
                 newProfile.value.skills.Programs = newProgramList
            } else {
             newProgramList.push(profileInfo.value.skills.programs);
             newProfile.value.skills.Programs = newProgramList
          }
  }

   if(profileInfo.value.skills.otherskills?.toLowerCase() != ''){
     
         const newOtherSkillList = [...newProfile.value.skills.otherskills || ''] 
      
            if (skillSeleccionada.value.otherSkillSelected !== -1) {
                 newOtherSkillList[skillSeleccionada.value.otherSkillSelected] = profileInfo.value.skills.otherskills;
                 newProfile.value.skills.otherskills = newOtherSkillList
            } else {
             newOtherSkillList.push(profileInfo.value.skills.otherskills);
             newProfile.value.skills.otherskills = newOtherSkillList
          }
   }


      const updatedFreelancer = await Store.updateFreelancer(newProfile.value).then(rs=> rs.data)
     //console.log("profileInfo", profileInfo.value)
     //console.log("updatedFreelancer", newProfile)
     
     //console.log(skillSeleccionada)
     //console.log(academyExpSelected)
     
}
*/
const skillValueInputs = {}

const newSkillIndexes = {}

let skillList = ref('')

const handleSkills = (skill, i)=>{
  if(skill){
      skillList.value = skill
      
  if(newSkillIndexes[skill]){
    newSkillIndexes[skill] = skillSeleccionada[skill]
  }
  else{
    newSkillIndexes[skill] = skillSeleccionada[skill]
  }
  }
  //console.log("skill",skill)
  //console.log("index", skillSeleccionada.value.secondIndex)
  
}

const handleSave = ()=>{
  console.log(skillList.value)
  //console.log(newSkillIndexes)
  if(newProfile){
      const newProfileList = JSON.parse(JSON.stringify(props.profile.skills))
      //console.log(newProfileList)
      
      if(newProfileList){
        //console.log(newSkillIndexes)
        if(skillList.value){
          //console.log([newSkillIndexes[skill]])
          //console.log([skillSeleccionada[skill]])
          
          console.log(newProfileList[skillList.value][newSkillIndexes[skillList.value]]) 
          //console.log(newProfileList[skill][newSkillIndexes[skill]]) 
         }
          //console.log(skillValueInputs[skillList.value])
      }
    //console.log(newProfileList)
}
}
</script>

<template>
       <div class="modaleditall-info">
         <div class="aboutProfile-editcontainer">
           <label>About us:</label>
           <textarea v-model="profileInfo.about" class="textareainput-edit" placeholder="add multiple lines"></textarea>
           <label>Your Profile:</label>
           <input v-model="profileInfo.profile" type="text" name="YourProfile"/>
         </div>
         <div class="academies-editcontainer">
           <label>Academies:</label>
           <div class="academies-infoedit">
                  <label for="institution">institutionList:</label>
                  <select id="institution" v-model="academyExpSelected.academySelected">
                     <option v-for="(institution, index) in newProfile?.academies?.length || 0" :value="index">{{ institution }}</option>
                  </select>
               <label for="">Institution</label>
               <input v-model="profileInfo.academies.institution" type="text" name="Institution"/>
               <label for="">Degree</label>
               <input v-model="profileInfo.academies.degree" type="text" name="Degree"/>
           </div>
           <div class="academies-datescontainer">
              <label for="startdate">Start:</label>
              <input type="date" id="startdate" v-model="profileInfo.academies.startDate">
              <label for="enddate">End:</label>
              <input type="date" id="enddate" v-model="profileInfo.academies.endDate">
           </div>
         </div>
         <div class="experiences-editcontainer">
           <label>Experiences:</label>
              <div class="experiences-infoedit">
                    <label for="experiences">experiencesList:</label>
                    <select id="experiences" v-model="academyExpSelected.expSelected">
                       <option v-for="(exp, index) in newProfile?.experiences?.length || 0" :value="index">{{ exp }}</option>
                    </select>
                   <label for="">Company</label>
                   <input v-model="profileInfo.experiences.company" type="text" name="Company"/>
                   <label for="">Position</label>
                   <input v-model="profileInfo.experiences.position" type="text" name="Position"/>
              </div>
                  <div class="experiences-descriptioncontainer">
                   <label for="" class="experiences-descriptionlabel">Description</label>
                   <textarea v-model="profileInfo.experiences.description" class="textareainput-edit" placeholder="add multiple lines"></textarea>
                  </div>
              <div class="academies-datescontainer">
                  <label for="startdate">Start:</label>
                  <input type="date" id="startdate" v-model="profileInfo.experiences.startDate">
                  <label for="enddate">End:</label>
                  <input type="date" id="enddate" v-model="profileInfo.experiences.endDate">
              </div>
         </div>
         <div class="skills-editcontainer">
            <label>Skills:</label>
             <!--pre>
               {{newProfile.skills[skill]}}
             </pre-->
               <div v-for="(skill, i) in newSkills">
                      <label for="">{{skill}}:</label>
                      <!--newSkills.indexOf(skill)-->
                      <select id="programskill" v-model="skillSeleccionada[skill]" @change="handleSkills(skill, i)">
                         <option v-for="(newlist, index) in newProfile?.skills[skill].length" :value="index">{{ newlist }}</option>
                      </select>
                      <label for="">{{skill}}:</label>
                      <input v-model="skillValueInputs[skill]" type="text" name="Programs"/>
               </div>
         </div>
         <button @click="handleSave">save</button>
       </div>
</template>


<style>
body {
  overflow: initial;
}
</style>

<style lang="scss" scoped>
.modaleditall-info{
  display: grid;
  gap: 20px;
}
.aboutProfile-editcontainer{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.modaleditabout-freelancer{
  display: flex;
  flex-direction: column;
}
.academies-editcontainer{
  display: flex;
  flex-direction: column;
}
.academies-infoedit{
  display: flex;
  justify-content: space-between;
}
.experiences-editcontainer{
  display: flex;
  flex-direction: column;
}
.experiences-infoedit{
  display: flex;
  justify-content: space-between;
}
.experiences-descriptioncontainer{
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
.skills-editcontainer{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
}
.skills-infoedit{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
}
.skills-item{
  display: flex;
  justify-content: space-between;
}
.academies-datescontainer{
  margin-top: 15px;
  display: flex;
  gap: 20px; 
  justify-content: center;
}
.job-wrapper {
  padding-top: 4rem;
  padding-bottom: 4rem;

  .back-link {
    font-family: var(--font);
    display: flex;
    align-items: center;
    color: var(--primary);

    .iconify {
      margin-right: 0.5rem;
      transition: transform 0.3s;
    }

    &:hover {
      .iconify {
        transform: translateX(-0.25rem);
      }
    }
  }
    
  .job-header {
    display: flex;
    align-items: center;
    padding: 2rem 0 2.5rem;
    border-bottom: 1px solid var(--card-border-color);

    .left {
      display: flex;
      align-items: center;

      .job-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        width: 80px;
        background: var(--wrap-bg-color);
        border: 1px solid var(--wrap-border-color);
        border-radius: 50%;
        box-shadow: var(--light-box-shadow);

        img {
          display: block;
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
      }

      .meta {
        margin-left: 1rem;
        line-height: 1.2;

        .job-title {
          font-family: var(--font-alt);
          font-size: 1.75rem;
          font-weight: 700;
        }

        .job-subtitle {
          font-family: var(--font);
          font-size: 1rem;
          font-weight: 400;
          color: var(--light-text);

          .iconify {
            font-size: 0.9rem;
          }
        }
      }
    }

    .right {
      margin-left: auto;
    }
  }

  .job-body {
    padding-top: 2.5rem;

    .column.is-7 {
      border-right: 1px solid var(--wrap-border-color);
      padding-right: 4rem;
    }

    h3 {
      font-family: var(--font-alt);
      font-weight: 600;
      font-size: 1.3rem;
      color: var(--primary);/*--title-color*/
      margin-bottom: 0.75rem;
    }

    p,
    :deep(p) {
      font-family: var(--font);
      font-size: 1.1rem;
      font-weight: 500;
      text-align: justify;
      color: var(--title-color);
      margin-bottom: 30px;
    }

    .requirements-list {
      list-style-type: none;
      font-family: var(--font);
      font-size: 1rem;
      color: var(--medium-text);
      row-gap: 10px;
      margin-bottom: 2rem;
      padding-top: 0.75rem;
      padding-left: 0;
      display: grid;
      justify-content: start;

      li {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;

        .block-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          width: 30px;
          min-width: 30px;
          border-radius: 50%;
          background: var(--wrap-muted-color);
          color: var(--primary);
          margin-right: 10px;

          .iconify {
            font-size: 0.8rem;
          }
        }
      }
    }

    .recommended-skills {
      padding: 1.5rem 0;

      .skill-block {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;

        img {
          display: block;
          height: 40px;
          width: 40px;
          min-width: 32px;
          border-radius: 50%;
          background: var(--wrap-muted-color);
        }

        p {
          font-family: var(--font);
          font-size: 0.95rem;
          color: var(--medium-text);
          margin-left: 16px;
          margin-bottom: 0;
        }
      }
    }

    .apply-card {
      position: sticky;
      top: 100px;
      background: var(--card-bg-color);
      border: 1px solid var(--card-border-color);
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: var(--light-box-shadow);

      .action {
        .button {
          height: 48px;
        }
      }
    }
  }
}

.requirements-list ul{
  margin-top: 10px;
}
@media (max-width: 767px) {
  .job-wrapper {
    .job-header {
      flex-direction: column;

      .left {
        flex-direction: column;
        text-align: center;

        .job-icon {
          margin-bottom: 0.75rem;
        }

        img {
          height: 60px;
          width: 60px;
          min-width: 60px;
        }

        .meta {
          margin-left: 0;
        }
      }

      .right {
        margin: 20px auto 0;

        .button {
          min-width: 240px;
        }
      }
    }

    .job-body {
      .column.is-7 {
        padding-right: 0.5rem;
        border: none;
      }
    }

    > .button-wrap {
      text-align: center;
    }
  }
}

table{
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0,0,0,.1);
  width: 450px;
}
table tr{
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
  text-align: justify;
}
table tr td{
  font-size: 1.1rem;
}
table tr td > span{
  color: #000;
}
.experiences table:nth-child(3){
  display: flex;
  flex-direction: column;
}
   .is-dark {
     table{
      border-bottom: 1px solid var(--medium-text);
   }
     table:deep(tr){
         color: var(--white-smoke) !important;
    }
    table tr td span{
      color: var(--white-smoke) !important;
    }
    .job-title{
         color: var(--white-smoke) !important;
    }
    .job-title h4{
         color: var(--white-smoke) !important;
    }
    .requirements-list {
         color: var(--white-smoke) !important;
    }
  }
</style>
