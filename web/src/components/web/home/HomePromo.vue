
<script setup lang="ts"></script>

<template>
  <Hero
    class="product-hero"
    size="fullheight"
      >
    <template #body>
      <div class="columns is-vcentered">
        <div class="column is-5">
          <Title  tag="h1" :size="2" weight="bold" default>
           <span style="color:var(--title-color)">{{$t('text_promo_title')}}</span>
          </Title>
          <Subtitle
            tag="p"
            :size="5"
            classes="b-centered-tablet-p text-medium"
            default
          >
            {{$t('text_promo_text')}}
          </Subtitle>
          <!--Buttons-->
          <div class="buttons is-relative z-1">
            <Button color="primary" :long="2" raised bold>{{$t('text_promo_signup')}}</Button>
            <Button elevated bold :long="2">{{$t('text_promo_more')}}</Button>
          </div>
        </div>
        <div class="column is-6 is-offset-1">
          <div class="hero-form-container">
            <div class="hero-form">
              <Title tag="h2" :size="4" weight="semi">
                <span style="color:var(--title-color)">{{$t('form_title')}}</span>
                </Title>
              <form>
                <Field>
                  <FieldLabel :label="$t('form_input1')" />
                  <Control icon="feather:user">
                    <VInput :placeholder="$t('form_placeholder1')" />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel :label="$t('form_input2')" />
                  <Control icon="feather:mail">
                    <VInput :placeholder="$t('form_placeholder2')" />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel :label="$t('form_input3')" />
                  <Control icon="feather:lock">
                    <VInput type="password" :placeholder="$t('form_placeholer3')" />
                  </Control>
                </Field>
                <Field>
                  <Control>
                    <div class="py-2">
                      <Checkbox
                        name="checkbox-1"
                        :label="$t('form_terms')"
                        color="default"
                      />
                    </div>
                  </Control>
                </Field>
                <Field>
                  <Control>
                    <div class="py-2">
                      <Button color="primary" fullwidth bold raised>
                        <span>{{$t('form_title')}}</span>
                      </Button>
                    </div>
                  </Control>
                </Field>
              </form>
            </div>
          </div>
        </div>
        <div class="column is-6 is-offset-1">
          <!--imagen-->
          <div>
             <DarkImage
                src="/assets/illustrations/chart/network.svg"
                src-dark="/assets/illustrations/chart/network.svg"
                class="image-hero"
              />
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>
.image-hero{
  position: absolute;
    top: 350px;  /*-200*/
    left: 300px;  /*400*/
    width: 800px;
    z-index: 0;
}
.hero-form-container {
/*  position: relative;*/
  z-index: 10;
  
  .hero-form {
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 1rem;
    padding: 2.5rem;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 767px) {
  .product-hero {
    text-align: center;

    :deep(.title) {
      margin-top: 3rem;

      &.is-2 {
        font-size: 2rem;
      }
    }

    .buttons {
      justify-content: center;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .product-hero {
    text-align: center;

    :deep(.title) {
      margin-top: 3rem;
      font-size: 2.25rem;
      margin-left: auto;
      margin-right: auto;
      max-width: 580px;
    }

    :deep(.subtitle) {
      margin-left: auto;
      margin-right: auto;
      max-width: 580px;
    }

    .buttons {
      justify-content: center;
    }
  }
}
</style>








