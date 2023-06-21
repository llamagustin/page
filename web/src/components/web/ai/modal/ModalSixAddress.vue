<script setup lang="ts">

</script>
<template>
  <Section>
    <Container>
      <div>
        <Title :size="sm">
          Añade la información de tu negocio
        </Title>
        <p>
          Dirección del negocio
        </p>
      </div>

      <div class="mt-2 columns wrap">
        <div class="column is-4">
          <Field  :style="{textAlign: 'left'}">
            <FieldLabel>
              País
            </FieldLabel>
            <Control>
              <VInput v-model="inputOneValue" placeholder="País" />
            </Control>
          </Field>
        </div>
        <div class="column is-4">
          <Field  :style="{textAlign: 'left'}">
            <FieldLabel>
              Ciudad
            </FieldLabel>
            <Control>
              <VInput v-model="inputOneValue" placeholder="Ciudad" />
            </Control>
          </Field>
        </div>
        <div class="colum is-4 mt-4">
          <Field  :style="{textAlign: 'left'}">
            <FieldLabel>
              Código Postal
            </FieldLabel>
            <Control>
              <VInput v-model="inputOneValue" placeholder="Código Postal" />
            </Control>
          </Field>
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
    </Container>
  </Section>
</template>

<style lang="scss" scoped>

</style>
