<script setup lang="ts">
//import { socialLinks } from '/@src/data/blocks/advanced/social'

import { footer } from '/@src/texts/dashboard'

import { computed, onBeforeMount, ref } from 'vue'

export type FooterColors = 'darkback2'| 'light' | 'dark' | 'default'


export interface FooterDProps {
  color?: FooterColors
  bubbles?: boolean
  curved?: boolean
  image?: string
}

const props = withDefaults(defineProps<FooterDProps>(), {
  color: 'default',
  bubbles: false,
  curved: false,
  image: undefined,
})

const footerClasses = computed(() => [
  props.color && `footer-${props.color}`,
  props.curved && `footer-curved`,
  props.bubbles && 'footer-overflow',
])


</script>

<template>
  <footer class="footer" :class="footerClasses">
    <FooterBubbles v-if="props.bubbles" />

    <div class="container footer-inner">
      <div class="columns footer-items-container ">
        <div class="column is-3 b-centered-mobile b-centered-tablet-p">
          <div class="footer-group">
            <a
              class="is-flex j-center-mobile j-center-tablet-p footer-logo-left css-ninja"
              href="#"
            >
              <svg class="size-44x44 color-kit-digital" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g>	<defs>		<rect id="SVGID_1_" width="500" height="500"/>	</defs>	<clipPath id="SVGID_2_">		<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>	</clipPath>	<path class="st0" d="M84.02,63.04c-8.4,7.46-17.57,16.61-26.72,27.68c-12.57,15.19-21.74,29.92-28.4,42.48		c49.35-1.06,87.45-0.78,107.04,0.06c4.56,0.2,12.3,0.68,20.43,5.17c10.56,5.82,15.75,14.93,20.51,23.29		c4.18,7.35,6.57,13.97,7.94,18.55c-27.74,60.5-55.48,120.99-83.22,181.49h77.65l44.55-97.53l65.58,141.21		c1.63,3.46,6.27,12.16,16.46,18.38c9.96,6.08,19.99,6.12,25.18,6.15c20.92,0.13,52.69,0.42,92.48,0.02		c8.89-8.56,18.92-19.49,28.78-33.05c9.83-13.52,17.13-26.39,22.54-37.46c-46.98,0.11-83.07-0.11-102.33-0.17		c-2.94-0.01-8.97-0.09-15.89-2.94c-13.99-5.76-20.77-18.35-23.99-24.33c-2.32-4.31-3.75-8.14-4.63-10.86		c-55.75-122.28-97.76-211.63-108.67-234.03c-1.53-3.13-5.25-10.7-13.23-16.52c-10.64-7.76-22.74-8.02-29.46-8.07		C153.94,62.39,122.41,62.24,84.02,63.04"/></g></svg>
              <span class="is-sr-only">Logo</span>
            </a>
            <p class="footer-text rem-90 max-w-3 mt-4 b-centered-tablet-p has-text-centered">
              {{ $t('footer_text') }}
            </p>

           
          </div>
        </div>
        <div class="is-9 column b-centered-tablet-p b-centered-mobile pb-12">
          <div class="columns is-flex is-multiline is-12">
            <div class="column is-6-mobile is-3-tablet is-3-desktop is-3-widescreen is-3-fullhd">
              <div class="footer-group">
                <slot name="column-1">
                  <Title
                    tag="h3"
                    :size="6"
                    weight="thin"
                    :inverted="props.color === 'dark'"
                  >
                    <span class="footer-texts">{{ $t('footer_title0') }}   </span>
                  </Title>
                  <ul class="link-list">
                    <li v-for="(item, index) in footer.links[0].data.slice(0, 4)">
                      <RouterLink
                        :to="item.link"
                        class="level-item footer-link"
                      >
                        {{ $t('AfooterLink' + index) }}
                      </RouterLink>
                    </li>
                  </ul>
                </slot>
              </div>
            </div>
            <div class="column is-6-mobile is-3-tablet is-3-desktop is-3-widescreen is-3-fullhd">
              <div class="footer-group">
                <slot name="column-3">
                  <Title
                    tag="h3"
                    :size="6"
                    weight="thin"
                    :inverted="props.color === 'dark'"
                  >
                    <span class="footer-texts">{{ $t('footer_title1') }} </span>
                  </Title>
                  <ul class="link-list">
                    <li v-for="(item, index) in footer.links[3].data.slice(0, 4)">
                      <RouterLink
                        :to="item.link"
                        class="level-item footer-link"
                      >
                        {{  $t('BfooterLink' + index) }}
                      </RouterLink>
                    </li>
                  </ul>
                </slot>
              </div>
            </div>
            <div class="column is-6-mobile is-3-tablet is-3-desktop is-3-widescreen is-3-fullhd">
              <div class="footer-group">
                <slot name="column-2">
                  <Title
                    tag="h3"
                    :size="6"
                    weight="thin"
                    :inverted="props.color === 'dark'"
                  >
                    <span class="footer-texts">{{ $t('footer_title2') }}</span>
                  </Title>
                  <ul class="link-list">
                    <li v-for="(item, index) in footer.links[1].data.slice(0, 3)">
                      <RouterLink
                        :to="item.link"
                        class="level-item footer-link"
                      >
                        {{ $t('CfooterLink'+ index) }}
                      </RouterLink>
                    </li>
                  </ul>
                </slot>
              </div>
            </div>
            <div class="column is-6-mobile is-3-tablet is-3-desktop is-3-widescreen is-3-fullhd">
              <div class="footer-group">
                <slot name="column-2">
                  <Title
                    tag="h3"
                    :size="6"
                    weight="thin"
                    :inverted="props.color === 'dark'"
                  >
                    <span class="footer-texts">{{ $t('footer_title2') }}</span>
                  </Title>
                  <ul class="link-list">
                    <li v-for="(item, index) in footer.links[2].data.slice(0, 3)">
                      <RouterLink
                        :to="item.link"
                        class="level-item footer-link"
                      >
                        {{ $t('DfooterLink'+ index) }}
                      </RouterLink>
                    </li>
                  </ul>
                </slot>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
    <div class="container copyright pt-0">
      <!--div
        class="is-flex is-align-items-center is-justify-content-space-between d-column-r-mobile d-column-r-tablet-p"
      -->
        <div class="pt-8 py-4">
          <div class="footer-container-icons footer-text rem-90">
            
               <span class="d-flex align-center">
                  &copy;
                  {{ new Date().getFullYear() }}
                  Made With
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="red" fill="none" stroke-linecap="round" stroke-linejoin="round">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                     <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                  </svg>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  By <a
                    href="https://aythen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary ms-1"
                  >Aythen</a>
                </span>
                
            <div class="iconsocial-container is-flex is-mobile">
              <Button
                v-for="(rrs, index) in footer.rrs.slice(0,3)"
                :key="index"
                class="level-item footer-link footer-rrs"
                :href="rrs.url"
                target="_blank"
              >
                <span class="icon">
                  <i class="iconify" :data-icon="rrs.icon"></i>
                  <span class="is-sr-only">{{ rrs.name }}</span>
                </span>
              </Button>
            </div>
            
            <div class="is-flex">
              <Button >Status:  
                <div class="circle ml-1"></div> 
                <span class="ml-1" style="color:green" >API systems normal.</span></button>
            </div>
            <!--span role="img" aria-label="copyright">©</span>
            {{ footer.label }}-->
          </div>
        </div>
      <!--/div-->
    </div>
  </footer>
