<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import type { Job } from '/@src/types'
import { ref, onMounted, onServerPrefetch, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNft } from '/@src/utils/api/nft'
import { socialLinks } from '/@src/data/services/advanced/social'
import { Nft } from '/@src/types'
import { useFreelancerListStore } from '/@src/components/web/freelancer/useFreelancerListStore.ts'

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
  
  newProfile.value = props.profile
  newJob.value = props.job
  profileInfo.value.id = newProfile.value.id
  newSkills.value = Object.keys(props.profile.skills || [])
})

watch(props,val=>{
  newProfile.value = JSON.parse(JSON.stringify(props.profile));
  
})

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
  
  
}

const handleSave = ()=>{
  
  if(newProfile){
    let {value} = newProfile
      const newProfileList = props.profile.skills
      console.log({props})
      
      if(newProfileList){
      
        if(skillList){
          console.log(newProfileList[skillList.value][newSkillIndexes[skillList.value]]) 
        }
      }
      
  
  }

}

const showEditAcademy = ref(false)
const showEditExperience = ref(false)
const selAcademy=ref({})
const selExperience=ref({})

const onClickEdit=(val, isAcademy=true)=>{
  if(isAcademy){
    selAcademy.value=val
    showEditAcademy.value=true;
  } else {
    selExperience.value=val;
    showEditExperience.value=true;
  }
  
}

const handleClick = () =>{
  showEditAcademy.value=false;
  showEditExperience.value=false;
  console.log('save button')
}

</script>

