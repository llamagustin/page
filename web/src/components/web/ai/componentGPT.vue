<script setup lang="ts">
  import { ref, defineEmits, watch } from 'vue'
  import { services as _services } from '/@src/texts/ai/flow'

  interface Props {
    prompt: any
  }
  
  const props = defineProps<Props>()
  const icon = ref({});
  
  watch(() => props.prompt?.service, (nameIcon) => {
    let item = _services.find(c => c.title.toLowerCase() == nameIcon);
    icon.value = { ...item }
  },{immediate: true});
  
</script>

<template>
  <div class="height-100">
    <Card shape="squared" class="aythen_squared">
      <div>
        <div class="download">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download-cloud">
            <polyline points="8 17 12 21 16 17" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
          </svg>
          <span>
            DOWNLOAD
          </span>
        </div>
        <div>
          <h3> {{ prompt?.title ?? '-' }} </h3>
          <p> {{ prompt?.input ?? '-' }} </p>
        </div>
      </div>
      <div class="flex" style="gap:6px; flex-wrap: wrap;">
        <IconService :color="icon.iconColor" size="small">
          <i class="iconify" :data-icon="icon.icon"></i>
        </IconService>
        <div>
        </div>
        <div v-for="(item, index) in prompt.category">
          <Tag :label="item" class="tag-item" outlined></Tag>
        </div>
      </div>
    </Card>
  </div>
</template>


<style lang="scss" scoped>
  .height-100 {
    height: 100%;
  }
  
  .aythen_squared{
    height: 100% !important;
  }
  .aythen_squared :deep(.card-content) {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .tag-item {
    text-transform: capitalize;
  }
  .card {
    cursor: pointer;

    .download {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      text-transform: uppercase;
    }

    svg {
      width: 12px;
    }

    h3 {
      font-weight: 800px;
    }

    p {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }


  .is-dark {
    h3 {
      color: #fff;

    }
  }
</style>
