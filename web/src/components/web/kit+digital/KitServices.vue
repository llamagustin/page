<script setup lang="ts">
import type { SimpleIconFeature } from '/@src/types'

export interface BoxedFeaturesProps {
  features: SimpleIconFeature[]
}

const props = defineProps<BoxedFeaturesProps>()

const links={ "Web":"web", "eCommerce":"shop", "SEO":"seo", "Redes Sociales":"rrss", "CRM":"crm", "Oficina Virtual":"office" }

</script>

<template>
  <div class="py-2">
    <div class="boxed-features">
      <div class="card light-bordered hover-inset">
        <div
          v-for="(feature, index) in props.features.slice(0, 8)"
          :key="index"
          class="flex-cell"
          :class="[ index <= 2 && 'is-bordered', index === 2 && 'no-border-edge', index === 5 && 'no-border-edge' ]" >

          <div>
            
            <div class="show-on-mobile table-link">
              <div class="cell-link" >
                <IconService style="width:50px; height:50px"  class="icon-service" :color="feature.iconColor" >
                  <i class="iconify" :data-icon="feature.icon" ></i>
                </IconService>
              </div>
              <div class="cell-link" style="width:50px; " >
                <Button  class="btn-gray mt-2" :href="`/tool/${links[feature.title]}`" :long="1" outlined>LINK</Button>
              </div>
            </div>
            
            
          <div class="flex" :style="{textAlign: 'left'}">
              <div class="hide-on-mobile my-auto">
                <IconService style="width:50px; height:50px"  class="icon-service" :color="feature.iconColor" >
                  <i class="iconify" :data-icon="feature.icon" ></i>
                </IconService>
                <Button  class="btn-gray mt-2" :href="`/tool/${links[feature.title]}`" :long="1" outlined>LINK</Button>
              </div>
              <div>
                <div  class="flex" :style="{textAlign: 'left', gap: '12px'}">
                  <h3> {{$t('vulkFeatures_dTitle'+index)}} </h3>
                </div>
                <p >{{$t('vulkFeatures_dText'+index)}}</p>
                <p class="paragraph mt-2 is-size-7 is-italic" :style="{opacity:0.8}" >{{feature.resume}}</p>
              </div>
              
              
          </div>
          
          </div>
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.table-link{
  display: table;
  width: 100%;
  vertical-align: 'center'
}
.cell-link{
  display: table-cell;
  width:125px;
}
.btn-gray{
  padding-left: 12px !important;
  padding-right: 12px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  min-height: unset !important;
  min-width: unset !important;
  font-size: 12px !important;
}

.icon-service{
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
  
  svg{
    color: #ffffff !important;
    width: 30px !important;
    height: 30px !important;
  }
}
  
.boxed-features {
  .card {
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    border-radius: 1rem;
    border: 1px solid var(--card-border-color);
    background: var(--card-bg-color);

    .flex-cell {
      width: 33%;
      border-right: 1px solid var(--card-border-color);
      text-align: center;
      padding: 24px 16px;

      &.is-bordered {
        border-bottom: 1px solid var(--card-border-color);
      }

      &.no-border-edge {
        border-right: none;
      }

      i,
      .iconify {
        font-size: 2rem;
        color: var(--primary);
      }

      h3 {
        font-family: var(--font-main);
        font-weight: 500;
        color: var(--title-color);
      }

      p {
        font-family: var(--font);
        font-size: 0.9rem;
        color: var(--light-text);
        max-width: 200px;
        margin: 0 auto;
      }
    }
  }
}

.show-on-mobile { display: none !important; }
.hide-on-mobile{ display: block; margin:10px; }

@media (max-width: 426px) {
  .show-on-mobile { display: block !important; }
  .hide-on-mobile { display: none; margin:0px; }
  .boxed-features {
  .card { 
    .flex-cell { 
      p { 
        max-width: 400px; 
      } 
    } 
  }
 }
}

@media (max-width: 767px) {
  

  .boxed-features {
    .card {
      padding: 20px;
      
      .icon-service{
        margin: 0px !important;
      }
      
      .flex-cell {
        width: 300px;
        border-right: none;
        border-bottom: 1px solid var(--card-border-color);
        display: flex;
        text-align: left;
        padding:5px;
        
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .boxed-features {
    .card {
      padding: 1rem;
    }
  }
}
</style>
