<script setup lang="ts">
import { ref, defineEmits } from 'vue'


const users = ref([{
  text: '@ancientbeast'
}])


const service = ref({
    icon: 'ph:pencil',
    iconColor: '#0000ff',
    title: 'Web',
    to: '/tool/web'
})


  // interface Emits {
  //   (e: 'changePage', value): void;
  // }
  
  // const emit = defineEmits<Emits>()
</script>

<template>
  <div>
    <Card shape="squared">
      <div class="download">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download-cloud"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>
        56001
      </div>
      <h3>
        Saas Startup Idea
      </h3>
      <p class="mb-2">
        Brainstorm Startup Ideas and plans within minutes
      </p>
      <div>
        <label v-for="(label, index) in users">
          {{label.text}}
        </label>
      </div>
      <div class="tool flex">
        <IconService
          :color="service.iconColor"
          size="small"
        >
          <i
            class="iconify"
            :data-icon="service.icon"
          ></i>
        </IconService>
        <span >
          Hay 
          <b>
            5 categorias
          </b> 
          para
          {{ service.title }}
        </span>
      </div>
    </Card>
  </div>
</template>


<style lang="scss" scoped>
.card{
  cursor: pointer;
  
  .download{
    color: #000;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    opacity: 0.8;

    svg{
      width: 20px;
      color: #000fff;
    }
  }
  
  .tool{
    font-size: 12px;
    gap: 4px;
    margin-top: 6px;
    
    .icon-box{
      width: 18px;
      min-width: 18px;
      height: 18px;
    }
  }
  
  
  h3{
    font-size: 20px;
    font-weight: 600;
    /*color: #000;*/
  }
  
  p{
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 20px;
  }
}



.is-dark{
  .download{
    color: #fff;
  }
  
  h3{
    color: #fff;
  }
  
  p{
    color: #767676;
  }
}
</style>