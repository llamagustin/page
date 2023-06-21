<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export type TestimonialBlockAColumn = 3 | 4

export interface TestimonialBlockAItem {
  content: string
  avatar: string
  name: string
  position: string
}

export interface TestimonialBlockAProps {
  testimonials: TestimonialBlockAItem[]
  boxed?: boolean
  squared?: boolean
  limit?: number
  columns?: TestimonialBlockAColumn
}

const props = withDefaults(defineProps<TestimonialBlockAProps>(), {
  boxed: false,
  squared: false,
  limit: 3,
  columns: 4,
})

const blockClasses = computed(() => [props.boxed && `is-boxed`])

const columnClasses = computed(() => [props.columns && `is-${props.columns}`])

const contentClasses = computed(() => [props.columns === 4 ? '' : 'rem-85'])

/*
let increment = ref(0)
let newTestimonials = ref(props.testimonials.slice(0, props.limit))

const handleRight = ()=>{
  if((increment.value + props.limit) >= props.testimonials.length){
      return
  }
    increment.value += 1
     newTestimonials.value = props.testimonials.slice(increment.value, props.limit + increment.value)
    //console.log(newTestimonials.value)
}
const handleLeft = ()=>{
  if(increment.value == 0){
     return 
  }
    increment.value -= 1
     newTestimonials.value = props.testimonials.slice(increment.value, props.limit + increment.value)
    //console.log(newTestimonials.value)
}
*/
</script>

<template>
  <div class="pt-6 cardlist-container">
    <div class="testimonial-block columns b-columns-half-tablet-p is-multiline">
      <div
        v-for="(testimonial, index) in props.testimonials.slice(0, 9)"
        :key="index"
        class="column"
        :class="columnClasses"
      >

        <div class="testimonial-container testimonial-block-item" :class="blockClasses">
          <!--i class="iconify text-light mb-4" data-icon="fa:quote-left"></i-->
          <div class="imagename-container mb-2">
              <AvatarSimple
                size="large"
                :picture="testimonial.avatar"
                :squared="props.squared"
              />
            <div class="texts-container">
              <Title tag="h3" :size="7" weight="semi" narrow>
                <span class="testimonial-name" style="color:var(--primary)" >{{$t('testimonialHome_name' + index)}}</span>
              </Title>
            <div class="icon-list-stars">
               <i class="iconify text-light" data-icon="typcn:star"></i>
               <i class="iconify text-light" data-icon="typcn:star"></i>
               <i class="iconify text-light" data-icon="typcn:star"></i>
               <i class="iconify text-light" data-icon="typcn:star"></i>
               <i class="iconify text-light" data-icon="typcn:star"></i>
            </div>
              <!--p class="paragraph rem-85 text-light">{{ $t('testimonialHome_position' + (index + increment)) }}</p-->
              <p class="paragraph rem-85 text-light">{{ $t('testimonialHome_time' + index) }}</p>
            </div>
          </div>
        <div>
          <p class="testimonial-text paragraph ml-8" :class="contentClasses">
            {{ $t('testimonialHome_text' + index) }}
          </p>
          <a class="ver-mas" id="#" href="#">{{$t('testimonialHome_readMore')}}</a>
          
        </div>       
        </div>
      </div>
    </div>
  </div>
  <!--div>
    <div @click="handleLeft" class="feather-left">
      <i class="iconify text-light mb-4" data-icon="feather:chevron-left"></i>
    </div>
    <div @click="handleRight" class="feather-right">
      <i class="iconify text-light mb-4" data-icon="feather:chevron-right"></i>
    </div>
  </div-->
</template>

<style scoped lang="scss">
.testimonial-text{
  text-align: left;
  overflow: hidden;
    display: -webkit-box;
  text-overflow: ellipsis;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
}
.ver-mas{
   display: inline-block;
   text-align: justify;
   text-justify: inter-word;
   text-decoration: none;
   font-weight: bold;
   color: var(--dark-text);
   font-size: .8rem;
}
.testimonial-name{
  justify-self: start;
  align-self: start;
  font-size: 1rem;
  overflow: hidden;
  width: 100%;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 1; /* number of lines to show */
   max-height: 1*1;       /* fallback */
   font-family: var(--font);
   font-size: 1.2rem;
   transition: transform 0.3s, opacity 0.3s;
}
.is-dark .ver-mas{
  color: var(--paragraph-color);
}
.cardlist-container{
  position: relative;
  width: 100%;
}
.feather-left{
  font-size: 3rem;
  position: absolute;
  left: -6%;
  bottom: 8%;
  cursor: pointer;
}
.feather-left:hover{
  transform: scale(1);
}.feather-right:hover{
    transform: scale(1);
} 
 .feather-right{
   font-size: 3rem;
    position: absolute;
    right: -6%;
    bottom: 8%;
    cursor: pointer;
 }
.testimonial-container{
  /*background-color: rgba(0,0,0,.1);*/
}
.imagename-container{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
.texts-container{
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
}
.icon-list-stars{
  height: max-content;
  width: max-content;
}
.icon-list-stars .iconify{
  display: inline-block;
  margin-right: 5px;
  font-size: 1rem;
  color: orange !important;
}
.testimonial-block {
  text-align: center;
  
  .testimonial-block-item {
    position: relative;
    padding: 1.5rem;

    &.is-boxed {
      background: var(--card-bg-color);
      border: 1px solid var(--card-border-color);
      box-shadow: var(--light-box-shadow);
      border-radius: 1.25rem;
      padding: 2.5rem 2.5rem 3rem;
      margin-bottom: 1.5rem;

      :deep(.avatar) {
        position: absolute;
        bottom: -31px;
        left: 0;
        right: 0;
        margin: 0 auto;
        max-width: 62px;
      }

      :deep(.title) {
        margin-top: -0.75rem;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .testimonial-block {
    .column {
      &.is-3 {
        .testimonial-block-item {
          padding-left: 1.25rem !important;
          padding-right: 1.25rem !important;
        }
      }
    }
  }
}
</style>
