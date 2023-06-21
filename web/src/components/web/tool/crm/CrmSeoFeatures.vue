<script setup lang="ts">
import { computed } from 'vue'
export interface CrmSeoReports {
  icon: string
  iconColor: string
  title: string
  content: string
  resume: string
  color: string
}

export interface CrmSeoReportsProps {
  features?: CrmSeoReports[],
  color?: string
}

const props = withDefaults(defineProps<CrmSeoReportsProps>(), {
  features: () => [],
  color: undefined
})
const blobClasses = computed(() => [props.color && `is-${props.color}`])
</script>
<template>
    <div class="py-6 mx-auto max-w-10 flex flex-column" style="gap:80px;">
        <div  class="is-flex justify-between gap-5 mb-20">
            <div style="font-size:1em;" class="seo-info-box pr-8">
                <h2 class="white-on-dark seo-info-title1">{{$t('crmInfo_title')}}</h2>
                <p class="paragraph">{{$t('crmInfo_text')}}</p>
                <ul class="seo-info-ul">
                    <li class="flex items-center gap-5" style="flex-wrap:nowrap;">
                        <Icon icon="ic:outline-list-alt" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div style="margin-left:10px;">
                            <h3 class="white-on-dark seo-info-title">{{$t('crmInfo_subtitle0')}}</h3>
                            <p class="paragraph">{{$t('crmInfo_subtext0')}}</p> 
                        </div>
                    </li>
                    <li class="flex items-center gap-5" style="flex-wrap:nowrap;">
                        <Icon icon="carbon:meter-alt" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div style="margin-left:10px;">
                            <h3 class="white-on-dark seo-info-title">{{$t('crmInfo_subtitle1')}}</h3>
                            <p class="paragraph">{{$t('crmInfo_subtext1')}}</p>
                        </div>
                    </li>
                    <li class="flex items-center gap-5" style="flex-wrap:nowrap;">
                        <Icon icon="icon-park-outline:setting-config" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div style="margin-left:10px;">
                            <h3 class="white-on-dark seo-info-title">{{$t('seoInfo_subtitle2')}}</h3>
                            <p class="paragraph">{{$t('crmInfo_subtext2')}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div  class="seo-container-box">
                <div class="absolute-bg-colored first-absolute" :class="blobClasses"></div>
                <div class="flex flex-column gap-2">
                    <Card class="seo-feature-box"
                    >
                        <div class="flex gap-2 justify-between">
                            <div class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-3" style="width:20px;height:fit-content;margin-top:5px;" viewBox="0 0 40 40"><path d="M20,40A20,20,0,1,0,0,20,20,20,0,0,0,20,40ZM26.24,9.32c.3-1.08-.74-1.72-1.7-1L11.19,17.79c-1,.74-.87,2.21.25,2.21H15v0H21.8l-5.58,2-2.46,8.74c-.3,1.08.74,1.72,1.7,1l13.35-9.51c1-.74.87-2.21-.25-2.21H23.23Z" style="fill:#f15757;fill-rule:evenodd;"></path></svg>
                                <div class="flex flex-column">
                                    <h4 class="flex items-center white-on-dark" style="font-weight:500;font-size:15px;line-height:20px;">
                                       {{$t('seoNotification_title0')}}
                                    </h4>
                                    <p class="white-on-dark" style="font-size:15px;">{{$t('seoNotification_time0')}}</p>   
                                </div>
                            </div>
                             
                            <div class="flex items-center white-on-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current white-on-dark" style="width:20px;cursor:pointer;" viewBox="0 0 16 4"><path d="M2,0A2,2,0,1,0,4,2,2,2,0,0,0,2,0ZM14,0a2,2,0,1,0,2,2A2,2,0,0,0,14,0ZM8,0a2,2,0,1,0,2,2A2,2,0,0,0,8,0Z"></path></svg>
                            </div>
                        </div>
                    </Card>
                    
                    <Card class="seo-feature-box"
                    >
                        <div class="flex gap-2 justify-between">
                            <div class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-3" style="width:20px;height:fit-content;margin-top:5px;" viewBox="0 0 40 40"><path d="M20,40A20,20,0,1,0,0,20,20,20,0,0,0,20,40Zm3.09-24.55a4.37,4.37,0,1,0-6.18,0L20,18.54Zm1.46,7.64a4.37,4.37,0,1,0,0-6.18L21.46,20Zm-1.46,7.63a4.37,4.37,0,0,0,0-6.17L20,21.46l-3.09,3.09a4.37,4.37,0,0,0,6.18,6.17ZM9.28,23.09a4.37,4.37,0,1,1,6.17-6.18L18.54,20l-3.09,3.09A4.37,4.37,0,0,1,9.28,23.09Z" style="fill:#946fff;fill-rule:evenodd"></path></svg>
                                <div class="flex flex-column">
                                    <h4 class="flex items-center white-on-dark" style="font-weight:500;font-size:15px;line-height:20px;">
                                       {{$t('seoNotification_title1')}}
                                    </h4>
                                    <p class="white-on-dark" style="font-size:15px;">{{$t('seoNotification_time1')}}</p>   
                                </div>
                            </div>
                             
                            <div class="flex items-center white-on-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current white-on-dark" style="width:20px;cursor:pointer;" viewBox="0 0 16 4"><path d="M2,0A2,2,0,1,0,4,2,2,2,0,0,0,2,0ZM14,0a2,2,0,1,0,2,2A2,2,0,0,0,14,0ZM8,0a2,2,0,1,0,2,2A2,2,0,0,0,8,0Z"></path></svg>
                            </div>
                        </div>
                    </Card>
                    
                    <Card class="seo-feature-box"
                    >
                        <div class="flex gap-2 justify-between">
                            <div class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-3" style="width:20px;height:fit-content;margin-top:5px;" viewBox="0 0 15.95 16"><path d="M10,.42,8.46,0,7.14,5,5.94.48,4.37.9,5.66,5.73,2.44,2.51,1.29,3.66,4.82,7.19.42,6,0,7.59,4.81,8.87a2.92,2.92,0,0,1-.09-.73,3.26,3.26,0,1,1,6.52,0,3.55,3.55,0,0,1-.08.73L15.52,10,16,8.47l-4.83-1.3L15.52,6,15.1,4.42l-4.83,1.3,3.22-3.23L12.34,1.34,8.86,4.83Z" style="fill:#f97316"></path><path d="M11.15,8.89a3.2,3.2,0,0,1-.81,1.49l3.17,3.17,1.15-1.15Z" style="fill:#f97316"></path><path d="M10.31,10.41a3.3,3.3,0,0,1-1.46.87L10,15.57l1.58-.42Z" style="fill:#f97316"></path><path d="M8.79,11.29a3.1,3.1,0,0,1-.81.1,3.58,3.58,0,0,1-.87-.11L6,15.58,7.53,16Z" style="fill:#f97316"></path><path d="M7.06,11.26a3.18,3.18,0,0,1-1.43-.87L2.45,13.56,3.6,14.71Z" style="fill:#f97316"></path><path d="M5.6,10.36a3.23,3.23,0,0,1-.79-1.48L.43,10.06l.42,1.57Z" style="fill:#f97316"></path></svg>
                                <div class="flex flex-column">
                                    <h4 class="flex items-center white-on-dark" style="font-weight:500;font-size:15px;line-height:20px;">
                                       {{$t('seoNotification_title2')}}
                                    </h4>
                                    <p class="white-on-dark" style="font-size:15px;">{{$t('seoNotification_time2')}}</p>   
                                </div>
                            </div>
                             
                            <div class="flex items-center white-on-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current white-on-dark" style="width:20px;cursor:pointer;" viewBox="0 0 16 4"><path d="M2,0A2,2,0,1,0,4,2,2,2,0,0,0,2,0ZM14,0a2,2,0,1,0,2,2A2,2,0,0,0,14,0ZM8,0a2,2,0,1,0,2,2A2,2,0,0,0,8,0Z"></path></svg>
                            </div>
                        </div>
                    </Card>
                    
                    <Card class="seo-feature-box"
                    >
                        <div class="flex gap-2 justify-between">
                            <div class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-3" style="width:20px;height:fit-content;margin-top:5px;" viewBox="0 0 100 100"><polygon points="0 0 50 0 0 50 0 0" style="fill:#009cea"></polygon><polygon points="0 50 50 50 0 100 0 50" style="fill:#009cea"></polygon><polygon points="50 0 100 0 50 50 50 0" style="fill:#009cea"></polygon><circle cx="75" cy="75" r="25" style="fill:#009cea"></circle></svg>
                                <div class="flex flex-column">
                                    <h4 class="flex items-center white-on-dark" style="font-weight:500;font-size:15px;line-height:20px;">
                                        {{$t('seoNotification_title3')}}
                                    </h4>
                                    <p class="white-on-dark" style="font-size:15px;">{{$t('seoNotification_time3')}}</p>   
                                </div>
                            </div>
                             
                            <div class="flex items-center white-on-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current white-on-dark" style="width:20px;cursor:pointer;" viewBox="0 0 16 4"><path d="M2,0A2,2,0,1,0,4,2,2,2,0,0,0,2,0ZM14,0a2,2,0,1,0,2,2A2,2,0,0,0,14,0ZM8,0a2,2,0,1,0,2,2A2,2,0,0,0,8,0Z"></path></svg>
                            </div>
                        </div>
                    </Card>
                    
                    <Card class="seo-feature-box"
                    >
                        <div class="flex gap-2 justify-between">
                            <div class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-3" style="width:20px;height:fit-content;margin-top:5px;" viewBox="0 0 40 40"><path d="M8.55,3.6A20,20,0,0,0,4.71,7.11c4.58-.42,10.42.27,17.18,3.66,7.23,3.61,13,3.73,17.1,3a20.14,20.14,0,0,0-1.37-3.2C33,11,27,10.36,20.11,6.9A29.64,29.64,0,0,0,8.55,3.6ZM34.91,6.67A20,20,0,0,0,15,.64a37,37,0,0,1,6.93,2.68A28.82,28.82,0,0,0,34.91,6.67Zm5,11c-4.89,1-11.65.77-19.75-3.29C12.53,10.56,6.5,10.6,2.43,11.51l-.61.14A19.82,19.82,0,0,0,.56,15.29c.32-.08.66-.17,1-.24C6.5,14,13.47,14,21.89,18.21,29.47,22,35.5,22,39.57,21.05L40,21c0-.31,0-.63,0-.95A20.66,20.66,0,0,0,39.86,17.63Zm-.54,7.54c-4.84.85-11.4.52-19.21-3.38C12.53,18,6.5,18.05,2.43,19A19.75,19.75,0,0,0,0,19.66V20a20,20,0,0,0,39.32,5.17Z" style="fill:#10d08f;fill-rule:evenodd"></path></svg>
                                <div class="flex flex-column">
                                    <h4 class="flex items-center white-on-dark" style="font-weight:500;font-size:15px;line-height:20px;">
                                      {{$t('seoNotification_title4')}}
                                    </h4>
                                    <p class="white-on-dark" style="font-size:15px;">{{$t('seoNotification_time4')}}</p>   
                                </div>
                            </div>
                             
                            <div class="flex items-center white-on-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current white-on-dark" style="width:20px;cursor:pointer;" viewBox="0 0 16 4"><path d="M2,0A2,2,0,1,0,4,2,2,2,0,0,0,2,0ZM14,0a2,2,0,1,0,2,2A2,2,0,0,0,14,0ZM8,0a2,2,0,1,0,2,2A2,2,0,0,0,8,0Z"></path></svg>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        
        
        <div class="is-flex justify-between gap-5 mt-20">
            <div class="seo-container-box">
                <div class="absolute-bg-colored" :class="blobClasses"></div>
                <div class="flex flex-column gap-2">
                    <Card class="seo-feature-box"
                        v-for="(feature, index) in props.features"
                        :key="index"
                    >
                        <div class="flex gap-2 justify-between">
                             <h4 class="flex items-center white-on-dark" style="font-weight:500;font-size:17px;">
                                <Icon :icon="feature.icon" :style="feature.iconColor" style="font-size:23px;margin-top:-8px;margin-right:10px;" />
                                {{ feature.title }}
                            </h4>
                            <div class="flex items-center white-on-dark">
                                <p class="truncate">{{feature.resume}}</p>
                                <Icon style="margin-left:15px;" icon="circum:circle-alert" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div style="font-size:1em;" class="seo-info-box pl-8">
                <h2 class="white-on-dark seo-info-title1">{{$t('crmInfo_title2')}}</h2>
                <p class="paragraph">{{$t('crmInfo_text2')}}</p>
                <ul class="seo-info-ul">
                    <li class="flex items-center gap-5" style="flex-wrap:nowrap;">
                        <Icon icon="ic:outline-search" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div style="margin-left:10px;">
                            <h3 class="white-on-dark seo-info-title">{{$t('crmInfo_subtitle3')}}</h3>
                            <p class="paragraph">{{$t('crmInfo_subtext3')}}</p> 
                        </div>
                    </li>
                    <li class="flex items-center gap-5" style="flex-wrap:nowrap;">
                        <Icon icon="carbon:meter-alt" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div style="margin-left:10px;">
                            <h3 class="white-on-dark seo-info-title">{{$t('crmInfo_subtitle4')}}</h3>
                            <p class="paragraph">{{$t('crmInfo_subtext4')}}</p>
                        </div>
                    </li>
                    <li class="flex items-center gap-5" style="flex-wrap:nowrap;">
                        <Icon icon="material-symbols:health-and-safety-outline-sharp" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div style="margin-left:10px;">
                            <h3 class="white-on-dark seo-info-title">{{$t('crmInfo_subtitle5')}}</h3>
                            <p class="paragraph">{{$t('crmInfo_subtext5')}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>     
    </div>
</template>
<style lang="scss">
    .absolute-bg-colored{
        opacity:.5;
        &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}
    }
    .icon-intro{
        &.is-blue svg{ background: #0000ff !important; }
        &.is-green svg{ background: #13d33b !important; }
        &.is-yellow svg{ background: #ffd843 !important; }
        &.is-red svg{ background: #d21643 !important; }
        &.is-orange svg{ background: #ffa726 !important;}
        &.is-violet svg{ background: #d216ff !important;}
        
        svg{
            color: #fff;
        }
    }
    
    .is-dark{
        .icon-intro{
            svg{
                color: #000;
            }
        }
    }
    
    
    .seo-progress-box{
        padding:1.25rem;
        margin: 5px 15px;
        border-radius:5px;
        box-shadow: 0 0 35px #0004;
        transition: transform .5s ease-in-out;
        transform: perspective(600px) rotateX(30deg);
    }
    .seo-progress-box:hover{
        transform: perspective(600px) rotateX(0deg);
    }
    .seo-progress-bar{
        width:100%;
        height:5px;
        border-radius:10px;
        background:#3332;
    }
    .seo-progress{
        width:25%;
        height:100%;
        border-radius:10px;
        background:#55f;
    }
    .no-wrap{
        flex-wrap:nowrap !important;
    }
    .block-3d-title{
        font-size:20px;
        font-weight:700;
        margin-bottom:10px;
    }
    .block-3d-description{
        font-size:16px;
        font-weight:500;
        color:#333;
    }
    .icon-intro svg{
        padding:7px;
        font-size:40px;
        border-radius:10px;
        background-color:#99f3;
        fill:currentColor;
    }
    .fill-current{
        fill:currentColor;
    }
    .seo-info-title1{
        font-size:2em;
        font-weight:700;
        margin-bottom:10px;
    }
    .seo-info-title{
        font-size:20px;
        font-weight:600;
    }
    .seo-info-subtitle{
        color:#666;
        /*font-weight:500;*/
    }
    .seo-info-ul{
        margin-top:20px;
        display:flex;
        flex-direction:column;
        gap:20px;
    }
    .truncate{
        font-size:17px;
    }
    .gap-2{
        gap:10px;
    }
    .gap-3{
        gap:15px;
    }
    .justify-between{
        justify-content:space-between;
    }
    .flex{
        display:flex;
        flex-wrap:wrap;
    }
    .flex-column{
        flex-direction:column;
    }
    .seo-container-box,.seo-info-box{
        flex:1;
        max-width:510px;
        position:relative;
    }
    .absolute-bg-colored{
        position: absolute;
        width:100%;
        height:100%;
        background:#99f2;
        border-radius:20px;
        z-index:-1;
        top:15px;
        left:-12px;
    }
    .first-absolute{
        left:15px;
    }
    .seo-feature-box{
        border-radius:15px;
        font-weight:400;
        border:1px solid #4442;
        color:#222 !important;
        box-shadow: 0 0 20px #0002 !important;
    }
    .seo-feature-box .card-content{
        padding: 20px !important;
    }
    /*.is-dark-white{*/
    /*    color: #222 !important;*/
    /*    background:#fff !important;*/
    /* }*/
    
    html.is-dark {
      .app-mockup {
        border: none;
      }
      .seo-feature-box .card-content{
          padding: 20px !important;
      }
      .is-dark-white{
        color: #fff !important;
      }
      
      .is-dark-grey{
        color: #747990 !important;
      }
    }
    html.is-dark 
      .white-on-dark{
          color:#eee !important;
      }
    html.is-dark 
      .shadow-white-on-dark{
          box-shadow: 0 0 25px #fff3;
      }
</style>