<template>
    <Container class="p-3">
      
      <Modal title="Academy" size="large" :open="showEditAcademy" @close="showEditAcademy = false">
        <template #content>
          <div class="px-4">
            <Field>
              <FieldLabel label="Institution"></FieldLabel>
              <Control >
                <VInput v-model="selAcademy.institution" placeholder="Institution" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Degree"></FieldLabel>
              <Control >
                <VInput v-model="selAcademy.degree" placeholder="Degree" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Start"></FieldLabel>
              <Control >
                <VInput v-model="selAcademy.startDate" type="date" placeholder="Start Date" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="End"></FieldLabel>
              <Control >
                <VInput v-model="selAcademy.endDate" type="date" placeholder="End Date" />
              </Control>
            </Field>
          </div>
        </template>
        <template #action>
          <div class="flex space-between">
            <Button @click="showEditAcademy=false">Close</Button>
            <Button @click="handleClick">Save</Button>
          </div>
        </template>
      </Modal>
      <Modal title="Experience" size="large" :open="showEditExperience" @close="showEditExperience = false">
        <template #content>
          <div class="px-4">
            <Field>
              <FieldLabel label="Company"></FieldLabel>
              <Control >
                <VInput v-model="selExperience.company" placeholder="Company" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Position"></FieldLabel>
              <Control >
                <VInput v-model="selExperience.position" placeholder="Position" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Description"></FieldLabel>
              <Control >
                <vTextarea rows="3" auto-grow v-model="selExperience.description" placeholder="Description" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="Start"></FieldLabel>
              <Control >
                <VInput v-model="selExperience.startDate" type="date" placeholder="Start Date" />
              </Control>
            </Field>
            <Field>
              <FieldLabel label="End"></FieldLabel>
              <Control >
                <VInput v-model="selExperience.endDate" type="date" placeholder="End Date" />
              </Control>
            </Field>
          </div>
        </template>
        <template #action>
          <div class="flex space-between">
            <Button @click="showEditExperience=false">Close</Button>
            <Button @click="handleClick">Save</Button>
          </div>
        </template>
      </Modal>
      
       <div class="modaleditall-info px-8">
         <div class="aboutProfile-editcontainer">
          <Field>
            <h3 style="font-weight:700; color: var(--title-color); font-size: 1.2rem;">Fullname:</h3>
           
            <Control>
              <VInput v-model="newProfile.fullname" placeholder="Your profile.." />
            </Control>
          </Field>
          <Field>
            <h3 style="font-weight:700; color: var(--title-color); font-size: 1.2rem;">About us:</h3>
            <Control>
              <VTextarea style="font-size:0.8rem; font-size: 1rem;" auto-grow rows="2" v-model="newProfile.about" :resize="false" placeholder="Write something..." />
            </Control>
          </Field>
         </div>
         
        <Card shape="squared" animated>
         <div class="row">
           <h3 style="font-weight:700; color: var(--title-color); font-size: 1.2rem;">Academies</h3>
           
           <table  class="table is-striped is-narrow  is-fullwidth is-hoverable" >
             <thead>
               <tr>
                 <th style="font-size: 1.2rem; width: 30%; text-align:center;">Institution</th>
                 <th style="font-size: 1.2rem; width: 20%; text-align:center;">Degree</th>
                 <th style="width:75px; font-size: 1.2rem; width: 25%; text-align:center;">Start</th>
                 <th style="width:75px; font-size: 1.2rem; width: 25%; text-align:center;">End</th>
               </tr>
              </thead>
              <tbody>
                <tr v-for="exp in newProfile.academies" @click="onClickEdit(exp)" >
                  <td style="font-size: 1rem; text-align:center;">{{exp.institution}}</td>
                  <td style="font-size: 1rem; text-align:center;">{{exp.degree}}</td>
                  <td style="font-size: 1rem; text-align:center;">{{exp.startDate}}</td>
                  <td style="font-size: 1rem; text-align:center;">{{exp.endDate}}</td>
                </tr>
              </tbody>
          </table>
        </div>
        </Card>
        
        <Card shape="squared" animated>
        <div class="row">
          <h3 style="font-weight:700; color: var(--title-color); font-size: 1.2rem;">Experiences</h3>
          
          <table  class="table is-striped is-narrow  is-fullwidth is-hoverable" >
           <thead>
             <tr>
               <th style="font-size: 1.2rem; width: 20%; text-align:center;">Company</th>
               <th style="font-size: 1.2rem; width: 20%; text-align:center;">Position</th>
               <th style="font-size: 1.2rem; width: 20%; text-align:center;">Description</th>
               <th style="font-size: 1.2rem; width: 20%; text-align:center;">Start</th>
               <th style="font-size: 1.2rem; width: 20%; text-align:center;">End</th>
             </tr>
            </thead>
            <tbody>
              <tr v-for="exp in newProfile.experiences" @click="onClickEdit(exp,false)" >
                <td style="font-size: 1rem; text-align:center;">{{exp.company}}</td>
                <td style="font-size:font-size: 1rem; 1rem; text-align:center;">{{exp.position}}</td>
                <td class="area" style="font-size: 1rem; text-align:center;">{{exp.description}}</td>
                <td style="font-size: 1rem; text-align:center;">{{exp.startDate}}</td>
                <td style="font-size: 1rem; text-align:center;">{{exp.endDate}}</td>
              </tr>
            </tbody>
          </table>
          
        </div>
        </Card>
         <div v-if="false" class="academies-editcontainer">
           
           
           <!--<label>Academies:</label>-->
           <div  class="academies-infoedit">
              <Field>
                <FieldLabel label="Institución"></FieldLabel>
                <Control>
                  <VSelect 
                    v-model="academyExpSelected.academySelected"
                    :style="{minWidth: '100px'}"
                    :options="newProfile?.academies" />
                </Control>
              </Field><Field>
                <FieldLabel label="Institución:"></FieldLabel>
                <Control>
                  <VInput v-model="profileInfo.academies.institution" placeholder="Your profile.." />
                </Control>
              </Field>
          </div>
           <div  class="academies-datescontainer">
              <Field>
                <FieldLabel label="Degree:"></FieldLabel>
                <Control>
                  <VInput v-model="profileInfo.academies.degree" placeholder="Your profile.." />
                </Control>
              </Field>
             <Field>
                <FieldLabel label="Start:"></FieldLabel>
                <Control>
                  <VInput type="date" v-model="profileInfo.academies.startDate" placeholder="" />
                </Control>
              </Field>
              <Field>
                <FieldLabel label="End:"></FieldLabel>
                <Control>
                  <VInput type="date" v-model="profileInfo.academies.endDate" placeholder="" />
                </Control>
              </Field>
          </div>
         </div>
         
         <div v-if="false" class="experiences-editcontainer">
           <!--<label>Experiences:</label>-->
              <div class="experiences-infoedit">
                <Field>
                  <FieldLabel label="Experiencia:"></FieldLabel>
                  <Control>
                    <VSelect 
                      v-model="academyExpSelected.expSelected" 
                      :style="{minWidth: '100px'}"
                      :options="newProfile?.experiences" />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel label="Company:"></FieldLabel>
                  <Control>
                    <VInput v-model="profileInfo.experiences.company" placeholder="Your profile.." />
                  </Control>
                </Field>
                
              </div>
              <div class="academies-datescontainer">
                <Field>
                  <FieldLabel label="Position:"></FieldLabel>
                  <Control>
                    <VInput v-model="profileInfo.experiences.position" placeholder="Your profile.." />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel label="Start:"></FieldLabel>
                  <Control>
                    <VInput v-model="profileInfo.experiences.startDate" />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel label="End:"></FieldLabel>
                  <Control>
                    <VInput v-model="profileInfo.experiences.endDate" />
                  </Control>
                </Field>
              </div>
              <div class="experiences-descriptioncontainer">
                <Field>
                  <FieldLabel label="Descripción:"></FieldLabel>
                  <Control>
                    <VTextarea v-model="profileInfo.experiences.description" :resize="false" placeholder="Write something..." />
                  </Control>
                </Field>
              </div>
         </div>
         <div class="row requirements-list p-2 skiles">
            <h3 style="font-weight:700; font-size: 1.2rem;">Skills</h3>
            <div class="columns">
              <div 
                class="column is-6"
                v-for="(items, category) in newProfile.skills" 
                :key="category"
                
                >
                  {{ category }}
                  <ul>
                    <li v-for="item in items" :key="item">
                      <div class="block-icon">
                        <i class="iconify" aria-hidden="true" data-icon="fa-solid:check"></i>
                      </div>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
              </div>
            </div>
         </div>
         <button class="btn-action" @click="handleSave">save</button>
       </div>
    </Container>
