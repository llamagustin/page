<template>
  <Section>
    <Container class="container-modal">
      <Title>
        ¡Vamos!
      </Title>
      <p>
        Dinos el nombre de tu negocio y lo intentaremos encontrar en el mapa
      </p>
      <div class="mt-4">
        <Field  :style="{textAlign: 'left'}">
          <FieldLabel>
            Busca tu negocio
          </FieldLabel>
          <Control>
            <VInput v-model="inputOneValue" placeholder="John Doe" />
          </Control>
        </Field>
      </div>
    </Container>
  </Section>
</template>

<style lang="scss" scoped>
.container-modal{
  text-align: center;
}
</style>