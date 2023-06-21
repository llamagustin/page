<script setup lang="ts">

</script>
<template>
  <Section>
    <Container>
      <div>
        <Title :size="2">
          Añade la información de tu negocio
        </Title>
        <Title :size="6">
          La zona operativa  de tu negocio
        </Title>
      </div>
      <div>
        <div>
          <label>
            A nivel local
          </label>
        </div>
        <div>
          <label>
            A nivel nacional en España
          </label>
        </div>
      </div>
      <div>
        <p>
          Puedes añadir un máximo de 1 localidades. Presiona 
          la tecla Enter después de cada búsqueda 
        </p>
        <div>
          <b>
            p. ej. Barcelona
          </b>
          <p>
            Localidades añadidas con un formulario flags
          </p>
        </div>
        <div>
          <div>
            Badalona x
          </div>
        </div>
        <div>
          <div class="mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Dirección
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Dirección" />
              </Control>
            </Field>
          </div>
        </div>
      </div>
      <div>
        <p class="mt-2">
          Zona operativa para las ciudades seleccionadas: 20km
        </p>
        <label>
          Deslizar el cursor por la barra para ajustar el radio
          de tu zona operativa
        </label>
        <div>
          <b>
            rango
          </b>
          <p>
            Lorem ipsum
          </p>
        </div>
      </div>
    </Container>
  </Section>
</template>

<style lang="scss" scoped>

</style>