</template>

<style lang="scss" scoped>
.skiles .columns{
  overflow-x: scroll!important;
}
.skiles  h3{
  color: var(--title-color);
}
.skiles .columns .column{
  color: var(--title-color);
}
.btn-action{
  padding: .5rem 0;
  font-size: 1.3rem;
  border: 1px solid #fff;
  border-radius: 10px;
  text-transform: capitalize;
  background: var(--primary);
  color: var(--white);
  cursor: pointer;
}
.btn-action:hover{
  background: #1e40af;
  transition: 1s ease;
}
.area {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
body {
  overflow: initial;
}
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
  width: 100%;
}
.academies-infoedit{
  display: flex;
  gap: 20px;
  /*justify-content: space-between;*/
}
.experiences-editcontainer{
  display: flex;
  flex-direction: column;
  overflow-x: scroll!important;
}
.experiences-infoedit{
  display: flex;
  /*justify-content: space-between;*/
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
  display: flex;
  gap: 20px; 
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



table tbody > tr {
  font-size: 0.75rem;
  cursor: pointer;
}

table tbody > tr:hover {
  background-color: #f0f0fb;
}


.requirements-list {
      list-style-type: none;
      font-family: var(--font);
      font-size: 1rem;
      color: var(--medium-text);
      row-gap: 10px;
      margin-bottom: 2rem;
      padding-top: 5px;
      padding-left: 0;
      display: grid;
      justify-content: start;
      
      ul { 
        margin-top: 10px;
      }

      li {
        display: flex;
        align-items: center;
        margin-bottom: 0.25rem;

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

.is-dark{
  .table{
  background: var(--card-bg-color);
  }
  .table td,
  .table th{
  background: var(--card-bg-color);
  color: var(--title-color);
  }
}
</style>
