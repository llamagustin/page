<route lang="yaml">
  meta:
  layout: demo
  transition: fade-slow
</route>

<script setup lang="ts">
  import { onBeforeRouteLeave } from 'vue-router';

  import { ref, onMounted } from 'vue'
  import {
    customerLogos,
    textSubscriptionCompact,
    textFunnel,
    testimonials
  }
  from '/@src/texts/home'

  import Iconify from '@iconify/iconify';

  //kit+digital
  import { productStacks, vulkFeatures, textVideo, textFaq, faq } from '/@src/texts/kit+digital'

  const scrollIni = () => {

    const style = document.createElement('style');

    style.textContent = `
    .navbar-item{ color: #fff !important} 
    .navbar.is-solid .navbar-item{ color: #283252 !important}`;

    style.setAttribute('id', 'header-ini-scroll');
    document.head.appendChild(style);
  }

  const scrollDelete = () => {
    const style = document.getElementById('header-ini-scroll');
    if (style) {
      document.head.removeChild(style);
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', function() {

      if (window.scrollY === 0 && window.location.pathname == '/home') {
        scrollIni()
      }
      else {
        scrollDelete()
      }
    });

    scrollIni()
  })

  onBeforeRouteLeave((to, from, next) => {
    scrollDelete();
    next();
  })
</script>

<template>
  <div>
    <HomeIntro />
    <!--HomePromo /-->
    <!--<HomeVideo />-->
    <Section wave="wave-1"></Section>
    <Section color="grey" wave="wave-2" shape-color="white">
      <Container>
        <SectionTitle id="template-demos" :title="$t('vulkFeatures_title')" :subtitle="$t('vulkFeatures_title_up')" />

        <KitServices :features="vulkFeatures.data" />
      </Container>
    </Section>

    <Section class="pb-0">
      <Container>
        <HomeCtaBlockA :title="$t('text_funnel_title')" :subtitle="$t('text_funnel_subtitle')" :logos="customerLogos" boxed shapes />
        <SectionTitle :title="$t('text_subscription_title')" :subtitle="$t('text_subscription_subtitle')" />

        <div>
          <div class="mx-auto max-w-6 mt-2">
            <p class="paragraph has-text-centered">{{ $t('text_subscription_text') }}</p>
          </div>
          <div class="py-5 has-text-centered rem-200 text-light">
            <i class="iconify" data-icon="ph:arrow-down-bold"></i>
          </div>
          <div class="mx-auto max-w-4">
            <div class="landing-cta-wrapper">
              <div class="cta-title">
                <h3>{{ $t('text_subscription_title1') }}</h3>
                <a href="https://reseller.aythen.com/form/lead" target="_blank" class="custom-button">
                  <img src="/assets/images/logo-white.png" alt="Aythen Logo" />
                  <span>{{ $t('text_subscription_button1') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <HomeTestimonial :testimonials="testimonials" />
      </Container>
    </Section>

    <!--Cambiar color del wave a un azul que combine con la animación-->
    <div v-if="false">
      <Section wave="wave-1" shapeColor="secondary" class="section-wave"></Section>
      <HomeChoice class="section-container mt-0" />
    </div>
    <FooterD />
  </div>
</template>

<style scoped lang="scss">
  .section-wave {
    margin-top: 180px;
  }

  .navbar .istransparent {
    color: white !important;
  }

  .has-naver.mr-1 {
    color: yellow !important;
  }

  .section-container {
    padding-bottom: 12px;
  }

  .blueAythen {
    background-color: #00f;
  }

  .landing-cta-wrapper {
    padding-bottom: 3rem;

    .cta-title {
      text-align: center;

      h3 {
        font-family: var(--font-main);
        font-weight: 300;
        font-size: 1.5rem;
        color: var(--light-text);
        margin-bottom: 20px;
      }

      .custom-button {
        display: flex;
        align-items: center;
        margin: 10px auto;
        max-width: 200px;
        font-family: var(--font);
        border: 2px solid #0000ff;
        border-radius: 100px;
        background: #0000ff;
        box-shadow: var(--light-box-shadow);
        transition: all 0.3s;
        padding: 10px;

        img {
          display: block;
          height: 20px;
          width: 22px;
          margin-left: 10px;
        }

        span {
          display: block;
          font-family: var(--font);
          font-weight: 600;
          font-size: 1rem;
          color: #ffffff;
          margin-left: 22px;
          transition: color 0.3s;
        }
      }
    }
  }
</style>
