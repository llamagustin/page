<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import {
  textTimeLineTitle,
  vulkFeatures,
  productStacks,
} from '/@src/texts/client'

//import { starterTemplates } from '/@src/data/pages/development'
import { customerLogos } from '/@src/texts/assets/logos'
</script>

<template>
  <div>
    <ClientHeroT1 />

    <Section>
      <Container>
        
        <ClientTimelineTitle 
          :title="$t('textTimeline_title0')"
          :subtitle="$t('textTimeline_subtitle0')"
          :minititle="$t('textTimeline_minititle0')"
          color="primary"
          :step="1"
        >
         
          <template #content>
            <div class="py-6 mx-auto max-w-9">
              <div class="columns b-columns-half-tablet-p">
                <div class="column is-6">
                  <p class="paragraph">
                    {{$t('AtextTimeline_paragraph0')}}
                  </p>
                </div>
                <div class="column is-6">
                  <p class="paragraph">
                    {{ $t('BtextTimeline_paragraph0') }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ClientTimelineTitle>

        <ClientTimeline  />
    
<!--____________________________________________-->

        <ClientTimelineTitle
          :title="$t('textTimeline_title2')"
          :subtitle="$t('textTimeline_subtitle2')"
          :color="accent"
          :step="2"
        >
          <template #content>
            <div class="py-6 mx-auto max-w-9">
              <div class="columns b-columns-half-tablet-p">
                <div class="column is-6">
                  <p class="paragraph mb-5">
                    {{ $t('AtextTimeline_paragraph2') }}
                  </p>
                  <p class="paragraph">
                    {{ $t('AtextTimeline_paragraph2_second') }}
                  </p>
                </div>
                <div class="column is-6">
                  <p class="paragraph mb-5">
                    {{ $t('BtextTimeline_paragraph2') }}
                  </p>
                  <p class="paragraph">
                    {{ $t('BtextTimeline_paragraph2_second') }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ClientTimelineTitle>

        <ClientGlobeStats class="globemargin"/>

        <!--
        <ClientTimelineTitle
          :title="textTimeLineTitle[3].title"
          :subtitle="textTimeLineTitle[3].title"
          :minititle="textTimeLineTitle[3].title"
          color="primary"
          :step="4"
        >
          <template #content>
            <div class="py-6 mx-auto max-w-9">
              <div class="columns b-columns-half-tablet-p">
                <div class="column is-6">
                  <p class="paragraph">
                    {{  textTimeLineTitle[3].paragraph_1 }}
                  </p>
                </div>
                <div class="column is-6">
                  <p class="paragraph">
                    {{  textTimeLineTitle[3].paragraph_2 }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ClientTimelineTitle>
        <ClientDualBoxes :templates="starterTemplates" />
        -->

<!--____________________________________________-->

    <ClientTimelineTitle
          :title="$t('textTimeline_title1')"
          :subtitle="$t('textTimeline_subtitle1')"
          color="primary"
          :step="3"
        >
          <template #content>
            <div class="py-6 mx-auto max-w-9">
              <div class="columns b-columns-half-tablet-p">
                <div class="column is-6">
                  <p class="paragraph">
                    {{ $t('AtextTimeline_paragraph1') }}
                  </p>
                </div>
                <div class="column is-6">
                  <p class="paragraph">
                    {{ $t('BtextTimeline_paragraph1') }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ClientTimelineTitle>

        <ClientDevWindows />
        
        
        
       <ClientTimelineTitle
          :title="$t('textTimeline_title3')"
          :subtitle="$t('textTimeline_subtitle3')"
          :minititle="$t('textTimeline_minititle3')"
          color="primary"
          :step="4"
        >
          <template #content>
            <div class="py-6 mx-auto max-w-9">
              <div class="columns b-columns-half-tablet-p  is-flex is-flex-direction-column is-align-items-center">
                <div class="column is-6">
                  <p class="paragraph has-text-centered" >
                    {{ $t('AtextTimeline_paragraph3') }}
                  </p>
                </div>
                <div v-if=false class="column is-6">
                  <p class="paragraph">
                    {{ $t('BtextTimeline_paragraph3') }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </ClientTimelineTitle>
      
       <ClientDevWindows2 />
      </Container>
    </Section>

    

    <!--Section v-if="false">
      <template #background>
        <ClientSectionMap light />
      </template>
      <Container>
        <CompanyGrid
          :title="textTimeLineTitle[4].title"
          :subtitle="textTimeLineTitle[4].subtitle"
          :logos="customerLogos"
          :limit="20"
        />
      </Container>
    </Section-->

    <FooterD color="light" />
  </div>
</template>



<style>
.hero-caption {
  text-align: center;
}
.globemargin{
  margin-top: 160px;
}
.hero-caption .buttons {
  align-items: center;
  justify-content: center;
}
</style>