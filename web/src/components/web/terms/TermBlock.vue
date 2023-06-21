<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import {ref} from 'vue'
import Chat from '/@src/components/plugin/Chat.vue'

export interface TermsBlockProps {
  terms: string
  title: string
  subtitle: string
  updated: string
  image: string
  darkImage?: string
  imageWidth: string
  imageHeight: string
}

const props = defineProps<TermsBlockProps>()

const handleClick = ()=>{
  console.log("evento para mostrar el chat")
}
</script>

<template>
  <div class="terms-block">
    <TermHeader
      :title="props.title"
      :subtitle="props.subtitle"
      :updated="props.updated"
      :image="props.image"
      :dark-image="props.darkImage"
      :image-width="props.imageWidth"
      :image-height="props.imageHeight"
    />
   <!--Chat /-->  
   
   <Button @click="handleClick" class="chat"><span @click="handleClick" class="iconify" data-icon="ph:chat-centered-text-thin"></span></Button>
    <Section>
      <Container>
        <div class="content">
          <div class="terms-content">
            <Markdown :source="props.terms" :breaks="true" />
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>

<style scoped lang="scss">
.terms-block {
  position: relative;
  
  .chat{
   display: none; 
   position: fixed;
   top: 78%;
   left: 92%;
   border-radius: 50%;
   height: 60px;
   z-index: 50;
   border: 1px solid #000;
}
.chat:hover{
  color: #2596be;
  border-color: #2596be;
}
.chat .iconify{
   font-size: 2rem;
   
}
  .terms-content {
    max-width: 740px;
    margin: 0 auto;

    :deep(> div) {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: var(--font-alt);
        color: var(--title-color);
      }

      p,
      ul {
        font-family: var(--font);
        color: var(--medium-text);
      }
    }
  }
}
.terms-title{
        font-family: "Montserrat", sans-serif;
        color: white;
}
</style>