</template>

<style lang="scss" scoped>

.icon-tabler-heart{
   position: absolute;
}
.footer {
  position: relative;
  background: var(--footer-default-bg-color);
  padding-bottom: 1rem;
  padding-top: 2rem;
  
  
  .color-kit-digital{
    fill: #000fff;
  }

  &.footer-overflow {
    :global(body) {
      //overflow-x: hidden;
    }
  }
  
  .footer-rrs{
    background: transparent;
    border: none;
  }

  &.footer-curved {
    border-top-left-radius: 50% 20%;
    border-top-right-radius: 50% 20%;
  }

  &.footer-light {
    background: var(--footer-light-bg-color);
  }

  &.footer-dark {
    background: var(--footer-dark-bg-color);

    .title {
      //color: var(--white-smoke);
      opacity: 0.6;
    }

    .footer-link {
      color: var(--white-smoke);
      opacity: 0.8;

      &:hover {
        color: var(--primary-light-10) !important;
        opacity: 1;
      }
    }

    .footer-text {
      color: var(--white-smoke);
      text-align: center;
    }
  }

  .footer-link,
  :deep(.footer-link) {
    margin-top: 5px;
    font-family: var(--font);
    color: var(--medium-text);
    transition: color 0.3s;
    justify-content: flex-start;
    font-size: 0.95rem;

    &:hover {
      color: var(--primary);
    }
  }

  .footer-text {
    font-family: var(--font);
    color: var(--medium-text);
  }

  .footer-logo-centered {
    display: block;
    width: 100%;

    img {
      margin: 0 auto;
    }
  }

  .footer-logo-left {
    img {
      display: block;
    }
  }
}
.footer-container-icons{
  padding-top: 50px;
  padding-right: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  height: max-content;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.container-subcategories{
  margin-top: 20px;
  gap: 15px;
}
.status-button{
  display: flex;
  align-items: center;
  column-gap: 10px;
  height: 34px;
  width: 80px;
  border-radius: 8px;
  background-color: var(--white-smoke);
  border: 1px solid rgba(0,0,0,.1);
  outline: none;
}
 .circle{
  align-self: center;
  border-radius: 50%;
  background-color: green;
  width: 10px;
  height: 10px;
}
.is-dark .status-button{
  background-color: var(--white-smoke);
  color: #000;
}
.status-button:hover{
  background-color: rgba(0,0,0,.1);
}
.is-dark .status-button:hover{
  background-color: grey;
  border: 2px solid rgba(0,0,0,.1);
}
.iconsocial-container .level-item{
  display: flex;
  align-items: center;
}
.footer-items-container{
  display: flex;
  gap: 10px;
}
.footer-texts{
  color: var(--medium-text) !important;
}
.footer-darkback2{
    background-color: rgba(12,11,11,1) !important;
}

@media only screen and (max-width: 767px) {
  .footer-items-container{
    flex-direction: column;
  }
  .container-subcategories{
    flex-direction: column;
  }
  .footer {
    .d-none-mobile{
      display: none !important;  
    }
    
    :deep(.level-item) {
      justify-content: center !important;
    }

    &.footer-curved {
      border-top-left-radius: 80% 20%;
      border-top-right-radius: 80% 20%;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .footer {
    :deep(.level-item) {
      justify-content: center !important;
    }
  }
}

</style>
