<script setup lang="ts">
import { textDemoChoice } from '/@src/texts/home'
</script>

<template>
  <div  class="customers-choice">
    <!-- Feature -->
    <div class="background-container1 columns is-vcentered side-feature b-columns-half-tablet-p">
      <div class="column is-5 is-offset-1 has-text-centered">
        <img src="/assets/illustrations/demo/1.gif" alt="Benefit image" />
      </div>
      <div class="is-flex is-flex-direction-column is-1">
          <div class="footertexts-container column is-10">
            <Title class="has-text-centered" text-color="newColor" tag="h2" :size="3" weight="bold" leading>
              <span :style="{color: 'white'}">{{ $t('textDemoChoice_title0') }}</span>
            </Title>
            <p class="paragraph is-centered-tablet-portrait has-text-light is-size-5">
              {{ $t('textDemoChoice_text0') }} 
            </p>
          </div>
          <div class="footertexts-container column is-10">
            <Title class="has-text-centered" text-color="newColor" tag="h2" :size="3" weight="bold" leading>
              <span :style="{color: 'white'}">{{ $t('textDemoChoice_title3') }}</span>
            </Title>
            <p class="paragraph is-centered-tablet-portrait has-text-light is-size-5">
              {{ $t('textDemoChoice_text3') }} 
            </p>
          </div>
      </div>
    </div>

    <!-- Feature -->
    <div class="background-container2 columns is-vcentered side-feature b-columns-half-tablet-p">
      <div
        class="column is-5 has-text-centered b-hidden-desktop b-hidden-tablet-p b-hidden-tablet-l"
      >
        <img src="/assets/illustrations/demo/2.gif" :style="{maxWidth: '100%'}" alt="Benefit image" />
      </div>
      <div class="is-flex is-flex-direction-column is-1">
          <div class="footertexts-container column is-10 is-offset-1">
            <Title class="has-text-centered" text-color="newColor" tag="h2" :size="3" weight="bold" leading>
              <span :style="{color: 'white'}">{{ $t('textDemoChoice_title1') }}</span>
            </Title>
            <p class="paragraph is-centered-tablet-portrait has-text-light  is-size-5">
              {{ $t('textDemoChoice_text1') }}
            </p>
          </div>
          <div class="footertexts-container column is-10 is-offset-1">
            <Title class="has-text-centered" text-color="newColor" tag="h2" :size="3" weight="bold" leading>
              <span :style="{color: 'white'}">{{ $t('textDemoChoice_title4') }}</span>
            </Title>
            <p class="paragraph is-centered-tablet-portrait has-text-light  is-size-5">
              {{ $t('textDemoChoice_text4') }}
            </p>
          </div>
      </div>
      <div class="column is-5 has-text-centered b-hidden-mobile">
        <img src="/assets/illustrations/demo/2.gif" :style="{maxWidth: '120%'}" alt="Benefit image" />
      </div>
    </div>

    <!-- Feature -->
    <!--div class="background-container3 columns is-vcentered side-feature b-columns-half-tablet-p">
      <div class="column is-5 is-offset-1 has-text-centered">
        <img src="/assets/illustrations/demo/3.gif" alt="Benefit image" />
      </div>
      <div class="footertexts-container column is-5">
        <Title text-color="newColor" tag="h2" :size="3" weight="bold" leading>
          <span :style="{color: 'white'}">{{ $t('textDemoChoice_title2') }}</span>
        </Title>
        <p class="paragraph is-centered-tablet-portrait has-text-light  is-size-5">
          {{ $t('textDemoChoice_text2') }}
        </p>
      </div>
    </div-->
  </div>
</template>



<style lang="scss" scoped>
.customers-choice{
  width: 100%;
}
.paragraph{
 font-size: 22px; 
}
.background-container1{
    background-color: #000 !important;
    width: 103%;
    padding-right: 5px;
}
.background-container2{
    background-color: rgba(2,2,2,.96) !important;
    width: 103%;
}
.background-container3{
    background-color: rgba(3,3,3,.94) !important;
    width: 103%;
}

.is-dark .background-container1{
    background-color: #000 !important;
}
.is-dark .background-container2{
    background-color: rgba(12,11,11,1) !important;
}
.is-dark .background-container3{
    background-color: rgba(18,18,18,.94) !important;
}

@media only screen and (max-width: 768px){
  .footertexts-container span{
   font-size: 1.5rem;
   text-align: center;
   padding-left: 10px;
}
.footertexts-container p{
   font-size: 1rem !important;
   width: 95%;
   margin-left: 10px;
   padding: 0px !important;
   text-align: center;
}
}
</style>