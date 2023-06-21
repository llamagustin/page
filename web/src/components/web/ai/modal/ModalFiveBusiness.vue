<template>
  <Section>
    <Container>
      <div>
        <Title>
          Añade la información de tu negocio
        </Title>
        <p>
          Información de contacto de tu negocio
        </p>
      </div>
      <div>
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
        <div class="columns">
          <div class="column is-6 mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Nombre de contacto de tu negocio
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Dirección" />
              </Control>
            </Field>
          </div>
          <div class="column is-6 mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Nombre de negocio
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Dirección" />
              </Control>
            </Field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4 mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Web de negocio
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Dirección" />
              </Control>
            </Field>
          </div>
          <div class="column is-4 mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Email
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Dirección" />
              </Control>
            </Field>
          </div>
          <div class="column is-4 mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Número de teléfono
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="Dirección" />
              </Control>
            </Field>
          </div>
        </div>
      </div>
    </Container>
  </Section>
</template>