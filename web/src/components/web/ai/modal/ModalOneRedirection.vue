<script setup lang="ts">
import Buttons from '/@src/components/web/ai/modal/redirection/Buttons.vue'



const posts = [
  {
    id: 0,
    image: '/assets/illustrations/blog/landscape-abstract-1.svg',
    title: 'How to run competitive team meetings',
    likes: '234',
    categories: [
      {
        name: 'Business',
      },
      {
        name: 'Tech',
      },
      {
        name: 'Productivity',
      },
    ],
    date: 'March 17th, 2022',
    duration: 2,
  },
  {
    id: 1,
    image: '/assets/illustrations/blog/landscape-abstract-2.svg',
    title: 'All you need to know about the One-on-One meeting',
    likes: '93',
    categories: [
      {
        name: 'Technique',
      },
      {
        name: 'Speech',
      },
      {
        name: 'work',
      },
    ],
    date: 'March 17th, 2022',
    duration: 2,
  },
  {
    id: 2,
    image: '/assets/illustrations/blog/landscape-abstract-3.svg',
    title: 'Top tips from Jeff Jordan on team management efficiency',
    likes: '54',
    categories: [
      {
        name: 'Management',
      },
      {
        name: 'Team',
      },
      {
        name: 'HR',
      },
    ],
    date: 'March 17th, 2022',
    duration: 2,
  },
]
</script>

<template>
    <Container>
      <div class="container-modal">
        <Title>
          Sé te redireccionara un momento a la configuración de tu proyecto
        </Title>
        
        <div>
          <Buttons :posts="posts" :limit="3" upside-down />
        </div>
        
        Icono de aythen
        
        Eres Agente
        
        Eres Freelancer
        
        Eres Estudiante
      </div>
    </Container>
</template>

<style lang="scss" scoped>
.container-modal{
  text-align: center;
}
</style>