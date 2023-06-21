<script setup lang="ts">



const open = () => {
  calert(1)
}
</script>

<template>
  <Section>
    <Container class="container-modal">
      <svg class="feather feather-alert-circle logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <Title >
        ¡Vaya tu negocio no tiene sitio web
      </Title>
      
      <div class="photo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
      </div>
      
      <div>
        <p class="text-1">
          Si no tienes un sitio web, añadelo 
        </p>
        <p class="text-2">
          Por el momento no es posible utilizar nuestra App sin tu sitio web
          contactar con nuestro equipo de soporte
        </p>
      </div>
      <div>
        <Button @click="open" class="button">
          Add your website
        </Button>
      </div>
    </Container>
  </Section>
</template>

<style lang="scss" scoped>
.container-modal{
  text-align: center;
  
  .logo{
    color: #000fff;
  }
  .title{
    
  }
  .photo{
        background: #f0f0f0;
    color: #433f3f;
    width: 90px;
    height: 90px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 20px;
    
    
    svg{
      width: 30px;
    }
  }
  .text-1{
    font-size: 0.75rem;
  }
  .text-2{
    font-size: 1.1rem;
  }
  .button{
    margin-top: 20px;
  }

}
</style>