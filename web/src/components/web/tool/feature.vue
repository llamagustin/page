<script setup lang="ts">
import {watch} from 'vue'

export interface featureProps {
  text?:string
  color?:string
}

const props = withDefaults(defineProps<featureProps>(), {
  text:'feature item', color:'red'
})

console.log(props)

const  ellipsise = (data,max=20)=>{
  return data.length>max ? data.slice(0,20) + '...' : data ;
}

watch(props,val=>{
    console.log(val)
})
</script>

<template>
<div  class="column py-0 my-0 is-12 feature-list-item" >
      <div class="dot feature-dot " :class="props.color" width="15px" height="15px">
        <div class="dot-inner feature-dot-inner " :class="props.color"   width="11px" height="11px">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--feather feature-icon" width=".2em" height=".2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="feather:check" data-v-7623e932=""><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"></path></svg>
        </div>
      </div>
 
    <span class="is-size-7 ml-2 is-feature" :class="props.color" style="font-size:11px !important;"> {{ellipsise(text)}}</span>
  </div>
    
</template>

<style lang="scss" scoped>
.boe-title b{
  display: inline-flex;
  min-width: 177px;
  width: 177px;
}
.boe-texts-container{
  overflow: hidden;
}
.boe-content{
  min-width: 130px;
   width: 170px;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2; /* number of lines to show */
   max-height: 1*1;       /* fallback */
   font-size: 1.2rem;
   transition: transform 0.3s, opacity 0.3s;
}
.gold-star{
  color:#fa1;
  font-size:15px;
}
.fill-current{
  fill:currentColor;
}
.gap-2{
  gap:10px;
}
.is-right .button{
  padding-left:.5em;
  padding-right:.5em;
}
.is-dark-grey .button{
  padding-left:.58em;
  padding-right:.58em;
}
.btn-blob{
  color:#fff;
  &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}
}
.is-dark-grey .button{
  color:#fff;
  &.is-blue{ background: #0000ff !important; }
        &.is-green{ background: #13d33b !important; }
        &.is-yellow{ background: #ffd843 !important; }
        &.is-red{ background: #d21643 !important; }
        &.is-orange{ background: #ffa726 !important;}
        &.is-violet{ background: #d216ff !important;}
}
.subtitle-text{
  &.is-blue{ color: #0000ff !important; }
        &.is-green{ color: #13d33b !important; }
        &.is-yellow{ color: #ffd843 !important; }
        &.is-red{ color: #d21643 !important; }
        &.is-orange{ color: #ffa726 !important;}
        &.is-violet{ color: #d216ff !important;}
}
.items-center{
  align-items:center;
}
.justify-center{
  justify-content:center;
}
.justify-between{
  justify-content:space-between !important;
}
.justify-end{
  justify-content:flex-end !important;
}
.plan-header-btns{
  justify-content:center;
}
.plan-container li{
  width: 90px;
  font-size: 12px;
}
.is-feature{
  color: rgb(0, 0, 255); /*#17610f !important */;
}
.dash-line{
  border-top: 1.6px dashed #888;
}

.right-line{
  border-left:1px solid #3332;
}
.bottom-line{
  border-bottom:1px solid #3332;
}
.bottom-line:last-child{
  border-bottom:1px solid #3330;
}
.bottom-line:nth-child(7){
  border-bottom:1px solid #3330;
}

html.is-dark .right-line{
  border-left:1px solid #e5e5e522;
}
html.is-dark .bottom-line{
  border-bottom:1px solid #e5e5e522;
}
html.is-dark .bottom-line:last-child{
  border-bottom:1px solid #e5e5e500;
}
html.is-dark .bottom-line:nth-child(7){
  border-bottom:1px solid #e5e5e500;
}
.nowrap{
  flex-wrap:nowrap;
}
/*.bottom-line:last-child{*/
/*  border-bottom: none;*/
/*}*/
/*.bottom-line:nth-child(7){*/
/*  border-bottom: none;*/
/*}*/
/*.bottom-line:nth-child(3){*/
/*  border-right: none;*/
/*}*/
/*.bottom-line:nth-child(6){*/
/*  border-right: none;*/
/*}*/

.grid-col-1fr{
  display:grid;
  grid-template-columns:1fr;
}
.grid-col-2fr{
  display:grid;
  grid-template-columns:1fr 1fr;
}
.grid-col-3fr{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
}
.is-right {
  margin: 0px 0px 20px auto;
}
.feature-list {
  padding-bottom: 2rem;

  &.is-last {
    padding-bottom: 0;
  }

  .feature-list-item {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }

    &.is-feature {
      .dot {
        background: var(--success-light-28);

        .dot-inner {
          background: var(--success);
        }
      }
    }

    .dot {
      display: flex;
      align-items: center;
      justify-content: center;
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
          height: 14px;
          width: 14px;
          color: var(--white);
          stroke-width: 3px;
        }
      }
    }

    span {
      display: block;
      font-size: 0.95rem;
      font-family: var(--font);
      color: var(--light-text);
    }
    
    .feature-dot{
      width:15px;
      height:15px;
      margin-right:0px;
    }
    .feature-dot-inner{
      width:11px !important;
      height:11px !important;
    }
    .feature-icon{
      width:11px;
      height:11px;
    }
    .feature-icon-disabled{
      color:#eee;
    }
  }
}

.tabs.is-toggle li.is-active .is-blue{
      background: #0000ff !important;
      border-color:#0000ff;
    }
    .tabs.is-toggle li.is-active .is-green{
      background: #13d33b !important;
      border-color:#13d33b;
    }
    .tabs.is-toggle li.is-active .is-red{
      background: #d21643 !important;
      border-color:#d21643;
    }
    .tabs.is-toggle li.is-active .is-yellow{
      background: #ffd843 !important;
      border-color:#ffd843;
    }
    .tabs.is-toggle li.is-active .is-orange{
      background: #ffa726 !important;
      border-color:#ffa726;
    }
    .tabs.is-toggle li.is-active .is-violet{
      background: #d216ff !important;
      border-color:#d216ff;
    }
.tabs.is-toggle a{
  border-color:#dbdbdb33;
}
.tabs a:hover{
  background-color:#dbdbdb33;
  color:#444;
}
html.is-dark .tabs.is-toggle a:hover{
  background-color:#dbdbdb33;
  color:#fff;
}



.icon-service{
    width: 26px;
    height: 26px;
}
  

.columns {
  position: relative;
  z-index: 2;

  .half-circle-1 {
    position: absolute;
    bottom: 45%;
    left: -25%;
    transform: scale(0.8);
  }

  .full-circle-1 {
    position: absolute;
    top: 30%;
    left: -10%;
    transform: scale(2);
    z-index: 3;
  }

  .full-circle-2 {
    position: absolute;
    top: -5%;
    right: -2%;
    transform: scale(2);
    z-index: 1;
  }

  .full-circle-3 {
    position: absolute;
    top: 50%;
    right: -15%;
    transform: scale(1.2);
    z-index: 1;
  }
}

.app-mockup {
  position: relative;
  border-radius: 1.5rem;
  border: 1px solid var(--border);
  box-shadow: var(--light-box-shadow);
  overflow: hidden;
  
  img{
    width: 100%;
    height: 100%;
    margin: 0px;
  }
  
  .button-pdf{
    justify-content: space-between;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    padding: 0px 20px;
    position: absolute;
    bottom: 10px;
    width: 90%;
    margin-left: 5%;
    color: #fff;
    border: none;
    min-height: 38px;
    
    svg{
      width: 20px;
      height: 20px;
    }
    
    &.is-blue{
        background: #0000ff !important;
    }
    
    &.is-green{
        background: #13d33b !important;
    }
    
    &.is-yellow{
        background: #f7e06f !important;
    }
    
    &.is-red{
        background: #d21643 !important;
    }
    
    &.is-orange{
      background: #ffa726 !important;
    }
    
    &.is-violet{
      background: #d216ff !important;
    }
  }
}

.app-section {
  
  
  .tool-title{
    font-size: 24px;
    line-height: 20px;
    font-weight: bold;
  }

  .shape-1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 350px;
    width: 350px;
    border-radius: 50%;
    background: #d9d9ff;
    z-index: -1;
    
    &.is-blue{
          background: #0000ff !important;
          opacity: 0.2;
    }
    
    &.is-green{
        background: #13d33b !important;
        opacity: 0.2;
    }
    
    &.is-yellow{
        background: #f7e06f !important;
        opacity: 0.2;
    }
    
    &.is-red{
        background: #d21643 !important;
        opacity: 0.2;
    }
    
    &.is-orange{
      background: #ffa726 !important;
      opacity: 0.2;
    }
    
    &.is-violet{
      background: #d216ff !important;
      opacity: 0.2;
    }
  }
  
  .shape-2 {
    position: absolute;
    -bottom: 10%;
    right: 0;
    height: 350px;
    width: 350px;
    border-radius: 50%;
    background: #d9d9ff;
    z-index: 0;
    
    &.is-blue{
      background: #0000ff !important;
      opacity: 0.2;
    }
    
    &.is-green{
        background: #13d33b !important;
        opacity: 0.2;
    }
    
    &.is-yellow{
        background: #f7e06f !important;
        opacity: 0.2;
    }
    
    &.is-red{
        background: #d21643 !important;
        opacity: 0.2;
    }
    
    &.is-orange{
      background: #ffa726 !important;
      opacity: 0.2;
    }
    
    &.is-violet{
      background: #d216ff !important;
      opacity: 0.2;
    }
  }

  .media {
    .media-content {
      overflow: hidden;

      .subtitle {
        color: var(--medium-text);
      }
    }
  }
}


.tool-features{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.is-dark {
  .app-mockup {
    border: none;
  }
  
  .is-dark-white{
    color: #fff !important;
  }
  
  .is-dark-grey{
    color: #747990 !important;
  }
}


.carousel{
  &.is-blue{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #0000ff !important;
    }
  }
    
  &.is-green{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #13d33b !important;
    }
  }
    
  &.is-yellow{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #f7e06f !important;
    }
  }
    
  &.is-red{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #d21643 !important;
    }
  }
    
  &.is-orange{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #ffa726 !important;
    }
  }
    
  &.is-violet{
    :deep(.carousel__prev), :deep(.carousel__next){ 
      background: #d216ff !important;
    }
  }
}

@media only screen and (max-width: 767px) {
  .app-section {
    .app-mockup {
      border-radius: 0.65rem;
    }

    .shape-1,
    .shape-2 {
      height: 150px;
      width: 150px;
    }

    .shape-1 {
      left: -80px;
    }

    .columns {
      .full-circle-1,
      .full-circle-2,
      .full-circle-3,
      .half-circle-1 {
        transform: scale(0.7);
      }

      .full-circle-1 {
        left: -7%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

  .app-section {
    .shape-1,
    .shape-2 {
      height: 250px;
      width: 250px;
    }

    .shape-1 {
      left: -100px;
    }

    .shape-2 {
      right: -100px;
    }
  }
}
@media only screen and (max-width: 1024px){
  .boe-content{
   width: 150px;
}
}
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
 
  .app-section {
    .shape-1,
    .shape-2 {
      height: 250px;
      width: 250px;
    }

    .shape-1 {
      left: -100px;
    }

    .shape-2 {
      right: -100px;
    }
  }
}



@media screen and (max-width: 767px) {
  .xs-mt-4 {margin-top: 20px;}
  .xs-ml-0{margin-left: 0px;}
}

</style>
