<script setup lang="ts"></script>

<template>
  <div class="ui-mockup">
    <h3 class="mb-3">Tienes una idea</h3>
    <div class="columns is-multiline b-columns-half-tablet-p">
      <div class="pb-0 column is-6">
        <Field>
          <FieldLabel label="Target ACoS" />
          <Control>
            <VInput value="2%" readonly />
          </Control>
        </Field>
      </div>
      <div class="pb-0 column is-6">
        <Field>
          <FieldLabel label="Daily Budget" />
          <Control>
            <VInput value="$348" readonly />
          </Control>
        </Field>
      </div>
    </div>
    <div class="columns is-multiline b-columns-half-tablet-p">
      <div class="column is-12">
        <Field>
          <FieldLabel label="Daily Budget" />
          <Control>
            <VInput value="$348" readonly />
          </Control>
        </Field>
      </div>
    </div>
    <h3 class="mb-3">Unbranded</h3>
    <div class="columns is-multiline b-columns-half-tablet-p">
      <div class="column is-12">
        <Field>
          <Control >
            <VTextarea v-model="textareaValue" :resize="false" placeholder="Write something..." />
          </Control>
        </Field>
      </div>
    </div>
    <div class="button-wrap">
      <Button color="primary" fullwidth bold raised>Create Campaign</Button>
    </div>
  </div>
</template>
