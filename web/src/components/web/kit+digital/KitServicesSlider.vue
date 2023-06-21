<script setup lang="ts">
import { ref,watch, onMounted } from 'vue'
//import { services } from '/@src/texts/services'
import axios from 'axios'

const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

const activeSlide = ref(0)
const slides = ref([])

onMounted(async ()=>{
  let newSlides = await instance.get('/tool').then( res => { return JSON.stringify(res.data) })
  slides.value = JSON.parse(newSlides)
  console.log("slided", slides.value)
})


</script>

<template>
  <div class="pb-6">
    <div class="vehicle-slider">
      <div class="vehicle-slider-inner">
        
        <div class="slider-controls">
          <ul>
            <li v-for="(slide, l) in slides" :key="l" class="iconService-Container">
              <a :class="activeSlide === l ? 'is-active is-active-' + slide.tag : ''" 
                @click.prevent="activeSlide = l"
                @keydown.space.prevent="() => (activeSlide = l)" >
                
                <IconService :color="slide.iconColor" >
                  <i class="iconify icon-service" :data-icon="slide.icon" ></i>
                </IconService>
                <span>
                  {{ slide.title }}
                </span>
              </a>
            </li>
          </ul>
        </div>
        
        <div class="slider-content">
          <div class="slider-panel">
            <div class="car-container">
              <div
                v-for="(slide, index) in slides"
                :key="index"
                class="car-container-inner"
                :class="activeSlide === index ? 'is-active' : ''"
              >
                <div class="car-header">
                  <div>
                    <h2 class="mt-4">
                        {{ slide.title }} : {{ slide.subtitle }}
                    </h2>
                    <div :style="{margin: '4px 0px 14px', display: 'flex'}">
                      <div v-for="tag in slide.tags">
                        <Tag
                            :label="tag"
                            color="primary"
                            shape="squared"
                          />
                      </div>
                    </div>
                    <p>
                       {{ slide.resume }}
                    </p>
                    <Button
                          :href="slide.toPDF"
                          target="_blank"
                          class="button-link"
                          :style="{float: 'right', top: '-40px'}"
                          size="sm"
                          variant="primary"
                        >
                           <i class="iconify" data-icon="ph:file-pdf" />
                    </Button>
                    <hr />
                      <div>
                        <Button
                          :to="slide.to"
                          class="button-link"
                          size="sm"
                          :style="{float: 'left'}"
                          variant="primary"
                        >
                           Más información
                        </Button>
                        <Button
                          href="https://reseller.aythen.com/form/lead"
                          target="_blank"
                          class="button-link solicite"
                          :style="{background: slide.iconColor}"
                          size="sm"
                          variant="primary"
                        >
                           Solicitar ahora {{ slide.title }}
                        </Button>
                        
                        </div>
                    <hr />
                    <span class="giveMeEllipsis">
                       Tener un negocio en internet ofrece una amplia variedad de beneficios. En primer lugar, permite llegar a una audiencia global de manera accesible y rentable. Además, brinda la oportunidad de recopilar y analizar datos sobre los clientes y sus hábitos de compra para mejorar la toma de decisiones empresariales. Asimismo, el comercio electrónico ofrece la posibilidad de mantener un negocio abierto las 24 horas del día, los 7 días de la semana, lo que aumenta las posibilidades de ventas y mejora la experiencia del cliente.
                    </span>
                    <hr />
                  </div>
                </div>
                
                <div class="car-boe mb-10">
                  <div class="columns is-multiline is-mobile is-desktop">
                    <div class="column is-4-desktop is-6-mobile is-flex" v-for="b in slide.allBenefits">
                      <div class="dot" :class="'coloractive-' + slide.tag">
                        <div class="dot-inner" :style="{background: slide.iconColor}">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:check" data-v-7623e932=""><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"></path></svg>
                        </div>
                      </div>
                      <p>{{b.content}}</p>
                    </div>
                  </div>
                </div>
                
                <div class="car-feature">  
                  <div v-for="(feature, index) in slide.boe" :key="index">
                    <h2> {{ feature.title }} </h2> <p> {{ feature.content }}</p>
                  </div>
                </div>
                <div class="car-overlay"></div>
                <div class="car-circle"></div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.dot.coloractive-web{
  background-color: rgba(0,0,255,.3);
}
.dot.coloractive-seo{
  background-color: rgba(255,243,67,.3);
}
.dot.coloractive-ecommerce{
  background-color: rgba(19,211,59,.3);
}
.dot.coloractive-crm{
  background-color: rgba(255,167,38,.3);
}
.dot.coloractive-social{
  background-color: rgba(210,22,67,.3);
}
.dot.coloractive-office{
  background-color: rgba(210,22,255,.3);
}
  .contenticon-container{
    display: flex;
    column-gap: 5px;
  }
  .dot {
      display: flex;
      align-items: center;
      justify-content: center;
      justify-items: center;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background: var(--primary-light-40);
      margin-right: 0.75rem;
      
      &.is-blue{ background: #5656ff !important; }
      &.is-green{ background: #c1f3cc !important; }
      &.is-yellow{ background: #f7e06f !important; }
      &.is-red{ background: #fb3060 !important; }
      &.is-orange{ background: #ffc46d !important;}
      &.is-violet{ background: #e26bff !important;}

      .dot-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background: var(--primary-light-28);
        
        &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}

        .iconify {
          height: 20px;
          width: 20px;
          color: var(--white);
          stroke-width: 3px;
        }
      }
    }

.allbenefits-container{
  display: grid;
  grid-template-rows: repeat(2, 50px);
  grid-template-columns: repeat(3, 190px);
  grid-column: 1/3;
  justify-content: center;
  gap: 10px; 
  column-gap: 50px;
  margin-bottom: 10px;
}
.car-boe {
  position: relative;
  width: 100%;
  padding: 0 4%;
  color: var(--title-color);
  padding-top: 30px;
  left: 0;
  z-index: 4;
}
.car-header .giveMeEllipsis {
   width: 97%;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3; /* number of lines to show */
   max-height: 1*1;       /* fallback */
   font-family: var(--font);
   font-size: 1.2rem;
   transition: transform 0.3s, opacity 0.3s;
}
.vehicle-slider {
  position: relative;
  
  .button-link{
    font-weight: bold;
    min-height: 20px;
    margin-right: 6px;
    
    svg{
      width: 20px;
      height: 20px;
    }
    
    &.solicite{
      border: none !important;
      color: #fff !important;
    }
  }

  .vehicle-slider-inner {
    display: flex;
    flex-direction: column;
    /*flex-direction: row-reverse;*/
    max-width: 1090px;
    margin: 0 auto;
    gap: 20px;

    .slider-controls {
      ul {
        /*Estilos que añadi*/
          display: grid;
          justify-content: center;
          grid-template-rows: repeat(2, 70px);
          grid-template-columns: repeat(3, 220px);
          gap: 20px;
        li {
          a {
            display: flex;
            align-items: center;
            background: var(--card-bg-color);
            border: 1px solid var(--card-border-color);
            border-radius: 1rem;
            padding: 8px;
            font-family: var(--font-alt);
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--light-text);
            transition: box-shadow 0.3s, border-color 0.3s,
              background-color 0.3s;

            .icon-service{
                width: 25px !important;
                height: 25px !important;
            }
            
            span{
              margin-left: 10px;
            }

            &.is-active {
              border-color: var(--primary);
              background: var(--primary);
              color: var(--white-smoke);
              /*box-shadow: var(--primary-box-shadow);*/
              /*
              img {
                filter: brightness(0) invert(1);
              }*/
            }
            
            &.is-active-web{
              background: #0000ff;
              border-color: #0000ff;
              box-shadow: var(--primary-box-shadow);
            }
            &.is-active-ecommerce{
              background: #13d33b;
              border-color: #13d33b;
              box-shadow: 0px 9px 10px 0px rgba(19,211,59,0.3);
            }
            &.is-active-seo{
              background: #fff343;
              border-color: #fff343;
              box-shadow: 0px 9px 10px 0px rgba(255,243,67,0.3);
            }
            &.is-active-social{
              background: #d21643;
              border-color: #d21643;
              box-shadow: 0px 9px 10px 0px rgba(210,22,67,0.3);
            }
            &.is-active-crm{
              background: #ffa726;
              border-color: #ffa726;
              box-shadow: 0px 9px 10px 0px rgba(255,167,38,0.3);
            }
            &.is-active-office{
              background: #d216ff;
              border-color: #d216ff;
              box-shadow: 0px 9px 10px 0px rgba(210,22,255,0.3);
            }
          }

          &:not(:last-child) {
            margin-bottom: 0.75rem;
          }
        }
      }
    }

    .slider-content {
      flex-grow: 2;

      .slider-panel {
        .car-container {
          position: relative;
          max-width: 840px;
          min-height: 700px;
          margin: 0 auto;

          .car-container-inner {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            z-index: 2;
            transition: opacity 0.3s;

            .car-main-image {
              position: absolute;
              top: 45%;
              left: 50%;
              transform: translate(-40%, -50%);
              max-width: 540px;
              margin: 0 auto;
              z-index: 3;
              transition: all 0.4s ease-in-out;
            }
            
            .car-header{
              position: relative;
              width: 100%;
              padding: 0 4%;
              /*display: flex;
              align-items: center;*/
              color: var(--title-color);
              padding-top: 30px;
              left: 0;
              z-index: 4;
              
              .car-tag{
                padding: 3px 18px 5px;
                font-size: 11px;
                margin-right: 10px;
                background: #ffffff;
                /* border: 1px solid #c2c2c2; */
                border-radius: 40px;
                box-shadow: 0px 2px 9px -8px #000;
              }
              
              div {
                margin: 0 10px;
              }
          
              div h2 {
                font-family: var(--font-alt);
              font-size: 38px;
              line-height: 40px;
              font-weight: 400;
              transition: opacity 0.5s;
              }
              
              div h3 {
                font-family: var(--font-alt);
                font-size: 1.5rem;
                transition: opacity 0.5s;
                color: blue;
                font-weight: 600;
              }

              div p {
                font-family: var(--font);
                font-size: 1.2rem;
                transition: transform 0.3s, opacity 0.3s;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }
            
            
            .car-feature{
              position: relative;
              width: 100%;
              padding: 0 4%;
              display: grid;
              grid-template-columns: 1fr 1fr;
              align-items: center;
              color: var(--title-color);
              padding-bottom: 20px;
              left: 0;
              row-gap: 25px;
              column-gap: 20px;
              z-index: 4;
              
              div {
                /*margin: 0 20px 30px;*/
              }

              div h2 {
                font-family: var(--font-alt);
                font-size: 1rem;
                font-weight: 400;
                transition: opacity 0.5s;
                line-height: 27px;
                text-transform: initial;
              }

              div p {
                    font-family: var(--font);
                  /* font-size: 0.85rem; */
                  color: #696969;
                  font-weight: 300;
                  /* text-transform: uppercase; */
                  line-clamp: 1;
                  transition: transform 0.3s, opacity 0.3s;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  height: max-content;
                  -webkit-box-orient: vertical;
              }
            }
            
 
            .car-info {
              position: relative;
              width: 100%;
              padding: 0 4%;
              display: flex;
              align-items: center;
              color: var(--title-color);
              -bottom: 50px;
              margin-top: 40px;
              padding-bottom: 60px;
              left: 0;
              z-index: 4;

              div {
                margin: 0 20px;
              }

              div h2 {
                font-family: var(--font-alt);
                font-size: 1.5rem;
                font-weight: 400;
                transition: opacity 0.5s;
              }

              div p {
                font-family: var(--font);
                font-size: 0.85rem;
                color: var(--light-text);
                text-transform: uppercase;
                transition: transform 0.3s, opacity 0.3s;
              }

              .line {
                position: relative;
                flex: 1;

                &::after {
                  position: absolute;
                  top: 0;
                  left: 0;
                  content: '';
                  height: 3px;
                  width: 0;
                  background: var(--title-color);
                  transition: width 0.4s 0.75s;
                }
              }

              .car-acceleration {
                h2 {
                  opacity: 0;
                  transition-delay: 0.35s;
                }

                p {
                  transform: translateY(1rem);
                  opacity: 0;
                  transition-delay: 0.35s;
                }
              }

              .car-speed {
                h2 {
                  opacity: 0;
                  transition-delay: 0.45s;
                }

                p {
                  transform: translateY(1rem);
                  opacity: 0;
                  transition-delay: 0.45s;
                }
              }

              .car-range {
                h2 {
                  opacity: 0;
                  transition-delay: 0.55s;
                }

                p {
                  transform: translateY(1rem);
                  opacity: 0;
                  transition-delay: 0.55s;
                }
              }

              .car-name {
                h2 {
                  opacity: 0;
                  transition-delay: 1s;
                }
              }
            }

            .car-overlay {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              /*background del contenedor*/
              background: var(--section-bg-color-grey); /*var(--wrap-muted-color);*/
              border-radius: 2rem;
              z-index: 0;
              transform: translateX(-4rem);
              opacity: 0;
              transition: transform 0.3s 0.25s, opacity 0.3s 0.25s;
            }

            .car-circle {
              position: absolute;
              top: 95%;
              left: 0%;
              height: 380px;
              width: 380px;
              background: #d9d9ff;
              border-radius: 50%;
              z-index: 0;
              transform: translate(-50%, -50%) scale(0);
              transition: transform 0.4s 0.7s;
            }

            &.is-active {
              display: contents;
              opacity: 1;

              .car-main-image {
                transform: translate(-50%, -50%);
              }

              .car-overlay {
                transform: translateX(0);
                opacity: 1;
              }

              .car-circle {
                transform: translate(-50%, -50%) scale(1);
              }

              .car-info {
                .car-acceleration,
                .car-speed,
                .car-range,
                .car-name {
                  h2 {
                    opacity: 1;
                  }

                  p {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }

                .line::after {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}

.is-dark {
  .vehicle-slider {
    .vehicle-slider-inner {
      .slider-content {
        .slider-panel {
          .car-container {
            .car-container-inner {
              .car-circle {
                opacity: 0.1;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 550px){
    .allbenefits-container{
     display: grid;
     grid-template-rows: repeat(2, 80px);
     grid-template-columns: repeat(2, 150px);
     justify-content: center;
     align-items: center;
     justify-items: center;
     text-align: center;
     align-content: center;
     gap: 10px; 
     column-gap: 50px;
}
}

@media only screen and (max-width: 767px) {

  .vehicle-slider {
    .vehicle-slider-inner {
      flex-direction: column;

      .slider-controls {
        width: 100%;
        max-width: 100%;

        ul {
          /*
          display: flex;
          overflow-x: scroll;
          padding-bottom: 1.5rem;*/
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(2, 165px);
          gap: 20px;
          li {
            margin-right: 0.75rem;

            a {
              padding: 0.5rem 1rem;
              -min-width: 150px;
            }
          }
        }
      }

      .slider-content {
        .slider-panel {
          .car-container {
            .car-container-inner {
              .car-header{
                padding: 32px 2% 10%;
                
                div{
                  display: grid;    
                  gap: 10px;
                }
              }
              
              .car-feature{
                margin-top: 0px;
                grid-template-columns: 1fr;
              }
              
              
              .car-main-image {
                max-width: 100%;
              }

              .car-info {
                flex-wrap: wrap;
                padding: 0 2%;
                bottom: 1.5rem;

                > div {
                  text-align: center;
                  width: 50%;
                  margin: 0.5rem 0;
                }
              }

              .car-circle {
                height: 260px;
                width: 260px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .vehicle-slider {
    .vehicle-slider-inner {
      .slider-controls {
        /*
        max-width: 160px;
        width: 160px;
        */

        ul {
          li {
            a {
              img {
                min-width: 28px;
                width: 28px;
                height: 28px;
              }
            }
          }
        }
      }

      .slider-content {
        .slider-panel {
          .car-container {
            .car-container-inner {
              .car-main-image {
                max-width: 420px;
              }

              .car-info {
                flex-wrap: wrap;
                padding: 0 2%;
                bottom: 1.5rem;

                div h2 {
                  font-size: 1.25rem;
                }

                div p {
                  font-size: 0.8rem;
                }

                .line {
                  display: none;
                }
              }

              .car-circle {
                height: 320px;
                width: 320px;
              }
            }
          }
        }
      }
    }
  }
}

</style>
