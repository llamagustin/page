<script setup lang="ts">
import { computed } from 'vue'

export interface RrssFeatureSeoProps {
  color?: string
}

const props = withDefaults(defineProps<RrssFeatureSeoProps>(), {
  color: undefined
})
const blobClasses = computed(() => [props.color && `is-${props.color}`])
</script>
<template>
    <div class="container">
        <div class="flex items-center gap-2" style="gap:15px;align-items:center;justify-content:center;">
            <div style="flex:1;max-width:500px;">
                <ul class="flex flex-column" style="gap:80px;">
                    <li class="flex no-wrap gap-3">
                        <Icon icon="mdi:record-circle-outline" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title0')}} </h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text0')}}</p>
                        </div>
                    </li>
                    <li class="flex no-wrap gap-3">
                        <Icon icon="fluent-mdl2:b-i-dashboard" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title1')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text1')}}</p>
                        </div>
                    </li>
                    <li class="flex no-wrap gap-3">
                        <Icon icon="clarity:blocks-group-outline-alerted" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title2')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text2')}}</p>
                        </div>
                    </li>
                    <li class="flex no-wrap gap-3">
                        <Icon icon="material-symbols:share-outline-sharp" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title3')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text3')}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="flex:1;max-width:500px;">
                <ul>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                    <i class="iconify" data-icon="brandico:facebook"></i>
                                    Facebook <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                <i class="iconify" data-icon="brandico:instagram"></i>
                                Instagram <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress" style="width:70%;"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                <i class="iconify" data-icon="brandico:twitter-bird"></i>
                                Twitter <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress" style="width:10%;"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                <i class="iconify" data-icon="brandico:linkedin"></i>
                                Linked In <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress" style="width:8%;"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                    <Icon icon="basil:youtube-outline" />
                                    YouTube <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress" style="width:85%;"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                    <i class="iconify" data-icon="bx:bxl-tiktok"></i>
                                    Tik Tok <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress" style="width:65%;"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-column gap-3 seo-progress-box shadow-white-on-dark">
                            <div class="flex justify-between">
                                <p class="flex gap-2 items-center white-on-dark">
                                    <Icon icon="ph:pinterest-logo-bold" />
                                     Pinterest <Icon icon="ri:external-link-fill"/></p>
                                <p class="white-on-dark">340</p>
                            </div>
                            <div class="seo-progress-bar">
                                <div class="seo-progress" style="width:55%;"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="flex:1;max-width:500px;">
                <ul class="flex flex-column" style="gap:80px;">
                    <li class="flex gap-3 no-wrap">
                        <Icon icon="material-symbols:map-outline-rounded" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title4')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text4')}}</p>
                        </div>
                    </li>
                    <li class="flex gap-3 no-wrap">
                        <Icon icon="mdi:monitor-smartphone" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title5')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text5')}}</p>
                        </div>
                    </li>
                    <li class="flex gap-3 no-wrap">
                        <Icon icon="arcticons:eventyayattendee" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title6')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text6')}}</p>
                        </div>
                    </li>
                    <li class="flex gap-3 no-wrap">
                        <Icon icon="typcn:export-outline" style="margin-top:7px;" class="icon-intro white-on-dark" :class="blobClasses" />
                        <div>
                            <h3 class="block-3d-title white-on-dark">{{$t('rsFeatureSeo_title7')}}</h3>
                            <p class="paragraph">{{$t('rsFeatureSeo_text7')}}</p>
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
        margin-bottom:0px;
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
        font-weight:500;
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
        max-width:520px;
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
          color:#fff !important;
      }
    html.is-dark 
      .shadow-white-on-dark{
          box-shadow: 0 0 25px #fff3;
      }
      
      .icon-intro{
        &.is-blue svg{ background: #0000ff !important;color:#fff; }
        &.is-green svg{ background: #13d33b !important;color:#fff; }
        &.is-yellow svg{ background: #ffd843 !important;color:#fff; }
        &.is-red svg{ background: #d21643 !important;color:#fff; }
        &.is-orange svg{ background: #ffa726 !important;color:#fff; }
        &.is-violet svg{ background: #d216ff !important;color:#fff; }
    }
</style>